import axios from 'axios';

const apiClient = axios.create({
    baseURL: `http://192.168.188.76:5001/api`, // Thay bằng URL backend của bạn
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
