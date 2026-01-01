export const creditCards = [
  {
    "id": "sbi-cashback",
    "name": "Cashback SBI Card",
    "bank": "SBI Card",
    "image": "/assets/cards/sbi-cashback.png",
    "link": "https://www.sbicard.com/en/personal/credit-cards/rewards/cashback-sbi-card.page",
    "fees": {
      "joining": 999,
      "annual": 999,
      "currency": "INR",
      "waivedOn": 200000,
      "waiverText": "Waived on \u20b92 Lakh spend in a calendar year"
    },
    "eligibility": {
      "income": 300000,
      "age": {
        "min": 21,
        "max": 70
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 750
    },
    "rewards": {
      "type": "cashback",
      "name": "Cashback",
      "baseRate": 0.05,
      "earningText": "5% cashback on online spends, 1% on offline spends",
      "expiry": "Auto-credited to statement",
      "joiningBonus": "None",
      "exclusions": "Fuel, Rent, Utilities, Wallet loads, Insurance, Education, Jewellery, Railways, EMI transactions",
      "calculator": {
        "tier": "entry",
        "monthlyCap": 5000,
        "capResetPeriod": "statement",
        "specialLogic": null,
        "categories": {
          "travel": {
            "rate": 0.05,
            "label": "5% (online booking)",
            "cap": 5000
          },
          "dining": {
            "rate": 0.05,
            "label": "5% (online orders)",
            "cap": 5000
          },
          "online": {
            "rate": 0.05,
            "label": "5% (all online merchants)",
            "cap": 5000
          },
          "fuel": {
            "rate": 0,
            "label": "No cashback on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.05,
            "label": "5% (online), 1% (offline)",
            "cap": 5000
          },
          "utilities": {
            "rate": 0,
            "label": "No cashback on utilities",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 1,
        "bestOption": "Auto-credited to statement",
        "options": [
          {
            "type": "Statement Credit",
            "value": 1,
            "desc": "Cashback auto-credited within 2 days of statement generation",
            "recommended": true
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "None (discontinued May 2023)",
        "international": "None",
        "accessType": "None"
      },
      "milestones": [],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 100,
        "minTxn": 500,
        "maxTxn": 3000
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5%"
      }
    },
    "metadata": {
      "tags": [
        "Cashback",
        "Entry Level",
        "Online Shopping",
        "Lifetime Free Possible"
      ],
      "bestFor": "Online shoppers seeking simple, unrestricted 5% cashback without complex redemption processes",
      "rating": 4.2,
      "verdict": "Best entry-level cashback card in India with industry-leading 5% online cashback and no merchant restrictions",
      "pros": [
        "5% cashback on ALL online spends (no merchant restrictions)",
        "Simple auto-credit redemption (no points to track)",
        "\u20b95,000 monthly cap is generous for most users",
        "Easy annual fee waiver at \u20b92 Lakh spend",
        "1% cashback on offline spends"
      ],
      "cons": [
        "No cashback on fuel, utilities, rent, insurance, education",
        "No lounge access",
        "No welcome bonus",
        "High forex markup at 3.5%",
        "Limited additional benefits"
      ]
    },
    "slug": "sbi-cashback"
  },
  {
    "id": "icici-emeralde-private-metal",
    "name": "ICICI Emeralde Private Metal",
    "bank": "ICICI Bank",
    "image": "/assets/cards/icici-emeralde-private-metal.png",
    "link": "https://www.icicibank.com/personal-banking/cards/credit-card/emeralde-private-metal-credit-card",
    "fees": {
      "joining": 12499,
      "annual": 12499,
      "currency": "INR",
      "waivedOn": 1000000,
      "waiverText": "Annual fee waived on spending \u20b910 lakhs in a card anniversary year"
    },
    "eligibility": {
      "income": 2400000,
      "age": {
        "min": 21,
        "max": 65
      },
      "type": "Invite Only",
      "creditScore": 750
    },
    "rewards": {
      "type": "points",
      "name": "ICICI Reward Points",
      "baseRate": 0.03,
      "earningText": "6 Reward Points per \u20b9200 spent (3% value back at 1:1 redemption for travel/vouchers)",
      "expiry": "3 years from date of earning",
      "joiningBonus": "12,500 Reward Points + Taj Epicure Preferred Membership (1 year) + EazyDiner Prime Membership (renewed annually)",
      "exclusions": "Fuel, Rent, Tax, Government Services, E-Wallet Loads",
      "calculator": {
        "tier": "super-premium",
        "monthlyCap": null,
        "capResetPeriod": "calendar",
        "specialLogic": "6X rewards on flights/vouchers (18% value) and 12X rewards on hotel bookings (36% value) via iShop. Category caps: Grocery \u20b940,000/month, Utilities \u20b980,000/month, Insurance \u20b980,000/month, Education \u20b980,000/month",
        "smartBuy": {
          "baseRewardRate": "3% (6 RP/₹200)",
          "pointValueTravel": 1,
          "pointValueVouchers": 1,
          "monthlyCap": 18000,
          "dailyCap": 10000,
          "merchants": {
            "hotels": { "multiplier": "12X", "effectiveRate": "36%", "label": "Hotels via iShop - 12X" },
            "flights": { "multiplier": "6X", "effectiveRate": "18%", "label": "Flights via iShop - 6X" },
            "vouchers": { "multiplier": "6X", "effectiveRate": "18%", "label": "Shopping Vouchers - 6X" },
            "bus": { "multiplier": "6X", "effectiveRate": "18%", "label": "Bus Bookings - 6X" }
          },
          "note": "Total cap: 18,000 RP/month. Daily cap: 10,000 RP."
        },
        "categories": {
          "travel": {
            "rate": 0.03,
            "label": "3% base; up to 36% via iShop hotels",
            "cap": null
          },
          "dining": {
            "rate": 0.03,
            "label": "3% value back",
            "cap": null
          },
          "online": {
            "rate": 0.03,
            "label": "3% value back",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "Excluded from rewards",
            "cap": null
          },
          "groceries": {
            "rate": 0.03,
            "label": "3% value back",
            "cap": 1200
          },
          "utilities": {
            "rate": 0.03,
            "label": "3% value back",
            "cap": 2400
          }
        }
      },
      "redemption": {
        "baseValue": 1,
        "bestOption": "Redeem for flights, hotels via iShop or select brand vouchers (Apple, Tanishq, Tumi, Coach) for 1 RP = \u20b91",
        "options": [
          {
            "type": "iShop Travel/Vouchers",
            "value": 1,
            "desc": "1 RP = \u20b91",
            "recommended": true
          },
          {
            "type": "Select Brand Vouchers",
            "value": 1,
            "desc": "1 RP = \u20b91 (Apple, Tanishq, Tumi, Coach, etc.)",
            "recommended": true
          },
          {
            "type": "Rewards Catalogue",
            "value": 0.6,
            "desc": "1 RP = \u20b90.60",
            "recommended": false
          },
          {
            "type": "Statement Credit",
            "value": 0.4,
            "desc": "1 RP = \u20b90.40",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "Unlimited (Primary + Add-on)",
        "international": "Unlimited via Priority Pass (Primary + Add-on)",
        "accessType": "Priority Pass"
      },
      "milestones": [
        {
          "spend": 800000,
          "benefit": "\u20b96,000 EaseMyTrip Air Travel Vouchers (2 x \u20b93,000)"
        }
      ],
      "golf": {
        "included": true,
        "text": "Unlimited complimentary golf rounds/lessons via Golftripz"
      },
      "movies": {
        "included": true,
        "text": "BOGO on BookMyShow up to \u20b9750 off on second ticket, 2 times per month"
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 100000
      },
      "forex": {
        "markup": 0.02,
        "text": "2% + GST (~2.36%)"
      }
    },
    "metadata": {
      "tags": [
        "Super Premium",
        "Metal Card",
        "Invite Only",
        "Travel",
        "Unlimited Lounge"
      ],
      "bestFor": "High spenders seeking premium travel benefits, unlimited lounge access for entire family, and excellent 3% reward rates",
      "rating": 4.7,
      "verdict": "ICICI's flagship super-premium card competing with HDFC Infinia, offering exceptional 3% rewards with 1:1 redemption and unlimited lounge access for both primary and add-on cardholders.",
      "pros": [
        "Excellent 3% reward rate with 1:1 redemption for travel/vouchers",
        "Unlimited domestic + international lounge for primary and add-on",
        "Up to 36% value back on hotel bookings via iShop",
        "Unlimited golf benefits",
        "Includes utilities, insurance, education in rewards program",
        "Taj Epicure + EazyDiner Prime memberships"
      ],
      "cons": [
        "Invite-only card, not easily accessible",
        "Best redemption (1:1) limited to travel and select vouchers",
        "No direct airline mile transfer partners",
        "Statement credit redemption at poor 0.40 value"
      ]
    },
    "slug": "icici-emeralde-private-metal"
  },
  {
    "id": "amazon-pay-icici",
    "name": "Amazon Pay ICICI Bank Credit Card",
    "bank": "ICICI Bank",
    "image": "/assets/cards/amazon-pay-icici.png",
    "link": "https://www.icicibank.com/personal-banking/cards/credit-card/amazon-pay-credit-card",
    "fees": {
      "joining": 0,
      "annual": 0,
      "currency": "INR",
      "waivedOn": null,
      "waiverText": "Lifetime Free - No joining or annual fee"
    },
    "eligibility": {
      "income": 240000,
      "age": {
        "min": 21,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 750
    },
    "rewards": {
      "type": "cashback",
      "name": "Amazon Pay Balance",
      "baseRate": 0.05,
      "earningText": "5% on Amazon (Prime), 3% (Non-Prime), 2% on Amazon Pay partners, 1% elsewhere",
      "expiry": "Never (Amazon Pay balance)",
      "joiningBonus": "\u20b9500 Amazon Prime Voucher + \u20b92,000 cashback coupons (Prime) / \u20b91,500 coupons (Non-Prime)",
      "exclusions": "Fuel, Rent, Tax, Education, Utilities, International spends (no cashback), EMI, Gold/Silver",
      "calculator": {
        "tier": "co-branded",
        "monthlyCap": null,
        "capResetPeriod": "calendar",
        "specialLogic": null,
        "smartBuy": {
          "type": "cashback",
          "baseRewardRate": "1%-5% Cashback",
          "monthlyCap": 1100,
          "dailyCap": null,
          "merchants": {
            "amazonPrime": { "multiplier": "5%", "effectiveRate": "5%", "label": "Amazon (Prime Members)" },
            "amazonNonPrime": { "multiplier": "3%", "effectiveRate": "3%", "label": "Amazon (Non-Prime)" },
            "amazonPayPartners": { "multiplier": "2%", "effectiveRate": "2%", "label": "Amazon Pay Partners" },
            "fuel": { "multiplier": "5%", "effectiveRate": "5%", "label": "Fuel (1st Txn/Month)" },
            "ishop": { "multiplier": "4%", "effectiveRate": "4%", "label": "iShop Portal (4%)" }
          },
          "note": "iShop cashback capped at ₹1,100/month. Fuel cashback max ₹150/month."
        },
        "categories": {
          "travel": {
            "rate": 0.05,
            "label": "5% (Prime) / 3% (Non-Prime) via Amazon",
            "cap": null
          },
          "dining": {
            "rate": 0.01,
            "label": "1% (outside Amazon)",
            "cap": null
          },
          "online": {
            "rate": 0.05,
            "label": "5% (Prime on Amazon) / 2% (Amazon Pay partners) / 1% (other)",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No cashback on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.05,
            "label": "5% on Amazon Fresh (Prime)",
            "cap": null
          },
          "utilities": {
            "rate": 0,
            "label": "No cashback on utilities",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 1,
        "bestOption": "Amazon Pay Balance (auto-credited)",
        "options": [
          {
            "type": "Amazon Pay Balance",
            "value": 1,
            "desc": "Auto-credited at end of billing cycle",
            "recommended": true
          },
          {
            "type": "Amazon Purchases",
            "value": 1,
            "desc": "Use balance for 10Cr+ products",
            "recommended": true
          },
          {
            "type": "Partner Merchants",
            "value": 1,
            "desc": "Use at 100+ Amazon Pay partners",
            "recommended": true
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "None",
        "international": "None",
        "accessType": "None"
      },
      "milestones": [],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 100,
        "minTxn": 400,
        "maxTxn": 4000
      },
      "forex": {
        "markup": 0.0199,
        "text": "1.99% (reduced from 3.5% effective Oct 2025)"
      },
      "dining": {
        "culinaryTreats": "15% off at 2,500+ restaurants via ICICI Culinary Treats"
      }
    },
    "metadata": {
      "tags": [
        "Lifetime Free",
        "Cashback",
        "Co-branded",
        "Amazon",
        "Entry Level"
      ],
      "bestFor": "Amazon Prime members and frequent Amazon shoppers seeking simple, unlimited cashback with zero fees",
      "rating": 4.5,
      "verdict": "India's most popular co-branded card offering unbeatable 5% Amazon cashback with zero annual fees",
      "pros": [
        "Lifetime Free - absolutely no fees",
        "5% unlimited cashback on Amazon (Prime members)",
        "Low forex markup of 1.99%",
        "Cashback never expires",
        "Simple redemption via Amazon Pay balance",
        "2% on 100+ partner merchants"
      ],
      "cons": [
        "No cashback on fuel, rent, utilities, education, tax",
        "No lounge access",
        "No travel benefits",
        "1% on non-Amazon spends is low",
        "No international spend cashback",
        "Requires Prime membership for best rewards"
      ]
    },
    "slug": "amazon-pay-icici"
  },
  {
    "id": "hdfc-infinia-metal",
    "name": "HDFC Infinia Metal Edition",
    "bank": "HDFC Bank",
    "image": "/assets/cards/hdfc-infinia-metal.png",
    "link": "https://www.hdfcbank.com/personal/pay/cards/credit-cards/infinia-credit-card",
    "fees": {
      "joining": 12500,
      "annual": 12500,
      "currency": "INR",
      "waivedOn": 1000000,
      "waiverText": "Waived on \u20b910 Lakh spend in preceding 12 months"
    },
    "eligibility": {
      "income": 2400000,
      "age": {
        "min": 21,
        "max": 60
      },
      "type": "Invite Only",
      "creditScore": 800
    },
    "rewards": {
      "type": "points",
      "name": "Reward Points",
      "baseRate": 0.033,
      "earningText": "5 Reward Points per \u20b9150 spent (3.33% when redeemed at 1:1)",
      "expiry": "3 years",
      "joiningBonus": "12,500 Reward Points + Club Marriott Membership on fee payment",
      "exclusions": "Fuel, Rent (via third-party apps), Government payments, Wallet loads",
      "calculator": {
        "tier": "super-premium",
        "monthlyCap": null,
        "capResetPeriod": "statement",
        "specialLogic": null,
        "portals": [
          {
            "name": "SmartBuy Flights/Hotels",
            "rate": 0.333,
            "label": "33.3% (10X Rewards - Flights/Hotels)",
            "categories": [
              "travel",
              "hotels"
            ]
          },
          {
            "name": "SmartBuy Vouchers (Gyftr)",
            "rate": 0.165,
            "label": "16.5% (5X Rewards - Amazon/Flipkart)",
            "categories": [
              "online",
              "shopping"
            ]
          },
          {
            "name": "SmartBuy Apple/Tanishq",
            "rate": 0.165,
            "label": "16.5% (5X Rewards)",
            "categories": [
              "online",
              "shopping"
            ]
          }
        ],
        "smartBuy": {
          "baseRewardRate": "5 RP/₹150 (3.33%)",
          "pointValueTravel": 1.0,
          "pointValueVouchers": 1.0,
          "monthlyCap": 15000,
          "dailyCap": 15000,
          "merchants": {
            "igp": { "multiplier": "10X", "effectiveRate": "33%", "label": "IGP.com - 10X (33%)" },
            "flights": { "multiplier": "5X", "effectiveRate": "16.5%", "label": "Flights - 5X (16.5%)" },
            "hotels": { "multiplier": "10X", "effectiveRate": "33%", "label": "Hotels - 10X (33%)" },
            "trains": { "multiplier": "3X", "effectiveRate": "10%", "label": "Confirmtkt Trains - 3X (10%)" },
            "redbus": { "multiplier": "5X", "effectiveRate": "16.5%", "label": "RedBus - 5X (16.5%)" },
            "instantVouchers": { "multiplier": "5X", "effectiveRate": "16.5%", "label": "Instant Vouchers (Gyftr) - 5X (16.5%)" },
            "myntra": { "multiplier": "5X", "effectiveRate": "16.5%", "label": "Myntra - 5X (16.5%)" },
            "nykaa": { "multiplier": "5X", "effectiveRate": "16.5%", "label": "Nykaa - 5X (16.5%)" },
            "jockey": { "multiplier": "10X", "effectiveRate": "33%", "label": "Jockey - 10X (33%)" },
            "pharmeasy": { "multiplier": "10X", "effectiveRate": "33%", "label": "Pharmeasy - 10X (33%)" },
            "mmtHoliday": { "multiplier": "5X", "effectiveRate": "16.5%", "label": "MMT Holiday - 5X (16.5%)" }
          }
        },
        "categories": {
          "travel": {
            "rate": 0.033,
            "label": "3.33% (5 RP/\u20b9150)",
            "cap": null
          },
          "dining": {
            "rate": 0.033,
            "label": "3.33% (5 RP/\u20b9150)",
            "cap": null
          },
          "online": {
            "rate": 0.033,
            "label": "3.33% (5 RP/\u20b9150)",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No rewards on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.033,
            "label": "3.33% (capped at 2,000 RP/month)",
            "cap": 2000
          },
          "utilities": {
            "rate": 0.033,
            "label": "3.33% (capped at 2,000 RP/month)",
            "cap": 2000
          }
        }
      },
      "redemption": {
        "baseValue": 1,
        "bestOption": "Flights/Hotels on SmartBuy or Airmiles Transfer",
        "options": [
          {
            "type": "SmartBuy Flights/Hotels",
            "value": 1,
            "desc": "1 RP = \u20b91 (up to 70% of booking, max 1.5L RP/month)",
            "recommended": true
          },
          {
            "type": "Airmiles Transfer",
            "value": 1,
            "desc": "1 RP = 1 Airmile (InterMiles, Singapore Airlines, etc.)",
            "recommended": true
          },
          {
            "type": "Apple Products",
            "value": 1,
            "desc": "1 RP = \u20b91 via SmartBuy",
            "recommended": true
          },
          {
            "type": "Tanishq Vouchers",
            "value": 1,
            "desc": "1 RP = \u20b91 via SmartBuy",
            "recommended": true
          },
          {
            "type": "Product Catalogue",
            "value": 0.5,
            "desc": "1 RP = \u20b90.50",
            "recommended": false
          },
          {
            "type": "Statement Credit",
            "value": 0.3,
            "desc": "1 RP = \u20b90.30 (max 50K RP/month)",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "Unlimited",
        "international": "Unlimited (Priority Pass)",
        "accessType": "Priority Pass"
      },
      "milestones": [
        {
          "spend": 0,
          "benefit": "12,500 RP + Club Marriott Membership on joining fee"
        },
        {
          "spend": 0,
          "benefit": "12,500 RP on renewal fee payment"
        }
      ],
      "golf": {
        "included": true,
        "text": "Unlimited complimentary golf at partner courses"
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 1000,
        "minTxn": 400,
        "maxTxn": 100000
      },
      "forex": {
        "markup": 0.02,
        "text": "2%"
      }
    },
    "metadata": {
      "tags": [
        "Super Premium",
        "Travel",
        "Invite Only",
        "Metal Card",
        "Priority Pass"
      ],
      "bestFor": "Ultra HNIs seeking best-in-class rewards and unlimited premium benefits",
      "rating": 4.8,
      "verdict": "India's most aspirational credit card with 3.33% rewards and 1:1 airmile conversion",
      "pros": [
        "3.33% reward rate with 1:1 redemption",
        "Up to 10X rewards via SmartBuy (33% returns)",
        "Unlimited lounge access worldwide",
        "Lowest forex markup at 2%",
        "Rewards on insurance, utilities, education"
      ],
      "cons": [
        "Invite only - extremely difficult to obtain",
        "High annual fee \u20b912,500 + GST",
        "\u20b910L spend required for fee waiver",
        "SmartBuy rewards capped at 15,000 RP/month",
        "No rewards on fuel"
      ]
    },
    "slug": "hdfc-infinia-metal"
  },
  {
    "id": "hdfc-diners-club-black-metal",
    "name": "HDFC Diners Club Black Metal Edition",
    "bank": "HDFC Bank",
    "image": "/assets/cards/hdfc-diners-black-metal.png",
    "link": "https://www.hdfcbank.com/personal/pay/cards/credit-cards/diners-club-black-metal-edition-credit-card",
    "fees": {
      "joining": 10000,
      "annual": 10000,
      "currency": "INR",
      "waivedOn": 800000,
      "waiverText": "Waived on \u20b98 Lakh spend in card anniversary year"
    },
    "eligibility": {
      "income": 1800000,
      "age": {
        "min": 21,
        "max": 60
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 750
    },
    "rewards": {
      "type": "points",
      "name": "Reward Points",
      "baseRate": 0.033,
      "earningText": "5 Reward Points per \u20b9150 spent (3.33% value back at 1:1 redemption)",
      "expiry": "3 years",
      "joiningBonus": "Club Marriott + Amazon Prime + Swiggy One on \u20b91.5L spend in 90 days",
      "exclusions": "Fuel, Rent, Government payments, Wallet loads",
      "calculator": {
        "tier": "super-premium",
        "monthlyCap": 75000,
        "capResetPeriod": "statement",
        "specialLogic": null,
        "portals": [
          {
            "name": "SmartBuy Flights/Hotels",
            "rate": 0.333,
            "label": "33.3% (10X Rewards - Flights/Hotels)",
            "categories": [
              "travel",
              "hotels"
            ]
          },
          {
            "name": "SmartBuy Vouchers (Gyftr)",
            "rate": 0.099,
            "label": "10% (3X Rewards - Amazon/Flipkart)",
            "categories": [
              "online",
              "shopping"
            ]
          }
        ],
        "smartBuy": {
          "baseRewardRate": "5 RP/₹150 (3.33%)",
          "pointValueTravel": 1.0,
          "pointValueVouchers": 0.50,
          "monthlyCap": 10000,
          "dailyCap": 10000,
          "merchants": {
            "igp": { "multiplier": "10X", "effectiveRate": "33%", "label": "IGP.com - 10X (33%)" },
            "flights": { "multiplier": "5X", "effectiveRate": "16.5%", "label": "Flights - 5X (16.5%)" },
            "hotels": { "multiplier": "10X", "effectiveRate": "33%", "label": "Hotels - 10X (33%)" },
            "trains": { "multiplier": "3X", "effectiveRate": "10%", "label": "Confirmtkt Trains - 3X (10%)" },
            "redbus": { "multiplier": "5X", "effectiveRate": "16.5%", "label": "RedBus - 5X (16.5%)" },
            "instantVouchers": { "multiplier": "3X", "effectiveRate": "10%", "label": "Instant Vouchers (Gyftr) - 3X (10%)" },
            "myntra": { "multiplier": "5X", "effectiveRate": "16.5%", "label": "Myntra - 5X (16.5%)" },
            "nykaa": { "multiplier": "5X", "effectiveRate": "16.5%", "label": "Nykaa - 5X (16.5%)" },
            "jockey": { "multiplier": "10X", "effectiveRate": "33%", "label": "Jockey - 10X (33%)" },
            "pharmeasy": { "multiplier": "10X", "effectiveRate": "33%", "label": "Pharmeasy - 10X (33%)" },
            "mmtHoliday": { "multiplier": "5X", "effectiveRate": "16.5%", "label": "MMT Holiday - 5X (16.5%)" }
          }
        },
        "categories": {
          "travel": {
            "rate": 0.033,
            "label": "3.33% (5 RP/\u20b9150)",
            "cap": null
          },
          "dining": {
            "rate": 0.066,
            "label": "6.67% (10 RP/\u20b9150 on weekends)",
            "cap": null
          },
          "online": {
            "rate": 0.033,
            "label": "3.33% (5 RP/\u20b9150)",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No rewards on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.033,
            "label": "3.33% (capped at 2,000 RP/month)",
            "cap": 2000
          },
          "utilities": {
            "rate": 0.033,
            "label": "3.33% (capped at 2,000 RP/month)",
            "cap": 2000
          }
        }
      },
      "redemption": {
        "baseValue": 1,
        "bestOption": "SmartBuy Flights/Hotels or Airmiles",
        "options": [
          {
            "type": "SmartBuy Flights/Hotels",
            "value": 1,
            "desc": "1 RP = \u20b91 (max 75K RP/month)",
            "recommended": true
          },
          {
            "type": "Airmiles Transfer",
            "value": 0.5,
            "desc": "2 RP = 1 Airmile (since Jan 2024)",
            "recommended": true
          },
          {
            "type": "Product Catalogue",
            "value": 1,
            "desc": "1 RP = \u20b91 for select items",
            "recommended": false
          },
          {
            "type": "Vouchers",
            "value": 1,
            "desc": "1 RP = \u20b91 for select vouchers",
            "recommended": false
          },
          {
            "type": "Statement Credit",
            "value": 0.3,
            "desc": "1 RP = \u20b90.30",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "Unlimited",
        "international": "Unlimited (1300+ lounges)",
        "accessType": "Diners Club Network"
      },
      "milestones": [
        {
          "spend": 150000,
          "benefit": "Club Marriott + Amazon Prime + Swiggy One (in 90 days)"
        },
        {
          "spend": 400000,
          "benefit": "10,000 Bonus RP per quarter (\u20b94L spend)"
        }
      ],
      "golf": {
        "included": true,
        "text": "6 complimentary golf games per quarter"
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 500,
        "minTxn": 400,
        "maxTxn": 5000
      },
      "forex": {
        "markup": 0.02,
        "text": "2%"
      }
    },
    "metadata": {
      "tags": [
        "Super Premium",
        "Travel",
        "Metal Card",
        "Diners Club"
      ],
      "bestFor": "Frequent travelers and high spenders wanting premium benefits without invite-only restrictions",
      "rating": 4.6,
      "verdict": "Best alternative to Infinia with similar benefits and easier acquisition",
      "pros": [
        "3.33% reward rate matching Infinia",
        "Unlimited lounge access worldwide",
        "10X rewards via SmartBuy",
        "2X rewards on weekend dining",
        "Quarterly milestone bonus of 10K RP"
      ],
      "cons": [
        "\u20b910,000 + GST annual fee",
        "Diners Club acceptance limited at some merchants",
        "Airmile conversion devalued (2:1 ratio)",
        "Max 75,000 RP earning per statement cycle",
        "Insurance rewards capped at 5,000 RP/month"
      ]
    },
    "slug": "hdfc-diners-club-black-metal"
  },
  {
    "id": "hdfc-diners-club-black",
    "name": "HDFC Diners Club Black Credit Card",
    "bank": "HDFC Bank",
    "image": "/assets/cards/hdfc-diners-black.png",
    "link": "https://www.hdfcbank.com/personal/pay/cards/credit-cards/diners-club-black-credit-card",
    "fees": {
      "joining": 10000,
      "annual": 10000,
      "currency": "INR",
      "waivedOn": 500000,
      "waiverText": "Waived on ₹5 Lakh spend in previous year"
    },
    "eligibility": {
      "income": 175000,
      "age": { "min": 21, "max": 60 },
      "type": "Salaried/Self-Employed",
      "creditScore": 750
    },
    "rewards": {
      "type": "points",
      "name": "Reward Points",
      "baseRate": 0.033,
      "earningText": "5 RP per ₹150 (3.33% rate)",
      "expiry": "3 years",
      "calculator": {
        "tier": "super-premium",
        "monthlyCap": 7500,
        "capResetPeriod": "statement",
        "smartBuy": {
          "baseRewardRate": "5 RP/₹150 (3.33%)",
          "pointValueTravel": 1.0,
          "pointValueVouchers": 0.50,
          "monthlyCap": 7500,
          "dailyCap": 2500,
          "merchants": {
            "igp": { "multiplier": "10X", "effectiveRate": "33%", "label": "IGP.com - 10X (33%)" },
            "flights": { "multiplier": "5X", "effectiveRate": "16.5%", "label": "Flights - 5X (16.5%)" },
            "hotels": { "multiplier": "10X", "effectiveRate": "33%", "label": "Hotels - 10X (33%)" },
            "trains": { "multiplier": "3X", "effectiveRate": "10%", "label": "Confirmtkt - 3X (10%)" },
            "redbus": { "multiplier": "5X", "effectiveRate": "16.5%", "label": "RedBus - 5X (16.5%)" },
            "instantVouchers": { "multiplier": "3X", "effectiveRate": "10%", "label": "Gyftr Vouchers - 3X (10%)" },
            "myntra": { "multiplier": "5X", "effectiveRate": "16.5%", "label": "Myntra - 5X (16.5%)" },
            "nykaa": { "multiplier": "5X", "effectiveRate": "16.5%", "label": "Nykaa - 5X (16.5%)" },
            "jockey": { "multiplier": "10X", "effectiveRate": "33%", "label": "Jockey - 10X (33%)" },
            "pharmeasy": { "multiplier": "10X", "effectiveRate": "33%", "label": "Pharmeasy - 10X (33%)" },
            "mmtHoliday": { "multiplier": "5X", "effectiveRate": "16.5%", "label": "MMT Holiday - 5X (16.5%)" }
          }
        },
        "categories": {
          "travel": { "rate": 0.033, "label": "3.33% (5 RP/₹150)" },
          "dining": { "rate": 0.066, "label": "2X on Weekend Dining" },
          "online": { "rate": 0.033, "label": "3.33% (5 RP/₹150)" }
        }
      },
      "redemption": {
        "baseValue": 1,
        "bestOption": "Flights/Hotels (1 RP = ₹1)",
        "options": [
          { "type": "Travel", "value": 1, "desc": "Flights/Hotels via SmartBuy (70% points + 30% cash)" },
          { "type": "Airmiles", "value": 1, "desc": "1 RP = 1 Mile (InterMiles/KrisFlyer)" }
        ]
      }
    },
    "features": [
      "Unlimited Airport Lounge Access (Worldwide)",
      "Club Marriott Membership on joining",
      "6 Complimentary Golf games per quarter",
      "Air Accident Cover of ₹2 Crore"
    ],
    "slug": "hdfc-diners-club-black"
  },
  {
    "id": "hdfc-diners-club-privilege",
    "name": "HDFC Diners Club Privilege Credit Card",
    "bank": "HDFC Bank",
    "image": "/assets/cards/hdfc-diners-privilege.png",
    "link": "https://www.hdfcbank.com/personal/pay/cards/credit-cards/diners-club-privilege-credit-card",
    "fees": {
      "joining": 1000,
      "annual": 1000,
      "currency": "INR",
      "waivedOn": 300000,
      "waiverText": "Waived on ₹3 Lakh spend"
    },
    "eligibility": {
      "income": 70000,
      "age": { "min": 21, "max": 60 },
      "type": "Salaried/Self-Employed",
      "creditScore": 730
    },
    "rewards": {
      "type": "points",
      "name": "Reward Points",
      "baseRate": 0.0133,
      "earningText": "4 RP per ₹150 (1.33% rate)",
      "expiry": "2 years",
      "joiningBonus": "Swiggy One & Amazon Prime membership (spend based)",
      "exclusions": "Fuel, Wallet Loads, Rent, EMI, Govt Transactions",
      "calculator": {
        "tier": "mid-range",
        "monthlyCap": 4000,
        "capResetPeriod": "statement",
        "smartBuy": {
          "baseRewardRate": "4 RP/₹150 (1.33%)",
          "pointValueTravel": 0.50,
          "pointValueVouchers": 0.50,
          "monthlyCap": 4000,
          "dailyCap": 2000,
          "merchants": {
            "igp": { "multiplier": "10X", "effectiveRate": "13.3%", "label": "IGP.com - 10X (13.3%)" },
            "flights": { "multiplier": "5X", "effectiveRate": "6.6%", "label": "Flights - 5X (6.6%)" },
            "hotels": { "multiplier": "10X", "effectiveRate": "13.3%", "label": "Hotels - 10X (13.3%)" },
            "trains": { "multiplier": "3X", "effectiveRate": "4%", "label": "Confirmtkt - 3X (4%)" },
            "redbus": { "multiplier": "5X", "effectiveRate": "6.6%", "label": "RedBus - 5X (6.6%)" },
            "instantVouchers": { "multiplier": "5X", "effectiveRate": "6.6%", "label": "Gyftr Vouchers - 5X (6.6%)" },
            "myntra": { "multiplier": "5X", "effectiveRate": "6.6%", "label": "Myntra - 5X (6.6%)" },
            "nykaa": { "multiplier": "5X", "effectiveRate": "6.6%", "label": "Nykaa - 5X (6.6%)" },
            "jockey": { "multiplier": "10X", "effectiveRate": "13.3%", "label": "Jockey - 10X (13.3%)" },
            "pharmeasy": { "multiplier": "10X", "effectiveRate": "13.3%", "label": "Pharmeasy - 10X (13.3%)" },
            "mmtHoliday": { "multiplier": "5X", "effectiveRate": "6.6%", "label": "MMT Holiday - 5X (6.6%)" }
          }
        },
        "categories": {
          "travel": { "rate": 0.0133, "label": "1.33% (4 RP/₹150)" },
          "dining": { "rate": 0.066, "label": "5X on Swiggy/Zomato (6.67%)", "cap": 2500 }
        }
      },
      "redemption": {
        "baseValue": 0.5,
        "bestOption": "Flights/Hotels (1 RP = ₹0.50)",
        "options": [
          { "type": "Travel", "value": 0.5, "desc": "Flights/Hotels via SmartBuy" },
          { "type": "Cashback", "value": 0.20, "desc": "Statement Credit" }
        ]
      }
    },
    "features": [
      "12 Airport Lounge Access per year (Domestic/International)",
      "Buy 1 Get 1 on BookMyShow (Weekend)",
      "Complimentary Swiggy One & Times Prime"
    ],
    "slug": "hdfc-diners-club-privilege"
  },
  {
    "id": "hdfc-moneyback-plus",
    "name": "HDFC Bank MoneyBack+ Credit Card",
    "bank": "HDFC Bank",
    "image": "/assets/cards/hdfc-moneyback-plus.png",
    "link": "https://www.hdfcbank.com/personal/pay/cards/credit-cards/moneyback-plus-credit-card",
    "fees": {
      "joining": 500,
      "annual": 500,
      "currency": "INR",
      "waivedOn": 50000,
      "waiverText": "Waived on ₹50,000 annual spend"
    },
    "eligibility": {
      "income": 20000,
      "age": { "min": 21, "max": 60 },
      "type": "Salaried/Self-Employed",
      "creditScore": 700
    },
    "rewards": {
      "type": "cashback",
      "name": "CashPoints",
      "baseRate": 0.0033,
      "earningText": "2 CashPoints per ₹150 (0.33%)",
      "expiry": "2 years",
      "joiningBonus": "500 CashPoints on payment of joining fee",
      "exclusions": "Fuel, Wallet Loads, Rent, Govt Transactions",
      "calculator": {
        "tier": "entry",
        "monthlyCap": 15000,
        "capResetPeriod": "statement",
        "smartBuy": {
          "type": "cashback",
          "baseRewardRate": "Cashback Card",
          "monthlyCap": 1000,
          "dailyCap": null,
          "merchants": {
            "igp": { "rate": "10%", "label": "IGP.com - 10% Cashback" },
            "flights": { "rate": "5%", "label": "Flights - 5% Cashback" },
            "hotels": { "rate": "5%", "label": "Hotels - 5% Cashback" },
            "trains": { "rate": "1%", "label": "Confirmtkt - 1% Cashback" },
            "redbus": { "rate": "5%", "label": "RedBus - 5% Cashback" },
            "instantVouchers": { "rate": "5%", "label": "Gyftr Vouchers - 5% Cashback" },
            "myntra": { "rate": "5%", "label": "Myntra - 5% Cashback" },
            "nykaa": { "rate": "5%", "label": "Nykaa - 5% Cashback" },
            "jockey": { "rate": "10%", "label": "Jockey - 10% Cashback" },
            "pharmeasy": { "rate": "10%", "label": "Pharmeasy - 10% Cashback" },
            "mmtHoliday": { "rate": "5%", "label": "MMT Holiday - 5% Cashback" }
          }
        },
        "categories": {
          "online": { "rate": 0.033, "label": "10X on Amazon, Flipkart, Swiggy (3.3%)", "cap": 2500 },
          "retail": { "rate": 0.0033, "label": "0.33% Base Rate" }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Statement Credit (1 CP = ₹0.25)",
        "options": [{ "type": "Statement Credit", "value": 0.25, "desc": "Min 2500 points for redemption" }]
      }
    },
    "features": [
      "10X CashPoints on Amazon, Flipkart, Swiggy, BigBasket",
      "Gift Voucher worth ₹500 on spending ₹50,000/quarter",
      "1% Fuel Surcharge Waiver"
    ],
    "slug": "hdfc-moneyback-plus"
  },
  {
    "id": "hdfc-freedom",
    "name": "HDFC Bank Freedom Credit Card",
    "bank": "HDFC Bank",
    "image": "/assets/cards/hdfc-freedom.png",
    "link": "https://www.hdfcbank.com/personal/pay/cards/credit-cards/freedom-credit-card",
    "fees": {
      "joining": 500,
      "annual": 500,
      "currency": "INR",
      "waivedOn": 50000,
      "waiverText": "Waived on ₹50,000 annual spend"
    },
    "eligibility": {
      "income": 12000,
      "age": { "min": 21, "max": 60 },
      "type": "Salaried/Self-Employed",
      "creditScore": 650
    },
    "rewards": {
      "type": "cashback",
      "name": "CashPoints",
      "baseRate": 0.001,
      "earningText": "1 CashPoint per ₹150 (0.1%)",
      "expiry": "2 years",
      "exclusions": "Fuel, Wallet Loads, Rent, Govt Transactions",
      "calculator": {
        "tier": "entry",
        "monthlyCap": 2500,
        "capResetPeriod": "statement",
        "smartBuy": {
          "type": "cashback",
          "baseRewardRate": "Cashback Card",
          "monthlyCap": 1000,
          "dailyCap": null,
          "merchants": {
            "igp": { "rate": "10%", "label": "IGP.com - 10% Cashback" },
            "flights": { "rate": "5%", "label": "Flights - 5% Cashback" },
            "hotels": { "rate": "5%", "label": "Hotels - 5% Cashback" },
            "trains": { "rate": "1%", "label": "Confirmtkt - 1% Cashback" },
            "redbus": { "rate": "5%", "label": "RedBus - 5% Cashback" },
            "instantVouchers": { "rate": "5%", "label": "Gyftr Vouchers - 5% Cashback" },
            "myntra": { "rate": "5%", "label": "Myntra - 5% Cashback" },
            "nykaa": { "rate": "5%", "label": "Nykaa - 5% Cashback" },
            "jockey": { "rate": "10%", "label": "Jockey - 10% Cashback" },
            "pharmeasy": { "rate": "10%", "label": "Pharmeasy - 10% Cashback" },
            "mmtHoliday": { "rate": "5%", "label": "MMT Holiday - 5% Cashback" }
          }
        },
        "categories": {
          "online": { "rate": 0.01, "label": "10X on Swiggy, BookMyShow, BigBasket (1%)" },
          "retail": { "rate": 0.001, "label": "0.1% Base Rate" }
        }
      },
      "redemption": {
        "baseValue": 0.15,
        "bestOption": "Statement Credit (1 CP = ₹0.15)",
        "options": [{ "type": "Statement Credit", "value": 0.15, "desc": "Statement credit redemption" }]
      }
    },
    "features": [
      "10X CashPoints on BigBasket, Swiggy, BookMyShow, OYO, Uber",
      "Low interest rate (0.99% for first 90 days)",
      "Zero lost card liability"
    ],
    "slug": "hdfc-freedom"
  },
  {
    "id": "hdfc-bizpower",
    "name": "HDFC Bank BizPower Credit Card",
    "bank": "HDFC Bank",
    "image": "/assets/cards/hdfc-bizpower.png",
    "link": "https://www.hdfcbank.com/personal/pay/cards/business-credit-cards/biz-power/biz-power-credit-card",
    "fees": {
      "joining": 2500,
      "annual": 2500,
      "currency": "INR",
      "waivedOn": 400000,
      "waiverText": "Waived on ₹4 Lakh spend"
    },
    "eligibility": {
      "income": 100000,
      "age": { "min": 21, "max": 65 },
      "type": "Self-Employed",
      "creditScore": 750
    },
    "rewards": {
      "type": "points",
      "name": "Reward Points",
      "baseRate": 0.0173,
      "earningText": "4 RP per ₹150 (1.73%)",
      "expiry": "2 years",
      "calculator": {
        "tier": "mid-range",
        "monthlyCap": 60000,
        "capResetPeriod": "statement",
        "smartBuy": {
          "baseRewardRate": "4 RP/₹150 (1.73%)",
          "pointValueTravel": 0.50,
          "pointValueVouchers": 0.50,
          "monthlyCap": 4000,
          "dailyCap": 2000,
          "merchants": {
            "igp": { "multiplier": "10X", "effectiveRate": "13.3%", "label": "IGP.com - 10X (13.3%)" },
            "flights": { "multiplier": "5X", "effectiveRate": "6.6%", "label": "Flights - 5X (6.6%)" },
            "hotels": { "multiplier": "10X", "effectiveRate": "13.3%", "label": "Hotels - 10X (13.3%)" },
            "trains": { "multiplier": "3X", "effectiveRate": "4%", "label": "Confirmtkt - 3X (4%)" },
            "redbus": { "multiplier": "5X", "effectiveRate": "6.6%", "label": "RedBus - 5X (6.6%)" },
            "instantVouchers": { "multiplier": "5X", "effectiveRate": "6.6%", "label": "Gyftr Vouchers - 5X (6.6%)" },
            "myntra": { "multiplier": "5X", "effectiveRate": "6.6%", "label": "Myntra - 5X (6.6%)" },
            "nykaa": { "multiplier": "5X", "effectiveRate": "6.6%", "label": "Nykaa - 5X (6.6%)" },
            "jockey": { "multiplier": "10X", "effectiveRate": "13.3%", "label": "Jockey - 10X (13.3%)" },
            "pharmeasy": { "multiplier": "10X", "effectiveRate": "13.3%", "label": "Pharmeasy - 10X (13.3%)" },
            "mmtHoliday": { "multiplier": "5X", "effectiveRate": "6.6%", "label": "MMT Holiday - 5X (6.6%)" }
          }
        },
        "categories": {
          "utilities": { "rate": 0.0866, "label": "5X on Tax, GST, Vendor Payments (via SmartPay)" },
          "online": { "rate": 0.0866, "label": "5X on Ads (Google/FB) & Software" }
        }
      },
      "redemption": {
        "baseValue": 0.5,
        "bestOption": "Flights/Hotels (1 RP = ₹0.50)",
        "options": [{ "type": "Travel", "value": 0.5, "desc": "Flights/Hotels via SmartBuy" }]
      }
    },
    "features": [
      "16 Airport Lounges/year (4/qtr domestic + 6/year international)",
      "5X Rewards on GST, Vendor Pay, Google Ads",
      "55 Days Interest Free Credit"
    ],
    "slug": "hdfc-bizpower"
  },

  {
    "id": "hdfc-regalia",
    "name": "HDFC Regalia Credit Card",
    "bank": "HDFC Bank",
    "image": "/assets/cards/hdfc-regalia.png",
    "fees": {
      "joining": 2500,
      "annual": 2500,
      "waivedOn": 300000,
      "waiverText": "Waived on ₹3 Lakh spend"
    },
    "rewards": {
      "type": "points",
      "baseRate": 0.026,
      "earningText": "4 RP per ₹150 (2.67% rate)",
      "calculator": {
        "tier": "premium",
        "monthlyCap": 4000,
        "smartBuy": {
          "baseRewardRate": "4 RP/₹150 (2.67%)",
          "pointValueTravel": 0.50,
          "pointValueVouchers": 0.50,
          "monthlyCap": 4000,
          "dailyCap": 2000,
          "merchants": {
            "igp": { "multiplier": "10X", "effectiveRate": "13.3%", "label": "IGP.com - 10X (13.3%)" },
            "flights": { "multiplier": "5X", "effectiveRate": "6.6%", "label": "Flights - 5X (6.6%)" },
            "hotels": { "multiplier": "10X", "effectiveRate": "13.3%", "label": "Hotels - 10X (13.3%)" },
            "trains": { "multiplier": "3X", "effectiveRate": "4%", "label": "Confirmtkt - 3X (4%)" },
            "redbus": { "multiplier": "5X", "effectiveRate": "6.6%", "label": "RedBus - 5X (6.6%)" },
            "instantVouchers": { "multiplier": "5X", "effectiveRate": "6.6%", "label": "Gyftr Vouchers - 5X (6.6%)" },
            "myntra": { "multiplier": "5X", "effectiveRate": "6.6%", "label": "Myntra - 5X (6.6%)" },
            "nykaa": { "multiplier": "5X", "effectiveRate": "6.6%", "label": "Nykaa - 5X (6.6%)" },
            "jockey": { "multiplier": "10X", "effectiveRate": "13.3%", "label": "Jockey - 10X (13.3%)" },
            "pharmeasy": { "multiplier": "10X", "effectiveRate": "13.3%", "label": "Pharmeasy - 10X (13.3%)" },
            "mmtHoliday": { "multiplier": "5X", "effectiveRate": "6.6%", "label": "MMT Holiday - 5X (6.6%)" }
          }
        },
        "categories": {
          "travel": { "rate": 0.026, "label": "2.67% (4 RP/₹150)" }
        }
      },
      "redemption": {
        "baseValue": 0.5,
        "bestOption": "Flights/Hotels (1 RP = ₹0.50)",
        "options": [{ "type": "Travel", "value": 0.5, "desc": "Flights/Hotels via SmartBuy" }]
      }
    },
    "features": [
      "12 Airport Lounge Access in India/International",
      "Bonus 10,000 RP on ₹5 Lakh spend",
      "Foreign Currency Markup: 2%"
    ],
    "slug": "hdfc-regalia"
  },
  {
    "id": "hdfc-tata-neu-infinity",
    "name": "Tata Neu Infinity HDFC Bank Credit Card",
    "bank": "HDFC Bank",
    "image": "/assets/cards/hdfc-tata-neu-infinity.png",
    "link": "https://www.hdfcbank.com/personal/pay/cards/credit-cards/tata-neu-infinity-hdfc-bank-credit-card",
    "fees": {
      "joining": 1499,
      "annual": 1499,
      "currency": "INR",
      "waivedOn": 300000,
      "waiverText": "Waived on \u20b93 Lakh spend in a year"
    },
    "eligibility": {
      "income": 1200000,
      "age": {
        "min": 21,
        "max": 60
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 750
    },
    "rewards": {
      "type": "points",
      "name": "NeuCoins",
      "baseRate": 0.015,
      "earningText": "1.5% NeuCoins on all spends, up to 10% on Tata Neu app",
      "expiry": "12 months (from Aug 2025)",
      "joiningBonus": "1,499 NeuCoins on first transaction within 30 days",
      "exclusions": "Fuel, Rent, Government, Wallet loads, Online Gaming (from July 2025)",
      "calculator": {
        "tier": "co-branded",
        "monthlyCap": 50000,
        "capResetPeriod": "statement",
        "specialLogic": "tata-neu-tiered",
        "categories": {
          "travel": {
            "rate": 0.015,
            "label": "1.5% NeuCoins",
            "cap": null
          },
          "dining": {
            "rate": 0.015,
            "label": "1.5% NeuCoins",
            "cap": null
          },
          "online": {
            "rate": 0.1,
            "label": "10% on Tata Neu (5%+5% NeuPass)",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No NeuCoins on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.05,
            "label": "5% on BigBasket (Tata brand)",
            "cap": 2000
          },
          "utilities": {
            "rate": 0.015,
            "label": "1.5% (capped at 2,000/month)",
            "cap": 2000
          }
        },
        "smartBuy": {
          "type": "neucoins",
          "baseRewardRate": "NeuCoins",
          "monthlyCap": null,
          "dailyCap": null,
          "note": "NeuCoins vary by merchant",
          "merchants": {
            "igp": { "rate": "6% NC", "label": "IGP.com - 6% NeuCoins" },
            "flights": { "rate": "1.5% NC", "label": "Flights - 1.5% NeuCoins" },
            "hotels": { "rate": "6% NC", "label": "Hotels - 6% NeuCoins" },
            "trains": { "rate": "1.5% NC", "label": "Confirmtkt Trains - 1.5% NeuCoins" },
            "redbus": { "rate": "1.5% NC", "label": "RedBus - 1.5% NeuCoins" },
            "instantVouchers": { "rate": "1.5% NC", "label": "Instant Vouchers (Gyftr) - 1.5% NeuCoins" },
            "myntra": { "rate": "1.5% NC", "label": "Myntra - 1.5% NeuCoins" },
            "nykaa": { "rate": "1.5% NC", "label": "Nykaa - 1.5% NeuCoins" },
            "jockey": { "rate": "6% NC", "label": "Jockey - 6% NeuCoins" },
            "pharmeasy": { "rate": "6% NC", "label": "Pharmeasy - 6% NeuCoins" },
            "mmtHoliday": { "rate": "1.5% NC", "label": "MMT Holiday - 1.5% NeuCoins" }
          }
        }
      },
      "redemption": {
        "baseValue": 1,
        "bestOption": "Tata Neu app/partner brands",
        "options": [
          {
            "type": "Tata Neu/Partners",
            "value": 1,
            "desc": "1 NeuCoin = \u20b91 at BigBasket, Croma, Westside, Taj, etc.",
            "recommended": true
          },
          {
            "type": "Tanishq",
            "value": 1,
            "desc": "1 NeuCoin = \u20b91 for gold/jewellery",
            "recommended": true
          },
          {
            "type": "Air India",
            "value": 1,
            "desc": "1 NeuCoin = \u20b91 for flights",
            "recommended": true
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "8 per year (2/quarter on \u20b950K spend) - milestone based from June 2025",
        "international": "4 per year (1/quarter) via Priority Pass",
        "accessType": "Priority Pass (Visa) / Voucher (RuPay)"
      },
      "milestones": [
        {
          "spend": 50000,
          "benefit": "2 domestic lounge vouchers per quarter"
        }
      ],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 500,
        "minTxn": 400,
        "maxTxn": 5000
      },
      "forex": {
        "markup": 0.02,
        "text": "2% + GST"
      }
    },
    "metadata": {
      "tags": [
        "Co-branded",
        "Lifestyle",
        "Tata",
        "RuPay UPI"
      ],
      "bestFor": "Tata ecosystem loyalists who shop at BigBasket, Croma, Westside, Taj",
      "rating": 4.2,
      "verdict": "Best card for Tata brand users with up to 10% value back on ecosystem spends",
      "pros": [
        "Up to 10% NeuCoins on Tata Neu + NeuPass",
        "5% on Tata partner brands (BigBasket, Croma, Taj)",
        "1.5% on UPI spends via RuPay variant",
        "Low forex markup at 2%",
        "LTF offers available periodically"
      ],
      "cons": [
        "NeuCoins validity reduced to 12 months",
        "Lounge access now milestone-based",
        "Multiple category caps (2,000/month each)",
        "No rewards on rent, fuel, gaming"
      ]
    },
    "slug": "hdfc-tata-neu-infinity"
  },
  {
    "id": "hdfc-tata-neu-plus",
    "name": "Tata Neu Plus HDFC Bank Credit Card",
    "bank": "HDFC Bank",
    "image": "/assets/cards/hdfc-tata-neu-plus.png",
    "link": "https://www.hdfcbank.com/personal/pay/cards/credit-cards/tata-neu-plus-hdfc-bank-credit-card",
    "fees": {
      "joining": 499,
      "annual": 499,
      "currency": "INR",
      "waivedOn": 100000,
      "waiverText": "Waived on ₹1 Lakh spend in a year"
    },
    "eligibility": {
      "income": 25000,
      "age": { "min": 21, "max": 60 },
      "type": "Salaried/Self-Employed",
      "creditScore": 700
    },
    "rewards": {
      "type": "points",
      "name": "NeuCoins",
      "baseRate": 0.01,
      "earningText": "1% NeuCoins on all spends, up to 7% on Tata Neu app",
      "expiry": "12 months",
      "joiningBonus": "499 NeuCoins on first transaction",
      "exclusions": "Fuel, Rent, Government, Wallet loads",
      "calculator": {
        "tier": "co-branded",
        "monthlyCap": null,
        "smartBuy": {
          "type": "neucoins",
          "baseRewardRate": "NeuCoins",
          "merchants": {
            "igp": { "rate": "4%", "label": "IGP.com - 4% NeuCoins" },
            "flights": { "rate": "1%", "label": "Flights - 1% NeuCoins" },
            "hotels": { "rate": "4%", "label": "Hotels - 4% NeuCoins" },
            "trains": { "rate": "1%", "label": "Confirmtkt - 1% NeuCoins" },
            "redbus": { "rate": "1%", "label": "RedBus - 1% NeuCoins" },
            "instantVouchers": { "rate": "1%", "label": "Gyftr Vouchers - 1% NeuCoins" },
            "myntra": { "rate": "4%", "label": "Myntra - 4% NeuCoins" },
            "nykaa": { "rate": "4%", "label": "Nykaa - 4% NeuCoins" },
            "jockey": { "rate": "4%", "label": "Jockey - 4% NeuCoins" },
            "pharmeasy": { "rate": "4%", "label": "Pharmeasy - 4% NeuCoins" },
            "mmtHoliday": { "rate": "1%", "label": "MMT Holiday - 1% NeuCoins" }
          }
        },
        "categories": {
          "travel": { "rate": 0.01, "label": "1% NeuCoins" },
          "dining": { "rate": 0.01, "label": "1% NeuCoins" },
          "online": { "rate": 0.01, "label": "1% NeuCoins" },
          "tataneu": { "rate": 0.02, "label": "2% on Tata Neu App" }
        }
      },
      "redemption": {
        "baseValue": 1,
        "bestOption": "Tata Neu App (1 NeuCoin = ₹1)",
        "options": [{ "type": "Cashback", "value": 1, "desc": "Redeem on Tata Neu App" }]
      }
    },
    "features": [
      "4 Domestic Airport Lounge Access per year (1 per quarter)",
      "2% NeuCoins on Tata Neu App, 1% on other spends",
      "Zero lost card liability"
    ],
    "slug": "hdfc-tata-neu-plus"
  },
  {
    "id": "amex-platinum-travel",
    "name": "American Express Platinum Travel Credit Card",
    "bank": "American Express",
    "image": "/assets/cards/amex-platinum-travel.png",
    "link": "https://www.americanexpress.com/in/credit-cards/platinum-travel-credit-card/",
    "fees": {
      "joining": 5000,
      "annual": 5000,
      "currency": "INR",
      "waivedOn": null,
      "waiverText": "No fee waiver - milestone benefits compensate for annual fee"
    },
    "eligibility": {
      "income": 600000,
      "age": {
        "min": 18,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 750
    },
    "rewards": {
      "type": "points",
      "name": "Membership Rewards Points",
      "baseRate": 0.02,
      "earningText": "1 MR Point per \u20b950 spent (2% base rate)",
      "expiry": "Never (while card is active)",
      "joiningBonus": "10,000 MR Points on \u20b915,000 spend within 90 days (worth \u20b93,000)",
      "exclusions": "Fuel, Insurance, Utilities, Cash transactions, EMI at POS",
      "calculator": {
        "tier": "premium",
        "monthlyCap": null,
        "capResetPeriod": "calendar",
        "specialLogic": "amex-milestone",
        "portals": [
          {
            "name": "Reward Multiplier",
            "rate": 0.06,
            "label": "3X via Reward Multiplier (Amazon/Flipkart)",
            "categories": [
              "shopping",
              "travel"
            ]
          }
        ],
        "categories": {
          "travel": {
            "rate": 0.02,
            "label": "1 MR per \u20b950",
            "cap": null
          },
          "dining": {
            "rate": 0.02,
            "label": "1 MR per \u20b950",
            "cap": null
          },
          "online": {
            "rate": 0.02,
            "label": "1 MR per \u20b950 (3X with Reward Multiplier)",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No rewards on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.02,
            "label": "1 MR per \u20b950",
            "cap": null
          },
          "utilities": {
            "rate": 0,
            "label": "No rewards on utilities",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.3,
        "bestOption": "Pay with Points on Amex Travel Online or Marriott/Hilton Transfer",
        "options": [
          {
            "type": "Amex Travel Online (Pay with Points)",
            "value": 0.3,
            "desc": "1 MR = \u20b90.30 for flights/hotels",
            "recommended": true
          },
          {
            "type": "Marriott Bonvoy Transfer",
            "value": 0.6,
            "desc": "1 MR = 1 Marriott Point (1:1 ratio)",
            "recommended": true
          },
          {
            "type": "Hilton Honors Transfer",
            "value": 0.5,
            "desc": "10 MR = 9 Hilton Points",
            "recommended": true
          },
          {
            "type": "Airline Miles Transfer",
            "value": 0.3,
            "desc": "2 MR = 1 Mile (varies by partner)",
            "recommended": false
          },
          {
            "type": "Taj Vouchers",
            "value": 0.4,
            "desc": "25,000 MR = \u20b910,000 voucher",
            "recommended": false
          },
          {
            "type": "Amazon/Flipkart Vouchers",
            "value": 0.25,
            "desc": "22,000 MR = \u20b95,000 voucher",
            "recommended": false
          },
          {
            "type": "Statement Credit",
            "value": 0.25,
            "desc": "1 MR = \u20b90.25",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "8 per year (max 2 per quarter)",
        "international": "Priority Pass membership (annual fee waived, usage fee $35/visit)",
        "accessType": "Priority Pass (fee waived, usage charged)"
      },
      "milestones": [
        {
          "spend": 15000,
          "benefit": "10,000 MR Points as Welcome Gift (first 90 days)"
        },
        {
          "spend": 190000,
          "benefit": "15,000 Bonus MR Points (annual)"
        },
        {
          "spend": 400000,
          "benefit": "25,000 Bonus MR Points + \u20b910,000 Taj Stay Voucher (annual)"
        }
      ],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "0-1%",
        "cap": null,
        "text": "0% fee at HPCL below \u20b95,000, 1% above \u20b95,000"
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5%"
      },
      "hotel": {
        "taj": "25% off on BAR at Taj/SeleQtions/Gateway/Vivanta hotels"
      },
      "insurance": {
        "airAccident": 5000000,
        "lostCardLiability": true
      }
    },
    "metadata": {
      "tags": [
        "Travel",
        "Milestone",
        "Premium",
        "Amex",
        "Hotel Benefits"
      ],
      "bestFor": "Frequent travelers who can hit \u20b94 Lakh annual spend to maximize milestone rewards and Taj/Marriott benefits",
      "rating": 4.3,
      "verdict": "India's best milestone-based travel card with up to \u20b924,000 annual value for those who can hit spend targets",
      "pros": [
        "Excellent milestone rewards (40,000 points + \u20b910K Taj voucher on \u20b94L spend)",
        "Points never expire",
        "1:1 Marriott Bonvoy transfer",
        "8 complimentary domestic lounge visits",
        "Free Priority Pass membership",
        "Rewards on insurance (counted toward milestones)"
      ],
      "cons": [
        "No annual fee waiver option",
        "High forex markup at 3.5%",
        "International lounge access costs $35/visit",
        "Low base redemption value (\u20b90.25-0.30)",
        "Limited acceptance compared to Visa/Mastercard",
        "Amex temporarily paused new applications (as of 2025)"
      ]
    },
    "slug": "amex-platinum-travel"
  },
  {
    "id": 14,
    "tags": [
      "Travel",
      "Zero Forex",
      "Lounge",
      "Lifetime Free"
    ],
    "name": "Scapia Federal Credit Card",
    "calculator": {
      "baseRate": 0.02,
      "rewardType": "points",
      "categories": {
        "travel": {
          "rate": 0.04,
          "label": "20% Scapia coins travel"
        }
      },
      "monthlyCap": null,
      "feeWaiver": null,
      "highlight": "2% base, 4% travel, 0% forex, LTF",
      "tier": "premium"
    },
    "bestFor": "International Travelers",
    "verdict": "LTF, 0% forex, 10% coins on all spends.",
    "fxMarkup": "0%",
    "category": "Travel",
    "bank": "Federal Bank",
    "image": "assets/cards/scapia.png",
    "annualFee": "Lifetime Free",
    "rewardRate": "2% flat (5 Coins/\u20b9100)",
    "rewardType": "cashback",
    "rewardCaps": {
      "monthly": "No cap - Unlimited",
      "notes": "Redeem for travel on Scapia app. 0% forex + unlimited lounge."
    },
    "features": [
      "0% forex markup (BEST)",
      "2% flat on everything",
      "Unlimited domestic lounge",
      "Only LTF card with both benefits"
    ],
    "applyLink": "https://apply.scapia.cards/landing_page?referral_code=qsrcko",
    "detailedGuide": "## 14. Scapia Federal Credit Card\n\n### Overview\nA digital-first credit card by Scapia in partnership with Federal Bank, designed specifically for travelers.\n\n### Key Features\n- **Joining Fee:** Lifetime Free\n- **Annual Fee:** Lifetime Free\n- **Forex Markup:** 0% (Zero)\n- **Reward Rate:**\n  - 10% (5 Scapia Coins/\u20b9100) on all online/offline spends\n  - 20% (10 Scapia Coins/\u20b9100) on travel bookings via Scapia app\n\n### Benefits\n- **Lounge Access:** Unlimited domestic lounge access (Condition: Spend \u20b910,000 per month for Visa, \u20b915,000 for RuPay)\n- **Redemption:** 5 Coins = \u20b91 (Effective reward rate: 2% on all spends, 4% on travel)\n- **Instant Digital Issuance:** fast approval and app-based management\n- **No Cost EMI:** 3 months on travel bookings\n\n### Exclusions\n- Rent, education, cash, forex, etc. do not earn coins.\n\n### Verdict\nThe best entry-level travel card. Lifetime free + Zero Forex is a killer combination. The lounge access condition is very easy to meet.",
    "slug": "scapia-federal-credit-card"
  },
  {
    "id": 16,
    "tags": [
      "Cashback",
      "UPI",
      "Virtual",
      "Lifetime Free"
    ],
    "name": "Kiwi RuPay Credit Card",
    "bestFor": "UPI Users",
    "verdict": "Virtual RuPay card for UPI rewards.",
    "fxMarkup": "3.5%",
    "category": "Cashback",
    "bank": "Yes Bank / Axis",
    "image": "assets/cards/kiwi-rupay.png",
    "annualFee": "Lifetime Free",
    "rewardRate": "1% - 5% (Kiwis)",
    "rewardType": "cashback",
    "features": [
      "UPI on Credit Card",
      "Lifetime Free",
      "Virtual Instant Issuance"
    ],
    "applyLink": "https://gokiwi.in/",
    "detailedGuide": "## 17. Kiwi RuPay Credit Card\n\n### Overview\nA unique fintech-led credit card designed exclusively for UPI payments, currently issued by Yes Bank or Axis Bank.\n\n### Key Features\n- **Annual Fee:** Lifetime Free\n- **Reward Rate:**\n  - 2 Kiwis per \u20b950 spent (1%) on Scan & Pay\n  - 1 Kiwi = \u20b90.25 (Effective 1% return)\n  - Boosted rewards (up to 5%) with \"Kiwi Neon\" subscription (\u20b9999/year)\n\n### Benefits\n- **UPI Integration:** Seamless scan and pay via Kiwi app\n- **Virtual First:** No physical card required (optional)\n- **Accessibility:** Quick approval process\n\n### Verdict\nGreat secondary card for making small UPI payments on credit. The base 1% return on UPI is decent for a lifetime free product.",
    "slug": "kiwi-rupay-credit-card"
  },
  {
    "id": "hdfc-regalia-gold",
    "name": "HDFC Regalia Gold Credit Card",
    "bank": "HDFC Bank",
    "image": "/assets/cards/hdfc-regalia-gold.png",
    "link": "https://www.hdfcbank.com/personal/pay/cards/credit-cards/regalia-gold-credit-card",
    "fees": {
      "joining": 2500,
      "annual": 2500,
      "currency": "INR",
      "waivedOn": 400000,
      "waiverText": "Waived on \u20b94 Lakh spend in card anniversary year"
    },
    "eligibility": {
      "income": 1800000,
      "age": {
        "min": 21,
        "max": 60
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 750
    },
    "rewards": {
      "type": "points",
      "name": "Reward Points",
      "baseRate": 0.0267,
      "earningText": "4 Reward Points per \u20b9150 spent (2.67% at 1:1, up to 13% on partners)",
      "expiry": "2 years",
      "joiningBonus": "\u20b92,500 gift voucher + Club Vistara Silver + MMT Black Elite (on \u20b91L spend in 90 days)",
      "exclusions": "Rent, Government payments (rewards available on fuel, utilities, insurance)",
      "calculator": {
        "tier": "premium",
        "monthlyCap": null,
        "capResetPeriod": "statement",
        "specialLogic": null,
        "portals": [
          {
            "name": "SmartBuy Flights/Hotels",
            "rate": 0.133,
            "label": "13.3% (5X Rewards - Flights/Hotels)",
            "categories": [
              "travel",
              "hotels"
            ]
          },
          {
            "name": "SmartBuy Vouchers",
            "rate": 0.133,
            "label": "13.3% (5X Rewards - Amazon/Flipkart)",
            "categories": [
              "online",
              "shopping"
            ]
          }
        ],
        "smartBuy": {
          "baseRewardRate": "4 RP/₹150 (2.67%)",
          "pointValueTravel": 0.50,
          "pointValueVouchers": 0.50,
          "monthlyCap": 4000,
          "dailyCap": 2000,
          "merchants": {
            "igp": { "multiplier": "10X", "effectiveRate": "13.3%", "label": "IGP.com - 10X (13.3%)" },
            "flights": { "multiplier": "5X", "effectiveRate": "6.6%", "label": "Flights - 5X (6.6%)" },
            "hotels": { "multiplier": "10X", "effectiveRate": "13.3%", "label": "Hotels - 10X (13.3%)" },
            "trains": { "multiplier": "3X", "effectiveRate": "4%", "label": "Confirmtkt Trains - 3X (4%)" },
            "redbus": { "multiplier": "5X", "effectiveRate": "6.6%", "label": "RedBus - 5X (6.6%)" },
            "instantVouchers": { "multiplier": "5X", "effectiveRate": "6.6%", "label": "Instant Vouchers (Gyftr) - 5X (6.6%)" },
            "myntra": { "multiplier": "5X", "effectiveRate": "6.6%", "label": "Myntra - 5X (6.6%)" },
            "nykaa": { "multiplier": "5X", "effectiveRate": "6.6%", "label": "Nykaa - 5X (6.6%)" },
            "jockey": { "multiplier": "10X", "effectiveRate": "13.3%", "label": "Jockey - 10X (13.3%)" },
            "pharmeasy": { "multiplier": "10X", "effectiveRate": "13.3%", "label": "Pharmeasy - 10X (13.3%)" },
            "mmtHoliday": { "multiplier": "5X", "effectiveRate": "6.6%", "label": "MMT Holiday - 5X (6.6%)" }
          }
        },
        "categories": {
          "travel": {
            "rate": 0.0267,
            "label": "2.67% (4 RP/\u20b9150)",
            "cap": null
          },
          "dining": {
            "rate": 0.0267,
            "label": "2.67% (4 RP/\u20b9150)",
            "cap": null
          },
          "online": {
            "rate": 0.133,
            "label": "13.3% on Myntra/Nykaa/Reliance Digital (5X)",
            "cap": 5000
          },
          "fuel": {
            "rate": 0.0267,
            "label": "2.67% (4 RP/\u20b9150) + 1% surcharge waiver",
            "cap": null
          },
          "groceries": {
            "rate": 0.0267,
            "label": "2.67% (4 RP/\u20b9150)",
            "cap": null
          },
          "utilities": {
            "rate": 0.0267,
            "label": "2.67% (4 RP/\u20b9150)",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.5,
        "bestOption": "SmartBuy Flights/Hotels or Gold Catalogue",
        "options": [
          {
            "type": "SmartBuy Flights/Hotels",
            "value": 0.5,
            "desc": "1 RP = \u20b90.50 (up to 70% of booking, max 50K RP/month)",
            "recommended": true
          },
          {
            "type": "Gold Catalogue",
            "value": 0.65,
            "desc": "1 RP = \u20b90.65 (Apple, Bose, Fitbit)",
            "recommended": true
          },
          {
            "type": "Airmiles",
            "value": 0.5,
            "desc": "1 RP = 0.5 Airmile",
            "recommended": false
          },
          {
            "type": "Vouchers",
            "value": 0.35,
            "desc": "1 RP = \u20b90.35",
            "recommended": false
          },
          {
            "type": "Statement Credit",
            "value": 0.2,
            "desc": "1 RP = \u20b90.20 (max 50K RP/month)",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "12 per year (no spending threshold)",
        "international": "6 per year via Priority Pass",
        "accessType": "Priority Pass"
      },
      "milestones": [
        {
          "spend": 150000,
          "benefit": "\u20b91,500 voucher (Marriott/Myntra/M&S/Reliance Digital) per quarter"
        },
        {
          "spend": 500000,
          "benefit": "\u20b95,000 SmartBuy flight voucher annually"
        },
        {
          "spend": 750000,
          "benefit": "Additional \u20b95,000 SmartBuy flight voucher annually"
        }
      ],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 500,
        "minTxn": 400,
        "maxTxn": 5000
      },
      "forex": {
        "markup": 0.02,
        "text": "2%"
      }
    },
    "metadata": {
      "tags": [
        "Premium",
        "Travel",
        "Lifestyle",
        "Priority Pass"
      ],
      "bestFor": "Frequent travelers wanting premium benefits at a moderate fee",
      "rating": 4.4,
      "verdict": "Best mid-tier premium card with solid rewards, lounge access, and travel perks",
      "pros": [
        "Rewards on insurance, utilities, education, fuel",
        "5X on partner brands (Myntra, Nykaa, Reliance Digital)",
        "12 domestic + 6 international lounge visits",
        "Quarterly and annual milestone vouchers",
        "Low forex markup at 2%"
      ],
      "cons": [
        "\u20b92,500 + GST fee with \u20b94L waiver threshold",
        "Base redemption value (\u20b90.50) lower than Infinia",
        "SmartBuy bonus capped at 5,000 RP/month",
        "\u20b999 redemption fee applies"
      ]
    },
    "slug": "hdfc-regalia-gold"
  },
  {
    "id": "yes-bank-marquee",
    "name": "Yes Bank Marquee Credit Card",
    "bank": "Yes Bank",
    "image": "/assets/cards/yes-bank-marquee.png",
    "link": "https://www.yesbank.in/personal-banking/yes-individual/cards/credit-cards/marquee-credit-card",
    "fees": {
      "joining": 9999,
      "annual": 4999,
      "currency": "INR",
      "waivedOn": 1000000,
      "waiverText": "Annual fee waived on \u20b910 Lakh annual spend"
    },
    "eligibility": {
      "income": 3600000,
      "age": {
        "min": 21,
        "max": 60
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 750
    },
    "rewards": {
      "type": "points",
      "name": "YES Rewardz Points",
      "baseRate": 0.0225,
      "earningText": "18 RP per \u20b9200 offline (2.25%); 36 RP per \u20b9200 online (4.5%)",
      "expiry": "36 months from date of earning",
      "joiningBonus": "40,000 YES Rewardz Points (worth \u20b910,000) on paying joining fee + ETPrime subscription worth \u20b93,199",
      "exclusions": "Rental, Wallet, Fuel, Government, Marketing/Advertising, Post-purchase EMI, Instant EMI",
      "calculator": {
        "tier": "super-premium",
        "monthlyCap": 100000,
        "capResetPeriod": "statement",
        "specialLogic": "Online spends capped at 100,000 RP/statement (~\u20b95.5L spend). 10 RP/\u20b9200 on select categories (utilities, insurance, recharge). Redemption capped at 70% of cart value for flights/hotels.",
        "categories": {
          "travel": {
            "rate": 0.045,
            "label": "4.5% online / 2.25% offline",
            "cap": null
          },
          "dining": {
            "rate": 0.045,
            "label": "4.5% online / 2.25% offline",
            "cap": null
          },
          "online": {
            "rate": 0.045,
            "label": "36 RP/\u20b9200 online shopping",
            "cap": 25000
          },
          "fuel": {
            "rate": 0,
            "label": "No rewards on fuel",
            "cap": 0
          },
          "groceries": {
            "rate": 0.045,
            "label": "4.5% online / 2.25% offline",
            "cap": null
          },
          "utilities": {
            "rate": 0.0125,
            "label": "10 RP/\u20b9200 on select categories",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Flight/Hotel bookings via YES Rewardz portal at \u20b90.25/point",
        "options": [
          {
            "type": "Flight/Hotel Booking",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25 (Max 3L points/month, 70% redemption limit)",
            "recommended": true
          },
          {
            "type": "Club Vistara Points",
            "value": 0.25,
            "desc": "10 RP = 1 CV Point",
            "recommended": true
          },
          {
            "type": "InterMiles",
            "value": 0.25,
            "desc": "10 RP = 1 InterMile",
            "recommended": false
          },
          {
            "type": "Gift Vouchers (Swiggy)",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": true
          },
          {
            "type": "Gift Vouchers (Amazon/Flipkart)",
            "value": 0.1,
            "desc": "1 RP = \u20b90.10 (devalued)",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "6 per quarter (Primary + Add-on). Requires \u20b91 Lakh quarterly spend from April 2025",
        "international": "Unlimited for Primary + Add-on. 4 guest visits/year",
        "accessType": "Direct card swipe (no Priority Pass needed)"
      },
      "milestones": [
        {
          "spend": 0,
          "benefit": "40,000 RP + ETPrime subscription on joining fee payment"
        },
        {
          "spend": 1000000,
          "benefit": "Annual fee waiver"
        },
        {
          "spend": 0,
          "benefit": "20,000 RP on renewal fee payment"
        }
      ],
      "golf": {
        "included": true,
        "text": "4 green fee waivers + 12 complimentary lessons (1/month) at select courses"
      },
      "movies": {
        "included": true,
        "text": "BOGO on BookMyShow, max \u20b9800/ticket, 3 free tickets/month"
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 1000
      },
      "forex": {
        "markup": 0.01,
        "text": "1% markup - One of the lowest in India"
      }
    },
    "metadata": {
      "tags": [
        "Super Premium",
        "Low Forex",
        "Unlimited Lounge",
        "High Rewards",
        "Travel",
        "Online Shopping"
      ],
      "bestFor": "High spenders seeking premium travel benefits with 4.5% returns on online spends and lowest forex markup",
      "rating": 4.5,
      "verdict": "Best-in-class for online shopping rewards with 4.5% return, unlimited international lounge access, and 1% forex markup. Ideal for international travelers and heavy online spenders.",
      "pros": [
        "Industry-leading 4.5% reward rate on online spends",
        "Lowest forex markup at 1%",
        "Unlimited international lounge access for primary + add-on",
        "40,000 RP welcome bonus covers joining fee",
        "BOGO movie tickets up to \u20b9800/ticket"
      ],
      "cons": [
        "\u20b91 Lakh quarterly spend required for domestic lounge access from April 2025",
        "Limited miles transfer partners (only Club Vistara & InterMiles)",
        "70% redemption cap on flight/hotel bookings",
        "Gift voucher redemption value devalued to \u20b90.10-0.15/point"
      ]
    },
    "slug": "yes-bank-marquee"
  },
  {
    "id": "marriott-bonvoy-hdfc",
    "name": "Marriott Bonvoy HDFC Bank Credit Card",
    "bank": "HDFC Bank",
    "image": "/assets/cards/hdfc-marriott-bonvoy.png",
    "link": "https://www.hdfcbank.com/personal/pay/cards/credit-cards/marriott-bonvoy-credit-card",
    "fees": {
      "joining": 3000,
      "annual": 3000,
      "currency": "INR",
      "waivedOn": null,
      "waiverText": "No fee waiver available"
    },
    "eligibility": {
      "income": 1200000,
      "age": {
        "min": 21,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 750
    },
    "rewards": {
      "type": "points",
      "name": "Marriott Bonvoy Points",
      "baseRate": 0.0133,
      "earningText": "8 points/\u20b9150 at Marriott Hotels, 4 points/\u20b9150 on Travel/Dining, 2 points/\u20b9150 on others",
      "expiry": "Never (with activity every 24 months)",
      "joiningBonus": "1 Free Night Award (up to 15,000 points) on first transaction or fee levy",
      "exclusions": "Fuel, Wallet loads, Gift cards, Vouchers, Cash advances, EMI",
      "calculator": {
        "tier": "co-branded",
        "monthlyCap": null,
        "capResetPeriod": "statement",
        "specialLogic": "marriott-tiered",
        "categories": {
          "travel": {
            "rate": 0.0267,
            "label": "2.67% (4 points/\u20b9150)",
            "cap": null
          },
          "dining": {
            "rate": 0.0267,
            "label": "2.67% (4 points/\u20b9150)",
            "cap": null
          },
          "online": {
            "rate": 0.0133,
            "label": "1.33% (2 points/\u20b9150)",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No points on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.0133,
            "label": "1.33% (2 points/\u20b9150)",
            "cap": null
          },
          "utilities": {
            "rate": 0.0133,
            "label": "1.33% (2 points/\u20b9150)",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.7,
        "bestOption": "Marriott Bonvoy hotel stays",
        "options": [
          {
            "type": "Marriott Hotel Stay",
            "value": 0.7,
            "desc": "Book at 8000+ properties worldwide",
            "recommended": true
          },
          {
            "type": "Free Night Awards",
            "value": 0.7,
            "desc": "Redeem milestone Free Nights at Marriott properties",
            "recommended": true
          },
          {
            "type": "Marriott Bonvoy Moments",
            "value": 0.5,
            "desc": "Experiences and events",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "12 per year (both domestic and international terminals)",
        "international": "12 per year",
        "accessType": "DCI Travel Tool App"
      },
      "milestones": [
        {
          "spend": 0,
          "benefit": "1 Free Night Award (up to 15K points) on joining"
        },
        {
          "spend": 600000,
          "benefit": "1 Free Night Award (up to 15K points)"
        },
        {
          "spend": 900000,
          "benefit": "1 Free Night Award (up to 15K points)"
        },
        {
          "spend": 1500000,
          "benefit": "1 Free Night Award (up to 15K points)"
        }
      ],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "0%",
        "cap": 0
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5%"
      }
    },
    "metadata": {
      "tags": [
        "Co-branded",
        "Hotel",
        "Travel",
        "Marriott",
        "Diners Club"
      ],
      "bestFor": "Marriott loyalists who frequently stay at Marriott properties",
      "rating": 4.1,
      "verdict": "India's first hotel co-branded card with excellent Marriott-specific rewards",
      "pros": [
        "Up to 4 Free Night Awards annually on milestones",
        "8X points at Marriott properties (5.33% value)",
        "Complimentary Silver Elite status",
        "12+12 lounge access (domestic + international)",
        "Points never expire with activity"
      ],
      "cons": [
        "No fee waiver option",
        "Benefits limited to Marriott ecosystem",
        "3.5% forex markup is high",
        "Diners Club network has limited acceptance",
        "No fuel surcharge waiver"
      ]
    },
    "slug": "marriott-bonvoy-hdfc"
  },
  {
    "id": "irctc-sbi-premier",
    "name": "IRCTC SBI Card Premier",
    "bank": "SBI Card",
    "image": "/assets/cards/irctc-sbi-premier.png",
    "link": "https://www.sbicard.com/en/personal/credit-cards/travel/irctc-premier-card.page",
    "fees": {
      "joining": 1499,
      "annual": 1499,
      "currency": "INR",
      "waivedOn": 200000,
      "waiverText": "Annual fee reversed on spends of Rs. 2 Lakh in a year"
    },
    "eligibility": {
      "income": 300000,
      "age": {
        "min": 21,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 750
    },
    "rewards": {
      "type": "points",
      "name": "IRCTC Reward Points",
      "baseRate": 0.008,
      "earningText": "1 RP per Rs. 125 (0.8% base), 3 RP on dining/utility, 10% on AC tickets",
      "expiry": "2 years from accrual",
      "joiningBonus": "1,500 Reward Points equivalent to Rs. 1,500 on payment of joining fee",
      "exclusions": "Fuel, Wallet loads, Rent, Government payments",
      "calculator": {
        "tier": "co-branded",
        "monthlyCap": null,
        "capResetPeriod": "calendar",
        "specialLogic": "10% value back on AC1, AC2, AC3, Executive Chair, Chair Car via IRCTC (1 RP = Rs. 1 for IRCTC)",
        "categories": {
          "travel": {
            "rate": 0.1,
            "label": "10% on AC tickets via IRCTC",
            "cap": null
          },
          "dining": {
            "rate": 0.024,
            "label": "3 RP/Rs. 125 (2.4%)",
            "cap": null
          },
          "online": {
            "rate": 0.008,
            "label": "1 RP/Rs. 125 (0.8%)",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No rewards on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.008,
            "label": "1 RP/Rs. 125 (0.8%)",
            "cap": null
          },
          "utilities": {
            "rate": 0.024,
            "label": "3 RP/Rs. 125 on standing instructions (2.4%)",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 1,
        "bestOption": "Redeem on IRCTC website/app for train tickets",
        "options": [
          {
            "type": "IRCTC Ticket Booking",
            "value": 1,
            "desc": "1 RP = Rs. 1 on IRCTC",
            "recommended": true
          },
          {
            "type": "Statement Credit",
            "value": 0.25,
            "desc": "4 RP = Rs. 1 (lower value)",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "8 Railway Lounge visits per year (max 2 per quarter)",
        "international": "None",
        "accessType": "IRCTC Railway Lounges"
      },
      "milestones": [
        {
          "spend": 50000,
          "benefit": "2,500 Bonus Reward Points (annual travel spends)"
        },
        {
          "spend": 100000,
          "benefit": "5,000 Bonus Reward Points (annual travel spends)"
        }
      ],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 100
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5%"
      }
    },
    "metadata": {
      "tags": [
        "Travel",
        "Railways",
        "IRCTC",
        "Co-branded",
        "Trains"
      ],
      "bestFor": "Frequent train travelers booking AC class tickets through IRCTC",
      "rating": 4.1,
      "verdict": "Excellent for train travelers with 10% back on AC tickets and Rs. 1 RP value",
      "pros": [
        "10% value back on AC train tickets",
        "1 RP = Rs. 1 redemption on IRCTC (4x standard value)",
        "Welcome bonus equals joining fee",
        "Up to 17.5% return with milestone rewards",
        "8 complimentary railway lounge visits",
        "1% transaction fee savings on IRCTC"
      ],
      "cons": [
        "Benefits limited to train travel",
        "Low base rate of 0.8% on other spends",
        "No airport lounge access",
        "Rail accident insurance discontinued July 2025"
      ]
    },
    "slug": "irctc-sbi-premier"
  },
  {
    "id": "hdfc-millennia",
    "name": "HDFC Millennia Credit Card",
    "bank": "HDFC Bank",
    "image": "/assets/cards/hdfc-millennia.png",
    "link": "https://www.hdfcbank.com/personal/pay/cards/credit-cards/millennia-credit-card",
    "fees": {
      "joining": 1000,
      "annual": 1000,
      "currency": "INR",
      "waivedOn": 100000,
      "waiverText": "Waived on \u20b91 Lakh spend in 12 months"
    },
    "eligibility": {
      "income": 420000,
      "age": {
        "min": 21,
        "max": 40
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 700
    },
    "rewards": {
      "type": "cashback",
      "name": "CashPoints",
      "baseRate": 0.01,
      "earningText": "5% on 10 partner brands, 1% on other spends (as CashPoints)",
      "expiry": "2 years",
      "joiningBonus": "1,000 CashPoints on joining fee payment",
      "exclusions": "Fuel, Rent, Government, Wallet loads, EMI, Education (via third-party apps)",
      "calculator": {
        "tier": "entry",
        "monthlyCap": 2000,
        "capResetPeriod": "calendar",
        "specialLogic": "millennia-partner",
        "categories": {
          "travel": {
            "rate": 0.01,
            "label": "1% CashPoints",
            "cap": 1000
          },
          "dining": {
            "rate": 0.05,
            "label": "5% on Swiggy, Zomato",
            "cap": 1000
          },
          "online": {
            "rate": 0.05,
            "label": "5% on Amazon, Flipkart, Myntra, etc.",
            "cap": 1000
          },
          "fuel": {
            "rate": 0,
            "label": "No CashPoints on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.01,
            "label": "1% CashPoints",
            "cap": 1000
          },
          "utilities": {
            "rate": 0.01,
            "label": "1% CashPoints",
            "cap": 1000
          }
        },
        "smartBuy": {
          "type": "cashback",
          "baseRewardRate": "Cashback Card",
          "monthlyCap": 1000,
          "dailyCap": null,
          "merchants": {
            "igp": { "rate": "10%", "label": "IGP.com - 10% Cashback" },
            "flights": { "rate": "5%", "label": "Flights - 5% Cashback" },
            "hotels": { "rate": "5%", "label": "Hotels - 5% Cashback" },
            "trains": { "rate": "1%", "label": "Confirmtkt Trains - 1% Cashback" },
            "redbus": { "rate": "5%", "label": "RedBus - 5% Cashback" },
            "instantVouchers": { "rate": "5%", "label": "Instant Vouchers (Gyftr) - 5% Cashback" },
            "myntra": { "rate": "5%", "label": "Myntra - 5% Cashback" },
            "nykaa": { "rate": "5%", "label": "Nykaa - 5% Cashback" },
            "jockey": { "rate": "10%", "label": "Jockey - 10% Cashback" },
            "pharmeasy": { "rate": "10%", "label": "Pharmeasy - 10% Cashback" },
            "mmtHoliday": { "rate": "5%", "label": "MMT Holiday - 5% Cashback" }
          }
        }
      },
      "redemption": {
        "baseValue": 1,
        "bestOption": "Statement credit",
        "options": [
          {
            "type": "Statement Credit",
            "value": 1,
            "desc": "1 CashPoint = \u20b91 (min 500 points, max 3K/month, \u20b950 fee)",
            "recommended": true
          },
          {
            "type": "SmartBuy Flights/Hotels",
            "value": 1,
            "desc": "1 CashPoint = \u20b91 (up to 50% of booking, max 50K/month)",
            "recommended": true
          },
          {
            "type": "Products/Vouchers",
            "value": 0.3,
            "desc": "1 CashPoint = \u20b90.30",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "1 per quarter (bundled with milestone)",
        "international": "None",
        "accessType": "Card swipe"
      },
      "milestones": [
        {
          "spend": 100000,
          "benefit": "\u20b91,000 gift voucher (BigBasket/BookMyShow/PVR/Pizza Hut) per quarter"
        }
      ],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 250,
        "minTxn": 400,
        "maxTxn": 5000
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5%"
      }
    },
    "metadata": {
      "tags": [
        "Entry Level",
        "Cashback",
        "Millennials",
        "Online Shopping"
      ],
      "bestFor": "Young professionals who shop frequently on Amazon, Flipkart, Swiggy, Zomato",
      "rating": 4,
      "verdict": "Best entry-level card for millennials with 5% on top 10 online brands",
      "pros": [
        "5% on Amazon, Flipkart, Myntra, Swiggy, Zomato, Uber, etc.",
        "1 CashPoint = \u20b91 redemption (1:1 ratio)",
        "Low \u20b91 Lakh waiver threshold",
        "Quarterly milestone vouchers",
        "Good beginner card for credit building"
      ],
      "cons": [
        "Separate 1,000 point caps on 5% and 1% categories",
        "\u20b950 redemption fee from Aug 2024",
        "Lounge access tied to milestone benefit",
        "No international lounge access",
        "3.5% forex markup"
      ]
    },
    "slug": "hdfc-millennia"
  },
  {
    "id": 30,
    "tags": [
      "Cashback",
      "Metal",
      "Lifetime Free",
      "Low Forex"
    ],
    "name": "OneCard Credit Card",
    "calculator": {
      "baseRate": 0.002,
      "rewardType": "cashback",
      "categories": {},
      "monthlyCap": null,
      "feeWaiver": null,
      "highlight": "5X top 2 categories, 1% forex",
      "specialLogic": "onecard",
      "tier": "entry"
    },
    "bestFor": "Metal Card Enthusiasts",
    "verdict": "LTF, 5X on top 2 categories, no cap.",
    "fxMarkup": "1%",
    "category": "Cashback",
    "bank": "FPL Technologies",
    "image": "assets/cards/onecard.png",
    "annualFee": "Lifetime Free",
    "rewardRate": "5X on Top 2 Categories (~5%)",
    "rewardType": "points",
    "rewardCaps": {
      "monthly": "25K cap on Edu/Bills/Insurance (Jan 2025)",
      "notes": "5X on top 2 categories if 3+ categories used"
    },
    "features": [
      "Lifetime free metal card",
      "5X on top 2 spending categories",
      "25K cap on Edu/Bills/Insurance (Jan 2025)",
      "1% forex markup"
    ],
    "applyLink": "https://www.getonecard.app/",
    "detailedGuide": "## 31. OneCard Credit Card\n\n### Overview\nIndia's first mobile-first metal credit card backed by FPL Technologies.\n\n### Key Features\n- **Annual Fee:** Lifetime Free\n- **Rewards:** 5X on your top 2 spending categories (auto-detected)\n- **Forex:** 1% markup (among the lowest for LTF cards)\n\n### Benefits\n- **Metal Build:** Premium feel\n- **App Control:** Full card control via app\n- **Dynamic Rewards:** AI picks your best categories\n\n### Verdict\nStylish lifetime free metal card. The auto-category detection for 5X rewards is unique and useful.",
    "slug": "onecard-credit-card"
  },
  {
    "id": "irctc-hdfc",
    "name": "IRCTC HDFC Bank Credit Card",
    "bank": "HDFC Bank",
    "image": "/assets/cards/hdfc-irctc.png",
    "link": "https://www.hdfcbank.com/personal/pay/cards/credit-cards/irctc-credit-card",
    "fees": {
      "joining": 500,
      "annual": 500,
      "currency": "INR",
      "waivedOn": 150000,
      "waiverText": "Waived on \u20b91.5 Lakh spend in anniversary year"
    },
    "eligibility": {
      "income": 180000,
      "age": {
        "min": 21,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 700
    },
    "rewards": {
      "type": "points",
      "name": "Reward Points",
      "baseRate": 0.01,
      "earningText": "5 RP per \u20b9100 on IRCTC (5%), 1 RP per \u20b9100 on others (1%)",
      "expiry": "2 years",
      "joiningBonus": "\u20b9500 gift voucher on first transaction within 37 days",
      "exclusions": "Fuel, Wallet loads, Gift cards, Vouchers, EMI, Government, Education, Rent",
      "calculator": {
        "tier": "co-branded",
        "monthlyCap": 1000,
        "capResetPeriod": "calendar",
        "specialLogic": "irctc-rail",
        "categories": {
          "travel": {
            "rate": 0.05,
            "label": "5% on IRCTC bookings (5 RP/\u20b9100)",
            "cap": 1000
          },
          "dining": {
            "rate": 0.01,
            "label": "1% (1 RP/\u20b9100)",
            "cap": null
          },
          "online": {
            "rate": 0.01,
            "label": "1% (1 RP/\u20b9100)",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No rewards on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.01,
            "label": "1% (capped at 1,000 RP/month)",
            "cap": 1000
          },
          "utilities": {
            "rate": 0.01,
            "label": "1% (1 RP/\u20b9100)",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 1,
        "bestOption": "Train ticket booking via SmartBuy",
        "options": [
          {
            "type": "IRCTC Train Booking (SmartBuy)",
            "value": 1,
            "desc": "1 RP = \u20b91 (up to 70% of fare, min 100 RP)",
            "recommended": true
          },
          {
            "type": "IRCTC Vouchers",
            "value": 1,
            "desc": "1 RP = \u20b91 via SmartBuy/NetBanking",
            "recommended": true
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "8 IRCTC Executive Lounge visits per year (2/quarter)",
        "international": "None",
        "accessType": "Railway Lounge"
      },
      "milestones": [
        {
          "spend": 30000,
          "benefit": "\u20b9500 gift voucher per quarter"
        }
      ],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 250,
        "minTxn": 400,
        "maxTxn": 5000
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5%"
      }
    },
    "metadata": {
      "tags": [
        "Co-branded",
        "Travel",
        "Railways",
        "IRCTC",
        "RuPay UPI"
      ],
      "bestFor": "Frequent train travelers who book via IRCTC",
      "rating": 3.8,
      "verdict": "Best card for train travelers with 5% on IRCTC + 5% SmartBuy cashback",
      "pros": [
        "5% rewards on IRCTC bookings",
        "Additional 5% cashback via SmartBuy",
        "1% IRCTC transaction charge waiver",
        "8 railway lounge visits/year",
        "RuPay variant supports UPI with rewards"
      ],
      "cons": [
        "Low 1% base reward rate on non-IRCTC spends",
        "Monthly cap of 1,000 RP on accelerated rewards",
        "No airport lounge access",
        "Limited to train travel benefits",
        "\u20b999 redemption fee"
      ]
    },
    "slug": "irctc-hdfc"
  },
  {
    "id": "hdfc-pixel-play",
    "name": "HDFC Pixel Play Credit Card",
    "bank": "HDFC Bank",
    "image": "/assets/cards/hdfc-pixel-play.png",
    "link": "https://www.hdfcbank.com/personal/pay/cards/credit-cards/pixel-play-credit-card",
    "fees": {
      "joining": 500,
      "annual": 500,
      "currency": "INR",
      "waivedOn": 100000,
      "waiverText": "Joining fee waived on \u20b920K in 90 days; Annual fee waived on \u20b91L/year"
    },
    "eligibility": {
      "income": 300000,
      "age": {
        "min": 21,
        "max": 60
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 700
    },
    "rewards": {
      "type": "cashback",
      "name": "CashPoints",
      "baseRate": 0.01,
      "earningText": "5% on 2 chosen categories, 3% on 1 e-commerce merchant, 1% on others",
      "expiry": "2 years",
      "joiningBonus": "Joining fee waiver on \u20b920,000 spend in 90 days",
      "exclusions": "Fuel, Rent, EMI, Wallet loads, Government",
      "calculator": {
        "tier": "entry",
        "monthlyCap": 1500,
        "capResetPeriod": "calendar",
        "specialLogic": "pixel-customizable",
        "categories": {
          "travel": {
            "rate": 0.05,
            "label": "5% if Travel pack selected",
            "cap": 500
          },
          "dining": {
            "rate": 0.05,
            "label": "5% if Dining pack selected (BookMyShow, Zomato)",
            "cap": 500
          },
          "online": {
            "rate": 0.03,
            "label": "3% on Amazon/Flipkart/PayZapp (choose 1)",
            "cap": 500
          },
          "fuel": {
            "rate": 0,
            "label": "No CashPoints on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.05,
            "label": "5% if Grocery pack selected",
            "cap": 500
          },
          "utilities": {
            "rate": 0.01,
            "label": "1% CashPoints",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 1,
        "bestOption": "PayZapp wallet for brand vouchers",
        "options": [
          {
            "type": "PayZapp Wallet",
            "value": 1,
            "desc": "Redeem for brand vouchers (min 1,000 CashPoints)",
            "recommended": true
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "None",
        "international": "None",
        "accessType": "None"
      },
      "milestones": [],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 250,
        "minTxn": 400,
        "maxTxn": 5000
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5%"
      }
    },
    "metadata": {
      "tags": [
        "Digital",
        "Customizable",
        "Cashback",
        "Entry Level",
        "PayZapp"
      ],
      "bestFor": "Digital-first users who want to customize their reward categories",
      "rating": 3.9,
      "verdict": "India's first customizable digital credit card with up to 5% on chosen categories",
      "pros": [
        "Choose 2 categories for 5% + 1 e-commerce for 3%",
        "Customizable card design and billing cycle",
        "Fully digital management via PayZapp",
        "Low \u20b9500 annual fee with easy waiver",
        "1% UPI cashback on RuPay variant"
      ],
      "cons": [
        "500 points cap per category per month",
        "Redemption only via PayZapp wallet",
        "No lounge access",
        "Categories changeable only every 3 months",
        "Shared limit if existing HDFC card holder"
      ]
    },
    "slug": "hdfc-pixel-play"
  },
  {
    "id": "hdfc-pixel-go",
    "name": "HDFC Pixel Go Credit Card",
    "bank": "HDFC Bank",
    "image": "/assets/cards/hdfc-pixel-go.png",
    "link": "https://www.hdfcbank.com/personal/pay/cards/credit-cards/pixel-go-credit-card",
    "fees": {
      "joining": 250,
      "annual": 250,
      "currency": "INR",
      "waivedOn": 50000,
      "waiverText": "Joining fee waived on \u20b910K in 90 days; Annual fee waived on \u20b950K/year"
    },
    "eligibility": {
      "income": 240000,
      "age": {
        "min": 21,
        "max": 60
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 650
    },
    "rewards": {
      "type": "cashback",
      "name": "CashPoints",
      "baseRate": 0.01,
      "earningText": "5% on SmartBuy, 1% on all other eligible spends",
      "expiry": "2 years",
      "joiningBonus": "Joining fee waiver on \u20b910,000 spend in 90 days",
      "exclusions": "Fuel, Rent, EMI, Wallet loads, Government",
      "calculator": {
        "tier": "entry",
        "monthlyCap": null,
        "capResetPeriod": "calendar",
        "specialLogic": null,
        "smartBuy": {
          "type": "cashback",
          "baseRewardRate": "1% Cashback",
          "monthlyCap": null,
          "dailyCap": null,
          "merchants": {
            "amazonPrime": { "rate": "5%", "label": "Amazon (Prime Members) - 5% Cashback" },
            "amazonNonPrime": { "rate": "3%", "label": "Amazon (Non-Prime) - 3% Cashback" },
            "amazonPayPartners": { "rate": "2%", "label": "Amazon Pay Partners (Swiggy, Uber, etc.) - 2%" },
            "flights": { "rate": "5%", "label": "Flights via Amazon Pay (Prime) - 5%" },
            "hotels": { "rate": "5%", "label": "Hotels via Amazon Pay (Prime) - 5%" }
          }
        },
        "categories": {
          "travel": {
            "rate": 0.05,
            "label": "5% on SmartBuy travel",
            "cap": 500
          },
          "dining": {
            "rate": 0.01,
            "label": "1% CashPoints",
            "cap": null
          },
          "online": {
            "rate": 0.05,
            "label": "5% on SmartBuy",
            "cap": 500
          },
          "fuel": {
            "rate": 0,
            "label": "No CashPoints on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.01,
            "label": "1% CashPoints",
            "cap": null
          },
          "utilities": {
            "rate": 0.01,
            "label": "1% CashPoints",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 1,
        "bestOption": "PayZapp wallet for brand vouchers",
        "options": [
          {
            "type": "PayZapp Wallet",
            "value": 1,
            "desc": "Redeem for brand vouchers (min 500 CashPoints)",
            "recommended": true
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "None",
        "international": "None",
        "accessType": "None"
      },
      "milestones": [],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 250,
        "minTxn": 400,
        "maxTxn": 5000
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5%"
      }
    },
    "metadata": {
      "tags": [
        "Digital",
        "Entry Level",
        "Cashback",
        "Beginner",
        "PayZapp"
      ],
      "bestFor": "Credit card beginners looking for a simple, low-fee digital card",
      "rating": 3.6,
      "verdict": "Best beginner card with simple 1% cashback and easy fee waiver",
      "pros": [
        "Lowest fee at \u20b9250 + GST",
        "Easy \u20b950K waiver threshold",
        "1% unlimited cashback on most spends",
        "5% on SmartBuy purchases",
        "Fully digital via PayZapp"
      ],
      "cons": [
        "Low 1% base reward rate",
        "SmartBuy cashback capped at 500/month",
        "No lounge access",
        "Limited to PayZapp redemption",
        "No customization like Pixel Play"
      ]
    },
    "slug": "hdfc-pixel-go"
  },
  {
    "id": "axis-magnus",
    "name": "Axis Magnus Credit Card",
    "bank": "Axis Bank",
    "image": "/assets/cards/axis-magnus.png",
    "link": "https://www.axisbank.com/retail/cards/credit-card/axis-bank-magnus-credit-card",
    "fees": {
      "joining": 12500,
      "annual": 12500,
      "currency": "INR",
      "waivedOn": 2500000,
      "waiverText": "Waived on \u20b925 Lakh spend in preceding anniversary year (excludes insurance, gold, fuel)"
    },
    "eligibility": {
      "income": 2400000,
      "age": {
        "min": 21,
        "max": 70
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 750
    },
    "rewards": {
      "type": "points",
      "name": "EDGE Reward Points",
      "baseRate": 0.06,
      "earningText": "12 EDGE Points per \u20b9200 up to \u20b91.5L/month, 35 EDGE Points per \u20b9200 above \u20b91.5L",
      "expiry": "3 years from credit (points forfeited 30 days after card closure)",
      "joiningBonus": "Choice of \u20b912,500 voucher (Luxe/Postcard Hotels/Yatra)",
      "exclusions": "Fuel, Insurance, Gold/Jewellery, Utilities, Govt spends, Wallet recharge, Rent (capped at \u20b950K/month with 1% fee), EMI",
      "calculator": {
        "tier": "super-premium",
        "monthlyCap": null,
        "capResetPeriod": "calendar",
        "specialLogic": "axis-magnus-tiered",
        "portals": [
          {
            "name": "Travel Edge",
            "rate": 0.15,
            "label": "5X via Travel Edge (Travel/Hotels)",
            "categories": [
              "travel",
              "hotels"
            ]
          }
        ],
        "categories": {
          "travel": {
            "rate": 0.15,
            "label": "60 EDGE pts/\u20b9200 on Travel EDGE (up to \u20b92L/month)",
            "cap": 600000
          },
          "dining": {
            "rate": 0.06,
            "label": "12-35 EDGE pts/\u20b9200 based on monthly spend tier",
            "cap": null
          },
          "online": {
            "rate": 0.06,
            "label": "12-35 EDGE pts/\u20b9200 based on monthly spend tier",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No rewards on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.06,
            "label": "12-35 EDGE pts/\u20b9200 based on monthly spend tier",
            "cap": null
          },
          "utilities": {
            "rate": 0,
            "label": "No rewards on utilities",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.4,
        "bestOption": "Airmiles/Hotel Transfer (5:2 ratio)",
        "options": [
          {
            "type": "Airmiles Transfer (Group B)",
            "value": 0.4,
            "desc": "5 EDGE = 2 Airmiles (max 4L points/year)",
            "recommended": true
          },
          {
            "type": "Airmiles Transfer (Group A)",
            "value": 0.4,
            "desc": "5 EDGE = 2 Airmiles (max 1L points/year)",
            "recommended": true
          },
          {
            "type": "Hotel Points Transfer",
            "value": 0.4,
            "desc": "5 EDGE = 2 Hotel Points",
            "recommended": true
          },
          {
            "type": "Travel EDGE Portal",
            "value": 0.2,
            "desc": "1 EDGE = \u20b90.20 for flights/hotels",
            "recommended": false
          },
          {
            "type": "Product Catalogue",
            "value": 0.2,
            "desc": "1 EDGE = \u20b90.20",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "Unlimited (requires \u20b950K spend in previous 3 months, waived for new cards)",
        "international": "Unlimited (Priority Pass) + 4 guest visits per year",
        "accessType": "Priority Pass"
      },
      "milestones": [],
      "golf": {
        "included": false,
        "text": "Removed in April 2024 devaluation"
      },
      "movies": {
        "included": false,
        "text": "BOGO removed in May 2024"
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 400,
        "minTxn": 400,
        "maxTxn": 4000
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5%"
      },
      "dining": {
        "discount": "Up to 30% off at 4,000+ restaurants"
      },
      "hotel": {
        "oberoi": "Up to 15% off at Oberoi/Trident hotels"
      }
    },
    "metadata": {
      "tags": [
        "Super Premium",
        "Travel",
        "Airmiles",
        "Priority Pass",
        "High Spender"
      ],
      "bestFor": "High spenders (\u20b91.5L+/month) seeking accelerated rewards and airmile transfers for premium travel",
      "rating": 4,
      "verdict": "Once India's best travel card, now best suited for heavy spenders who can maximize tiered rewards and airmile transfers",
      "pros": [
        "Up to 17.5% reward rate on spends above \u20b91.5L/month",
        "Up to 30% on Travel EDGE portal",
        "Unlimited lounge access (domestic + international)",
        "20+ airline and hotel transfer partners",
        "Welcome voucher worth \u20b912,500"
      ],
      "cons": [
        "Devalued 5:2 airmile conversion (was 5:4)",
        "High \u20b925 Lakh spend required for fee waiver",
        "Domestic lounge access now spend-based",
        "Only 4 guest visits (reduced from 8)",
        "No rewards on fuel, insurance, utilities, gold",
        "500K annual cap on miles transfer (100K Group A, 400K Group B)"
      ]
    },
    "slug": "axis-magnus"
  },
  {
    "id": 70,
    "name": "Federal Celesta Credit Card",
    "calculator": {
      "baseRate": 0.015,
      "rewardType": "points",
      "categories": {
        "dining": {
          "rate": 0.03,
          "label": "3% dining"
        }
      },
      "monthlyCap": null,
      "feeWaiver": "\u20b92L spend",
      "highlight": "Premium lifestyle",
      "tier": "premium"
    },
    "bestFor": "Travel & LTF Card",
    "verdict": "Lifetime free with 3X travel rewards and lounge access.",
    "fxMarkup": "2%",
    "category": "Lifestyle",
    "bank": "Federal Bank",
    "image": "assets/cards/placeholder.png",
    "annualFee": "Lifetime Free",
    "rewardRate": "3X travel/2X dining/1X others",
    "rewardType": "points",
    "features": [
      "Lifetime Free - no joining or annual fee",
      "2 intl lounge/year + 8 domestic (2/qtr on \u20b960K)",
      "3X on travel & intl, 2X dining, 1X others",
      "BOGO INOX movies (\u20b9100 cap, 1x/mo)"
    ],
    "applyLink": "https://www.federalbank.co.in/",
    "detailedGuide": "## Federal Celesta\n\n### Overview\nLifetime free travel card with lounge access.\n\n### Key Benefits\n- 2% forex (low for LTF card)\n- 2 international lounge/year free\n- 8 domestic lounge/year on spend\n- 1 RP = \u20b90.25\n\n### Verdict\nGreat LTF card for travelers on budget.",
    "slug": "federal-celesta-credit-card"
  },
  {
    "id": 89,
    "tags": [
      "Neo Bank",
      "Zero Forex",
      "Travel"
    ],
    "name": "Niyo SBM Credit Card",
    "bestFor": "International Travel",
    "verdict": "Zero forex markup on VISA rates. Note: Famous Niyo Global is a debit card.",
    "fxMarkup": "0% (VISA rates apply)",
    "category": "Travel",
    "bank": "SBM Bank via Niyo",
    "image": "assets/cards/placeholder.png",
    "annualFee": "\u20b90 (No annual fee)",
    "rewardRate": "Niyo Coins rewards",
    "rewardType": "points",
    "features": [
      "Zero forex markup (VISA exchange rates)",
      "Lounge access on \u20b950K quarterly spend",
      "Niyo Coins on domestic CC transactions",
      "\u26a0\ufe0f Note: Niyo Global (debit) is more popular"
    ],
    "applyLink": "https://www.goniyo.com/",
    "detailedGuide": "## Niyo SBM Credit Card\n\n### Overview\nNeo-bank credit card with zero forex markup.\n\n### Key Benefits\n- Zero forex markup (uses VISA rates)\n- No annual fee\n- Niyo Coins rewards\n\n### Important Note\nThe famous \"Niyo Global Card\" is actually a DEBIT card linked to savings account. This credit card variant offers similar zero forex benefits.\n\n### Verdict\nGood for international travel, but the debit card is more popular.",
    "slug": "niyo-sbm-credit-card"
  },
  {
    "id": 90,
    "tags": [
      "Neo Bank",
      "UPI",
      "Rewards"
    ],
    "name": "Jupiter Edge CSB RuPay Credit Card",
    "bestFor": "UPI Credit Card Rewards",
    "verdict": "LTF with 2% on chosen category (shop/travel/dine), UPI enabled.",
    "fxMarkup": "3.5%",
    "category": "Cashback",
    "bank": "CSB Bank via Jupiter",
    "image": "assets/cards/placeholder.png",
    "annualFee": "Lifetime Free (Edge+ \u20b9499 one-time)",
    "rewardRate": "2% selected, 0.4% others (Jewels)",
    "rewardType": "cashback",
    "features": [
      "2% on chosen category (shop/travel/dining)",
      "0.4% on all other UPI & card spends",
      "\u20b9250 welcome voucher on \u20b92K UPI spend",
      "Change category every 3 billing cycles"
    ],
    "applyLink": "https://jupiter.money/",
    "detailedGuide": "## Jupiter Edge CSB RuPay\n\n### Overview\nNeo-bank UPI-enabled credit card.\n\n### Key Benefits\n- Choose 1 category: Shop/Travel/Dining\n- 2% cashback on chosen category\n- 0.4% on all other spends\n- UPI payments via Jupiter app\n- Jewels: 5 = \u20b91\n\n### Edge+ Variant (\u20b9499 one-time)\n- 10% on shopping (wishlist brands)\n- 5% on travel\n- 1% on others\n- \u20b93K/month cap total\n\n### Verdict\nBest LTF UPI credit card for digital natives.",
    "slug": "jupiter-edge-csb-rupay-credit-card"
  },
  {
    "id": 91,
    "tags": [
      "Neo Bank",
      "Travel",
      "Lifestyle"
    ],
    "name": "AmpliFi Fi-Federal Credit Card",
    "bestFor": "Multi-Brand Lifestyle Rewards",
    "verdict": "3% on 20+ brands, 0% forex. Great app experience.",
    "fxMarkup": "0%",
    "category": "Lifestyle",
    "bank": "Federal Bank via Fi",
    "image": "assets/cards/placeholder.png",
    "annualFee": "\u20b92,000 (waived on \u20b92.5L)",
    "rewardRate": "3% on brands, 0.6% base",
    "rewardType": "points",
    "features": [
      "3% on 20+ brands (Amazon/Flipkart/Swiggy/Uber)",
      "5X on top 3 monthly brands",
      "0% forex markup, 2 lounge/qtr on \u20b950K",
      "\u20b94,250+ welcome vouchers on \u20b92K fee"
    ],
    "applyLink": "https://fi.money/",
    "detailedGuide": "## AmpliFi Fi-Federal\n\n### Overview\nFi Money's premium lifestyle card.\n\n### Key Benefits\n- 3% on 20+ lifestyle brands\n- 5X on top 3 brands (if \u20b915K+ monthly)\n- 1X (0.6%) on everything else\n- ZERO forex markup\n- Fi-Coins: 100 = \u20b93 (airline miles)\n\n### Welcome (\u20b92K fee)\n- Zomato \u20b91K, Uber \u20b9500, Myntra \u20b91K\n- SonyLiv 1yr, Croma \u20b9750\n\n### Verdict\nBest mid-range neo-bank card for lifestyle spenders.",
    "slug": "amplifi-fi-federal-credit-card"
  },
  {
    "id": "hdfc-swiggy",
    "name": "Swiggy HDFC Bank Credit Card",
    "bank": "HDFC Bank",
    "image": "/assets/cards/hdfc-swiggy.png",
    "link": "https://www.hdfcbank.com/personal/pay/cards/credit-cards/swiggy-hdfc-bank-credit-card",
    "fees": {
      "joining": 500,
      "annual": 500,
      "currency": "INR",
      "waivedOn": 200000,
      "waiverText": "Waived on \u20b92 Lakh spend in a year"
    },
    "eligibility": {
      "income": 180000,
      "age": {
        "min": 21,
        "max": 60
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 700
    },
    "rewards": {
      "type": "cashback",
      "name": "Cashback",
      "baseRate": 0.01,
      "earningText": "10% on Swiggy, 5% on online shopping, 1% on others",
      "expiry": "Statement credit (from June 2024)",
      "joiningBonus": "3 months complimentary Swiggy One membership",
      "exclusions": "Fuel, Rent, EMI, Wallet loads, Jewellery, Government, Utilities",
      "calculator": {
        "tier": "co-branded",
        "monthlyCap": 3500,
        "capResetPeriod": "statement",
        "specialLogic": "swiggy-tiered",
        "categories": {
          "travel": {
            "rate": 0.05,
            "label": "5% (online travel booking)",
            "cap": 1500
          },
          "dining": {
            "rate": 0.1,
            "label": "10% on Swiggy/Dineout/Instamart/Genie",
            "cap": 1500
          },
          "online": {
            "rate": 0.05,
            "label": "5% on select MCCs",
            "cap": 1500
          },
          "fuel": {
            "rate": 0,
            "label": "No cashback on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.1,
            "label": "10% on Swiggy Instamart",
            "cap": 1500
          },
          "utilities": {
            "rate": 0,
            "label": "No cashback on utilities",
            "cap": null
          }
        },
        "smartBuy": {
          "type": "cashback",
          "baseRewardRate": "Cashback Card",
          "monthlyCap": 1000,
          "dailyCap": null,
          "merchants": {
            "igp": { "rate": "10%", "label": "IGP.com - 10% Cashback" },
            "flights": { "rate": "5%", "label": "Flights - 5% Cashback" },
            "hotels": { "rate": "5%", "label": "Hotels - 5% Cashback" },
            "trains": { "rate": "1%", "label": "Confirmtkt Trains - 1% Cashback" },
            "redbus": { "rate": "5%", "label": "RedBus - 5% Cashback" },
            "instantVouchers": { "rate": "5%", "label": "Instant Vouchers (Gyftr) - 5% Cashback" },
            "myntra": { "rate": "5%", "label": "Myntra - 5% Cashback" },
            "nykaa": { "rate": "5%", "label": "Nykaa - 5% Cashback" },
            "jockey": { "rate": "10%", "label": "Jockey - 10% Cashback" },
            "pharmeasy": { "rate": "10%", "label": "Pharmeasy - 10% Cashback" },
            "mmtHoliday": { "rate": "5%", "label": "MMT Holiday - 5% Cashback" }
          }
        }
      },
      "redemption": {
        "baseValue": 1,
        "bestOption": "Statement credit (auto-applied)",
        "options": [
          {
            "type": "Statement Credit",
            "value": 1,
            "desc": "Auto-credited to next statement balance",
            "recommended": true
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "None",
        "international": "None",
        "accessType": "None"
      },
      "milestones": [],
      "golf": {
        "included": true,
        "text": "4 complimentary golf rounds per year (Mastercard World)"
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "0%",
        "cap": 0
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5% + GST"
      }
    },
    "metadata": {
      "tags": [
        "Co-branded",
        "Food",
        "Cashback",
        "Entry Level"
      ],
      "bestFor": "Frequent Swiggy users who order food delivery, groceries via Instamart",
      "rating": 4,
      "verdict": "Best card for food delivery enthusiasts with 10% cashback on Swiggy ecosystem",
      "pros": [
        "10% cashback on Swiggy (Food, Instamart, Dineout, Genie)",
        "5% on major online shopping platforms",
        "Cashback now credited directly to statement",
        "Low annual fee of \u20b9500",
        "Free 3-month Swiggy One membership"
      ],
      "cons": [
        "No airport lounge access",
        "Monthly caps: \u20b91,500 each for Swiggy and online",
        "5% online cashback MCC-based, can be inconsistent",
        "No fuel surcharge waiver",
        "Short Swiggy One membership (3 months only)"
      ]
    },
    "slug": "hdfc-swiggy"
  },
  {
    "id": "hdfc-shoppers-stop",
    "name": "Shoppers Stop HDFC Bank Credit Card",
    "bank": "HDFC Bank",
    "image": "/assets/cards/hdfc-shoppers-stop.png",
    "link": "https://www.hdfcbank.com/personal/pay/cards/credit-cards/shoppers-stop-hdfc-bank-credit-card",
    "fees": {
      "joining": 299,
      "annual": 299,
      "currency": "INR",
      "waivedOn": null,
      "waiverText": "No fee waiver (was LTF before March 2024)"
    },
    "eligibility": {
      "income": 240000,
      "age": {
        "min": 21,
        "max": 60
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 700
    },
    "rewards": {
      "type": "points",
      "name": "Reward Points",
      "baseRate": 0.01,
      "earningText": "3% on Shoppers Stop, 1% on other spends (as HDFC Reward Points from Mar 2024)",
      "expiry": "2 years",
      "joiningBonus": "Shoppers Stop voucher worth \u20b9500 + Silver Edge Membership",
      "exclusions": "Rent, Government payments (Grocery capped at 1,000 RP/month)",
      "calculator": {
        "tier": "co-branded",
        "monthlyCap": 1500,
        "capResetPeriod": "calendar",
        "specialLogic": null,
        "categories": {
          "travel": {
            "rate": 0.01,
            "label": "1% (1 RP)",
            "cap": 1000
          },
          "dining": {
            "rate": 0.01,
            "label": "1% (1 RP)",
            "cap": 1000
          },
          "online": {
            "rate": 0.03,
            "label": "3% on Shoppers Stop online",
            "cap": 500
          },
          "fuel": {
            "rate": 0.01,
            "label": "1% + surcharge waiver",
            "cap": null
          },
          "groceries": {
            "rate": 0.01,
            "label": "1% (capped at 1,000 RP/month)",
            "cap": 1000
          },
          "utilities": {
            "rate": 0.01,
            "label": "1% (1 RP)",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 1,
        "bestOption": "Shoppers Stop vouchers",
        "options": [
          {
            "type": "Shoppers Stop Vouchers",
            "value": 1,
            "desc": "1 RP = \u20b91 at Shoppers Stop",
            "recommended": true
          },
          {
            "type": "SmartBuy Travel",
            "value": 0.2,
            "desc": "1 RP = \u20b90.20",
            "recommended": false
          },
          {
            "type": "Statement Credit",
            "value": 0.2,
            "desc": "1 RP = \u20b90.20",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "None",
        "international": "None",
        "accessType": "None"
      },
      "milestones": [
        {
          "spend": 15000,
          "benefit": "\u20b9500 Shoppers Stop voucher on weekend purchase (max 5/year)"
        }
      ],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 250,
        "minTxn": 400,
        "maxTxn": 5000
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5%"
      }
    },
    "metadata": {
      "tags": [
        "Co-branded",
        "Shopping",
        "Fashion",
        "Entry Level"
      ],
      "bestFor": "Shoppers Stop loyalists who frequently shop at the store",
      "rating": 3.5,
      "verdict": "Decent for Shoppers Stop customers with 3% rewards on store purchases",
      "pros": [
        "3% value back on Shoppers Stop spends",
        "Free Silver Edge membership worth \u20b9350",
        "\u20b9500 welcome voucher",
        "Weekend milestone vouchers",
        "Low annual fee of \u20b9299"
      ],
      "cons": [
        "No longer lifetime free (from Mar 2024)",
        "Low 1% on non-Shoppers Stop spends",
        "No lounge access",
        "Limited redemption value outside Shoppers Stop",
        "Monthly caps on rewards"
      ]
    },
    "slug": "hdfc-shoppers-stop"
  },
  {
    "id": "hdfc-bizblack-metal",
    "name": "HDFC BizBlack Metal Edition Credit Card",
    "bank": "HDFC Bank",
    "image": "/assets/cards/hdfc-bizblack-metal.png",
    "link": "https://www.hdfcbank.com/personal/pay/cards/business-credit-cards/biz-black",
    "fees": {
      "joining": 10000,
      "annual": 10000,
      "currency": "INR",
      "waivedOn": 750000,
      "waiverText": "Joining waived on \u20b91.5L in 90 days; Annual waived on \u20b97.5L/year"
    },
    "eligibility": {
      "income": 3000000,
      "age": {
        "min": 21,
        "max": 65
      },
      "type": "Self-Employed (Business owners)",
      "creditScore": 750
    },
    "rewards": {
      "type": "points",
      "name": "Reward Points",
      "baseRate": 0.033,
      "earningText": "5 RP/\u20b9150 on all spends, 5X on business spends (\u20b950K+ threshold)",
      "expiry": "3 years",
      "joiningBonus": "Club Marriott + Taj voucher \u20b95,000 on \u20b91.5L spend in 90 days",
      "exclusions": "Fuel, Rent (beyond thresholds), Education (via third-party), Online gaming",
      "calculator": {
        "tier": "super-premium",
        "monthlyCap": 150000,
        "capResetPeriod": "statement",
        "specialLogic": "bizblack-tiered",
        "portals": [
          {
            "name": "Income Tax & GST",
            "rate": 0.166,
            "label": "16.6% (5X Rewards)",
            "categories": [
              "business",
              "tax"
            ]
          }
        ],
        "categories": {
          "travel": {
            "rate": 0.166,
            "label": "16.6% (5X on MMT MyBiz)",
            "cap": 10000
          },
          "dining": {
            "rate": 0.033,
            "label": "3.33% (5 RP/\u20b9150)",
            "cap": null
          },
          "online": {
            "rate": 0.166,
            "label": "16.6% (5X on PayZapp bills)",
            "cap": 10000
          },
          "fuel": {
            "rate": 0,
            "label": "No rewards on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.033,
            "label": "3.33% (capped at 2,000 RP/month)",
            "cap": 2000
          },
          "utilities": {
            "rate": 0.033,
            "label": "3.33% (capped at 2,000 RP/month)",
            "cap": 2000
          }
        }
      },
      "redemption": {
        "baseValue": 1,
        "bestOption": "SmartBuy Flights/Hotels",
        "options": [
          {
            "type": "SmartBuy Flights/Hotels",
            "value": 1,
            "desc": "1 RP = \u20b91 (up to 70% of booking, max 75K RP/month)",
            "recommended": true
          },
          {
            "type": "Airmiles",
            "value": 0.5,
            "desc": "2 RP = 1 Airmile",
            "recommended": false
          },
          {
            "type": "Amazon Vouchers",
            "value": 0.7,
            "desc": "1 RP = \u20b90.70",
            "recommended": true
          },
          {
            "type": "Statement Credit",
            "value": 0.3,
            "desc": "1 RP = \u20b90.30",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "Unlimited",
        "international": "Unlimited (Priority Pass)",
        "accessType": "Priority Pass"
      },
      "milestones": [
        {
          "spend": 150000,
          "benefit": "Club Marriott + Taj \u20b95K voucher (in 90 days)"
        },
        {
          "spend": 500000,
          "benefit": "SmartBuy Flight/Taj voucher \u20b95,000"
        }
      ],
      "golf": {
        "included": true,
        "text": "6 complimentary golf games per quarter"
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "0%",
        "cap": 0
      },
      "forex": {
        "markup": 0.02,
        "text": "2%"
      }
    },
    "metadata": {
      "tags": [
        "Business",
        "Super Premium",
        "Metal Card",
        "Tax Rewards",
        "Diners Club"
      ],
      "bestFor": "Business owners paying GST/Income Tax seeking rewards on business expenses",
      "rating": 4.5,
      "verdict": "India's best business credit card with 5X on taxes, bills, and business tools",
      "pros": [
        "Industry-first 5X on Income Tax and GST payments",
        "5X on business tools (Tally, AWS, Azure, Office 365)",
        "5X on PayZapp bill payments",
        "Unlimited lounge access worldwide",
        "55 days interest-free credit period"
      ],
      "cons": [
        "High \u20b910,000 + GST annual fee",
        "Requires \u20b950K minimum spend for 5X activation",
        "ITR requirement of \u20b921-30 Lakh+",
        "Diners Club limited acceptance",
        "No fuel surcharge waiver"
      ]
    },
    "slug": "hdfc-bizblack-metal"
  },
  {
    "id": "axis-atlas",
    "name": "Axis Atlas Credit Card",
    "bank": "Axis Bank",
    "image": "/assets/cards/axis-atlas.png",
    "link": "https://www.axisbank.com/retail/cards/credit-card/axis-bank-atlas-credit-card",
    "fees": {
      "joining": 5000,
      "annual": 5000,
      "currency": "INR",
      "waivedOn": null,
      "waiverText": "No annual fee waiver available. Renewal benefits based on tier."
    },
    "eligibility": {
      "income": 1200000,
      "age": {
        "min": 18,
        "max": 70
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 750
    },
    "rewards": {
      "type": "miles",
      "name": "EDGE Miles",
      "baseRate": 0.02,
      "earningText": "2 EDGE Miles per \u20b9100 on all eligible spends; 5 EDGE Miles per \u20b9100 on travel (airlines, hotels, Travel Edge)",
      "expiry": "3 years from earning date",
      "joiningBonus": "2,500 EDGE Miles on first transaction within 37 days of card issuance",
      "exclusions": "Gold/Jewellery, Rent, Wallet, Government Institutions, Insurance, Fuel, Utilities, Telecom",
      "calculator": {
        "tier": "premium",
        "monthlyCap": 10000,
        "capResetPeriod": "calendar",
        "specialLogic": "5X miles on travel capped at \u20b92L/month spend; Tier system (Silver/Gold/Platinum) with milestone benefits",
        "categories": {
          "travel": {
            "rate": 0.05,
            "label": "5 EDGE Miles/\u20b9100 on Travel Edge, Airlines, Hotels",
            "cap": 10000
          },
          "dining": {
            "rate": 0.02,
            "label": "2 EDGE Miles/\u20b9100",
            "cap": null
          },
          "online": {
            "rate": 0.02,
            "label": "2 EDGE Miles/\u20b9100",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No miles on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.02,
            "label": "2 EDGE Miles/\u20b9100",
            "cap": null
          },
          "utilities": {
            "rate": 0,
            "label": "No miles on utilities",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 1,
        "bestOption": "Transfer to airline/hotel partners at 1:2 ratio (1 EDGE Mile = 2 Partner Points)",
        "options": [
          {
            "type": "Travel Edge Portal",
            "value": 1,
            "desc": "1 EDGE Mile = \u20b91 on flights/hotels",
            "recommended": false
          },
          {
            "type": "Partner Airlines/Hotels",
            "value": 2,
            "desc": "1 EDGE Mile = 2 Partner Points (except Marriott 2:1)",
            "recommended": true
          },
          {
            "type": "Product Catalogue",
            "value": 1,
            "desc": "1 EDGE Mile = \u20b91",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "Silver: 4/year, Gold: 12/year, Platinum: Unlimited",
        "international": "Silver: 2/year, Gold: 6/year, Platinum: Unlimited",
        "accessType": "Tier-based"
      },
      "milestones": [
        {
          "spend": 300000,
          "benefit": "2,500 EDGE Miles (Silver Tier)"
        },
        {
          "spend": 750000,
          "benefit": "5,000 EDGE Miles (Gold Tier) + Silver benefits"
        },
        {
          "spend": 1500000,
          "benefit": "10,000 EDGE Miles (Platinum Tier) + Gold + Silver benefits"
        }
      ],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "0%",
        "cap": 0
      },
      "forex": {
        "markup": 0.02,
        "text": "2% + GST"
      }
    },
    "metadata": {
      "tags": [
        "Travel",
        "Miles",
        "Premium",
        "Airline Partners"
      ],
      "bestFor": "Frequent travelers who want flexible airline/hotel point transfers",
      "rating": 4.5,
      "verdict": "Best mid-premium travel card with excellent 1:2 partner transfer ratio",
      "pros": [
        "5X miles on travel up to \u20b92L/month",
        "1:2 partner transfer ratio",
        "Tier-based milestone benefits",
        "Flexible redemption across 20+ partners"
      ],
      "cons": [
        "No fee waiver option",
        "Accelerated miles capped at \u20b92L/month",
        "Group A partners capped at 30K miles/year"
      ]
    },
    "slug": "axis-atlas"
  },
  {
    "id": "axis-reserve",
    "name": "Axis Reserve Credit Card",
    "bank": "Axis Bank",
    "image": "/assets/cards/axis-reserve.png",
    "link": "https://www.axisbank.com/retail/cards/credit-card/reserve-credit-card",
    "fees": {
      "joining": 50000,
      "annual": 50000,
      "currency": "INR",
      "waivedOn": 3500000,
      "waiverText": "Annual fee waived on spending \u20b935 Lakh in preceding anniversary year"
    },
    "eligibility": {
      "income": 3000000,
      "age": {
        "min": 21,
        "max": 70
      },
      "type": "Invite Only",
      "creditScore": 800
    },
    "rewards": {
      "type": "points",
      "name": "EDGE Reward Points",
      "baseRate": 0.015,
      "earningText": "15 EDGE Reward Points per \u20b9200 spent (1.5% value-back); 2X on international spends",
      "expiry": "3 years from earning date",
      "joiningBonus": "15,000 EDGE Reward Points on first transaction within 30 days",
      "exclusions": "Fuel, Wallet, Utilities, Government Institutions, Insurance, Gold, Rent (capped at \u20b91L/month)",
      "calculator": {
        "tier": "super-premium",
        "monthlyCap": null,
        "capResetPeriod": "calendar",
        "specialLogic": "2X points (3% value-back) on international spends up to credit limit; Rental transactions capped at \u20b91L/month",
        "categories": {
          "travel": {
            "rate": 0.03,
            "label": "2X (30 points/\u20b9200 = 3% value-back) on international spends",
            "cap": null
          },
          "dining": {
            "rate": 0.015,
            "label": "15 EDGE Points/\u20b9200 (1.5%)",
            "cap": null
          },
          "online": {
            "rate": 0.015,
            "label": "15 EDGE Points/\u20b9200 (1.5%)",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No points on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.015,
            "label": "15 EDGE Points/\u20b9200 (1.5%)",
            "cap": null
          },
          "utilities": {
            "rate": 0,
            "label": "No points on utilities",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.2,
        "bestOption": "Transfer to travel partners at 5:2 ratio",
        "options": [
          {
            "type": "Partner Airmiles",
            "value": 0.4,
            "desc": "5 EDGE RP = 2 Partner Points",
            "recommended": true
          },
          {
            "type": "Product Catalogue",
            "value": 0.2,
            "desc": "1 RP = \u20b90.20",
            "recommended": false
          },
          {
            "type": "Cashback",
            "value": 0.2,
            "desc": "1 RP = \u20b90.20 statement credit",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "Unlimited for primary and add-on",
        "international": "Unlimited via Priority Pass + 12 guest visits/year",
        "accessType": "Priority Pass"
      },
      "milestones": [],
      "golf": {
        "included": true,
        "text": "50 complimentary golf rounds per financial year"
      },
      "movies": {
        "included": true,
        "text": "BOGO on BookMyShow (up to \u20b9500 off 2nd ticket, 5x/month)"
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 400
      },
      "forex": {
        "markup": 0.02,
        "text": "2% + GST"
      }
    },
    "metadata": {
      "tags": [
        "Super-Premium",
        "Golf",
        "Unlimited Lounge",
        "Metal Card"
      ],
      "bestFor": "Ultra-high spenders seeking premium golf and unlimited lounge benefits",
      "rating": 4.2,
      "verdict": "Premium lifestyle card with excellent golf benefits but devalued rewards",
      "pros": [
        "Unlimited lounge access",
        "50 golf rounds/year",
        "Club ITC, Accor Plus, Marriott memberships",
        "1.5% value-back (7.5 RP/\u20b9100)"
      ],
      "cons": [
        "\u20b950K annual fee",
        "5:2 transfer ratio (lower than before)",
        "Annual transfer cap of 5L points"
      ]
    },
    "slug": "axis-reserve"
  },
  {
    "id": "axis-olympus",
    "name": "Axis Bank Olympus Credit Card",
    "bank": "Axis Bank",
    "image": "/assets/cards/axis-olympus.png",
    "link": "https://www.axisbank.com/retail/cards/credit-card/olympus-credit-card",
    "fees": {
      "joining": 20000,
      "annual": 20000,
      "currency": "INR",
      "waivedOn": null,
      "waiverText": "No fee waiver. Compensated with \u20b910K Taj/ITC vouchers + 2,500 EDGE Miles as welcome/renewal benefit"
    },
    "eligibility": {
      "income": 1800000,
      "age": {
        "min": 21,
        "max": 70
      },
      "type": "Salaried/Self-Employed/Citi Prestige Migration",
      "creditScore": 780
    },
    "rewards": {
      "type": "miles",
      "name": "EDGE Miles",
      "baseRate": 0.01,
      "earningText": "1 EDGE Mile per \u20b9100 on domestic spends; 2 EDGE Miles per \u20b9100 on international spends",
      "expiry": "3 years from earning date",
      "joiningBonus": "\u20b910,000 Taj/ITC Hotel voucher + 2,500 EDGE Miles on first transaction within 30 days",
      "exclusions": "Fuel, Wallet, Utilities, Government Institutions, Insurance, Gold, Rent",
      "calculator": {
        "tier": "super-premium",
        "monthlyCap": null,
        "capResetPeriod": "calendar",
        "specialLogic": "1:4 partner transfer ratio makes low earn rate worthwhile; 7.5L EDGE Miles annual transfer cap",
        "categories": {
          "travel": {
            "rate": 0.02,
            "label": "2 EDGE Miles/\u20b9100 on international",
            "cap": null
          },
          "dining": {
            "rate": 0.01,
            "label": "1 EDGE Mile/\u20b9100",
            "cap": null
          },
          "online": {
            "rate": 0.01,
            "label": "1 EDGE Mile/\u20b9100",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No miles on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.01,
            "label": "1 EDGE Mile/\u20b9100",
            "cap": null
          },
          "utilities": {
            "rate": 0,
            "label": "No miles on utilities",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 1,
        "bestOption": "Transfer to partners at 1:4 ratio (best in market)",
        "options": [
          {
            "type": "Partner Airlines/Hotels",
            "value": 4,
            "desc": "1 EDGE Mile = 4 Partner Points",
            "recommended": true
          },
          {
            "type": "Travel Edge Portal",
            "value": 1,
            "desc": "1 EDGE Mile = \u20b91",
            "recommended": false
          },
          {
            "type": "Product Catalogue",
            "value": 1,
            "desc": "1 EDGE Mile = \u20b91",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "Unlimited + 10 guest visits/year",
        "international": "Unlimited via Priority Pass",
        "accessType": "Priority Pass"
      },
      "milestones": [
        {
          "spend": 50000,
          "benefit": "Unlock additional golf rounds per billing cycle"
        }
      ],
      "golf": {
        "included": true,
        "text": "8 complimentary golf rounds/year; additional rounds on \u20b950K+ monthly spend"
      },
      "movies": {
        "included": true,
        "text": "Buy 1 Get 1 on BookMyShow"
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 400
      },
      "forex": {
        "markup": 0.018,
        "text": "1.8% + GST"
      }
    },
    "metadata": {
      "tags": [
        "Super-Premium",
        "Citi Prestige Replacement",
        "Travel",
        "Golf"
      ],
      "bestFor": "Ex-Citi Prestige holders and travelers seeking best-in-class 1:4 partner transfer",
      "rating": 4.4,
      "verdict": "Excellent 1:4 transfer ratio compensates for low earn rate; great for travel redemptions",
      "pros": [
        "Best-in-market 1:4 partner transfer",
        "Taj Epicure membership",
        "Unlimited lounge access",
        "\u20b910K hotel vouchers on joining/renewal"
      ],
      "cons": [
        "Low 1% earn rate on domestic spends",
        "\u20b920K annual fee with no waiver",
        "No milestone spend benefits"
      ]
    },
    "slug": "axis-olympus"
  },
  {
    "id": "axis-horizon",
    "name": "Axis Bank Horizon Credit Card",
    "bank": "Axis Bank",
    "image": "/assets/cards/axis-horizon.png",
    "link": "https://www.axisbank.com/retail/cards/credit-card/axis-horizon-credit-card",
    "fees": {
      "joining": 3000,
      "annual": 3000,
      "currency": "INR",
      "waivedOn": null,
      "waiverText": "No fee waiver available. 1,500 EDGE Miles renewal benefit on card anniversary"
    },
    "eligibility": {
      "income": 600000,
      "age": {
        "min": 18,
        "max": 70
      },
      "type": "Salaried/Self-Employed/Citi PremierMiles Migration",
      "creditScore": 720
    },
    "rewards": {
      "type": "miles",
      "name": "EDGE Miles",
      "baseRate": 0.02,
      "earningText": "2 EDGE Miles per \u20b9100 on all eligible spends; 5 EDGE Miles per \u20b9100 on Travel Edge and direct airline spends",
      "expiry": "3 years from earning date",
      "joiningBonus": "5,000 EDGE Miles on first transaction of \u20b91,000+ within 30 days",
      "exclusions": "Fuel, Utilities, Rent, Insurance, Transportation/Tolls, Educational Institutions, Government Institutions, Wallet",
      "calculator": {
        "tier": "premium",
        "monthlyCap": null,
        "capResetPeriod": "calendar",
        "specialLogic": "1:1 partner transfer ratio; 5L annual miles transfer cap",
        "categories": {
          "travel": {
            "rate": 0.05,
            "label": "5 EDGE Miles/\u20b9100 on Travel Edge & Airlines",
            "cap": null
          },
          "dining": {
            "rate": 0.02,
            "label": "2 EDGE Miles/\u20b9100",
            "cap": null
          },
          "online": {
            "rate": 0.02,
            "label": "2 EDGE Miles/\u20b9100",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No miles on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.02,
            "label": "2 EDGE Miles/\u20b9100",
            "cap": null
          },
          "utilities": {
            "rate": 0,
            "label": "No miles on utilities",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 1,
        "bestOption": "Transfer to airline/hotel partners at 1:1 ratio",
        "options": [
          {
            "type": "Partner Airlines/Hotels",
            "value": 1,
            "desc": "1 EDGE Mile = 1 Partner Point",
            "recommended": true
          },
          {
            "type": "Travel Edge Portal",
            "value": 1,
            "desc": "1 EDGE Mile = \u20b91",
            "recommended": false
          },
          {
            "type": "Product Catalogue",
            "value": 1,
            "desc": "1 EDGE Mile = \u20b91",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "6/quarter (Mastercard) or 8/quarter (Visa Signature)",
        "international": "8 per calendar year",
        "accessType": "Card-based"
      },
      "milestones": [],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 400
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5% + GST"
      }
    },
    "metadata": {
      "tags": [
        "Travel",
        "Miles",
        "Mid-Premium",
        "Citi PremierMiles Replacement"
      ],
      "bestFor": "Budget-conscious travelers seeking travel miles with good lounge access",
      "rating": 4,
      "verdict": "Affordable travel card with 5% on travel and decent lounge access",
      "pros": [
        "5X miles on travel spends",
        "Good lounge access for the fee",
        "5,000 welcome miles",
        "Wednesday travel offers"
      ],
      "cons": [
        "1:1 transfer ratio (inferior to Atlas)",
        "No fee waiver",
        "3.5% forex markup"
      ]
    },
    "slug": "axis-horizon"
  },
  {
    "id": "axis-select",
    "name": "Axis Bank SELECT Credit Card",
    "bank": "Axis Bank",
    "image": "/assets/cards/axis-select.png",
    "link": "https://www.axisbank.com/retail/cards/credit-card/axis-bank-select-credit-card",
    "fees": {
      "joining": 3000,
      "annual": 3000,
      "currency": "INR",
      "waivedOn": 800000,
      "waiverText": "Annual fee waived on spending \u20b98 Lakh in card anniversary year"
    },
    "eligibility": {
      "income": 600000,
      "age": {
        "min": 18,
        "max": 70
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 720
    },
    "rewards": {
      "type": "points",
      "name": "EDGE Reward Points",
      "baseRate": 0.01,
      "earningText": "10 EDGE Reward Points per \u20b9200 spent; 2X (20 points) on retail shopping up to \u20b920K/month",
      "expiry": "3 years from earning date",
      "joiningBonus": "10,000 EDGE Reward Points (\u20b92,000 value) on first transaction within 30 days",
      "exclusions": "Insurance, Rent, Fuel, Educational Services, Utilities & Telecom, Wallet, Gold/Jewellery, Government Services",
      "calculator": {
        "tier": "premium",
        "monthlyCap": 4000,
        "capResetPeriod": "calendar",
        "specialLogic": "2X rewards on retail shopping capped at \u20b920K/month; 5,000 bonus points on \u20b93L annual spend",
        "categories": {
          "travel": {
            "rate": 0.01,
            "label": "10 EDGE Points/\u20b9200",
            "cap": null
          },
          "dining": {
            "rate": 0.01,
            "label": "10 EDGE Points/\u20b9200",
            "cap": null
          },
          "online": {
            "rate": 0.01,
            "label": "10 EDGE Points/\u20b9200",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No points on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.02,
            "label": "2X (20 Points/\u20b9200) on retail stores",
            "cap": 4000
          },
          "utilities": {
            "rate": 0,
            "label": "No points on utilities",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.2,
        "bestOption": "Transfer to airline partners",
        "options": [
          {
            "type": "Partner Airmiles",
            "value": 0.2,
            "desc": "10 RP = 1 Partner Point",
            "recommended": true
          },
          {
            "type": "Product Catalogue",
            "value": 0.2,
            "desc": "1 RP = \u20b90.20",
            "recommended": false
          },
          {
            "type": "Cashback",
            "value": 0.2,
            "desc": "1 RP = \u20b90.20 statement credit",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "2/quarter on \u20b950K spend in previous quarter",
        "international": "6/year via Priority Pass (additional 6 on \u20b93L spend)",
        "accessType": "Priority Pass"
      },
      "milestones": [
        {
          "spend": 300000,
          "benefit": "5,000 bonus EDGE Reward Points + Priority Pass renewal + 6 more int'l lounge visits"
        }
      ],
      "golf": {
        "included": true,
        "text": "6 complimentary rounds; 6 more on \u20b93L annual spend (12 total)"
      },
      "movies": {
        "included": true,
        "text": "BOGO via District app, twice/month (up to \u20b9250 off)"
      },
      "fuel": {
        "surchargeWaiver": "0%",
        "cap": 0
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5% + GST"
      }
    },
    "metadata": {
      "tags": [
        "Lifestyle",
        "Golf",
        "Lounge Access",
        "Retail Shopping"
      ],
      "bestFor": "Retail shoppers and those seeking golf + lounge benefits at mid-tier pricing",
      "rating": 4.1,
      "verdict": "Solid all-rounder with good lounge access, golf benefits, and retail rewards",
      "pros": [
        "2X rewards on retail shopping",
        "12 golf rounds possible",
        "Priority Pass with 12 visits",
        "BigBasket & Swiggy discounts"
      ],
      "cons": [
        "Low 10:1 redemption ratio",
        "No fuel rewards",
        "Retail 2X capped at \u20b920K/month"
      ]
    },
    "slug": "axis-select"
  },
  {
    "id": "axis-privilege",
    "name": "Axis Bank Privilege Credit Card",
    "bank": "Axis Bank",
    "image": "/assets/cards/axis-privilege.png",
    "link": "https://www.axisbank.com/retail/cards/credit-card/privilege-credit-card-with-unlimited-benefits",
    "fees": {
      "joining": 1500,
      "annual": 1500,
      "currency": "INR",
      "waivedOn": 500000,
      "waiverText": "Annual fee waived on spending \u20b95 Lakh in card anniversary year"
    },
    "eligibility": {
      "income": 600000,
      "age": {
        "min": 18,
        "max": 70
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 700
    },
    "rewards": {
      "type": "points",
      "name": "EDGE Reward Points",
      "baseRate": 0.01,
      "earningText": "10 EDGE Reward Points per \u20b9200 spent on all eligible domestic and international transactions",
      "expiry": "3 years from earning date",
      "joiningBonus": "12,500 EDGE Reward Points (\u20b92,500 value) on joining fee payment + first transaction within 30 days",
      "exclusions": "Fuel, Rent, Utilities, Insurance, Gold, Government Services, Educational Services, Wallet",
      "calculator": {
        "tier": "entry",
        "monthlyCap": null,
        "capResetPeriod": "calendar",
        "specialLogic": "Uncapped rewards on all eligible spends; 10,000 bonus points on \u20b92.5L annual spend",
        "categories": {
          "travel": {
            "rate": 0.01,
            "label": "10 EDGE Points/\u20b9200",
            "cap": null
          },
          "dining": {
            "rate": 0.01,
            "label": "10 EDGE Points/\u20b9200",
            "cap": null
          },
          "online": {
            "rate": 0.01,
            "label": "10 EDGE Points/\u20b9200",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No points on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.01,
            "label": "10 EDGE Points/\u20b9200",
            "cap": null
          },
          "utilities": {
            "rate": 0,
            "label": "No points on utilities",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.2,
        "bestOption": "Transfer to partner airlines/hotels or catalogue",
        "options": [
          {
            "type": "Partner Airmiles",
            "value": 0.2,
            "desc": "10 RP = 1-2 Partner Points depending on partner",
            "recommended": true
          },
          {
            "type": "Product Catalogue",
            "value": 0.2,
            "desc": "1 RP = \u20b90.20",
            "recommended": false
          },
          {
            "type": "Cashback",
            "value": 0.2,
            "desc": "1 RP = \u20b90.20 statement credit",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "2/quarter on \u20b950K spend in previous quarter (max 8/year)",
        "international": "None",
        "accessType": "Spend-based"
      },
      "milestones": [
        {
          "spend": 250000,
          "benefit": "10,000 bonus EDGE Reward Points (\u20b92,000 value)"
        }
      ],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": true,
        "text": "BOGO on District app"
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 400
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5% + GST"
      }
    },
    "metadata": {
      "tags": [
        "Entry-Level",
        "Rewards",
        "Unlimited Earn",
        "Dining"
      ],
      "bestFor": "Those seeking uncapped reward earning at low annual fee",
      "rating": 3.8,
      "verdict": "Decent entry-level rewards card with uncapped earning but low redemption value",
      "pros": [
        "Uncapped reward points",
        "Low annual fee \u20b91,500",
        "12,500 welcome points",
        "Dining discounts via EazyDiner"
      ],
      "cons": [
        "Low 1% reward rate",
        "Domestic lounges only (spend-based)",
        "No international lounge access"
      ]
    },
    "slug": "axis-privilege"
  },
  {
    "id": "axis-myzone",
    "name": "Axis Bank MY ZONE Credit Card",
    "bank": "Axis Bank",
    "image": "/assets/cards/axis-myzone.png",
    "link": "https://www.axisbank.com/retail/cards/credit-card/axis-bank-my-zone-credit-card",
    "fees": {
      "joining": 500,
      "annual": 500,
      "currency": "INR",
      "waivedOn": null,
      "waiverText": "SonyLIV Premium renewal on spending \u20b91.5L in anniversary year"
    },
    "eligibility": {
      "income": 300000,
      "age": {
        "min": 18,
        "max": 70
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 680
    },
    "rewards": {
      "type": "points",
      "name": "EDGE Reward Points",
      "baseRate": 0.004,
      "earningText": "4 EDGE Reward Points per \u20b9200 spent",
      "expiry": "3 years from earning date",
      "joiningBonus": "Complimentary SonyLIV Premium membership (\u20b9999 value) on first spend within 30 days",
      "exclusions": "Movies, Fuel, Rent, Insurance, Utilities, Jewellery, Education, Government Institutions, Wallet, EMI",
      "calculator": {
        "tier": "entry",
        "monthlyCap": null,
        "capResetPeriod": "calendar",
        "specialLogic": "Focus on OTT subscription and brand discounts rather than rewards",
        "categories": {
          "travel": {
            "rate": 0.004,
            "label": "4 EDGE Points/\u20b9200",
            "cap": null
          },
          "dining": {
            "rate": 0.004,
            "label": "4 EDGE Points/\u20b9200",
            "cap": null
          },
          "online": {
            "rate": 0.004,
            "label": "4 EDGE Points/\u20b9200",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No points on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.004,
            "label": "4 EDGE Points/\u20b9200",
            "cap": null
          },
          "utilities": {
            "rate": 0,
            "label": "No points on utilities",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.2,
        "bestOption": "Redeem for vouchers or products",
        "options": [
          {
            "type": "Product Catalogue",
            "value": 0.2,
            "desc": "1 RP = \u20b90.20",
            "recommended": true
          },
          {
            "type": "Cashback",
            "value": 0.2,
            "desc": "1 RP = \u20b90.20 statement credit",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "1/quarter on \u20b950K spend in previous 3 months",
        "international": "None",
        "accessType": "Spend-based"
      },
      "milestones": [
        {
          "spend": 150000,
          "benefit": "1,000 EDGE Reward Points + SonyLIV renewal (\u20b91.5L in anniversary year)"
        }
      ],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": true,
        "text": "BOGO on movie tickets"
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 400
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5% + GST"
      }
    },
    "metadata": {
      "tags": [
        "Entry-Level",
        "Entertainment",
        "OTT",
        "Movies"
      ],
      "bestFor": "Entertainment lovers seeking OTT subscription and movie discounts",
      "rating": 3.5,
      "verdict": "Best for SonyLIV subscribers and Swiggy/movie enthusiasts on a budget",
      "pros": [
        "Free SonyLIV Premium (\u20b9999 value)",
        "BOGO movie tickets",
        "Swiggy \u20b9120 off (2x/month)",
        "Low \u20b9500 annual fee"
      ],
      "cons": [
        "Very low 0.4% reward rate",
        "Movie spends excluded from rewards",
        "Limited lounge access"
      ]
    },
    "slug": "axis-myzone"
  },
  {
    "id": "axis-neo",
    "name": "Axis Bank NEO Credit Card",
    "bank": "Axis Bank",
    "image": "/assets/cards/axis-neo.png",
    "link": "https://www.axisbank.com/retail/cards/credit-card/axis-bank-neo-credit-card",
    "fees": {
      "joining": 250,
      "annual": 250,
      "currency": "INR",
      "waivedOn": null,
      "waiverText": "Lifetime free from select channels"
    },
    "eligibility": {
      "income": 180000,
      "age": {
        "min": 18,
        "max": 70
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 650
    },
    "rewards": {
      "type": "points",
      "name": "EDGE Reward Points",
      "baseRate": 0.001,
      "earningText": "1 EDGE Reward Point per \u20b9200 spent",
      "expiry": "3 years from earning date",
      "joiningBonus": "100% cashback up to \u20b9300 on first utility bill payment within 30 days",
      "exclusions": "Fuel, Utilities, Insurance, EMI, Wallet, Rent, Government, Education",
      "calculator": {
        "tier": "entry",
        "monthlyCap": null,
        "capResetPeriod": "calendar",
        "specialLogic": "Focus on brand discounts (Zomato, Myntra, Blinkit) rather than rewards",
        "categories": {
          "travel": {
            "rate": 0.001,
            "label": "1 EDGE Point/\u20b9200",
            "cap": null
          },
          "dining": {
            "rate": 0.001,
            "label": "1 EDGE Point/\u20b9200",
            "cap": null
          },
          "online": {
            "rate": 0.001,
            "label": "1 EDGE Point/\u20b9200",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No points on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.001,
            "label": "1 EDGE Point/\u20b9200",
            "cap": null
          },
          "utilities": {
            "rate": 0,
            "label": "No points on utilities",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.2,
        "bestOption": "Redeem for vouchers",
        "options": [
          {
            "type": "Product Catalogue",
            "value": 0.2,
            "desc": "1 RP = \u20b90.20",
            "recommended": true
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "None",
        "international": "None",
        "accessType": "None"
      },
      "milestones": [],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": true,
        "text": "25% cashback on movie tickets via BookMyShow (capped)"
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 400
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5% + GST"
      }
    },
    "metadata": {
      "tags": [
        "Entry-Level",
        "Lifestyle",
        "Zomato",
        "Discount"
      ],
      "bestFor": "First-time cardholders who order frequently on Zomato and shop on Myntra",
      "rating": 3.2,
      "verdict": "Ultra-basic card best for Zomato 40% off and brand discounts; poor reward rate",
      "pros": [
        "\u20b9250 annual fee (often LTF)",
        "40% off on Zomato (\u20b9120 max, 2x/month)",
        "Myntra \u20b9150 off",
        "Blinkit discounts"
      ],
      "cons": [
        "Worst reward rate at 0.1%",
        "No lounge access",
        "Very limited benefits"
      ]
    },
    "slug": "axis-neo"
  },
  {
    "id": "flipkart-axis",
    "name": "Flipkart Axis Bank Credit Card",
    "bank": "Axis Bank",
    "image": "/assets/cards/flipkart-axis.png",
    "link": "https://www.axisbank.com/retail/cards/credit-card/flipkart-axisbank-credit-card",
    "fees": {
      "joining": 500,
      "annual": 500,
      "currency": "INR",
      "waivedOn": 350000,
      "waiverText": "Annual fee waived on spending \u20b93.5 Lakh in preceding year"
    },
    "eligibility": {
      "income": 300000,
      "age": {
        "min": 18,
        "max": 70
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 680
    },
    "rewards": {
      "type": "cashback",
      "name": "Direct Cashback",
      "baseRate": 0.01,
      "earningText": "5% on Flipkart & Cleartrip; 7.5% on Myntra; 4% on Swiggy, Uber, PVR, cult.fit; 1% on others",
      "expiry": "N/A - Direct statement credit",
      "joiningBonus": "Flipkart voucher worth \u20b9250 + Swiggy 50% off (up to \u20b9100) for new users",
      "exclusions": "Fuel, Rent, Insurance, Utilities, Education, Gift Cards, Gold, Wallet, EMI conversions",
      "calculator": {
        "tier": "co-branded",
        "monthlyCap": 4000,
        "capResetPeriod": "statement-quarter",
        "specialLogic": "\u20b94,000 cashback cap per quarter each for Flipkart, Cleartrip, Myntra",
        "categories": {
          "travel": {
            "rate": 0.05,
            "label": "5% cashback on Cleartrip",
            "cap": 4000
          },
          "dining": {
            "rate": 0.04,
            "label": "4% cashback on Swiggy",
            "cap": null
          },
          "online": {
            "rate": 0.075,
            "label": "7.5% on Myntra; 5% on Flipkart",
            "cap": 4000
          },
          "fuel": {
            "rate": 0,
            "label": "No cashback on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.01,
            "label": "1% on other spends",
            "cap": null
          },
          "utilities": {
            "rate": 0,
            "label": "No cashback on utilities",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 1,
        "bestOption": "Automatic statement credit",
        "options": [
          {
            "type": "Statement Credit",
            "value": 1,
            "desc": "Cashback auto-credited to statement",
            "recommended": true
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "Discontinued from June 2025",
        "international": "None",
        "accessType": "None"
      },
      "milestones": [],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": true,
        "text": "100% off on 2nd movie ticket via District app (\u20b9250 max, 1x/month)"
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 400
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5% + GST"
      }
    },
    "metadata": {
      "tags": [
        "Co-branded",
        "Cashback",
        "Flipkart",
        "Online Shopping"
      ],
      "bestFor": "Flipkart and Myntra shoppers seeking high cashback",
      "rating": 4,
      "verdict": "Best card for Flipkart/Myntra shoppers with good cashback on partners",
      "pros": [
        "7.5% on Myntra",
        "5% on Flipkart & Cleartrip",
        "4% on Swiggy/Uber/PVR",
        "Direct statement cashback"
      ],
      "cons": [
        "\u20b94K/quarter cap on each merchant",
        "Lounge access discontinued",
        "Many exclusions"
      ]
    },
    "slug": "flipkart-axis"
  },
  {
    "id": "axis-airtel",
    "name": "Airtel Axis Bank Credit Card",
    "bank": "Axis Bank",
    "image": "/assets/cards/axis-airtel.png",
    "link": "https://www.axisbank.com/retail/cards/credit-card/airtel-axis-bank-credit-card",
    "fees": {
      "joining": 500,
      "annual": 500,
      "currency": "INR",
      "waivedOn": 200000,
      "waiverText": "Annual fee waived on spending \u20b92 Lakh in preceding year"
    },
    "eligibility": {
      "income": 300000,
      "age": {
        "min": 18,
        "max": 70
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 680
    },
    "rewards": {
      "type": "cashback",
      "name": "Direct Cashback",
      "baseRate": 0.01,
      "earningText": "25% on Airtel bills (via Thanks app); 10% on utilities & food delivery; 1% on others",
      "expiry": "N/A - Direct statement credit",
      "joiningBonus": "Amazon e-voucher worth \u20b9500 on first transaction within 30 days",
      "exclusions": "Fuel, Rent, Insurance, Education, Gold, Wallet, EMI, Government",
      "calculator": {
        "tier": "co-branded",
        "monthlyCap": 250,
        "capResetPeriod": "statement",
        "specialLogic": "Cashback only via Airtel Thanks app for Airtel & utility bills",
        "categories": {
          "travel": {
            "rate": 0.01,
            "label": "1% cashback",
            "cap": null
          },
          "dining": {
            "rate": 0.1,
            "label": "10% on Swiggy/Zomato/BigBasket (\u20b9500/month cap)",
            "cap": 500
          },
          "online": {
            "rate": 0.01,
            "label": "1% cashback",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No cashback on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.1,
            "label": "10% on BigBasket",
            "cap": 500
          },
          "utilities": {
            "rate": 0.1,
            "label": "10% via Airtel Thanks (\u20b9250/month cap)",
            "cap": 250
          }
        }
      },
      "redemption": {
        "baseValue": 1,
        "bestOption": "Automatic statement credit",
        "options": [
          {
            "type": "Statement Credit",
            "value": 1,
            "desc": "Cashback auto-credited to statement",
            "recommended": true
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "4/year on \u20b950K spend in previous 3 months",
        "international": "None",
        "accessType": "Spend-based"
      },
      "milestones": [],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 500
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5% + GST"
      }
    },
    "metadata": {
      "tags": [
        "Co-branded",
        "Cashback",
        "Airtel",
        "Utilities"
      ],
      "bestFor": "Airtel customers who pay bills via Airtel Thanks app",
      "rating": 3.8,
      "verdict": "Best for Airtel ecosystem users; excellent utility bill cashback",
      "pros": [
        "25% on Airtel bills",
        "10% on utilities via Thanks app",
        "10% on Swiggy/Zomato/BigBasket",
        "Low \u20b9500 fee"
      ],
      "cons": [
        "Must use Airtel Thanks app",
        "Low monthly caps (\u20b9250-500)",
        "Only domestic lounges"
      ]
    },
    "slug": "axis-airtel"
  },
  {
    "id": "axis-ace",
    "name": "Axis Bank ACE Credit Card",
    "bank": "Axis Bank",
    "image": "/assets/cards/axis-ace.png",
    "link": "https://www.axisbank.com/retail/cards/credit-card/axis-bank-ace-credit-card",
    "fees": {
      "joining": 499,
      "annual": 499,
      "currency": "INR",
      "waivedOn": 200000,
      "waiverText": "Joining fee reversed on \u20b910K spend in first 45 days; Annual fee waived on \u20b92L spend"
    },
    "eligibility": {
      "income": 300000,
      "age": {
        "min": 18,
        "max": 70
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 680
    },
    "rewards": {
      "type": "cashback",
      "name": "Direct Cashback",
      "baseRate": 0.015,
      "earningText": "5% on Google Pay bill payments; 4% on Swiggy/Zomato/Ola; 1.5% on others",
      "expiry": "N/A - Direct statement credit",
      "joiningBonus": "Joining fee reversed on spending \u20b910,000 within 45 days",
      "exclusions": "Fuel, Rent, Insurance, Utilities (non-GPay), Education, Gold, Wallet, EMI, Government",
      "calculator": {
        "tier": "co-branded",
        "monthlyCap": 500,
        "capResetPeriod": "statement",
        "specialLogic": "5% on bills only via Google Pay; Combined cap of \u20b9500/month on 5% + 4% categories",
        "categories": {
          "travel": {
            "rate": 0.015,
            "label": "1.5% cashback",
            "cap": null
          },
          "dining": {
            "rate": 0.04,
            "label": "4% on Swiggy/Zomato",
            "cap": 500
          },
          "online": {
            "rate": 0.015,
            "label": "1.5% cashback",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No cashback on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.015,
            "label": "1.5% cashback",
            "cap": null
          },
          "utilities": {
            "rate": 0.05,
            "label": "5% via Google Pay only",
            "cap": 500
          }
        }
      },
      "redemption": {
        "baseValue": 1,
        "bestOption": "Automatic statement credit",
        "options": [
          {
            "type": "Statement Credit",
            "value": 1,
            "desc": "Cashback auto-credited to statement",
            "recommended": true
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "4/year on \u20b950K spend in previous 3 months",
        "international": "None",
        "accessType": "Spend-based"
      },
      "milestones": [],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 500
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5% + GST"
      }
    },
    "metadata": {
      "tags": [
        "Co-branded",
        "Cashback",
        "Google Pay",
        "Utilities"
      ],
      "bestFor": "Google Pay users who pay utility bills and order frequently on Swiggy/Zomato",
      "rating": 4.1,
      "verdict": "Top cashback card for utility bills via GPay and food delivery apps",
      "pros": [
        "5% on utility bills via GPay",
        "4% on Swiggy/Zomato/Ola",
        "1.5% base rate (unlimited)",
        "Low \u20b9499 fee"
      ],
      "cons": [
        "Must use Google Pay for 5% utility cashback",
        "\u20b9500/month combined cap on 5%+4%",
        "iOS users can't use GPay pay feature"
      ]
    },
    "slug": "axis-ace"
  },
  {
    "id": "axis-indianoil",
    "name": "IndianOil Axis Bank Credit Card",
    "bank": "Axis Bank",
    "image": "/assets/cards/axis-indianoil.png",
    "link": "https://www.axisbank.com/retail/cards/credit-card/indianoil-axis-bank-credit-card",
    "fees": {
      "joining": 500,
      "annual": 500,
      "currency": "INR",
      "waivedOn": 350000,
      "waiverText": "Annual fee waived on spending \u20b93.5 Lakh in card anniversary year"
    },
    "eligibility": {
      "income": 240000,
      "age": {
        "min": 18,
        "max": 70
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 650
    },
    "rewards": {
      "type": "points",
      "name": "EDGE Reward Points",
      "baseRate": 0.02,
      "earningText": "4% value-back (20 RP per \u20b9100) on IOCL fuel; 1% (5 RP per \u20b9100) on online shopping",
      "expiry": "3 years from earning date",
      "joiningBonus": "Up to 1,250 EDGE Reward Points (\u20b9250 value) on first fuel transaction within 30 days",
      "exclusions": "Education, Government, Utilities, Rent, Wallet, Jewellery/Gold, Insurance",
      "calculator": {
        "tier": "co-branded",
        "monthlyCap": null,
        "capResetPeriod": "calendar",
        "specialLogic": "4% on fuel only at IOCL outlets; fuel transactions \u20b9400-\u20b94,000 only",
        "categories": {
          "travel": {
            "rate": 0.01,
            "label": "1 EDGE Point/\u20b9200",
            "cap": null
          },
          "dining": {
            "rate": 0.01,
            "label": "1 EDGE Point/\u20b9200",
            "cap": null
          },
          "online": {
            "rate": 0.01,
            "label": "5 EDGE Points/\u20b9100 (1%)",
            "cap": null
          },
          "fuel": {
            "rate": 0.04,
            "label": "20 EDGE Points/\u20b9100 at IOCL (4%)",
            "cap": null
          },
          "groceries": {
            "rate": 0.01,
            "label": "1 EDGE Point/\u20b9200",
            "cap": null
          },
          "utilities": {
            "rate": 0,
            "label": "No points on utilities",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.2,
        "bestOption": "Redeem for IOCL fuel or catalogue products",
        "options": [
          {
            "type": "IOCL Fuel",
            "value": 0.2,
            "desc": "Redeem at IOCL outlets",
            "recommended": true
          },
          {
            "type": "Product Catalogue",
            "value": 0.2,
            "desc": "1 RP = \u20b90.20",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "None",
        "international": "None",
        "accessType": "None"
      },
      "milestones": [],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": true,
        "text": "10% off on BookMyShow"
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 50
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5% + GST"
      }
    },
    "metadata": {
      "tags": [
        "Co-branded",
        "Fuel",
        "IOCL",
        "Entry-Level"
      ],
      "bestFor": "Regular commuters who fuel up at IndianOil outlets",
      "rating": 3.5,
      "verdict": "Best budget fuel card for IOCL customers with 4% value-back on fuel",
      "pros": [
        "4% value-back on IOCL fuel",
        "Low \u20b9500 annual fee",
        "1% on online shopping",
        "Fuel surcharge waiver"
      ],
      "cons": [
        "Only works at IOCL outlets",
        "No lounge access",
        "\u20b950 fuel surcharge waiver cap",
        "Fuel txn must be \u20b9400-\u20b94,000"
      ]
    },
    "slug": "axis-indianoil"
  },
  {
    "id": "axis-lic-signature",
    "name": "LIC Axis Bank Signature Credit Card",
    "bank": "Axis Bank",
    "image": "/assets/cards/axis-lic-signature.png",
    "link": "https://www.axisbank.com/retail/cards/credit-card/lic-axis-bank-signature-credit-card",
    "fees": {
      "joining": 0,
      "annual": 0,
      "currency": "INR",
      "waivedOn": null,
      "waiverText": "Lifetime Free - No joining or annual fee"
    },
    "eligibility": {
      "income": 500000,
      "age": {
        "min": 18,
        "max": 70
      },
      "type": "LIC Policyholders/Salaried/Self-Employed",
      "creditScore": 700
    },
    "rewards": {
      "type": "points",
      "name": "Reward Points",
      "baseRate": 0.002,
      "earningText": "2 Reward Points per \u20b9100 on LIC premium & international spends; 1 RP per \u20b9100 on others",
      "expiry": "12 months from earning date",
      "joiningBonus": "None",
      "exclusions": "Fuel, Wallet, EMI, Utilities & Telecom, Education, Rent, Government, Gold/Jewellery",
      "calculator": {
        "tier": "co-branded",
        "monthlyCap": null,
        "capResetPeriod": "calendar",
        "specialLogic": "2X rewards on LIC premium payments and international transactions",
        "categories": {
          "travel": {
            "rate": 0.002,
            "label": "2 RP/\u20b9100 on international",
            "cap": null
          },
          "dining": {
            "rate": 0.001,
            "label": "1 RP/\u20b9100",
            "cap": null
          },
          "online": {
            "rate": 0.001,
            "label": "1 RP/\u20b9100",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No points on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.001,
            "label": "1 RP/\u20b9100",
            "cap": null
          },
          "utilities": {
            "rate": 0,
            "label": "No points on utilities",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.2,
        "bestOption": "Redeem for vouchers or products via LIC Cards catalogue",
        "options": [
          {
            "type": "Product Catalogue",
            "value": 0.2,
            "desc": "Redeem via LIC Cards portal",
            "recommended": true
          },
          {
            "type": "Gift Vouchers",
            "value": 0.2,
            "desc": "E-vouchers and gift cards",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "8 per calendar year",
        "international": "None",
        "accessType": "Card-based"
      },
      "milestones": [],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 400
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5% + GST"
      }
    },
    "metadata": {
      "tags": [
        "Co-branded",
        "LIC",
        "Insurance",
        "Free Card"
      ],
      "bestFor": "LIC policyholders seeking rewards on premium payments",
      "rating": 3.6,
      "verdict": "Free card for LIC customers with 2X on premiums and 8 lounge visits",
      "pros": [
        "Zero annual fee (lifetime free)",
        "2X on LIC premiums & international",
        "8 domestic lounge visits",
        "Lost card liability cover"
      ],
      "cons": [
        "Very low 0.2% reward rate",
        "Only 12-month reward validity",
        "No international lounge",
        "Basic benefits"
      ]
    },
    "slug": "axis-lic-signature"
  },
  {
    "id": "axis-rewards",
    "name": "Axis Bank Rewards Credit Card",
    "bank": "Axis Bank",
    "image": "/assets/cards/axis-rewards.png",
    "link": "https://www.axisbank.com/retail/cards/credit-card/rewards-credit-card",
    "fees": {
      "joining": 1000,
      "annual": 1000,
      "currency": "INR",
      "waivedOn": 200000,
      "waiverText": "Annual fee waived on spending \u20b92 Lakh in card anniversary year"
    },
    "eligibility": {
      "income": 500000,
      "age": {
        "min": 18,
        "max": 70
      },
      "type": "Salaried/Self-Employed/Citi Rewards Migration",
      "creditScore": 700
    },
    "rewards": {
      "type": "points",
      "name": "EDGE Reward Points",
      "baseRate": 0.0032,
      "earningText": "2 EDGE Reward Points per \u20b9125 spent; 10X (20 RP) on apparel & departmental stores",
      "expiry": "3 years from earning date",
      "joiningBonus": "5,000 EDGE Reward Points (\u20b91,000 value) on \u20b91,000 spend within 30 days",
      "exclusions": "Fuel, Wallet, Rent, Insurance, Utilities, Education, Government, EMI, Cash Advances",
      "calculator": {
        "tier": "entry",
        "monthlyCap": null,
        "capResetPeriod": "calendar",
        "specialLogic": "10X rewards on apparel & departmental stores (up to \u20b97K/month); 1,500 bonus RP on \u20b930K monthly spend",
        "categories": {
          "travel": {
            "rate": 0.0032,
            "label": "2 EDGE Points/\u20b9125",
            "cap": null
          },
          "dining": {
            "rate": 0.0032,
            "label": "2 EDGE Points/\u20b9125",
            "cap": null
          },
          "online": {
            "rate": 0.0032,
            "label": "2 EDGE Points/\u20b9125",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No points on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.032,
            "label": "10X (20 RP/\u20b9125) on apparel/dept stores",
            "cap": null
          },
          "utilities": {
            "rate": 0,
            "label": "No points on utilities",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.2,
        "bestOption": "Transfer to partner airlines or redeem for products",
        "options": [
          {
            "type": "Partner Airmiles",
            "value": 0.2,
            "desc": "10 RP = 1 Partner Point",
            "recommended": true
          },
          {
            "type": "Product Catalogue",
            "value": 0.2,
            "desc": "1 RP = \u20b90.20",
            "recommended": false
          },
          {
            "type": "Cashback",
            "value": 0.2,
            "desc": "1 RP = \u20b90.20 statement credit",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "2/quarter on \u20b950K spend in previous quarter",
        "international": "None",
        "accessType": "Spend-based"
      },
      "milestones": [
        {
          "spend": 30000,
          "benefit": "1,500 EDGE Reward Points per month (on \u20b930K+ monthly spend)"
        }
      ],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 400
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5% + GST"
      }
    },
    "metadata": {
      "tags": [
        "Rewards",
        "Shopping",
        "Apparel",
        "Citi Rewards Replacement"
      ],
      "bestFor": "Shoppers at apparel and departmental stores seeking 10X rewards",
      "rating": 3.7,
      "verdict": "Decent for apparel shoppers with 10X rewards but low base rate otherwise",
      "pros": [
        "10X rewards on apparel/dept stores",
        "1,500 monthly milestone bonus",
        "Swiggy 30% off",
        "Membership bouquet \u20b91,000/year"
      ],
      "cons": [
        "Low base reward rate (0.3%)",
        "10X accelerated capped at \u20b97K",
        "Only domestic lounges (spend-based)"
      ]
    },
    "slug": "axis-rewards"
  },
  {
    "id": "sbi-aurum",
    "name": "SBI Aurum Credit Card",
    "bank": "SBI Card",
    "image": "/assets/cards/sbi-aurum.png",
    "link": "https://www.aurumcreditcard.com/",
    "fees": {
      "joining": 9999,
      "annual": 9999,
      "currency": "INR",
      "waivedOn": 1200000,
      "waiverText": "Annual fee waived on spends of Rs. 12 Lakh in a year"
    },
    "eligibility": {
      "income": 4000000,
      "age": {
        "min": 21,
        "max": 60
      },
      "type": "Invite-only (HNI)",
      "creditScore": 750
    },
    "rewards": {
      "type": "points",
      "name": "AURUM Reward Points",
      "baseRate": 0.01,
      "earningText": "Earn 4 Reward Points per Rs. 100 spent (1% value back)",
      "expiry": "Never expires",
      "joiningBonus": "40,000 AURUM Reward Points worth Rs. 10,000 on payment of joining fee",
      "exclusions": "Fuel, Wallet loads, Rent, Government, Insurance, Education, Utilities",
      "calculator": {
        "tier": "super-premium",
        "monthlyCap": null,
        "capResetPeriod": "calendar",
        "specialLogic": "Monthly milestone: Rs. 1,500 TataCliq Luxury voucher on Rs. 1 Lakh monthly spend",
        "categories": {
          "travel": {
            "rate": 0.01,
            "label": "4 RP/Rs. 100",
            "cap": null
          },
          "dining": {
            "rate": 0.01,
            "label": "4 RP/Rs. 100",
            "cap": null
          },
          "online": {
            "rate": 0.01,
            "label": "4 RP/Rs. 100",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No rewards on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.01,
            "label": "4 RP/Rs. 100",
            "cap": null
          },
          "utilities": {
            "rate": 0,
            "label": "No rewards on utilities",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Redeem at AURUM Rewards Portal for flights, hotels, gift vouchers",
        "options": [
          {
            "type": "AURUM Rewards Portal",
            "value": 0.25,
            "desc": "1 RP = Rs. 0.25 for flights, hotels, experiences",
            "recommended": true
          },
          {
            "type": "Statement Credit",
            "value": 0.25,
            "desc": "1 RP = Rs. 0.25",
            "recommended": false
          },
          {
            "type": "Product Catalogue",
            "value": 0.25,
            "desc": "1 RP = Rs. 0.25",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "4 per quarter (16 per year) via Visa/MasterCard",
        "international": "Unlimited via DreamFolks/Priority Pass",
        "accessType": "DreamFolks / Priority Pass"
      },
      "milestones": [
        {
          "spend": 100000,
          "benefit": "Rs. 1,500 TataCliq Luxury voucher (monthly)"
        },
        {
          "spend": 500000,
          "benefit": "Rs. 5,000 TataCliq Luxury voucher (annual)"
        },
        {
          "spend": 1000000,
          "benefit": "Rs. 10,000 Taj voucher (annual)"
        },
        {
          "spend": 2000000,
          "benefit": "Rs. 20,000 Apple voucher (annual)"
        }
      ],
      "golf": {
        "included": true,
        "text": "16 complimentary rounds per year (4/quarter) + 12 lessons per year"
      },
      "movies": {
        "included": true,
        "text": "4 movie tickets worth Rs. 250 each per month via BookMyShow (Rs. 12,000/year)"
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 250
      },
      "forex": {
        "markup": 0.0199,
        "text": "1.99%"
      }
    },
    "metadata": {
      "tags": [
        "Super-Premium",
        "Metal Card",
        "Invite-Only",
        "Luxury",
        "Travel"
      ],
      "bestFor": "High-net-worth individuals seeking luxury lifestyle benefits and premium travel perks",
      "rating": 4.2,
      "verdict": "Top-tier card with excellent milestone benefits but invite-only access limits availability",
      "pros": [
        "Unlimited international lounge access",
        "Strong milestone benefits up to 3.7% return",
        "Premium memberships (Club Marriott, WSJ, Mint)",
        "Complimentary spa access at airports",
        "Low forex markup of 1.99%"
      ],
      "cons": [
        "Invite-only - not directly accessible",
        "High annual fee of Rs. 9,999",
        "Base reward rate of only 1%",
        "Rs. 12 Lakh spend required for fee waiver"
      ]
    },
    "slug": "sbi-aurum"
  },
  {
    "id": "sbi-elite",
    "name": "SBI Elite Credit Card",
    "bank": "SBI Card",
    "image": "/assets/cards/sbi-elite.png",
    "link": "https://www.sbicard.com/en/personal/credit-cards/lifestyle/sbi-card-elite.page",
    "fees": {
      "joining": 4999,
      "annual": 4999,
      "currency": "INR",
      "waivedOn": 1000000,
      "waiverText": "Annual fee waived on spends of Rs. 10 Lakh in a year"
    },
    "eligibility": {
      "income": 1200000,
      "age": {
        "min": 21,
        "max": 70
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 750
    },
    "rewards": {
      "type": "points",
      "name": "Elite Reward Points",
      "baseRate": 0.005,
      "earningText": "Earn 2 Reward Points per Rs. 100 spent (0.5% base), 5X on select categories",
      "expiry": "2 years from accrual",
      "joiningBonus": "E-Gift vouchers worth Rs. 5,000 from Yatra/Bata/Aditya Birla Fashion/Pantaloons/Shoppers Stop",
      "exclusions": "Fuel, Wallet loads, Rent, Government payments",
      "calculator": {
        "tier": "premium",
        "monthlyCap": null,
        "capResetPeriod": "calendar",
        "specialLogic": "5X rewards on Dining, Groceries, Departmental Stores",
        "categories": {
          "travel": {
            "rate": 0.005,
            "label": "2 RP/Rs. 100 (0.5%)",
            "cap": null
          },
          "dining": {
            "rate": 0.025,
            "label": "10 RP/Rs. 100 (2.5%)",
            "cap": null
          },
          "online": {
            "rate": 0.005,
            "label": "2 RP/Rs. 100 (0.5%)",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No rewards on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.025,
            "label": "10 RP/Rs. 100 (2.5%)",
            "cap": null
          },
          "utilities": {
            "rate": 0.005,
            "label": "2 RP/Rs. 100 (0.5%)",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Redeem for gift vouchers or statement credit",
        "options": [
          {
            "type": "Statement Credit",
            "value": 0.25,
            "desc": "4 RP = Rs. 1",
            "recommended": true
          },
          {
            "type": "Gift Vouchers",
            "value": 0.25,
            "desc": "4 RP = Rs. 1",
            "recommended": true
          },
          {
            "type": "Product Catalogue",
            "value": 0.25,
            "desc": "4 RP = Rs. 1",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "2 per quarter (8 per year) via Visa/MasterCard/RuPay",
        "international": "6 per year (max 2 per quarter) via Priority Pass",
        "accessType": "Priority Pass / Visa / MasterCard"
      },
      "milestones": [
        {
          "spend": 300000,
          "benefit": "10,000 Bonus Reward Points"
        },
        {
          "spend": 400000,
          "benefit": "10,000 Bonus Reward Points"
        },
        {
          "spend": 500000,
          "benefit": "15,000 Bonus Reward Points"
        },
        {
          "spend": 800000,
          "benefit": "15,000 Bonus Reward Points"
        }
      ],
      "golf": {
        "included": true,
        "text": "4 complimentary green fees access + up to 50% off on golf games + 1 lesson/month"
      },
      "movies": {
        "included": true,
        "text": "2 complimentary movie tickets per month (Rs. 250 each) via BookMyShow - Rs. 6,000/year"
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 250
      },
      "forex": {
        "markup": 0.0199,
        "text": "1.99%"
      }
    },
    "metadata": {
      "tags": [
        "Premium",
        "Lifestyle",
        "Travel",
        "Movies",
        "Dining"
      ],
      "bestFor": "Frequent diners and grocery shoppers seeking premium travel and movie benefits",
      "rating": 4,
      "verdict": "Solid premium card with good accelerated rewards but high fee relative to benefits",
      "pros": [
        "5X rewards on dining, groceries, departmental stores",
        "Free movie tickets worth Rs. 6,000/year",
        "Low forex markup of 1.99%",
        "Priority Pass with 6 international visits",
        "Available in Visa/MasterCard/Amex/RuPay variants"
      ],
      "cons": [
        "High annual fee of Rs. 4,999",
        "Base reward rate of only 0.5%",
        "Rs. 10 Lakh spend required for fee waiver",
        "Club Vistara membership discontinued"
      ]
    },
    "slug": "sbi-elite"
  },
  {
    "id": "sbi-prime",
    "name": "SBI Prime Credit Card",
    "bank": "SBI Card",
    "image": "/assets/cards/sbi-prime.png",
    "link": "https://www.sbicard.com/en/personal/credit-cards/rewards/sbi-card-prime.page",
    "fees": {
      "joining": 2999,
      "annual": 2999,
      "currency": "INR",
      "waivedOn": 300000,
      "waiverText": "Annual fee waived on spends of Rs. 3 Lakh in a year"
    },
    "eligibility": {
      "income": 600000,
      "age": {
        "min": 21,
        "max": 70
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 750
    },
    "rewards": {
      "type": "points",
      "name": "Prime Reward Points",
      "baseRate": 0.005,
      "earningText": "Earn 2 Reward Points per Rs. 100 spent (0.5% base), 5X on select categories",
      "expiry": "2 years from accrual",
      "joiningBonus": "E-Gift voucher worth Rs. 3,000 from Yatra/Bata/Aditya Birla Fashion/Pantaloons/Shoppers Stop",
      "exclusions": "Fuel, Wallet loads, Rent, Government payments",
      "calculator": {
        "tier": "premium",
        "monthlyCap": 7500,
        "capResetPeriod": "calendar",
        "specialLogic": "5X rewards on Dining, Groceries, Movies, Departmental Stores; capped at 7,500 RP/month",
        "categories": {
          "travel": {
            "rate": 0.005,
            "label": "2 RP/Rs. 100 (0.5%)",
            "cap": null
          },
          "dining": {
            "rate": 0.025,
            "label": "10 RP/Rs. 100 (2.5%)",
            "cap": 1875
          },
          "online": {
            "rate": 0.005,
            "label": "2 RP/Rs. 100 (0.5%)",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No rewards on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.025,
            "label": "10 RP/Rs. 100 (2.5%)",
            "cap": 1875
          },
          "utilities": {
            "rate": 0.005,
            "label": "2 RP/Rs. 100 (0.5%)",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Redeem for gift vouchers or statement credit",
        "options": [
          {
            "type": "Statement Credit",
            "value": 0.25,
            "desc": "4 RP = Rs. 1",
            "recommended": true
          },
          {
            "type": "Gift Vouchers",
            "value": 0.25,
            "desc": "4 RP = Rs. 1",
            "recommended": true
          },
          {
            "type": "Product Catalogue",
            "value": 0.25,
            "desc": "4 RP = Rs. 1",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "8 per year (max 2 per quarter) via Visa/MasterCard/RuPay",
        "international": "4 per year (max 2 per quarter) via Priority Pass",
        "accessType": "Priority Pass / Visa / MasterCard"
      },
      "milestones": [
        {
          "spend": 50000,
          "benefit": "Rs. 1,000 Pizza Hut e-voucher (quarterly)"
        },
        {
          "spend": 500000,
          "benefit": "Rs. 7,000 e-voucher from Yatra/Pantaloons (annual)"
        }
      ],
      "golf": {
        "included": true,
        "text": "4 complimentary green fees access + up to 50% off on golf + 1 lesson/month"
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 250
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5%"
      }
    },
    "metadata": {
      "tags": [
        "Mid-Premium",
        "Rewards",
        "Dining",
        "Groceries",
        "Travel"
      ],
      "bestFor": "Mid-tier spenders seeking rewards on dining, groceries, and movies with travel perks",
      "rating": 3.8,
      "verdict": "Good value for mid-range spenders but monthly cap limits high spenders",
      "pros": [
        "5X rewards on dining, groceries, movies, departmental stores",
        "Lower fee waiver threshold of Rs. 3 Lakh",
        "20X birthday bonus rewards",
        "Good lounge access (8 domestic + 4 international)",
        "ITC Silver membership for new cards"
      ],
      "cons": [
        "Monthly cap of 7,500 RPs on accelerated rewards",
        "No free movie tickets unlike Elite",
        "Higher forex markup of 3.5%",
        "No renewal benefits"
      ]
    },
    "slug": "sbi-prime"
  },
  {
    "id": "sbi-simplyclick",
    "name": "SBI SimplyCLICK Credit Card",
    "bank": "SBI Card",
    "image": "/assets/cards/sbi-simplyclick.png",
    "link": "https://www.sbicard.com/en/personal/credit-cards/shopping/simplyclick-sbi-card.page",
    "fees": {
      "joining": 499,
      "annual": 499,
      "currency": "INR",
      "waivedOn": 100000,
      "waiverText": "Annual fee reversed on spends of Rs. 1 Lakh in a year"
    },
    "eligibility": {
      "income": 300000,
      "age": {
        "min": 21,
        "max": 70
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 700
    },
    "rewards": {
      "type": "points",
      "name": "SimplyCLICK Reward Points",
      "baseRate": 0.0025,
      "earningText": "1 RP per Rs. 100 (0.25% base), 10X on partners, 5X on other online",
      "expiry": "2 years from accrual",
      "joiningBonus": "Amazon.in gift card worth Rs. 500 on payment of joining fee",
      "exclusions": "Fuel (offline), Wallet loads, Rent, Government payments",
      "calculator": {
        "tier": "entry",
        "monthlyCap": 10000,
        "capResetPeriod": "calendar",
        "specialLogic": "10X on partners (Apollo, BookMyShow, Cleartrip, Dominos, IGP, Myntra, Netmeds, Yatra), 5X on other online; each capped at 10,000 RP/month",
        "categories": {
          "travel": {
            "rate": 0.0125,
            "label": "5X online (1.25%)",
            "cap": 2500
          },
          "dining": {
            "rate": 0.025,
            "label": "10X partners (2.5%)",
            "cap": 2500
          },
          "online": {
            "rate": 0.025,
            "label": "10X partners / 5X others",
            "cap": 2500
          },
          "fuel": {
            "rate": 0,
            "label": "No rewards on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.0125,
            "label": "5X online (1.25%)",
            "cap": 2500
          },
          "utilities": {
            "rate": 0.0025,
            "label": "1 RP/Rs. 100 (0.25%)",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Redeem for e-vouchers from partner brands",
        "options": [
          {
            "type": "Cleartrip/Yatra Vouchers",
            "value": 0.25,
            "desc": "4 RP = Rs. 1",
            "recommended": true
          },
          {
            "type": "Statement Credit",
            "value": 0.25,
            "desc": "4 RP = Rs. 1",
            "recommended": false
          },
          {
            "type": "Gift Vouchers",
            "value": 0.25,
            "desc": "4 RP = Rs. 1",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "None",
        "international": "None",
        "accessType": "N/A"
      },
      "milestones": [
        {
          "spend": 100000,
          "benefit": "Rs. 2,000 Cleartrip/Yatra e-voucher (annual online spends)"
        },
        {
          "spend": 200000,
          "benefit": "Rs. 2,000 Cleartrip/Yatra e-voucher (annual online spends)"
        }
      ],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 100
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5%"
      }
    },
    "metadata": {
      "tags": [
        "Entry-Level",
        "Online Shopping",
        "E-Commerce",
        "Budget"
      ],
      "bestFor": "Online shoppers who frequently use partner platforms like Myntra, BookMyShow, Cleartrip",
      "rating": 4,
      "verdict": "Excellent entry-level card for online shopping enthusiasts with strong partner rewards",
      "pros": [
        "10X rewards on 8 popular online partners",
        "5X rewards on all other online spends",
        "Low annual fee of Rs. 499",
        "Easy fee waiver at Rs. 1 Lakh",
        "Good milestone vouchers"
      ],
      "cons": [
        "No airport lounge access",
        "Monthly cap of 10,000 RPs per category",
        "Low base rate of 0.25% offline",
        "No travel or dining perks"
      ]
    },
    "slug": "sbi-simplyclick"
  },
  {
    "id": "sbi-simplysave",
    "name": "SBI SimplySAVE Credit Card",
    "bank": "SBI Card",
    "image": "/assets/cards/sbi-simplysave.png",
    "link": "https://www.sbicard.com/en/personal/credit-cards/shopping/simplysave-sbi-card.page",
    "fees": {
      "joining": 499,
      "annual": 499,
      "currency": "INR",
      "waivedOn": 100000,
      "waiverText": "Annual fee reversed on spends of Rs. 1 Lakh in a year"
    },
    "eligibility": {
      "income": 300000,
      "age": {
        "min": 21,
        "max": 70
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 700
    },
    "rewards": {
      "type": "points",
      "name": "SimplySAVE Reward Points",
      "baseRate": 0.00167,
      "earningText": "1 RP per Rs. 150 (0.17% base), 10X on Dining/Movies/Groceries/Departmental",
      "expiry": "2 years from accrual",
      "joiningBonus": "2,000 Bonus Reward Points on spending Rs. 2,000 within 60 days",
      "exclusions": "Fuel, Wallet loads, Rent, Government payments",
      "calculator": {
        "tier": "entry",
        "monthlyCap": 5000,
        "capResetPeriod": "calendar",
        "specialLogic": "10X (10 RP per Rs. 150) on Dining, Movies, Groceries, Departmental Stores; capped at 5,000 RP/month",
        "categories": {
          "travel": {
            "rate": 0.00167,
            "label": "1 RP/Rs. 150 (0.17%)",
            "cap": null
          },
          "dining": {
            "rate": 0.0167,
            "label": "10 RP/Rs. 150 (1.67%)",
            "cap": 1250
          },
          "online": {
            "rate": 0.00167,
            "label": "1 RP/Rs. 150 (0.17%)",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No rewards on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.0167,
            "label": "10 RP/Rs. 150 (1.67%)",
            "cap": 1250
          },
          "utilities": {
            "rate": 0.00167,
            "label": "1 RP/Rs. 150 (0.17%)",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Redeem for gift vouchers or statement credit",
        "options": [
          {
            "type": "Statement Credit",
            "value": 0.25,
            "desc": "4 RP = Rs. 1",
            "recommended": true
          },
          {
            "type": "Gift Vouchers",
            "value": 0.25,
            "desc": "4 RP = Rs. 1",
            "recommended": true
          },
          {
            "type": "Product Catalogue",
            "value": 0.25,
            "desc": "4 RP = Rs. 1",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "None",
        "international": "None",
        "accessType": "N/A"
      },
      "milestones": [],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 100
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5%"
      }
    },
    "metadata": {
      "tags": [
        "Entry-Level",
        "Offline Shopping",
        "Dining",
        "Groceries",
        "Budget"
      ],
      "bestFor": "Everyday spenders who shop at physical stores, dine out, and buy groceries",
      "rating": 3.7,
      "verdict": "Solid entry-level card for offline spenders but lower reward rate than SimplyCLICK",
      "pros": [
        "10X rewards on dining, movies, groceries, departmental stores",
        "Low annual fee of Rs. 499",
        "Easy fee waiver at Rs. 1 Lakh",
        "Welcome bonus of 2,000 RPs",
        "Available in RuPay UPI variant"
      ],
      "cons": [
        "No airport lounge access",
        "Monthly cap of 5,000 RPs on accelerated categories",
        "Lower base rate than SimplyCLICK (0.17% vs 0.25%)",
        "No milestone benefits"
      ]
    },
    "slug": "sbi-simplysave"
  },
  {
    "id": "sbi-pulse",
    "name": "SBI Pulse Credit Card",
    "bank": "SBI Card",
    "image": "/assets/cards/sbi-pulse.png",
    "link": "https://www.sbicard.com/en/personal/credit-cards/lifestyle/sbi-card-pulse.page",
    "fees": {
      "joining": 1499,
      "annual": 1499,
      "currency": "INR",
      "waivedOn": 200000,
      "waiverText": "Annual fee waived on spends of Rs. 2 Lakh in a year"
    },
    "eligibility": {
      "income": 200000,
      "age": {
        "min": 21,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 750
    },
    "rewards": {
      "type": "points",
      "name": "Pulse Reward Points",
      "baseRate": 0.005,
      "earningText": "2 RP per Rs. 100 (0.5% base), 5X on health categories",
      "expiry": "2 years from accrual",
      "joiningBonus": "Noise ColorFit Pulse 4 Pro Smartwatch worth Rs. 7,999 + 1-year FITPASS PRO + 1-year Netmeds First membership",
      "exclusions": "Fuel, Wallet loads, Rent, Government payments, EMI transactions",
      "calculator": {
        "tier": "entry",
        "monthlyCap": null,
        "capResetPeriod": "calendar",
        "specialLogic": "5X (10 RP per Rs. 100) on Pharmacy, Chemist, Dining, Movies, Sports",
        "categories": {
          "travel": {
            "rate": 0.005,
            "label": "2 RP/Rs. 100 (0.5%)",
            "cap": null
          },
          "dining": {
            "rate": 0.025,
            "label": "10 RP/Rs. 100 (2.5%)",
            "cap": null
          },
          "online": {
            "rate": 0.005,
            "label": "2 RP/Rs. 100 (0.5%)",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No rewards on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.005,
            "label": "2 RP/Rs. 100 (0.5%)",
            "cap": null
          },
          "utilities": {
            "rate": 0.005,
            "label": "2 RP/Rs. 100 (0.5%)",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Redeem for Netmeds vouchers or statement credit",
        "options": [
          {
            "type": "Statement Credit",
            "value": 0.25,
            "desc": "4 RP = Rs. 1",
            "recommended": true
          },
          {
            "type": "Netmeds Vouchers",
            "value": 0.25,
            "desc": "4 RP = Rs. 1",
            "recommended": true
          },
          {
            "type": "Product Catalogue",
            "value": 0.25,
            "desc": "4 RP = Rs. 1",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "8 per year (max 2 per quarter) via Visa/MasterCard",
        "international": "Priority Pass membership (lounge visits chargeable)",
        "accessType": "Visa / MasterCard / Priority Pass"
      },
      "milestones": [
        {
          "spend": 400000,
          "benefit": "Rs. 1,500 Netmeds e-voucher (annual)"
        }
      ],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 250
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5%"
      }
    },
    "metadata": {
      "tags": [
        "Health",
        "Fitness",
        "Wellness",
        "Pharmacy",
        "Lifestyle"
      ],
      "bestFor": "Health-conscious individuals who spend on pharmacy, fitness, and wellness",
      "rating": 3.6,
      "verdict": "Unique health-focused card with great welcome benefits but niche appeal",
      "pros": [
        "Smartwatch worth Rs. 7,999 as welcome gift",
        "Free FITPASS PRO + Netmeds First membership yearly",
        "5X rewards on pharmacy and health spends",
        "8 complimentary domestic lounge visits",
        "Good insurance coverage"
      ],
      "cons": [
        "Niche category focus limits universal appeal",
        "High milestone threshold of Rs. 4 Lakh",
        "Low base reward rate of 0.5%",
        "Priority Pass visits are chargeable"
      ]
    },
    "slug": "sbi-pulse"
  },
  {
    "id": "club-vistara-sbi-prime",
    "name": "Club Vistara SBI Card PRIME",
    "bank": "SBI Card",
    "image": "/assets/cards/club-vistara-sbi-prime.png",
    "link": "https://www.sbicard.com/en/personal/credit-cards/travel/club-vistara-sbi-card-prime.page",
    "fees": {
      "joining": 2999,
      "annual": 2999,
      "currency": "INR",
      "waivedOn": null,
      "waiverText": "No fee waiver available"
    },
    "eligibility": {
      "income": 600000,
      "age": {
        "min": 18,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 750
    },
    "rewards": {
      "type": "miles",
      "name": "Club Vistara Points",
      "baseRate": 0.02,
      "earningText": "4 CV Points per Rs. 200 spent on all categories including fuel",
      "expiry": "36 months from date of flight",
      "joiningBonus": "1 complimentary Premium Economy ticket e-voucher + 3,000 bonus CV Points on Rs. 75,000 spend in 90 days",
      "exclusions": "Rent payments (w.e.f. April 2024)",
      "calculator": {
        "tier": "co-branded",
        "monthlyCap": null,
        "capResetPeriod": "calendar",
        "specialLogic": "CV Points redeemable on Vistara flights; CV Silver status included",
        "categories": {
          "travel": {
            "rate": 0.02,
            "label": "4 CV/Rs. 200",
            "cap": null
          },
          "dining": {
            "rate": 0.02,
            "label": "4 CV/Rs. 200",
            "cap": null
          },
          "online": {
            "rate": 0.02,
            "label": "4 CV/Rs. 200",
            "cap": null
          },
          "fuel": {
            "rate": 0.02,
            "label": "4 CV/Rs. 200",
            "cap": null
          },
          "groceries": {
            "rate": 0.02,
            "label": "4 CV/Rs. 200",
            "cap": null
          },
          "utilities": {
            "rate": 0.02,
            "label": "4 CV/Rs. 200",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.8,
        "bestOption": "Redeem for Vistara flights or partner airlines",
        "options": [
          {
            "type": "Vistara Award Flights",
            "value": 0.8,
            "desc": "1 CV = Rs. 0.80 approx",
            "recommended": true
          },
          {
            "type": "Partner Airlines (Singapore Airlines)",
            "value": 0.8,
            "desc": "Transfer to partner programs",
            "recommended": false
          },
          {
            "type": "Upgrade Vouchers",
            "value": 0.8,
            "desc": "Use for cabin upgrades",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "8 per year (max 2 per quarter) via Visa/MasterCard",
        "international": "4 per year (max 2 per quarter) via Priority Pass",
        "accessType": "Priority Pass / Visa / MasterCard"
      },
      "milestones": [
        {
          "spend": 150000,
          "benefit": "1 Premium Economy ticket (being discontinued post April 2025)"
        },
        {
          "spend": 300000,
          "benefit": "1 Premium Economy ticket (being discontinued post April 2025)"
        },
        {
          "spend": 450000,
          "benefit": "1 Premium Economy ticket (being discontinued post April 2025)"
        },
        {
          "spend": 800000,
          "benefit": "1 Premium Economy ticket + Rs. 10,000 Yatra hotel voucher"
        }
      ],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "0%",
        "cap": 0
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5%"
      }
    },
    "metadata": {
      "tags": [
        "Travel",
        "Airlines",
        "Vistara",
        "Co-branded",
        "Frequent Flyer"
      ],
      "bestFor": "Vistara frequent flyers who want to earn free tickets through everyday spending",
      "rating": 4.3,
      "verdict": "Excellent value for Vistara loyalists with milestone tickets worth more than fees",
      "pros": [
        "Premium Economy ticket worth more than joining fee",
        "Up to 4 free Premium Economy tickets annually",
        "CV Points earn on all spends including fuel",
        "CV Silver status with lounge access",
        "Flight cancellation insurance up to Rs. 3,500"
      ],
      "cons": [
        "No fee waiver option",
        "Milestone benefits being discontinued April 2025",
        "Rent payments excluded from rewards",
        "Limited to Vistara ecosystem"
      ]
    },
    "slug": "club-vistara-sbi-prime"
  },
  {
    "id": "club-vistara-sbi",
    "name": "Club Vistara SBI Card",
    "bank": "SBI Card",
    "image": "/assets/cards/club-vistara-sbi.png",
    "link": "https://www.sbicard.com/en/personal/credit-cards/travel/club-vistara-sbi-card.page",
    "fees": {
      "joining": 1499,
      "annual": 1499,
      "currency": "INR",
      "waivedOn": null,
      "waiverText": "No fee waiver available"
    },
    "eligibility": {
      "income": 400000,
      "age": {
        "min": 18,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 750
    },
    "rewards": {
      "type": "miles",
      "name": "Club Vistara Points",
      "baseRate": 0.015,
      "earningText": "3 CV Points per Rs. 200 spent on all categories including fuel",
      "expiry": "36 months from date of flight",
      "joiningBonus": "1 complimentary Economy ticket e-voucher",
      "exclusions": "Rent payments (w.e.f. April 2024)",
      "calculator": {
        "tier": "co-branded",
        "monthlyCap": null,
        "capResetPeriod": "calendar",
        "specialLogic": "CV Points redeemable on Vistara flights; discontinued for new issuance Sept 2024",
        "categories": {
          "travel": {
            "rate": 0.015,
            "label": "3 CV/Rs. 200",
            "cap": null
          },
          "dining": {
            "rate": 0.015,
            "label": "3 CV/Rs. 200",
            "cap": null
          },
          "online": {
            "rate": 0.015,
            "label": "3 CV/Rs. 200",
            "cap": null
          },
          "fuel": {
            "rate": 0.015,
            "label": "3 CV/Rs. 200",
            "cap": null
          },
          "groceries": {
            "rate": 0.015,
            "label": "3 CV/Rs. 200",
            "cap": null
          },
          "utilities": {
            "rate": 0.015,
            "label": "3 CV/Rs. 200",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.8,
        "bestOption": "Redeem for Vistara flights",
        "options": [
          {
            "type": "Vistara Award Flights",
            "value": 0.8,
            "desc": "1 CV = Rs. 0.80 approx",
            "recommended": true
          },
          {
            "type": "Partner Airlines",
            "value": 0.8,
            "desc": "Transfer to partner programs",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "4 per year (1 per quarter) via MasterCard",
        "international": "4 per year (max 2 per quarter) via Priority Pass",
        "accessType": "Priority Pass / MasterCard"
      },
      "milestones": [
        {
          "spend": 150000,
          "benefit": "1 Economy ticket"
        },
        {
          "spend": 300000,
          "benefit": "1 Economy ticket"
        },
        {
          "spend": 450000,
          "benefit": "1 Economy ticket"
        },
        {
          "spend": 800000,
          "benefit": "1 Economy ticket + Rs. 5,000 Yatra hotel voucher"
        }
      ],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "0%",
        "cap": 0
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5%"
      }
    },
    "metadata": {
      "tags": [
        "Travel",
        "Airlines",
        "Vistara",
        "Co-branded",
        "Frequent Flyer"
      ],
      "bestFor": "Budget Vistara flyers who want free Economy tickets through card spending",
      "rating": 3.8,
      "verdict": "Good entry-point for Vistara loyalty but discontinued for new applications",
      "pros": [
        "Economy ticket worth more than joining fee",
        "CV Points earn on all spends including fuel",
        "Lower fee than PRIME variant",
        "Priority Pass membership included"
      ],
      "cons": [
        "Discontinued for new issuance (Sept 2024)",
        "No fee waiver option",
        "Lower CV Point earn rate than PRIME",
        "Economy tickets less valuable than Premium Economy"
      ]
    },
    "slug": "club-vistara-sbi"
  },
  {
    "id": "bpcl-sbi-octane",
    "name": "BPCL SBI Card OCTANE",
    "bank": "SBI Card",
    "image": "/assets/cards/bpcl-sbi-octane.png",
    "link": "https://www.sbicard.com/en/personal/credit-cards/travel/bpcl-sbi-card-octane.page",
    "fees": {
      "joining": 1499,
      "annual": 1499,
      "currency": "INR",
      "waivedOn": 200000,
      "waiverText": "Annual fee reversed on spends of Rs. 2 Lakh in a year"
    },
    "eligibility": {
      "income": 300000,
      "age": {
        "min": 21,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 750
    },
    "rewards": {
      "type": "points",
      "name": "BPCL Octane Reward Points",
      "baseRate": 0.0025,
      "earningText": "1 RP per Rs. 100 (0.25% base), 25X at BPCL, 10X on select categories",
      "expiry": "2 years from accrual",
      "joiningBonus": "6,000 Bonus Reward Points worth Rs. 1,500 on payment of joining fee",
      "exclusions": "Wallet loads, Non-BPCL fuel, Rent, Government payments",
      "calculator": {
        "tier": "co-branded",
        "monthlyCap": 2500,
        "capResetPeriod": "statement",
        "specialLogic": "25X (25 RP per Rs. 100) at BPCL capped at 2,500 RP/month; 10X on Dining, Groceries, Movies, Departmental capped at 7,500 RP/month",
        "categories": {
          "travel": {
            "rate": 0.0025,
            "label": "1 RP/Rs. 100 (0.25%)",
            "cap": null
          },
          "dining": {
            "rate": 0.025,
            "label": "10 RP/Rs. 100 (2.5%)",
            "cap": 1875
          },
          "online": {
            "rate": 0.0025,
            "label": "1 RP/Rs. 100 (0.25%)",
            "cap": null
          },
          "fuel": {
            "rate": 0.0725,
            "label": "25 RP/Rs. 100 at BPCL (6.25%) + 1% waiver",
            "cap": 625
          },
          "groceries": {
            "rate": 0.025,
            "label": "10 RP/Rs. 100 (2.5%)",
            "cap": 1875
          },
          "utilities": {
            "rate": 0.0025,
            "label": "1 RP/Rs. 100 (0.25%)",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Instant redemption at BPCL outlets for fuel",
        "options": [
          {
            "type": "BPCL Fuel Redemption",
            "value": 0.25,
            "desc": "4 RP = Rs. 1 at BPCL outlets",
            "recommended": true
          },
          {
            "type": "Statement Credit",
            "value": 0.25,
            "desc": "4 RP = Rs. 1",
            "recommended": false
          },
          {
            "type": "Gift Vouchers",
            "value": 0.25,
            "desc": "4 RP = Rs. 1",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "4 per year (max 1 per quarter) via Visa",
        "international": "None",
        "accessType": "Visa"
      },
      "milestones": [
        {
          "spend": 300000,
          "benefit": "Rs. 2,000 e-voucher from Aditya Birla Fashion/Yatra/Bata/Hush Puppies (annual)"
        }
      ],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 100
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5%"
      }
    },
    "metadata": {
      "tags": [
        "Fuel",
        "BPCL",
        "Co-branded",
        "Petrol",
        "Travel"
      ],
      "bestFor": "Regular BPCL fuel users seeking maximum value back on fuel spends",
      "rating": 4.2,
      "verdict": "Best fuel card for BPCL loyalists with 7.25% value back on fuel",
      "pros": [
        "7.25% total value back on BPCL fuel (6.25% rewards + 1% surcharge waiver)",
        "10X rewards on dining, groceries, movies",
        "Instant redemption at BPCL outlets",
        "Good welcome bonus of Rs. 1,500",
        "4 domestic lounge visits"
      ],
      "cons": [
        "Fuel benefits only at BPCL outlets",
        "Monthly fuel cap of 2,500 RPs",
        "Low base rate of 0.25% on other spends",
        "No international lounge access"
      ]
    },
    "slug": "bpcl-sbi-octane"
  },
  {
    "id": "bpcl-sbi",
    "name": "BPCL SBI Credit Card",
    "bank": "SBI Card",
    "image": "/assets/cards/bpcl-sbi.png",
    "link": "https://www.sbicard.com/en/personal/credit-cards/travel/bpcl-sbi-card.page",
    "fees": {
      "joining": 499,
      "annual": 499,
      "currency": "INR",
      "waivedOn": 50000,
      "waiverText": "Annual fee reversed on spends of Rs. 50,000 in a year"
    },
    "eligibility": {
      "income": 200000,
      "age": {
        "min": 21,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 700
    },
    "rewards": {
      "type": "points",
      "name": "BPCL Reward Points",
      "baseRate": 0.0025,
      "earningText": "1 RP per Rs. 100 (0.25% base), 13X at BPCL, 5X on select categories",
      "expiry": "2 years from accrual",
      "joiningBonus": "1,300 Bonus Reward Points on payment of joining fee",
      "exclusions": "Wallet loads, Non-BPCL fuel, Rent, Government payments",
      "calculator": {
        "tier": "co-branded",
        "monthlyCap": 1300,
        "capResetPeriod": "statement",
        "specialLogic": "13X (13 RP per Rs. 100) at BPCL capped at 1,300 RP/month; 5X on Dining, Groceries, Movies, Departmental capped at 5,000 RP/month",
        "categories": {
          "travel": {
            "rate": 0.0025,
            "label": "1 RP/Rs. 100 (0.25%)",
            "cap": null
          },
          "dining": {
            "rate": 0.0125,
            "label": "5 RP/Rs. 100 (1.25%)",
            "cap": 1250
          },
          "online": {
            "rate": 0.0025,
            "label": "1 RP/Rs. 100 (0.25%)",
            "cap": null
          },
          "fuel": {
            "rate": 0.0425,
            "label": "13 RP/Rs. 100 at BPCL (3.25%) + 1% waiver",
            "cap": 325
          },
          "groceries": {
            "rate": 0.0125,
            "label": "5 RP/Rs. 100 (1.25%)",
            "cap": 1250
          },
          "utilities": {
            "rate": 0.0025,
            "label": "1 RP/Rs. 100 (0.25%)",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Instant redemption at BPCL outlets for fuel",
        "options": [
          {
            "type": "BPCL Fuel Redemption",
            "value": 0.25,
            "desc": "4 RP = Rs. 1 at BPCL outlets",
            "recommended": true
          },
          {
            "type": "Statement Credit",
            "value": 0.25,
            "desc": "4 RP = Rs. 1",
            "recommended": false
          },
          {
            "type": "Gift Vouchers",
            "value": 0.25,
            "desc": "4 RP = Rs. 1",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "None",
        "international": "None",
        "accessType": "N/A"
      },
      "milestones": [],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 100
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5%"
      }
    },
    "metadata": {
      "tags": [
        "Fuel",
        "BPCL",
        "Co-branded",
        "Budget",
        "Entry-Level"
      ],
      "bestFor": "Budget-conscious BPCL users seeking fuel rewards at minimal fees",
      "rating": 3.5,
      "verdict": "Good entry-level fuel card but Octane offers significantly better value",
      "pros": [
        "4.25% total value back on BPCL fuel",
        "Low annual fee of Rs. 499",
        "Very easy fee waiver at Rs. 50,000",
        "5X rewards on dining and groceries"
      ],
      "cons": [
        "Lower fuel rewards than Octane",
        "No airport lounge access",
        "Lower monthly fuel cap of 1,300 RPs",
        "No milestone benefits"
      ]
    },
    "slug": "bpcl-sbi"
  },
  {
    "id": "yatra-sbi",
    "name": "Yatra SBI Credit Card",
    "bank": "SBI Card",
    "image": "/assets/cards/yatra-sbi.png",
    "link": "https://www.sbicard.com/en/personal/credit-cards/travel/yatra-sbi-card.page",
    "fees": {
      "joining": 499,
      "annual": 499,
      "currency": "INR",
      "waivedOn": 100000,
      "waiverText": "Annual fee reversed on spends of Rs. 1 Lakh in a year"
    },
    "eligibility": {
      "income": 300000,
      "age": {
        "min": 21,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 700
    },
    "rewards": {
      "type": "points",
      "name": "Yatra Reward Points",
      "baseRate": 0.0025,
      "earningText": "1 RP per Rs. 100 (0.25% base), 6X on dining, groceries, entertainment, international",
      "expiry": "2 years from accrual",
      "joiningBonus": "Yatra.com vouchers worth Rs. 8,250 on payment of joining fee",
      "exclusions": "Fuel, Wallet loads, Rent, Government payments",
      "calculator": {
        "tier": "co-branded",
        "monthlyCap": 5000,
        "capResetPeriod": "calendar",
        "specialLogic": "6X on Dining, Groceries, Departmental, Movies, Entertainment, International; each capped at 5,000 RP/month. Card discontinued March 2025.",
        "categories": {
          "travel": {
            "rate": 0.0025,
            "label": "1 RP/Rs. 100 (0.25%)",
            "cap": null
          },
          "dining": {
            "rate": 0.015,
            "label": "6 RP/Rs. 100 (1.5%)",
            "cap": 1250
          },
          "online": {
            "rate": 0.0025,
            "label": "1 RP/Rs. 100 (0.25%)",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No rewards on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.015,
            "label": "6 RP/Rs. 100 (1.5%)",
            "cap": 1250
          },
          "utilities": {
            "rate": 0.0025,
            "label": "1 RP/Rs. 100 (0.25%)",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Redeem for Yatra.com vouchers",
        "options": [
          {
            "type": "Yatra Vouchers",
            "value": 0.25,
            "desc": "4 RP = Rs. 1 for Yatra bookings",
            "recommended": true
          },
          {
            "type": "Statement Credit",
            "value": 0.25,
            "desc": "4 RP = Rs. 1",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "8 per year (max 2 per quarter) via MasterCard",
        "international": "None",
        "accessType": "MasterCard"
      },
      "milestones": [
        {
          "spend": 100000,
          "benefit": "Bonus Reward Points (annual)"
        }
      ],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 100
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5%"
      }
    },
    "metadata": {
      "tags": [
        "Travel",
        "Yatra",
        "Co-branded",
        "Budget",
        "Flights",
        "Hotels"
      ],
      "bestFor": "Budget travelers who book frequently on Yatra.com",
      "rating": 3.9,
      "verdict": "Great value for Yatra users with welcome vouchers exceeding annual fee, but card discontinued",
      "pros": [
        "Welcome vouchers worth Rs. 8,250 (16x the fee)",
        "Rs. 1,000 off domestic flights, Rs. 4,000 off international",
        "20% off domestic hotels",
        "8 domestic lounge visits",
        "Rs. 50 Lakh air accident cover"
      ],
      "cons": [
        "Card discontinued for new applications (March 2025)",
        "Travel benefits discontinued May 2025",
        "No international lounge access",
        "No rewards on fuel"
      ]
    },
    "slug": "yatra-sbi"
  },
  {
    "id": "sbi-simplysave-upi-rupay",
    "name": "SimplySAVE UPI SBI Card (RuPay)",
    "bank": "SBI Card",
    "image": "/assets/cards/sbi-simplysave-upi-rupay.png",
    "link": "https://www.sbicard.com/en/personal/credit-cards/shopping/simplysave-upi-rupay-card.page",
    "fees": {
      "joining": 499,
      "annual": 499,
      "currency": "INR",
      "waivedOn": 100000,
      "waiverText": "Annual fee reversed on spends of Rs. 1 Lakh in a year"
    },
    "eligibility": {
      "income": 300000,
      "age": {
        "min": 21,
        "max": 70
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 700
    },
    "rewards": {
      "type": "points",
      "name": "SimplySAVE Reward Points",
      "baseRate": 0.00167,
      "earningText": "1 RP per Rs. 150 (0.17% base), 10X on Dining/Movies/Groceries/Departmental",
      "expiry": "2 years from accrual",
      "joiningBonus": "2,000 Bonus Reward Points on spending Rs. 2,000 within 60 days",
      "exclusions": "Fuel, Wallet loads, Rent, Government payments",
      "calculator": {
        "tier": "entry",
        "monthlyCap": 5000,
        "capResetPeriod": "calendar",
        "specialLogic": "UPI-enabled RuPay card; 10X on Dining, Movies, Groceries, Departmental; capped at 5,000 RP/month",
        "categories": {
          "travel": {
            "rate": 0.00167,
            "label": "1 RP/Rs. 150 (0.17%)",
            "cap": null
          },
          "dining": {
            "rate": 0.0167,
            "label": "10 RP/Rs. 150 (1.67%)",
            "cap": 1250
          },
          "online": {
            "rate": 0.00167,
            "label": "1 RP/Rs. 150 (0.17%)",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No rewards on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.0167,
            "label": "10 RP/Rs. 150 (1.67%)",
            "cap": 1250
          },
          "utilities": {
            "rate": 0.00167,
            "label": "1 RP/Rs. 150 (0.17%)",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Redeem for gift vouchers or statement credit",
        "options": [
          {
            "type": "Statement Credit",
            "value": 0.25,
            "desc": "4 RP = Rs. 1",
            "recommended": true
          },
          {
            "type": "Gift Vouchers",
            "value": 0.25,
            "desc": "4 RP = Rs. 1",
            "recommended": true
          },
          {
            "type": "Product Catalogue",
            "value": 0.25,
            "desc": "4 RP = Rs. 1",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "RuPay Select benefits may include lounge access",
        "international": "None",
        "accessType": "RuPay"
      },
      "milestones": [],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 100
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5%"
      }
    },
    "metadata": {
      "tags": [
        "Entry-Level",
        "UPI",
        "RuPay",
        "Digital Payments",
        "Budget"
      ],
      "bestFor": "Users who want UPI credit line for everyday payments with rewards on dining and groceries",
      "rating": 3.8,
      "verdict": "Best entry-level RuPay card with UPI integration for seamless digital payments",
      "pros": [
        "UPI-enabled for QR code payments",
        "Rewards on UPI transactions",
        "10X on dining, movies, groceries, departmental",
        "Low annual fee of Rs. 499",
        "Easy fee waiver at Rs. 1 Lakh",
        "RuPay benefits and security"
      ],
      "cons": [
        "No airport lounge access",
        "Monthly cap of 5,000 RPs",
        "Low base rate of 0.17%",
        "Limited international acceptance"
      ]
    },
    "slug": "sbi-simplysave-upi-rupay"
  },
  {
    "id": "icici-emeralde",
    "name": "ICICI Emeralde Credit Card",
    "bank": "ICICI Bank",
    "image": "/assets/cards/icici-emeralde.png",
    "link": "https://www.icicibank.com/personal-banking/cards/credit-card/emeralde-credit-card",
    "fees": {
      "joining": 12000,
      "annual": 12000,
      "currency": "INR",
      "waivedOn": 1000000,
      "waiverText": "Annual fee waived on spending \u20b910 lakhs in a year"
    },
    "eligibility": {
      "income": 1800000,
      "age": {
        "min": 21,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 750
    },
    "rewards": {
      "type": "points",
      "name": "ICICI Reward Points",
      "baseRate": 0.01,
      "earningText": "4 RP per \u20b9100 on retail, 1 RP per \u20b9100 on utilities/insurance (1% value back at 0.25 redemption)",
      "expiry": "3 years from date of earning",
      "joiningBonus": "\u20b95,000 Tata CLiQ voucher (American Express variant only, as birthday benefit)",
      "exclusions": "Fuel, Rent, Tax, Government Services, E-Wallet Loads",
      "calculator": {
        "tier": "super-premium",
        "monthlyCap": null,
        "capResetPeriod": "calendar",
        "specialLogic": "4 RP per \u20b9100 on retail, 1 RP per \u20b9100 on utilities/insurance. Accelerated rewards via iShop. Category caps: Utilities \u20b980,000/month, Insurance \u20b980,000/month, Grocery \u20b940,000/month",
        "smartBuy": {
          "baseRewardRate": "1% (4 RP/₹100)",
          "pointValueTravel": 0.25,
          "pointValueVouchers": 0.25,
          "monthlyCap": 12000,
          "dailyCap": null,
          "merchants": {
            "hotels": { "multiplier": "12X", "effectiveRate": "12%", "label": "Hotels via iShop - 12X" },
            "flights": { "multiplier": "6X", "effectiveRate": "6%", "label": "Flights via iShop - 6X" },
            "vouchers": { "multiplier": "6X", "effectiveRate": "6%", "label": "Shopping Vouchers - 6X" },
            "bus": { "multiplier": "6X", "effectiveRate": "6%", "label": "Bus Bookings - 6X" }
          },
          "note": "Monthly cap: 12,000 RP (Bonus Points)"
        },
        "categories": {
          "travel": {
            "rate": 0.01,
            "label": "1% base; higher via iShop",
            "cap": null
          },
          "dining": {
            "rate": 0.01,
            "label": "1% value back",
            "cap": null
          },
          "online": {
            "rate": 0.01,
            "label": "1% value back",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "Excluded from rewards",
            "cap": null
          },
          "groceries": {
            "rate": 0.01,
            "label": "1% value back",
            "cap": 400
          },
          "utilities": {
            "rate": 0.0025,
            "label": "0.25% value back (1 RP per \u20b9100)",
            "cap": 200
          }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Redeem for e-vouchers (Tanishq, Marriott, Croma, Amazon) at 1 RP = \u20b90.25",
        "options": [
          {
            "type": "E-Vouchers",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": true
          },
          {
            "type": "Product Catalogue",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": false
          },
          {
            "type": "Statement Credit",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "Unlimited (Primary only)",
        "international": "Unlimited via Priority Pass/DreamFolks (Primary only)",
        "accessType": "Priority Pass / DreamFolks"
      },
      "milestones": [],
      "golf": {
        "included": true,
        "text": "1 complimentary golf round/lesson per \u20b950,000 spent in previous month (max 4 per month)"
      },
      "movies": {
        "included": true,
        "text": "BOGO on BookMyShow up to \u20b9750 off on second ticket, 4 times per month"
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 50000
      },
      "forex": {
        "markup": 0.02,
        "text": "2% + GST (~2.36%)"
      }
    },
    "metadata": {
      "tags": [
        "Super Premium",
        "Lifestyle",
        "Travel",
        "Unlimited Lounge"
      ],
      "bestFor": "High spenders who want unlimited lounge access and lifestyle benefits without the Metal card's invite-only restriction",
      "rating": 3.8,
      "verdict": "A solid super-premium card with excellent lounge benefits and 4 BookMyShow offers monthly, but underwhelming 1% reward rate compared to the Private Metal variant.",
      "pros": [
        "Unlimited domestic and international lounge access",
        "4 BookMyShow BOGO offers per month (best among ICICI cards)",
        "Spend-based golf benefits (up to 4 rounds/month)",
        "Travel cancellation cover up to \u20b912,000",
        "Low forex markup of 2%"
      ],
      "cons": [
        "Low reward rate of just 1% value back",
        "No milestone benefits",
        "Add-on cards don't get lounge access",
        "High annual fee of \u20b912,000 for the rewards offered",
        "Redemption value stuck at \u20b90.25 per point"
      ]
    },
    "slug": "icici-emeralde"
  },
  {
    "id": "icici-sapphiro",
    "name": "ICICI Sapphiro Credit Card",
    "bank": "ICICI Bank",
    "image": "/assets/cards/icici-sapphiro.png",
    "link": "https://www.icicibank.com/personal-banking/cards/credit-card/sapphiro-card",
    "fees": {
      "joining": 6500,
      "annual": 3500,
      "currency": "INR",
      "waivedOn": 600000,
      "waiverText": "Annual fee waived on spending \u20b96 lakhs in a year"
    },
    "eligibility": {
      "income": 900000,
      "age": {
        "min": 21,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 750
    },
    "rewards": {
      "type": "points",
      "name": "ICICI Reward Points",
      "baseRate": 0.005,
      "earningText": "2 RP per \u20b9100 domestic, 4 RP per \u20b9100 international, 1 RP per \u20b9100 utilities/insurance",
      "expiry": "3 years from date of earning",
      "joiningBonus": "Welcome vouchers worth \u20b913,000+ (Tata CLiQ \u20b93,000, EaseMyTrip \u20b94,000, EazyDiner Prime \u20b91,095, Da Milano \u20b95,000, Croma \u20b91,500)",
      "exclusions": "Fuel, Rent, Tax, Government Services, E-Wallet Loads",
      "calculator": {
        "tier": "premium",
        "monthlyCap": null,
        "capResetPeriod": "calendar",
        "specialLogic": "Milestone bonus: 4,000 RP at \u20b94L spend + 2,000 RP per additional \u20b91L (max 20,000 RP/year). Category caps: Utilities/Insurance \u20b980,000/month, Grocery \u20b940,000/month",
        "smartBuy": {
          "baseRewardRate": "0.5% (2 RP/₹100)",
          "pointValueTravel": 0.25,
          "pointValueVouchers": 0.25,
          "monthlyCap": 9000,
          "dailyCap": null,
          "merchants": {
            "hotels": { "multiplier": "12X", "effectiveRate": "6%", "label": "Hotels via iShop - 12X" },
            "flights": { "multiplier": "6X", "effectiveRate": "3%", "label": "Flights via iShop - 6X" },
            "vouchers": { "multiplier": "6X", "effectiveRate": "3%", "label": "Shopping Vouchers - 6X" }
          },
          "note": "Monthly cap: 9,000 Bonus Points."
        },
        "categories": {
          "travel": {
            "rate": 0.01,
            "label": "1% international, 0.5% domestic",
            "cap": null
          },
          "dining": {
            "rate": 0.005,
            "label": "0.5% domestic",
            "cap": null
          },
          "online": {
            "rate": 0.005,
            "label": "0.5% domestic",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "Excluded from rewards",
            "cap": null
          },
          "groceries": {
            "rate": 0.005,
            "label": "0.5% value back",
            "cap": 200
          },
          "utilities": {
            "rate": 0.0025,
            "label": "0.25% value back (1 RP per \u20b9100)",
            "cap": 200
          }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Redeem for travel vouchers or shopping e-vouchers",
        "options": [
          {
            "type": "E-Vouchers",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": true
          },
          {
            "type": "Product Catalogue",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": false
          },
          {
            "type": "Cashback",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "4 per quarter (requires \u20b975,000 quarterly spend)",
        "international": "2 per year via Priority Pass/DreamFolks",
        "accessType": "Priority Pass / DreamFolks"
      },
      "milestones": [
        {
          "spend": 400000,
          "benefit": "4,000 Reward Points"
        },
        {
          "spend": 500000,
          "benefit": "6,000 Reward Points (cumulative)"
        },
        {
          "spend": 600000,
          "benefit": "8,000 Reward Points (cumulative) + Annual fee waiver"
        }
      ],
      "golf": {
        "included": true,
        "text": "1 complimentary golf round/lesson per \u20b950,000 spent in previous month (max 4 per month)"
      },
      "movies": {
        "included": true,
        "text": "BOGO on BookMyShow up to \u20b9500 off on second ticket, 2 times per month"
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 4000
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5% + GST"
      }
    },
    "metadata": {
      "tags": [
        "Premium",
        "Travel",
        "Lifestyle",
        "Welcome Bonus"
      ],
      "bestFor": "Frequent travelers and lifestyle spenders who can maximize the welcome vouchers and milestone benefits",
      "rating": 4.2,
      "verdict": "A well-rounded premium card with excellent welcome benefits worth double the joining fee, ideal for those who can meet the \u20b96L spend threshold for fee waiver.",
      "pros": [
        "Welcome vouchers worth \u20b913,000+ exceed joining fee of \u20b96,500",
        "Up to 20,000 milestone reward points annually",
        "International and domestic lounge access",
        "24/7 concierge services",
        "\u20b93 crore air accident insurance",
        "Good international spend rewards (1%)"
      ],
      "cons": [
        "Low base domestic reward rate (0.5%)",
        "Domestic lounge requires \u20b975,000 quarterly spend",
        "High joining fee of \u20b96,500",
        "Forex markup of 3.5% is high"
      ]
    },
    "slug": "icici-sapphiro"
  },
  {
    "id": "icici-rubyx",
    "name": "ICICI Rubyx Credit Card",
    "bank": "ICICI Bank",
    "image": "/assets/cards/icici-rubyx.png",
    "link": "https://www.icicibank.com/personal-banking/cards/credit-card/rubyx-credit-card",
    "fees": {
      "joining": 3000,
      "annual": 2000,
      "currency": "INR",
      "waivedOn": 300000,
      "waiverText": "Annual fee waived on spending \u20b93 lakhs in an anniversary year"
    },
    "eligibility": {
      "income": 600000,
      "age": {
        "min": 21,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 720
    },
    "rewards": {
      "type": "points",
      "name": "ICICI Reward Points",
      "baseRate": 0.005,
      "earningText": "2 RP per \u20b9100 domestic, 4 RP per \u20b9100 international, 1 RP per \u20b9100 utilities/insurance",
      "expiry": "3 years from date of earning",
      "joiningBonus": "Welcome vouchers worth \u20b95,250+ (Tata CLiQ \u20b92,000, EaseMyTrip \u20b92,000, Croma \u20b91,000, EazyDiner Prime 3-month membership \u20b91,095)",
      "exclusions": "Fuel, Rent, Tax, Government Services, E-Wallet Loads",
      "calculator": {
        "tier": "premium",
        "monthlyCap": null,
        "capResetPeriod": "calendar",
        "specialLogic": "Milestone: 3,000 RP at \u20b93L spend + 1,500 RP per additional \u20b91L (max 15,000 RP/year). Category caps: Utilities/Insurance \u20b940,000/month, Grocery \u20b940,000/month",
        "smartBuy": {
          "baseRewardRate": "0.5% (2 RP/₹100)",
          "pointValueTravel": 0.25,
          "pointValueVouchers": 0.25,
          "monthlyCap": null,
          "dailyCap": null,
          "merchants": {
            "hotels": { "multiplier": "12X", "effectiveRate": "6%", "label": "Hotels via iShop - 12X" },
            "flights": { "multiplier": "6X", "effectiveRate": "3%", "label": "Flights via iShop - 6X" }
          }
        },
        "categories": {
          "travel": {
            "rate": 0.01,
            "label": "1% international, 0.5% domestic",
            "cap": null
          },
          "dining": {
            "rate": 0.005,
            "label": "0.5% domestic",
            "cap": null
          },
          "online": {
            "rate": 0.005,
            "label": "0.5% domestic",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "Excluded from rewards",
            "cap": null
          },
          "groceries": {
            "rate": 0.005,
            "label": "0.5% value back",
            "cap": 200
          },
          "utilities": {
            "rate": 0.0025,
            "label": "0.25% value back (1 RP per \u20b9100)",
            "cap": 100
          }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Redeem for e-vouchers or product catalogue",
        "options": [
          {
            "type": "E-Vouchers",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": true
          },
          {
            "type": "Product Catalogue",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": false
          },
          {
            "type": "Cashback",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "2 per quarter (requires \u20b975,000 quarterly spend)",
        "international": "None",
        "accessType": "Visa/Mastercard"
      },
      "milestones": [
        {
          "spend": 300000,
          "benefit": "3,000 Reward Points"
        },
        {
          "spend": 400000,
          "benefit": "4,500 Reward Points (cumulative)"
        },
        {
          "spend": 500000,
          "benefit": "6,000 Reward Points (cumulative)"
        }
      ],
      "golf": {
        "included": true,
        "text": "1 complimentary golf round/lesson per \u20b950,000 spent in previous month (max 2 per month)"
      },
      "movies": {
        "included": true,
        "text": "25% off (max \u20b9150) on min 2 tickets on BookMyShow & INOX, 2 times per month each"
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 4000
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5% + GST"
      }
    },
    "metadata": {
      "tags": [
        "Mid-Premium",
        "All-Rounder",
        "Movies",
        "Travel"
      ],
      "bestFor": "Mid-range spenders looking for a balance of lifestyle benefits, movie discounts, and domestic travel perks",
      "rating": 3.9,
      "verdict": "A solid mid-tier card with welcome vouchers exceeding the joining fee, ideal for those who can't meet the higher Sapphiro spend thresholds.",
      "pros": [
        "Welcome vouchers worth \u20b95,250+ exceed joining fee",
        "Up to 15,000 milestone reward points annually",
        "Airport + Railway lounge access (8 railway visits/year)",
        "Golf benefits included",
        "24/7 concierge services",
        "\u20b91 crore air accident insurance"
      ],
      "cons": [
        "Low reward rate (0.5% domestic)",
        "No international lounge access",
        "Airport lounge requires \u20b975,000 quarterly spend",
        "Forex markup of 3.5% is high"
      ]
    },
    "slug": "icici-rubyx"
  },
  {
    "id": "icici-coral",
    "name": "ICICI Coral Credit Card",
    "bank": "ICICI Bank",
    "image": "/assets/cards/icici-coral.png",
    "link": "https://www.icicibank.com/personal-banking/cards/credit-card/coral-credit-card",
    "fees": {
      "joining": 500,
      "annual": 500,
      "currency": "INR",
      "waivedOn": 150000,
      "waiverText": "Annual fee waived on spending \u20b91.5 lakhs in a year"
    },
    "eligibility": {
      "income": 300000,
      "age": {
        "min": 21,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 700
    },
    "rewards": {
      "type": "points",
      "name": "ICICI Reward Points",
      "baseRate": 0.005,
      "earningText": "2 RP per \u20b9100 on retail, 1 RP per \u20b9100 on utilities/insurance",
      "expiry": "3 years from date of earning",
      "joiningBonus": "None",
      "exclusions": "Fuel, Rent, Tax, Government Services, E-Wallet Loads",
      "calculator": {
        "tier": "entry",
        "monthlyCap": null,
        "capResetPeriod": "calendar",
        "specialLogic": "Milestone: 2,000 RP at \u20b92L spend + 1,000 RP per additional \u20b91L (max 10,000 RP/year). Category caps: Utilities/Insurance \u20b940,000/month, Grocery \u20b920,000/month",
        "smartBuy": {
          "baseRewardRate": "0.5% (2 RP/₹100)",
          "pointValueTravel": 0.25,
          "pointValueVouchers": 0.25,
          "monthlyCap": 9000,
          "dailyCap": null,
          "merchants": {
            "hotels": { "multiplier": "12X", "effectiveRate": "6%", "label": "Hotels via iShop - 12X" },
            "flights": { "multiplier": "6X", "effectiveRate": "3%", "label": "Flights via iShop - 6X" },
            "vouchers": { "multiplier": "6X", "effectiveRate": "3%", "label": "Shopping Vouchers - 6X" }
          },
          "note": "Monthly cap: 9,000 Bonus Points."
        },
        "categories": {
          "travel": {
            "rate": 0.005,
            "label": "0.5% value back",
            "cap": null
          },
          "dining": {
            "rate": 0.005,
            "label": "0.5% value back",
            "cap": null
          },
          "online": {
            "rate": 0.005,
            "label": "0.5% value back",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "Excluded from rewards",
            "cap": null
          },
          "groceries": {
            "rate": 0.005,
            "label": "0.5% value back",
            "cap": 100
          },
          "utilities": {
            "rate": 0.0025,
            "label": "0.25% value back (1 RP per \u20b9100)",
            "cap": 100
          }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Redeem for e-vouchers or cashback",
        "options": [
          {
            "type": "E-Vouchers",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": true
          },
          {
            "type": "Product Catalogue",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": false
          },
          {
            "type": "Cashback",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "1 per quarter (requires \u20b975,000 quarterly spend)",
        "international": "None",
        "accessType": "Visa/Mastercard"
      },
      "milestones": [
        {
          "spend": 200000,
          "benefit": "2,000 Reward Points"
        },
        {
          "spend": 300000,
          "benefit": "3,000 Reward Points (cumulative)"
        },
        {
          "spend": 400000,
          "benefit": "4,000 Reward Points (cumulative)"
        }
      ],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": true,
        "text": "25% off (max \u20b9100) on min 2 tickets on BookMyShow & INOX, 2 times per month"
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 4000
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5% + GST"
      }
    },
    "metadata": {
      "tags": [
        "Entry Level",
        "Low Fee",
        "Movies",
        "Beginner"
      ],
      "bestFor": "Credit card beginners and low-to-moderate spenders who want basic benefits at a low annual fee",
      "rating": 3.5,
      "verdict": "A good entry-level card for building credit history with essential benefits like movie discounts and lounge access at an affordable \u20b9500 annual fee.",
      "pros": [
        "Low annual fee of just \u20b9500",
        "Easy fee waiver threshold (\u20b91.5L)",
        "Up to 10,000 milestone reward points annually",
        "Movie discounts on BookMyShow & INOX",
        "Railway lounge access (4 per year)",
        "iShop accelerated rewards available"
      ],
      "cons": [
        "Low reward rate (0.5%)",
        "No international lounge access",
        "Airport lounge requires \u20b975,000 quarterly spend",
        "No welcome bonus",
        "No golf benefits",
        "Only 1 airport lounge per quarter"
      ]
    },
    "slug": "icici-coral"
  },
  {
    "id": "icici-manchester-united-signature",
    "name": "ICICI Manchester United Signature Credit Card",
    "bank": "ICICI Bank",
    "image": "/assets/cards/icici-manchester-united-signature.png",
    "link": "https://www.icicibank.com/personal-banking/cards/credit-card/manchester-credit-card/signature-card",
    "fees": {
      "joining": 2499,
      "annual": 2499,
      "currency": "INR",
      "waivedOn": 250000,
      "waiverText": "Annual fee waived on spending \u20b92.5 lakhs in a year"
    },
    "eligibility": {
      "income": 600000,
      "age": {
        "min": 21,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 720
    },
    "rewards": {
      "type": "points",
      "name": "ICICI Reward Points",
      "baseRate": 0.0075,
      "earningText": "3 RP per \u20b9100 domestic, 4 RP per \u20b9100 international, 5 RP per \u20b9100 on Man Utd match days",
      "expiry": "3 years from date of earning",
      "joiningBonus": "Manchester United branded holdall (duffel bag) and football",
      "exclusions": "Fuel, Rent, Tax, Government Services, E-Wallet Loads",
      "calculator": {
        "tier": "co-branded",
        "monthlyCap": null,
        "capResetPeriod": "calendar",
        "specialLogic": "5 RP per \u20b9100 on Manchester United match days (1.25% value), 4 RP per \u20b9100 international (1%), 3 RP per \u20b9100 domestic (0.75%)",
        "smartBuy": {
          "baseRewardRate": "0.75% (3 RP/₹100)",
          "pointValueTravel": 0.25,
          "pointValueVouchers": 0.25,
          "monthlyCap": 9000,
          "dailyCap": null,
          "merchants": {
            "hotels": { "multiplier": "12X", "effectiveRate": "9%", "label": "Hotels via iShop - 12X" },
            "flights": { "multiplier": "6X", "effectiveRate": "4.5%", "label": "Flights via iShop - 6X" },
            "vouchers": { "multiplier": "6X", "effectiveRate": "4.5%", "label": "Shopping Vouchers - 6X" }
          },
          "note": "Monthly cap: 9,000 Bonus Points. Match days earn 5RP/100."
        },
        "categories": {
          "travel": {
            "rate": 0.01,
            "label": "1% international",
            "cap": null
          },
          "dining": {
            "rate": 0.0075,
            "label": "0.75% domestic",
            "cap": null
          },
          "online": {
            "rate": 0.0075,
            "label": "0.75% domestic",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "Excluded from rewards",
            "cap": null
          },
          "groceries": {
            "rate": 0.0075,
            "label": "0.75% value back",
            "cap": null
          },
          "utilities": {
            "rate": 0.0025,
            "label": "0.25% value back",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Redeem for e-vouchers or Manchester United merchandise",
        "options": [
          {
            "type": "E-Vouchers",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": true
          },
          {
            "type": "Product Catalogue",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": false
          },
          {
            "type": "Cashback",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "2 per quarter (requires \u20b975,000 quarterly spend)",
        "international": "None",
        "accessType": "Visa"
      },
      "milestones": [
        {
          "spend": 0,
          "benefit": "Top monthly spender: Signed Man Utd jersey + match ticket"
        },
        {
          "spend": 0,
          "benefit": "Top 70 spenders: Man Utd branded shirt monthly"
        },
        {
          "spend": 0,
          "benefit": "Top 18 spenders: Fully paid Manchester United Experience (stadium tour, training session, megastore visit)"
        }
      ],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": true,
        "text": "25% off (max \u20b9150) on min 2 tickets on BookMyShow & INOX, 2 times per month"
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 4000
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5% + GST"
      }
    },
    "metadata": {
      "tags": [
        "Co-branded",
        "Sports",
        "Manchester United",
        "Football"
      ],
      "bestFor": "Die-hard Manchester United fans who want exclusive club merchandise and once-in-a-lifetime experiences",
      "rating": 3.7,
      "verdict": "A must-have for Manchester United fans with unique club experiences and merchandise, but average for non-fans due to modest reward rates.",
      "pros": [
        "Exclusive Man Utd merchandise as welcome gift",
        "Chance to win fully-paid Manchester United Experience",
        "Higher rewards on match days (1.25%)",
        "10-20% discounts at Old Trafford and Man Utd megastore",
        "Top spenders get signed jerseys and match tickets",
        "Better base reward rate (0.75%) than Coral"
      ],
      "cons": [
        "Benefits primarily appeal to Man Utd fans only",
        "Low base reward rate for non-fans",
        "No international lounge access",
        "No golf benefits",
        "Competition-based rewards favor only top spenders nationwide"
      ]
    },
    "slug": "icici-manchester-united-signature"
  },
  {
    "id": "icici-platinum-chip",
    "name": "ICICI Platinum Chip Credit Card",
    "bank": "ICICI Bank",
    "image": "/assets/cards/icici-platinum-chip.png",
    "link": "https://www.icicibank.com/personal-banking/cards/credit-card/platinum-chip-credit-card",
    "fees": {
      "joining": 0,
      "annual": 0,
      "currency": "INR",
      "waivedOn": null,
      "waiverText": "Lifetime free - no joining or annual fee"
    },
    "eligibility": {
      "income": 240000,
      "age": {
        "min": 21,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 650
    },
    "rewards": {
      "type": "points",
      "name": "ICICI Reward Points",
      "baseRate": 0.005,
      "earningText": "2 RP per \u20b9100 on retail, 1 RP per \u20b9100 on utilities/insurance",
      "expiry": "3 years from date of earning",
      "joiningBonus": "None",
      "exclusions": "Fuel, Rent, Tax, Government Services, E-Wallet Loads",
      "calculator": {
        "tier": "entry",
        "monthlyCap": null,
        "capResetPeriod": "calendar",
        "specialLogic": "Category caps: Utilities \u20b940,000/month, Insurance \u20b940,000/month, Grocery \u20b920,000/month. No milestone benefits",
        "categories": {
          "travel": {
            "rate": 0.005,
            "label": "0.5% value back",
            "cap": null
          },
          "dining": {
            "rate": 0.005,
            "label": "0.5% value back",
            "cap": null
          },
          "online": {
            "rate": 0.005,
            "label": "0.5% value back",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "Excluded from rewards",
            "cap": null
          },
          "groceries": {
            "rate": 0.005,
            "label": "0.5% value back",
            "cap": 100
          },
          "utilities": {
            "rate": 0.0025,
            "label": "0.25% value back (1 RP per \u20b9100)",
            "cap": 100
          }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Redeem for e-vouchers or cashback",
        "options": [
          {
            "type": "E-Vouchers",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": true
          },
          {
            "type": "Product Catalogue",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": false
          },
          {
            "type": "Cashback",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "None",
        "international": "None",
        "accessType": "None"
      },
      "milestones": [],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 4000
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5% + GST"
      }
    },
    "metadata": {
      "tags": [
        "Entry Level",
        "Lifetime Free",
        "Beginner",
        "Credit Building",
        "Zero Fee"
      ],
      "bestFor": "First-time credit card users looking to build credit history with absolutely zero annual fee",
      "rating": 3.2,
      "verdict": "The best option for credit beginners - a truly lifetime free card with basic rewards, EMV chip security, and dining discounts, though lacking premium benefits.",
      "pros": [
        "Lifetime free - zero joining and annual fee forever",
        "Easiest eligibility criteria among ICICI cards",
        "Good for building credit history",
        "EMV chip security + PIN protection",
        "Fuel surcharge waiver at HPCL",
        "Up to 15% dining discounts via Culinary Treats",
        "iShop accelerated rewards available"
      ],
      "cons": [
        "No lounge access",
        "No movie benefits",
        "No milestone bonuses",
        "Low reward rate (0.5%)",
        "No welcome bonus",
        "Minimal lifestyle benefits"
      ]
    },
    "slug": "icici-platinum-chip"
  },
  {
    "id": "icici-makemytrip-signature",
    "name": "MakeMyTrip ICICI Bank Signature Credit Card",
    "bank": "ICICI Bank",
    "image": "/assets/cards/icici-mmt-signature.png",
    "link": "https://www.icicibank.com/personal-banking/cards/credit-card/makemytrip-signature-credit-card",
    "fees": {
      "joining": 999,
      "annual": 999,
      "currency": "INR",
      "waivedOn": 300000,
      "waiverText": "Waived on ₹3 Lakh spend"
    },
    "eligibility": {
      "income": 20000, // Salaried monthly
      "age": { "min": 21, "max": 60 },
      "type": "Salaried/Self-Employed",
      "creditScore": 700
    },
    "rewards": {
      "type": "points",
      "name": "My Cash",
      "baseRate": 0.01, // 1%
      "earningText": "1.25% - 6% My Cash (1 My Cash = ₹1)",
      "expiry": "Never Expires",
      "joiningBonus": "₹1,500 MMT Voucher + MMTBLACK Gold Membership",
      "exclusions": "Fuel, Rent, EMI, Cash Withdrawals",
      "calculator": {
        "tier": "mid-range",
        "monthlyCap": null,
        "monthlyCap": null,
        "smartBuy": {
          "baseRewardRate": "Platform Spends",
          "monthlyCap": 1100,
          "merchants": {
            "hotels": { "multiplier": "6%", "effectiveRate": "6%", "label": "Hotels on MMT (6%)" },
            "flights": { "multiplier": "3%", "effectiveRate": "3%", "label": "Flights on MMT (3%)" },
            "holiday": { "multiplier": "3%", "effectiveRate": "3%", "label": "Holiday Packages (3%)" },
            "ishop": { "multiplier": "4%", "effectiveRate": "4%", "label": "iShop Portal (4%)" }
          }
        },
        "categories": {
          "travel": { "rate": 0.0125, "label": "1.25% on other travel" },
          "dining": { "rate": 0.0125, "label": "1.25% (2 My Cash/₹200)" },
          "international": { "rate": 0.015, "label": "1.5% on International" }
        }
      },
      "redemption": {
        "baseValue": 1,
        "bestOption": "MMT Bookings (1:1)",
        "options": [
          { "type": "Travel", "value": 1, "desc": "100% redemption on MakeMyTrip" }
        ]
      }
    },
    "features": [
      "8 Domestic Lounge Access per year (2 per quarter)",
      "1 International Lounge Access per year (Priority Pass)",
      "Buy 1 Get 1 on BookMyShow (up to ₹150 discount)",
      "Lowest Forex Markup: 0.99%"
    ],
    "metadata": {
      "tags": ["Travel", "Hotels", "Co-branded", "Low Forex"],
      "verdict": "A must-have for frequent MakeMyTrip users, especially for hotel bookings (6% return). The 0.99% forex markup is a standout feature for international travelers.",
      "pros": ["6% Reward Rate on Hotels", "Unique 0.99% Forex Markup", "Lifetime Validity of Points", "Complimentary MMTBLACK Membership"],
      "cons": ["Rewards usable only on MMT", "Fee waiver threshold is high (₹3L)"]
    },
    "slug": "icici-makemytrip-signature"
  },
  {
    "id": "icici-hpcl-super-saver",
    "name": "ICICI Bank HPCL Super Saver Credit Card",
    "bank": "ICICI Bank",
    "image": "/assets/cards/icici-hpcl-super-saver.png",
    "link": "https://www.icicibank.com/personal-banking/cards/credit-card/hpcl-super-saver-credit-card",
    "fees": {
      "joining": 500,
      "annual": 500,
      "currency": "INR",
      "waivedOn": 150000,
      "waiverText": "Waived on ₹1.5 Lakh spend"
    },
    "eligibility": {
      "income": 15000,
      "age": { "min": 21, "max": 60 },
      "type": "Salaried/Self-Employed",
      "creditScore": 700
    },
    "rewards": {
      "type": "points",
      "name": "Reward Points",
      "baseRate": 0.005,
      "earningText": "2 RP per ₹100 (0.5%)",
      "expiry": "2 years",
      "joiningBonus": "2000 Bonus RP + ₹100 Cashback on HP Pay",
      "exclusions": "Rent, EMI, Fuel (earns cashback instead)",
      "calculator": {
        "tier": "entry",
        "monthlyCap": null,
        "smartBuy": {
          "baseRewardRate": "HP Pay App",
          "monthlyCap": 300,
          "merchants": {
            "fuel": { "multiplier": "5%", "effectiveRate": "5%", "label": "HPCL Pumps (4% Cashback + 1% Surcharge)" },
            "hppay": { "multiplier": "1.5%", "effectiveRate": "1.5%", "label": "HP Pay App Extra (1.5%)" }
          }
        },
        "categories": {
          "utilities": { "rate": 0.05, "label": "5% (20 RP/₹100) on Utilities/Departmental", "cap": 100 },
          "fuel": { "rate": 0.04, "label": "4% Cashback at HPCL" }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Fuel/Cashback (1 RP = ₹0.25)",
        "options": [
          { "type": "Cashback", "value": 0.25, "desc": "Statement Credit" }
        ]
      }
    },
    "features": [
      "5% Savings on Fuel at HPCL",
      "24x7 Roadside Assistance included",
      "4 Domestic Lounge Access per year (min spend ₹5000 prev quarter)",
      "25% discount on BookMyShow/Inox (up to ₹100)"
    ],
    "metadata": {
      "tags": ["Fuel", "Cashback", "Roadside Assistance"],
      "verdict": "Great entry-level card for HPCL fuel users with the rare benefit of including 24x7 Roadside Assistance.",
      "pros": ["5% Return on Fuel", "Rewards on Utilities & Groceries", "Roadside Assistance Included", "Low Annual Fee"],
      "cons": ["Strict caps on reward earning", "Lounge access spend-linked"]
    },
    "slug": "icici-hpcl-super-saver"
  },
  {
    "id": "adani-one-icici-signature",
    "name": "Adani One ICICI Bank Signature Credit Card",
    "bank": "ICICI Bank",
    "image": "/assets/cards/adani-one-icici-signature.png",
    "link": "https://www.icicibank.com/personal-banking/cards/credit-card/adani-one-icici-bank-signature-credit-card",
    "fees": {
      "joining": 5000,
      "annual": 5000,
      "currency": "INR",
      "waivedOn": 600000,
      "waiverText": "Waived on ₹6 Lakh spend"
    },
    "eligibility": {
      "income": 50000, // Est based on premium tier
      "age": { "min": 21, "max": 60 },
      "type": "Salaried/Self-Employed",
      "creditScore": 750
    },
    "rewards": {
      "type": "points",
      "name": "Adani Reward Points",
      "baseRate": 0.015,
      "earningText": "1.5% - 7% Adani Points",
      "expiry": "Statement Cycle",
      "joiningBonus": "₹9,000 worth of Benefits (Flights/Hotel Vouchers)",
      "exclusions": "Fuel, Rent, EMI",
      "calculator": {
        "tier": "premium",
        "monthlyCap": null,
        "smartBuy": {
          "baseRewardRate": "Adani Ecosystem",
          "monthlyCap": null,
          "merchants": {
            "flight": { "multiplier": "7%", "effectiveRate": "7%", "label": "Adani One Ecosystem (7%)" },
            "international": { "multiplier": "2%", "effectiveRate": "2%", "label": "International Spends (2%)" }
          }
        },
        "categories": {
          "travel": { "rate": 0.07, "label": "7% on Adani One (Flights/Traiman)" },
          "utilities": { "rate": 0.005, "label": "0.5% on Utilities" }
        }
      },
      "redemption": {
        "baseValue": 1,
        "bestOption": "Adani One Booking (1 RP = ₹1)",
        "options": [
          { "type": "Travel", "value": 1, "desc": "100% redemption on Adani One" }
        ]
      }
    },
    "features": [
      "Pranaam Meet & Greet Service (2 per year) - Unique Benefit",
      "16 Domestic Lounge Access (4 per quarter)",
      "2 International Lounge Access per year",
      "Buy 1 Get 1 on Movies (up to ₹500/month)"
    ],
    "metadata": {
      "tags": ["Travel", "Airport Services", "Co-branded", "Premium"],
      "verdict": "A niche but powerful card for frequent flyers using Adani airports (Mumbai, Ahmedabad, etc.). The Pranaam Meet & Greet benefit alone can justify the fee for luxury travelers.",
      "pros": ["7% Rewards on Adani Ecosystem", "Pranaam Meet & Greet Service", "16 Lounge Visits", "Valet Parking & Porter Service"],
      "cons": ["High Annual Fee ₹5000", "Rewards locked to Adani ecosystem"]
    },
    "slug": "adani-one-icici-signature"
  },
  {
    "id": "adani-one-icici-platinum",
    "name": "Adani One ICICI Bank Platinum Credit Card",
    "bank": "ICICI Bank",
    "image": "/assets/cards/adani-one-icici-platinum.png",
    "link": "https://www.icicibank.com/personal-banking/cards/credit-card/adani-one-icici-bank-platinum-credit-card",
    "fees": {
      "joining": 750,
      "annual": 750,
      "currency": "INR",
      "waivedOn": 300000,
      "waiverText": "Waived on ₹3 Lakh spend"
    },
    "eligibility": {
      "income": 25000,
      "age": { "min": 21, "max": 60 },
      "type": "Salaried/Self-Employed",
      "creditScore": 700
    },
    "rewards": {
      "type": "points",
      "name": "Adani Reward Points",
      "baseRate": 0.01,
      "earningText": "1% - 3% Adani Points",
      "expiry": "Statement Cycle",
      "joiningBonus": "₹5,000 worth of Vouchers",
      "exclusions": "Fuel, Rent, EMI",
      "calculator": {
        "tier": "entry",
        "monthlyCap": null,
        "smartBuy": {
          "baseRewardRate": "Adani Ecosystem",
          "monthlyCap": null,
          "merchants": {
            "flight": { "multiplier": "3%", "effectiveRate": "3%", "label": "Adani One Ecosystem (3%)" },
            "international": { "multiplier": "1.5%", "effectiveRate": "1.5%", "label": "International Spends (1.5%)" }
          }
        },
        "categories": {
          "travel": { "rate": 0.03, "label": "3% on Adani One" }
        }
      },
      "redemption": {
        "baseValue": 1,
        "bestOption": "Adani One Booking (1:1)",
        "options": [
          { "type": "Travel", "value": 1, "desc": "Redeem on Adani One" }
        ]
      }
    },
    "features": [
      "8 Domestic Lounge Access per year (No spend condition)",
      "Benefits worth ₹5000 on joining",
      "1% Fuel Surcharge Waiver"
    ],
    "metadata": {
      "tags": ["Travel", "Entry Level", "Co-branded"],
      "verdict": "A solid entry-level travel card. Using the welcome vouchers makes it effectively free for the first few years.",
      "pros": ["Welcome Benefits > Fee", "3% Return on Adani One", "Lounge Access without spend criteria"],
      "cons": ["No International Lounge", "Forex Markup 3.5%"]
    },
    "slug": "adani-one-icici-platinum"
  },
  {
    "id": "icici-times-black",
    "name": "Times Black ICICI Bank Credit Card",
    "bank": "ICICI Bank",
    "image": "/assets/cards/icici-times-black.png",
    "link": "https://www.icicibank.com/personal-banking/cards/credit-card/times-black-credit-card",
    "fees": {
      "joining": 20000,
      "annual": 20000,
      "currency": "INR",
      "waivedOn": 2500000,
      "waiverText": "Waived on ₹25 Lakh spend"
    },
    "eligibility": {
      "income": 200000,
      "age": { "min": 21, "max": 60 },
      "type": "Salaried/Self-Employed",
      "creditScore": 750
    },
    "rewards": {
      "type": "points",
      "name": "Times Points",
      "baseRate": 0.02, // 2%
      "earningText": "2% Base - up to 24% on iShop",
      "expiry": "2 Years",
      "joiningBonus": "₹25,000+ Benefits (Luxe Stays, Visa Services)",
      "exclusions": "Fuel, Rent, EMI",
      "calculator": {
        "tier": "super-premium",
        "monthlyCap": null,
        "smartBuy": {
          "baseRewardRate": "iShop Portal",
          "monthlyCap": 15000,
          "merchants": {
            "hotels": { "multiplier": "24%", "effectiveRate": "24%", "label": "iShop Hotels (24%)" },
            "flights": { "multiplier": "12%", "effectiveRate": "12%", "label": "iShop Flights (12%)" },
            "vouchers": { "multiplier": "12%", "effectiveRate": "12%", "label": "iShop Vouchers (12%)" }
          }
        },
        "categories": {
          "dining": { "rate": 0.03, "label": "Discounts at Premium Restaurants (The Quorum)" },
          "utilities": { "rate": 0.02, "label": "2% on Utilities/Govt (Unique)" }
        }
      },
      "redemption": {
        "baseValue": 1,
        "bestOption": "iShop Travel/Vouchers (1:1)",
        "options": [
          { "type": "Travel", "value": 1, "desc": "100% redemption on iShop" },
          { "type": "Cashback", "value": 0.40, "desc": "Statement Credit" }
        ]
      }
    },
    "features": [
      "Unlimited Domestic & International Lounge Access",
      "Metal Card crafted from Times printing plates",
      "Complimentary The Quorum Club Access",
      "Helicopter Transfer (Bangalore) on milestones"
    ],
    "metadata": {
      "tags": ["Super Premium", "Metal", "Lifestyle", "Unlimited Lounge"],
      "verdict": "A lifestyle powerhouse for those who value experiences (Quorum Club, Events) over pure ROI. The 24% return on hotels via iShop is industry-leading.",
      "pros": ["24% Rewards on Hotels", "Unlimited Lounges", "Unique Lifestyle Benefits (Quorum, Visa Services)", "Rewards on Utilities"],
      "cons": ["High Fee ₹20,000", "Base rate (2%) lower than Infinia (3.3%)"]
    },
    "slug": "icici-times-black"
  },
  {
    "id": "amex-platinum-charge",
    "name": "American Express Platinum Charge Card",
    "bank": "American Express",
    "image": "/assets/cards/amex-platinum-charge.png",
    "link": "https://www.americanexpress.com/in/charge-cards/platinum-card/",
    "fees": {
      "joining": 66000,
      "annual": 66000,
      "currency": "INR",
      "waivedOn": null,
      "waiverText": "No fee waiver available. Renewal benefit of \u20b935,000 voucher on spending \u20b920 Lakhs in membership year."
    },
    "eligibility": {
      "income": 2500000,
      "age": {
        "min": 18,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 750,
      "notes": "\u20b915 LPA for Self-Employed. Must have good credit history with no defaults."
    },
    "rewards": {
      "type": "points",
      "name": "Membership Rewards Points",
      "baseRate": 0.00625,
      "earningText": "1 MR point per \u20b940 spent. At base redemption (\u20b90.25/point), this equals 0.625% return.",
      "expiry": "No Expiry (while card is active)",
      "joiningBonus": "Taj vouchers worth \u20b945,000 on spending \u20b950,000 within first 2 months of card membership and payment of annual fee",
      "exclusions": "Fuel, Insurance, Utilities, Cash Transactions",
      "calculator": {
        "tier": "super-premium",
        "monthlyCap": null,
        "capResetPeriod": "calendar",
        "specialLogic": "3X MR points on international spends. 5X MR points via Reward Multiplier on 50+ brands. Up to 20X via Rewards Xcelerator on luxury brands.",
        "portals": [
          {
            "name": "Reward Multiplier",
            "rate": 0.03125,
            "label": "5X via Reward Multiplier",
            "categories": [
              "shopping",
              "travel"
            ]
          }
        ],
        "categories": {
          "travel": {
            "rate": 0.01875,
            "label": "3X on International",
            "cap": null
          },
          "dining": {
            "rate": 0.00625,
            "label": "1 MR/\u20b940",
            "cap": null
          },
          "online": {
            "rate": 0.03125,
            "label": "5X via Reward Multiplier",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No rewards",
            "cap": null
          },
          "groceries": {
            "rate": 0.00625,
            "label": "1 MR/\u20b940",
            "cap": null
          },
          "utilities": {
            "rate": 0,
            "label": "No rewards",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Transfer to Marriott Bonvoy (1:1) for hotel redemptions. Value can reach \u20b90.75-1.0 per point with good hotel redemptions.",
        "options": [
          {
            "type": "Statement Credit",
            "value": 0.25,
            "desc": "1 MR = \u20b90.25 via Pay with Points",
            "recommended": false
          },
          {
            "type": "Marriott Bonvoy",
            "value": 1,
            "desc": "1 MR = 1 Marriott Bonvoy point (value \u20b90.75-1.0)",
            "recommended": true
          },
          {
            "type": "Taj Vouchers",
            "value": 0.5,
            "desc": "24K MR = \u20b912,000 Taj voucher",
            "recommended": true
          },
          {
            "type": "Airline Partners",
            "value": 0.5,
            "desc": "Transfer to Emirates, Singapore, BA, etc.",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "Unlimited (affiliated lounges)",
        "international": "Unlimited (Amex Global Lounge Collection including Centurion, Priority Pass, Plaza Premium, etc.)",
        "accessType": "Amex Centurion Lounges + Priority Pass + Plaza Premium + Delta + Escape"
      },
      "milestones": [
        {
          "spend": 5000000,
          "benefit": "\u20b935,000 voucher (Taj/Luxe/Postcard) on \u20b920L spend + renewal fee payment"
        }
      ],
      "golf": {
        "included": true,
        "text": "Unlimited complimentary rounds at premium golf courses in India and select international courses"
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "0%",
        "cap": 0,
        "text": "No fuel benefits - fuel excluded from rewards"
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5% + GST"
      },
      "hotelStatus": [
        "Marriott Bonvoy Gold Elite",
        "Hilton Honors Gold",
        "Radisson Rewards Premium",
        "Taj Epicure Plus",
        "Accor Plus Traveller",
        "The Postcard Sunshine Club Platinum",
        "I Prefer Titanium"
      ],
      "concierge": "24x7 Platinum Concierge for travel, dining, lifestyle assistance",
      "insurance": {
        "airAccident": 50000000,
        "overseasMedical": 4200000,
        "purchaseProtection": true
      },
      "digitalSubscriptions": "Ace by Times Prime (WSJ+Mint, Vogue, Conde Nast Traveler, SonyLiv Premium, Disney+ Hotstar)"
    },
    "metadata": {
      "tags": [
        "Super Premium",
        "Metal Card",
        "Charge Card",
        "Lifestyle",
        "Travel",
        "Luxury"
      ],
      "bestFor": "High-net-worth individuals seeking premium lifestyle benefits, hotel elite status, and unlimited lounge access",
      "rating": 4.5,
      "verdict": "India's most prestigious card with unmatched hotel memberships and lifestyle benefits. The \u20b977,880 (incl. GST) annual fee is justified if you use the hotel status and lounge access extensively.",
      "pros": [
        "Unlimited global lounge access including Centurion Lounges",
        "7 complimentary hotel elite tier memberships",
        "Metal card with premium design",
        "3X rewards on international spends",
        "Excellent concierge service",
        "Points never expire"
      ],
      "cons": [
        "Very high annual fee (\u20b966,000 + GST)",
        "Low base reward rate (1 point per \u20b940)",
        "No fee waiver option",
        "No rewards on fuel, utilities, insurance",
        "Limited acceptance compared to Visa/MC"
      ]
    },
    "slug": "amex-platinum-charge"
  },
  {
    "id": "amex-gold-charge",
    "name": "American Express Gold Charge Card",
    "bank": "American Express",
    "image": "/assets/cards/amex-gold-charge.png",
    "link": "https://www.americanexpress.com/in/charge-cards/gold-card/",
    "fees": {
      "joining": 1000,
      "annual": 4500,
      "currency": "INR",
      "waivedOn": null,
      "waiverText": "Renewal fee may be waived 50-100% on request based on annual spending (typically \u20b92L+ spend). First year fee \u20b91,000, second year onwards \u20b94,500."
    },
    "eligibility": {
      "income": 600000,
      "age": {
        "min": 18,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 750,
      "notes": "Self-employed must have 12+ months trading history. Savings/current account required with Indian/multinational bank."
    },
    "rewards": {
      "type": "points",
      "name": "Membership Rewards Points",
      "baseRate": 0.005,
      "earningText": "1 MR point per \u20b950 spent including utilities (capped at 10,000 points/month on utilities). Base value at \u20b90.25/point = 0.5% return.",
      "expiry": "No Expiry (while card is active)",
      "joiningBonus": "4,000 MR points on spending \u20b910,000 within 90 days of card membership + annual fee payment",
      "exclusions": "Insurance, Cash Transactions. Fuel excluded from June 12, 2025.",
      "calculator": {
        "tier": "premium",
        "monthlyCap": 10000,
        "capResetPeriod": "calendar",
        "specialLogic": "1,000 bonus MR points on completing 6 transactions of \u20b91,000+ each in a calendar month. 5X MR points via Reward Multiplier.",
        "portals": [
          {
            "name": "Reward Multiplier",
            "rate": 0.025,
            "label": "5X via Reward Multiplier",
            "categories": [
              "shopping",
              "travel"
            ]
          }
        ],
        "categories": {
          "travel": {
            "rate": 0.005,
            "label": "1 MR/\u20b950",
            "cap": null
          },
          "dining": {
            "rate": 0.005,
            "label": "1 MR/\u20b950 + 20% off at partner restaurants",
            "cap": null
          },
          "online": {
            "rate": 0.025,
            "label": "5X via Reward Multiplier",
            "cap": null
          },
          "fuel": {
            "rate": 0.005,
            "label": "1 MR/\u20b950 (till June 2025, capped at 5,000 pts/month)",
            "cap": 5000
          },
          "groceries": {
            "rate": 0.005,
            "label": "1 MR/\u20b950",
            "cap": null
          },
          "utilities": {
            "rate": 0.005,
            "label": "1 MR/\u20b950 (capped at 10,000 pts/month)",
            "cap": 10000
          }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Redeem for 18K/24K Gold Collection vouchers. Taj voucher at 24K gives \u20b90.58/point value.",
        "options": [
          {
            "type": "Statement Credit",
            "value": 0.25,
            "desc": "1 MR = \u20b90.25",
            "recommended": false
          },
          {
            "type": "24K Gold Collection - Taj",
            "value": 0.58,
            "desc": "24,000 MR = \u20b914,000 Taj voucher",
            "recommended": true
          },
          {
            "type": "24K Gold Collection - Amazon",
            "value": 0.33,
            "desc": "24,000 MR = \u20b98,000 Amazon voucher",
            "recommended": false
          },
          {
            "type": "18K Gold Collection - Taj",
            "value": 0.5,
            "desc": "18,000 MR = \u20b99,000 Taj voucher",
            "recommended": true
          },
          {
            "type": "Marriott Bonvoy",
            "value": 0.75,
            "desc": "1 MR = 1 Marriott point",
            "recommended": true
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "Not included",
        "international": "Not included",
        "accessType": "None"
      },
      "milestones": [
        {
          "spend": 6000,
          "benefit": "1,000 bonus MR points on 6 transactions of \u20b91,000+ each month"
        },
        {
          "spend": 0,
          "benefit": "5,000 MR points on first renewal with annual fee payment"
        }
      ],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "0%",
        "cap": 0,
        "text": "No fuel surcharge waiver"
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5% + GST"
      },
      "hotelBenefits": "The Hotel Collection: $100 hotel credit + room upgrade on 2+ night stays at 400+ hotels worldwide (Hilton, Hyatt, IHG)"
    },
    "metadata": {
      "tags": [
        "Charge Card",
        "Rewards",
        "Utilities",
        "Gold Collection",
        "No Preset Limit"
      ],
      "bestFor": "Those who want MR points on utility bills and fuel, with iconic gold card design and no preset spending limit",
      "rating": 4,
      "verdict": "One of the few cards in India that rewards utility and fuel spends. The iconic gold design and 18K/24K Gold Collection make it attractive for Amex enthusiasts.",
      "pros": [
        "Earns MR points on utility bills (capped)",
        "Earns MR points on fuel (till June 2025)",
        "No preset spending limit",
        "Monthly bonus of 1,000 MR on 6x \u20b91,000 transactions",
        "Iconic gold card design",
        "18K/24K Gold Collection redemptions",
        "Low first year fee (\u20b91,000)"
      ],
      "cons": [
        "No airport lounge access",
        "Renewal fee of \u20b94,500 (waiver needs negotiation)",
        "Caps on utility and fuel rewards",
        "Limited acceptance compared to Visa/MC",
        "No travel benefits"
      ]
    },
    "slug": "amex-gold-charge"
  },
  {
    "id": "amex-mrcc",
    "name": "American Express Membership Rewards Credit Card",
    "bank": "American Express",
    "image": "/assets/cards/amex-mrcc.png",
    "link": "https://www.americanexpress.com/in/credit-cards/membership-rewards-card/",
    "fees": {
      "joining": 1000,
      "annual": 4500,
      "currency": "INR",
      "waivedOn": 150000,
      "waiverText": "100% annual fee waiver on \u20b91.5L spend. 50% waiver on \u20b990K-\u20b91.5L spend. First year fee \u20b91,000 (free on referral)."
    },
    "eligibility": {
      "income": 450000,
      "age": {
        "min": 18,
        "max": 70
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 700,
      "notes": "Monthly income of \u20b935,000+ for salaried. Self-employed need ITR of \u20b94.5L+."
    },
    "rewards": {
      "type": "points",
      "name": "Membership Rewards Points",
      "baseRate": 0.005,
      "earningText": "1 MR point per \u20b950 spent. Base value at \u20b90.25/point = 0.5% return. Can reach 5-7% with milestones.",
      "expiry": "No Expiry (while card is active)",
      "joiningBonus": "4,000 MR points on spending \u20b915,000 within 90 days + annual fee payment",
      "exclusions": "Fuel, Utilities, Insurance, Cash Transactions, EMI at POS",
      "calculator": {
        "tier": "entry",
        "monthlyCap": null,
        "capResetPeriod": "calendar",
        "specialLogic": "1,000 bonus MR on 4 transactions of \u20b91,500+ each month. Additional 1,000 bonus MR on spending \u20b920,000+ in a month. 5X via Reward Multiplier.",
        "portals": [
          {
            "name": "Reward Multiplier",
            "rate": 0.025,
            "label": "5X via Reward Multiplier",
            "categories": [
              "shopping",
              "travel"
            ]
          }
        ],
        "categories": {
          "travel": {
            "rate": 0.005,
            "label": "1 MR/\u20b950",
            "cap": null
          },
          "dining": {
            "rate": 0.005,
            "label": "1 MR/\u20b950",
            "cap": null
          },
          "online": {
            "rate": 0.025,
            "label": "5X via Reward Multiplier",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No rewards (counts for milestones)",
            "cap": null
          },
          "groceries": {
            "rate": 0.005,
            "label": "1 MR/\u20b950",
            "cap": null
          },
          "utilities": {
            "rate": 0,
            "label": "No rewards (counts for milestones)",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "18K/24K Gold Collection vouchers or Marriott Bonvoy transfer for best value.",
        "options": [
          {
            "type": "Statement Credit",
            "value": 0.25,
            "desc": "1 MR = \u20b90.25",
            "recommended": false
          },
          {
            "type": "24K Gold Collection - Taj",
            "value": 0.58,
            "desc": "24,000 MR = \u20b914,000 Taj voucher",
            "recommended": true
          },
          {
            "type": "24K Gold Collection - Tanishq",
            "value": 0.42,
            "desc": "24,000 MR = \u20b910,000 Tanishq voucher",
            "recommended": false
          },
          {
            "type": "18K Gold Collection - Amazon",
            "value": 0.33,
            "desc": "18,000 MR = \u20b96,000 Amazon voucher",
            "recommended": false
          },
          {
            "type": "Marriott Bonvoy",
            "value": 0.75,
            "desc": "1 MR = 1 Marriott point",
            "recommended": true
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "Not included",
        "international": "Not included",
        "accessType": "None"
      },
      "milestones": [
        {
          "spend": 6000,
          "benefit": "1,000 bonus MR points on 4 transactions of \u20b91,500+ each month"
        },
        {
          "spend": 20000,
          "benefit": "Additional 1,000 bonus MR points on spending \u20b920,000+ in a calendar month"
        },
        {
          "spend": 0,
          "benefit": "5,000 MR points on first renewal with annual fee payment"
        }
      ],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "0%",
        "cap": 0,
        "text": "0% convenience fee at HPCL for transactions under \u20b95,000"
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5% + GST"
      }
    },
    "metadata": {
      "tags": [
        "Entry Level",
        "Rewards",
        "Milestones",
        "Gold Collection",
        "Fee Waiver"
      ],
      "bestFor": "First-time Amex users who can hit monthly milestones for high effective reward rate. Part of popular Amex Trifecta strategy.",
      "rating": 4.2,
      "verdict": "Best entry-level Amex card with easy milestone bonuses. Spending \u20b920K/month with 4x \u20b91,500 transactions yields 2,400 bonus MR points - excellent for its fee bracket.",
      "pros": [
        "Easy monthly milestones (4x \u20b91,500 = 1,000 MR)",
        "Additional 1,000 MR on \u20b920K monthly spend",
        "100% fee waiver on \u20b91.5L annual spend",
        "18K/24K Gold Collection access",
        "Points never expire",
        "5,000 MR on first renewal",
        "Free first year on referral"
      ],
      "cons": [
        "No rewards on fuel, utilities, insurance",
        "No airport lounge access",
        "High renewal fee (\u20b94,500) if waiver not earned",
        "Limited acceptance compared to Visa/MC",
        "Base reward rate only 0.5%"
      ]
    },
    "slug": "amex-mrcc"
  },
  {
    "id": "amex-smartearn",
    "name": "American Express SmartEarn Credit Card",
    "bank": "American Express",
    "image": "/assets/cards/amex-smartearn.png",
    "link": "https://www.americanexpress.com/in/credit-cards/smartearn-credit-card/",
    "fees": {
      "joining": 495,
      "annual": 495,
      "currency": "INR",
      "waivedOn": 40000,
      "waiverText": "Annual fee waived on spending \u20b940,000+ in the previous card membership year."
    },
    "eligibility": {
      "income": 450000,
      "age": {
        "min": 18,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 700,
      "notes": "Entry-level Amex card. Self-employed need ITR. Available in select cities only."
    },
    "rewards": {
      "type": "points",
      "name": "Membership Rewards Points",
      "baseRate": 0.005,
      "earningText": "1 MR point per \u20b950 spent. 10X on select partners (capped). 5X on Amazon (capped).",
      "expiry": "No Expiry (while card is active)",
      "joiningBonus": "\u20b9500 cashback on spending \u20b910,000 within first 90 days",
      "exclusions": "Fuel, Utilities, Insurance, Cash Transactions, EMI at POS",
      "calculator": {
        "tier": "entry",
        "monthlyCap": 1250,
        "capResetPeriod": "calendar",
        "specialLogic": "10X on Zomato+EaseMyTrip (500 pts/month combined). 10X on Flipkart, Myntra, Uber, Ajio, Nykaa, PVR, BookMyShow, BlinkIt (500 pts/month combined). 5X on Amazon (250 pts/month). Total accelerated cap: 1,250 pts/month.",
        "portals": [
          {
            "name": "Partner Multipliers",
            "rate": 0.05,
            "label": "10X on Zomato/Uber/Flipkart",
            "categories": [
              "shopping",
              "travel",
              "dining"
            ]
          }
        ],
        "categories": {
          "travel": {
            "rate": 0.05,
            "label": "10X on EaseMyTrip (capped 500/month with Zomato)",
            "cap": 125
          },
          "dining": {
            "rate": 0.05,
            "label": "10X on Zomato (capped 500/month with EaseMyTrip)",
            "cap": 125
          },
          "online": {
            "rate": 0.05,
            "label": "10X on Flipkart, Myntra, Ajio, Nykaa (capped 500/month combined)",
            "cap": 125
          },
          "fuel": {
            "rate": 0,
            "label": "No rewards",
            "cap": null
          },
          "groceries": {
            "rate": 0.05,
            "label": "10X on BlinkIt (part of 500 pts cap)",
            "cap": 125
          },
          "utilities": {
            "rate": 0,
            "label": "No rewards",
            "cap": null
          },
          "amazon": {
            "rate": 0.025,
            "label": "5X on Amazon (capped 250 pts/month)",
            "cap": 63
          }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Pool with MRCC/Gold Charge for 18K/24K Gold Collection. Otherwise, redeem for statement credit or basic vouchers.",
        "options": [
          {
            "type": "Statement Credit",
            "value": 0.25,
            "desc": "1 MR = \u20b90.25",
            "recommended": true
          },
          {
            "type": "E-Vouchers",
            "value": 0.25,
            "desc": "Various brand vouchers at \u20b90.25/point",
            "recommended": false
          },
          {
            "type": "With Gold Collection (pooled)",
            "value": 0.5,
            "desc": "Pool with MRCC for Taj at \u20b90.50/point",
            "recommended": true
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "Not included",
        "international": "Not included",
        "accessType": "None"
      },
      "milestones": [
        {
          "spend": 120000,
          "benefit": "\u20b9500 voucher on spending \u20b91.2 Lakhs in card membership year"
        },
        {
          "spend": 180000,
          "benefit": "Additional \u20b9500 voucher on spending \u20b91.8 Lakhs"
        },
        {
          "spend": 240000,
          "benefit": "Additional \u20b9500 voucher on spending \u20b92.4 Lakhs"
        }
      ],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 5000,
        "text": "0% convenience fee at HPCL under \u20b95,000. 1% above \u20b95,000."
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5% + GST"
      }
    },
    "metadata": {
      "tags": [
        "Entry Level",
        "Online Shopping",
        "Low Fee",
        "Accelerated Rewards",
        "Fee Waiver"
      ],
      "bestFor": "Online shoppers using Flipkart, Amazon, Zomato, Uber with low monthly spends. Entry point to Amex ecosystem.",
      "rating": 3.5,
      "verdict": "Decent entry-level card for online shopping with 10X/5X accelerated rewards, but monthly caps are very low. Best as gateway to Amex ecosystem.",
      "pros": [
        "Lowest Amex annual fee (\u20b9495)",
        "Easy fee waiver (\u20b940K spend)",
        "10X on Flipkart, Zomato, Myntra, Uber",
        "5X on Amazon",
        "Welcome cashback of \u20b9500",
        "HPCL fuel convenience waiver"
      ],
      "cons": [
        "Very low monthly caps (500+500+250 = 1,250 pts max)",
        "No lounge access",
        "No rewards on fuel, utilities",
        "Limited redemption options standalone",
        "Limited acceptance compared to Visa/MC",
        "Low milestone voucher values"
      ]
    },
    "slug": "amex-smartearn"
  },
  {
    "id": "amex-platinum-reserve",
    "name": "American Express Platinum Reserve Credit Card",
    "bank": "American Express",
    "image": "/assets/cards/amex-platinum-reserve.png",
    "link": "https://www.americanexpress.com/in/credit-cards/platinum-reserve-credit-card/",
    "fees": {
      "joining": 5000,
      "annual": 10000,
      "currency": "INR",
      "waivedOn": 1000000,
      "waiverText": "100% annual fee waiver on spending \u20b910 Lakhs in the preceding membership year."
    },
    "eligibility": {
      "income": 600000,
      "age": {
        "min": 18,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 750,
      "notes": "Self-employed need 12+ months trading history. Premium card targeting frequent travelers and high spenders."
    },
    "rewards": {
      "type": "points",
      "name": "Membership Rewards Points",
      "baseRate": 0.005,
      "earningText": "1 MR point per \u20b950 spent. Base value at \u20b90.25/point = 0.5% return. Monthly vouchers add significant value.",
      "expiry": "No Expiry (while card is active)",
      "joiningBonus": "11,000 MR points on spending \u20b930,000 within 90 days + joining fee payment",
      "exclusions": "Fuel, Utilities, Insurance, Cash Transactions, EMI at POS",
      "calculator": {
        "tier": "premium",
        "monthlyCap": null,
        "capResetPeriod": "calendar",
        "specialLogic": "\u20b91,000 monthly voucher on spending \u20b950,000/month (enrollment required). 5X MR points via Reward Multiplier. Golf access on \u20b950K monthly spend.",
        "portals": [
          {
            "name": "Reward Multiplier",
            "rate": 0.025,
            "label": "5X via Reward Multiplier",
            "categories": [
              "shopping",
              "travel"
            ]
          }
        ],
        "categories": {
          "travel": {
            "rate": 0.005,
            "label": "1 MR/\u20b950",
            "cap": null
          },
          "dining": {
            "rate": 0.005,
            "label": "1 MR/\u20b950",
            "cap": null
          },
          "online": {
            "rate": 0.025,
            "label": "5X via Reward Multiplier",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No rewards",
            "cap": null
          },
          "groceries": {
            "rate": 0.005,
            "label": "1 MR/\u20b950",
            "cap": null
          },
          "utilities": {
            "rate": 0,
            "label": "No rewards",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Transfer to Marriott Bonvoy or airline partners. Monthly vouchers provide best recurring value.",
        "options": [
          {
            "type": "Statement Credit",
            "value": 0.25,
            "desc": "1 MR = \u20b90.25",
            "recommended": false
          },
          {
            "type": "Marriott Bonvoy",
            "value": 0.75,
            "desc": "1 MR = 1 Marriott Bonvoy point",
            "recommended": true
          },
          {
            "type": "Airline Partners",
            "value": 0.5,
            "desc": "Transfer to Emirates, BA, Singapore, etc.",
            "recommended": false
          },
          {
            "type": "E-Vouchers",
            "value": 0.25,
            "desc": "Various brand vouchers",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "12 visits/year (max 3 per quarter) at partner lounges",
        "international": "2 visits/year via Priority Pass (US$35 per additional visit)",
        "accessType": "Partner Lounges + Priority Pass (complimentary membership, $99 fee waived)"
      },
      "milestones": [
        {
          "spend": 50000,
          "benefit": "\u20b91,000 voucher on spending \u20b950,000 in a calendar month (up to \u20b912,000/year)"
        },
        {
          "spend": 500000,
          "benefit": "Taj Stay voucher worth \u20b910,000 on \u20b95L spend + annual fee payment"
        }
      ],
      "golf": {
        "included": true,
        "text": "2 complimentary rounds/month at 32+ golf courses on \u20b950,000 monthly spend"
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 5000,
        "text": "0% convenience fee at HPCL under \u20b95,000. 1% above \u20b95,000."
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5% + GST"
      },
      "hotelMemberships": [
        "Taj Epicure (10% off stays, late checkout, dining discounts)",
        "EazyDiner Prime (up to 50% off at 1800+ restaurants)",
        "Accor Plus Explorer (30% off dining, member rates)",
        "The Hotel Collection ($100 credit + upgrade on 2+ night stays)"
      ],
      "insurance": {
        "airAccident": 10000000,
        "purchaseProtection": true
      },
      "concierge": "24x7 Platinum Concierge for dining reservations, travel, lifestyle assistance"
    },
    "metadata": {
      "tags": [
        "Premium",
        "Travel",
        "Dining",
        "Golf",
        "Lounge Access",
        "Monthly Vouchers"
      ],
      "bestFor": "High spenders (\u20b950K+/month) who can maximize monthly vouchers, golf benefits, and hotel memberships",
      "rating": 3.8,
      "verdict": "Good for those spending \u20b950K+/month to earn \u20b912K in annual vouchers. The \u20b910L spend requirement for fee waiver is steep. Accor Plus and dining memberships add value.",
      "pros": [
        "\u20b912,000/year in vouchers on \u20b950K monthly spend",
        "Complimentary Taj Epicure, EazyDiner Prime, Accor Plus",
        "Golf access at 32+ courses",
        "Domestic + limited international lounge access",
        "Priority Pass membership included",
        "\u20b910K Taj voucher on \u20b95L spend"
      ],
      "cons": [
        "High annual fee (\u20b910,000 + GST)",
        "\u20b910L spend needed for fee waiver (unrealistic for most)",
        "Only 2 international lounge visits/year",
        "Golf/voucher benefits require \u20b950K monthly spend",
        "Low base reward rate (0.5%)",
        "No Centurion Lounge access (discontinued Sep 2023)"
      ]
    },
    "slug": "amex-platinum-reserve"
  },
  {
    "id": "idfc-first-private",
    "name": "IDFC First Private Credit Card",
    "bank": "IDFC First Bank",
    "image": "/assets/cards/idfc-first-private.png",
    "link": "https://www.idfcfirst.bank.in/credit-card/FIRSTPrivateCreditCard",
    "fees": {
      "joining": 50000,
      "annual": 50000,
      "currency": "INR",
      "waivedOn": null,
      "waiverText": "Invite-only. \u20b950,000 + GST joining/annual fee. 50,000 welcome RPs + Club ITC Culinaire on joining. 25,000 RPs on renewal."
    },
    "eligibility": {
      "income": 3600000,
      "age": {
        "min": 21,
        "max": 65
      },
      "type": "Invite Only (HNI)",
      "creditScore": 750
    },
    "rewards": {
      "type": "points",
      "name": "Reward Points",
      "baseRate": 0.00167,
      "earningText": "10X on spends above threshold & birthday (1.67%); 6X on Travel & Shop app bookings; 3X on rent/edu/govt (0.5%); 1X on utilities/insurance (0.17%)",
      "expiry": "Never Expires",
      "joiningBonus": "50,000 Reward Points (\u20b912,500 value) + Club ITC Culinaire Hotel Membership",
      "exclusions": "Fuel, EMI, Cash Withdrawals, Fees & Charges",
      "calculator": {
        "tier": "super-premium",
        "monthlyCap": 25000,
        "capResetPeriod": "calendar",
        "specialLogic": "10X on eligible spends; 50X bonus on hotels, 20X bonus on flights via app. Monthly bonus cap 25,000 RPs. Annual redemption cap 3,00,000 RPs. Karma Points donated to charity on high spends.",
        "portals": [
          {
            "name": "Threshold > \u20b920k",
            "rate": 0.0167,
            "label": "10X Rewards (> \u20b920k spend)",
            "categories": [
              "all"
            ]
          }
        ],
        "categories": {
          "travel": {
            "rate": 0.1,
            "label": "50X Bonus on Hotels via App (10% value-back)",
            "cap": 6250
          },
          "dining": {
            "rate": 0.0167,
            "label": "10X Reward Points (1.67%)",
            "cap": null
          },
          "online": {
            "rate": 0.0167,
            "label": "10X on incremental spends above threshold",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No rewards on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.0167,
            "label": "10X on incremental spends above threshold",
            "cap": null
          },
          "utilities": {
            "rate": 0.00167,
            "label": "1X Reward Points (0.17%)",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Travel bookings via IDFC App or Statement Credit at \u20b90.25 per point",
        "options": [
          {
            "type": "Statement Credit",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": true
          },
          {
            "type": "Travel Bookings (App)",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25 (up to 70% of booking)",
            "recommended": true
          },
          {
            "type": "Product Catalogue",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "Unlimited per quarter (Primary + Add-on)",
        "international": "Unlimited per quarter (Primary + Add-on) + 4 guest visits/year at domestic",
        "accessType": "DreamFolks"
      },
      "milestones": [
        {
          "spend": 1500000,
          "benefit": "Taj Experiences Signature Dining Voucher (within 6 months)"
        },
        {
          "spend": 4000000,
          "benefit": "Club ITC Culinaire Membership renewed annually"
        }
      ],
      "golf": {
        "included": true,
        "text": "Unlimited complimentary golf rounds/lessons monthly via Golftripz"
      },
      "movies": {
        "included": true,
        "text": "Up to \u20b9750 discount on BookMyShow twice per month"
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": null
      },
      "forex": {
        "markup": 0,
        "text": "Zero Forex Markup"
      }
    },
    "metadata": {
      "tags": [
        "Super-Premium",
        "Invite-Only",
        "Zero Forex",
        "Unlimited Lounge",
        "Metal Card"
      ],
      "bestFor": "Ultra-HNIs seeking premium travel & lifestyle benefits with zero forex markup",
      "rating": 4.2,
      "verdict": "India's most exclusive card with unlimited lounges & zero forex, but lacks airmiles transfer partners",
      "pros": [
        "Zero forex markup on international transactions",
        "Unlimited domestic & international lounge access",
        "Unlimited golf rounds and premium memberships",
        "Rewards on rent, education & usually excluded categories",
        "No late payment or over-limit charges"
      ],
      "cons": [
        "Very high \u20b950,000 annual fee + GST",
        "Invite-only, not available for direct application",
        "Low redemption value at \u20b90.25 per point",
        "No airmiles transfer partners",
        "Annual redemption cap of 3 lakh points"
      ]
    },
    "slug": "idfc-first-private"
  },
  {
    "id": "idfc-first-wealth",
    "name": "IDFC First Wealth Credit Card",
    "bank": "IDFC First Bank",
    "image": "/assets/cards/idfc-first-wealth.png",
    "link": "https://www.idfcfirst.bank.in/credit-card/wealth",
    "fees": {
      "joining": 0,
      "annual": 0,
      "currency": "INR",
      "waivedOn": 0,
      "waiverText": "Lifetime Free - No joining or annual fee ever"
    },
    "eligibility": {
      "income": 3600000,
      "age": {
        "min": 21,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 750
    },
    "rewards": {
      "type": "points",
      "name": "Reward Points",
      "baseRate": 0.00375,
      "earningText": "10X on spends above \u20b920k/month & birthday (1.25%); 3X up to \u20b920k (0.375%); 3X on rent/edu/govt; 1X on utilities/insurance. Effective Jan 18, 2026: Base changed from \u20b9150 to \u20b9200 per RP.",
      "expiry": "Never Expires",
      "joiningBonus": "\u20b9500 gift voucher on spending \u20b95,000 within 30 days + 5% cashback up to \u20b91,000 on first EMI",
      "exclusions": "Fuel, EMI, Cash Withdrawals. Rent/Edu/Govt/Wallet not counted for 10X threshold.",
      "calculator": {
        "tier": "premium",
        "monthlyCap": null,
        "capResetPeriod": "statement",
        "specialLogic": "10X rewards on incremental spends above \u20b920,000/month. 3X on base spends. 33% bonus RPs on hotel, 20% bonus on flights via app. New \u20b9200 base from Jan 18, 2026.",
        "portals": [
          {
            "name": "Threshold > \u20b920k",
            "rate": 0.0125,
            "label": "10X Rewards (> \u20b920k spend)",
            "categories": [
              "all"
            ]
          }
        ],
        "categories": {
          "travel": {
            "rate": 0.0417,
            "label": "33% Bonus on Hotels via App (~4.17% total)",
            "cap": 2000
          },
          "dining": {
            "rate": 0.0125,
            "label": "10X on spends above \u20b920k threshold",
            "cap": null
          },
          "online": {
            "rate": 0.0125,
            "label": "10X on spends above \u20b920k threshold",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No rewards on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.0125,
            "label": "10X on spends above \u20b920k threshold",
            "cap": null
          },
          "utilities": {
            "rate": 0.00125,
            "label": "1X Reward Points (0.125%)",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Pay with Points at checkout or redeem for vouchers via Poshvine portal",
        "options": [
          {
            "type": "Pay with Points",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25 at online/in-store checkout",
            "recommended": true
          },
          {
            "type": "Gift Vouchers (Amazon/Flipkart)",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": true
          },
          {
            "type": "Travel Bookings (App)",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "1 per quarter (effective Apr 2026; requires \u20b920k spend in previous month)",
        "international": "1 per quarter (effective Apr 2026; requires \u20b920k spend in previous month)",
        "accessType": "DreamFolks"
      },
      "milestones": [
        {
          "spend": 800000,
          "benefit": "7,500 Bonus Reward Points annually"
        },
        {
          "spend": 1500000,
          "benefit": "15,000 Bonus Reward Points annually"
        }
      ],
      "golf": {
        "included": true,
        "text": "1 complimentary round per quarter on \u20b920k spend/month (effective Apr 2026)"
      },
      "movies": {
        "included": true,
        "text": "BOGO up to \u20b9250 on District app, twice per month"
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 300
      },
      "forex": {
        "markup": 0.015,
        "text": "1.5% Forex Markup"
      }
    },
    "metadata": {
      "tags": [
        "Lifetime Free",
        "Premium",
        "Low Forex",
        "Golf",
        "Lounge Access"
      ],
      "bestFor": "High earners wanting premium benefits without annual fees and low forex charges",
      "rating": 4,
      "verdict": "Best lifetime-free premium card for high spenders, but reward value diminished post-2024 devaluation",
      "pros": [
        "Lifetime free with no annual fee conditions",
        "Low 1.5% forex markup",
        "Domestic & international lounge access",
        "Rewards on rent, education & government payments",
        "Golf privileges included"
      ],
      "cons": [
        "High income eligibility (\u20b936 lakh p.a.)",
        "10X rewards only above \u20b920k/month threshold",
        "Low redemption value at \u20b90.25 per point",
        "Lounge access reduced from Apr 2026",
        "No airmiles transfer partners"
      ]
    },
    "slug": "idfc-first-wealth"
  },
  {
    "id": "idfc-first-select",
    "name": "IDFC First Select Credit Card",
    "bank": "IDFC First Bank",
    "image": "/assets/cards/idfc-first-select.png",
    "link": "https://www.idfcfirst.bank.in/credit-card/select",
    "fees": {
      "joining": 0,
      "annual": 0,
      "currency": "INR",
      "waivedOn": 0,
      "waiverText": "Lifetime Free - No joining or annual fee ever"
    },
    "eligibility": {
      "income": 1200000,
      "age": {
        "min": 21,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 700
    },
    "rewards": {
      "type": "points",
      "name": "Reward Points",
      "baseRate": 0.00375,
      "earningText": "10X on spends above \u20b920k/month & birthday (1.25%); 3X up to \u20b920k (0.375%); 3X on rent/edu/govt; 1X on utilities/insurance. Effective Jan 18, 2026: Base changed from \u20b9150 to \u20b9200 per RP.",
      "expiry": "Never Expires",
      "joiningBonus": "\u20b9500 gift voucher on spending \u20b95,000 within 30 days + 5% cashback up to \u20b91,000 on first EMI",
      "exclusions": "Fuel, EMI, Cash Withdrawals. Rent/Edu/Govt/Wallet not counted for 10X threshold.",
      "calculator": {
        "tier": "premium",
        "monthlyCap": null,
        "capResetPeriod": "statement",
        "specialLogic": "10X rewards on incremental spends above \u20b920,000/month. 3X on base spends. 50X bonus on hotels, 20X bonus on flights via app. New \u20b9200 base from Jan 18, 2026.",
        "portals": [
          {
            "name": "Threshold > \u20b920k",
            "rate": 0.0125,
            "label": "10X Rewards (> \u20b920k spend)",
            "categories": [
              "all"
            ]
          }
        ],
        "categories": {
          "travel": {
            "rate": 0.0833,
            "label": "50X Bonus on Hotels via App (~8.33% total)",
            "cap": 2000
          },
          "dining": {
            "rate": 0.0125,
            "label": "10X on spends above \u20b920k threshold",
            "cap": null
          },
          "online": {
            "rate": 0.0125,
            "label": "10X on spends above \u20b920k threshold",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No rewards on fuel (1% surcharge waiver instead)",
            "cap": null
          },
          "groceries": {
            "rate": 0.0125,
            "label": "10X on spends above \u20b920k threshold",
            "cap": null
          },
          "utilities": {
            "rate": 0.00125,
            "label": "1X Reward Points (0.125%)",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Pay with Points at checkout or redeem for vouchers via Poshvine portal",
        "options": [
          {
            "type": "Pay with Points",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25 at online/in-store checkout",
            "recommended": true
          },
          {
            "type": "Gift Vouchers (Amazon/Flipkart)",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": true
          },
          {
            "type": "Travel Bookings (App)",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "1 per quarter (effective Apr 2026; requires \u20b920k spend in previous month)",
        "international": "None",
        "accessType": "DreamFolks"
      },
      "milestones": [],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": true,
        "text": "BOGO up to \u20b9125 on District app, twice per month"
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 300
      },
      "forex": {
        "markup": 0.0199,
        "text": "1.99% Forex Markup"
      }
    },
    "metadata": {
      "tags": [
        "Lifetime Free",
        "Railway Lounge",
        "Airport Lounge",
        "Low Forex"
      ],
      "bestFor": "Mid-range spenders wanting lifetime-free card with airport & railway lounge access",
      "rating": 3.8,
      "verdict": "Solid all-rounder with railway lounge access, but lounge benefits reduced from Apr 2026",
      "pros": [
        "Lifetime free with no conditions",
        "Railway lounge access (4 per quarter)",
        "Domestic airport lounge access",
        "Low 1.99% forex markup",
        "Rewards on rent & education payments"
      ],
      "cons": [
        "10X rewards only above \u20b920k/month threshold",
        "No international lounge access",
        "Low redemption value at \u20b90.25 per point",
        "Airport lounge reduced to 1/quarter from Apr 2026",
        "No golf or premium lifestyle benefits"
      ]
    },
    "slug": "idfc-first-select"
  },
  {
    "id": "idfc-first-classic",
    "name": "IDFC First Classic Credit Card",
    "bank": "IDFC First Bank",
    "image": "/assets/cards/idfc-first-classic.png",
    "link": "https://www.idfcfirst.bank.in/credit-card/classic",
    "fees": {
      "joining": 0,
      "annual": 0,
      "currency": "INR",
      "waivedOn": 0,
      "waiverText": "Lifetime Free - No joining or annual fee ever"
    },
    "eligibility": {
      "income": 300000,
      "age": {
        "min": 21,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 650
    },
    "rewards": {
      "type": "points",
      "name": "Reward Points",
      "baseRate": 0.00375,
      "earningText": "10X on spends above \u20b920k/month & birthday (1.25%); 3X up to \u20b920k (0.375%); 3X on rent/edu/govt; 1X on utilities/insurance. Effective Jan 18, 2026: Base changed from \u20b9150 to \u20b9200 per RP.",
      "expiry": "Never Expires",
      "joiningBonus": "\u20b9500 gift voucher on spending \u20b95,000 within 30 days + 5% cashback up to \u20b91,000 on first EMI",
      "exclusions": "Fuel, EMI, Cash Withdrawals. Rent/Edu/Govt/Wallet not counted for 10X threshold.",
      "calculator": {
        "tier": "entry",
        "monthlyCap": null,
        "capResetPeriod": "statement",
        "specialLogic": "10X rewards on incremental spends above \u20b920,000/month. 3X on all spends up to \u20b920k. New \u20b9200 base from Jan 18, 2026.",
        "portals": [
          {
            "name": "Threshold > \u20b920k",
            "rate": 0.0125,
            "label": "10X Rewards (> \u20b920k spend)",
            "categories": [
              "all"
            ]
          }
        ],
        "categories": {
          "travel": {
            "rate": 0.0125,
            "label": "10X on spends above \u20b920k threshold",
            "cap": null
          },
          "dining": {
            "rate": 0.0125,
            "label": "10X on spends above \u20b920k threshold",
            "cap": null
          },
          "online": {
            "rate": 0.0125,
            "label": "10X on spends above \u20b920k threshold",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No rewards on fuel (1% surcharge waiver instead)",
            "cap": null
          },
          "groceries": {
            "rate": 0.0125,
            "label": "10X on spends above \u20b920k threshold",
            "cap": null
          },
          "utilities": {
            "rate": 0.00125,
            "label": "1X Reward Points (0.125%)",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Pay with Points at checkout or redeem for vouchers via Poshvine portal",
        "options": [
          {
            "type": "Pay with Points",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25 at online/in-store checkout",
            "recommended": true
          },
          {
            "type": "Gift Vouchers (Amazon/Flipkart)",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": true
          },
          {
            "type": "Product Catalogue",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "None (Airport)",
        "international": "None",
        "accessType": "Railway Lounge Only - 4 per quarter via DreamFolks"
      },
      "milestones": [],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": true,
        "text": "25% off up to \u20b9100 on District app, once per month"
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 200
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5% Forex Markup"
      }
    },
    "metadata": {
      "tags": [
        "Lifetime Free",
        "Entry Level",
        "Railway Lounge",
        "Beginner"
      ],
      "bestFor": "First-time credit card users or moderate spenders wanting a no-fee card with railway lounge access",
      "rating": 3.5,
      "verdict": "Best entry-level lifetime-free card with railway lounge access and unlimited rewards",
      "pros": [
        "Lifetime free with zero conditions",
        "Low income eligibility (\u20b925k/month)",
        "Railway lounge access (4 per quarter)",
        "Rewards never expire",
        "Roadside assistance included"
      ],
      "cons": [
        "No airport lounge access",
        "High 3.5% forex markup",
        "10X rewards only above \u20b920k/month",
        "Low redemption value at \u20b90.25 per point",
        "Limited lifestyle benefits"
      ]
    },
    "slug": "idfc-first-classic"
  },
  {
    "id": "idfc-first-millennia",
    "name": "IDFC First Millennia Credit Card",
    "bank": "IDFC First Bank",
    "image": "/assets/cards/idfc-first-millennia.png",
    "link": "https://www.idfcfirst.bank.in/credit-card/millennia",
    "fees": {
      "joining": 0,
      "annual": 0,
      "currency": "INR",
      "waivedOn": 0,
      "waiverText": "Lifetime Free - No joining or annual fee ever"
    },
    "eligibility": {
      "income": 300000,
      "age": {
        "min": 21,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 650
    },
    "rewards": {
      "type": "points",
      "name": "Reward Points",
      "baseRate": 0.005,
      "earningText": "10X on spends above \u20b920k/month & birthday (1.67%); 3X up to \u20b920k online & offline (0.5%); 3X on edu/wallet/govt; 1X on utilities/insurance",
      "expiry": "Never Expires",
      "joiningBonus": "\u20b9500 gift voucher on spending \u20b95,000 within 30 days + 5% cashback up to \u20b91,000 on first EMI",
      "exclusions": "Fuel, EMI, Cash Withdrawals, Insurance. Edu/Wallet/Govt not counted for 10X threshold.",
      "calculator": {
        "tier": "entry",
        "monthlyCap": null,
        "capResetPeriod": "statement",
        "specialLogic": "10X rewards on incremental spends above \u20b920,000/month. 3X on all online & offline spends up to \u20b920k. Base 1 RP per \u20b9150.",
        "portals": [
          {
            "name": "Threshold > \u20b920k",
            "rate": 0.0167,
            "label": "10X Rewards (> \u20b920k spend)",
            "categories": [
              "all"
            ]
          }
        ],
        "categories": {
          "travel": {
            "rate": 0.0167,
            "label": "10X on spends above \u20b920k threshold",
            "cap": null
          },
          "dining": {
            "rate": 0.0167,
            "label": "10X on spends above \u20b920k threshold",
            "cap": null
          },
          "online": {
            "rate": 0.0167,
            "label": "10X on spends above \u20b920k threshold",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No rewards on fuel (1% surcharge waiver instead)",
            "cap": null
          },
          "groceries": {
            "rate": 0.0167,
            "label": "10X on spends above \u20b920k threshold",
            "cap": null
          },
          "utilities": {
            "rate": 0.00167,
            "label": "1X Reward Points (0.17%)",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Pay with Points at checkout or redeem for vouchers via Poshvine portal",
        "options": [
          {
            "type": "Pay with Points",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25 at online/in-store checkout",
            "recommended": true
          },
          {
            "type": "Gift Vouchers (Amazon/Flipkart)",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": true
          },
          {
            "type": "Product Catalogue",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "None (Airport)",
        "international": "None",
        "accessType": "Railway Lounge Only - 4 per quarter via DreamFolks"
      },
      "milestones": [],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": true,
        "text": "25% off up to \u20b9100 on District/Paytm app, once per month"
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 200
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5% Forex Markup"
      }
    },
    "metadata": {
      "tags": [
        "Lifetime Free",
        "Entry Level",
        "Millennials",
        "Railway Lounge",
        "Beginner"
      ],
      "bestFor": "Young professionals and first-time users wanting a no-fee card with decent rewards",
      "rating": 3.5,
      "verdict": "Ideal starter card for millennials with never-expiring rewards and railway lounge access",
      "pros": [
        "Lifetime free with zero conditions",
        "Low income eligibility (\u20b925k/month)",
        "Railway lounge access (4 per quarter)",
        "Rewards never expire",
        "Low interest rate option (0.75% p.m.)"
      ],
      "cons": [
        "No airport lounge access",
        "High 3.5% forex markup",
        "10X rewards only above \u20b920k/month",
        "Low redemption value at \u20b90.25 per point",
        "Very similar to Classic card"
      ]
    },
    "slug": "idfc-first-millennia"
  },
  {
    "id": "idfc-first-wow",
    "name": "IDFC First WOW! Credit Card",
    "bank": "IDFC First Bank",
    "image": "/assets/cards/idfc-first-wow.png",
    "link": "https://www.idfcfirst.bank.in/credit-card/wow",
    "fees": {
      "joining": 0,
      "annual": 0,
      "currency": "INR",
      "waivedOn": 0,
      "waiverText": "Lifetime Free - Secured card against FD (minimum \u20b920,000 or \u20b925,000 FD required)"
    },
    "eligibility": {
      "income": 0,
      "age": {
        "min": 18,
        "max": 70
      },
      "type": "Anyone with FD (No income proof required)",
      "creditScore": 0
    },
    "rewards": {
      "type": "points",
      "name": "Reward Points",
      "baseRate": 0.0067,
      "earningText": "4X on all eligible spends (0.67%); 1X on utilities/insurance (0.17%); Credit limit = 100% of FD value",
      "expiry": "Never Expires",
      "joiningBonus": "5% cashback up to \u20b91,000 on first EMI transaction within 90 days",
      "exclusions": "Fuel, EMI, Cash Withdrawals",
      "calculator": {
        "tier": "entry",
        "monthlyCap": null,
        "capResetPeriod": "statement",
        "specialLogic": "Secured card backed by Fixed Deposit. 4X rewards on all spends. Zero forex markup. Interest-free cash withdrawal for up to 45 days.",
        "categories": {
          "travel": {
            "rate": 0.0067,
            "label": "4X Reward Points (0.67%)",
            "cap": null
          },
          "dining": {
            "rate": 0.0067,
            "label": "4X Reward Points (0.67%)",
            "cap": null
          },
          "online": {
            "rate": 0.0067,
            "label": "4X Reward Points (0.67%)",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No rewards on fuel (1% surcharge waiver instead)",
            "cap": null
          },
          "groceries": {
            "rate": 0.0067,
            "label": "4X Reward Points (0.67%)",
            "cap": null
          },
          "utilities": {
            "rate": 0.00167,
            "label": "1X Reward Points (0.17%)",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Pay with Points at checkout or redeem for vouchers via Poshvine portal",
        "options": [
          {
            "type": "Pay with Points",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25 at online/in-store checkout",
            "recommended": true
          },
          {
            "type": "Gift Vouchers (Amazon/Flipkart)",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": true
          },
          {
            "type": "Product Catalogue",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "None",
        "international": "None",
        "accessType": "None"
      },
      "milestones": [],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": true,
        "text": "50% off up to \u20b9300 on BookMyShow (Visa benefit)"
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 200
      },
      "forex": {
        "markup": 0,
        "text": "Zero Forex Markup"
      }
    },
    "metadata": {
      "tags": [
        "Secured Card",
        "Zero Forex",
        "No Credit History",
        "FD Backed",
        "Lifetime Free"
      ],
      "bestFor": "New-to-credit users, students, NRIs, or anyone wanting zero forex with no credit history required",
      "rating": 4,
      "verdict": "Best secured card in India with zero forex markup and decent rewards - perfect for building credit history",
      "pros": [
        "Zero forex markup (rare for secured cards)",
        "No income proof or credit history required",
        "Earn interest on FD while using credit",
        "Interest-free cash withdrawal for 45 days",
        "100% credit limit against FD"
      ],
      "cons": [
        "No lounge access",
        "Requires FD of minimum \u20b920,000",
        "Low redemption value at \u20b90.25 per point",
        "No 10X accelerated rewards",
        "Limited lifestyle benefits"
      ]
    },
    "slug": "idfc-first-wow"
  },
  {
    "id": "kotak-white-reserve",
    "name": "Kotak White Reserve Credit Card",
    "bank": "Kotak Mahindra Bank",
    "image": "/assets/cards/kotak-white-reserve.png",
    "link": "https://www.kotak.com/en/personal-banking/cards/credit-cards/white-reserve-credit-card.html",
    "fees": {
      "joining": 12500,
      "annual": 12500,
      "currency": "INR",
      "waivedOn": 1000000,
      "waiverText": "Waived on \u20b910 lakh annual spend"
    },
    "eligibility": {
      "income": 2500000,
      "age": {
        "min": 28,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 750
    },
    "rewards": {
      "type": "points",
      "name": "White Pass Value",
      "baseRate": 0,
      "earningText": "Milestone-based White Pass rewards. No rewards below \u20b93 lakh annual spend. Earn up to \u20b92.5 lakh White Pass on \u20b91 crore spend.",
      "expiry": "Valid until 90 days after anniversary cycle",
      "joiningBonus": "Club Marriott Membership with 3 Celebration Certificates",
      "exclusions": "Fuel, Wallet, Rent, Govt, Insurance, Utilities, Education excluded from milestone calculation. W.e.f June 2025: 1% fee on Wallet/Gaming above \u20b910K/month, Utilities above \u20b975K/month, Fuel above \u20b950K/month",
      "calculator": {
        "tier": "super-premium",
        "monthlyCap": null,
        "capResetPeriod": "anniversary",
        "specialLogic": "White Pass is earned via ANNUAL SPEND MILESTONES (not per-transaction). Milestones: \u20b93L\u2192\u20b95K, \u20b910L\u2192+\u20b915K (total \u20b920K), \u20b920L\u2192+\u20b922K (\u20b942K), \u20b930L\u2192+\u20b924K (\u20b966K), \u20b940L\u2192+\u20b926K (\u20b992K), \u20b950L\u2192+\u20b928K (\u20b91.2L), \u20b975L\u2192+\u20b963K (\u20b91.83L), \u20b91Cr\u2192+\u20b967K (\u20b92.5L). No rewards if spend <\u20b93L. Redemption: 1 White Pass = \u20b91 on catalog, \u20b90.70 for cashback.",
        "categories": {
          "travel": {
            "rate": 0.025,
            "label": "Up to 2.5% on \u20b91Cr milestone",
            "cap": 250000
          },
          "dining": {
            "rate": 0.025,
            "label": "Up to 2.5% on \u20b91Cr milestone",
            "cap": 250000
          },
          "online": {
            "rate": 0.025,
            "label": "Up to 2.5% on \u20b91Cr milestone",
            "cap": 250000
          },
          "fuel": {
            "rate": 0,
            "label": "No rewards on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.025,
            "label": "Up to 2.5% on \u20b91Cr milestone",
            "cap": 250000
          },
          "utilities": {
            "rate": 0,
            "label": "No rewards on utilities",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 1,
        "bestOption": "White Pass Catalog (1:1 redemption for vouchers, flights, hotels, experiences)",
        "options": [
          {
            "type": "White Pass Catalog",
            "value": 1,
            "desc": "1 White Pass = \u20b91 on vouchers, flights, hotels, experiences",
            "recommended": true
          },
          {
            "type": "Cashback",
            "value": 0.7,
            "desc": "1 White Pass = \u20b90.70 as cashback",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "Unlimited (Primary & Add-on)",
        "international": "Unlimited (Priority Pass)",
        "accessType": "DreamFolks + Priority Pass"
      },
      "milestones": [
        {
          "spend": 300000,
          "benefit": "\u20b95,000 White Pass Value"
        },
        {
          "spend": 1000000,
          "benefit": "Additional \u20b915,000 White Pass (Total \u20b920,000)"
        },
        {
          "spend": 2000000,
          "benefit": "Additional \u20b922,000 White Pass (Total \u20b942,000)"
        },
        {
          "spend": 3000000,
          "benefit": "Additional \u20b924,000 White Pass (Total \u20b966,000)"
        },
        {
          "spend": 4000000,
          "benefit": "Additional \u20b926,000 White Pass (Total \u20b992,000)"
        },
        {
          "spend": 5000000,
          "benefit": "Additional \u20b928,000 White Pass (Total \u20b91,20,000)"
        },
        {
          "spend": 7500000,
          "benefit": "Additional \u20b963,000 White Pass (Total \u20b91,83,000)"
        },
        {
          "spend": 10000000,
          "benefit": "Additional \u20b967,000 White Pass (Total \u20b92,50,000)"
        }
      ],
      "golf": {
        "included": true,
        "text": "2 complimentary rounds per month worldwide"
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 4500
      },
      "forex": {
        "markup": 0.02,
        "text": "2%"
      }
    },
    "metadata": {
      "tags": [
        "Super-Premium",
        "Metal Card",
        "Travel",
        "Golf",
        "Unlimited Lounge",
        "Club Marriott",
        "Milestone Rewards"
      ],
      "bestFor": "Ultra HNIs with \u20b910L+ annual spends seeking luxury travel, lounge, and lifestyle benefits",
      "rating": 4.3,
      "verdict": "India's top milestone-based super-premium card with unmatched lounge access and Club Marriott perks, but requires \u20b93L minimum spend to unlock any rewards.",
      "pros": [
        "Unlimited domestic and international lounge access for primary and add-on",
        "Up to 2.5% value back on \u20b91 crore spend",
        "Club Marriott membership with dining and stay discounts",
        "Low 2% forex markup",
        "2 complimentary golf rounds per month worldwide",
        "Luxury concierge services"
      ],
      "cons": [
        "No rewards below \u20b93 lakh annual spend",
        "Very high \u20b912,500 annual fee requires \u20b910L spend for waiver",
        "Cashback redemption at reduced 0.70 rate",
        "Requires \u20b925L+ income eligibility"
      ]
    },
    "slug": "kotak-white-reserve"
  },
  {
    "id": "kotak-white",
    "name": "Kotak White Credit Card",
    "bank": "Kotak Mahindra Bank",
    "image": "/assets/cards/kotak-white.png",
    "link": "https://www.kotak.com/en/personal-banking/cards/credit-cards/white-credit-card.html",
    "fees": {
      "joining": 3000,
      "annual": 3000,
      "currency": "INR",
      "waivedOn": 500000,
      "waiverText": "Waived on \u20b95 lakh annual spend"
    },
    "eligibility": {
      "income": 600000,
      "age": {
        "min": 21,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 750
    },
    "rewards": {
      "type": "points",
      "name": "White Pass Value",
      "baseRate": 0,
      "earningText": "Milestone-based White Pass rewards. Earn up to \u20b927,000 White Pass annually on \u20b912 lakh spend. Minimum \u20b92 lakh spend required to unlock rewards.",
      "expiry": "Expires on card anniversary date + 90 days claim period",
      "joiningBonus": "\u20b91,500 White Pass on spending \u20b930,000 within 60 days of card setup",
      "exclusions": "Fuel, Wallet, Rent, Govt, Insurance, Utilities, EMI transactions. W.e.f June 2025: 1% fee on Wallet/Gaming above \u20b910K/month, Utilities above \u20b975K/month, Fuel above \u20b950K/month",
      "calculator": {
        "tier": "premium",
        "monthlyCap": null,
        "capResetPeriod": "anniversary",
        "specialLogic": "White Pass is earned via ANNUAL SPEND MILESTONES. Maximum \u20b927,000 White Pass annually on \u20b912 lakh spend (~2.25% value back). Minimum \u20b92 lakh spend required to start earning. Redemption: 1 White Pass = \u20b91 on catalog.",
        "categories": {
          "travel": {
            "rate": 0.0225,
            "label": "Up to 2.25% on \u20b912L spend",
            "cap": 27000
          },
          "dining": {
            "rate": 0.0225,
            "label": "Up to 2.25% on \u20b912L spend",
            "cap": 27000
          },
          "online": {
            "rate": 0.0225,
            "label": "Up to 2.25% on \u20b912L spend",
            "cap": 27000
          },
          "fuel": {
            "rate": 0,
            "label": "No rewards on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.0225,
            "label": "Up to 2.25% on \u20b912L spend",
            "cap": 27000
          },
          "utilities": {
            "rate": 0,
            "label": "No rewards on utilities",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 1,
        "bestOption": "White Pass Catalog (1:1 redemption for vouchers, flights, hotels)",
        "options": [
          {
            "type": "White Pass Catalog",
            "value": 1,
            "desc": "1 White Pass = \u20b91 on vouchers, flights, hotels, National Geographic experiences",
            "recommended": true
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "8 per year (2 per quarter)",
        "international": "4 per year (Priority Pass)",
        "accessType": "DreamFolks + Priority Pass"
      },
      "milestones": [
        {
          "spend": 200000,
          "benefit": "White Pass rewards unlocked"
        },
        {
          "spend": 1200000,
          "benefit": "Maximum \u20b927,000 White Pass Value annually"
        }
      ],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 3500
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5%"
      }
    },
    "metadata": {
      "tags": [
        "Premium",
        "Travel",
        "Milestone Rewards",
        "Lounge Access",
        "Lifestyle"
      ],
      "bestFor": "High spenders seeking milestone-based White Pass rewards with domestic and international lounge access",
      "rating": 3.8,
      "verdict": "A solid premium card for high spenders but complex milestone structure and \u20b92L minimum spend requirement limit its appeal compared to simpler reward cards.",
      "pros": [
        "Up to 2.25% value back on \u20b912L annual spend",
        "Domestic and international lounge access",
        "Premium brand voucher redemptions",
        "Railway surcharge waiver up to 2.5%",
        "Fee waiver achievable at \u20b95L spend"
      ],
      "cons": [
        "Minimum \u20b92L spend required to unlock any rewards",
        "Complex milestone-based structure",
        "White Pass expires on anniversary date",
        "No category-specific accelerated rewards",
        "3.5% forex markup is on higher side"
      ]
    },
    "slug": "kotak-white"
  },
  {
    "id": "kotak-mojo-platinum",
    "name": "Kotak Mojo Platinum Credit Card",
    "bank": "Kotak Mahindra Bank",
    "image": "/assets/cards/kotak-mojo-platinum.png",
    "link": "https://www.kotak.com/en/personal-banking/cards/credit-cards/mojo-platinum-credit-card.html",
    "fees": {
      "joining": 1000,
      "annual": 1000,
      "currency": "INR",
      "waivedOn": 100000,
      "waiverText": "Joining fee waived on \u20b930K spend in 90 days. Annual fee waived on \u20b91 lakh spend"
    },
    "eligibility": {
      "income": 400000,
      "age": {
        "min": 21,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 700
    },
    "rewards": {
      "type": "points",
      "name": "Mojo Points",
      "baseRate": 0.0025,
      "earningText": "2.5 Mojo Points per \u20b9100 on online spends (1% value). 1 Mojo Point per \u20b9100 on other spends (0.4% value). No rewards on fuel or cash withdrawal.",
      "expiry": "12 months from date earned",
      "joiningBonus": "2,500 Mojo Points quarterly on \u20b975,000 spend (1st year only)",
      "exclusions": "Fuel, Cash Withdrawal. W.e.f June 2025: Education & Insurance earn only up to \u20b970K/statement cycle. Wallet/Gaming, Utility, Fuel excluded from milestone calculation.",
      "calculator": {
        "tier": "entry",
        "monthlyCap": null,
        "capResetPeriod": "statement",
        "specialLogic": "2.5x Mojo Points on all online spends. 1x on offline spends excluding fuel. 1 Mojo Point = \u20b90.25 on catalog, \u20b90.20 for cashback. Minimum 2,500 points for redemption.",
        "categories": {
          "travel": {
            "rate": 0.01,
            "label": "1% (2.5 Mojo/\u20b9100 online)",
            "cap": null
          },
          "dining": {
            "rate": 0.01,
            "label": "1% (2.5 Mojo/\u20b9100 online)",
            "cap": null
          },
          "online": {
            "rate": 0.01,
            "label": "1% (2.5 Mojo/\u20b9100)",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No rewards on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.004,
            "label": "0.4% (1 Mojo/\u20b9100 offline)",
            "cap": null
          },
          "utilities": {
            "rate": 0.004,
            "label": "0.4% (1 Mojo/\u20b9100 offline)",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Kotak Rewards Catalog for shopping, travel, vouchers",
        "options": [
          {
            "type": "Catalog Redemption",
            "value": 0.25,
            "desc": "1 Mojo Point = \u20b90.25 on shopping, travel, vouchers",
            "recommended": true
          },
          {
            "type": "Statement Credit",
            "value": 0.2,
            "desc": "1 Mojo Point = \u20b90.20 as cashback (min 2,500 points)",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "8 per year (2 per quarter, requires \u20b975K quarterly spend from June 2025)",
        "international": "None",
        "accessType": "DreamFolks"
      },
      "milestones": [
        {
          "spend": 75000,
          "benefit": "2,500 bonus Mojo Points (quarterly, 1st year only)"
        }
      ],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 3500
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5%"
      }
    },
    "metadata": {
      "tags": [
        "Entry-Level",
        "Online Shopping",
        "Lounge Access",
        "Points",
        "Rewards"
      ],
      "bestFor": "Frequent online shoppers seeking basic rewards with domestic lounge access",
      "rating": 3.5,
      "verdict": "A decent entry-level rewards card with accelerated online earnings, but the 0.4% offline reward rate is underwhelming compared to competitors.",
      "pros": [
        "2.5x rewards on all online spends",
        "Uncapped reward earning",
        "8 domestic lounge visits annually",
        "Railway surcharge waiver up to 2.5%",
        "Low \u20b91L spend for fee waiver",
        "\u20b91.25L insurance on lost card"
      ],
      "cons": [
        "Low 0.4% reward rate on offline spends",
        "Quarterly milestone bonus only for 1st year",
        "No international lounge access",
        "12-month points expiry",
        "3.5% forex markup"
      ]
    },
    "slug": "kotak-mojo-platinum"
  },
  {
    "id": "kotak-zen-signature",
    "name": "Kotak Zen Signature Credit Card",
    "bank": "Kotak Mahindra Bank",
    "image": "/assets/cards/kotak-zen-signature.png",
    "link": "https://www.kotak.com/en/personal-banking/cards/credit-cards/zen-signature-credit-card.html",
    "fees": {
      "joining": 1500,
      "annual": 1500,
      "currency": "INR",
      "waivedOn": 150000,
      "waiverText": "Waived on \u20b91.5 lakh annual spend"
    },
    "eligibility": {
      "income": 480000,
      "age": {
        "min": 21,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 720
    },
    "rewards": {
      "type": "points",
      "name": "Zen Points",
      "baseRate": 0.0083,
      "earningText": "10 Zen Points per \u20b9150 on shopping (apparel, jewellery, lifestyle, departmental stores) = 1.67%. 5 Zen Points per \u20b9150 on other spends = 0.83%. Capped at 6,500 points per billing cycle.",
      "expiry": "2 years from date earned",
      "joiningBonus": "1,500 Zen Points on payment of joining fee (worth \u20b9375)",
      "exclusions": "Fuel, Cash, EMI transactions. W.e.f June 2025: Wallet/Gaming, Utility, Fuel, Insurance, Govt, Rent, Education excluded from milestone calculation.",
      "calculator": {
        "tier": "premium",
        "monthlyCap": 6500,
        "capResetPeriod": "statement",
        "specialLogic": "10 Zen Points/\u20b9150 on SHOPPING CATEGORIES (Apparel, Lifestyle, Jewellery, Departmental Stores). 5 Zen Points/\u20b9150 on other spends. Monthly cap of 6,500 Zen Points (~\u20b91,625 value). Redemption: 1 Zen Point = \u20b90.25 catalog, \u20b90.20 cashback.",
        "categories": {
          "travel": {
            "rate": 0.0083,
            "label": "0.83% (5 Zen/\u20b9150)",
            "cap": 1625
          },
          "dining": {
            "rate": 0.0083,
            "label": "0.83% (5 Zen/\u20b9150)",
            "cap": 1625
          },
          "online": {
            "rate": 0.0167,
            "label": "1.67% on shopping sites (10 Zen/\u20b9150)",
            "cap": 1625
          },
          "fuel": {
            "rate": 0,
            "label": "No rewards on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.0167,
            "label": "1.67% at departmental stores (10 Zen/\u20b9150)",
            "cap": 1625
          },
          "utilities": {
            "rate": 0.0083,
            "label": "0.83% (5 Zen/\u20b9150)",
            "cap": 1625
          }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Kotak Rewards Catalog for shopping, travel, vouchers",
        "options": [
          {
            "type": "Catalog Redemption",
            "value": 0.25,
            "desc": "1 Zen Point = \u20b90.25 on shopping, travel, mobile recharge",
            "recommended": true
          },
          {
            "type": "PaybyPoints at POS",
            "value": 0.2,
            "desc": "1 Zen Point = \u20b90.20 at partner merchants",
            "recommended": false
          },
          {
            "type": "Statement Credit",
            "value": 0.2,
            "desc": "1 Zen Point = \u20b90.20 (min 2,000 points)",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "8 per year (2 per quarter, requires \u20b975K quarterly spend from June 2025)",
        "international": "3 per year (Priority Pass)",
        "accessType": "DreamFolks + Priority Pass"
      },
      "milestones": [
        {
          "spend": 300000,
          "benefit": "7,500 bonus Zen Points (\u20b91,875 value)"
        },
        {
          "spend": 600000,
          "benefit": "15,000 bonus Zen Points (\u20b93,750 value) - replaces \u20b93L milestone"
        }
      ],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 3500
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5%"
      }
    },
    "metadata": {
      "tags": [
        "Premium",
        "Shopping",
        "Lifestyle",
        "Apparel",
        "Lounge Access",
        "Milestone Rewards"
      ],
      "bestFor": "Frequent shoppers at apparel, lifestyle, and departmental stores seeking accelerated rewards",
      "rating": 3.9,
      "verdict": "An excellent shopping-focused card with 1.67% value on lifestyle purchases and solid lounge access, but the monthly cap limits high spenders.",
      "pros": [
        "1.67% value on shopping categories (apparel, lifestyle, jewellery)",
        "Domestic and international lounge access",
        "Milestone bonuses up to 15,000 points on \u20b96L spend",
        "Low \u20b91.5L spend for fee waiver",
        "Railway surcharge waiver"
      ],
      "cons": [
        "6,500 points monthly cap limits earning potential",
        "Only 0.83% on non-shopping categories",
        "International lounge limited to 3 visits",
        "3.5% forex markup",
        "Quarterly spend required for lounge access from June 2025"
      ]
    },
    "slug": "kotak-zen-signature"
  },
  {
    "id": "kotak-pvr-inox",
    "name": "Kotak PVR INOX Credit Card",
    "bank": "Kotak Mahindra Bank",
    "image": "/assets/cards/kotak-pvr-inox.png",
    "link": "https://www.kotak.com/en/personal-banking/cards/credit-cards/pvr-inox-kotak-credit-card.html",
    "fees": {
      "joining": 0,
      "annual": 499,
      "currency": "INR",
      "waivedOn": null,
      "waiverText": "No waiver available. First year joining fee free."
    },
    "eligibility": {
      "income": 300000,
      "age": {
        "min": 18,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 700
    },
    "rewards": {
      "type": "points",
      "name": "Movie Tickets (M-Coupons)",
      "baseRate": 0.03,
      "earningText": "1 free PVR INOX movie ticket (\u20b9300 value) for every \u20b910,000 spent per month. Unlimited tickets possible. 5% instant discount on PVR tickets. 20% off on F&B at PVR.",
      "expiry": "M-Coupons valid for 60 days from claim date. Must claim within 2 billing cycles.",
      "joiningBonus": "None",
      "exclusions": "Rent Payments, Wallet Funding, Online Skill-Based Gaming excluded from milestone calculation. 1% fee on Rent, Education, and on Wallet/Gaming above \u20b910K, Utility above \u20b950K, Fuel above \u20b935K monthly.",
      "calculator": {
        "tier": "co-branded",
        "monthlyCap": null,
        "capResetPeriod": "calendar",
        "specialLogic": "MOVIE TICKET MILESTONE: Earn 1 M-Coupon (worth \u20b9300) for every \u20b910,000 spent in a monthly billing cycle. No limit on tickets. E.g., \u20b975,000 spend = 7 tickets (\u20b92,100 value = 2.8%). Additional 5% off on PVR tickets and 20% off on F&B at PVR cinemas. Access to PVR INOX In-Cinema Lounges.",
        "categories": {
          "travel": {
            "rate": 0.03,
            "label": "\u20b9300 ticket per \u20b910K spend (3%)",
            "cap": null
          },
          "dining": {
            "rate": 0.03,
            "label": "\u20b9300 ticket per \u20b910K spend (3%)",
            "cap": null
          },
          "online": {
            "rate": 0.03,
            "label": "\u20b9300 ticket per \u20b910K spend (3%)",
            "cap": null
          },
          "fuel": {
            "rate": 0.03,
            "label": "\u20b9300 ticket per \u20b910K spend (3%)",
            "cap": null
          },
          "groceries": {
            "rate": 0.03,
            "label": "\u20b9300 ticket per \u20b910K spend (3%)",
            "cap": null
          },
          "utilities": {
            "rate": 0.03,
            "label": "\u20b9300 ticket per \u20b910K spend (3%)",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 300,
        "bestOption": "PVR INOX movie tickets via M-Coupons",
        "options": [
          {
            "type": "PVR Movie Ticket",
            "value": 300,
            "desc": "1 M-Coupon = \u20b9300 towards any PVR INOX movie ticket",
            "recommended": true
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "None",
        "international": "None",
        "accessType": "N/A"
      },
      "milestones": [
        {
          "spend": 10000,
          "benefit": "1 free PVR INOX ticket (\u20b9300 value) per month"
        },
        {
          "spend": 20000,
          "benefit": "2 free PVR INOX tickets per month"
        },
        {
          "spend": 100000,
          "benefit": "10 free PVR INOX tickets per month"
        }
      ],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": true,
        "text": "5% instant discount on PVR INOX tickets. 20% off on F&B. Free In-Cinema Lounge access."
      },
      "fuel": {
        "surchargeWaiver": "0%",
        "cap": 0
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5%"
      }
    },
    "metadata": {
      "tags": [
        "Co-Branded",
        "Movies",
        "Entertainment",
        "PVR INOX",
        "Low Fee",
        "Lifestyle"
      ],
      "bestFor": "Movie enthusiasts who frequently watch films at PVR INOX cinemas",
      "rating": 4,
      "verdict": "The ultimate card for PVR regulars with unlimited free tickets, instant discounts, and F&B savings. Great value if you love movies, but limited use outside entertainment.",
      "pros": [
        "Unlimited free movie tickets (\u20b9300 each per \u20b910K spend)",
        "5% instant discount on PVR tickets",
        "20% off on food and beverages at PVR",
        "Free access to PVR INOX In-Cinema Lounges",
        "No joining fee (first year)",
        "Low \u20b9499 annual fee"
      ],
      "cons": [
        "No rewards outside PVR ecosystem",
        "No airport lounge access",
        "No fuel surcharge waiver",
        "M-Coupons expire in 60 days",
        "Rent, wallet, gaming excluded from milestone",
        "Annual fee cannot be waived"
      ]
    },
    "slug": "kotak-pvr-inox"
  },
  {
    "id": "kotak-myntra",
    "name": "Kotak Myntra Credit Card",
    "bank": "Kotak Mahindra Bank",
    "image": "/assets/cards/kotak-myntra.png",
    "link": "https://www.kotak.com/en/personal-banking/cards/credit-cards/myntra-kotak-credit-card.html",
    "fees": {
      "joining": 500,
      "annual": 500,
      "currency": "INR",
      "waivedOn": 200000,
      "waiverText": "Waived on \u20b92 lakh annual spend"
    },
    "eligibility": {
      "income": 300000,
      "age": {
        "min": 18,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 700
    },
    "rewards": {
      "type": "cashback",
      "name": "Cashback",
      "baseRate": 0.0125,
      "earningText": "7.5% instant discount on Myntra (capped \u20b9750/txn). 5% cashback on Swiggy, Cleartrip, PVR, Urban Company (capped \u20b91,000/month). 1.25% cashback on all other online/offline/UPI spends.",
      "expiry": "Cashback credited within 30 days. Never expires once credited.",
      "joiningBonus": "\u20b9500 Myntra voucher on first \u20b9500+ transaction within 30 days. Complimentary Myntra Insider Select membership.",
      "exclusions": "Rent, Wallet, Fuel, Insurance, Utility, Govt, Education above \u20b970K, Online Gaming excluded from cashback. UPI cashback only on transactions \u2265\u20b92,000.",
      "calculator": {
        "tier": "co-branded",
        "monthlyCap": 1000,
        "capResetPeriod": "statement",
        "specialLogic": "DISCONTINUED as of July 10, 2025. Existing cardholders migrated to Kotak League Platinum or Zen Signature. Card features: 7.5% INSTANT DISCOUNT at Myntra checkout (max \u20b9750/transaction, unlimited transactions). 5% cashback on partner brands (Swiggy, Cleartrip, PVR, Urban Company) capped at \u20b91,000/month. 1.25% unlimited cashback on all other spends including UPI (min \u20b92,000/txn for UPI).",
        "categories": {
          "travel": {
            "rate": 0.05,
            "label": "5% on Cleartrip",
            "cap": 1000
          },
          "dining": {
            "rate": 0.05,
            "label": "5% on Swiggy/Swiggy Instamart",
            "cap": 1000
          },
          "online": {
            "rate": 0.075,
            "label": "7.5% on Myntra (max \u20b9750/txn)",
            "cap": 750
          },
          "fuel": {
            "rate": 0,
            "label": "No cashback on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.05,
            "label": "5% on Swiggy Instamart",
            "cap": 1000
          },
          "utilities": {
            "rate": 0.0125,
            "label": "1.25% base cashback",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 1,
        "bestOption": "Auto-credited cashback to statement",
        "options": [
          {
            "type": "Statement Cashback",
            "value": 1,
            "desc": "Cashback auto-credited within 30 days",
            "recommended": true
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "4 per year (1 per quarter)",
        "international": "None",
        "accessType": "DreamFolks"
      },
      "milestones": [
        {
          "spend": 50000,
          "benefit": "2 complimentary PVR tickets (\u20b9250 each) quarterly"
        }
      ],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": true,
        "text": "5% cashback at PVR. 2 free PVR tickets on \u20b950K quarterly spend."
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 3500
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5%"
      }
    },
    "metadata": {
      "tags": [
        "Co-Branded",
        "Shopping",
        "Myntra",
        "Cashback",
        "Fashion",
        "Lifestyle",
        "DISCONTINUED"
      ],
      "bestFor": "Frequent Myntra shoppers seeking instant checkout discounts (CARD DISCONTINUED)",
      "rating": 4.1,
      "verdict": "DISCONTINUED (July 2025). Was an excellent co-branded card with highest 7.5% Myntra discount and strong partner cashback. Existing cardholders migrated to League Platinum or Zen Signature.",
      "pros": [
        "7.5% instant discount on Myntra (highest among fashion cards)",
        "5% cashback on Swiggy, Cleartrip, PVR, Urban Company",
        "1.25% unlimited base cashback including UPI",
        "Complimentary Myntra Insider membership",
        "Low \u20b9500 annual fee with \u20b92L waiver option",
        "Quarterly PVR tickets on milestone"
      ],
      "cons": [
        "CARD DISCONTINUED from July 10, 2025",
        "Partner cashback capped at \u20b91,000/month",
        "Myntra discount capped at \u20b9750/transaction",
        "UPI cashback only on \u20b92,000+ transactions",
        "Limited to 4 domestic lounge visits",
        "No international lounge access"
      ]
    },
    "slug": "kotak-myntra"
  },
  {
    "id": "indusind-indulge",
    "name": "IndusInd Indulge Credit Card",
    "bank": "IndusInd Bank",
    "image": "/assets/cards/indusind-indulge.png",
    "link": "https://www.indusind.com/in/en/personal/cards/credit-card/indulge-credit-card.html",
    "fees": {
      "joining": 75000,
      "annual": 10000,
      "currency": "INR",
      "waivedOn": 1000000,
      "waiverText": "Annual fee waived on \u20b910 Lakh annual spend. Multiple joining fee options available (\u20b975K with vouchers, \u20b915K without, or LTF for select customers)"
    },
    "eligibility": {
      "income": 3600000,
      "age": {
        "min": 21,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 750
    },
    "rewards": {
      "type": "points",
      "name": "Reward Points",
      "baseRate": 0.015,
      "earningText": "1.5 RP per \u20b9100 spent on all categories. 0.7 RP per \u20b9100 on utilities, insurance, govt, education",
      "expiry": "Never Expires (while card active)",
      "joiningBonus": "Welcome vouchers from Oberoi Hotels, Postcard Hotel, Vouchagram, or Luxe Gift Card worth joining fee value",
      "exclusions": "Fuel (no RP), Rent capped at 500 RP/cycle, Reduced rate on Utility, Insurance, Govt, Education",
      "calculator": {
        "tier": "super-premium",
        "monthlyCap": 10000,
        "capResetPeriod": "calendar",
        "specialLogic": "No pre-set spending limit (NPSL). Max 10,000 RP cash redemption per month",
        "categories": {
          "travel": {
            "rate": 0.015,
            "label": "1.5% (1.5 RP/\u20b9100)",
            "cap": null
          },
          "dining": {
            "rate": 0.015,
            "label": "1.5% (1.5 RP/\u20b9100)",
            "cap": null
          },
          "online": {
            "rate": 0.015,
            "label": "1.5% (1.5 RP/\u20b9100)",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No RP (Surcharge waiver only)",
            "cap": null
          },
          "groceries": {
            "rate": 0.015,
            "label": "1.5% (1.5 RP/\u20b9100)",
            "cap": null
          },
          "utilities": {
            "rate": 0.007,
            "label": "0.7% (0.7 RP/\u20b9100)",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 1,
        "bestOption": "Redeem against cash credit at 1 RP = \u20b91",
        "options": [
          {
            "type": "Cash Credit",
            "value": 1,
            "desc": "1 RP = \u20b91",
            "recommended": true
          },
          {
            "type": "KrisFlyer Miles",
            "value": 0.5,
            "desc": "200 RP = 100 KrisFlyer Miles",
            "recommended": false
          },
          {
            "type": "IndusMoments Catalogue",
            "value": 1,
            "desc": "Products & vouchers at 1 RP = \u20b91",
            "recommended": true
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "6 per quarter (via Visa)",
        "international": "4 per quarter (Priority Pass). Unlimited outside India",
        "accessType": "Priority Pass + Visa"
      },
      "milestones": [],
      "golf": {
        "included": true,
        "text": "Unlimited complimentary golf games and lessons at select premium clubs across India"
      },
      "movies": {
        "included": true,
        "text": "BOGO on BookMyShow (3x/month, max \u20b9700 per free ticket + \u20b950 off F&B)"
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 400
      },
      "forex": {
        "markup": 0.018,
        "text": "1.8% + GST"
      },
      "dining": {
        "included": true,
        "text": "\u20b93,000 off on dining at 100+ restaurants via EazyDiner, twice a year"
      },
      "concierge": {
        "included": true,
        "text": "24x7 concierge services for travel, dining, entertainment bookings"
      },
      "insurance": {
        "included": true,
        "text": "Air Accident Cover up to \u20b92.5 Crore, Total Protect for fraud protection"
      }
    },
    "metadata": {
      "tags": [
        "Super-Premium",
        "Invite-Only",
        "22K Gold Inlay",
        "Unlimited Lounge",
        "NPSL",
        "Luxury"
      ],
      "bestFor": "HNIs seeking luxury lifestyle benefits with 22K gold inlay card and unlimited international lounge access",
      "rating": 3.8,
      "verdict": "Premium lifestyle card with iconic design and strong lounge benefits, but reward rate is low for the segment",
      "pros": [
        "22K gold inlay - unique design statement",
        "1 RP = \u20b91 cash redemption value",
        "Unlimited international lounge access outside India",
        "No pre-set spending limit (NPSL)",
        "Low forex markup of 1.8%",
        "Unlimited golf access"
      ],
      "cons": [
        "Very high joining fee (\u20b975,000 standard)",
        "Low reward rate of 1.5% vs competitors at 3-5%",
        "No milestone benefits for high spenders",
        "Domestic lounge visits with Priority Pass charged ($27)",
        "Income eligibility of \u20b936L+ is restrictive"
      ]
    },
    "slug": "indusind-indulge"
  },
  {
    "id": "indusind-pinnacle",
    "name": "IndusInd Pinnacle World Credit Card",
    "bank": "IndusInd Bank",
    "image": "/assets/cards/indusind-pinnacle.png",
    "link": "https://www.indusind.com/in/en/personal/cards/credit-card/pinnacle-world-credit-card.html",
    "fees": {
      "joining": 15000,
      "annual": 0,
      "currency": "INR",
      "waivedOn": null,
      "waiverText": "Lifetime free from 2nd year. Joining fee offset by welcome vouchers worth \u20b915,000"
    },
    "eligibility": {
      "income": 1000000,
      "age": {
        "min": 21,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 750
    },
    "rewards": {
      "type": "points",
      "name": "Reward Points",
      "baseRate": 0.01,
      "earningText": "2.5 RP per \u20b9100 on online spends, 1.5 RP on travel/airlines, 1 RP on offline, 0.7 RP on utilities",
      "expiry": "Never Expires",
      "joiningBonus": "Choice of: Oberoi Hotel stay voucher, Postcard Hotel voucher, Montblanc voucher, Luxe Gift Card \u20b95,000, or brand vouchers (Bata, Pantaloons, etc.)",
      "exclusions": "Fuel (no RP), Rent capped at 500 RP/cycle, Reduced rate on Utility, Insurance, Govt, Education",
      "calculator": {
        "tier": "premium",
        "monthlyCap": 7500,
        "capResetPeriod": "calendar",
        "specialLogic": "Max 7,500 RP cash redemption per month. Golf requires \u20b925,000 spend in previous month",
        "categories": {
          "travel": {
            "rate": 0.015,
            "label": "1.5% (1.5 RP/\u20b9100 on online travel)",
            "cap": null
          },
          "dining": {
            "rate": 0.01,
            "label": "1% (1 RP/\u20b9100)",
            "cap": null
          },
          "online": {
            "rate": 0.025,
            "label": "2.5% (2.5 RP/\u20b9100 on e-commerce)",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No RP (Surcharge waiver only)",
            "cap": null
          },
          "groceries": {
            "rate": 0.01,
            "label": "1% (1 RP/\u20b9100)",
            "cap": null
          },
          "utilities": {
            "rate": 0.007,
            "label": "0.7% (0.7 RP/\u20b9100)",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.75,
        "bestOption": "Cash credit at 1 RP = \u20b90.75, making effective value-back ~1.87% on online spends",
        "options": [
          {
            "type": "Cash Credit",
            "value": 0.75,
            "desc": "1 RP = \u20b90.75",
            "recommended": true
          },
          {
            "type": "KrisFlyer Miles",
            "value": 0.5,
            "desc": "200 RP = 100 KrisFlyer Miles",
            "recommended": false
          },
          {
            "type": "IndusMoments Catalogue",
            "value": 0.75,
            "desc": "Products & vouchers",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "1 per quarter (Mastercard)",
        "international": "1 per quarter (Priority Pass)",
        "accessType": "Priority Pass + Mastercard"
      },
      "milestones": [],
      "golf": {
        "included": true,
        "text": "1 complimentary golf game + 1 lesson per month (requires \u20b925,000 spend in previous month)"
      },
      "movies": {
        "included": true,
        "text": "BOGO on BookMyShow (3x/month, max \u20b9200 per free ticket)"
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 200
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5% + GST"
      },
      "concierge": {
        "included": true,
        "text": "24x7 Legend Concierge Services"
      },
      "insurance": {
        "included": true,
        "text": "Air Accident Cover \u20b925 Lakh, Total Protect, Auto Assist, Travel Insurance"
      },
      "exclusiveAccount": {
        "included": true,
        "text": "Complimentary IndusInd Exclusive Savings Account with zero AMB"
      }
    },
    "metadata": {
      "tags": [
        "Premium",
        "Online Shopping",
        "Lifetime Free",
        "Golf",
        "Good Cashback"
      ],
      "bestFor": "Online shoppers seeking 2.5% value-back on e-commerce with no annual fee and premium lifestyle benefits",
      "rating": 4,
      "verdict": "Solid premium card for online shoppers with good cashback redemption and lifetime free structure",
      "pros": [
        "Lifetime free from 2nd year (no annual fee)",
        "2.5 RP on online spends = ~1.87% effective cashback",
        "Welcome vouchers worth the joining fee",
        "Complimentary zero-AMB IndusInd Exclusive Account",
        "Golf benefits included",
        "Good lounge access for both domestic and international"
      ],
      "cons": [
        "High forex markup of 3.5%",
        "Only 1 lounge visit per quarter (domestic & international each)",
        "7,500 RP monthly cap on cash redemption",
        "Golf benefit requires \u20b925K spend in previous month",
        "Low 0.7% on utilities reduces overall value"
      ]
    },
    "slug": "indusind-pinnacle"
  },
  {
    "id": "indusind-legend",
    "name": "IndusInd Legend Credit Card",
    "bank": "IndusInd Bank",
    "image": "/assets/cards/indusind-legend.png",
    "link": "https://www.indusind.com/in/en/personal/cards/credit-card/legend-credit-card.html",
    "fees": {
      "joining": 0,
      "annual": 0,
      "currency": "INR",
      "waivedOn": null,
      "waiverText": "Lifetime Free (LTF). Paid variants available at \u20b95,000-\u20b99,999 with welcome vouchers"
    },
    "eligibility": {
      "income": 600000,
      "age": {
        "min": 18,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 700
    },
    "rewards": {
      "type": "points",
      "name": "Reward Points",
      "baseRate": 0.01,
      "earningText": "1 RP per \u20b9100 on weekdays, 2 RP per \u20b9100 on weekends. 0.7 RP on utilities, medical, auto, telecom",
      "expiry": "Never Expires (while card active)",
      "joiningBonus": "Welcome vouchers from top brands (only on paid variants). 3,000 bonus RP on \u20b95 Lakh annual spend milestone",
      "exclusions": "Fuel (no RP), Rent/Wallet/Utility/Insurance not counted for milestone",
      "calculator": {
        "tier": "entry",
        "monthlyCap": 5000,
        "capResetPeriod": "calendar",
        "specialLogic": "Weekend vs weekday earning structure. Max 5,000 RP cash redemption per month. Milestone: 3,000 bonus RP on \u20b95L annual spend",
        "categories": {
          "travel": {
            "rate": 0.01,
            "label": "1% weekdays / 2% weekends",
            "cap": null
          },
          "dining": {
            "rate": 0.01,
            "label": "1% weekdays / 2% weekends",
            "cap": null
          },
          "online": {
            "rate": 0.01,
            "label": "1% weekdays / 2% weekends",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No RP (Surcharge waiver only)",
            "cap": null
          },
          "groceries": {
            "rate": 0.01,
            "label": "1% weekdays / 2% weekends",
            "cap": null
          },
          "utilities": {
            "rate": 0.007,
            "label": "0.7% (reduced rate)",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.5,
        "bestOption": "Cash credit at 1 RP = \u20b90.50 (effective ~0.5-1% value-back)",
        "options": [
          {
            "type": "Cash Credit",
            "value": 0.5,
            "desc": "1 RP = \u20b90.50 (devalued from Mar 2024)",
            "recommended": true
          },
          {
            "type": "Non-Cash Redemption",
            "value": 0.75,
            "desc": "1 RP = \u20b90.75 for vouchers/products",
            "recommended": false
          },
          {
            "type": "KrisFlyer Miles",
            "value": 0.5,
            "desc": "200 RP = 100 KrisFlyer Miles",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "DISCONTINUED (eff. 7 March 2025)",
        "international": "DISCONTINUED (eff. 7 March 2025)",
        "accessType": "None - Previously Priority Pass"
      },
      "milestones": [
        {
          "spend": 500000,
          "benefit": "3,000 bonus Reward Points on \u20b95 Lakh annual spend"
        }
      ],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": true,
        "text": "BOGO on BookMyShow (1x/month, max \u20b9200 per free ticket + \u20b950 off F&B)"
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 100
      },
      "forex": {
        "markup": 0.018,
        "text": "1.8% + GST (one of the lowest in market)"
      },
      "concierge": {
        "included": true,
        "text": "24x7 Legend Concierge Services"
      },
      "insurance": {
        "included": true,
        "text": "Air Accident Cover \u20b925 Lakh, Total Protect, Auto Assist, Lost Baggage \u20b91L, Lost Ticket \u20b925K"
      }
    },
    "metadata": {
      "tags": [
        "Lifetime Free",
        "Entry-Level",
        "Low Forex",
        "Weekend Rewards",
        "Insurance"
      ],
      "bestFor": "First-time credit card users seeking LTF card with low forex markup and basic travel insurance benefits",
      "rating": 3.2,
      "verdict": "Decent LTF option with low forex and insurance, but devalued rewards and removed lounge access hurt its appeal",
      "pros": [
        "Lifetime free - no joining or annual fee",
        "Low forex markup of 1.8% (excellent for international use)",
        "Comprehensive travel insurance coverage",
        "2x rewards on weekends incentivizes planned spending",
        "No cash advance fee (rare benefit)",
        "Milestone bonus of 3,000 RP on \u20b95L spend"
      ],
      "cons": [
        "Lounge access DISCONTINUED from March 2025",
        "Low reward rate (0.5-1% effective value)",
        "Cash redemption devalued to 1 RP = \u20b90.50",
        "Only 1 BOGO movie per month",
        "No dining or golf benefits",
        "5,000 RP monthly cap on cash redemption"
      ]
    },
    "slug": "indusind-legend"
  },
  {
    "id": "indusind-club-vistara-explorer",
    "name": "Club Vistara IndusInd Bank Explorer Credit Card",
    "bank": "IndusInd Bank",
    "image": "/assets/cards/indusind-club-vistara-explorer.png",
    "link": "https://www.indusind.com/in/en/personal/cards/credit-card/club-vistara-indusInd-bank-explorer-credit-card.html",
    "fees": {
      "joining": 40000,
      "annual": 10000,
      "currency": "INR",
      "waivedOn": null,
      "waiverText": "No waiver. Note: Program being revised due to Vistara-Air India merger (eff. Nov 2024)"
    },
    "eligibility": {
      "income": 1500000,
      "age": {
        "min": 21,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 750
    },
    "rewards": {
      "type": "points",
      "name": "Club Vistara Points",
      "baseRate": 0.01,
      "earningText": "8 CV Points per \u20b9200 on Vistara website, 6 CV on travel/airlines/hotels, 2 CV elsewhere, 1 CV on utilities/fuel/insurance",
      "expiry": "As per Club Vistara program rules",
      "joiningBonus": "Complimentary CV Gold membership (1st year), Business Class ticket voucher (base fare waiver), Gift vouchers worth \u20b925,000 (Luxe/Oberoi/Postcard)",
      "exclusions": "Reduced CV Points on utilities, fuel, insurance categories",
      "calculator": {
        "tier": "co-branded",
        "monthlyCap": null,
        "capResetPeriod": "statement",
        "specialLogic": "CV Points earned only up to assigned credit limit per cycle. Business class voucher on \u20b93L spend milestone (max 5 per year)",
        "categories": {
          "travel": {
            "rate": 0.03,
            "label": "3% (6 CV/\u20b9200 = ~\u20b93/\u20b9100)",
            "cap": null
          },
          "dining": {
            "rate": 0.01,
            "label": "1% (2 CV/\u20b9200)",
            "cap": null
          },
          "online": {
            "rate": 0.01,
            "label": "1% (2 CV/\u20b9200)",
            "cap": null
          },
          "fuel": {
            "rate": 0.005,
            "label": "0.5% (1 CV/\u20b9200)",
            "cap": null
          },
          "groceries": {
            "rate": 0.01,
            "label": "1% (2 CV/\u20b9200)",
            "cap": null
          },
          "utilities": {
            "rate": 0.005,
            "label": "0.5% (1 CV/\u20b9200)",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 1,
        "bestOption": "Redeem CV Points for Vistara/Air India flights. Business class voucher on \u20b93L spend",
        "options": [
          {
            "type": "Vistara Flights",
            "value": 1,
            "desc": "CV Points for award flights on Vistara network",
            "recommended": true
          },
          {
            "type": "Business Class Voucher",
            "value": 21500,
            "desc": "\u20b93L spend = 1 Business Class voucher (~\u20b921,500 value)",
            "recommended": true
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "1 per quarter",
        "international": "4 per quarter (Priority Pass)",
        "accessType": "Priority Pass"
      },
      "milestones": [
        {
          "spend": 300000,
          "benefit": "1 Complimentary Business Class ticket voucher"
        },
        {
          "spend": 600000,
          "benefit": "2 Business Class vouchers (cumulative)"
        },
        {
          "spend": 900000,
          "benefit": "3 Business Class vouchers (cumulative)"
        },
        {
          "spend": 1200000,
          "benefit": "4 Business Class vouchers (cumulative)"
        },
        {
          "spend": 1500000,
          "benefit": "5 Business Class vouchers (max per year)"
        }
      ],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": true,
        "text": "BOGO on BookMyShow (2x/month, max \u20b9700 per free ticket)"
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 200
      },
      "forex": {
        "markup": 0.018,
        "text": "1.8% + GST (revised from 0% eff. Nov 2024)"
      },
      "dining": {
        "included": true,
        "text": "\u20b93,000 off dining at EazyDiner partner restaurants twice a year"
      },
      "concierge": {
        "included": true,
        "text": "24x7 concierge services for travel assistance"
      },
      "insurance": {
        "included": true,
        "text": "Air Accident Cover \u20b92.5 Crore, Total Protect, Travel Insurance"
      },
      "specialFeatures": {
        "noLateFee": true,
        "noOverLimitFee": true,
        "noCashAdvanceFee": true,
        "vistaraGold": "Complimentary CV Gold membership (1st year): Priority check-in, boarding, baggage"
      }
    },
    "metadata": {
      "tags": [
        "Co-branded",
        "Travel",
        "Vistara",
        "Business Class",
        "Premium",
        "Being Revised"
      ],
      "bestFor": "Frequent Vistara flyers seeking premium travel benefits and business class vouchers through milestone spends",
      "rating": 3.5,
      "verdict": "Strong for Vistara loyalists with excellent milestone benefits, but high fees and program uncertainty due to merger",
      "pros": [
        "Business Class vouchers on milestone spends (up to 5/year)",
        "Complimentary CV Gold membership benefits",
        "8 CV Points on Vistara bookings (4% effective)",
        "No late payment, over-limit, or cash advance fees",
        "Good international lounge access (4/quarter)",
        "Welcome vouchers worth \u20b925,000"
      ],
      "cons": [
        "Very high joining fee of \u20b940,000 + GST",
        "Annual fee of \u20b910,000 with no waiver",
        "Program being revised due to Vistara-Air India merger",
        "Low CV Points on non-travel categories",
        "Only 1 domestic lounge visit per quarter",
        "CV Gold membership only for 1st year"
      ]
    },
    "slug": "indusind-club-vistara-explorer"
  },
  {
    "id": "indusind-eazydiner-platinum",
    "name": "EazyDiner IndusInd Bank Platinum Credit Card",
    "bank": "IndusInd Bank",
    "image": "/assets/cards/indusind-eazydiner-platinum.png",
    "link": "https://www.indusind.com/in/en/personal/cards/credit-card/eazydiner-platinum-credit-card.html",
    "fees": {
      "joining": 0,
      "annual": 0,
      "currency": "INR",
      "waivedOn": null,
      "waiverText": "Lifetime Free credit card"
    },
    "eligibility": {
      "income": 300000,
      "age": {
        "min": 21,
        "max": 60
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 700
    },
    "rewards": {
      "type": "points",
      "name": "Reward Points + EazyPoints",
      "baseRate": 0.02,
      "earningText": "2 RP per \u20b9100 spent (except fuel, insurance, rent, utility, govt). 0.7 RP on excluded categories. 2X EazyPoints on EazyDiner transactions",
      "expiry": "1 year for EazyPoints, RP never expire",
      "joiningBonus": "3-month EazyDiner Prime membership worth \u20b91,095, 500 bonus EazyPoints",
      "exclusions": "Fuel, Insurance, Rent, Utility, Government - earn only 0.7 RP/\u20b9100",
      "calculator": {
        "tier": "entry",
        "monthlyCap": null,
        "capResetPeriod": "calendar",
        "specialLogic": "Prime membership renewed for 3 months on \u20b930,000 quarterly spend. 2,000 bonus RP on \u20b930K spend every 90 days",
        "categories": {
          "travel": {
            "rate": 0.02,
            "label": "2% (2 RP/\u20b9100)",
            "cap": null
          },
          "dining": {
            "rate": 0.02,
            "label": "2% + 25% off via PayEazy + additional 20%",
            "cap": null
          },
          "online": {
            "rate": 0.02,
            "label": "2% (2 RP/\u20b9100)",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No RP (Surcharge waiver only)",
            "cap": null
          },
          "groceries": {
            "rate": 0.02,
            "label": "2% (2 RP/\u20b9100)",
            "cap": null
          },
          "utilities": {
            "rate": 0.007,
            "label": "0.7% (0.7 RP/\u20b9100)",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.1,
        "bestOption": "Redeem RP instantly against restaurant bills via PayEazy on EazyDiner app",
        "options": [
          {
            "type": "Restaurant Bills",
            "value": 0.1,
            "desc": "Instant redemption via PayEazy",
            "recommended": true
          },
          {
            "type": "EazyPoints Redemption",
            "value": 1,
            "desc": "Free hotel stays, meals, exclusive events",
            "recommended": true
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "None",
        "international": "None",
        "accessType": "Not available"
      },
      "milestones": [
        {
          "spend": 30000,
          "benefit": "3-month EazyDiner Prime renewal + 2,000 Bonus RP (every 90 days)"
        }
      ],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 100
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5% + GST"
      },
      "dining": {
        "included": true,
        "text": "25% off on dining via EazyDiner Prime at 2,000+ restaurants. Additional 20% off (up to \u20b9500) when paying via PayEazy on EazyDiner app",
        "prime": "3-month EazyDiner Prime membership included (renewed on \u20b930K quarterly spend)",
        "discount": "Up to 45% total discount on dining"
      },
      "insurance": {
        "included": true,
        "text": "Total Protect fraud coverage"
      }
    },
    "metadata": {
      "tags": [
        "Lifetime Free",
        "Dining",
        "Co-branded",
        "EazyDiner",
        "Entry-Level"
      ],
      "bestFor": "Foodies who frequently dine out and want lifetime free card with guaranteed 25-45% dining discounts",
      "rating": 3.8,
      "verdict": "Excellent lifetime free dining card with substantial restaurant discounts via EazyDiner ecosystem",
      "pros": [
        "Lifetime free - no joining or annual fee",
        "25% base + 20% extra = up to 45% off on dining via PayEazy",
        "Complimentary EazyDiner Prime membership",
        "2X EazyPoints on all EazyDiner transactions",
        "Milestone benefits with 2,000 bonus RP on \u20b930K spend",
        "Prime membership auto-renews on maintaining spend"
      ],
      "cons": [
        "No lounge access",
        "No movie benefits",
        "Low redemption value of RP (\u20b90.10 per point)",
        "High forex markup of 3.5%",
        "Dining discount only via EazyDiner app PayEazy",
        "Not useful for non-diners"
      ]
    },
    "slug": "indusind-eazydiner-platinum"
  },
  {
    "id": "indusind-platinum-aura-edge",
    "name": "IndusInd Platinum Aura Edge Credit Card",
    "bank": "IndusInd Bank",
    "image": "/assets/cards/indusind-platinum-aura-edge.png",
    "link": "https://www.indusind.com/in/en/personal/cards/credit-card/platinum-aura-edge-visa-and-mastercard-credit-card-easy-credit.html",
    "fees": {
      "joining": 0,
      "annual": 0,
      "currency": "INR",
      "waivedOn": null,
      "waiverText": "Lifetime Free. Some variants have \u20b9500 joining fee"
    },
    "eligibility": {
      "income": 300000,
      "age": {
        "min": 18,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 700
    },
    "rewards": {
      "type": "points",
      "name": "Savings Points (Reward Points)",
      "baseRate": 0.005,
      "earningText": "Choose from 4 reward plans (Shop/Home/Travel/Party). Up to 4 SP per \u20b9100 on select categories, 0.5 SP on others",
      "expiry": "Never Expires",
      "joiningBonus": "Welcome discount vouchers from Amazon, Flipkart, Big Bazaar, Zee5, Apollo Pharmacy, Bata, Vero Moda, etc.",
      "exclusions": "Fuel (no RP). Plan categories outside chosen plan earn base 0.5 SP rate",
      "calculator": {
        "tier": "entry",
        "monthlyCap": 2500,
        "capResetPeriod": "calendar",
        "specialLogic": "Choose 1 of 4 plans (Shop/Home/Travel/Party). Can change plan after 6 months. Max 2,500 SP cash redemption per month",
        "categories": {
          "travel": {
            "rate": 0.02,
            "label": "Up to 4 SP/\u20b9100 (Travel Plan)",
            "cap": null
          },
          "dining": {
            "rate": 0.02,
            "label": "Up to 4 SP/\u20b9100 (Party Plan)",
            "cap": null
          },
          "online": {
            "rate": 0.02,
            "label": "Up to 4 SP/\u20b9100 (Shop Plan)",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No RP (Surcharge waiver only)",
            "cap": null
          },
          "groceries": {
            "rate": 0.02,
            "label": "Up to 4 SP/\u20b9100 (Home/Shop Plan)",
            "cap": null
          },
          "utilities": {
            "rate": 0.005,
            "label": "0.5 SP/\u20b9100",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.4,
        "bestOption": "Cash credit at 1 SP = \u20b90.40 or non-cash at 1 SP = \u20b90.50",
        "options": [
          {
            "type": "Cash Credit",
            "value": 0.4,
            "desc": "1 SP = \u20b90.40",
            "recommended": true
          },
          {
            "type": "Non-Cash Redemption",
            "value": 0.5,
            "desc": "1 SP = \u20b90.50 for vouchers/products",
            "recommended": false
          },
          {
            "type": "KrisFlyer Miles",
            "value": 0.5,
            "desc": "100 SP = 100 KrisFlyer Miles (max 10,000/month)",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "None",
        "international": "None",
        "accessType": "Not available"
      },
      "milestones": [],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 100
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5% + GST"
      },
      "insurance": {
        "included": true,
        "text": "Air Accident Cover \u20b925 Lakh, Total Protect, Travel Insurance (delayed/lost baggage, passport, ticket)"
      },
      "contactless": {
        "included": true,
        "text": "Tap and pay for transactions up to \u20b95,000"
      }
    },
    "metadata": {
      "tags": [
        "Lifetime Free",
        "Entry-Level",
        "Customizable Rewards",
        "Contactless",
        "Beginner"
      ],
      "bestFor": "First-time credit card users seeking LTF card with customizable reward plans based on spending habits",
      "rating": 3,
      "verdict": "Basic entry-level LTF card with unique customizable reward plans but limited travel/lifestyle benefits",
      "pros": [
        "Lifetime free - no joining or annual fee",
        "Unique 4-plan reward structure for customization",
        "Up to 4 SP/\u20b9100 on chosen plan categories (~1.6% value)",
        "Welcome vouchers from popular brands",
        "Travel insurance included",
        "Contactless payments supported"
      ],
      "cons": [
        "No lounge access",
        "No movie or golf benefits",
        "Low base rate of 0.5 SP on non-plan categories",
        "Cash redemption value only \u20b90.40 per point",
        "High forex markup of 3.5%",
        "2,500 SP monthly cap on cash redemption",
        "Can only change reward plan after 6 months"
      ]
    },
    "slug": "indusind-platinum-aura-edge"
  },
  {
    "id": "rbl-world-safari",
    "name": "RBL World Safari Credit Card",
    "bank": "RBL Bank",
    "image": "/assets/cards/rbl-world-safari.png",
    "link": "https://www.rblbank.com/personal-banking/cards/credit-cards/world-safari-credit-card",
    "fees": {
      "joining": 3000,
      "annual": 3000,
      "currency": "INR",
      "waivedOn": null,
      "waiverText": "No annual fee waiver mentioned; contact bank for retention offers"
    },
    "eligibility": {
      "income": 300000,
      "age": {
        "min": 21,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 700
    },
    "rewards": {
      "type": "points",
      "name": "Travel Points",
      "baseRate": 0.005,
      "earningText": "2 Travel Points per \u20b9100 on domestic spends (0.5% value back)",
      "expiry": "2 Years",
      "joiningBonus": "MakeMyTrip voucher worth \u20b93,000 on first transaction within 30 days",
      "exclusions": "International transactions, Fuel, Utilities, Insurance, Quasi-Cash, Railways, Real Estate, Education, Wallet loads, Govt Services, EMI conversions",
      "calculator": {
        "tier": "premium",
        "monthlyCap": null,
        "capResetPeriod": "calendar",
        "specialLogic": "NO reward points on international transactions despite 0% forex. 2.5X (5 RP/\u20b9100) on travel spends only.",
        "categories": {
          "travel": {
            "rate": 0.0125,
            "label": "5 TP/\u20b9100 (2.5X) on travel",
            "cap": null
          },
          "dining": {
            "rate": 0.005,
            "label": "2 TP/\u20b9100 base rate",
            "cap": null
          },
          "online": {
            "rate": 0.005,
            "label": "2 TP/\u20b9100 base rate",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No reward points on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.005,
            "label": "2 TP/\u20b9100 base rate",
            "cap": null
          },
          "utilities": {
            "rate": 0,
            "label": "No reward points on utilities",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Redeem for flight/hotel bookings via RBL Rewards portal",
        "options": [
          {
            "type": "Air Travel",
            "value": 0.25,
            "desc": "1 TP = \u20b90.25",
            "recommended": true
          },
          {
            "type": "Hotel Stays",
            "value": 0.25,
            "desc": "1 TP = \u20b90.25",
            "recommended": true
          },
          {
            "type": "Shopping Vouchers",
            "value": 0.25,
            "desc": "1 TP = \u20b90.25",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "2 per quarter (spend \u20b935,000 in previous quarter from July 2025)",
        "international": "2 per year (Priority Pass) + 1 extra on \u20b950K quarterly spend",
        "accessType": "MasterCard/Visa India Lounge + Priority Pass"
      },
      "milestones": [
        {
          "spend": 250000,
          "benefit": "10,000 bonus Travel Points"
        },
        {
          "spend": 500000,
          "benefit": "Additional 15,000 bonus Travel Points"
        },
        {
          "spend": 750000,
          "benefit": "\u20b910,000 voucher (Taj/Amazon/Croma/Myntra/MMT)"
        }
      ],
      "golf": {
        "included": true,
        "text": "4 complimentary green fee rounds/year + 1 free golf lesson/month (MasterCard only)"
      },
      "movies": {
        "included": false,
        "text": "No movie benefits"
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 250
      },
      "forex": {
        "markup": 0,
        "text": "0% Forex Markup - India's first retail card with zero forex markup"
      },
      "insurance": {
        "included": true,
        "text": "Complimentary international travel insurance covering trip delay, baggage loss, passport loss, dental treatment, personal liability"
      },
      "concierge": {
        "included": true,
        "text": "24x7 Concierge Desk for golf, hotel, dining, spa reservations"
      }
    },
    "metadata": {
      "tags": [
        "Travel",
        "Zero Forex",
        "International",
        "Priority Pass",
        "Golf"
      ],
      "bestFor": "International travelers seeking 0% forex markup and travel-focused rewards",
      "rating": 4.5,
      "verdict": "Best-in-class card for international spends with zero forex markup, though no reward points on foreign transactions",
      "pros": [
        "0% forex markup on all international transactions",
        "Complimentary international travel insurance",
        "Priority Pass membership with 2 free international lounge visits",
        "2.5X rewards on travel spends",
        "MMT voucher worth \u20b93,000 as welcome benefit"
      ],
      "cons": [
        "NO reward points earned on international transactions",
        "Annual fee of \u20b93,000 with no waiver option",
        "Lounge access now requires \u20b935K quarterly spend",
        "Low base reward rate of 0.5%"
      ]
    },
    "slug": "rbl-world-safari"
  },
  {
    "id": "rbl-insignia-preferred-banking",
    "name": "RBL Insignia Preferred Banking World Credit Card",
    "bank": "RBL Bank",
    "image": "/assets/cards/rbl-insignia-preferred.png",
    "link": "https://www.rblbank.com/personal-banking/cards/credit-cards/insignia-preferred-banking-credit-card",
    "fees": {
      "joining": 7000,
      "annual": 7000,
      "currency": "INR",
      "waivedOn": 1000000,
      "waiverText": "Waived on \u20b910L annual spend; FREE for Insignia Preferred Banking customers"
    },
    "eligibility": {
      "income": 3000000,
      "age": {
        "min": 21,
        "max": 65
      },
      "type": "Insignia Preferred Banking Customers / HNIs",
      "creditScore": 750,
      "specialCriteria": "Insignia Banking: \u20b930L TRV or \u20b910L AMB in Current Account"
    },
    "rewards": {
      "type": "points",
      "name": "Reward Points",
      "baseRate": 0.0125,
      "earningText": "5 RP per \u20b9100 on domestic (1.25%), 10 RP per \u20b9100 on international (2.5%)",
      "expiry": "2 Years",
      "joiningBonus": "28,000 Reward Points on first transaction within 30 days (Not applicable for Insignia Banking customers)",
      "exclusions": "Fuel, Utilities, Insurance, Quasi-Cash, Railways, Real Estate, Education, Wallet loads, Govt Services, EMI conversions",
      "calculator": {
        "tier": "super-premium",
        "monthlyCap": null,
        "capResetPeriod": "calendar",
        "specialLogic": "2X rewards on international transactions. Invite-only for Insignia Preferred Banking members or \u20b97K fee for others.",
        "categories": {
          "travel": {
            "rate": 0.0125,
            "label": "5 RP/\u20b9100 domestic",
            "cap": null
          },
          "dining": {
            "rate": 0.0125,
            "label": "5 RP/\u20b9100 domestic",
            "cap": null
          },
          "online": {
            "rate": 0.0125,
            "label": "5 RP/\u20b9100 domestic",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No reward points on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.0125,
            "label": "5 RP/\u20b9100 domestic",
            "cap": null
          },
          "utilities": {
            "rate": 0,
            "label": "No reward points on utilities",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Redeem for flights, hotels, or vouchers via RBL Rewards",
        "options": [
          {
            "type": "Air Travel",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": true
          },
          {
            "type": "Hotel Stays",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": true
          },
          {
            "type": "Shopping Vouchers",
            "value": 0.25,
            "desc": "Various brands available",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "2 per quarter via MasterCard Lounge Program",
        "international": "6 per year via Priority Pass membership",
        "accessType": "MasterCard Lounge + Priority Pass"
      },
      "milestones": [
        {
          "spend": 800000,
          "benefit": "\u20b98,000 vouchers from Taj/Amazon/Croma/Myntra/MakeMyTrip"
        }
      ],
      "golf": {
        "included": true,
        "text": "4 complimentary green fee rounds/year + 1 golf lesson/month (MasterCard only)"
      },
      "movies": {
        "included": true,
        "text": "Flat \u20b9500 off on BookMyShow twice per month"
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 250
      },
      "forex": {
        "markup": 0.015,
        "text": "1.5% forex markup (lower than standard 3.5%)"
      },
      "concierge": {
        "included": true,
        "text": "24x7 Concierge Desk via Aspire Lifestyles (+91 22 6115 6300)"
      },
      "dining": {
        "included": true,
        "text": "25-50% off + 1+1 Buffet via EazyDiner Prime at premium restaurants"
      },
      "hotels": {
        "included": true,
        "text": "Marriott, Accor, IHG, Shangri-La benefits - early check-in, late checkout, upgrades, breakfast"
      }
    },
    "metadata": {
      "tags": [
        "Super Premium",
        "Invite Only",
        "HNI",
        "Priority Pass",
        "Golf",
        "Concierge"
      ],
      "bestFor": "High Net Worth Individuals seeking premium lifestyle benefits and international travel perks",
      "rating": 4.3,
      "verdict": "Excellent premium card for HNIs with comprehensive benefits; free for Insignia Banking customers",
      "pros": [
        "Free for Insignia Preferred Banking customers",
        "High reward rate: 2.5% on international spends",
        "6 international lounge visits via Priority Pass",
        "Lower forex markup at 1.5%",
        "\u20b9500 off on movies twice monthly",
        "Premium hotel benefits across major chains"
      ],
      "cons": [
        "\u20b97,000 annual fee for non-Insignia customers",
        "High eligibility threshold (\u20b930L TRV)",
        "Domestic reward rate of 1.25% is below super-premium standards",
        "Limited milestone benefits"
      ]
    },
    "slug": "rbl-insignia-preferred-banking"
  },
  {
    "id": "rbl-icon",
    "name": "RBL Icon Credit Card",
    "bank": "RBL Bank",
    "image": "/assets/cards/rbl-icon.png",
    "link": "https://www.rblbank.com/personal-banking/cards/credit-cards/icon-credit-card",
    "fees": {
      "joining": 5000,
      "annual": 5000,
      "currency": "INR",
      "waivedOn": null,
      "waiverText": "No standard waiver; welcome bonus of 20,000 RP (\u20b95,000 value) offsets joining fee"
    },
    "eligibility": {
      "income": 600000,
      "age": {
        "min": 21,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 720
    },
    "rewards": {
      "type": "points",
      "name": "Reward Points",
      "baseRate": 0.005,
      "earningText": "2 RP per \u20b9100 base (0.5%); 20 RP per \u20b9100 (5%) on international & weekend dining",
      "expiry": "2 Years",
      "joiningBonus": "20,000 Reward Points (\u20b95,000 value) on first transaction within 30 days",
      "exclusions": "Fuel, Utilities, Insurance, Quasi-Cash, Railways, Real Estate, Education, Wallet loads, Govt Services, EMI conversions",
      "calculator": {
        "tier": "premium",
        "monthlyCap": 4000,
        "capResetPeriod": "calendar",
        "specialLogic": "10X rewards (20 RP/\u20b9100) on international purchases and weekend dining; capped at 2,000 RP/month each category",
        "categories": {
          "travel": {
            "rate": 0.005,
            "label": "2 RP/\u20b9100 base rate",
            "cap": null
          },
          "dining": {
            "rate": 0.05,
            "label": "20 RP/\u20b9100 on weekends (10X)",
            "cap": 500
          },
          "online": {
            "rate": 0.005,
            "label": "2 RP/\u20b9100 base rate",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No reward points on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.005,
            "label": "2 RP/\u20b9100 base rate",
            "cap": null
          },
          "utilities": {
            "rate": 0,
            "label": "No reward points on utilities",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Redeem for air travel or hotel bookings via RBL Rewards",
        "options": [
          {
            "type": "Air Travel",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": true
          },
          {
            "type": "Hotel Stays",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": true
          },
          {
            "type": "Shopping Vouchers",
            "value": 0.25,
            "desc": "Various brands",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "2 per quarter (spend \u20b935,000 in previous quarter from July 2025)",
        "international": "Priority Pass membership (paid access at $35/visit)",
        "accessType": "MasterCard/Visa India Lounge + Priority Pass (paid)"
      },
      "milestones": [
        {
          "spend": 300000,
          "benefit": "10,000 Reward Points"
        },
        {
          "spend": 500000,
          "benefit": "Additional 15,000 Reward Points"
        },
        {
          "spend": 800000,
          "benefit": "Additional 20,000 Reward Points (Total: 45,000 RP)"
        }
      ],
      "golf": {
        "included": true,
        "text": "4 complimentary green fee rounds/year + 12 golf lessons/year (1/month)"
      },
      "movies": {
        "included": true,
        "text": "Buy 1 Get 1 Free on BookMyShow (up to \u20b9200), twice per month"
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 200
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5% forex markup"
      },
      "concierge": {
        "included": true,
        "text": "24x7 Concierge for golf, hotels, dining, car rental, events"
      },
      "dining": {
        "included": true,
        "text": "Complimentary wine or dessert at select premium restaurants"
      }
    },
    "metadata": {
      "tags": [
        "Premium",
        "Lifestyle",
        "Weekend Dining",
        "International",
        "Golf",
        "Movies"
      ],
      "bestFor": "Lifestyle spenders who dine out on weekends and make international purchases",
      "rating": 4,
      "verdict": "Strong lifestyle card with excellent accelerated rewards on weekend dining and international spends",
      "pros": [
        "10X rewards (5%) on international and weekend dining",
        "Welcome bonus offsets first year fee",
        "Up to 45,000 milestone reward points annually",
        "BOGO movie tickets twice monthly",
        "Comprehensive golf benefits"
      ],
      "cons": [
        "\u20b95,000 annual fee with no waiver",
        "10X rewards capped at 2,000 RP/month per category",
        "No free international lounge access",
        "Standard 3.5% forex markup",
        "Lounge access now requires quarterly spend threshold"
      ]
    },
    "slug": "rbl-icon"
  },
  {
    "id": "rbl-platinum-maxima",
    "name": "RBL Platinum Maxima Credit Card",
    "bank": "RBL Bank",
    "image": "/assets/cards/rbl-platinum-maxima.png",
    "link": "https://www.rblbank.com/personal-banking/cards/credit-cards/platinum-maxima-credit-card",
    "fees": {
      "joining": 2000,
      "annual": 2000,
      "currency": "INR",
      "waivedOn": null,
      "waiverText": "No standard waiver mentioned; contact bank for retention offers"
    },
    "eligibility": {
      "income": 300000,
      "age": {
        "min": 21,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 700
    },
    "rewards": {
      "type": "points",
      "name": "Reward Points",
      "baseRate": 0.005,
      "earningText": "2 RP per \u20b9100 base (0.5%); 10 RP per \u20b9100 (2.5%) on dining, grocery, entertainment, international",
      "expiry": "2 Years",
      "joiningBonus": "8,000 Reward Points (\u20b92,000 value) on first transaction within 30 days",
      "exclusions": "Fuel, Utilities, Insurance, Quasi-Cash, Railways, Real Estate, Education, Wallet loads, Govt Services, EMI conversions, Bills2Pay",
      "calculator": {
        "tier": "entry",
        "monthlyCap": 1000,
        "capResetPeriod": "calendar",
        "specialLogic": "5X rewards (10 RP/\u20b9100) on dining, grocery, entertainment and international purchases capped at 1,000 RP/month total. From Oct 15 2024, expanded exclusions apply.",
        "categories": {
          "travel": {
            "rate": 0.005,
            "label": "2 RP/\u20b9100 base rate",
            "cap": null
          },
          "dining": {
            "rate": 0.025,
            "label": "10 RP/\u20b9100 (5X)",
            "cap": 250
          },
          "online": {
            "rate": 0.005,
            "label": "2 RP/\u20b9100 base rate",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No reward points on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.025,
            "label": "10 RP/\u20b9100 (5X)",
            "cap": 250
          },
          "utilities": {
            "rate": 0,
            "label": "No reward points on utilities",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Redeem for flights, hotels, or vouchers via RBL Rewards",
        "options": [
          {
            "type": "Air Travel",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": true
          },
          {
            "type": "Hotel Stays",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": true
          },
          {
            "type": "Shopping Vouchers",
            "value": 0.25,
            "desc": "Various brands",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "1 per quarter (spend \u20b935,000 in previous quarter from July 2025)",
        "international": "None",
        "accessType": "MasterCard/Visa India Lounge Program"
      },
      "milestones": [
        {
          "spend": 250000,
          "benefit": "10,000 Reward Points"
        },
        {
          "spend": 400000,
          "benefit": "Additional 10,000 Reward Points (Total: 20,000 RP)"
        }
      ],
      "golf": {
        "included": false,
        "text": "No golf benefits"
      },
      "movies": {
        "included": true,
        "text": "Buy 1 Get 1 Free on BookMyShow (up to \u20b9100), once per month"
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 200
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5% forex markup"
      }
    },
    "metadata": {
      "tags": [
        "Mid-Range",
        "Entertainment",
        "Dining",
        "Movies",
        "Lounge"
      ],
      "bestFor": "Mid-range spenders who want accelerated rewards on dining and entertainment",
      "rating": 3.5,
      "verdict": "Decent mid-range card with 5X rewards on dining/entertainment and movie benefits",
      "pros": [
        "Affordable \u20b92,000 annual fee",
        "5X rewards (2.5%) on dining, grocery, entertainment, international",
        "Welcome bonus nearly offsets first year fee",
        "BOGO movie ticket monthly (up to \u20b9100)",
        "Up to 20,000 milestone points annually"
      ],
      "cons": [
        "No annual fee waiver option",
        "5X rewards capped at 1,000 RP/month total",
        "Limited lounge access (1 per quarter, spend-based)",
        "No international lounge access",
        "Standard 3.5% forex markup",
        "Extensive reward exclusions from Oct 2024"
      ]
    },
    "slug": "rbl-platinum-maxima"
  },
  {
    "id": "rbl-shoprite",
    "name": "RBL ShopRite Credit Card",
    "bank": "RBL Bank",
    "image": "/assets/cards/rbl-shoprite.png",
    "link": "https://www.rblbank.com/personal-banking/cards/credit-cards/shoprite-credit-card",
    "fees": {
      "joining": 500,
      "annual": 500,
      "currency": "INR",
      "waivedOn": 150000,
      "waiverText": "Waived on \u20b91.5L annual spend"
    },
    "eligibility": {
      "income": 180000,
      "age": {
        "min": 18,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 650
    },
    "rewards": {
      "type": "points",
      "name": "Reward Points",
      "baseRate": 0.0025,
      "earningText": "1 RP per \u20b9100 base (0.25%); 20 RP per \u20b9100 (5%) on grocery shopping",
      "expiry": "2 Years",
      "joiningBonus": "2,000 Reward Points (\u20b9500 value) on first transaction within 30 days + RBL MyCard app download",
      "exclusions": "Fuel, Utilities, Insurance, Quasi-Cash, Railways, Real Estate, Education, Wallet loads, Govt Services, EMI conversions",
      "calculator": {
        "tier": "entry",
        "monthlyCap": 1000,
        "capResetPeriod": "calendar",
        "specialLogic": "20X rewards on grocery shopping capped at 1,000 RP/month (\u20b9250 value). Excellent for monthly grocery spends up to \u20b95,000.",
        "categories": {
          "travel": {
            "rate": 0.0025,
            "label": "1 RP/\u20b9100 base rate",
            "cap": null
          },
          "dining": {
            "rate": 0.0025,
            "label": "1 RP/\u20b9100 base rate",
            "cap": null
          },
          "online": {
            "rate": 0.0025,
            "label": "1 RP/\u20b9100 base rate",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No reward points on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.05,
            "label": "20 RP/\u20b9100 (5% value back)",
            "cap": 250
          },
          "utilities": {
            "rate": 0,
            "label": "No reward points on utilities",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Redeem for flights, hotels, or vouchers via RBL Rewards",
        "options": [
          {
            "type": "Air Travel",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": true
          },
          {
            "type": "Hotel Stays",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": false
          },
          {
            "type": "Shopping Vouchers",
            "value": 0.25,
            "desc": "Various brands",
            "recommended": true
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "None",
        "international": "None",
        "accessType": "No lounge access"
      },
      "milestones": [],
      "golf": {
        "included": false,
        "text": "No golf benefits"
      },
      "movies": {
        "included": true,
        "text": "10% off (up to \u20b9100) on BookMyShow, 15 times per year"
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 100
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5% forex markup"
      }
    },
    "metadata": {
      "tags": [
        "Entry Level",
        "Grocery",
        "Movies",
        "Low Fee",
        "Beginners"
      ],
      "bestFor": "First-time cardholders and grocery shoppers seeking low-cost rewards",
      "rating": 3.5,
      "verdict": "Excellent entry-level card for grocery shoppers with 5% value back and minimal annual fee",
      "pros": [
        "Very low annual fee of \u20b9500",
        "Fee waived on \u20b91.5L annual spend",
        "5% value back on grocery shopping",
        "Welcome bonus covers first year fee",
        "10% off on BookMyShow 15 times/year",
        "Available on RuPay, MasterCard, Visa networks"
      ],
      "cons": [
        "Very low base reward rate (0.25%)",
        "Grocery rewards capped at 1,000 RP/month",
        "No lounge access",
        "No milestone benefits",
        "Standard 3.5% forex markup",
        "\u20b999 + GST redemption fee"
      ]
    },
    "slug": "rbl-shoprite"
  },
  {
    "id": "yes-bank-reserv",
    "name": "Yes Bank RESERV Credit Card",
    "bank": "Yes Bank",
    "image": "/assets/cards/yes-bank-reserv.png",
    "link": "https://www.yesbank.in/personal-banking/yes-individual/cards/credit-cards/reserv-credit-card",
    "fees": {
      "joining": 2499,
      "annual": 2499,
      "currency": "INR",
      "waivedOn": 300000,
      "waiverText": "Joining fee waived on \u20b940,000 spend in 30 days. Annual fee waived on \u20b93 Lakh annual spend"
    },
    "eligibility": {
      "income": 2400000,
      "age": {
        "min": 21,
        "max": 60
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 750
    },
    "rewards": {
      "type": "points",
      "name": "YES Rewardz Points",
      "baseRate": 0.015,
      "earningText": "24 RP per \u20b9200 online (3%); 12 RP per \u20b9200 offline (1.5%); 6 RP per \u20b9200 select categories",
      "expiry": "36 months from date of earning",
      "joiningBonus": "None",
      "exclusions": "Rental, Wallet, Fuel, Government, Marketing/Advertising, Cash withdrawals, Post-purchase EMI",
      "calculator": {
        "tier": "premium",
        "monthlyCap": 36000,
        "capResetPeriod": "statement",
        "specialLogic": "36,000 RP cap per statement. Paid subscription plans available: 2X Plan (\u20b93,500/yr) or 3X Plan (\u20b95,000/yr) for accelerated rewards up to 6% on online. Redemption capped at 70% of cart value.",
        "categories": {
          "travel": {
            "rate": 0.03,
            "label": "3% online / 1.5% offline",
            "cap": null
          },
          "dining": {
            "rate": 0.03,
            "label": "3% online / 1.5% offline",
            "cap": null
          },
          "online": {
            "rate": 0.03,
            "label": "24 RP/\u20b9200 online shopping",
            "cap": 9000
          },
          "fuel": {
            "rate": 0,
            "label": "No rewards on fuel",
            "cap": 0
          },
          "groceries": {
            "rate": 0.03,
            "label": "3% online / 1.5% offline",
            "cap": null
          },
          "utilities": {
            "rate": 0.0075,
            "label": "6 RP/\u20b9200 on select categories",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Flight/Hotel bookings via YES Rewardz portal at \u20b90.25/point",
        "options": [
          {
            "type": "Flight/Hotel Booking",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25 (70% redemption limit)",
            "recommended": true
          },
          {
            "type": "Club Vistara Points",
            "value": 0.25,
            "desc": "10 RP = 1 CV Point",
            "recommended": true
          },
          {
            "type": "InterMiles",
            "value": 0.25,
            "desc": "10 RP = 1 InterMile",
            "recommended": false
          },
          {
            "type": "Gift Vouchers",
            "value": 0.15,
            "desc": "1 RP = \u20b90.15 (devalued)",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "3 per quarter. Requires \u20b91 Lakh quarterly spend from April 2025",
        "international": "6 per year via Priority Pass",
        "accessType": "Priority Pass for international"
      },
      "milestones": [
        {
          "spend": 40000,
          "benefit": "Joining fee waiver (within 30 days)"
        },
        {
          "spend": 300000,
          "benefit": "Annual fee waiver"
        },
        {
          "spend": 0,
          "benefit": "8,000 RP on renewal fee payment"
        }
      ],
      "golf": {
        "included": true,
        "text": "4 green fee waivers + 1 complimentary lesson per year"
      },
      "movies": {
        "included": true,
        "text": "25% off up to \u20b9250/month on BookMyShow"
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 1000
      },
      "forex": {
        "markup": 0.0175,
        "text": "1.75% markup - Lower than industry average"
      }
    },
    "metadata": {
      "tags": [
        "Premium",
        "Online Shopping",
        "Low Forex",
        "Travel",
        "Subscription Plans"
      ],
      "bestFor": "Online shoppers seeking 3% returns with achievable fee waiver and low forex markup",
      "rating": 4,
      "verdict": "Solid mid-premium card with 3% online rewards, achievable \u20b93L fee waiver, and decent travel benefits. Subscription plans can boost rewards up to 6%.",
      "pros": [
        "3% reward rate on online spends (up to 6% with subscription)",
        "Low forex markup at 1.75%",
        "Achievable \u20b93 Lakh fee waiver threshold",
        "Rewards on utilities, insurance, education (usually excluded)",
        "Purchase protection for online electronics"
      ],
      "cons": [
        "Poor redemption ratio (4:1) reduces effective value",
        "\u20b91 Lakh quarterly spend required for lounge access from April 2025",
        "No welcome bonus on joining",
        "Limited international lounge access (6/year only)",
        "Subscription plans add extra cost for best rewards"
      ]
    },
    "slug": "yes-bank-reserv"
  },
  {
    "id": "yes-bank-byoc",
    "name": "Yes Bank BYOC (Build Your Own Card)",
    "bank": "Yes Bank",
    "image": "/assets/cards/yes-bank-byoc.png",
    "link": "https://www.yesbank.in/personal-banking/yes-individual/cards/credit-cards/byoc-credit-card",
    "fees": {
      "joining": 249,
      "annual": 588,
      "currency": "INR",
      "waivedOn": null,
      "waiverText": "Card fee: \u20b9249 Eco-friendly / \u20b93,499 Metal (one-time). Monthly fee: \u20b949+GST (Rewards) or \u20b999+GST (Cashback). Optional subscription: Silver \u20b999, Gold \u20b9149, Platinum \u20b9249/month for 10% merchant cashback"
    },
    "eligibility": {
      "income": 300000,
      "age": {
        "min": 21,
        "max": 60
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 700
    },
    "rewards": {
      "type": "cashback",
      "name": "Cashback or YES Rewardz Points",
      "baseRate": 0.01,
      "earningText": "Choose: 1% unlimited cashback OR 8 RP/\u20b9200 (1%). Plus 10% cashback on selected merchants with subscription plans.",
      "expiry": "Never expires (Reward Points: 36 months)",
      "joiningBonus": "\u20b9500 Amazon voucher on spending \u20b91,000 within first 30 days",
      "exclusions": "Rental, Wallet, Utility, Fuel, Cash withdrawals, Post-purchase EMI, Instant EMI",
      "calculator": {
        "tier": "entry",
        "monthlyCap": 1000,
        "capResetPeriod": "statement",
        "specialLogic": "Customizable card - choose Cashback or Rewards variant. Subscription plans (Silver/Gold/Platinum) offer 10% cashback on selected merchants (Swiggy, BookMyShow, PharmEasy, Uber, BigBasket) capped at \u20b9100/merchant/month. Utility rewards capped at 600 RP/statement.",
        "categories": {
          "travel": {
            "rate": 0.01,
            "label": "1% cashback / 8 RP per \u20b9200",
            "cap": null
          },
          "dining": {
            "rate": 0.1,
            "label": "10% on Swiggy with subscription",
            "cap": 100
          },
          "online": {
            "rate": 0.1,
            "label": "10% on BigBasket, BookMyShow with subscription",
            "cap": 100
          },
          "fuel": {
            "rate": 0,
            "label": "No rewards on fuel",
            "cap": 0
          },
          "groceries": {
            "rate": 0.1,
            "label": "10% on BigBasket with subscription",
            "cap": 100
          },
          "utilities": {
            "rate": 0.01,
            "label": "1% / 600 RP cap per statement",
            "cap": 150
          }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Cashback variant gives direct 1% cashback. Rewards variant: redeem for flights/vouchers",
        "options": [
          {
            "type": "Direct Cashback",
            "value": 1,
            "desc": "1% cashback (Cashback variant)",
            "recommended": true
          },
          {
            "type": "Flight/Hotel Booking",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25 (Rewards variant)",
            "recommended": true
          },
          {
            "type": "Gift Vouchers",
            "value": 0.15,
            "desc": "1 RP = \u20b90.15",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "1 per quarter. Requires \u20b950,000 quarterly spend from April 2025",
        "international": "None",
        "accessType": "Mastercard Domestic Lounge program"
      },
      "milestones": [
        {
          "spend": 1000,
          "benefit": "\u20b9500 Amazon voucher (within 30 days of activation)"
        }
      ],
      "golf": {
        "included": true,
        "text": "4 complimentary rounds/year + 1 lesson/month at select courses"
      },
      "movies": {
        "included": true,
        "text": "10% cashback on BookMyShow via subscription plan (max \u20b9100/month)"
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 100
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5% markup"
      }
    },
    "metadata": {
      "tags": [
        "Customizable",
        "Cashback",
        "Entry Level",
        "Subscription Model",
        "Eco-Friendly",
        "Metal Card"
      ],
      "bestFor": "Users who want customizable benefits and targeted cashback on specific merchants like Swiggy, BookMyShow, BigBasket",
      "rating": 3.5,
      "verdict": "Unique customizable card ideal for those who want to tailor benefits. Best for heavy users of Swiggy, BookMyShow, BigBasket, Uber, and PharmEasy who can maximize 10% merchant cashback.",
      "pros": [
        "Fully customizable - choose rewards or cashback",
        "10% cashback on popular merchants (Swiggy, BookMyShow, etc.)",
        "Choose card material (Eco-friendly \u20b9249 or Metal \u20b93,499)",
        "1% unlimited cashback option",
        "Never-expiring reward points",
        "Low entry barrier"
      ],
      "cons": [
        "Monthly subscription fees add up (\u20b949-249/month)",
        "Cashback on merchants capped at \u20b9100/merchant/month",
        "Only 1 domestic lounge visit per quarter",
        "No international lounge access",
        "High forex markup at 3.5%",
        "Cannot change core benefit (cashback/rewards) after issuance"
      ]
    },
    "slug": "yes-bank-byoc"
  },
  {
    "id": "yes-bank-elite-plus",
    "name": "Yes Bank ELITE+ Credit Card",
    "bank": "Yes Bank",
    "image": "/assets/cards/yes-bank-elite-plus.png",
    "link": "https://www.yesbank.in/personal-banking/yes-individual/cards/credit-cards/elite-plus-credit-card",
    "fees": {
      "joining": 999,
      "annual": 999,
      "currency": "INR",
      "waivedOn": 200000,
      "waiverText": "Joining fee waived on \u20b920,000 spend in 30 days. Annual fee waived on \u20b92 Lakh annual spend"
    },
    "eligibility": {
      "income": 1200000,
      "age": {
        "min": 21,
        "max": 60
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 750
    },
    "rewards": {
      "type": "points",
      "name": "YES Rewardz Points",
      "baseRate": 0.0075,
      "earningText": "12 RP per \u20b9200 online (1.5%); 6 RP per \u20b9200 offline (0.75%); 4 RP per \u20b9200 select categories",
      "expiry": "36 months from date of earning",
      "joiningBonus": "None (but fee waiver available on \u20b920K spend)",
      "exclusions": "Fuel, Cash withdrawals, Government, Marketing/Advertising, Post-purchase EMI, Instant EMI",
      "calculator": {
        "tier": "premium",
        "monthlyCap": 12000,
        "capResetPeriod": "statement",
        "specialLogic": "12,000 RP cap per statement cycle. Paid subscription plan (\u20b92,500/yr) boosts rewards to 5X on dining, travel, fashion, healthcare categories. Previously known as YES Premia.",
        "categories": {
          "travel": {
            "rate": 0.015,
            "label": "1.5% online / 0.75% offline",
            "cap": null
          },
          "dining": {
            "rate": 0.015,
            "label": "1.5% online / 0.75% offline",
            "cap": null
          },
          "online": {
            "rate": 0.015,
            "label": "12 RP/\u20b9200 online shopping",
            "cap": 3000
          },
          "fuel": {
            "rate": 0,
            "label": "No rewards on fuel",
            "cap": 0
          },
          "groceries": {
            "rate": 0.015,
            "label": "1.5% online / 0.75% offline",
            "cap": null
          },
          "utilities": {
            "rate": 0.005,
            "label": "4 RP/\u20b9200 on select categories",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Flight/Hotel bookings via YES Rewardz portal",
        "options": [
          {
            "type": "Flight/Hotel Booking",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": true
          },
          {
            "type": "Club Vistara Points",
            "value": 0.25,
            "desc": "10 RP = 1 CV Point",
            "recommended": true
          },
          {
            "type": "InterMiles",
            "value": 0.25,
            "desc": "10 RP = 1 InterMile",
            "recommended": false
          },
          {
            "type": "Gift Vouchers",
            "value": 0.15,
            "desc": "1 RP = \u20b90.15",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "2 per quarter (Primary only). Requires \u20b950,000 quarterly spend from April 2025",
        "international": "3 per year via Priority Pass (Primary only)",
        "accessType": "Priority Pass for international"
      },
      "milestones": [
        {
          "spend": 20000,
          "benefit": "Joining fee waiver (within 30 days)"
        },
        {
          "spend": 200000,
          "benefit": "Annual fee waiver"
        }
      ],
      "golf": {
        "included": true,
        "text": "4 green fee waivers + 1 complimentary lesson/month at select courses"
      },
      "movies": {
        "included": true,
        "text": "25% off up to \u20b9250/month on BookMyShow"
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 500
      },
      "forex": {
        "markup": 0.0275,
        "text": "2.75% markup"
      }
    },
    "metadata": {
      "tags": [
        "Premium",
        "All-Rounder",
        "Travel",
        "Golf",
        "Movies",
        "Lifestyle"
      ],
      "bestFor": "Mid-tier users seeking balanced rewards, lounge access, and lifestyle benefits at affordable annual fee",
      "rating": 3.8,
      "verdict": "Solid all-rounder card formerly known as YES Premia. Good for users seeking domestic + international lounge access, golf benefits, and movie discounts at just \u20b9999/year.",
      "pros": [
        "Low annual fee of \u20b9999 with achievable waiver",
        "Both domestic and international lounge access",
        "Golf benefits included",
        "25% movie discount on BookMyShow",
        "Low 2.75% forex markup for its segment",
        "Subscription plan available for higher rewards"
      ],
      "cons": [
        "Modest 1.5% reward rate on online spends",
        "12,000 RP cap per statement limits earning potential",
        "\u20b950K quarterly spend required for domestic lounge from April 2025",
        "International lounge limited to 3/year",
        "\u20b9100 redemption fee per request"
      ]
    },
    "slug": "yes-bank-elite-plus"
  },
  {
    "id": "yes-bank-ace",
    "name": "Yes Bank ACE Credit Card",
    "bank": "Yes Bank",
    "image": "/assets/cards/yes-bank-ace.png",
    "link": "https://www.yesbank.in/personal-banking/yes-individual/cards/credit-cards/ace-credit-card",
    "fees": {
      "joining": 499,
      "annual": 499,
      "currency": "INR",
      "waivedOn": 50000,
      "waiverText": "Joining fee waived on \u20b95,000 spend in 30 days. Annual fee waived on \u20b950,000 annual spend"
    },
    "eligibility": {
      "income": 300000,
      "age": {
        "min": 21,
        "max": 60
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 700
    },
    "rewards": {
      "type": "points",
      "name": "YES Rewardz Points",
      "baseRate": 0.005,
      "earningText": "8 RP per \u20b9200 online (1%); 4 RP per \u20b9200 offline (0.5%); 2 RP per \u20b9200 select categories",
      "expiry": "36 months from date of earning",
      "joiningBonus": "None (but easy joining fee waiver on \u20b95K spend)",
      "exclusions": "UPI (RuPay), Fuel, Rent, Cash withdrawals, Wallet, Government, Marketing/Advertising, Post-purchase EMI",
      "calculator": {
        "tier": "entry",
        "monthlyCap": 5000,
        "capResetPeriod": "statement",
        "specialLogic": "5,000 RP cap per statement cycle. Entry-level card previously known as YES Prosperity Rewards Plus. Subscription plans (\u20b91,000-2,000/yr) boost rewards to 3X-5X on dining, travel, fashion, healthcare. Available in RuPay and Visa variants.",
        "categories": {
          "travel": {
            "rate": 0.01,
            "label": "1% online / 0.5% offline",
            "cap": null
          },
          "dining": {
            "rate": 0.01,
            "label": "1% online / 0.5% offline",
            "cap": null
          },
          "online": {
            "rate": 0.01,
            "label": "8 RP/\u20b9200 online shopping",
            "cap": 1250
          },
          "fuel": {
            "rate": 0,
            "label": "No rewards on fuel",
            "cap": 0
          },
          "groceries": {
            "rate": 0.01,
            "label": "1% online / 0.5% offline",
            "cap": null
          },
          "utilities": {
            "rate": 0.0025,
            "label": "2 RP/\u20b9200 on select categories (150 RP cap/cycle)",
            "cap": 38
          }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Flight/Hotel bookings via YES Rewardz portal",
        "options": [
          {
            "type": "Flight/Hotel Booking",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": true
          },
          {
            "type": "Club Vistara Points",
            "value": 0.25,
            "desc": "10 RP = 1 CV Point",
            "recommended": true
          },
          {
            "type": "InterMiles",
            "value": 0.25,
            "desc": "10 RP = 1 InterMile",
            "recommended": false
          },
          {
            "type": "Gift Vouchers",
            "value": 0.1,
            "desc": "1 RP = \u20b90.10",
            "recommended": false
          },
          {
            "type": "Statement Credit",
            "value": 0.1,
            "desc": "1 RP = \u20b90.10",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "None",
        "international": "None",
        "accessType": "Not available"
      },
      "milestones": [
        {
          "spend": 5000,
          "benefit": "Joining fee waiver (within 30 days)"
        },
        {
          "spend": 50000,
          "benefit": "Annual fee waiver"
        }
      ],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 100
      },
      "forex": {
        "markup": 0.0275,
        "text": "2.75% markup"
      }
    },
    "metadata": {
      "tags": [
        "Entry Level",
        "First Card",
        "New to Credit",
        "Basic Rewards",
        "Low Fee"
      ],
      "bestFor": "First-time credit card users or those building credit history with low income requirements",
      "rating": 3.2,
      "verdict": "Basic entry-level card ideal for beginners. Easy fee waiver thresholds, decent 1% online rewards, and purchase protection. No lounge access or premium perks.",
      "pros": [
        "Very low \u20b9499 annual fee with easy \u20b950K waiver",
        "Low income requirement (\u20b925K/month)",
        "Purchase protection up to \u20b950,000",
        "Credit Shield cover of \u20b91 Lakh",
        "Available against Fixed Deposit (\u20b930K+)",
        "Subscription plans available for higher rewards",
        "Available in RuPay variant"
      ],
      "cons": [
        "Low 1% reward rate on online spends",
        "5,000 RP cap per statement severely limits earnings",
        "No lounge access",
        "No movie or golf benefits",
        "\u20b9100 redemption fee per request",
        "No UPI rewards on RuPay variant"
      ]
    },
    "slug": "yes-bank-ace"
  },
  {
    "id": "bob-eterna",
    "name": "BOB Eterna Credit Card",
    "bank": "Bank of Baroda",
    "image": "/assets/cards/bob-eterna.png",
    "link": "https://www.bobcard.co.in/credit-card-types/eterna",
    "fees": {
      "joining": 2499,
      "annual": 2499,
      "currency": "INR",
      "waivedOn": 250000,
      "waiverText": "Annual fee waived on \u20b92.5L annual spend. Joining fee waived on \u20b925,000 spend within 60 days. LTF offer available till 31st Dec 2025."
    },
    "eligibility": {
      "income": 1200000,
      "age": {
        "min": 21,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 750
    },
    "rewards": {
      "type": "points",
      "name": "Reward Points",
      "baseRate": 0.0075,
      "earningText": "3 RP per \u20b9100 on regular spends (0.75%). 15 RP per \u20b9100 on online, travel, dining, international spends (3.75%). 5X bonus capped at 5,000 RP per statement cycle.",
      "expiry": "Lifelong validity",
      "joiningBonus": "10,000 Bonus RP on \u20b950,000 spend in first 60 days + 6-month FITPASS Pro membership worth \u20b915,000",
      "exclusions": "Fuel, Rent, Utilities, Insurance, Govt, Education, Hospital, Wallet, Charity, Supermarket, Convenience Store, Fast Food, Telecom, Transportation, Laundry, Cleaning, Agriculture, Contractor",
      "calculator": {
        "tier": "premium",
        "monthlyCap": 5000,
        "capResetPeriod": "statement",
        "specialLogic": "5X bonus (12 extra RP) is capped at 5,000 RP per statement cycle on accelerated categories. After cap, base rate of 3 RP/\u20b9100 applies. Extra 12 RP on flights and 30 RP on hotels via BOBCARD SmartDeal.",
        "categories": {
          "travel": {
            "rate": 0.0375,
            "label": "15 RP/\u20b9100 (3.75%) via BOBCARD SmartDeal",
            "cap": 1250
          },
          "dining": {
            "rate": 0.0375,
            "label": "15 RP/\u20b9100 (3.75%)",
            "cap": 1250
          },
          "online": {
            "rate": 0.0375,
            "label": "15 RP/\u20b9100 (3.75%)",
            "cap": 1250
          },
          "fuel": {
            "rate": 0,
            "label": "No rewards on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0,
            "label": "Excluded - Supermarkets/Convenience Stores",
            "cap": null
          },
          "utilities": {
            "rate": 0,
            "label": "Excluded - Special MCC",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Statement credit at 1 RP = \u20b90.25 (no redemption fee)",
        "options": [
          {
            "type": "Statement Credit",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": true
          },
          {
            "type": "Products/Vouchers",
            "value": 0.25,
            "desc": "Via BOBCARD rewards portal",
            "recommended": false
          },
          {
            "type": "Travel Bookings",
            "value": 0.25,
            "desc": "Via BOBCARD rewards portal",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "Unlimited per quarter (on \u20b940,000 spend in previous quarter)",
        "international": "None",
        "accessType": "RuPay/Visa Infinite - DreamFolks/Visa"
      },
      "milestones": [
        {
          "spend": 50000,
          "benefit": "10,000 Bonus RP + FITPASS Pro 6 months (within 60 days)"
        },
        {
          "spend": 500000,
          "benefit": "20,000 Bonus RP (annual milestone)"
        }
      ],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": true,
        "text": "BOGO on District/Paytm Movies, max \u20b9250 off per month"
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 250
      },
      "forex": {
        "markup": 0.02,
        "text": "2% forex markup (lower than industry standard)"
      }
    },
    "metadata": {
      "tags": [
        "Premium",
        "Travel",
        "Lifestyle",
        "Lounge Access",
        "Low Forex",
        "RuPay",
        "Visa Infinite"
      ],
      "bestFor": "Frequent domestic travelers and online spenders who can avoid excluded MCCs",
      "rating": 4,
      "verdict": "Strong 3.75% reward rate on select categories with unlimited domestic lounge access, but extensive MCC exclusions limit its appeal. Currently available LTF till Dec 2025.",
      "pros": [
        "3.75% reward rate on online, travel, dining, international spends",
        "Unlimited domestic lounge access for primary and add-on cards",
        "Low 2% forex markup",
        "Easy annual fee waiver at \u20b92.5L spend",
        "LTF offer currently available",
        "No redemption fee for statement credit"
      ],
      "cons": [
        "Extensive MCC exclusions (utilities, insurance, rent, govt, supermarkets)",
        "5,000 RP monthly cap on accelerated rewards",
        "No international lounge access",
        "BOB customer support is inconsistent",
        "No miles transfer partners"
      ]
    },
    "slug": "bob-eterna"
  },
  {
    "id": "bob-premier",
    "name": "BOB Premier Credit Card",
    "bank": "Bank of Baroda",
    "image": "/assets/cards/bob-premier.png",
    "link": "https://www.bobcard.co.in/credit-card-types/premier",
    "fees": {
      "joining": 1000,
      "annual": 1000,
      "currency": "INR",
      "waivedOn": 120000,
      "waiverText": "Annual fee waived on \u20b91.2L annual spend. Joining fee waived on \u20b910,000 spend within 60 days. LTF offer available till 31st Dec 2025."
    },
    "eligibility": {
      "income": 300000,
      "age": {
        "min": 21,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 700
    },
    "rewards": {
      "type": "points",
      "name": "Reward Points",
      "baseRate": 0.005,
      "earningText": "2 RP per \u20b9100 on regular spends (0.5%). 10 RP per \u20b9100 on travel, dining, international spends (2.5%). 5X bonus capped at 2,000 RP per statement cycle.",
      "expiry": "Lifelong validity",
      "joiningBonus": "500 Bonus RP on \u20b95,000 spend in first 60 days",
      "exclusions": "Fuel, Utilities, Telecom, Rent, Insurance, Govt, Education, Supermarket (same as Eterna)",
      "calculator": {
        "tier": "entry",
        "monthlyCap": 2000,
        "capResetPeriod": "statement",
        "specialLogic": "5X bonus (8 extra RP) is capped at 2,000 RP per statement cycle. After cap, base rate of 2 RP/\u20b9100 applies.",
        "categories": {
          "travel": {
            "rate": 0.025,
            "label": "10 RP/\u20b9100 (2.5%)",
            "cap": 500
          },
          "dining": {
            "rate": 0.025,
            "label": "10 RP/\u20b9100 (2.5%)",
            "cap": 500
          },
          "online": {
            "rate": 0.005,
            "label": "2 RP/\u20b9100 (0.5%) - Base rate",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No rewards on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0,
            "label": "Excluded - Special MCC",
            "cap": null
          },
          "utilities": {
            "rate": 0,
            "label": "Excluded - Special MCC",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.25,
        "bestOption": "Statement credit at 1 RP = \u20b90.25",
        "options": [
          {
            "type": "Statement Credit",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": true
          },
          {
            "type": "Products/Vouchers",
            "value": 0.25,
            "desc": "Via BOBCARD rewards portal",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "1 per quarter (on \u20b920,000 spend in previous quarter)",
        "international": "None",
        "accessType": "RuPay/Visa - DreamFolks/Visa"
      },
      "milestones": [
        {
          "spend": 5000,
          "benefit": "500 Bonus RP (within 60 days)"
        }
      ],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 250
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5% forex markup"
      }
    },
    "metadata": {
      "tags": [
        "Entry-Level",
        "Travel",
        "Dining",
        "RuPay",
        "Visa"
      ],
      "bestFor": "Budget-conscious travelers who spend \u20b920K-\u20b91.5L annually on dining and travel",
      "rating": 3.5,
      "verdict": "Solid mid-range card with 2.5% on travel/dining, but low monthly cap and high forex markup limit value. Good as LTF.",
      "pros": [
        "2.5% reward rate on travel, dining, international",
        "Low annual fee with easy waiver at \u20b91.2L",
        "Quarterly domestic lounge access",
        "LTF offer currently available",
        "Up to 3 free add-on cards"
      ],
      "cons": [
        "Only 2,000 RP monthly cap on accelerated rewards",
        "High 3.5% forex markup",
        "Only 1 lounge visit per quarter",
        "No international lounge access",
        "Same MCC exclusions as Eterna"
      ]
    },
    "slug": "bob-premier"
  },
  {
    "id": "sc-ultimate",
    "name": "Standard Chartered Ultimate Credit Card",
    "bank": "Standard Chartered",
    "image": "/assets/cards/sc-ultimate.png",
    "link": "https://www.sc.com/in/credit-cards/ultimate-card/",
    "fees": {
      "joining": 5000,
      "annual": 5000,
      "currency": "INR",
      "waivedOn": null,
      "waiverText": "No fee waiver available. Welcome bonus of 6,000 RP (\u20b96,000) on joining. Renewal bonus of 5,000 RP (\u20b95,000)."
    },
    "eligibility": {
      "income": 2400000,
      "age": {
        "min": 21,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 750
    },
    "rewards": {
      "type": "points",
      "name": "Reward Points",
      "baseRate": 0.0333,
      "earningText": "5 RP per \u20b9150 on most spends (3.33%, 1 RP = \u20b91). 3 RP per \u20b9150 (2%) on utilities, supermarkets, insurance, property management, schools, govt payments. No rewards on fuel.",
      "expiry": "3 years from accumulation date",
      "joiningBonus": "6,000 RP worth \u20b96,000 on paying joining fee",
      "exclusions": "Fuel (no rewards). Lower rate on Utilities, Supermarkets, Insurance, Property Management, Schools, Government payments.",
      "calculator": {
        "tier": "super-premium",
        "monthlyCap": null,
        "capResetPeriod": null,
        "specialLogic": "No cap on reward points. Flat 3.33% on most categories, reduced 2% on utilities/insurance/govt/supermarkets/schools. Rent payments attract 1% processing fee.",
        "categories": {
          "travel": {
            "rate": 0.0333,
            "label": "5 RP/\u20b9150 (3.33%)",
            "cap": null
          },
          "dining": {
            "rate": 0.0333,
            "label": "5 RP/\u20b9150 (3.33%)",
            "cap": null
          },
          "online": {
            "rate": 0.0333,
            "label": "5 RP/\u20b9150 (3.33%)",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "No rewards on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.02,
            "label": "3 RP/\u20b9150 (2%) - Supermarkets",
            "cap": null
          },
          "utilities": {
            "rate": 0.02,
            "label": "3 RP/\u20b9150 (2%) - Utilities/Insurance/Govt",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 1,
        "bestOption": "Shopping vouchers via 360\u00b0 Rewards portal at 1 RP = \u20b91",
        "redemptionFee": 99,
        "options": [
          {
            "type": "Shopping Vouchers",
            "value": 1,
            "desc": "1 RP = \u20b91 (Titan, FabIndia, Croma, Shoppers Stop, etc.) - \u20b999 redemption fee",
            "recommended": true
          },
          {
            "type": "Luxury Vouchers",
            "value": 1,
            "desc": "Ray Ban, Coach, Tumi, Hugo Boss - \u20b999 redemption fee",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "4 per quarter (16 per year) via Visa/Mastercard",
        "international": "1 per month via Priority Pass (on \u20b920,000 spend in previous month)",
        "accessType": "Priority Pass + Visa/Mastercard domestic"
      },
      "milestones": [
        {
          "spend": 0,
          "benefit": "6,000 RP welcome bonus on joining fee payment"
        },
        {
          "spend": 0,
          "benefit": "5,000 RP renewal bonus on annual fee payment"
        }
      ],
      "golf": {
        "included": true,
        "text": "1 complimentary golf game + 1 golf lesson per month at premier domestic courses"
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 1000
      },
      "forex": {
        "markup": 0.02,
        "text": "2% forex markup (net 0.67% gain with 3.33% rewards)"
      }
    },
    "metadata": {
      "tags": [
        "Super-Premium",
        "High Rewards",
        "Golf",
        "Lounge Access",
        "Low Forex",
        "Mastercard World"
      ],
      "bestFor": "High spenders who want consistent 3.33% rewards without category restrictions or caps",
      "rating": 4.2,
      "verdict": "Excellent 3.33% uncapped rewards on most spends, comparable to HDFC Infinia/Diners Black. Limited voucher redemption options is the main drawback.",
      "pros": [
        "Industry-leading 3.33% reward rate on most spends",
        "No cap on reward points",
        "Low 2% forex markup",
        "Rewards on utilities, insurance, govt payments (at 2%)",
        "Complimentary golf benefits",
        "Priority Pass with international lounge access"
      ],
      "cons": [
        "Non-waivable \u20b95,000 annual fee",
        "No statement credit option - only voucher redemption",
        "Limited voucher brand selection (no Amazon/Flipkart)",
        "\u20b999 redemption fee per transaction",
        "International lounge requires \u20b920K monthly spend",
        "3-year point expiry"
      ]
    },
    "slug": "sc-ultimate"
  },
  {
    "id": "sc-smart",
    "name": "Standard Chartered Smart Credit Card",
    "bank": "Standard Chartered",
    "image": "/assets/cards/sc-smart.png",
    "link": "https://www.sc.com/in/credit-cards/smart-credit-card/",
    "fees": {
      "joining": 499,
      "annual": 499,
      "currency": "INR",
      "waivedOn": 120000,
      "waiverText": "Annual fee waived on \u20b91.2L annual spend. Joining fee waived for new-to-bank customers."
    },
    "eligibility": {
      "income": 300000,
      "age": {
        "min": 18,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 700
    },
    "rewards": {
      "type": "cashback",
      "name": "Cashback",
      "baseRate": 0.01,
      "earningText": "2% cashback on online spends (max \u20b91,000/month). 1% cashback on offline spends (max \u20b9500/month). Total max \u20b91,500/month or \u20b918,000/year.",
      "expiry": "Never expires",
      "joiningBonus": "\u20b9500 Amazon Pay voucher on card activation",
      "exclusions": "Fuel, Cash Withdrawals",
      "calculator": {
        "tier": "entry",
        "monthlyCap": 1500,
        "capResetPeriod": "calendar",
        "specialLogic": "Separate caps for online (\u20b91,000) and offline (\u20b9500). No minimum transaction value. Cashback on govt payments, utilities, insurance, wallet loads included.",
        "categories": {
          "travel": {
            "rate": 0.02,
            "label": "2% (Online)",
            "cap": 1000
          },
          "dining": {
            "rate": 0.01,
            "label": "1% (Offline) or 2% (Online)",
            "cap": 500
          },
          "online": {
            "rate": 0.02,
            "label": "2% cashback",
            "cap": 1000
          },
          "fuel": {
            "rate": 0,
            "label": "No cashback on fuel",
            "cap": null
          },
          "groceries": {
            "rate": 0.01,
            "label": "1% (Offline) or 2% (Online)",
            "cap": 500
          },
          "utilities": {
            "rate": 0.02,
            "label": "2% (Online bill payments)",
            "cap": 1000
          }
        }
      },
      "redemption": {
        "baseValue": 1,
        "bestOption": "Statement credit via 360\u00b0 Rewards portal",
        "options": [
          {
            "type": "Statement Credit",
            "value": 1,
            "desc": "\u20b91 = \u20b91, min \u20b92,500 for first redemption, then \u20b91,000 multiples",
            "recommended": true
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "None",
        "international": "None",
        "accessType": "Not available"
      },
      "milestones": [],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "None",
        "cap": 0
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5% forex markup"
      }
    },
    "metadata": {
      "tags": [
        "Entry-Level",
        "Cashback",
        "Online Shopping",
        "Utilities",
        "Beginners"
      ],
      "bestFor": "Online shoppers and those who want cashback on utilities, insurance, and govt payments without exclusions",
      "rating": 3.8,
      "verdict": "Best entry-level cashback card for online spends with minimal exclusions. Covers utilities, insurance, govt payments that other cards exclude.",
      "pros": [
        "2% cashback on all online spends including utilities",
        "Cashback on govt payments, insurance, wallet loads",
        "Extended 90-day interest-free period for new cards",
        "No redemption fee",
        "Easy annual fee waiver at \u20b91.2L",
        "Low 0.99% EMI conversion rate"
      ],
      "cons": [
        "No cashback on fuel",
        "Monthly cap of \u20b91,500 (\u20b91,000 online + \u20b9500 offline)",
        "No lounge access",
        "No fuel surcharge waiver",
        "High \u20b92,500 minimum for first redemption",
        "High 3.5% forex markup"
      ]
    },
    "slug": "sc-smart"
  },
  {
    "id": "hsbc-live-plus",
    "name": "HSBC Live+ Credit Card",
    "bank": "HSBC",
    "image": "/assets/cards/hsbc-live-plus.png",
    "link": "https://www.hsbc.co.in/credit-cards/products/live-plus/",
    "fees": {
      "joining": 999,
      "annual": 999,
      "currency": "INR",
      "waivedOn": 200000,
      "waiverText": "Waived on \u20b92,00,000 annual spend"
    },
    "eligibility": {
      "income": 600000,
      "age": {
        "min": 18,
        "max": 65
      },
      "type": "Salaried",
      "creditScore": 700
    },
    "rewards": {
      "type": "cashback",
      "name": "Cashback",
      "baseRate": 0.015,
      "earningText": "1.5% unlimited cashback on all eligible retail spends",
      "expiry": "Credited within 45 days of statement",
      "joiningBonus": "\u20b91,000 cashback on \u20b920,000 spend within 30 days + \u20b9250 Amazon voucher on video KYC",
      "exclusions": "Utilities, Fuel, Wallet loads, Rent, Education, Government, Insurance, Jewellery, EMI, Tolls, Financial Institutions, Money Transfers",
      "calculator": {
        "tier": "entry",
        "monthlyCap": 1000,
        "capResetPeriod": "statement",
        "specialLogic": "10% cashback on dining, grocery, and food delivery combined capped at \u20b91,000/month. 1.5% unlimited on other retail spends. Cashback auto-credited to statement.",
        "categories": {
          "travel": {
            "rate": 0.015,
            "label": "1.5% cashback",
            "cap": null
          },
          "dining": {
            "rate": 0.1,
            "label": "10% cashback (combined cap)",
            "cap": 1000
          },
          "online": {
            "rate": 0.015,
            "label": "1.5% cashback",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "Excluded",
            "cap": null
          },
          "groceries": {
            "rate": 0.1,
            "label": "10% cashback (combined cap)",
            "cap": 1000
          },
          "utilities": {
            "rate": 0,
            "label": "Excluded",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 1,
        "bestOption": "Automatic statement credit",
        "options": [
          {
            "type": "Statement Credit",
            "value": 1,
            "desc": "Auto-credited to account",
            "recommended": true
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "4 per year (1 per quarter)",
        "international": "None",
        "accessType": "DreamFolks"
      },
      "milestones": [],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 250
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5% + GST"
      }
    },
    "metadata": {
      "tags": [
        "Cashback",
        "Dining",
        "Grocery",
        "Food Delivery",
        "Everyday Spends"
      ],
      "bestFor": "10% cashback on dining, grocery, and food delivery spends",
      "rating": 4,
      "verdict": "Best-in-class cashback card for dining & grocery spenders with a low annual fee and strong 10% return on everyday essentials.",
      "pros": [
        "10% cashback on dining, grocery, and food delivery",
        "1.5% unlimited cashback on other retail spends",
        "Low annual fee of \u20b9999 with easy waiver",
        "Auto-credited cashback - no redemption hassle",
        "Live+ Dining Program with additional discounts"
      ],
      "cons": [
        "\u20b91,000 monthly cap on 10% categories",
        "Long exclusion list including utilities and insurance",
        "No international lounge access",
        "Only available in select cities",
        "Not available to self-employed individuals"
      ]
    },
    "slug": "hsbc-live-plus"
  },
  {
    "id": "hsbc-premier",
    "name": "HSBC Premier Credit Card",
    "bank": "HSBC",
    "image": "/assets/cards/hsbc-premier.png",
    "link": "https://www.hsbc.co.in/credit-cards/products/premier/",
    "fees": {
      "joining": 12000,
      "annual": 20000,
      "currency": "INR",
      "waivedOn": null,
      "waiverText": "Annual fee waived for HSBC Premier relationship holders"
    },
    "eligibility": {
      "income": 3600000,
      "age": {
        "min": 21,
        "max": 65
      },
      "type": "HSBC Premier Customer",
      "creditScore": 750
    },
    "rewards": {
      "type": "points",
      "name": "HSBC Reward Points",
      "baseRate": 0.03,
      "earningText": "3 Reward Points per \u20b9100 spent (3% return at 1:1 redemption)",
      "expiry": "Never Expires",
      "joiningBonus": "20,000 Reward Points on card activation + Taj Epicure Membership + Taj Gift Card worth \u20b912,000 + EazyDiner Prime Membership",
      "exclusions": "Fuel (from Apr 2025), Education, E-wallets, Jewellery, Bail & Bond payments. Utilities/Insurance capped at \u20b91L/month combined for select MCCs",
      "calculator": {
        "tier": "super-premium",
        "monthlyCap": 100000,
        "capResetPeriod": "calendar",
        "specialLogic": "3 RP per \u20b9100 on all spends. From Apr 2025, select categories (utilities, insurance, education, govt, jewellery) capped at \u20b91L monthly spend combined. Fuel completely excluded. 1:1 transfer to 20+ airline/hotel partners.",
        "categories": {
          "travel": {
            "rate": 0.03,
            "label": "3% (3 RP/\u20b9100)",
            "cap": null
          },
          "dining": {
            "rate": 0.03,
            "label": "3% (3 RP/\u20b9100)",
            "cap": null
          },
          "online": {
            "rate": 0.03,
            "label": "3% (3 RP/\u20b9100)",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "Excluded (from Apr 2025)",
            "cap": null
          },
          "groceries": {
            "rate": 0.03,
            "label": "3% (3 RP/\u20b9100)",
            "cap": null
          },
          "utilities": {
            "rate": 0.03,
            "label": "3% (capped at \u20b91L/month)",
            "cap": 3000
          }
        }
      },
      "redemption": {
        "baseValue": 1,
        "bestOption": "1:1 transfer to airline miles or Apple products",
        "options": [
          {
            "type": "Airline Miles",
            "value": 1,
            "desc": "1 RP = 1 Mile (20+ partners)",
            "recommended": true
          },
          {
            "type": "Apple Products",
            "value": 1,
            "desc": "1 RP = \u20b91 via Imagine vouchers",
            "recommended": true
          },
          {
            "type": "Hotel Points",
            "value": 1,
            "desc": "1 RP = 1 Hotel Point (select partners)",
            "recommended": false
          },
          {
            "type": "Gift Cards",
            "value": 0.25,
            "desc": "1 RP = \u20b90.25",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "Unlimited",
        "international": "Unlimited + 8 guest visits/year",
        "accessType": "Priority Pass"
      },
      "milestones": [],
      "golf": {
        "included": true,
        "text": "Complimentary golf sessions via Premier benefits"
      },
      "movies": {
        "included": true,
        "text": "BOGO on BookMyShow (any day)"
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 3000
      },
      "forex": {
        "markup": 0.0099,
        "text": "0.99% - One of the lowest in India"
      }
    },
    "metadata": {
      "tags": [
        "Super Premium",
        "Travel",
        "Airline Miles",
        "Lounge Access",
        "Metal Card",
        "Low Forex"
      ],
      "bestFor": "HSBC Premier customers seeking unlimited lounge access and 1:1 airline mile transfers",
      "rating": 4.3,
      "verdict": "Exceptional travel card for HSBC Premier customers with 0.99% forex, unlimited lounges, and flexible 1:1 mile transfers to 20+ partners.",
      "pros": [
        "0.99% forex markup - among the lowest in India",
        "Unlimited domestic & international lounge access",
        "3% reward rate with 1:1 airline/Apple redemption",
        "Reward points never expire",
        "Complimentary Taj Epicure + EazyDiner membership",
        "Metal card with premium feel"
      ],
      "cons": [
        "Requires HSBC Premier relationship (\u20b940L TRB or \u20b93L salary)",
        "\u20b920,000 annual fee if Premier criteria not met",
        "High \u20b912,000 joining fee",
        "From Apr 2025: fuel excluded, caps on utilities/insurance",
        "Limited to select cities"
      ]
    },
    "slug": "hsbc-premier"
  },
  {
    "id": "au-zenith-plus",
    "name": "AU Zenith+ Credit Card",
    "bank": "AU Small Finance Bank",
    "image": "/assets/cards/au-zenith-plus.png",
    "link": "https://www.au.bank.in/premium-banking/credit-cards/zenith-plus-credit-card",
    "fees": {
      "joining": 4999,
      "annual": 4999,
      "currency": "INR",
      "waivedOn": 800000,
      "waiverText": "Waived on \u20b98,00,000 net retail spend in previous anniversary year"
    },
    "eligibility": {
      "income": 2500000,
      "age": {
        "min": 21,
        "max": 60
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 750
    },
    "rewards": {
      "type": "points",
      "name": "AU Reward Points",
      "baseRate": 0.01,
      "earningText": "1 RP per \u20b9100 on retail spends (1 RP = \u20b91)",
      "expiry": "2 Years",
      "joiningBonus": "Choice of luxury brand vouchers or Reward Points worth \u20b95,000 on card activation",
      "exclusions": "Fuel, EMI, Cash transactions. Special categories (Utility, Insurance, Rent, Education, Govt) excluded from milestone calculation",
      "calculator": {
        "tier": "super-premium",
        "monthlyCap": null,
        "capResetPeriod": "statement",
        "specialLogic": "2 RP/\u20b9100 on travel, dining, and international spends (2% value). 1 RP/\u20b9100 on other retail (1% value). 1 RP = \u20b91 redemption. Monthly milestone: 1,000 RP on \u20b975,000 spend. Taj Epicure on \u20b912L annual spend.",
        "categories": {
          "travel": {
            "rate": 0.02,
            "label": "2% (2 RP/\u20b9100)",
            "cap": null
          },
          "dining": {
            "rate": 0.02,
            "label": "2% (2 RP/\u20b9100)",
            "cap": null
          },
          "online": {
            "rate": 0.01,
            "label": "1% (1 RP/\u20b9100)",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "Excluded",
            "cap": null
          },
          "groceries": {
            "rate": 0.01,
            "label": "1% (1 RP/\u20b9100)",
            "cap": null
          },
          "utilities": {
            "rate": 0,
            "label": "Excluded from milestones",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 1,
        "bestOption": "Gift vouchers or AU Rewardz redemption",
        "options": [
          {
            "type": "Vouchers",
            "value": 1,
            "desc": "1 RP = \u20b91",
            "recommended": true
          },
          {
            "type": "Flight/Hotel",
            "value": 1,
            "desc": "1 RP = \u20b91",
            "recommended": true
          },
          {
            "type": "Merchandise",
            "value": 1,
            "desc": "1 RP = \u20b91",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "16 per year (via AU Card)",
        "international": "8 per year (2 per quarter via Priority Pass)",
        "accessType": "Priority Pass + AU Card"
      },
      "milestones": [
        {
          "spend": 75000,
          "benefit": "1,000 Reward Points per statement cycle"
        },
        {
          "spend": 1200000,
          "benefit": "Complimentary Taj Epicure Membership"
        }
      ],
      "golf": {
        "included": true,
        "text": "8 complimentary golf games/lessons per year (2 per quarter)"
      },
      "movies": {
        "included": true,
        "text": "16 BOGO tickets/year via BookMyShow (4 per quarter, up to \u20b9500/ticket)"
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 1000
      },
      "forex": {
        "markup": 0.0099,
        "text": "0.99% - Premium low forex markup"
      }
    },
    "metadata": {
      "tags": [
        "Super Premium",
        "Metal Card",
        "Low Forex",
        "Travel",
        "Dining",
        "Golf",
        "Movies"
      ],
      "bestFor": "Travelers and high spenders seeking 0.99% forex, comprehensive lounge access, and lifestyle benefits",
      "rating": 4.2,
      "verdict": "Well-rounded super-premium metal card with 0.99% forex, extensive lounge access, and strong lifestyle benefits including golf and movies.",
      "pros": [
        "0.99% forex markup - excellent for international spends",
        "1:1 reward redemption value",
        "16 domestic + 8 international lounge visits",
        "16 BOGO movie tickets + 8 golf rounds annually",
        "Taj Epicure membership on \u20b912L spend",
        "Metal card with premium feel"
      ],
      "cons": [
        "Lower reward rate (1-2%) compared to some competitors",
        "High income requirement (\u20b92.5L/month)",
        "\u20b98L spend required for fee waiver",
        "Fuel transactions don't earn rewards",
        "\u20b999 redemption fee applies"
      ]
    },
    "slug": "au-zenith-plus"
  },
  {
    "id": "ixigo-au",
    "name": "ixigo AU Credit Card",
    "bank": "AU Small Finance Bank",
    "image": "/assets/cards/ixigo-au.png",
    "link": "https://www.aubank.in/personal-banking/credit-cards/ixigo-au-travel-credit-card",
    "fees": {
      "joining": 0,
      "annual": 999,
      "currency": "INR",
      "waivedOn": 100000,
      "waiverText": "Currently Lifetime Free. Otherwise waived on \u20b91,00,000 annual spend"
    },
    "eligibility": {
      "income": 300000,
      "age": {
        "min": 21,
        "max": 60
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 700
    },
    "rewards": {
      "type": "points",
      "name": "ixigo Reward Points",
      "baseRate": 0.025,
      "earningText": "10 RP per \u20b9200 online (2.5%), 5 RP per \u20b9200 offline (1.25%)",
      "expiry": "2 Years",
      "joiningBonus": "1,000 Reward Points + \u20b91,000 ixigo money voucher on first transaction within 30 days",
      "exclusions": "Fuel, Rent, Insurance, Jewellery, Wallets, Education, Government, BBPS, International transactions (from Dec 2024)",
      "calculator": {
        "tier": "co-branded",
        "monthlyCap": 10000,
        "capResetPeriod": "statement",
        "specialLogic": "ZERO FOREX MARKUP - Key USP. 10 RP/\u20b9200 online (2.5%), 5 RP/\u20b9200 offline (1.25%), 20 RP/\u20b9200 on train bookings via ixigo (5%). 1 RP = \u20b90.50 as ixigo money, \u20b90.20 for AU vouchers. 10% discount on flights/hotels/buses via ixigo.",
        "categories": {
          "travel": {
            "rate": 0.05,
            "label": "5% on ixigo train bookings (20 RP/\u20b9200)",
            "cap": null
          },
          "dining": {
            "rate": 0.025,
            "label": "2.5% online",
            "cap": null
          },
          "online": {
            "rate": 0.025,
            "label": "2.5% (10 RP/\u20b9200)",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "Excluded",
            "cap": null
          },
          "groceries": {
            "rate": 0.0125,
            "label": "1.25% offline",
            "cap": null
          },
          "utilities": {
            "rate": 0,
            "label": "Excluded",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.5,
        "bestOption": "Convert to ixigo money for travel bookings",
        "options": [
          {
            "type": "ixigo Money",
            "value": 0.5,
            "desc": "1 RP = \u20b90.50 (best value)",
            "recommended": true
          },
          {
            "type": "AU Rewardz Vouchers",
            "value": 0.2,
            "desc": "1 RP = \u20b90.20",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "8 airport + 8 railway per year (2 each per quarter on \u20b920K spend)",
        "international": "1 per year via Priority Pass",
        "accessType": "Priority Pass + AU Card"
      },
      "milestones": [],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 250
      },
      "forex": {
        "markup": 0,
        "text": "ZERO FOREX MARKUP - Major USP"
      }
    },
    "metadata": {
      "tags": [
        "Zero Forex",
        "Travel",
        "Co-branded",
        "Lifetime Free",
        "Railway",
        "Budget Travel"
      ],
      "bestFor": "Budget-conscious travelers seeking zero forex markup and ixigo platform discounts",
      "rating": 4.1,
      "verdict": "India's best zero forex card for budget travelers with ixigo discounts, railway lounge access, and lifetime free status.",
      "pros": [
        "ZERO forex markup - saves 3.5%+ on international spends",
        "Currently Lifetime Free (LTF)",
        "10% discount on ixigo flights, hotels, buses",
        "8 railway + 8 airport lounge visits",
        "Earns rewards on forex spends (unlike most zero forex cards)",
        "Available in RuPay variant for UPI"
      ],
      "cons": [
        "10,000 RP cap per statement cycle",
        "Long exclusion list including international from Dec 2024",
        "Only 1 international lounge visit",
        "Low redemption value (\u20b90.20-\u20b90.50 per RP)",
        "Benefits maximized only on ixigo platform",
        "\u20b999 redemption fee"
      ]
    },
    "slug": "ixigo-au"
  },
  {
    "id": "onecard-metal",
    "name": "OneCard Metal Credit Card",
    "bank": "Federal Bank / BOB / SBM / Indian Bank / CSB / South Indian Bank",
    "image": "/assets/cards/onecard-metal.png",
    "link": "https://www.getonecard.app/",
    "fees": {
      "joining": 0,
      "annual": 0,
      "currency": "INR",
      "waivedOn": null,
      "waiverText": "Lifetime Free - No joining or annual fee"
    },
    "eligibility": {
      "income": 240000,
      "age": {
        "min": 18,
        "max": 60
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 650
    },
    "rewards": {
      "type": "points",
      "name": "OneCard Reward Points",
      "baseRate": 0.002,
      "earningText": "1 RP per \u20b950 spent (base 0.2%), 5X on top 2 categories (1%)",
      "expiry": "Never Expires",
      "joiningBonus": "Instant virtual card activation + Regular merchant offers in app",
      "exclusions": "Transfers, Wallet loads, Cash withdrawals, Rent payments",
      "calculator": {
        "tier": "entry",
        "monthlyCap": null,
        "capResetPeriod": "calendar",
        "specialLogic": "Unique 5X rewards on top 2 spend categories automatically selected each month. Must spend in at least 3 categories to qualify for 5X. Fractional points earned. 1 RP = \u20b90.10 for cashback.",
        "portals": [
          {
            "name": "Top 2 Categories",
            "rate": 0.01,
            "label": "5X on Top 2 Categories",
            "categories": [
              "all"
            ]
          }
        ],
        "categories": {
          "travel": {
            "rate": 0.01,
            "label": "1% (if in top 2 categories)",
            "cap": null
          },
          "dining": {
            "rate": 0.01,
            "label": "1% (if in top 2 categories)",
            "cap": null
          },
          "online": {
            "rate": 0.01,
            "label": "1% (if in top 2 categories)",
            "cap": null
          },
          "fuel": {
            "rate": 0.01,
            "label": "1% (if in top 2 categories)",
            "cap": null
          },
          "groceries": {
            "rate": 0.01,
            "label": "1% (if in top 2 categories)",
            "cap": null
          },
          "utilities": {
            "rate": 0.002,
            "label": "0.2% base rate",
            "cap": null
          }
        }
      },
      "redemption": {
        "baseValue": 0.1,
        "bestOption": "Statement credit/cashback via app",
        "options": [
          {
            "type": "Statement Credit",
            "value": 0.1,
            "desc": "1 RP = \u20b90.10 cashback",
            "recommended": true
          },
          {
            "type": "Vouchers",
            "value": 0.15,
            "desc": "1 RP = \u20b90.15 (select brands)",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "None",
        "international": "None",
        "accessType": "Not Available"
      },
      "milestones": [],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "0%",
        "cap": 0
      },
      "forex": {
        "markup": 0.01,
        "text": "1% - Low for an entry-level card"
      }
    },
    "metadata": {
      "tags": [
        "Lifetime Free",
        "Metal Card",
        "Entry Level",
        "Fintech",
        "Low Forex",
        "Beginners"
      ],
      "bestFor": "First-time credit card users wanting a free metal card with low forex markup",
      "rating": 3.8,
      "verdict": "India's only lifetime free metal card - perfect for beginners with low forex needs, but limited rewards and no lounge access.",
      "pros": [
        "Lifetime Free - no fees ever",
        "Metal card form factor - unique at this price",
        "1% forex markup - excellent for entry-level",
        "5X rewards on top 2 categories",
        "Fractional reward points earned",
        "Excellent app with instant controls",
        "No redemption fees, points never expire"
      ],
      "cons": [
        "Very low base reward rate (0.2%)",
        "No lounge access",
        "No fuel surcharge waiver",
        "Must spend in 3+ categories for 5X rewards",
        "Low redemption value (\u20b90.10 per RP)",
        "Available as secured card for low credit scores",
        "RBI restrictions on some partner banks"
      ]
    },
    "slug": "onecard-metal"
  },
  {
    "id": "tata-neu-infinity-hdfc",
    "name": "Tata Neu Infinity HDFC Bank Credit Card",
    "bank": "HDFC Bank",
    "image": "/assets/cards/tata-neu-infinity-hdfc.png",
    "link": "https://www.hdfcbank.com/personal/pay/cards/credit-cards/tata-neu-infinity-hdfc-bank-credit-card",
    "fees": {
      "joining": 1499,
      "annual": 1499,
      "currency": "INR",
      "waivedOn": 300000,
      "waiverText": "Waived on \u20b93,00,000 annual spend. LTF offer available till Dec 2024"
    },
    "eligibility": {
      "income": 1200000,
      "age": {
        "min": 21,
        "max": 65
      },
      "type": "Salaried/Self-Employed",
      "creditScore": 720
    },
    "rewards": {
      "type": "points",
      "name": "NeuCoins",
      "baseRate": 0.015,
      "earningText": "1.5% NeuCoins on non-Tata spends, 5% on Tata Neu + extra 5% with NeuPass",
      "expiry": "12 months from credit (from Aug 2025)",
      "joiningBonus": "1,499 NeuCoins on first transaction within 30 days (covers joining fee)",
      "exclusions": "Fuel, Wallet loads, Rent, Government, EMI, Cash advances. Grocery capped at 2,000/month. Utility/Telecom capped at 2,000/month each. UPI capped at 500/month.",
      "calculator": {
        "tier": "premium",
        "monthlyCap": 2000,
        "capResetPeriod": "calendar",
        "specialLogic": "Up to 10% on Tata Neu (5% base + 5% NeuPass). 1.5% on non-Tata. 1.5% on UPI via Tata Neu UPI ID (0.5% + 1% additional). 1 NeuCoin = \u20b91. Multiple category caps apply.",
        "categories": {
          "travel": {
            "rate": 0.015,
            "label": "1.5% NeuCoins (up to 10% on Air India via Tata Neu)",
            "cap": null
          },
          "dining": {
            "rate": 0.015,
            "label": "1.5% NeuCoins",
            "cap": null
          },
          "online": {
            "rate": 0.1,
            "label": "Up to 10% on Tata Neu brands",
            "cap": null
          },
          "fuel": {
            "rate": 0,
            "label": "Excluded",
            "cap": null
          },
          "groceries": {
            "rate": 0.1,
            "label": "Up to 10% on BigBasket (cap 2,000/month)",
            "cap": 2000
          },
          "utilities": {
            "rate": 0.015,
            "label": "1.5% (capped 2,000/month)",
            "cap": 2000
          }
        }
      },
      "redemption": {
        "baseValue": 1,
        "bestOption": "Redeem on Tata Neu app across partner brands",
        "options": [
          {
            "type": "Tata Neu Partners",
            "value": 1,
            "desc": "1 NeuCoin = \u20b91 at BigBasket, Croma, Westside, etc.",
            "recommended": true
          },
          {
            "type": "Flight Booking",
            "value": 1,
            "desc": "1 NeuCoin = \u20b91 on Air India (redemption varies)",
            "recommended": false
          }
        ]
      }
    },
    "features": {
      "lounge": {
        "domestic": "8 per year (2 per quarter)",
        "international": "4 per year (1 per quarter)",
        "accessType": "Priority Pass / RuPay International"
      },
      "milestones": [],
      "golf": {
        "included": false,
        "text": ""
      },
      "movies": {
        "included": false,
        "text": ""
      },
      "fuel": {
        "surchargeWaiver": "1%",
        "cap": 500
      },
      "forex": {
        "markup": 0.035,
        "text": "3.5% (2% for premium variant on some transactions)"
      }
    },
    "metadata": {
      "tags": [
        "Tata Ecosystem",
        "Co-branded",
        "UPI Rewards",
        "RuPay",
        "Grocery",
        "E-commerce"
      ],
      "bestFor": "Tata ecosystem loyalists shopping on BigBasket, Croma, Air India, and Tata Neu brands",
      "rating": 4,
      "verdict": "Best-in-class for Tata ecosystem users with up to 10% returns on Tata brands, UPI rewards on RuPay variant, and solid lounge access.",
      "pros": [
        "Up to 10% back on Tata Neu purchases",
        "1:1 NeuCoin redemption value",
        "1.5% on UPI via RuPay variant",
        "8 domestic + 4 international lounge visits",
        "LTF offer available (limited period)",
        "Welcome bonus covers joining fee"
      ],
      "cons": [
        "Multiple monthly caps (grocery, utility, UPI)",
        "3.5% forex markup",
        "12-month NeuCoin expiry from Aug 2025",
        "Benefits concentrated in Tata ecosystem",
        "Third-party app payments attract 1% fee",
        "Not ideal for non-Tata brand shopping"
      ]
    },
    "slug": "tata-neu-infinity-hdfc"
  }
];