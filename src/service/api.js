import axios from 'axios';

const API_URL = 'https://localhost:7217/api';

const api = axios.create({
    baseURL: API_URL,   
});

export default api;