const API_BASE_URL = import.meta.env.PROD
    ? 'https://tracker.cheq.dpdns.org'
    : '';

export const API_ENDPOINTS = {
    VOUCHERS: `${API_BASE_URL}/api/vouchers/`,
    CREDIT_CARDS: `${API_BASE_URL}/api/credit-cards/`,
    GUIDES: `${API_BASE_URL}/api/guides/`,
    HEALTH: `${API_BASE_URL}/api/health/`,
};

export default API_ENDPOINTS;
