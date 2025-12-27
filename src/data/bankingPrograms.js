// Banking programs data - Family Banking and Wealth Banking tiers

export const familyBanking = {
    "HDFC Bank": {
        name: "HDFC Family Privileges",
        minNRV: "₹2 Lakh combined",
        eligibleMembers: ["Spouse", "Parents", "Children (18+)"],
        maxMembers: 6,
        benefits: [
            "Shared Priority Banking benefits",
            "Combined relationship for fee waivers",
            "Shared lounge access quota",
            "Single point of contact (RM)",
            "Preferential rates on loans"
        ],
        howToApply: "Visit branch with family member KYC documents",
        notes: "Imperia Family requires ₹10L+ combined NRV"
    },
    "ICICI Bank": {
        name: "ICICI Family Banking",
        minNRV: "₹3 Lakh combined",
        eligibleMembers: ["Spouse", "Parents", "Children"],
        maxMembers: 5,
        benefits: [
            "Combined NRV calculation",
            "Shared Coral/Sapphire benefits",
            "Joint account facilities",
            "Family health insurance discounts",
            "Combined milestone rewards"
        ],
        howToApply: "Through iMobile app or visit branch",
        notes: "Higher tiers unlock with ₹10L+ combined balance"
    },
    "Axis Bank": {
        name: "Axis Priority Family",
        minNRV: "₹5 Lakh combined",
        eligibleMembers: ["Spouse", "Parents", "Children (18+)", "Siblings"],
        maxMembers: 4,
        benefits: [
            "Shared Priority/Burgundy benefits",
            "Combined lounge access",
            "Family travel insurance",
            "Preferential forex rates",
            "Dedicated RM for family"
        ],
        howToApply: "Branch visit with relationship proof",
        notes: "Burgundy Family requires ₹30L+ combined"
    },
    "SBI": {
        name: "SBI Family Banking",
        minNRV: "₹5 Lakh combined",
        eligibleMembers: ["Spouse", "Parents", "Dependent Children"],
        maxMembers: 4,
        benefits: [
            "Club together balances",
            "Reduced locker charges",
            "Combined insurance benefits",
            "Preferential loan rates",
            "Single statement option"
        ],
        howToApply: "Any SBI branch with documents",
        notes: "Limited features compared to private banks"
    },
    "Kotak Mahindra Bank": {
        name: "Kotak Privy League Family",
        minNRV: "₹10 Lakh combined",
        eligibleMembers: ["Spouse", "Parents", "Children"],
        maxMembers: 4,
        benefits: [
            "Shared Privy League privileges",
            "Family lounge access pool",
            "Wealth management for family",
            "Joint investment planning",
            "Combined credit card benefits"
        ],
        howToApply: "Through RM or branch",
        notes: "Signature Family requires ₹30L+"
    },
    "IDFC First Bank": {
        name: "IDFC First Private Family",
        minNRV: "₹10 Lakh combined",
        eligibleMembers: ["Spouse", "Parents", "Children"],
        maxMembers: 5,
        benefits: [
            "Shared First Private benefits",
            "Combined interest rate benefits",
            "Family health coverage",
            "Shared lounge access",
            "Zero forex markup for family"
        ],
        howToApply: "Through app or RM",
        notes: "Best-in-class savings rate applies to all family accounts"
    }
};

