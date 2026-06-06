"use client";

import { useEffect, useRef, useState } from "react";
import { Message } from "@/types/chat";

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: SpeechRecognitionResultLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionConstructorLike = new () => SpeechRecognitionLike;

type SpeechRecognitionResultLike = {
  results: Array<{
    0: { transcript?: string };
    isFinal?: boolean;
  }>;
};

type SpeechRecognitionErrorLike = {
  error?: string;
};

export type UseVoice = {
  isRecording: boolean;
  transcript: string;
  error: string | null;
  toggleRecording: () => void;
  speakLatestResponse: () => void;
};

export function useVoice(messages: Message[]): UseVoice {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const recognitionConstructor =
      (
        window as unknown as {
          SpeechRecognition?: SpeechRecognitionConstructorLike;
        }
      ).SpeechRecognition ||
      (
        window as unknown as {
          webkitSpeechRecognition?: SpeechRecognitionConstructorLike;
        }
      ).webkitSpeechRecognition;

    if (!recognitionConstructor) {
      return;
    }

    const recognition = new recognitionConstructor();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      const transcriptText = event.results
        .map((result) => String(result[0]?.transcript ?? ""))
        .join("");

      setTranscript(transcriptText);
      if (event.results[0]?.isFinal) {
        setTranscript(transcriptText);
        setIsRecording(false);
      }
    };

    recognition.onerror = (event) => {
      setError(String(event.error || "Greška u prepoznavanju glasa."));
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

  const toggleRecording = () => {
    const recognition = recognitionRef.current;

    if (!recognition) {
      setError("Pregledač ne podržava glasovno prepoznavanje.");
      return;
    }

    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
      return;
    }

    try {
      recognition.start();
      setError(null);
      setTranscript("");
      setIsRecording(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    }
  };

  const speakLatestResponse = () => {
    const latestAssistant = [...messages]
      .reverse()
      .find((message) => message.role === "assistant");

    if (!latestAssistant) {
      setError("Nema odgovora za reprodukciju.");
      return;
    }

    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setError("Pregledač ne podržava reprodukciju glasa.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(latestAssistant.content);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  return {
    isRecording,
    transcript,
    error,
    toggleRecording,
    speakLatestResponse,
  };
}
