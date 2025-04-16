// services/socket.js

import { io } from "socket.io-client";
import { API_BASE_URL, API_PORT } from "@env";

let socket = null;

export const initializeSocket = (userId) => {
    if (!socket) {
        socket = io(`http://${API_BASE_URL}:${API_PORT}`, {
            query: {
                userId,
                deviceType: "app",
            },
        });

        socket.on("connect", () => {
            console.log("Connected to socket server");e
        });

        socket.on("newMessage", (message) => {
            // console.log("New message received:", message);
            // Có thể dispatch action hoặc cập nhật state của chat
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from socket server");
        });
    }
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};
