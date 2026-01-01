/**
 * CORRECTED VOUCHER PLATFORMS DATA - December 2025
 * Verified from official sources and recent reviews
 * Last Updated: December 31, 2025
 */

export const voucherPlatforms = {
  // ==================== HDFC SMARTBUY ====================
  smartBuy: {
    id: "smartbuy",
    name: "HDFC SmartBuy",
    bank: "HDFC Bank",
    url: "https://smartbuy.hdfcbank.com",
    poweredBy: "Gyftr",
    
    description: "HDFC's rewards portal for accelerated points on travel and 250+ brand vouchers",
    
    eligibleCards: {
      premium: ["Infinia", "Diners Club Black", "Regalia", "Regalia Gold"],
      standard: ["Millennia", "MoneyBack+", "Freedom", "All HDFC Cards"]
    },
    
    rewardRates: {
      infinia: {
        flights: "10X (33% value)",
        hotels: "10X (33% value)",
        vouchers: "5X (16.5% value)",
        appleTanishq: "10X (33% value)"
      },
      dinersBlack: {
        flights: "10X (33% value)",
        hotels: "10X (33% value)",
        vouchers: "3X (10% value)"
      },
      regalia: {
        flights: "5X (12.5% value)",
        hotels: "5X (12.5% value)",
        vouchers: "2X (5% value)"
      },
      millennia: {
        flights: "5% cashback",
        hotels: "5% cashback",
        vouchers: "2.5% cashback"
      }
    },
    
    monthlyCaps: {
      infinia: "15,000 bonus RP/month",
      dinersBlack: "7,500 bonus RP/month",
      regalia: "5,000 bonus RP/month",
      amazonFlipkart: "₹10,000/month each",
      bigbasketBlinkit: "₹1,500/month each",
      cromaVijaySales: "₹50,000/month",
      tataCliq: "₹20,000/month"
    },
    
    categories: {
      travel: {
        flights: ["Cleartrip", "MakeMyTrip", "EaseMyTrip", "Yatra"],
        hotels: ["Cleartrip", "MakeMyTrip", "Agoda", "Hotels.com"],
        trains: ["Confirmtkt (replaced IRCTC)", "3X RP or 1% cashback"]
      },
      shopping: {
        ecommerce: ["Amazon Shopping", "Amazon Pay", "Flipkart", "Myntra", "Tata CLiQ"],
        electronics: ["Croma", "Vijay Sales", "Reliance Digital"],
        fashion: ["Lifestyle", "Shoppers Stop", "Pantaloons", "Westside", "Bata"]
      },
      food: {
        delivery: ["Swiggy", "Zomato", "Domino's", "Pizza Hut", "KFC"],
        grocery: ["BigBasket", "Blinkit", "JioMart"],
        dining: ["EatSure", "Faasos", "Chaayos", "Costa Coffee"]
      },
      lifestyle: {
        beauty: ["Nykaa", "Purplle", "Body Shop"],
        entertainment: ["BookMyShow", "PVR", "SonyLIV", "JioHotstar"],
        health: ["Apollo Pharmacy", "Netmeds", "1mg"]
      }
    },
    
    fees: {
      redemptionFee: "None for Infinia/Diners Black",
      processingFee: "None on most vouchers",
      convenienceFee: "May apply on some travel bookings"
    },
    
    redemptionValues: {
      flights: "1 RP = ₹1",
      hotels: "1 RP = ₹1",
      vouchers: "1 RP = ₹0.50",
      appleTanishq: "1 RP = ₹1 (70% max redemption, 1 Apple/quarter, 50K RP/quarter Tanishq)",
      airmiles: "1 RP = 1 Mile (1.5L RP/month cap)",
      cashback: "1 RP = ₹0.30"
    },
    
    tips: [
      "Book hotels for 33% return (best value)",
      "Use for Amazon/Flipkart vouchers before sales",
      "Apple products give 33% value back",
      "Infinia has higher caps than Diners Black",
      "IRCTC removed - use Confirmtkt for trains",
      "Myntra 10X during End of Reason Sale"
    ],
    
    recentChanges: [
      "IRCTC removed, replaced by Confirmtkt (Dec 2024)",
      "Swiggy Dineout 10% extra (Jan-Dec 2025)",
      "Redemption frequency limit: 5x/month from Feb 2026"
    ]
  },

  // ==================== ICICI iSHOP ====================
  iShop: {
    id: "ishop",
    name: "ICICI iShop",
    bank: "ICICI Bank",
    url: "https://icicibank.com/ishoplogin",
    launchDate: "February 2025",
    status: "Beta",
    
    description: "ICICI's new rewards portal competing with SmartBuy - accelerated rewards on travel and vouchers",
    
    eligibleCards: {
      premium: ["Emeralde Private Metal", "Times Black"],
      standard: ["Diamant", "Emeralde PVC", "Sapphiro", "Rubyx", "Coral"],
      cobranded: ["Amazon Pay ICICI", "MakeMyTrip", "Emirates"]
    },
    
    rewardRates: {
      emeraldePrivateMetal: {
        flights: "6X (18% value)",
        hotels: "12X (36% value)",
        vouchers: "6X (18% value)"
      },
      timesBlack: {
        flights: "4X (12% value)",
        hotels: "8X (24% value)",
        vouchers: "4X (12% value)"
      },
      diamant: {
        flights: "1.5X (4.5% value)",
        hotels: "3X (9% value)",
        vouchers: "1.5X (4.5% value)"
      },
      emeraldePVC: {
        flights: "2X (6% value)",
        hotels: "4X (12% value)",
        vouchers: "2X (6% value)"
      },
      otherCards: {
        flights: "3X (varies by card)",
        hotels: "6X (varies by card)",
        vouchers: "3X (varies by card)"
      },
      cobrandedCards: {
        cashback: "4% cashback (Amazon Pay, MMT, etc.)"
      }
    },
    
    monthlyCaps: {
      emeraldePrivateMetal: "18,000 bonus RP/month",
      timesBlack: "15,000 bonus RP/month",
      emeraldePVC: "12,000 bonus RP/month",
      diamant: "12,000 bonus RP/month",
      otherCards: "9,000 bonus RP/month",
      cobrandedCards: "₹1,100 cashback/month",
      amazonFlipkart: "₹12,000/month each (accelerated rewards)"
    },
    
    categories: {
      travel: {
        flights: "Domestic and international",
        hotels: "Wide selection across price ranges",
        buses: "Available"
      },
      vouchers: {
        available: ["Amazon Pay", "Amazon Shopping", "Flipkart", "Swiggy", "Zomato", 
                   "Myntra", "BigBasket", "Croma", "Lifestyle", "BookMyShow"]
      }
    },
    
    fees: {
      redemptionFee: "₹99 + GST (waived for Emeralde Private Metal & Times Black)",
      processingFee: "2.5% on Amazon/Flipkart/Swiggy when paying by card",
      netBankingFee: "None - use Net Banking to avoid 2.5% fee"
    },
    
    redemptionValues: {
      flights: "1 RP = ₹1 (95% max redemption)",
      hotels: "1 RP = ₹1 (90% max redemption)",
      vouchers: "1 RP = ₹0.60 (50% max redemption)",
      luxVouchers: "1 RP = ₹1",
      statementCredit: "1 RP = ₹0.40"
    },
    
    transferPartners: {
      available: ["Air India (1:1 ratio)"],
      notes: "Limited partners compared to HDFC SmartBuy"
    },
    
    tips: [
      "Use NET BANKING to avoid 2.5% processing fee on Amazon/Flipkart/Swiggy",
      "Hotels give best value at 36% for Emeralde Private Metal",
      "Emeralde Private Metal + Times Black have no redemption fee",
      "Book vouchers at start of month to maximize caps",
      "36% return on hotels beats HDFC SmartBuy's 33%"
    ],
    
    recentChanges: [
      "Launched February 2025",
      "Still in Beta - expect rule changes",
      "Air India added as 1:1 transfer partner",
      "Amazon/Flipkart cap reduced to ₹12,000/month"
    ]
  },

  // ==================== AXIS GRAB DEALS / GIFT EDGE ====================
  axisGrabDeals: {
    id: "grabdeals",
    name: "Axis Grab Deals / Gift Edge",
    bank: "Axis Bank",
    url: "https://www.gyftr.com/edgerewards",
    poweredBy: "Gyftr",
    
    description: "Axis Bank's voucher portal with accelerated EDGE rewards and Gyftr Coins",
    
    eligibleCards: {
      premium: ["Magnus", "Magnus Burgundy", "Burgundy Private", "Reserve"],
      travel: ["Atlas", "Vistara Infinite", "Vistara Signature"],
      standard: ["Select", "Privilege", "My Zone", "Neo", "ACE"]
    },
    
    rewardRates: {
      magnus: {
        grabDeals: "5X EDGE RP",
        travelEDGE: "60 RP per ₹200 (30%)"
      },
      atlas: {
        grabDeals: "5X EDGE Miles",
        travelEDGE: "5% value"
      },
      select: {
        grabDeals: "Up to 10X EDGE RP"
      }
    },
    
    monthlyCaps: {
      grabDeals: "10,000 bonus RP/month",
      travelEDGE: "₹2L/month for accelerated rates"
    },
    
    categories: {
      shopping: ["Amazon", "Flipkart", "Myntra", "Tata CLiQ"],
      food: ["Swiggy", "Zomato", "Domino's", "Starbucks"],
      travel: ["MakeMyTrip", "Cleartrip", "Yatra", "Ola", "Uber"],
      lifestyle: ["Nykaa", "BigBasket", "Pantaloons", "BookMyShow"]
    },
    
    gyftrCoins: {
      earnRate: "Up to 10% Gyftr Coins on voucher purchases",
      usage: "Redeem for discounts on future voucher purchases",
      validity: "Check terms for expiry"
    },
    
    fees: {
      redemptionFee: "₹99 for portal, ₹199 for miles conversion"
    },
    
    tips: [
      "Magnus gets 5X on Grab Deals (10,000 RP cap)",
      "Use Travel EDGE for flights/hotels",
      "Gyftr Coins add extra savings layer",
      "Atlas miles transfer at 1:2 ratio"
    ]
  },

  // ==================== GYFTR DIRECT ====================
  gyftr: {
    id: "gyftr",
    name: "Gyftr",
    url: "https://www.gyftr.com",
    type: "Independent Platform",
    
    description: "India's largest gift voucher marketplace with 300+ brands and bank partnerships",
    
    bankPartnerships: [
      "HDFC SmartBuy",
      "Axis Gift Edge",
      "SBI YONO",
      "Yes Bank",
      "IndusInd Bank",
      "IRCTC",
      "Airtel",
      "American Express"
    ],
    
    categories: {
      shopping: {
        ecommerce: ["Amazon", "Flipkart", "Myntra", "Tata CLiQ"],
        electronics: ["Croma", "Vijay Sales", "Reliance Digital"],
        fashion: ["Lifestyle", "Pantaloons", "Westside", "Bata", "Puma", "Levi's"]
      },
      food: {
        delivery: ["Swiggy", "Zomato", "Domino's", "Pizza Hut", "KFC"],
        grocery: ["BigBasket", "Blinkit", "JioMart", "Zepto"],
        cafes: ["Starbucks", "Costa Coffee", "Chaayos", "CCD"]
      },
      travel: ["MakeMyTrip", "Cleartrip", "Yatra", "Ola", "Uber"],
      entertainment: ["BookMyShow", "PVR", "JioHotstar", "SonyLIV"],
      lifestyle: ["Nykaa", "Body Shop", "Apollo Pharmacy", "1mg"]
    },
    
    discounts: {
      typical: "1-12% depending on brand and portal",
      examples: {
        flipkart: "1%",
        croma: "2.5%",
        pantaloons: "8%",
        tataCliq: "8%",
        bigbasket: "3%",
        swiggyInstamart: "3.5%",
        zepto: "4%",
        nykaa: "3%",
        wonderchef: "12%"
      }
    },
    
    monthlyLimits: {
      amazonPay: "₹10,000 - ₹50,000 depending on portal",
      amazonShopping: "₹10,000 - ₹50,000",
      flipkart: "₹10,000",
      cromaVijaySales: "Up to ₹50,000",
      tataCliq: "₹20,000",
      zepto: "Up to ₹5,00,000"
    },
    
    features: {
      delivery: "Instant via WhatsApp, SMS, Email",
      validity: "Varies by brand (typically 6-12 months)",
      partialRedemption: "Available for most brands",
      refunds: "Credited back to gift card balance"
    },
    
    tips: [
      "Buy vouchers before major sales (BBD, Great Indian Festival)",
      "Stack with credit card rewards for double savings",
      "Check portal-specific limits before purchase",
      "Use Gyftr Coins for additional discounts",
      "Compare discounts across bank portals"
    ]
  },

  // ==================== SBI YONO REWARDS ====================
  sbiYono: {
    id: "sbiyono",
    name: "SBI YONO Rewards",
    bank: "SBI Card",
    url: "https://www.gyftr.com (via SBI YONO)",
    poweredBy: "Gyftr",
    
    description: "SBI's rewards redemption and voucher platform via YONO app",
    
    eligibleCards: ["All SBI Cards"],
    
    discounts: {
      typical: "Up to 41% on select brands",
      examples: {
        giva: "41% off",
        raymond: "Up to 15%",
        skechers: "Up to 10%",
        shoppersStop: "Up to 10%"
      }
    },
    
    categories: {
      fashion: ["Raymond", "Skechers", "Jack & Jones", "Shoppers Stop"],
      electronics: ["Reliance Digital"],
      lifestyle: ["GQ", "Vogue", "Reader's Digest"]
    },
    
    features: {
      rewardRedemption: "Redeem SBI reward points for vouchers",
      directPurchase: "Buy vouchers with card"
    }
  },

  // ==================== AMEX REWARD MULTIPLIER ====================
  amexRewardMultiplier: {
    id: "amexrewardmultiplier",
    name: "Amex Reward Multiplier",
    bank: "American Express",
    url: "https://www.americanexpress.com/in/network/shopping.html",
    
    description: "3X rewards on 50+ partner brands for Amex cardholders",
    
    eligibleCards: ["All American Express Cards"],
    
    rewardRate: "3X MR points on partner brands",
    
    partners: {
      shopping: ["Amazon", "Flipkart", "Myntra", "Tata CLiQ", "Nykaa"],
      electronics: ["Apple", "Croma"],
      jewelry: ["Tanishq", "Kalyan Jewellers"],
      travel: ["MakeMyTrip", "Yatra", "Cleartrip"],
      food: ["Swiggy", "Zomato", "BigBasket"],
      lifestyle: ["BookMyShow", "Cult.fit"]
    },
    
    howItWorks: [
      "Shop at partner merchant",
      "Earn 3X MR points automatically",
      "No registration required"
    ],
    
    tips: [
      "Combine with Amex offers for stacked savings",
      "Best value on high-ticket purchases like Apple, Tanishq"
    ]
  }
};

