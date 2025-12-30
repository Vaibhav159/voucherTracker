// Banking programs data - Family Banking and Wealth Banking tiers
// Last Updated: December 2024 - Verified from official bank sources

export const familyBanking = {
    "HDFC Bank": {
        name: "HDFC Family Banking",
        minNRV: "No separate minimum - Based on primary account tier",
        eligibleMembers: ["Spouse", "Parents", "Children (18+)"],
        maxMembers: 8,
        benefits: [
            "Combined balance calculation across family members",
            "Shared Premier Banking benefits (Classic/Preferred/Imperia)",
            "Combined lounge access quota",
            "Single point of contact (RM for Imperia)",
            "Preferential rates on loans",
            "Combined FD tenure benefits",
            "Shared demat AMC waivers"
        ],
        howToApply: "Visit branch with family member KYC documents or through NetBanking",
        notes: "Up to 8 family members can be grouped. Imperia Family requires ₹10L+ AMB or ₹30L+ combined NRV"
    },
    "ICICI Bank": {
        name: "ICICI Family Banking",
        minNRV: "Based on primary account tier (Wealth/Sapphire/Emeralde)",
        eligibleMembers: ["Spouse", "Parents", "Children"],
        maxMembers: 5,
        benefits: [
            "Combined NRV calculation for tier upgrades",
            "Shared Wealth Management benefits",
            "Joint account facilities",
            "Family health insurance discounts",
            "Combined milestone rewards",
            "Shared lounge access pool"
        ],
        howToApply: "Through iMobile app or visit branch",
        notes: "Wealth management upgrade requires ₹25L+ NRV. Emeralde tier requires ₹50L+ NRV"
    },
    "Axis Bank": {
        name: "Axis Burgundy Family",
        minNRV: "₹30L combined (for Burgundy) / ₹5Cr (for Burgundy Private)",
        eligibleMembers: ["Spouse", "Parents", "Children (18+)", "Siblings"],
        maxMembers: 6,
        benefits: [
            "Shared Burgundy/Burgundy Private benefits",
            "Combined lounge access",
            "Family travel insurance",
            "Preferential forex rates",
            "Dedicated RM for family",
            "Up to 60% lifetime discount on locker rent"
        ],
        howToApply: "Branch visit with relationship proof",
        notes: "Burgundy requires ₹10L AMB or ₹30L NRV. Burgundy Private requires ₹5Cr TRV (excluding demat) or ₹10L monthly salary"
    },
    "SBI": {
        name: "SBI Customer Segmentation - Family",
        minNRV: "Based on tier (Silver/Gold/Diamond/Platinum)",
        eligibleMembers: ["Spouse", "Parents", "Dependent Children"],
        maxMembers: 4,
        benefits: [
            "Combined AQB calculation",
            "Reduced locker charges",
            "Combined insurance benefits",
            "Preferential loan rates",
            "Single statement option",
            "Priority service at branches"
        ],
        howToApply: "Any SBI branch with relationship documents",
        notes: "Platinum tier requires ₹30L+ AQB across deposits or ₹2L SB balance or ₹1Cr+ home loan"
    },
    "Kotak Mahindra Bank": {
        name: "Kotak Privy League Family",
        minNRV: "Based on tier (Neon: ₹10L RV / Platinum: ₹30L RV / Black: ₹1Cr RV)",
        eligibleMembers: ["Spouse", "Parents", "Children"],
        maxMembers: 4,
        benefits: [
            "Shared Privy League privileges",
            "Family lounge access pool",
            "Wealth management for family",
            "Joint investment planning",
            "Combined credit card benefits",
            "Complimentary debit cards for family"
        ],
        howToApply: "Through RM or branch",
        notes: "Privy League has 4 tiers: Neon (₹10L RV), Platinum (₹30L RV), Black (₹1Cr RV), and Insignia (invite-only)"
    },
    "IDFC First Bank": {
        name: "IDFC First Family Banking",
        minNRV: "Based on tier (Select: ₹3L / Wealth: ₹10L / Private: ₹50L AMB)",
        eligibleMembers: ["Spouse", "Parents", "Children"],
        maxMembers: 5,
        benefits: [
            "Shared First Select/Wealth/Private benefits",
            "Combined high-interest savings (up to 7.25%)",
            "Family health coverage",
            "Shared lounge access",
            "Zero forex markup for Private tier",
            "Complimentary locker (Private tier, subject to availability)"
        ],
        howToApply: "Through app or RM",
        notes: "Select: ₹3L AMB, Wealth: ₹10L AMB, Private: ₹50L+ AMB. Private tier has limited incremental benefits over Wealth"
    },
    "Yes Bank": {
        name: "YES FIRST Family",
        minNRV: "₹10L NRV (YES FIRST) / ₹5L AMB or ₹20L NRV (YES Grandeur)",
        eligibleMembers: ["Spouse", "Parents", "Children (18+)"],
        maxMembers: 4,
        benefits: [
            "Combined relationship value",
            "Shared YES FIRST Exclusive benefits",
            "Family lounge access pool",
            "Preferential loan rates",
            "Joint wealth advisory",
            "Complimentary ECLECTIC Debit card"
        ],
        howToApply: "Through RM or branch visit with ₹10L IP cheque",
        notes: "YES FIRST requires ₹10L NRV or ₹5L AMB. YES Grandeur (new tier) requires ₹5L AMB or ₹20L NRV. YES Private requires ₹2Cr+ NRV"
    },
    "IndusInd Bank": {
        name: "IndusInd PIONEER Family",
        minNRV: "₹10L AQB or ₹30L NRV (PIONEER) / ₹1Cr CASA or ₹3Cr TRV (PIONEER Private)",
        eligibleMembers: ["Spouse", "Parents", "Children"],
        maxMembers: 5,
        benefits: [
            "Shared PIONEER/PIONEER Private benefits",
            "Combined NRV for tier upgrades",
            "Family travel insurance",
            "Shared lounge access",
            "Dedicated family RM",
            "Video Banking for all family members"
        ],
        howToApply: "Branch visit with relationship proof",
        notes: "PIONEER: ₹10L AQB or ₹30L NRV. PIONEER Private (launched Aug 2024): ₹1Cr CASA or ₹3Cr TRV"
    },
    "AU Small Finance Bank": {
        name: "AU Royale Family",
        minNRV: "₹1L combined AMB or ₹20L FD (tenure ≥6 months)",
        eligibleMembers: ["Spouse", "Parents", "Children (blood relatives)"],
        maxMembers: 6,
        benefits: [
            "Combined high-interest savings (up to 7.25%)",
            "Shared lounge access (8 visits/year with ₹5K quarterly spend)",
            "Family insurance benefits",
            "Preferential FD rates",
            "Single RM for family",
            "50% discount on locker rentals (1 per group)"
        ],
        howToApply: "Through branch or video KYC",
        notes: "Lounge access requires ₹5,000 spend in previous quarter. Welcome benefits discontinued for accounts opened after 01.04.2024"
    },
    "Standard Chartered Bank": {
        name: "Standard Chartered Priority Family",
        minNRV: "₹30L FUM combined / ₹50L FUM (Enhanced Priority)",
        eligibleMembers: ["Spouse", "Parents", "Children"],
        maxMembers: 4,
        benefits: [
            "Shared Priority Banking benefits",
            "Global link facility across 24 markets",
            "Combined lounge access",
            "Preferential forex rates",
            "Family wealth advisory",
            "SC Privileges platform access"
        ],
        howToApply: "Through RM or branch visit",
        notes: "Priority: ₹30L FUM or ₹3L salary. Enhanced Priority: ₹2.5Cr+ FUM. If one family member qualifies, all can enjoy benefits"
    },
    "HSBC India": {
        name: "HSBC Premier Family",
        minNRV: "₹40L TRB (primary member must qualify)",
        eligibleMembers: ["Spouse", "Partner", "Children (up to age 30)"],
        maxMembers: 4,
        benefits: [
            "Global Premier status for all family members",
            "Combined TRB calculation",
            "Shared lounge access and guest privileges",
            "Family wealth management",
            "Global banking access in HSBC markets",
            "Meet & assist at airports for family"
        ],
        howToApply: "Through Premier RM",
        notes: "Children can be included up to age 30. After 30, they need to qualify independently. Mortgage-based Premier customers must meet TRB criteria first to add family"
    },
    "RBL Bank": {
        name: "RBL Preferred Banking Family",
        minNRV: "Based on tier (Insignia: ₹30L TRV or ₹10L AMB)",
        eligibleMembers: ["Spouse", "Parents", "Children"],
        maxMembers: 4,
        benefits: [
            "Shared Insignia/Signature/Aspire benefits",
            "Family banking privileges",
            "Combined lounge access",
            "Preferential rates for family",
            "Priority service desk access"
        ],
        howToApply: "Through RM or branch visit",
        notes: "Insignia Preferred Banking offers the best family benefits including LTF cards for members"
    },
    "Federal Bank": {
        name: "Federal Bank Family Banking (Imperio/Celesta)",
        minNRV: "Imperio: ₹2L funding or ₹1L salary / Celesta: ₹10L AMB or ₹2L salary",
        eligibleMembers: ["Spouse", "Father", "Mother", "Son", "Daughter", "Father-in-law", "Mother-in-law", "Siblings"],
        maxMembers: 4,
        benefits: [
            "Combined eligibility calculation across family",
            "Shared Imperio/Celesta privileges",
            "Premium debit cards for family",
            "Lounge access for family members",
            "50% locker discount (max ₹2K) for family unit",
            "Insurance benefits extension",
            "Single point of contact RM"
        ],
        howToApply: "Application form signed by new member & primary customer at branch",
        notes: "Family ID is mandatory for Imperio/Celesta. Primary holder cannot be a minor. NRIs can be primary or member. KYC compliance required for all members"
    },
    "Bank of Baroda": {
        name: "Baroda Radiance Family",
        minNRV: "₹50L QAB combined (primary must maintain ₹30L QAB)",
        eligibleMembers: ["Spouse", "Parents", "Children"],
        maxMembers: 5,
        benefits: [
            "Shared Radiance privileges for all members",
            "Combined wealth management",
            "Access to Radiance Lounges & Business Centres",
            "Preferential pricing for family",
            "Single RM for family unit",
            "Customized financial planning"
        ],
        howToApply: "Through Wealth RM at branch",
        notes: "Family banking at higher threshold of ₹50L QAB. Primary member must maintain minimum ₹30L QAB. Available in top 30 cities"
    }
};

