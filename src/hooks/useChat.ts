"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import { fetcher } from "@/lib/fetcher";
import {
  ChatHistoryItem,
  ChatRequest,
  ChatResponse,
  Message,
  Role,
} from "@/types/chat";

const initialMessages: Message[] = [
  {
    id: "assistant-1",
    role: "assistant",
    content:
      "Dobrodošao u Spiritualized AI Mentor. Piši na engleskom, a ja ću ti pomoći sa stilom, značenjem i prefinjenim objašnjenjima na srpskom.",
  },
];

import type { RefObject } from "react";

export type UseChat = {
  messages: Message[];
  input: string;
  loading: boolean;
  error: string | null;
  messagesEndRef: RefObject<HTMLDivElement | null>;
  setInput: (value: string) => void;
  sendMessage: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};

function toChatHistory(messages: Message[]): ChatHistoryItem[] {
  return messages
    .filter((message) => message.id !== "assistant-1")
    .map((message) => ({
      role: message.role,
      content: message.content,
    }));
}

export function useChat(accessToken?: string): UseChat {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId] = useState<string>(() =>
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `session-${Date.now()}`,
  );
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const conversationHistory = useMemo(
    () => toChatHistory(messages),
    [messages],
  );

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedInput = input.trim();

    if (!trimmedInput) {
      return;
    }

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmedInput,
    };

    setMessages((previousMessages) => [...previousMessages, userMessage]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const requestBody: ChatRequest = {
        message: userMessage.content,
        history: conversationHistory,
        session_id: sessionId,
      };

      const response = await fetcher<ChatResponse>("/api/chat", {
        method: "POST",
        headers: {
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify(requestBody),
      });

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: response.assistant,
      };

      setMessages((previousMessages) => [
        ...previousMessages,
        assistantMessage,
      ]);
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return {
    messages,
    input,
    loading,
    error,
    messagesEndRef,
    setInput,
    sendMessage,
  };
}
