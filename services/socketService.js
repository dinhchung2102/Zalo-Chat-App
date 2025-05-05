import { io } from 'socket.io-client';
import { globalModalState } from '@state/PrimaryState';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { SOCKET_URL } from '@env';

const socket = io(SOCKET_URL, {
  transports: ['websocket', 'polling'],
  autoConnect: false,
  query: {
    userId: '', // <- cần set sau khi biết loginResult
    deviceType: 'app', // "app" cho mobile
  },
});

export default socket;

export function SocketListener() {
  const setModal = useSetRecoilState(globalModalState);

  useEffect(() => {
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