export const wealthBanking = {
    "HDFC Bank": {
        tiers: [
            {
                name: "Classic",
                minNRV: "₹1L AMB (Savings) OR ₹2L AQB (Current) OR ₹5L combined (SA+FD) OR ₹1L salary OR ₹10L TRV",
                eligibleCards: ["Millennia", "Moneyback+", "Freedom"],
                benefits: ["Nil DC fees", "No AMB non-maintenance charges", "Free chequebook", "Free DD/MC up to ₹1L/day", "Free ATM usage"],
                rm: false
            },
            {
                name: "Preferred",
                minNRV: "₹2L AMB (Savings) OR ₹5L AQB (Current) OR ₹15L combined (SA+FD) OR ₹1.5L salary OR ₹25L TRV",
                eligibleCards: ["Regalia", "Regalia Gold", "Diners ClubMiles"],
                benefits: ["All Classic benefits", "7 free cash txns/month (₹5L limit)", "Nil Demat AMC (with 1 txn)", "Free IMPS"],
                rm: false
            },
            {
                name: "Imperia",
                minNRV: "₹10L AMB (SA) OR ₹15L AQB (CA) OR ₹30L combined RLV (SA+CA+FD) OR ₹3L salary OR ₹1Cr TRV (from Oct 2025)",
                eligibleCards: ["Infinia", "Diners Black", "Regalia Gold", "Imperia Platinum Debit Card"],
                benefits: ["All Preferred benefits", "Premium RM", "Free locker (1st per group)", "50% off 2nd locker", "Free Demat AMC", "Concierge services", "Estate planning", "Wealth advisory"],
                rm: true
            },
            {
                name: "Private Banking",
                minNRV: "₹2Cr+ (Invite only)",
                eligibleCards: ["Infinia Metal", "Invite only cards"],
                benefits: ["Dedicated private banking team", "Global access", "Estate planning", "Art advisory", "Exclusive events"],
                rm: true
            }
        ],
        notes: "TRV = 100% CASA + 100% FD + 100% MF/investments via HDFC + 20% retail loans + 20% demat + 100% insurance premiums. RLV = Retail Liability Value (SA+CA+FD combined AMB). Groups created after Jul 2025 follow new criteria immediately"
    },
    "ICICI Bank": {
        tiers: [
            {
                name: "Coral/Regular",
                minNRV: "Standard account",
                eligibleCards: ["Coral", "Platinum", "Rubyx"],
                benefits: ["Basic priority", "Lounge access with spend criteria (₹75K/quarter)"],
                rm: false
            },
            {
                name: "Sapphire/Wealth",
                minNRV: "₹25L+ NRV",
                eligibleCards: ["Sapphiro", "Rubyx"],
                benefits: ["Wealth management access", "Dedicated RM", "4 lounge visits/quarter", "Preferential rates"],
                rm: true
            },
            {
                name: "Emeralde",
                minNRV: "₹50L+ NRV / ₹2Cr TRV (for Emeralde LTF)",
                eligibleCards: ["Emeralde", "Emeralde PVC"],
                benefits: ["Ultra-premium service", "Unlimited domestic/international lounge", "Golf access", "Spa benefits", "Concierge"],
                rm: true
            },
            {
                name: "Emeralde Private",
                minNRV: "₹3L+ monthly salary OR ₹2Cr+ NRV OR ₹5Cr TRV (for LTF)",
                eligibleCards: ["Emeralde Private Metal"],
                benefits: ["3% value-back on all spends", "Unlimited lounge", "Taj Epicure membership", "Trip cancellation cover"],
                rm: true
            },
            {
                name: "Private Banking",
                minNRV: "₹5Cr+ (Invite only)",
                eligibleCards: ["Invite only"],
                benefits: ["Family office services", "Global banking", "Exclusive events", "Bespoke wealth solutions"],
                rm: true
            }
        ]
    },
    "Axis Bank": {
        tiers: [
            {
                name: "Priority",
                minNRV: "₹2L AMB (Savings) - Basic Priority tier",
                eligibleCards: ["Select", "Privilege", "MY Zone"],
                benefits: ["Priority service", "Basic lounge access", "Preferential rates"],
                rm: false
            },
            {
                name: "Burgundy",
                minNRV: "₹10L AMB (SA/CA) OR ₹30L TRV OR ₹1Cr TRV (incl. Demat) OR ₹3L salary",
                eligibleCards: ["Atlas", "Reserve", "Burgundy Credit Card"],
                benefits: ["Dedicated RM", "Up to 60% locker discount", "8+ lounge visits", "BookMyShow offers"],
                rm: true
            },
            {
                name: "Burgundy Private",
                minNRV: "₹5Cr TRV (excluding Demat) OR ₹10L monthly salary (effective Oct 2024)",
                eligibleCards: ["Magnus", "Burgundy Private", "The One Card (₹5Cr TRV)"],
                benefits: ["Private banker", "Unlimited global lounge", "Club Marriott", "Accor Plus", "Taj Epicure", "Golf privileges", "Wealth advisory"],
                rm: true
            }
        ]
    },
    "SBI": {
        tiers: [
            {
                name: "Silver",
                minNRV: "₹25K - ₹1L AQB",
                eligibleCards: ["Classic", "Global"],
                benefits: ["Basic banking", "Standard service"],
                rm: false
            },
            {
                name: "Gold",
                minNRV: "₹1L - ₹10L AQB",
                eligibleCards: ["Gold", "SimplySAVE"],
                benefits: ["Priority service at select branches", "Preferential loan processing"],
                rm: false
            },
            {
                name: "Diamond",
                minNRV: "₹10L - ₹30L AQB",
                eligibleCards: ["Prime", "BPCL"],
                benefits: ["Enhanced priority service", "Preferential rates", "Dedicated support"],
                rm: false
            },
            {
                name: "Platinum",
                minNRV: "₹30L+ AQB (across all deposits) OR ₹2L SB balance OR ₹1Cr+ Home Loan",
                eligibleCards: ["Elite", "Aurum", "Platinum Debit Card"],
                benefits: ["Relationship Manager", "Premium lounge access", "Wealth services", "Pre-approved loans"],
                rm: true
            },
            {
                name: "SBI Wealth",
                minNRV: "₹50L+ (Wealth segment)",
                eligibleCards: ["Signature Debit Card", "Premium credit cards"],
                benefits: ["Dedicated Wealth RM", "Investment advisory", "Premium services"],
                rm: true
            }
        ]
    },
    "Kotak Mahindra Bank": {
        tiers: [
            {
                name: "Privy League Neon",
                minNRV: "₹2L AMB (Savings) OR ₹5L AMB (Current) OR ₹10L RV",
                eligibleCards: ["Urbane", "League Platinum"],
                benefits: ["Priority banking", "Basic lounge access", "Preferential rates"],
                rm: false
            },
            {
                name: "Privy League Platinum",
                minNRV: "₹10L AMB (Savings) OR ₹15L AMB (Current) OR ₹30L RV",
                eligibleCards: ["Privy League Signature", "Royale Signature"],
                benefits: ["Dedicated RM", "Priority Pass (4 intl visits/year)", "2 domestic lounge visits/quarter", "PVR tickets/reward points"],
                rm: true
            },
            {
                name: "Privy League Black",
                minNRV: "₹1Cr+ RV",
                eligibleCards: ["White Reserve", "Privy League Signature"],
                benefits: ["Premium RM", "Enhanced lounge access", "Golf privileges", "Concierge", "Wealth management"],
                rm: true
            },
            {
                name: "Privy League Insignia",
                minNRV: "₹5Cr+ (Invite only)",
                eligibleCards: ["Insignia", "Wealth Management Infinite"],
                benefits: ["MMT Black Gold", "Lafayette Luxury Concierge", "Taj Epicure", "EazyDiner Prime", "Art Debit Card"],
                rm: true
            }
        ]
    },
    "IDFC First Bank": {
        tiers: [
            {
                name: "First Select",
                minNRV: "₹3L AMB (Savings)",
                eligibleCards: ["FIRST Select Credit Card", "Select Debit Card"],
                benefits: ["Up to 7.25% savings interest", "Zero forex markup (2.5%)", "2 domestic lounge/quarter", "Free ATM"],
                rm: false
            },
            {
                name: "First Wealth",
                minNRV: "₹10L AMB (Savings)",
                eligibleCards: ["FIRST Wealth Credit Card", "Wealth Debit Card"],
                benefits: ["Dedicated RM", "3 domestic + 2 intl lounge/quarter", "Locker facility (subject to availability)", "Enhanced limits"],
                rm: true
            },
            {
                name: "First Private",
                minNRV: "₹50L AMB (Savings) - Metro cities may require ₹3Cr+ for full benefits",
                eligibleCards: ["FIRST Private Credit Card", "Private Metal Debit Card (Visa Infinite)"],
                benefits: ["Private Banker + RM + Portfolio Specialist", "4 domestic + 6 intl lounge/quarter", "Complimentary locker (subject to availability)", "Golf access", "Zero forex markup", "Up to 10x rewards on DC"],
                rm: true
            }
        ]
    },
    "Yes Bank": {
        tiers: [
            {
                name: "YES Premia",
                minNRV: "₹2L AMB OR ₹10L NRV OR ₹1.5L salary",
                eligibleCards: ["YES Premia cards"],
                benefits: ["Priority service", "Preferential rates", "Basic lounge access"],
                rm: false
            },
            {
                name: "YES Grandeur",
                minNRV: "₹5L AMB OR ₹20L NRV (including loan relationships)",
                eligibleCards: ["Grandeur Debit Card"],
                benefits: ["Dedicated RM", "Zero cross-currency markup", "3-in-1 account", "Locker discounts"],
                rm: true
            },
            {
                name: "YES FIRST Exclusive",
                minNRV: "₹5L AMB OR ₹25L NRV OR ₹10L IP cheque",
                eligibleCards: ["YES FIRST Exclusive", "Marquee", "ECLECTIC Debit Card"],
                benefits: ["Dedicated RM", "4 domestic lounge/quarter", "Golf access", "Concierge", "Family banking (5 accounts)"],
                rm: true
            },
            {
                name: "YES FIRST Preferred",
                minNRV: "₹1Cr - ₹5Cr NRV OR ₹45L+ ITR",
                eligibleCards: ["YES FIRST Preferred", "Marquee Plus"],
                benefits: ["Premium RM", "8 lounge visits", "Golf access", "Enhanced concierge", "Wealth advisory"],
                rm: true
            },
            {
                name: "YES Private",
                minNRV: "₹2Cr+ NRV OR ₹60L+ annual salary/ITR",
                eligibleCards: ["YES Private (invite only)"],
                benefits: ["Private banker", "Lounge Key access", "Global access", "Wealth advisory", "Estate planning"],
                rm: true
            }
        ]
    },
    "IndusInd Bank": {
        tiers: [
            {
                name: "Indus Exclusive",
                minNRV: "₹1L - ₹5L AMB",
                eligibleCards: ["Platinum", "Pinnacle Debit Card"],
                benefits: ["Priority banking", "Basic lounge access", "Preferential rates"],
                rm: false
            },
            {
                name: "PIONEER",
                minNRV: "₹10L AQB (CASA) OR ₹30L NRV (with ₹1L AQB minimum)",
                eligibleCards: ["Pioneer Debit Card", "Pinnacle", "Legend"],
                benefits: ["Dedicated RM", "Video Banking", "6 lounge visits", "Golf access", "Travel insurance", "No AMB non-maintenance charges"],
                rm: true
            },
            {
                name: "PIONEER Private",
                minNRV: "₹1Cr AQB (CASA) OR ₹3Cr TRV (with ₹5L AQB minimum)",
                eligibleCards: ["PIONEER Private Metal Debit Card", "PIONEER Private Credit Card", "Pinnacle"],
                benefits: ["Private Banker", "Unlimited global lounge", "Metal cards", "1 RP = ₹1 on DC", "Estate planning", "Bespoke wealth solutions"],
                rm: true
            }
        ]
    },
    "AU Small Finance Bank": {
        tiers: [
            {
                name: "AU Royale",
                minNRV: "₹1L AMB (combined family) OR ₹20L FD (6+ months tenure)",
                eligibleCards: ["AU Royale Debit Card (Visa Signature)", "ALTURA Plus", "LIT"],
                benefits: ["Up to 7.25% savings interest", "8 domestic lounge/year (₹5K quarterly spend required)", "BMS BOGO (2x/month)", "1.5% forex markup", "50% locker discount"],
                rm: false
            },
            {
                name: "AU Royale Salary",
                minNRV: "₹1L net salary credit/month for 2 consecutive months OR ₹1L combined AMB",
                eligibleCards: ["AU Royale Debit Card"],
                benefits: ["Same as AU Royale", "Welcome vouchers (with spend criteria)", "Priority service desk"],
                rm: false
            },
            {
                name: "AU Royale World (NRI)",
                minNRV: "₹5L AMB (NRE/NRO)",
                eligibleCards: ["Royale World Signature Debit Card"],
                benefits: ["Zero forex markup", "8 domestic + 6 international lounge/year", "Free Amazon Prime subscription", "75% locker discount", "Free tax advisory"],
                rm: true
            }
        ],
        notes: "AU Bank does not have traditional higher wealth tiers. Credit cards (Vetta, Zenith) offered based on relationship - Vetta LTF ~₹5L AMB, Zenith LTF ~₹10L AMB"
    },
    "Standard Chartered Bank": {
        tiers: [
            {
                name: "Priority Banking",
                minNRV: "₹30L FUM OR ₹3L monthly salary OR Mortgage: ₹4Cr (Mumbai/Delhi), ₹3Cr (Tier 1), ₹2Cr (Others)",
                eligibleCards: ["Priority Debit Card (Visa Infinite)", "Beyond Credit Card"],
                benefits: ["Dedicated RM + Service Manager", "Global Priority status (24 markets)", "Unlimited lounge access", "Golf privileges", "SC Privileges platform", "Preferential forex rates"],
                rm: true
            },
            {
                name: "Enhanced Priority",
                minNRV: "₹2.5Cr+ FUM (automatically enabled)",
                eligibleCards: ["Priority Debit Card", "Enhanced cards"],
                benefits: ["All Priority benefits", "Enhanced privileges", "Specialist team access", "Priority access globally"],
                rm: true
            },
            {
                name: "Private Banking",
                minNRV: "₹5Cr+ (Invite only)",
                eligibleCards: ["Invite only premium cards"],
                benefits: ["Private Banker", "Bespoke wealth solutions", "Global private banking access (50+ markets)", "Estate planning", "Exclusive lifestyle experiences"],
                rm: true
            }
        ]
    },
    "HSBC India": {
        tiers: [
            {
                name: "Personal Banking",
                minNRV: "₹1.5L AQB (TRB) OR ₹50K monthly salary OR Mortgage EMI debit",
                eligibleCards: ["HSBC Debit Card", "Cashback Credit Card"],
                benefits: ["Basic banking", "Digital banking access", "Standard service"],
                rm: false
            },
            {
                name: "Premier",
                minNRV: "₹40L AQB (TRB) OR ₹3L monthly salary OR ₹1.15Cr Mortgage (with ₹40L TRB within 12 months)",
                eligibleCards: ["HSBC Premier Debit Card", "HSBC Premier Credit Card (Metal)", "Premier Platinum Debit Card"],
                benefits: ["Dedicated RM", "Global Premier status across HSBC markets", "Unlimited domestic/international lounge + guest access", "2 domestic airport transfers/year", "Meet & assist at airports", "Golf privileges", "Home&Away offers", "DreamFolks clubs access", "0.99% forex markup", "E&Y tax consultation for NRIs", "Wealth management access", "Family banking (spouse, partner, children up to 30)"],
                rm: true
            },
            {
                name: "Private Banking",
                minNRV: "₹10Cr+ (Invite only)",
                eligibleCards: ["Invite only premium cards"],
                benefits: ["Private Banker", "Global Private Banking access", "Bespoke wealth solutions", "Estate planning", "Exclusive events and experiences"],
                rm: true
            }
        ],
        notes: "Premier non-maintenance fee: 0.2% of TRB shortfall (max ₹2,000+GST/quarter). Family members must be spouse, partner, or children up to age 30"
    },
    "RBL Bank": {
        tiers: [
            {
                name: "Aspire Banking",
                minNRV: "₹1L - ₹5L AMB",
                eligibleCards: ["Aspire Debit Card", "RBL Credit Cards"],
                benefits: ["Basic priority service", "Preferential rates", "Standard lounge access with spend criteria"],
                rm: false
            },
            {
                name: "Signature Banking",
                minNRV: "₹5L - ₹10L AMB OR ₹15L - ₹30L TRV",
                eligibleCards: ["Signature Debit Card", "RBL World Safari", "RBL Icon"],
                benefits: ["Dedicated RM", "Priority service desk", "Enhanced lounge access", "Preferential loan rates"],
                rm: true
            },
            {
                name: "Insignia Preferred Banking",
                minNRV: "₹10L AMB (Current A/c) OR ₹30L TRV (including SA, TD, Investments)",
                eligibleCards: ["Insignia Debit Card (LTF)", "Insignia Preferred Banking World Card (LTF for Insignia customers)"],
                benefits: ["Dedicated RM", "0% forex markup on debit card", "Priority Pass (6 intl visits)", "2 domestic lounge/quarter (with ₹5K spend)", "Concierge service", "Golf benefits", "₹500 BMS discount/month", "EazyDiner Prime (25-50% off)", "Accor Plus membership", "Hotel benefits (Marriott, IHG, Shangri-La)", "Purchase protection ₹50K"],
                rm: true
            }
        ],
        notes: "Insignia credit card is LTF for Insignia banking customers. Others pay ₹7,000 annual fee (waived on ₹10L annual spend)"
    },
    "Federal Bank": {
        tiers: [
            {
                name: "Imperio",
                minNRV: "₹2L initial funding OR ₹1L monthly salary OR ₹1L AMB + ₹10L FD OR ₹25L TRV (SB + CA + FD)",
                eligibleCards: ["Imperio Debit Card (Visa Signature)", "Imperio Credit Card (LTF)"],
                benefits: ["Concierge services", "Domestic lounge access via Visa", "₹5L daily shopping limit", "₹1L ATM withdrawal limit", "Accidental death cover up to ₹40L (salary) / ₹30L (others)", "Wealth management via Equirus", "1 RP per ₹150 spend", "2000 welcome reward points"],
                rm: true
            },
            {
                name: "Celesta",
                minNRV: "₹10L AMB OR ₹5L AMB + ₹25L FD OR ₹2L monthly salary OR Family ₹10L AMB",
                eligibleCards: ["Celesta Debit Card (Visa Infinite)", "Celesta Credit Card (LTF)"],
                benefits: ["All Imperio benefits", "24/7 Concierge services", "Enhanced lounge access", "Wealth management", "50% locker discount (max ₹2K)", "5000 welcome reward points", "Air accidental cover", "Priority service line"],
                rm: true
            }
        ],
        notes: "Family banking available for both tiers - max 4 members (Spouse, Parents, Children, In-laws, Siblings). Family ID mandatory for both Imperio and Celesta"
    },
    "Bank of Baroda": {
        tiers: [
            {
                name: "Baroda Radiance",
                minNRV: "₹30L QAB/TRV OR ₹3Cr Home Loan OR ₹25L Auto Loan OR High-ranking govt/defense officials (Colonel+, GM+, IAS/IPS/IFS)",
                eligibleCards: ["Sapphire Visa Signature Debit Card (complimentary)", "RuPay Select Debit Card", "Eterna Credit Card (complimentary)"],
                benefits: ["Dedicated Wealth RM", "Radiance Lounges & Business Centres", "Wealth management services", "Customized financial planning", "Priority service", "Preferred pricing"],
                rm: true
            },
            {
                name: "Baroda Radiance Private",
                minNRV: "USD 2 million+ (~₹16Cr+) investable assets",
                eligibleCards: ["Opulence Debit Card", "Premium credit cards"],
                benefits: ["Private Banker", "Bespoke wealth solutions", "Estate planning", "Exclusive events", "Global investment access", "Dedicated investment charter"],
                rm: true
            }
        ],
        notes: "Family banking: Up to 5 members at ₹50L QAB threshold (primary must maintain ₹30L QAB). Available in top 30 cities with dedicated RM; digital hub for other cities"
    }
};

// Helper functions
export const getBankNames = () => Object.keys(wealthBanking);

export const getWealthTier = (bank, nrv) => {
    const bankData = wealthBanking[bank];
    if (!bankData) return null;
    return bankData.tiers;
};

export const getFamilyBankingInfo = (bank) => {
    return familyBanking[bank] || null;
};

// Additional helper to get all banks with a specific minimum NRV threshold
export const getBanksByMinNRV = (minAmount) => {
    const results = [];
    Object.entries(wealthBanking).forEach(([bankName, bankData]) => {
        bankData.tiers.forEach(tier => {
            // This is simplified - actual implementation would parse NRV strings
            results.push({
                bank: bankName,
                tier: tier.name,
                minNRV: tier.minNRV
            });
        });
    });
    return results;
};

// Get banks that offer specific benefits
export const getBanksByBenefit = (benefit) => {
    const results = [];
    Object.entries(wealthBanking).forEach(([bankName, bankData]) => {
        bankData.tiers.forEach(tier => {
            if (tier.benefits.some(b => b.toLowerCase().includes(benefit.toLowerCase()))) {
                results.push({
                    bank: bankName,
                    tier: tier.name,
                    benefits: tier.benefits
                });
            }
        });
    });
    return results;
};
