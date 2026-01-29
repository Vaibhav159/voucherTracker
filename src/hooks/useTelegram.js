import { useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '../config/api';

const TOKEN_KEY = 'telegram_link_token';

// Simple UUID generator
const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

export const useTelegram = () => {
    const [token, setToken] = useState(null);
    const [subscription, setSubscription] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refetchTrigger, setRefetchTrigger] = useState(0);

    // Initialize token
    useEffect(() => {
        let storedToken = localStorage.getItem(TOKEN_KEY);
        if (!storedToken) {
            storedToken = generateUUID();
            localStorage.setItem(TOKEN_KEY, storedToken);
        }
        setToken(storedToken);
    }, []);

    // Check subscription status
    useEffect(() => {
        if (!token) return;

        const checkStatus = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/telegram/by-token/${token}/`);
                if (response.ok) {
                    const data = await response.json();
                    setSubscription(data);
                } else if (response.status === 404) {
                    setSubscription(null);
                }
            } catch (err) {
                console.error("Error checking telegram status:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        checkStatus();
    }, [token, refetchTrigger]);

    const refetch = useCallback(() => {
        setRefetchTrigger(prev => prev + 1);
    }, []);

    const subscribeToVoucher = async (voucherId) => {
        if (!subscription) return false;
        try {
            const response = await fetch(`${API_BASE_URL}/telegram/${subscription.chat_id}/subscribe_voucher/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ voucher_id: voucherId })
            });
            return response.ok;
        } catch (err) {
            console.error("Error subscribing:", err);
            return false;
        }
    };

    const unsubscribeFromVoucher = async (voucherId) => {
        if (!subscription) return false;
        try {
            const response = await fetch(`${API_BASE_URL}/telegram/${subscription.chat_id}/unsubscribe_voucher/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ voucher_id: voucherId })
            });
            return response.ok;
        } catch (err) {
            console.error("Error unsubscribing:", err);
            return false;
        }
    };

    // Get list of subscribed voucher IDs
    const getSubscribedVouchers = async () => {
        if (!subscription) return [];
        try {
            const response = await fetch(`${API_BASE_URL}/telegram/${subscription.chat_id}/subscriptions/`);
            if (response.ok) {
                const data = await response.json();
                return data.map(sub => sub.voucher);
            }
            return [];
        } catch (err) {
            console.error("Error fetching subscriptions:", err);
            return [];
        }
    };

    const getBotUrl = (voucherId = null) => {
        let startParam = token;
        if (voucherId) {
            startParam = `${token}_${voucherId}`;
        }
        return `https://t.me/VoucherTrackerBot?start=${startParam}`; // TODO: Check actual bot name
    };

    return {
        token,
        subscription,
        isLinked: !!subscription,
        loading,
        error,
        refetch,
        subscribeToVoucher,
        unsubscribeFromVoucher,
        getSubscribedVouchers,
        getBotUrl,
        botUrl: getBotUrl()
    };
};
