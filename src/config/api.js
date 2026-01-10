const PROD_API = 'https://tracker.cheq.dpdns.org/api';
export const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? PROD_API : '/api');
