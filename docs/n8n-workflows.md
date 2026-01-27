# n8n Workflow Setup Guide

## Prerequisites

1. **n8n Instance** - Self-hosted or n8n Cloud
2. **Telegram Bot Token** - Get from @BotFather
3. **Backend API URL** - Your Django backend (e.g., `https://tracker.cheq.dpdns.org`)

---

## Workflow 1: Telegram Bot Handler

Handles user registration when they start the bot.

### Nodes

#### 1. Telegram Trigger
- **Type:** Telegram Trigger
- **Bot Token:** `YOUR_BOT_TOKEN`
- **Updates:** Message

#### 2. Extract Start Command
- **Type:** Code
```javascript
const message = $input.first().json.message;
const chatId = message.chat.id.toString();
const username = message.from.username || '';
const firstName = message.from.first_name || '';
const text = message.text || '';

// Handle deep linking: /start TOKEN or /start TOKEN_VOUCHERID
const param = text.replace('/start', '').trim();
const parts = param.split('_');
const token = parts[0];
const voucherId = parts.length > 1 ? parts[1] : null;

return [{
  json: {
    chatId,
    username,
    firstName,
    text,
    token, // The user unique token
    voucherId, // Optional voucher ID to subscribe to
    isStart: text.startsWith('/start')
  }
}];
```

#### 3. IF Start Command
- **Type:** If
- **Condition:** `{{ $json.isStart }}` equals `true`

#### 4. Register User (HTTP Request)
- **Type:** HTTP Request
- **Method:** POST
- **URL:** `{{ $vars.BACKEND_URL }}/api/telegram/link/`
- **Body Type:** JSON
- **Body:**
```json
{
  "chat_id": "{{ $json.chatId }}",
  "username": "{{ $json.username }}",
  "first_name": "{{ $json.firstName }}",
  "link_token": "{{ $json.token }}"
}
```

#### 5. IF Voucher ID Present
- **Type:** If
- **Condition:** `{{ $json.voucherId }}` is not empty

#### 6. Subscribe to Voucher (HTTP Request)
- **Type:** HTTP Request
- **Method:** POST
- **URL:** `{{ $vars.BACKEND_URL }}/api/telegram/{{ $json.chatId }}/subscribe_voucher/`
- **Body Type:** JSON
- **Body:**
```json
{
  "voucher_id": "{{ $json.voucherId }}"
}
```

#### 7. Send Welcome Message
- **Type:** Telegram
- **Operation:** Send Message
- **Chat ID:** `{{ $json.chatId }}`
- **Text:**
```
🎉 Welcome to Stock Alerts!

You're now subscribed to receive notifications when vouchers come back in stock.

Commands:
/status - Check your subscription
```

---

## Workflow 2: Stock Alert Sender

Periodically checks for restocks and sends notifications.

### Nodes

#### 1. Schedule Trigger
- **Type:** Schedule Trigger
- **Rule:** Every 10 minutes

#### 2. Fetch Pending Alerts
- **Type:** HTTP Request
- **Method:** GET
- **URL:** `{{ $vars.BACKEND_URL }}/api/stock-alerts/pending/`

#### 3. Check if Alerts Exist
- **Type:** If
- **Condition:** `{{ $json.length }}` greater than `0`

#### 4. Fetch Subscribers
- **Type:** HTTP Request
- **Method:** GET
- **URL:** `{{ $vars.BACKEND_URL }}/api/stock-alerts/subscribers/`

#### 5. Loop Over Alerts
- **Type:** Split In Batches
- **Batch Size:** 1

#### 6. Format Alert Message
- **Type:** Code
```javascript
const alert = $input.first().json;
const message = `🔔 *BACK IN STOCK*

*${alert.voucher_name}*
Platform: ${alert.platform_name}
Fee: ${alert.fee}
Stock: ${alert.new_stock} available

[Buy Now](${alert.link})`;

return [{ json: { message, alertId: alert.id } }];
```

#### 7. Loop Over Subscribers
- **Type:** Split In Batches
- **Input:** Subscribers from step 4
- **Batch Size:** 1

#### 8. Send Telegram Alert
- **Type:** Telegram
- **Operation:** Send Message
- **Chat ID:** `{{ $json.chat_id }}`
- **Text:** `{{ $('Format Alert Message').item.json.message }}`
- **Parse Mode:** Markdown

#### 9. Collect Alert IDs
- **Type:** Code
```javascript
const items = $input.all();
const alertIds = [...new Set(items.map(i => i.json.alertId))];
return [{ json: { alert_ids: alertIds } }];
```

#### 10. Mark Alerts as Sent
- **Type:** HTTP Request
- **Method:** POST
- **URL:** `{{ $vars.BACKEND_URL }}/api/stock-alerts/mark_sent/`
- **Body:**
```json
{
  "alert_ids": {{ $json.alert_ids }}
}
```

---

## Environment Variables

Set these in n8n Settings → Variables:

| Variable | Value |
|----------|-------|
| `BACKEND_URL` | `https://tracker.cheq.dpdns.org` |

---

## Testing

1. **Test Registration:**
   - Open your Telegram bot
   - Send `/start`
   - Check Django admin for new TelegramSubscription

2. **Test Alerts:**
   - Create a StockAlert in Django admin with status=PENDING
   - Run the Stock Alert Sender workflow manually
   - Verify message received on Telegram

3. **Live Test:**
   - Wait for iShop sync to detect a restock
   - Alert should be created and sent automatically
