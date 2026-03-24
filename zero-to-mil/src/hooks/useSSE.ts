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
  eventName?: string;
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

    const eventName = options?.eventName || "message";

    eventSource.onopen = (event) => {
      console.log('SSE onOpen')
      if (!isMountedRef.current) return;
      retryCountRef.current = 0;
      setIsConnected(true);
      setError(null);
      options?.onOpen?.(event);
    };

    const handleMessage = (event: MessageEvent) => {
      console.log(`SSE onMessage [${eventName}]:`, event.data);
      if (!isMountedRef.current) return;
      try {
        const parsedData = JSON.parse(event.data) as T as any;
        setMessages(parsedData?.data);
        options?.onMessage?.(parsedData?.data);
      } catch (err) {
        console.error("Failed to parse SSE message:", err);
      }
    };

    if (eventName === "message") {
      eventSource.onmessage = handleMessage;
    } else {
      eventSource.addEventListener(eventName, handleMessage as EventListener);
      eventSource.onmessage = handleMessage;
    }

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

      if (retryCountRef.current >= maxRetries) {
        console.warn(
          `SSE: Stopped reconnecting after ${maxRetries} consecutive failures.`
        );
        return;
      }

      reconnectTimerRef.current = setTimeout(() => {
        if (isMountedRef.current) {
          connect();
        }
      }, reconnectTimeout);
    };

    eventSourceRef.current = eventSource;
  }, [accessToken, url, options?.eventName, JSON.stringify(options?.filters), reconnectTimeout]);

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
  }, [connect]);

  return {
    isConnected,
    messages,
    error,
  };
};
