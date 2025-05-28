import { io } from 'socket.io-client';
import { globalModalState } from '@state/PrimaryState';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { SOCKET_URL } from '@env';

let socket;

export function createSocket(userId) {
  if (socket) {
    socket.disconnect();
  }

  socket = io(SOCKET_URL, {
    transports: ['websocket', 'polling'],
    autoConnect: false,
    query: {
      userId,
      deviceType: 'app',
    },
  });

  return socket;
}

export function getSocket() {
  if (!socket) {
    throw new Error('Socket chưa được khởi tạo');
  }
  return socket;
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
export function SocketListener() {
  const setModal = useSetRecoilState(globalModalState);

  useEffect(() => {
    if (!socket) return; // Nếu socket chưa được tạo thì thoát

    socket.connect();

    socket.on('forceLogout', (data) => {
      setModal({
        visible: true,
        message: data.message || 'Bạn đã bị đăng xuất do đăng nhập nơi khác',
      });
    });

    return () => {
      socket.off('forceLogout');
      socket.disconnect();
    };
  }, []);

  return null;
}
