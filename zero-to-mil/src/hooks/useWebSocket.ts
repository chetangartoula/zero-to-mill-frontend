import { useAppStore } from "@/store";
import { useEffect, useRef, useState } from "react";

interface WebSocketOptions<T> {
  onOpen?: (event: Event) => void;
  onClose?: (event: CloseEvent) => void;
  onMessage?: (event: T) => void;
  onError?: (event: Event) => void;
  headers?: Record<string, string>;
}

export const useWebSocket = <T = unknown>(
  url: string,
  options?: WebSocketOptions<T>
) => {
  const { accessToken } = useAppStore((state) => state);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<T[]>([]);
  const socketRef = useRef<WebSocket | null>(null);
  console.log("accessTokenfrom socket", accessToken);

  useEffect(() => {
    const socket = new WebSocket(
      `${process.env.NEXT_PUBLIC_WS_URL}${url}?token=${`Bearer ${accessToken}`}`
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
      try {
        const parsedData = JSON.parse(event.data) as T;
        setMessages((prevMessages) => [...prevMessages, parsedData]);
        if (options?.onMessage) {
          options.onMessage(parsedData);
        }
      } catch (error) {
        console.error("Failed to parse websocket message:", error);
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
  }, [url, options, accessToken]);

  const sendMessage = (message: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    }
  };

  console.log("messages", messages);

  return { isConnected, messages, sendMessage };
};
