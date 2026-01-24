export const bankingData = [
    {
        "id": "hdfc-bank",
        "name": "HDFC Bank",
        "tiers": [
            {
                "id": "hdfc-classic",
                "name": "Classic",
                "type": "Both",
                "hasRM": false,
                "eligibility": {
                    "amb": 100000,
                    "aqb": null,
                    "salary": 100000,
                    "nrv": 500000,
                    "description": "AMB of \u20b91 Lakh in Savings OR \u20b92 Lakhs in Current OR \u20b91 Lakh net salary credit OR \u20b95 Lakhs in Savings+FD combined"
                },
                "benefits": {
                    "welcomeBenefits": null,
                    "debitCard": {
                        "name": "HDFC Classic Debit Card",
                        "image": "/assets/cards/debit/hdfc-classic.png",
                        "annualFee": 0,
                        "lounge": {
                            "domestic": "None",
                            "international": "None"
                        },
                        "limits": {
                            "atm": 50000,
                            "purchase": 200000
                        },
                        "forex": {
                            "markup": 0.035,
                            "text": "3.5%"
                        }
                    },
                    "locker": {
                        "discount": 0,
                        "text": "Standard locker rates apply"
                    },
                    "investments": {
                        "dematAmc": 750,
                        "text": "Standard Demat account charges"
                    },
                    "features": [
                        "Nil charges on non-maintenance of minimum balance",
                        "Free NEFT/RTGS through online mode",
                        "Free chequebook issuance",
                        "Free DD/MC up to \u20b91 Lakh per day",
                        "5 free cash transactions per month (limit \u20b92.5 Lakh)"
                    ]
                },
                "metadata": {
                    "bestFor": "Entry-level premium customers seeking basic enhanced banking services",
                    "rating": 3.5,
                    "pros": [
                        "Low minimum balance requirement",
                        "Wide ATM network",
                        "Good digital banking features",
                        "No non-maintenance charges"
                    ],
                    "cons": [
                        "No lounge access",
                        "No dedicated relationship manager",
                        "Standard forex markup"
                    ]
                }
            },
            {
                "id": "hdfc-preferred",
                "name": "Preferred",
                "type": "Both",
                "hasRM": true,
                "eligibility": {
                    "amb": 200000,
                    "aqb": null,
                    "salary": 200000,
                    "nrv": 1500000,
                    "description": "AMB of \u20b92 Lakhs in Savings OR \u20b95 Lakhs in Current OR \u20b92 Lakhs net salary credit OR \u20b915 Lakhs Retail Liability Value (Savings+FD)"
                },
                "benefits": {
                    "welcomeBenefits": "Preferred Platinum Chip Debit Card with premium benefits",
                    "debitCard": {
                        "name": "HDFC Preferred Platinum Chip Debit Card",
                        "image": "/assets/cards/debit/hdfc-preferred.png",
                        "annualFee": 0,
                        "lounge": {
                            "domestic": "4/year",
                            "international": "None"
                        },
                        "limits": {
                            "atm": 150000,
                            "purchase": 500000
                        },
                        "forex": {
                            "markup": 0.035,
                            "text": "3.5% (8 paise better on card rate for select currencies)"
                        }
                    },
                    "locker": {
                        "discount": 0.5,
                        "text": "50% discount on annual locker rent for first locker per group"
                    },
                    "investments": {
                        "dematAmc": 0,
                        "text": "Free Demat AMC with at least 1 transaction"
                    },
                    "features": [
                        "Dedicated Relationship Manager",
                        "7 free cash transactions per month (limit \u20b95 Lakh)",
                        "Free IMPS transactions",
                        "Priority service at branches",
                        "Extend benefits to up to 8 family members",
                        "Preferential rates on forex and loans"
                    ]
                },
                "metadata": {
                    "bestFor": "Professionals and high-salary individuals seeking dedicated banking support",
                    "rating": 4.0,
                    "pros": [
                        "Dedicated relationship manager",
                        "50% locker discount",
                        "Free Demat AMC",
                        "Family banking for up to 8 members"
                    ],
                    "cons": [
                        "No international lounge access",
                        "Standard forex markup",
                        "Limited domestic lounge visits"
                    ]
                }
            },
            {
                "id": "hdfc-imperia",
                "name": "Imperia",
                "type": "Both",
                "hasRM": true,
                "eligibility": {
                    "amb": 1000000,
                    "aqb": 1500000,
                    "salary": 300000,
                    "nrv": 3000000,
                    "description": "AMB of \u20b910 Lakhs in Savings OR AQB \u20b915 Lakhs in Current OR \u20b93 Lakhs net salary credit OR \u20b930 Lakhs in Savings+FD combined"
                },
                "benefits": {
                    "welcomeBenefits": "Premium Imperia welcome kit with Imperia Platinum Chip Debit Card and exclusive lifestyle privileges",
                    "debitCard": {
                        "name": "HDFC Imperia Platinum Chip Debit Card",
                        "image": "/assets/cards/debit/hdfc-imperia.png",
                        "annualFee": 0,
                        "lounge": {
                            "domestic": "Unlimited",
                            "international": "6/year"
                        },
                        "limits": {
                            "atm": 200000,
                            "purchase": 750000
                        },
                        "forex": {
                            "markup": 0.035,
                            "text": "3.5% (10 paise better on card rate for select currencies)"
                        }
                    },
                    "locker": {
                        "discount": 1.0,
                        "text": "Free locker (first locker per group)"
                    },
                    "investments": {
                        "dematAmc": 0,
                        "text": "Free Demat AMC for life with Special Demat Value Plan"
                    },
                    "features": [
                        "Dedicated Imperia Client Relationship Manager",
                        "Free locker annual rental",
                        "Unlimited domestic lounge access",
                        "International lounge access",
                        "Exclusive Imperia PhoneBanking (1800 266 3310)",
                        "Doorstep banking services",
                        "Exclusive quarterly Imperia e-magazine",
                        "24x7 concierge services",
                        "Visa at your Doorstep service"
                    ]
                },
                "metadata": {
                    "bestFor": "HNIs and senior professionals seeking comprehensive wealth management with lifestyle benefits",
                    "rating": 4.5,
                    "pros": [
                        "Free locker",
                        "Unlimited domestic lounge access",
                        "International lounge access",
                        "Dedicated senior relationship manager",
                        "Comprehensive lifestyle privileges"
                    ],
                    "cons": [
                        "High balance requirement",
                        "Forex markup not zero"
                    ]
                }
            },
            {
                "id": "hdfc-private-banking",
                "name": "Private Banking",
                "type": "Savings",
                "hasRM": true,
                "eligibility": {
                    "amb": null,
                    "aqb": null,
                    "salary": null,
                    "nrv": 100000000,
                    "description": "NRV of \u20b910 Crores or above with HDFC Bank. By invitation only."
                },
                "benefits": {
                    "welcomeBenefits": "Exclusive onboarding experience with personalized wealth assessment",
                    "debitCard": {
                        "name": "HDFC Private World Debit Card",
                        "image": "/assets/cards/debit/hdfc-private.png",
                        "annualFee": 0,
                        "lounge": {
                            "domestic": "Unlimited",
                            "international": "Unlimited"
                        },
                        "limits": {
                            "atm": 500000,
                            "purchase": 2000000
                        },
                        "forex": {
                            "markup": 0,
                            "text": "Zero Forex Markup"
                        }
                    },
                    "locker": {
                        "discount": 1.0,
                        "text": "Complimentary premium locker"
                    },
                    "investments": {
                        "dematAmc": 0,
                        "text": "Free Demat with dedicated investment advisory and priority IPO processing"
                    },
                    "features": [
                        "Dedicated Private Banker",
                        "Family office services",
                        "Bespoke investment solutions",
                        "Estate and succession planning",
                        "Global investment opportunities",
                        "Art advisory and curation",
                        "Exclusive Private Banking events",
                        "Priority airport services",
                        "Luxury travel and lifestyle management"
                    ]
                },
                "metadata": {
                    "bestFor": "Ultra HNIs requiring bespoke wealth management and family office services",
                    "rating": 5.0,
                    "pros": [
                        "Zero forex markup",
                        "Unlimited global lounge access",
                        "Comprehensive family office services",
                        "Bespoke wealth solutions"
                    ],
                    "cons": [
                        "Very high entry barrier (\u20b910 Cr NRV)",
                        "By invitation only"
                    ]
                }
            }
        ],
        "familyBanking": {
            "name": "HDFC Family Banking",
            "eligibility": {
                "minGroupNRV": 0,
                "description": "Up to 8 immediate family members can be grouped together to meet eligibility criteria"
            },
            "members": {
                "maxCount": 8,
                "allowed": [
                    "Spouse",
                    "Parents",
                    "Children"
                ]
            },
            "benefits": [
                "Pooled balance for tier qualification",
                "Shared locker benefits",
                "Combined monthly SmartStatement",
                "Single relationship manager for family"
            ]
        }
    },
    {
        "id": "icici-bank",
        "name": "ICICI Bank",
        "tiers": [
            {
                "id": "icici-privilege-silver",
                "name": "Privilege Banking - Silver",
                "type": "Both",
                "hasRM": false,
                "eligibility": {
                    "amb": 25000,
                    "aqb": null,
                    "salary": null,
                    "nrv": null,
                    "description": "AMB of \u20b925,000 in Savings Account or based on Total Relationship Value"
                },
                "benefits": {
                    "welcomeBenefits": null,
                    "debitCard": {
                        "name": "ICICI Privilege Titanium Debit Card",
                        "image": "/assets/cards/debit/icici-privilege-silver.png",
                        "annualFee": 0,
                        "lounge": {
                            "domestic": "None",
                            "international": "None"
                        },
                        "limits": {
                            "atm": 50000,
                            "purchase": 200000
                        },
                        "forex": {
                            "markup": 0.035,
                            "text": "3.5%"
                        }
                    },
                    "locker": {
                        "discount": 0,
                        "text": "Standard locker charges apply"
                    },
                    "investments": {
                        "dematAmc": 700,
                        "text": "Standard ICICI Direct charges"
                    },
                    "features": [
                        "Free Titanium Privilege Debit Card",
                        "iMobile Pay app access",
                        "Free NEFT/RTGS online",
                        "Basic insurance coverage"
                    ]
                },
                "metadata": {
                    "bestFor": "Entry-level customers seeking basic privilege banking",
                    "rating": 3.3,
                    "pros": [
                        "Low minimum balance",
                        "Good mobile banking app",
                        "Wide branch network"
                    ],
                    "cons": [
                        "No lounge access",
                        "No dedicated RM",
                        "Standard charges apply"
                    ]
                }
            },
            {
                "id": "icici-privilege-gold",
                "name": "Privilege Banking - Gold",
                "type": "Both",
                "hasRM": false,
                "eligibility": {
                    "amb": 50000,
                    "aqb": null,
                    "salary": 50000,
                    "nrv": null,
                    "description": "AMB of \u20b950,000 in Savings Account or salary credit of \u20b950,000 per month"
                },
                "benefits": {
                    "welcomeBenefits": null,
                    "debitCard": {
                        "name": "ICICI Privilege Gold Debit Card",
                        "image": "/assets/cards/debit/icici-privilege-gold.png",
                        "annualFee": 0,
                        "lounge": {
                            "domestic": "2/year",
                            "international": "None"
                        },
                        "limits": {
                            "atm": 100000,
                            "purchase": 300000
                        },
                        "forex": {
                            "markup": 0.035,
                            "text": "3.5%"
                        }
                    },
                    "locker": {
                        "discount": 0.1,
                        "text": "10% discount on locker rent"
                    },
                    "investments": {
                        "dematAmc": 700,
                        "text": "Standard ICICI Direct charges"
                    },
                    "features": [
                        "Free Gold Privilege Debit Card",
                        "Domestic lounge access",
                        "Priority service at select branches",
                        "Free NEFT/RTGS",
                        "Higher transaction limits"
                    ]
                },
                "metadata": {
                    "bestFor": "Mid-tier professionals seeking enhanced banking privileges",
                    "rating": 3.5,
                    "pros": [
                        "Domestic lounge access",
                        "Moderate minimum balance",
                        "Good transaction limits"
                    ],
                    "cons": [
                        "No international lounge",
                        "No dedicated RM",
                        "Limited lounge visits"
                    ]
                }
            },
            {
                "id": "icici-wealth-management",
                "name": "Wealth Management",
                "type": "Both",
                "hasRM": true,
                "eligibility": {
                    "amb": 1000000,
                    "aqb": null,
                    "salary": 300000,
                    "nrv": 5000000,
                    "description": "AMB of \u20b910 Lakhs or NRV of \u20b950 Lakhs or monthly salary of \u20b93 Lakhs. Criteria flexible based on relationship."
                },
                "benefits": {
                    "welcomeBenefits": "ICICI Wealth Select VISA Infinite Lifetime Free Debit Card with premium banking kit",
                    "debitCard": {
                        "name": "ICICI Wealth Select VISA Infinite Debit Card",
                        "image": "/assets/cards/debit/icici-wealth.png",
                        "annualFee": 0,
                        "lounge": {
                            "domestic": "Unlimited",
                            "international": "4/year"
                        },
                        "limits": {
                            "atm": 200000,
                            "purchase": 600000
                        },
                        "forex": {
                            "markup": 0.02,
                            "text": "2%"
                        }
                    },
                    "locker": {
                        "discount": 0.25,
                        "text": "25% discount on locker rent"
                    },
                    "investments": {
                        "dematAmc": 0,
                        "text": "Free ICICI Direct Demat AMC with research-backed recommendations"
                    },
                    "features": [
                        "Dedicated Relationship Manager",
                        "VISA Infinite Debit Card (Lifetime Free)",
                        "Priority banking at branches",
                        "Unlimited domestic lounge access",
                        "International lounge access",
                        "Preferential loan and FD rates",
                        "Expert investment advisory",
                        "Complimentary health check-up"
                    ]
                },
                "metadata": {
                    "bestFor": "Affluent individuals seeking comprehensive wealth management with dedicated support",
                    "rating": 4.3,
                    "pros": [
                        "Dedicated relationship manager",
                        "Unlimited domestic lounge",
                        "Lower forex markup",
                        "VISA Infinite debit card"
                    ],
                    "cons": [
                        "High AMB requirement",
                        "Limited international lounge visits"
                    ]
                }
            },
            {
                "id": "icici-private-banking",
                "name": "Private Banking",
                "type": "Savings",
                "hasRM": true,
                "eligibility": {
                    "amb": null,
                    "aqb": null,
                    "salary": null,
                    "nrv": 100000000,
                    "description": "NRV of \u20b910 Crores or above. By invitation only."
                },
                "benefits": {
                    "welcomeBenefits": "Bespoke onboarding with personalized wealth planning and Emeralde Private Metal Credit Card eligibility",
                    "debitCard": {
                        "name": "ICICI Private Banking World Debit Card",
                        "image": "/assets/cards/debit/icici-private.png",
                        "annualFee": 0,
                        "lounge": {
                            "domestic": "Unlimited",
                            "international": "Unlimited"
                        },
                        "limits": {
                            "atm": 500000,
                            "purchase": 2500000
                        },
                        "forex": {
                            "markup": 0,
                            "text": "Zero Forex Markup"
                        }
                    },
                    "locker": {
                        "discount": 1.0,
                        "text": "Complimentary premium locker"
                    },
                    "investments": {
                        "dematAmc": 0,
                        "text": "Free Demat with exclusive investment products and dedicated advisory"
                    },
                    "features": [
                        "Dedicated Private Banker",
                        "Emeralde Private Metal Credit Card eligibility",
                        "Global investment opportunities",
                        "Estate and succession planning",
                        "Art and wine advisory",
                        "Family governance solutions",
                        "Philanthropic advisory",
                        "Exclusive access to IPOs and deals",
                        "Global medical assistance"
                    ]
                },
                "metadata": {
                    "bestFor": "Ultra HNIs and families requiring multi-generational wealth management",
                    "rating": 5.0,
                    "pros": [
                        "Zero forex markup",
                        "Unlimited global lounge access",
                        "Comprehensive family office services",
                        "Premium credit card eligibility"
                    ],
                    "cons": [
                        "Very high entry requirement (\u20b910 Cr)",
                        "Invitation only"
                    ]
                }
            }
        ],
        "familyBanking": {
            "name": "ICICI Family Banking",
            "eligibility": {
                "minGroupNRV": 5000000,
                "description": "Combined NRV of \u20b950 Lakhs across family members for Wealth Management tier"
            },
            "members": {
                "maxCount": 5,
                "allowed": [
                    "Spouse",
                    "Parents",
                    "Children"
                ]
            },
            "benefits": [
                "Combined NRV for tier qualification",
                "Family health insurance at preferential rates",
                "Shared lounge access pool",
                "Single RM for entire family"
            ]
        }
    },
    {
        "id": "axis-bank",
        "name": "Axis Bank",
        "tiers": [
            {
                "id": "axis-priority",
                "name": "Priority",
                "type": "Both",
                "hasRM": true,
                "eligibility": {
                    "amb": 200000,
                    "aqb": null,
                    "salary": 100000,
                    "nrv": 1500000,
                    "description": "AMB of \u20b92 Lakhs in Savings OR TRV of \u20b915 Lakhs OR monthly net salary credit of \u20b91 Lakh"
                },
                "benefits": {
                    "welcomeBenefits": "Priority Debit Card with cashback benefits",
                    "debitCard": {
                        "name": "Axis Priority Debit Card",
                        "image": "/assets/cards/debit/axis-priority.png",
                        "annualFee": 0,
                        "lounge": {
                            "domestic": "4/year",
                            "international": "None"
                        },
                        "limits": {
                            "atm": 100000,
                            "purchase": 400000
                        },
                        "forex": {
                            "markup": 0.035,
                            "text": "3.5%"
                        }
                    },
                    "locker": {
                        "discount": 0.15,
                        "text": "15% discount on locker rent"
                    },
                    "investments": {
                        "dematAmc": 0,
                        "text": "Free Demat AMC (first year) via Axis Direct"
                    },
                    "features": [
                        "Dedicated Relationship Manager",
                        "Priority Debit Card with 1% cashback on online spends",
                        "T+24 hour service guarantee for select requests",
                        "Priority service at branches",
                        "Complimentary health insurance policy",
                        "Preferential loan processing"
                    ]
                },
                "metadata": {
                    "bestFor": "Professionals seeking dedicated banking support with reasonable balance requirements",
                    "rating": 4.0,
                    "pros": [
                        "Dedicated RM",
                        "Reasonable entry requirement",
                        "T+24 service guarantee",
                        "Good debit card cashback"
                    ],
                    "cons": [
                        "No international lounge",
                        "Standard forex markup",
                        "Limited lounge access"
                    ]
                }
            },
            {
                "id": "axis-burgundy",
                "name": "Burgundy",
                "type": "Both",
                "hasRM": true,
                "eligibility": {
                    "amb": 1000000,
                    "aqb": null,
                    "salary": 300000,
                    "nrv": 3000000,
                    "description": "AMB of \u20b910 Lakhs across Savings & Current OR TRV of \u20b930 Lakhs OR TRV \u20b91 Crore (incl. Demat) OR monthly net salary credit of \u20b93 Lakhs"
                },
                "benefits": {
                    "welcomeBenefits": "Exclusive Burgundy welcome box with lifestyle privileges",
                    "debitCard": {
                        "name": "Axis Burgundy Debit Card",
                        "image": "/assets/cards/debit/axis-burgundy.png",
                        "annualFee": 0,
                        "lounge": {
                            "domestic": "Unlimited",
                            "international": "4/year"
                        },
                        "limits": {
                            "atm": 200000,
                            "purchase": 800000
                        },
                        "forex": {
                            "markup": 0.02,
                            "text": "2%"
                        }
                    },
                    "locker": {
                        "discount": 0.6,
                        "text": "Up to 60% lifetime discount on locker rent"
                    },
                    "investments": {
                        "dematAmc": 0,
                        "text": "Free Demat with preferential brokerage via Axis Direct"
                    },
                    "features": [
                        "Senior Relationship Manager",
                        "Unlimited domestic lounge access",
                        "International lounge access",
                        "Complimentary BookMyShow tickets",
                        "Up to 60% locker discount",
                        "Doorstep banking",
                        "Wealth management solutions",
                        "Preferential rates on forex and loans"
                    ]
                },
                "metadata": {
                    "bestFor": "HNIs seeking premium banking with excellent lounge benefits and lifestyle privileges",
                    "rating": 4.5,
                    "pros": [
                        "Unlimited domestic lounge",
                        "Lower forex markup (2%)",
                        "Up to 60% locker discount",
                        "Comprehensive wealth management"
                    ],
                    "cons": [
                        "High AMB requirement",
                        "Limited international lounge"
                    ]
                }
            },
            {
                "id": "axis-burgundy-private",
                "name": "Burgundy Private",
                "type": "Savings",
                "hasRM": true,
                "eligibility": {
                    "amb": null,
                    "aqb": null,
                    "salary": 1000000,
                    "nrv": 50000000,
                    "description": "TRV of \u20b95 Crores (excluding Demat holdings) OR monthly net salary credit of \u20b910 Lakhs"
                },
                "benefits": {
                    "welcomeBenefits": "Ultra-premium onboarding with dedicated Private Client Director and Burgundy Private One Card",
                    "debitCard": {
                        "name": "Axis Burgundy Private World Debit Card",
                        "image": "/assets/cards/debit/axis-burgundy-private.png",
                        "annualFee": 0,
                        "lounge": {
                            "domestic": "Unlimited",
                            "international": "Unlimited"
                        },
                        "limits": {
                            "atm": 500000,
                            "purchase": 2000000
                        },
                        "forex": {
                            "markup": 0,
                            "text": "Zero Forex Markup"
                        }
                    },
                    "locker": {
                        "discount": 1.0,
                        "text": "Complimentary premium locker (after 12 months of relationship)"
                    },
                    "investments": {
                        "dematAmc": 0,
                        "text": "Free Demat with exclusive investment opportunities and advisory"
                    },
                    "features": [
                        "Dedicated Private Client Director",
                        "The One Card (combined Debit + Credit)",
                        "Zero forex markup",
                        "Unlimited global lounge access",
                        "Estate planning and succession services",
                        "Global investment advisory",
                        "Art and collectibles advisory",
                        "Exclusive access to pre-IPO deals",
                        "Private jet booking assistance",
                        "Global concierge services"
                    ]
                },
                "metadata": {
                    "bestFor": "Ultra HNIs and business families requiring bespoke wealth solutions",
                    "rating": 4.9,
                    "pros": [
                        "Zero forex markup",
                        "Unlimited global lounge",
                        "The One Card unique proposition",
                        "Comprehensive private banking"
                    ],
                    "cons": [
                        "High entry barrier (\u20b95 Cr TRV)",
                        "Demat no longer counted in TRV"
                    ]
                }
            }
        ],
        "familyBanking": {
            "name": "Burgundy Family Banking",
            "eligibility": {
                "minGroupNRV": 3000000,
                "description": "Combined TRV of \u20b930 Lakhs across family members for Burgundy tier"
            },
            "members": {
                "maxCount": 6,
                "allowed": [
                    "Spouse",
                    "Parents",
                    "Children",
                    "Siblings"
                ]
            },
            "benefits": [
                "Combined TRV for Burgundy qualification",
                "All family members get Burgundy privileges with Burgundy Savings Account",
                "Family lounge access sharing",
                "Single relationship manager for family"
            ]
        }
    },
    {
        "id": "sbi",
        "name": "State Bank of India",
        "tiers": [
            {
                "id": "sbi-silver",
                "name": "Silver",
                "type": "Both",
                "hasRM": false,
                "eligibility": {
                    "amb": null,
                    "aqb": 100000,
                    "salary": 25000,
                    "nrv": null,
                    "description": "AQB up to \u20b91 Lakh across all deposits OR take-home salary between \u20b910,000-\u20b925,000"
                },
                "benefits": {
                    "welcomeBenefits": null,
                    "debitCard": {
                        "name": "SBI Classic Debit Card",
                        "image": "/assets/cards/debit/sbi-classic.png",
                        "annualFee": 0,
                        "lounge": {
                            "domestic": "None",
                            "international": "None"
                        },
                        "limits": {
                            "atm": 20000,
                            "purchase": 50000
                        },
                        "forex": {
                            "markup": 0.035,
                            "text": "3.5%"
                        }
                    },
                    "locker": {
                        "discount": 0,
                        "text": "No discount"
                    },
                    "investments": {
                        "dematAmc": 500,
                        "text": "Standard charges"
                    },
                    "features": [
                        "Most widely accepted debit card",
                        "Access to largest branch network",
                        "YONO app access",
                        "Basic insurance coverage"
                    ]
                },
                "metadata": {
                    "bestFor": "General public seeking reliable banking with largest network",
                    "rating": 3.0,
                    "pros": [
                        "Largest branch network",
                        "Zero balance option (Basic Savings)",
                        "Reliable digital banking"
                    ],
                    "cons": [
                        "Crowded branches",
                        "No personalized service",
                        "Basic benefits"
                    ]
                }
            },
            {
                "id": "sbi-gold",
                "name": "Gold",
                "type": "Both",
                "hasRM": false,
                "eligibility": {
                    "amb": null,
                    "aqb": 500000,
                    "salary": 50000,
                    "nrv": null,
                    "description": "AQB between \u20b91 Lakh - \u20b95 Lakhs across deposits OR take-home salary between \u20b925,000-\u20b950,000"
                },
                "benefits": {
                    "welcomeBenefits": null,
                    "debitCard": {
                        "name": "SBI Gold Debit Card",
                        "image": "/assets/cards/debit/sbi-gold.png",
                        "annualFee": 0,
                        "lounge": {
                            "domestic": "None",
                            "international": "None"
                        },
                        "limits": {
                            "atm": 50000,
                            "purchase": 500000
                        },
                        "forex": {
                            "markup": 0.035,
                            "text": "3.5%"
                        }
                    },
                    "locker": {
                        "discount": 0.1,
                        "text": "10% discount on locker rent"
                    },
                    "investments": {
                        "dematAmc": 500,
                        "text": "Standard charges"
                    },
                    "features": [
                        "SBI Gold International Debit Card",
                        "Higher transaction limits",
                        "Personal accident insurance",
                        "Purchase protection"
                    ]
                },
                "metadata": {
                    "bestFor": "Salaried individuals and mid-segment savers",
                    "rating": 3.2,
                    "pros": [
                        "Decent transaction limits",
                        "Accident insurance included",
                        "Some locker discount"
                    ],
                    "cons": [
                        "No lounge access",
                        "No dedicated RM",
                        "Standard forex"
                    ]
                }
            },
            {
                "id": "sbi-diamond",
                "name": "Diamond",
                "type": "Both",
                "hasRM": false,
                "eligibility": {
                    "amb": null,
                    "aqb": 2500000,
                    "salary": 200000,
                    "nrv": null,
                    "description": "AQB between \u20b95 Lakhs - \u20b930 Lakhs across deposits OR salary between \u20b950,000-\u20b92 Lakhs"
                },
                "benefits": {
                    "welcomeBenefits": null,
                    "debitCard": {
                        "name": "SBI Platinum International Debit Card",
                        "image": "/assets/cards/debit/sbi-platinum.png",
                        "annualFee": 0,
                        "lounge": {
                            "domestic": "2/year",
                            "international": "None"
                        },
                        "limits": {
                            "atm": 100000,
                            "purchase": 500000
                        },
                        "forex": {
                            "markup": 0.035,
                            "text": "3.5%"
                        }
                    },
                    "locker": {
                        "discount": 0.25,
                        "text": "25% discount on locker rent"
                    },
                    "investments": {
                        "dematAmc": 400,
                        "text": "Lower Demat charges"
                    },
                    "features": [
                        "2 Free domestic airport lounge visits per quarter",
                        "Priority processing at branches",
                        "Lower service charges on various services",
                        "Concession on home loan processing fees"
                    ]
                },
                "metadata": {
                    "bestFor": "Affluent customers seeking value with low balance requirements vs private banks",
                    "rating": 3.8,
                    "pros": [
                        "Lounge access included",
                        "25% locker discount",
                        "Priority processing",
                        "Good home loan rates"
                    ],
                    "cons": [
                        "Service can still be slow compared to private banks",
                        "No dedicated RM typically"
                    ]
                }
            },
            {
                "id": "sbi-platinum",
                "name": "Platinum",
                "type": "Both",
                "hasRM": true,
                "eligibility": {
                    "amb": null,
                    "aqb": 5000000,
                    "salary": 500000,
                    "nrv": null,
                    "description": "AQB above \u20b930 Lakhs across deposits OR salary above \u20b92 Lakhs OR Home Loan above \u20b91 Crore"
                },
                "benefits": {
                    "welcomeBenefits": "Exclusive SBI Wealth Debit Card",
                    "debitCard": {
                        "name": "SBI Wealth Visa Signature Debit Card",
                        "image": "/assets/cards/debit/sbi-wealth.png",
                        "annualFee": 0,
                        "lounge": {
                            "domestic": "Unlimited",
                            "international": "2/year"
                        },
                        "limits": {
                            "atm": 200000,
                            "purchase": 1000000
                        },
                        "forex": {
                            "markup": 0.03,
                            "text": "3%"
                        }
                    },
                    "locker": {
                        "discount": 0.5,
                        "text": "50% discount on locker rent"
                    },
                    "investments": {
                        "dematAmc": 0,
                        "text": "Free Demat AMC"
                    },
                    "features": [
                        "Dedicated Relationship Manager (SBI Wealth)",
                        "SBI Wealth Hub access",
                        "Extended banking hours",
                        "Doorstep banking",
                        "Unlimited domestic lounge access",
                        "Concierge services",
                        "Best-in-class home loan rates"
                    ]
                },
                "metadata": {
                    "bestFor": "HNIs desiring PSU safety with private-bank-like privileges",
                    "rating": 4.2,
                    "pros": [
                        "Dedicated RM via SBI Wealth",
                        "Unlimited domestic lounge",
                        "Govt back safety",
                        "50% locker discount"
                    ],
                    "cons": [
                        "Wealth hubs limited to major cities",
                        "Tech interface lags behind private players"
                    ]
                }
            }
        ],
        "familyBanking": {
            "name": "SBI Customer Segmentation - Family",
            "eligibility": {
                "minGroupNRV": 0,
                "description": "Based on tier (Silver/Gold/Diamond/Platinum)"
            },
            "members": {
                "maxCount": 4,
                "allowed": [
                    "Spouse",
                    "Parents",
                    "Dependent Children"
                ]
            },
            "benefits": [
                "Combined AQB calculation",
                "Reduced locker charges",
                "Combined insurance benefits",
                "Preferential loan rates",
                "Single statement option",
                "Priority service at branches"
            ]
        }
    },
    {
        "id": "kotak-mahindra",
        "name": "Kotak Mahindra Bank",
        "tiers": [
            {
                "id": "kotak-privy-league-neon",
                "name": "Privy League - Neon",
                "type": "Both",
                "hasRM": false,
                "eligibility": {
                    "amb": 200000,
                    "aqb": null,
                    "salary": 150000,
                    "nrv": 1000000,
                    "description": "AMB \u20b92 Lakhs OR Net Salary \u20b91.5 Lakhs OR Total Relationship Value \u20b910 Lakhs"
                },
                "benefits": {
                    "welcomeBenefits": null,
                    "debitCard": {
                        "name": "Kotak Privy League Signature Debit Card",
                        "image": "/assets/cards/debit/kotak-neon.png",
                        "annualFee": 0,
                        "lounge": {
                            "domestic": "2/quarter",
                            "international": "None"
                        },
                        "limits": {
                            "atm": 100000,
                            "purchase": 400000
                        },
                        "forex": {
                            "markup": 0.035,
                            "text": "3.5%"
                        }
                    },
                    "locker": {
                        "discount": 0.25,
                        "text": "25% discount on locker rent"
                    },
                    "investments": {
                        "dematAmc": 0,
                        "text": "Zero Demat AMC"
                    },
                    "features": [
                        "Dedicated Service Desk",
                        "Free IMPS/NEFT/RTGS",
                        "Access to Privy League portal",
                        "Doorstep banking (paid)",
                        "Preferential Forex rates"
                    ]
                },
                "metadata": {
                    "bestFor": "Early career professionals with decent savings",
                    "rating": 3.8,
                    "pros": [
                        "Low entry barrier (\u20b910L TRV)",
                        "Lounge access included",
                        "Zero Demat AMC",
                        "25% locker discount"
                    ],
                    "cons": [
                        "No personal RM",
                        "Limited lounge visits",
                        "Standard forex"
                    ]
                }
            },
            {
                "id": "kotak-privy-league-platinum",
                "name": "Privy League - Platinum",
                "type": "Both",
                "hasRM": true,
                "eligibility": {
                    "amb": 500000,
                    "aqb": null,
                    "salary": 300000,
                    "nrv": 3000000,
                    "description": "AMB \u20b95 Lakhs OR Net Salary \u20b93 Lakhs OR Total Relationship Value \u20b930 Lakhs"
                },
                "benefits": {
                    "welcomeBenefits": "Premium Welcome Kit",
                    "debitCard": {
                        "name": "Kotak Privy League Platinum Debit Card",
                        "image": "/assets/cards/debit/kotak-platinum.png",
                        "annualFee": 0,
                        "lounge": {
                            "domestic": "Unlimited",
                            "international": "None"
                        },
                        "limits": {
                            "atm": 150000,
                            "purchase": 500000
                        },
                        "forex": {
                            "markup": 0.02,
                            "text": "2%"
                        }
                    },
                    "locker": {
                        "discount": 0.5,
                        "text": "50% discount on locker rent"
                    },
                    "investments": {
                        "dematAmc": 0,
                        "text": "Zero Demat AMC with dedicated dealer"
                    },
                    "features": [
                        "Dedicated Relationship Manager",
                        "Unlimited domestic lounge access",
                        "Priority service",
                        "Free movie tickets (via debit card)",
                        "Home Banking services",
                        "Preferential loan rates"
                    ]
                },
                "metadata": {
                    "bestFor": "Affluent customers seeking a balanced premium banking experience",
                    "rating": 4.2,
                    "pros": [
                        "Unlimited domestic lounge",
                        "Dedicated RM",
                        "50% locker discount",
                        "2% forex markup"
                    ],
                    "cons": [
                        "No international lounge",
                        "Strict non-maintenance charges"
                    ]
                }
            },
            {
                "id": "kotak-privy-league-black",
                "name": "Privy League - Black",
                "type": "Savings",
                "hasRM": true,
                "eligibility": {
                    "amb": null,
                    "aqb": null,
                    "salary": null,
                    "nrv": 10000000,
                    "description": "Total Relationship Value of \u20b91 Crore or more"
                },
                "benefits": {
                    "welcomeBenefits": "Elite Black Welcome Kit with Metal Debit Card",
                    "debitCard": {
                        "name": "Kotak PC Wealth Metal Debit Card",
                        "image": "/assets/cards/debit/kotak-black.png",
                        "annualFee": 0,
                        "lounge": {
                            "domestic": "Unlimited",
                            "international": "Unlimited"
                        },
                        "limits": {
                            "atm": 200000,
                            "purchase": 800000
                        },
                        "forex": {
                            "markup": 0,
                            "text": "Zero Forex Markup"
                        }
                    },
                    "locker": {
                        "discount": 1.0,
                        "text": "Complimentary locker"
                    },
                    "investments": {
                        "dematAmc": 0,
                        "text": "Free Demat with dedicated wealth manager"
                    },
                    "features": [
                        "Dedicated Wealth Manager",
                        "Zero Forex Markup",
                        "Metal Debit Card",
                        "Unlimited global lounge access",
                        "Concierge services",
                        "Invitation to exclusive events",
                        "Family banking benefits included",
                        "Bespoke investment solutions"
                    ]
                },
                "metadata": {
                    "bestFor": "HNIs requiring top-tier luxury banking services",
                    "rating": 4.8,
                    "pros": [
                        "Zero forex markup",
                        "Free locker",
                        "Metal card",
                        "Comprehensive wealth management"
                    ],
                    "cons": [
                        "High entry barrier (\u20b91 Cr RV)"
                    ]
                }
            }
        ],
        "familyBanking": {
            "name": "Kotak Privy League Family",
            "eligibility": {
                "minGroupNRV": 0,
                "description": "Based on tier (Neon: \u20b910L RV / Platinum: \u20b930L RV / Black: \u20b91Cr RV)"
            },
            "members": {
                "maxCount": 4,
                "allowed": [
                    "Spouse",
                    "Parents",
                    "Children"
                ]
            },
            "benefits": [
                "Shared Privy League privileges",
                "Family lounge access pool",
                "Wealth management for family",
                "Joint investment planning",
                "Combined credit card benefits",
                "Complimentary debit cards for family"
            ]
        }
    },
    {
        "id": "idfc-first-bank",
        "name": "IDFC First Bank",
        "tiers": [
            {
                "id": "idfc-first-select",
                "name": "First Select",
                "type": "Savings",
                "hasRM": false,
                "eligibility": {
                    "amb": 300000,
                    "aqb": null,
                    "salary": null,
                    "nrv": null,
                    "description": "AMB of \u20b93 Lakhs in Savings Account"
                },
                "benefits": {
                    "welcomeBenefits": "Welcome voucher worth \u20b91500",
                    "debitCard": {
                        "name": "IDFC First Select Debit Card",
                        "image": "/assets/cards/debit/idfc-select.png",
                        "annualFee": 0,
                        "lounge": {
                            "domestic": "2/quarter",
                            "international": "None"
                        },
                        "limits": {
                            "atm": 200000,
                            "purchase": 600000
                        },
                        "forex": {
                            "markup": 0,
                            "text": "Zero Forex Markup (International usage)"
                        }
                    },
                    "locker": {
                        "discount": 0.2,
                        "text": "20% discount on locker rent"
                    },
                    "investments": {
                        "dematAmc": 0,
                        "text": "Zero Demat AMC for life"
                    },
                    "features": [
                        "Monthly interest credit on Savings",
                        "High savings interest rates (up to 7.25%)",
                        "Free airport lounge access",
                        "Zero fee banking (IMPS/NEFT/RTGS/Cash)",
                        "Buy 1 Get 1 movie tickets via Paytm"
                    ]
                },
                "metadata": {
                    "bestFor": "Digitally savvy users wanting high interest and zero fees",
                    "rating": 4.5,
                    "pros": [
                        "High interest rates",
                        "Monthly interest payout",
                        "Zero forex debit card",
                        "Lounge access included"
                    ],
                    "cons": [
                        "No dedicated RM",
                        "Smaller branch network",
                        "AMB of 3L is high for mass affluent"
                    ]
                }
            },
            {
                "id": "idfc-first-wealth",
                "name": "First Wealth",
                "type": "Savings",
                "hasRM": true,
                "eligibility": {
                    "amb": 1000000,
                    "aqb": null,
                    "salary": null,
                    "nrv": null,
                    "description": "AMB of \u20b910 Lakhs in Savings Account"
                },
                "benefits": {
                    "welcomeBenefits": "Welcome voucher worth \u20b93000",
                    "debitCard": {
                        "name": "IDFC First Wealth Debit Card",
                        "image": "/assets/cards/debit/idfc-wealth.png",
                        "annualFee": 0,
                        "lounge": {
                            "domestic": "4/quarter",
                            "international": "2/quarter"
                        },
                        "limits": {
                            "atm": 500000,
                            "purchase": 1000000
                        },
                        "forex": {
                            "markup": 0,
                            "text": "Zero Forex Markup"
                        }
                    },
                    "locker": {
                        "discount": 0.5,
                        "text": "50% discount on locker rent"
                    },
                    "investments": {
                        "dematAmc": 0,
                        "text": "Zero Demat AMC for life with dedicated RM"
                    },
                    "features": [
                        "Dedicated Relationship Manager",
                        "Curated First Wealth privileges",
                        "Higher lounge access limits",
                        "Premium metal debit card styling",
                        "Exclusive BookMyShow offers (Buy 1 Get 1 up to \u20b9500)",
                        "Complimentary Roadside Assistance"
                    ]
                },
                "metadata": {
                    "bestFor": "HNIs seeking best-in-class interest rates and zero fee banking",
                    "rating": 4.6,
                    "pros": [
                        "High interest rates",
                        "Dedicated RM",
                        "Zero forex card",
                        "International lounge access",
                        "Excellent app interface"
                    ],
                    "cons": [
                        "Limited physical branch presence",
                        "Newer bank brand perception"
                    ]
                }
            },
            {
                "id": "idfc-first-private",
                "name": "First Private",
                "type": "Savings",
                "hasRM": true,
                "eligibility": {
                    "amb": 5000000,
                    "aqb": null,
                    "salary": null,
                    "nrv": null,
                    "description": "AMB of \u20b950 Lakhs in Savings Account or Invitation Only"
                },
                "benefits": {
                    "welcomeBenefits": "Exclusive Private Banking Welcome Experience",
                    "debitCard": {
                        "name": "IDFC First Private Infinite Debit Card",
                        "image": "/assets/cards/debit/idfc-private.png",
                        "annualFee": 0,
                        "lounge": {
                            "domestic": "Unlimited",
                            "international": "Unlimited"
                        },
                        "limits": {
                            "atm": 700000,
                            "purchase": 1500000
                        },
                        "forex": {
                            "markup": 0,
                            "text": "Zero Forex Markup"
                        }
                    },
                    "locker": {
                        "discount": 1.0,
                        "text": "Complimentary locker (subject to availability)"
                    },
                    "investments": {
                        "dematAmc": 0,
                        "text": "Zero Demat AMC with top-tier investment advisory"
                    },
                    "features": [
                        "Dedicated Private Banker",
                        "Metal Infinite Debit Card",
                        "Unlimited Lounge & Spa access",
                        "Bespoke wealth management",
                        "Exclusive Golf privileges",
                        "Private Client Helpline",
                        "Customized lending solutions",
                        "Global concierge"
                    ]
                },
                "metadata": {
                    "bestFor": "Ultra HNIs who value digital-first banking with luxury perks",
                    "rating": 4.7,
                    "pros": [
                        "Complimentary locker",
                        "Unlimited lounge & spa",
                        "Metal card",
                        "Strong digital wealth platform"
                    ],
                    "cons": [
                        "Strict high balance criteria",
                        "Very exclusive/limited availability"
                    ]
                }
            }
        ],
        "familyBanking": {
            "name": "IDFC First Family Banking",
            "eligibility": {
                "minGroupNRV": 0,
                "description": "Based on tier (Select: \u20b93L / Wealth: \u20b910L / Private: \u20b950L AMB)"
            },
            "members": {
                "maxCount": 5,
                "allowed": [
                    "Spouse",
                    "Parents",
                    "Children"
                ]
            },
            "benefits": [
                "Shared First Select/Wealth/Private benefits",
                "Combined high-interest savings (up to 7.25%)",
                "Family health coverage",
                "Shared lounge access",
                "Zero forex markup for Private tier",
                "Complimentary locker (Private tier, subject to availability)"
            ]
        }
    },
    {
        "id": "idfc-first-bank",
        "name": "IDFC FIRST Bank",
        "tiers": [
            {
                "id": "idfc-first-wealth",
                "name": "First Wealth",
                "type": "Both",
                "hasRM": true,
                "eligibility": {
                    "amb": 1000000,
                    "aqb": 0,
                    "salary": 500000,
                    "nrv": 1000000,
                    "description": "AMB \u2265\u20b910 Lakhs in Savings/Current Account OR AUM \u2265\u20b910 Lakhs in Mutual Funds/Alternates OR ORV \u2265\u20b910 Lakhs across accounts, deposits and investments OR Net Monthly Salary credit \u2265\u20b95 Lakhs for IDFC FIRST Corporate Salary customers. Family grouping eligible."
                },
                "benefits": {
                    "welcomeBenefits": "Amazon vouchers worth \u20b93,000+ on account opening with eligible criteria",
                    "debitCard": {
                        "name": "FIRST Wealth Visa Signature Debit Card",
                        "image": "/assets/cards/debit/idfc-first-wealth.png",
                        "annualFee": 0,
                        "lounge": {
                            "domestic": "3/quarter (\u20b92 access fee)",
                            "international": "2/quarter (USD 32 reversed)"
                        },
                        "limits": {
                            "atm": 700000,
                            "purchase": 1200000
                        },
                        "forex": {
                            "markup": 0.02,
                            "text": "2% forex markup on international transactions"
                        }
                    },
                    "locker": {
                        "discount": 0.25,
                        "text": "25% discount on locker rental"
                    },
                    "investments": {
                        "dematAmc": 0,
                        "text": "Free Demat account with preferential brokerage rates"
                    },
                    "features": [
                        "Monthly interest payout on savings account (unique industry feature)",
                        "Up to 7% p.a. interest on balances \u2265\u20b95 Lakhs",
                        "Zero charges on 30+ banking services including NEFT/RTGS/IMPS",
                        "Dedicated Relationship Manager with priority phone/email support",
                        "VISA Concierge - 24/7 digital personal assistant",
                        "Complimentary FIRST Wealth Credit Card (LTF)",
                        "Personal Accident Insurance \u20b950 Lakhs",
                        "Air Accident Insurance \u20b91.5 Crore",
                        "Purchase Protection \u20b91 Lakh",
                        "Lost Card Liability Cover \u20b910 Lakhs",
                        "Preferential pricing on loans and forex"
                    ]
                },
                "metadata": {
                    "bestFor": "High-yield savings seekers wanting monthly interest compounding",
                    "rating": 4.5,
                    "pros": [
                        "Monthly interest payout accelerates compounding",
                        "Industry-leading 7% interest on high balances",
                        "Zero fee banking on all services",
                        "Lifetime free premium credit card bundled"
                    ],
                    "cons": [
                        "2% forex markup on debit card (not zero)",
                        "Limited branch network compared to larger banks",
                        "Lounge access requires nominal fee"
                    ]
                }
            },
            {
                "id": "idfc-first-private",
                "name": "First Private",
                "type": "Both",
                "hasRM": true,
                "eligibility": {
                    "amb": 5000000,
                    "aqb": 0,
                    "salary": 0,
                    "nrv": 5000000,
                    "description": "AMB/AUM/ORV \u2265\u20b950 Lakhs across savings accounts, deposits, and investments. Dedicated Private Banker assigned. Family grouping eligible for NRV calculation."
                },
                "benefits": {
                    "welcomeBenefits": "Premium welcome kit with exclusive lifestyle benefits and Amazon vouchers",
                    "debitCard": {
                        "name": "FIRST Private Metal Debit Card",
                        "image": "/assets/cards/debit/idfc-first-private.png",
                        "annualFee": 0,
                        "lounge": {
                            "domestic": "4/quarter (\u20b92 access fee)",
                            "international": "6/quarter (USD 32 reversed)"
                        },
                        "limits": {
                            "atm": 1000000,
                            "purchase": 1500000
                        },
                        "forex": {
                            "markup": 0.02,
                            "text": "2% forex markup on international transactions"
                        }
                    },
                    "locker": {
                        "discount": 0.5,
                        "text": "50% discount on locker rental"
                    },
                    "investments": {
                        "dematAmc": 0,
                        "text": "Free Demat with premium brokerage services and Morningstar insights"
                    },
                    "features": [
                        "India's first standalone metal debit card",
                        "Monthly interest payout on savings account",
                        "Up to 7% p.a. interest on balances \u2265\u20b95 Lakhs",
                        "Dedicated Private Banker + Relationship Manager + Portfolio Specialists",
                        "Alternative Investment ecosystem - Offshore solutions, PMS, AIFs, Pre-IPO funds",
                        "Strong in-house research team with Morningstar insights",
                        "Complimentary FIRST Private Credit Card (LTF)",
                        "1 complimentary golf access per month at partner clubs",
                        "10X reward points on debit card purchases",
                        "Air Accident Insurance \u20b95 Crore",
                        "Personal Accident Cover \u20b91.5 Crore",
                        "Purchase Protection \u20b92 Lakhs",
                        "Lost Card Liability Cover \u20b915 Lakhs"
                    ]
                },
                "metadata": {
                    "bestFor": "Ultra HNIs seeking comprehensive wealth management with metal card prestige",
                    "rating": 4.7,
                    "pros": [
                        "Prestigious metal debit card - first in India",
                        "Comprehensive wealth management ecosystem",
                        "Access to alternative investments and offshore solutions",
                        "Highest insurance covers in the category"
                    ],
                    "cons": [
                        "High entry barrier at \u20b950 Lakhs",
                        "Still has 2% forex markup unlike some competitors",
                        "Limited to select cities for full service experience"
                    ]
                }
            }
        ],
        "familyBanking": {
            "name": "FIRST Family Banking",
            "eligibility": {
                "minGroupNRV": 1000000,
                "description": "Eligibility criteria can include AMB/AUM/ORV maintained by family members when categorized in same relationship/group"
            },
            "members": {
                "maxCount": 6,
                "allowed": [
                    "Spouse",
                    "Children",
                    "Parents",
                    "Siblings"
                ]
            },
            "benefits": [
                "Combined NRV calculation across family members",
                "Shared program benefits for all grouped accounts",
                "Single Group ID for unified relationship tracking",
                "Common Relationship Manager for entire family"
            ]
        }
    },
    {
        "id": "indusind-bank",
        "name": "IndusInd Bank",
        "tiers": [
            {
                "id": "indusind-pioneer",
                "name": "Pioneer",
                "type": "Both",
                "hasRM": true,
                "eligibility": {
                    "amb": 0,
                    "aqb": 1000000,
                    "salary": 250000,
                    "nrv": 3000000,
                    "description": "AQB \u2265\u20b910 Lakhs in Savings/Current Account (group-based) OR NRV \u2265\u20b930 Lakhs (group-based) with AQB \u2265\u20b91 Lakh OR Net Monthly Salary \u2265\u20b92.5 Lakhs in Pioneer Salary Account. NMC charges applicable from Jan 2026."
                },
                "benefits": {
                    "welcomeBenefits": "Premium welcome kit with leather organizer and exclusive lifestyle vouchers",
                    "debitCard": {
                        "name": "Pioneer Visa Infinite/Mastercard World Debit Card",
                        "image": "/assets/cards/debit/indusind-pioneer.png",
                        "annualFee": 0,
                        "lounge": {
                            "domestic": "2/quarter",
                            "international": "Unlimited via Priority Pass (nominal fee)"
                        },
                        "limits": {
                            "atm": 500000,
                            "purchase": 1000000
                        },
                        "forex": {
                            "markup": 0.0,
                            "text": "Zero cross-currency markup on international transactions"
                        }
                    },
                    "locker": {
                        "discount": 1.0,
                        "text": "Complimentary small/medium locker; 75% off large, 50% off jumbo"
                    },
                    "investments": {
                        "dematAmc": 0,
                        "text": "IndusInd DP services with preferential brokerage"
                    },
                    "features": [
                        "Zero forex markup on debit card - key differentiator",
                        "Metal form factor debit cards available",
                        "My Account My Number - choose your account number",
                        "Doorstep banking - cash delivery/pickup up to \u20b94 Lakhs/day free",
                        "Up to 10 family/business accounts grouping",
                        "Free unlimited ATM transactions at non-IndusInd ATMs",
                        "POS limit up to \u20b910 Lakhs/day",
                        "Four-tiered investment program",
                        "VISA Concierge services",
                        "Document pickup from overseas (2 free/year)",
                        "Video banking with Branch Manager/RM"
                    ]
                },
                "metadata": {
                    "bestFor": "International travelers wanting zero forex markup on debit card",
                    "rating": 4.4,
                    "pros": [
                        "Zero forex markup - best for international spends",
                        "Generous locker benefits - free small/medium",
                        "Choose your own account number feature",
                        "Excellent doorstep banking services"
                    ],
                    "cons": [
                        "NMC charges starting Jan 2026",
                        "Available only at select locations",
                        "Branch service quality varies significantly"
                    ]
                }
            },
            {
                "id": "indusind-exclusive",
                "name": "Exclusive",
                "type": "Savings",
                "hasRM": true,
                "eligibility": {
                    "amb": 0,
                    "aqb": 200000,
                    "salary": 0,
                    "nrv": 0,
                    "description": "AQB \u2265\u20b92 Lakhs in Savings Account OR Hold IndusInd Pinnacle/Indulge Credit Card (zero balance account eligible)"
                },
                "benefits": {
                    "welcomeBenefits": "BookMyShow vouchers and lifestyle offers",
                    "debitCard": {
                        "name": "Visa Signature Exclusive/Mastercard World Exclusive Debit Card",
                        "image": "/assets/cards/debit/indusind-exclusive.png",
                        "annualFee": 0,
                        "lounge": {
                            "domestic": "1/quarter",
                            "international": "Not included"
                        },
                        "limits": {
                            "atm": 200000,
                            "purchase": 400000
                        },
                        "forex": {
                            "markup": 0.0,
                            "text": "Zero cross-currency markup on Signature Exclusive card; 1% on Platinum variant"
                        }
                    },
                    "locker": {
                        "discount": 0.5,
                        "text": "50% off on standard/medium lockers; 25% off on large/jumbo"
                    },
                    "investments": {
                        "dematAmc": 0,
                        "text": "Demat AMC waiver for 2 years"
                    },
                    "features": [
                        "Zero forex markup on Signature variant",
                        "6X reward points program on debit card",
                        "20% off up to \u20b9500 on BigBasket (1st-25th monthly)",
                        "Buy 1 Get 1 on BookMyShow movie tickets",
                        "Up to 10% instant discount on Zomato",
                        "Complimentary insurance coverage \u20b935.5 Lakhs",
                        "20% discount on loan processing fees",
                        "Up to 6 zero balance family accounts",
                        "Free unlimited ATM withdrawals in India and abroad"
                    ]
                },
                "metadata": {
                    "bestFor": "Credit card holders wanting zero balance premium savings account",
                    "rating": 4.2,
                    "pros": [
                        "Zero balance if holding Pinnacle/Indulge credit card",
                        "Zero forex markup on international transactions",
                        "Excellent BigBasket monthly discount",
                        "Good insurance coverage bundled"
                    ],
                    "cons": [
                        "No international lounge access",
                        "Lower transaction limits than Pioneer",
                        "Limited branch awareness of credit card linkage benefit"
                    ]
                }
            }
        ],
        "familyBanking": {
            "name": "Pioneer Family Banking",
            "eligibility": {
                "minGroupNRV": 3000000,
                "description": "Group-based eligibility across family and business accounts"
            },
            "members": {
                "maxCount": 10,
                "allowed": [
                    "Spouse",
                    "Children",
                    "Parents",
                    "Business Entities"
                ]
            },
            "benefits": [
                "All group members get Pioneer benefits",
                "Combined NRV/AQB calculation",
                "Single relationship management",
                "Extended locker discounts to 3 family members"
            ]
        }
    },
    {
        "id": "yes-bank",
        "name": "YES Bank",
        "tiers": [
            {
                "id": "yes-first",
                "name": "Yes First",
                "type": "Both",
                "hasRM": true,
                "eligibility": {
                    "amb": 1000000,
                    "aqb": 0,
                    "salary": 300000,
                    "nrv": 4000000,
                    "description": "AMB \u2265\u20b910 Lakhs across Savings and Current Accounts OR NRV \u2265\u20b940 Lakhs OR Net Monthly Salary \u2265\u20b93 Lakhs in YES First Salary Account OR based on loan relationship. Initial payment (IP) of \u20b910 Lakhs required for primary account, \u20b91 Lakh for secondary account."
                },
                "benefits": {
                    "welcomeBenefits": "Premium welcome kit with leather organizer and lifestyle vouchers",
                    "debitCard": {
                        "name": "YES First World Debit Card (Eclectic)",
                        "image": "/assets/cards/debit/yes-first.png",
                        "annualFee": 0,
                        "lounge": {
                            "domestic": "Unlimited",
                            "international": "4/year via Priority Pass"
                        },
                        "limits": {
                            "atm": 500000,
                            "purchase": 1000000
                        },
                        "forex": {
                            "markup": 0.0,
                            "text": "Zero forex markup on international transactions"
                        }
                    },
                    "locker": {
                        "discount": 0.5,
                        "text": "50% discount on locker rental"
                    },
                    "investments": {
                        "dematAmc": 0,
                        "text": "Free YES Securities Demat account with preferential brokerage"
                    },
                    "features": [
                        "Zero forex markup on debit card",
                        "Unlimited domestic lounge access",
                        "Complimentary YES First Credit Card eligibility",
                        "Zomato/Blinkit promotional offers",
                        "Movie tickets and F&B offers via BookMyShow",
                        "Golf access at select courses",
                        "High withdrawal limits",
                        "Family banking with unified NRV",
                        "YES Rewardz points on transactions",
                        "Priority servicing and dedicated RM"
                    ]
                },
                "metadata": {
                    "bestFor": "Those seeking unlimited lounge access with zero forex markup",
                    "rating": 4.3,
                    "pros": [
                        "Unlimited domestic lounge access",
                        "Zero forex markup on debit card",
                        "Strong family banking program",
                        "Good credit card upgrade path"
                    ],
                    "cons": [
                        "High initial payment requirement (\u20b910 Lakhs)",
                        "NRV criteria recently increased",
                        "Limited international lounge visits"
                    ]
                }
            },
            {
                "id": "yes-premia",
                "name": "Yes Premia",
                "type": "Both",
                "hasRM": true,
                "eligibility": {
                    "amb": 200000,
                    "aqb": 0,
                    "salary": 150000,
                    "nrv": 1000000,
                    "description": "AMB \u2265\u20b92 Lakhs across CASA OR NRV \u2265\u20b910 Lakhs OR Net Monthly Salary \u2265\u20b91.5 Lakhs in YES Premia Salary Account OR based on loan relationship"
                },
                "benefits": {
                    "welcomeBenefits": "Amazon/Flipkart voucher on meeting criteria in first month; Gyftr portal redemption",
                    "debitCard": {
                        "name": "YES Premia Debit Card",
                        "image": "/assets/cards/debit/yes-premia.png",
                        "annualFee": 0,
                        "lounge": {
                            "domestic": "2/quarter",
                            "international": "Not included"
                        },
                        "limits": {
                            "atm": 200000,
                            "purchase": 500000
                        },
                        "forex": {
                            "markup": 0.035,
                            "text": "3.5% forex markup; card rate applies for transactions <USD 20,000"
                        }
                    },
                    "locker": {
                        "discount": 0.25,
                        "text": "25% discount on locker rental"
                    },
                    "investments": {
                        "dematAmc": 0,
                        "text": "YES Securities with \u20b91 per lot brokerage"
                    },
                    "features": [
                        "Dedicated Relationship Manager (select locations)",
                        "YES ELITE+ Credit Card eligibility",
                        "Complimentary health insurance from Reliance General",
                        "YES Rewardz program",
                        "Preferential trade and remittance pricing",
                        "POS machine with rental cashback",
                        "Digital debit transactions rewards",
                        "Family banking benefits"
                    ]
                },
                "metadata": {
                    "bestFor": "Entry-level premium banking with reasonable NRV requirement",
                    "rating": 4.0,
                    "pros": [
                        "Lower entry barrier than Yes First",
                        "Good pathway to premium banking",
                        "Complimentary health insurance",
                        "Decent lounge access"
                    ],
                    "cons": [
                        "Higher forex markup (3.5%)",
                        "Limited international benefits",
                        "RM availability varies by location"
                    ]
                }
            }
        ],
        "familyBanking": {
            "name": "YES Family Banking",
            "eligibility": {
                "minGroupNRV": 1000000,
                "description": "Family relationship grouping for combined NRV calculation"
            },
            "members": {
                "maxCount": 6,
                "allowed": [
                    "Spouse",
                    "Children",
                    "Parents"
                ]
            },
            "benefits": [
                "Combined NRV across family members",
                "Secondary accounts with \u20b91 Lakh IP",
                "Shared program tier benefits",
                "Minor accounts can be mapped under primary"
            ]
        }
    },
    {
        "id": "rbl-bank",
        "name": "RBL Bank",
        "tiers": [
            {
                "id": "rbl-insignia",
                "name": "Insignia Preferred Banking",
                "type": "Both",
                "hasRM": true,
                "eligibility": {
                    "amb": 1000000,
                    "aqb": 0,
                    "salary": 0,
                    "nrv": 3000000,
                    "description": "Total Relationship Value \u2265\u20b930 Lakhs (Savings, Term Deposits, Investment relationships) OR AMB \u2265\u20b910 Lakhs in Current Account. Invite-only/relationship-based for credit card; existing banking relationship required."
                },
                "benefits": {
                    "welcomeBenefits": "28,000 bonus reward points on credit card (non-banking customers); premium welcome kit",
                    "debitCard": {
                        "name": "Insignia Preferred Banking Debit Card",
                        "image": "/assets/cards/debit/rbl-insignia.png",
                        "annualFee": 0,
                        "lounge": {
                            "domestic": "2/quarter",
                            "international": "6/year via Priority Pass"
                        },
                        "limits": {
                            "atm": 300000,
                            "purchase": 500000
                        },
                        "forex": {
                            "markup": 0.035,
                            "text": "3.5% forex markup on international transactions"
                        }
                    },
                    "locker": {
                        "discount": 0.5,
                        "text": "50% discount on locker rental"
                    },
                    "investments": {
                        "dematAmc": 0,
                        "text": "Wealth management services with dedicated advisors"
                    },
                    "features": [
                        "Invite-only exclusive program",
                        "Priority Pass membership with 6 international visits",
                        "24x7 Concierge Help Desk",
                        "\u20b9500 flat discount on BookMyShow twice/month",
                        "Up to 50% discount at EazyDiner Prime restaurants",
                        "4 complimentary golf rounds/year + 1 lesson/month",
                        "Accor Plus membership benefits at 2400+ hotels globally",
                        "Unlimited free ATM transactions at RBL ATMs",
                        "Doorstep banking for cash/cheque/document pickup",
                        "Enhanced NEFT/RTGS limits up to \u20b95 Crore/day",
                        "Insignia lounges and business centers access"
                    ]
                },
                "metadata": {
                    "bestFor": "Those seeking exclusive invite-only banking with strong lifestyle benefits",
                    "rating": 4.3,
                    "pros": [
                        "Excellent movie and dining benefits",
                        "Strong golf program",
                        "Priority Pass with good international access",
                        "Premium concierge services"
                    ],
                    "cons": [
                        "Invite-only/relationship-based entry",
                        "Higher forex markup (3.5%)",
                        "Limited branch network"
                    ]
                }
            }
        ],
        "familyBanking": {
            "name": "Insignia Family Banking",
            "eligibility": {
                "minGroupNRV": 3000000,
                "description": "Family accounts can be grouped under primary Insignia relationship"
            },
            "members": {
                "maxCount": 4,
                "allowed": [
                    "Spouse",
                    "Children",
                    "Parents"
                ]
            },
            "benefits": [
                "Extended Insignia privileges to family",
                "Combined TRV calculation",
                "Shared lifestyle benefits",
                "Priority servicing for all members"
            ]
        }
    },
    {
        "id": "au-small-finance-bank",
        "name": "AU Small Finance Bank",
        "tiers": [
            {
                "id": "au-royale",
                "name": "Royale",
                "type": "Both",
                "hasRM": true,
                "eligibility": {
                    "amb": 500000,
                    "aqb": 0,
                    "salary": 0,
                    "nrv": 500000,
                    "description": "AMB \u2265\u20b95 Lakhs in Savings Account OR Cumulative AMB \u2265\u20b95 Lakhs across family's Current Accounts (for Royale Business)"
                },
                "benefits": {
                    "welcomeBenefits": "Lifestyle vouchers on account opening (discontinued for accounts opened from Apr 2024)",
                    "debitCard": {
                        "name": "AU Royale Visa Signature Debit Card",
                        "image": "/assets/cards/debit/au-royale.png",
                        "annualFee": 0,
                        "lounge": {
                            "domestic": "2/quarter (requires \u20b95,000 quarterly spend from Oct 2024)",
                            "international": "Not included"
                        },
                        "limits": {
                            "atm": 400000,
                            "purchase": 600000
                        },
                        "forex": {
                            "markup": 0.02,
                            "text": "2% forex markup (Zero markup available only on NRI Royale World variant)"
                        }
                    },
                    "locker": {
                        "discount": 0.25,
                        "text": "25% discount on locker rental"
                    },
                    "investments": {
                        "dematAmc": 0,
                        "text": "Free Demat account with ASBA facility"
                    },
                    "features": [
                        "Monthly interest payout on savings (like IDFC First)",
                        "Up to 7% p.a. interest on savings (tiered slabs)",
                        "1% monthly cashback on non-fuel spends up to \u20b9200",
                        "Buy 1 Get 1 on BookMyShow (twice/month, up to \u20b9250)",
                        "Visa Signature lifestyle privileges",
                        "Personal Accident Insurance \u20b910 Lakhs",
                        "Air Accident Insurance \u20b91 Crore",
                        "Purchase Protection \u20b925,000",
                        "Card Liability Cover \u20b94 Lakhs",
                        "BigBasket and Cleartrip offers",
                        "Extended banking hours at select branches"
                    ]
                },
                "metadata": {
                    "bestFor": "High-yield savings seekers at a small finance bank",
                    "rating": 4.1,
                    "pros": [
                        "High interest rate up to 7% p.a.",
                        "Monthly interest payout",
                        "Good cashback on debit card",
                        "Decent entertainment offers"
                    ],
                    "cons": [
                        "Lounge access now requires quarterly spend",
                        "Welcome benefits discontinued from Apr 2024",
                        "Small finance bank - DICGC cover limited to \u20b95 Lakhs"
                    ]
                }
            },
            {
                "id": "au-platinum",
                "name": "Platinum",
                "type": "Savings",
                "hasRM": false,
                "eligibility": {
                    "amb": 100000,
                    "aqb": 0,
                    "salary": 75000,
                    "nrv": 0,
                    "description": "AMB \u2265\u20b91 Lakh in Savings Account OR Salary Account with eligible corporate tie-up"
                },
                "benefits": {
                    "welcomeBenefits": "Lifestyle vouchers (discontinued from Apr 2024)",
                    "debitCard": {
                        "name": "AU Visa Platinum Debit Card",
                        "image": "/assets/cards/debit/au-platinum.png",
                        "annualFee": 0,
                        "lounge": {
                            "domestic": "1/quarter (requires \u20b95,000 quarterly spend from Oct 2024)",
                            "international": "Not included"
                        },
                        "limits": {
                            "atm": 200000,
                            "purchase": 300000
                        },
                        "forex": {
                            "markup": 0.035,
                            "text": "3.5% forex markup on international transactions"
                        }
                    },
                    "locker": {
                        "discount": 0.1,
                        "text": "10% discount on locker rental"
                    },
                    "investments": {
                        "dematAmc": 500,
                        "text": "Demat account with standard AMC"
                    },
                    "features": [
                        "Monthly interest payout on savings",
                        "Up to 6.5% p.a. interest on savings",
                        "Visa Platinum benefits and offers",
                        "Personal Accident Insurance \u20b95 Lakhs",
                        "Air Travel Insurance \u20b950 Lakhs",
                        "Purchase Protection \u20b910,000",
                        "Card Liability Cover \u20b92 Lakhs",
                        "AU 0101 mobile banking app access"
                    ]
                },
                "metadata": {
                    "bestFor": "Entry-level premium savings with high interest",
                    "rating": 3.8,
                    "pros": [
                        "Lower entry barrier (\u20b91 Lakh AMB)",
                        "Competitive interest rates",
                        "Monthly interest payout",
                        "Lifetime free debit card"
                    ],
                    "cons": [
                        "Higher forex markup (3.5%)",
                        "No dedicated RM",
                        "Limited lounge access"
                    ]
                }
            }
        ],
        "familyBanking": {
            "name": "AU Family Banking",
            "eligibility": {
                "minGroupNRV": 500000,
                "description": "Family accounts can be linked for combined AMB calculation"
            },
            "members": {
                "maxCount": 5,
                "allowed": [
                    "Spouse",
                    "Children",
                    "Parents"
                ]
            },
            "benefits": [
                "Combined AMB calculation across family",
                "Shared tier benefits",
                "Family grouping for Royale Business accounts"
            ]
        }
    },
    {
        "id": "hsbc-india",
        "name": "HSBC India",
        "tiers": [
            {
                "id": "hsbc-premier",
                "name": "Premier",
                "type": "Both",
                "hasRM": true,
                "eligibility": {
                    "amb": 0,
                    "aqb": 4000000,
                    "salary": 300000,
                    "nrv": 4000000,
                    "description": "Quarterly Total Relationship Balance (TRB) \u2265\u20b940 Lakhs OR Mortgage \u2265\u20b91.15 Crores (must meet TRB within 12 months) OR Corporate Salary Account with net monthly credit \u2265\u20b93 Lakhs. Global Premier status from other countries also eligible."
                },
                "benefits": {
                    "welcomeBenefits": "20,000 reward points on Premier Credit Card (transferable 1:1 to airline/hotel partners worth ~\u20b940,000)",
                    "debitCard": {
                        "name": "HSBC Premier Debit Card",
                        "image": "/assets/cards/debit/hsbc-premier.png",
                        "annualFee": 0,
                        "lounge": {
                            "domestic": "Unlimited",
                            "international": "Unlimited via Priority Pass"
                        },
                        "limits": {
                            "atm": 500000,
                            "purchase": 1000000
                        },
                        "forex": {
                            "markup": 0.035,
                            "text": "3.5% forex markup on international transactions"
                        }
                    },
                    "locker": {
                        "discount": 0.5,
                        "text": "50% discount on locker rental"
                    },
                    "investments": {
                        "dematAmc": 0,
                        "text": "Comprehensive wealth management with curated mutual fund products"
                    },
                    "features": [
                        "Global View - View all HSBC accounts worldwide in one place",
                        "Global Transfers - Fee-free instant transfers between HSBC accounts globally",
                        "Worldwide Premier status automatically recognized",
                        "Overseas account opening support before arrival",
                        "Dedicated Premier Relationship Manager",
                        "Access to wealth specialists",
                        "Six Senses spa and wellness retreats benefits",
                        "Complimentary golf at top Indian courses with coaching",
                        "DreamFolks 3,000+ private clubs access globally",
                        "JLL property and relocation support",
                        "Overseas education support services",
                        "Airport transfers and meet & greet services",
                        "Bicester Collection private suite access",
                        "30% off dining via EazyDiner (max \u20b91,250/month)"
                    ]
                },
                "metadata": {
                    "bestFor": "Global citizens needing seamless international banking across countries",
                    "rating": 4.6,
                    "pros": [
                        "Unmatched Global View/Transfer features",
                        "Worldwide Premier status recognition",
                        "Excellent international banking network",
                        "Strong wealth management expertise"
                    ],
                    "cons": [
                        "Very high entry barrier (\u20b940 Lakhs TRB)",
                        "Higher forex markup (3.5%)",
                        "Limited branch network in India",
                        "Benefits vary between TRB vs salary/mortgage customers"
                    ]
                }
            },
            {
                "id": "hsbc-personal",
                "name": "Personal Banking",
                "type": "Both",
                "hasRM": false,
                "eligibility": {
                    "amb": 100000,
                    "aqb": 0,
                    "salary": 0,
                    "nrv": 0,
                    "description": "AMB \u2265\u20b91 Lakh or as per account variant selected"
                },
                "benefits": {
                    "welcomeBenefits": null,
                    "debitCard": {
                        "name": "HSBC Visa/Mastercard Debit Card",
                        "image": "/assets/cards/debit/hsbc-personal.png",
                        "annualFee": 0,
                        "lounge": {
                            "domestic": "Not included",
                            "international": "Not included"
                        },
                        "limits": {
                            "atm": 100000,
                            "purchase": 200000
                        },
                        "forex": {
                            "markup": 0.035,
                            "text": "3.5% forex markup on international transactions"
                        }
                    },
                    "locker": {
                        "discount": 0.0,
                        "text": "Standard locker rates apply"
                    },
                    "investments": {
                        "dematAmc": 500,
                        "text": "Standard investment services"
                    },
                    "features": [
                        "HSBC India mobile app and net banking",
                        "International money transfers",
                        "Basic savings and current accounts",
                        "Access to HSBC credit cards",
                        "Home loans and personal loans"
                    ]
                },
                "metadata": {
                    "bestFor": "Those wanting international bank presence without high balance",
                    "rating": 3.5,
                    "pros": [
                        "International bank credibility",
                        "Good digital banking platform",
                        "Gateway to Premier upgrade"
                    ],
                    "cons": [
                        "Limited benefits at base tier",
                        "No lounge access",
                        "Higher forex markup"
                    ]
                }
            }
        ],
        "familyBanking": {
            "name": "HSBC Premier Family",
            "eligibility": {
                "minGroupNRV": 4000000,
                "description": "Premier customers meeting TRB criteria can add family members"
            },
            "members": {
                "maxCount": 5,
                "allowed": [
                    "Spouse",
                    "Partners",
                    "Children (up to 30 years)"
                ]
            },
            "benefits": [
                "Family members get Premier status",
                "Combined wealth management",
                "Global Premier benefits for family",
                "Overseas education support for children"
            ]
        }
    },
    {
        "id": "standard-chartered",
        "name": "Standard Chartered Bank",
        "tiers": [
            {
                "id": "sc-priority",
                "name": "Priority",
                "type": "Both",
                "hasRM": true,
                "eligibility": {
                    "amb": 5000000,
                    "aqb": 0,
                    "salary": 300000,
                    "nrv": 5000000,
                    "description": "Monthly Average FUM \u2265\u20b950 Lakhs (Savings, Term Deposits, Investments, Life Insurance Premium, Demat Holdings) OR Monthly Salary Credit \u2265\u20b93 Lakhs in SC Salary Account OR Mortgage Outstanding tiered by city (\u20b94Cr Mumbai/Delhi, \u20b93Cr Bangalore/Chennai/Hyderabad/Pune/Kolkata, \u20b92Cr other cities). Enhanced Priority at \u20b92.5 Crores FUM."
                },
                "benefits": {
                    "welcomeBenefits": "30,000 reward points on joining",
                    "debitCard": {
                        "name": "Priority Visa Infinite Debit Card",
                        "image": "/assets/cards/debit/sc-priority.png",
                        "annualFee": 0,
                        "lounge": {
                            "domestic": "4/quarter",
                            "international": "Via Priority Pass (additional cost)"
                        },
                        "limits": {
                            "atm": 500000,
                            "purchase": 1000000
                        },
                        "forex": {
                            "markup": 0.035,
                            "text": "3.5% forex markup on international transactions"
                        }
                    },
                    "locker": {
                        "discount": 0.5,
                        "text": "50% discount on locker rental"
                    },
                    "investments": {
                        "dematAmc": 0,
                        "text": "SC Securities 3-in-1 account with preferential brokerage"
                    },
                    "features": [
                        "SC Wealth Academy trained relationship team",
                        "Priority status across 24 markets in Asia, Middle East, Africa",
                        "4 International Wealth Hubs access (Singapore, HK, UAE, Jersey)",
                        "Preferential FX rates on global transfers",
                        "SC Privileges integrated lifestyle platform",
                        "Up to 50% discount at 2000+ fine dine restaurants",
                        "Unlimited airport lounge access via credit card",
                        "Complimentary golf games",
                        "Priority Pass membership",
                        "Air Accident Cover \u20b91 Crore",
                        "Purchase Protection \u20b955,000",
                        "Family Priority status extension (spouse, children)"
                    ]
                },
                "metadata": {
                    "bestFor": "Affluent individuals seeking global wealth expertise across markets",
                    "rating": 4.4,
                    "pros": [
                        "Strong international banking network (24 markets)",
                        "Excellent wealth management expertise",
                        "Family benefits included",
                        "Good dining and lifestyle privileges"
                    ],
                    "cons": [
                        "High entry barrier (\u20b950 Lakhs FUM)",
                        "Monthly charges on non-maintenance",
                        "Higher forex markup (3.5%)"
                    ]
                }
            },
            {
                "id": "sc-premium",
                "name": "Premium",
                "type": "Both",
                "hasRM": true,
                "eligibility": {
                    "amb": 1000000,
                    "aqb": 0,
                    "salary": 150000,
                    "nrv": 1000000,
                    "description": "Monthly Average FUM \u2265\u20b910 Lakhs OR Monthly Salary Credit \u2265\u20b91.5 Lakhs in SC Salary Account OR Mortgage \u2265\u20b91 Crore (maintain >\u20b91 Cr outstanding after 12 months)"
                },
                "benefits": {
                    "welcomeBenefits": "Welcome vouchers on account opening",
                    "debitCard": {
                        "name": "Premium Visa Signature Debit Card",
                        "image": "/assets/cards/debit/sc-premium.png",
                        "annualFee": 0,
                        "lounge": {
                            "domestic": "1/month via Priority Pass",
                            "international": "Via Priority Pass (charged beyond free visit)"
                        },
                        "limits": {
                            "atm": 200000,
                            "purchase": 500000
                        },
                        "forex": {
                            "markup": 0.035,
                            "text": "3.5% forex markup on international transactions"
                        }
                    },
                    "locker": {
                        "discount": 0.25,
                        "text": "25% discount on locker rental"
                    },
                    "investments": {
                        "dematAmc": 0,
                        "text": "3-in-1 account with SC Securities"
                    },
                    "features": [
                        "Dedicated Relationship Manager",
                        "Insurance needs analysis tool",
                        "SC Invest - buy/pause/redeem funds easily",
                        "Free payable at par cheque book",
                        "24-hour and 365-day branches at select locations",
                        "Access to 20,000 ATMs in India, 1 million VISA ATMs globally",
                        "Premium dining offers",
                        "24-month e-statements and TDS certificates"
                    ]
                },
                "metadata": {
                    "bestFor": "Entry-level premium banking with SC's international network",
                    "rating": 4.0,
                    "pros": [
                        "Lower entry barrier than Priority",
                        "Good digital banking platform",
                        "Access to wealth solutions",
                        "Family benefits available"
                    ],
                    "cons": [
                        "Limited lounge access (1/month)",
                        "Higher forex markup",
                        "Fewer privileges than Priority tier"
                    ]
                }
            }
        ],
        "familyBanking": {
            "name": "SC Family Banking",
            "eligibility": {
                "minGroupNRV": 1000000,
                "description": "If one family member meets qualification, others can enjoy benefits"
            },
            "members": {
                "maxCount": 4,
                "allowed": [
                    "Spouse",
                    "Children",
                    "Parents (if single status)"
                ]
            },
            "benefits": [
                "Complimentary Priority/Premium status for family",
                "Travel and hospitality benefits extended",
                "Wellness and overseas education benefits",
                "Shared relationship management"
            ]
        }
    },
    {
        "id": "bank-of-baroda",
        "name": "Bank of Baroda",
        "tiers": [
            {
                "id": "bob-radiance",
                "name": "Baroda Radiance",
                "type": "Both",
                "hasRM": true,
                "eligibility": {
                    "amb": 0,
                    "aqb": 3000000,
                    "salary": 0,
                    "nrv": 3000000,
                    "description": "QAB \u2265\u20b930 Lakhs in Savings/Current Account OR Home Loan \u2265\u20b93 Crores OR Auto Loan \u2265\u20b925 Lakhs OR High-ranking Defence Officers (Colonel+)/Senior Government Officials (IAS/IPS/IFS/GM+)"
                },
                "benefits": {
                    "welcomeBenefits": "\u20b9750 Lifestyle welcome voucher; premium welcome kit",
                    "debitCard": {
                        "name": "Baroda Sapphire Visa Signature Debit Card",
                        "image": "/assets/cards/debit/bob-radiance.png",
                        "annualFee": 0,
                        "lounge": {
                            "domestic": "2/quarter",
                            "international": "Not included"
                        },
                        "limits": {
                            "atm": 200000,
                            "purchase": 500000
                        },
                        "forex": {
                            "markup": 0.035,
                            "text": "3.5% forex markup on international transactions"
                        }
                    },
                    "locker": {
                        "discount": 0.5,
                        "text": "50% discount on locker rental"
                    },
                    "investments": {
                        "dematAmc": 0,
                        "text": "Wealth management services with certified professionals"
                    },
                    "features": [
                        "Dedicated Relationship Manager - non-pushy wealth advice",
                        "Complimentary Sapphire Visa Signature Debit Card (normally \u20b9750)",
                        "Eligibility for RuPay Select Debit Card",
                        "Complimentary Eterna Visa Infinite Credit Card (LTF for Radiance)",
                        "Baroda Radiance Lounges and Business Centers access",
                        "Customized financial planning program",
                        "Cutting-edge wealth management platform",
                        "BoB World app with full digital banking",
                        "Priority branch servicing",
                        "Home Loan with overdraft facility (like SBI MaxGain)"
                    ]
                },
                "metadata": {
                    "bestFor": "PSU bank customers seeking premium services with home loan overdraft",
                    "rating": 4.2,
                    "pros": [
                        "Excellent value at a PSU bank",
                        "LTF Eterna credit card for Radiance customers",
                        "Home loan overdraft facility (rare feature)",
                        "Non-pushy RM unlike private banks"
                    ],
                    "cons": [
                        "Branch staff often unaware of Radiance benefits",
                        "Must convert to Super Savings account for some cards",
                        "Limited international benefits",
                        "Slower processes compared to private banks"
                    ]
                }
            }
        ],
        "familyBanking": {
            "name": "Baroda Radiance Family",
            "eligibility": {
                "minGroupNRV": 5000000,
                "description": "Family banking available at higher threshold of \u20b950 Lakhs QAB with primary maintaining minimum \u20b930 Lakhs"
            },
            "members": {
                "maxCount": 5,
                "allowed": [
                    "Spouse",
                    "Children",
                    "Parents"
                ]
            },
            "benefits": [
                "Uniform Radiance privileges for all family accounts",
                "Combined QAB calculation",
                "Shared RM and priority services",
                "Extended locker and card benefits"
            ]
        }
    }
];
