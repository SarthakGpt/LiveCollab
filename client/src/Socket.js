import { io } from 'socket.io-client';

export const initSocket = async () => {
  const options = {
    forceNew: true,
    reconnectionAttempts: Infinity,
    timeout: 10000,
    transports: ['websocket'],
  };

  const socketURL = import.meta.env.VITE_BACKEND_URL;

  return io(socketURL, options);
};