// ==================== CARD + VOUCHER COMBINATION STRATEGIES ====================
export const cardVoucherStrategies = [
  {
    id: 1,
    name: "Maximum SmartBuy Hotel Returns",
    card: "HDFC Infinia",
    platform: "SmartBuy",
    category: "Hotels",
    effectiveReturn: "33%",
    howItWorks: [
      "Book hotels via SmartBuy (Cleartrip/MakeMyTrip)",
      "Earn 10X rewards (5 base + 5 bonus per ₹150)",
      "1 RP = ₹1 for hotel bookings",
      "Effective 33.33% value back"
    ],
    monthlyLimit: "15,000 bonus RP",
    bestFor: "Frequent travelers, family vacations"
  },
  {
    id: 2,
    name: "iShop Hotel Strategy",
    card: "ICICI Emeralde Private Metal",
    platform: "iShop",
    category: "Hotels",
    effectiveReturn: "36%",
    howItWorks: [
      "Book hotels via iShop portal",
      "Earn 12X rewards (6 base x 2)",
      "1 RP = ₹1 for hotel redemption",
      "Effective 36% value back - highest in India"
    ],
    monthlyLimit: "18,000 accelerated RP",
    bestFor: "ICICI premium cardholders, beating SmartBuy returns"
  },
  {
    id: 3,
    name: "Amazon Pre-Sale Voucher Stack",
    cards: ["HDFC Infinia", "SBI Cashback", "Amazon Pay ICICI"],
    platform: "SmartBuy + Amazon",
    category: "Shopping",
    effectiveReturn: "16.5% + Sale discounts",
    howItWorks: [
      "Buy Amazon vouchers via SmartBuy before sale",
      "Earn 5X rewards with Infinia (16.5% value)",
      "Use vouchers during Amazon Great Indian Festival",
      "Stack with sale discounts for 40-60% total savings"
    ],
    monthlyLimit: "₹10,000/month Amazon vouchers",
    tips: [
      "Buy vouchers in multiple months before big sales",
      "Or use SBI Cashback directly for 5% on Amazon",
      "Amazon Pay ICICI gives 5% for Prime members"
    ]
  },
  {
    id: 4,
    name: "Zero-Cost Food Delivery",
    cards: ["HDFC Swiggy", "Axis Airtel", "Flipkart Axis"],
    platform: "Direct",
    category: "Food Delivery",
    effectiveReturn: "10-25%",
    howItWorks: [
      "HDFC Swiggy: 10% on Swiggy (₹1,500/month cap)",
      "Axis Airtel: 10% on Swiggy/Zomato (₹500/month cap)",
      "Stack with Swiggy One/Zomato Gold membership",
      "Use during promotional offers for max savings"
    ],
    tips: [
      "HDFC Swiggy is best for high food delivery spend",
      "Axis Airtel adds 25% on Airtel services"
    ]
  },
  {
    id: 5,
    name: "Flipkart BBD Strategy",
    cards: ["Flipkart Axis", "HDFC Infinia", "SBI Cashback"],
    platform: "SmartBuy + Flipkart",
    category: "Shopping",
    effectiveReturn: "15-20%",
    howItWorks: [
      "Option A: Flipkart Axis gives 5% unlimited on Flipkart",
      "Option B: SmartBuy Flipkart vouchers with Infinia (16.5%)",
      "Stack with BBD bank offers (10% instant discount)",
      "Apply Flipkart SuperCoins for additional savings"
    ],
    monthlyLimit: "₹10,000/month SmartBuy Flipkart vouchers",
    tips: [
      "Flipkart Axis best for >₹10K/month Flipkart spend",
      "SmartBuy better for planned big purchases"
    ]
  },
  {
    id: 6,
    name: "Electronics Purchase Strategy",
    cards: ["HDFC Infinia", "Tata Neu Infinity"],
    platform: "SmartBuy + Croma",
    category: "Electronics",
    effectiveReturn: "10-16%",
    howItWorks: [
      "Buy Croma/Vijay Sales vouchers via SmartBuy",
      "Earn 5X rewards with Infinia",
      "Or use Tata Neu for 10% on Croma directly",
      "Stack with sale offers and exchange bonuses"
    ],
    monthlyLimit: "₹50,000/month Croma/Vijay Sales",
    tips: [
      "High limits make this great for big purchases",
      "Check Croma sales timing for best deals"
    ]
  },
  {
    id: 7,
    name: "Utility Bill Optimization",
    cards: ["Axis ACE", "Axis Airtel", "PhonePe SBI Black"],
    platform: "Direct",
    category: "Utilities",
    effectiveReturn: "5-10%",
    howItWorks: [
      "Axis ACE: 5% via Google Pay (Android only)",
      "Axis Airtel: 10% via Airtel Thanks app",
      "PhonePe SBI Black: 10% on utilities via PhonePe",
      "Buy Amazon Pay vouchers with SBI Cashback (5%) for bill pay"
    ],
    tips: [
      "ACE limited to ₹500/month for 5%",
      "Airtel card limited to ₹250/month",
      "Amazon Pay voucher route has no cap"
    ]
  },
  {
    id: 8,
    name: "Airmiles Maximizer",
    cards: ["HDFC Infinia", "Axis Magnus Burgundy"],
    platform: "SmartBuy + Miles Transfer",
    category: "Travel",
    effectiveReturn: "Varies by redemption",
    howItWorks: [
      "Infinia: Earn 10X on SmartBuy, transfer 1:1 to airlines",
      "Magnus Burgundy: Earn high RP, transfer 5:4 to partners",
      "Best value when redeeming miles for premium cabins",
      "1 mile can be worth ₹2-5 on business/first class"
    ],
    transferPartners: {
      infinia: ["Singapore KrisFlyer", "Etihad", "British Airways", "Air India (via Vistara merger)"],
      magnusBurgundy: ["Accor ALL", "ITC", "Qatar", "Singapore"]
    },
    tips: [
      "Accumulate miles for aspirational redemptions",
      "Transfer during bonus promotions",
      "Infinia 1:1 ratio is best in India"
    ]
  },
  {
    id: 9,
    name: "Grocery Savings Stack",
    cards: ["HSBC Live+", "Tata Neu Infinity", "HDFC Infinia"],
    platform: "Direct + SmartBuy",
    category: "Grocery",
    effectiveReturn: "10-16%",
    howItWorks: [
      "HSBC Live+: 10% on BigBasket/Blinkit (₹1,000 cap)",
      "Tata Neu: 5-10% on BigBasket directly",
      "SmartBuy: Buy BigBasket vouchers (₹1,500 cap)",
      "Stack with app promotions and first-order discounts"
    ],
    tips: [
      "HSBC Live+ best for consistent grocery rewards",
      "Low SmartBuy caps mean direct card often better"
    ]
  },
  {
    id: 10,
    name: "International Travel Strategy",
    cards: ["AU Ixigo", "Yes Marquee", "ICICI Emeralde Private Metal"],
    platform: "Direct",
    category: "Forex",
    effectiveReturn: "Save 1.5-3.5% on forex markup",
    howItWorks: [
      "AU Ixigo: 0% forex markup (best in class)",
      "Yes Marquee: 1% forex markup",
      "ICICI Emeralde: 1.99% forex markup",
      "vs standard 3.5% saves significant money"
    ],
    calculation: {
      example: "On ₹1,00,000 international spend:",
      standardCard: "₹3,500 forex fee (3.5%)",
      auIxigo: "₹0 forex fee (0%)",
      savings: "₹3,500 saved"
    },
    tips: [
      "AU Ixigo is must-have for international travelers",
      "Combine with international lounge access",
      "Yes Marquee adds unlimited international lounge"
    ]
  }
];

// Helper functions
export const getPlatformById = (id) => voucherPlatforms[id];
export const getStrategyById = (id) => cardVoucherStrategies.find(s => s.id === id);
export const getStrategiesByCard = (cardName) => 
  cardVoucherStrategies.filter(s => 
    s.card === cardName || (Array.isArray(s.cards) && s.cards.includes(cardName))
  );
export const getStrategiesByCategory = (category) => 
  cardVoucherStrategies.filter(s => s.category === category);

export default { voucherPlatforms, cardVoucherStrategies };
