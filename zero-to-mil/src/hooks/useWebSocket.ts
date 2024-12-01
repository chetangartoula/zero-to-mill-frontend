import { useAppStore } from "@/store";
import { useEffect, useRef, useState } from "react";

interface WebSocketOptions {
  onOpen?: (event: Event) => void;
  onClose?: (event: CloseEvent) => void;
  onMessage?: (event: MessageEvent) => void;
  onError?: (event: Event) => void;
  headers?: Record<string, string>;
}

export const useWebSocket = (url: string, options?: WebSocketOptions) => {
  const { accessToken } = useAppStore((state) => state);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const socketRef = useRef<WebSocket | null>(null);
  console.log("accessTokenfrom socket", accessToken);

  useEffect(() => {
    const socket = new WebSocket(
      `${process.env.NEXT_PUBLIC_WS_URL}/${url}?token=${accessToken}`
    );
    socketRef.current = socket;

    socket.onopen = (event) => {
      setIsConnected(true);
      if (options?.onOpen) {
        options.onOpen(event);
      }
    };

    socket.onclose = (event) => {
      setIsConnected(false);
      if (options?.onClose) {
        options.onClose(event);
      }
    };

    socket.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
      if (options?.onMessage) {
        options.onMessage(event);
      }
    };

    socket.onerror = (event) => {
      if (options?.onError) {
        options.onError(event);
      }
    };

    return () => {
      socket.close();
    };
  }, [url, options]);

  const sendMessage = (message: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    }
  };

  return { isConnected, messages, sendMessage };
};
