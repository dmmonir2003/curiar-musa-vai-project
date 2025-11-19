import { useEffect, useRef, useCallback, useState } from 'react';
import { io } from 'socket.io-client';
import { API_BASE_URL } from '../constants';
import { useSelector } from 'react-redux';
import { selectAccessToken, selectUser } from '../store/userSlice';

export function useSocket() {
  const socketRef = useRef(null);
  const token = useSelector(selectAccessToken);
  const user = useSelector(selectUser);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);

  const connect = useCallback(() => {
    if (!socketRef.current) {
      console.log('Initializing socket connection...');
      socketRef.current = io('https://apibrenger.codeperfecto.com', {
        autoConnect: false,
        transports: ['websocket'],
        auth: { token },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 20000,
        path: '/socket.io',
      });

      // Connection events
      socketRef.current.on('connect', () => {
        console.log('Socket connected');
        setIsConnected(true);
        setConnectionError(null);
        
        // Join user's personal notification room on connect
        if (user?._id) {
          socketRef.current.emit('joinNotifications', user._id);
        }
      });

      socketRef.current.on('disconnect', (reason) => {
        console.log('Socket disconnected:', reason);
        setIsConnected(false);
        if (reason === 'io server disconnect') {
          setTimeout(() => socketRef.current.connect(), 1000);
        }
      });

      socketRef.current.on('connect_error', (err) => {
        console.error('Socket connection error:', err.message);
        setConnectionError(err.message);
        setIsConnected(false);
      });

      socketRef.current.on('error', (err) => {
        console.error('Socket error:', err);
        setConnectionError(err.message);
      });
    }

    if (!socketRef.current.connected) {
      console.log('Attempting to connect socket...');
      socketRef.current.connect();
    }

    return socketRef.current;
  }, [token, user?._id]);

  const disconnect = useCallback(() => {
    if (socketRef.current?.connected) {
      console.log('Disconnecting socket...');
      socketRef.current.disconnect();
      setIsConnected(false);
    }
  }, []);

  // Existing conversation functions
  const joinConversation = useCallback((conversationId) => {
    const socket = connect();
    if (socket && conversationId) {
      console.log(`Joining conversation: ${conversationId}`);
      socket.emit('joinConversation', conversationId);
    }
  }, [connect]);

  const sendMessage = useCallback(({ conversationId, content, sender }) => {
    console.log('Sending message:', { conversationId, content, sender });
    const socket = connect();
    if (!socket || !conversationId || !content) {
      return Promise.reject(new Error('Invalid parameters or socket not connected'));
    }

    return new Promise((resolve, reject) => {
      const onMessageSent = (message) => {
        cleanup();
        resolve(message);
      };

      const onMessageError = (errorMessage) => {
        cleanup();
        reject(new Error(errorMessage));
      };

      const cleanup = () => {
        socket.off('messageSent', onMessageSent);
        socket.off('messageError', onMessageError);
      };

      socket.on('messageSent', onMessageSent);
      socket.on('messageError', onMessageError);

      socket.emit('sendMessage', { 
        conversationId, 
        content, 
        sender: user?._id,
        tempId: `temp-${Date.now()}` // For optimistic updates
      });
    });
  }, [connect, user?._id]);

  // New notification functions
  const sendJobAcceptedNotification = useCallback(({ requestId }) => {
    const socket = connect();
    if (!socket || !requestId) {
      return Promise.reject(new Error('Invalid parameters'));
    }

    return new Promise((resolve, reject) => {
      const onSuccess = () => {
        cleanup();
        resolve();
      };

      const onError = (error) => {
        cleanup();
        reject(new Error(error));
      };

      const cleanup = () => {
        socket.off('jobAcceptedSuccess', onSuccess);
        socket.off('jobAcceptedError', onError);
      };

      socket.on('jobAcceptedSuccess', onSuccess);
      socket.on('jobAcceptedError', onError);

      socket.emit('jobAccepted', { requestId });
    });
  }, [connect]);

  // Listeners
  const listenForMessages = useCallback((callback) => {
    const socket = connect();
    socket.on('newMessage', callback);
    return () => {
      socket.off('newMessage', callback);
    };
  }, [connect]);

  const listenForNotifications = useCallback((callback) => {
    const socket = connect();
    socket.on('newNotification', callback);
    return () => {
      socket.off('newNotification', callback);
    };
  }, [connect]);

  const listenForErrors = useCallback((callback) => {
    const socket = connect();
    socket.on('error', callback);
    socket.on('connect_error', callback);
    return () => {
      socket.off('error', callback);
      socket.off('connect_error', callback);
    };
  }, [connect]);

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    // Connection management
    connect,
    disconnect,
    isConnected,
    connectionError,
    
    // Conversation functions
    joinConversation,
    sendMessage,
    listenForMessages,
    
    // Notification functions
    sendJobAcceptedNotification,
    listenForNotifications,
    
    // Error handling
    listenForErrors,
    
    // Raw socket access
    socket: socketRef.current,
  };
}