export const wealthBanking = {
    "HDFC Bank": {
        tiers: [
            {
                name: "Classic",
                minNRV: "₹1 Lakh - ₹10 Lakh",
                eligibleCards: ["Regalia", "All In One"],
                benefits: ["Basic priority service", "Limited lounge access"],
                rm: false
            },
            {
                name: "Preferred",
                minNRV: "₹10 Lakh - ₹30 Lakh",
                eligibleCards: ["Regalia Gold", "Diners ClubMiles"],
                benefits: ["Priority service", "4 lounge visits/quarter", "Lower forex rates"],
                rm: true
            },
            {
                name: "Imperia",
                minNRV: "₹30 Lakh - ₹2 Crore",
                eligibleCards: ["Infinia", "Diners Black"],
                benefits: ["Premium RM", "Unlimited lounge", "Golf", "Concierge"],
                rm: true
            },
            {
                name: "Private Banking",
                minNRV: "₹2 Crore+",
                eligibleCards: ["Infinia Metal", "Invite only cards"],
                benefits: ["Dedicated team", "Global access", "Estate planning", "Art advisory"],
                rm: true
            }
        ]
    },
    "ICICI Bank": {
        tiers: [
            {
                name: "Coral",
                minNRV: "₹1 Lakh - ₹10 Lakh",
                eligibleCards: ["Coral", "Platinum"],
                benefits: ["Basic priority", "2 lounge visits/quarter"],
                rm: false
            },
            {
                name: "Sapphire",
                minNRV: "₹10 Lakh - ₹50 Lakh",
                eligibleCards: ["Sapphiro", "Rubyx"],
                benefits: ["Priority banking", "4 lounge visits", "Preferential rates"],
                rm: true
            },
            {
                name: "Emeralde",
                minNRV: "₹50 Lakh - ₹5 Crore",
                eligibleCards: ["Emeralde", "Emeralde Private"],
                benefits: ["Ultra-premium service", "Unlimited lounge", "Golf", "Concierge"],
                rm: true
            },
            {
                name: "Private Banking",
                minNRV: "₹5 Crore+",
                eligibleCards: ["Invite only"],
                benefits: ["Family office", "Global banking", "Exclusive events"],
                rm: true
            }
        ]
    },
    "Axis Bank": {
        tiers: [
            {
                name: "Priority",
                minNRV: "₹5 Lakh - ₹30 Lakh",
                eligibleCards: ["Select", "Privilege"],
                benefits: ["Priority service", "4 lounge visits", "Better rates"],
                rm: true
            },
            {
                name: "Burgundy",
                minNRV: "₹30 Lakh - ₹2 Crore",
                eligibleCards: ["Atlas", "Reserve"],
                benefits: ["Premium RM", "8+ lounge visits", "Golf access"],
                rm: true
            },
            {
                name: "Burgundy Private",
                minNRV: "₹5 Crore+",
                eligibleCards: ["Magnus", "Burgundy Private"],
                benefits: ["Private banker", "Global lounge", "Wealth advisory"],
                rm: true
            }
        ]
    },
    "SBI": {
        tiers: [
            {
                name: "Gold Circle",
                minNRV: "₹5 Lakh - ₹25 Lakh",
                eligibleCards: ["SimplySAVE", "Prime"],
                benefits: ["Priority service", "Locker discounts", "Loan priority"],
                rm: false
            },
            {
                name: "Platinum Circle",
                minNRV: "₹25 Lakh+",
                eligibleCards: ["Elite", "Aurum"],
                benefits: ["Relationship Manager", "Premium lounge", "Wealth services"],
                rm: true
            }
        ]
    },
    "Kotak Mahindra Bank": {
        tiers: [
            {
                name: "Privy League",
                minNRV: "₹10 Lakh - ₹30 Lakh",
                eligibleCards: ["Royale", "League Platinum"],
                benefits: ["Priority banking", "Lounge access", "Better rates"],
                rm: true
            },
            {
                name: "Privy League Signature",
                minNRV: "₹30 Lakh+",
                eligibleCards: ["Insignia", "League Signature"],
                benefits: ["Premium RM", "Unlimited lounge", "Golf", "Concierge"],
                rm: true
            }
        ]
    },
    "IDFC First Bank": {
        tiers: [
            {
                name: "First Private",
                minNRV: "₹10 Lakh - ₹1 Crore",
                eligibleCards: ["First Wealth", "Select"],
                benefits: ["7% savings rate", "Zero forex", "Free ATM", "Priority"],
                rm: true
            },
            {
                name: "First Private Elite",
                minNRV: "₹1 Crore+",
                eligibleCards: ["First Wealth", "Invite cards"],
                benefits: ["Dedicated RM", "Best rates", "Concierge", "Travel"],
                rm: true
            }
        ]
    }
};

// Helper functions
export const getBankNames = () => Object.keys(wealthBanking);

export const getWealthTier = (bank, nrv) => {
    const bankData = wealthBanking[bank];
    if (!bankData) return null;

    // Find matching tier based on NRV (simplified - would need number parsing)
    return bankData.tiers;
};

export const getFamilyBankingInfo = (bank) => {
    return familyBanking[bank] || null;
};
