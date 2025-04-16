import { io } from "socket.io-client";
import { ipServerAddress } from "../ipConfig";

const socket = io(`http://${ipServerAddress}:5001`, {
  transports: ["websocket","polling"],
  autoConnect: false,
  query: {
    userId: "",     // <- cần set sau khi biết loginResult
    deviceType:"app",     // "app" cho mobile
  },
});

export default socket;

