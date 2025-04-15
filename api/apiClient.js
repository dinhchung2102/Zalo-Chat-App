import axios from 'axios';

const apiClient = axios.create({
    baseURL: `http://192.168.100.70:5001/api`, 
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
