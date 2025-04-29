// Determine the base URL for the API
const getBaseUrl = () => {
    if (process.env.NODE_ENV === 'production') {
        return ''; // Empty string will use the same domain as the frontend in production
    }
    return 'http://localhost:3000'; // Development URL
};

export const API_BASE_URL = getBaseUrl(); 