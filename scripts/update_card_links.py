import csv
import json


def update_card_links():
    json_path = "src/data/creditCards.json"
    csv_path = "cards link.csv"

    # Load JSON data
    try:
        with open(json_path, "r", encoding="utf-8") as f:
            cards_data = json.load(f)
    except FileNotFoundError:
        print(f"Error: {json_path} not found.")
        return

    # Load CSV data
    specific_updates = {}
    bank_fallbacks = {}

    try:
        with open(csv_path, "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                link = row.get("Link", "").strip()
                slug_names = row.get("slug name", "").strip()

                if not link:
                    continue

                if not slug_names:
                    # If slug name is empty, we might still want to use bank fallback if bank is present?
                    # The requirement says: "if not, then slug name column in csv has fallback to bank"
                    # But realistically the slug column dictates the target.
                    # Let's assume if slug is empty, we default to bank fallback if the requirement implies row-based logic.
                    # "search in slug field... if not, then slug name column in csv has fallback to bank"
                    # This implies the VALUE in 'slug name' column might be a bank name if it's not a card slug.
                    # However, looking at the CSV, 'slug name' column has card slugs like 'sbi-flipkart'.
                    # Row 33 has "HDFC Bank" in 'slug name'.
                    # So if the content of 'slug name' doesn't match a card ID, treat it as a bank name.
                    pass

                slugs = [s.strip() for s in slug_names.split(",")]

                for slug in slugs:
                    # Check if this slug is a card ID
                    is_card_id = False
                    for card in cards_data:
                        if card["id"] == slug:
                            is_card_id = True
                            break

                    if is_card_id:
                        specific_updates[slug] = link
                    else:
                        # Treat as bank fallback
                        # The slug string itself might be the bank name, e.g. "HDFC Bank"
                        bank_fallbacks[slug] = link

    except FileNotFoundError:
        print(f"Error: {csv_path} not found.")
        return

    print(
        f"Loaded {len(specific_updates)} specific updates and {len(bank_fallbacks)} bank fallbacks."
    )

    updated_count = 0

    # Apply updates
    for card in cards_data:
        card_id = card.get("id")
        card_bank = card.get("bank")

        original_link = card.get("applyLink")
        new_link = None

        # Priority 1: Specific Card ID match
        if card_id in specific_updates:
            new_link = specific_updates[card_id]
            print(f"Updating {card_id}: Specific match found. Link: {new_link}")

        # Priority 2: Bank Fallback (only if not updated by specific match)
        elif card_bank in bank_fallbacks:
            new_link = bank_fallbacks[card_bank]
            print(f"Updating {card_id}: Bank fallback ({card_bank}). Link: {new_link}")

        # Check for case where slug name in CSV was actually the bank name string but didn't match card_id
        # In the CSV, row 33 has slug "HDFC Bank".
        # bank_fallbacks will have key "HDFC Bank".
        # card['bank'] is "HDFC Bank". Matches!

        if new_link and original_link != new_link:
            card["applyLink"] = new_link
            updated_count += 1

    # Save updated JSON
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(cards_data, f, indent=2, ensure_ascii=False)

    print(f"Successfully updated {updated_count} cards.")


if __name__ == "__main__":
    update_card_links()
