"use client";

import { useAppStore } from "@/store";
import { useEffect, useState, useRef, useCallback } from "react";

interface WebSocketOptions<T> {
  onOpen?: (event: Event) => void;
  onClose?: (event: CloseEvent) => void;
  onMessage?: (event: T) => void;
  onError?: (event: Event) => void;
  filters?: Record<string, string | number | boolean>;
  reconnectTimeout?: number;
}

export const useWebSocket = <T = unknown>(
  url: string,
  options?: WebSocketOptions<T>
) => {
  const { accessToken } = useAppStore((state) => state);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<T | []>([]);
  const socketRef = useRef<WebSocket | null>(null);
  const [isAttemptingConnection, setIsAttemptingConnection] = useState(false);

  const createWebSocket = useCallback(() => {
    let newSocket: WebSocket | null = null;

    if (isAttemptingConnection || isConnected) {
      console.warn("WebSocket connection already in progress or established");
      return null;
    }
    if (options?.filters) {
      const hasUndefinedValue = Object.values(options.filters).some(
        (value) => value === undefined
      );

      if (hasUndefinedValue) {
        console.warn(
          "WebSocket connection aborted due to undefined filter value"
        );
        return null;
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

    const fullUrl = `${
      process.env.NEXT_PUBLIC_WS_URL
    }${url}?${params.toString()}`;

    setIsAttemptingConnection(true);

    newSocket = new WebSocket(fullUrl);

    newSocket.onopen = (event) => {
      setIsConnected(true);
      setIsAttemptingConnection(false);
      options?.onOpen?.(event);
    };

    newSocket.onclose = (event) => {
      console.log("WebSocket closed:", event.code, event);
      setIsConnected(false);
      setIsAttemptingConnection(false);
      options?.onClose?.(event);
    };

    newSocket.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data) as T;
        setMessages(parsedData);
        options?.onMessage?.(parsedData);
      } catch (error) {
        console.error("Failed to parse WebSocket message:", error);
      }
      return false;
    };

    newSocket.onerror = (event) => {
      console.error("WebSocket error:", event);
      setIsAttemptingConnection(false);
      options?.onError?.(event);
    };

    socketRef.current = newSocket;
    return newSocket;
  }, [accessToken, isConnected, isAttemptingConnection, options, url]);

  useEffect(() => {
    let isMounted = true;
    const connectWebSocket = () => {
      if (isMounted && !isConnected && !isAttemptingConnection) {
        createWebSocket();
      }
    };

    connectWebSocket();

    return () => {
      isMounted = false;
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [
    url,
    accessToken,
    options?.filters,
    createWebSocket,
    isConnected,
    isAttemptingConnection,
  ]);

  const sendMessage = (message: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    }
  };

  return {
    isConnected,
    isAttemptingConnection,
    messages,
    sendMessage,
  };
};
