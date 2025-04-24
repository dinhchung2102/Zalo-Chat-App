import { io } from "socket.io-client";
import { baseURL, socketURL } from "../ipConfig";

const socket = io(socketURL, {
  transports: ["websocket","polling"],
  autoConnect: false,
  query: {
    userId: "",     
    deviceType:"app",     
  },
});

export default socket;

