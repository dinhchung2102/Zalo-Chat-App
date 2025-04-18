import axios from 'axios';
import { baseURL } from '../ipConfig';

const apiClient = axios.create({
    baseURL: baseURL, 
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
