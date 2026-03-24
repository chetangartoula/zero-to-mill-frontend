"use client";

import { useAppStore } from "@/store";
import { useEffect, useState, useRef, useCallback } from "react";

interface SSEOptions<T> {
  onMessage?: (data: T) => void;
  onError?: (event: Event) => void;
  onOpen?: (event: Event) => void;
  filters?: Record<string, string | number | boolean>;
  reconnectTimeout?: number;
  maxRetries?: number;
}

export const useSSE = <T = unknown>(
  url: string,
  options?: SSEOptions<T>
) => {
  const { accessToken } = useAppStore((state) => state);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<T | []>([]);
  const [error, setError] = useState<Event | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMountedRef = useRef(true);
  const retryCountRef = useRef(0);

  const reconnectTimeout = options?.reconnectTimeout ?? 3000;
  const maxRetries = options?.maxRetries ?? 10;

  const connect = useCallback(() => {
    if (!accessToken) return;

    if (options?.filters) {
      const hasUndefinedValue = Object.values(options.filters).some(
        (value) => value === undefined
      );
      if (hasUndefinedValue) {
        console.warn("SSE connection aborted due to undefined filter value");
        return;
      }
    }


    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }

    const params = new URLSearchParams({
      token: `${accessToken}`,
    });

    if (options?.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        params.append(key, String(value));
      });
    }

    const baseUrl = process.env.NEXT_PUBLIC_SSE_URL || "";
    const fullUrl = `${baseUrl}${url}?${params.toString()}`;

    const eventSource = new EventSource(fullUrl);

    eventSource.onopen = (event) => {
      if (!isMountedRef.current) return;
      retryCountRef.current = 0;
      setIsConnected(true);
      setError(null);
      options?.onOpen?.(event);
    };

    eventSource.onmessage = (event) => {
      if (!isMountedRef.current) return;
      try {
        const parsedData = JSON.parse(event.data) as T;
        setMessages(parsedData);
        options?.onMessage?.(parsedData);
      } catch (err) {
        console.error("Failed to parse SSE message:", err);
      }
    };

    eventSource.onerror = (event) => {
      if (!isMountedRef.current) return;
      retryCountRef.current += 1;
      console.error(
        `SSE connection error (attempt ${retryCountRef.current}/${maxRetries}):`,
        event
      );
      setIsConnected(false);
      setError(event);
      options?.onError?.(event);

      eventSource.close();
      eventSourceRef.current = null;

      // Stop retrying after maxRetries consecutive failures
      if (retryCountRef.current >= maxRetries) {
        console.warn(
          `SSE: Stopped reconnecting after ${maxRetries} consecutive failures.`
        );
        return;
      }

      // Auto-reconnect after delay
      reconnectTimerRef.current = setTimeout(() => {
        if (isMountedRef.current) {
          connect();
        }
      }, reconnectTimeout);
    };

    eventSourceRef.current = eventSource;
  }, [accessToken, url, options, reconnectTimeout]);

  useEffect(() => {
    isMountedRef.current = true;
    connect();

    return () => {
      isMountedRef.current = false;

      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }

      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
        reconnectTimerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, accessToken]);

  return {
    isConnected,
    messages,
    error,
  };
};
