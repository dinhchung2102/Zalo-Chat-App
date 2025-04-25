import { io } from 'socket.io-client';
import { baseURL, socketURL } from '../ipConfig';

const socket = io(socketURL, {
  transports: ['websocket', 'polling'],
  autoConnect: false,
  query: {
    userId: '', // <- cần set sau khi biết loginResult
    deviceType: 'app', // "app" cho mobile
  },
});

export default socket;
