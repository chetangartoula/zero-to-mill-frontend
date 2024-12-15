import { useAppStore } from "@/store";
import { useEffect, useRef, useState } from "react";

interface WebSocketOptions<T> {
  onOpen?: (event: Event) => void;
  onClose?: (event: CloseEvent) => void;
  onMessage?: (event: T) => void;
  onError?: (event: Event) => void;
  filters?: Record<string, string | number | boolean>;
}

export const useWebSocket = <T = unknown>(
  url: string,
  options?: WebSocketOptions<T>
) => {
  const { accessToken } = useAppStore((state) => state);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<T>({} as T);
  const socketRef = useRef<WebSocket | null>(null);

  console.log("isConnected", isConnected);

  useEffect(() => {
    if (options?.filters) {
      const hasUndefinedValue = Object.values(options.filters).some(
        (value) => value === undefined
      );
      if (hasUndefinedValue) {
        console.warn(
          "WebSocket connection aborted due to undefined filter value"
        );
        return;
      }
    }

    const params = new URLSearchParams({
      token: `${accessToken}`,
    });

    if (options?.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        params.append(key, String(value));
      });
    }

    const socket = new WebSocket(
      `${process.env.NEXT_PUBLIC_WS_URL}${url}?${params.toString()}`
    );

    socketRef.current = socket;
    socket.onopen = (event) => {
      setIsConnected(true);
      if (options?.onOpen) {
        options.onOpen(event);
      }
    };

    socket.onclose = (event) => {
      console.log("WebSocket closed:", event.code, event, event.reason);
      setIsConnected(false);
      if (options?.onClose) {
        options.onClose(event);
      }
    };

    socket.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data) as T;
        setMessages(parsedData);
        if (options?.onMessage) {
          options.onMessage(parsedData);
        }
      } catch (error) {
        console.error("Failed to parse websocket message:", error);
      }
    };

    socket.onerror = (event) => {
      console.error("WebSocket error:", event);
      if (options?.onError) {
        options.onError(event);
      }
    };

    return () => {
      socket.close();
    };
  }, [url, options, accessToken]);

  console.log("messages", messages);

  const sendMessage = (message: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    }
  };

  return { isConnected, messages, sendMessage };
};
