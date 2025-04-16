import axios from 'axios';
import { ipServerAddress } from '../ipConfig';

const apiClient = axios.create({
    baseURL: `http://${ipServerAddress}:5001/api`, 
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
