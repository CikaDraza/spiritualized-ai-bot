"use client";

import AuthSection from "@/components/AuthSection";
import AudioSection from "@/components/AudioSection";
import ChatSection from "@/components/ChatSection";
import { useAuth } from "@/hooks/useAuth";
import { useChat } from "@/hooks/useChat";
import { useVoice } from "@/hooks/useVoice";

export default function Dashboard() {
  const auth = useAuth();
  const chat = useChat(auth.accessToken ?? undefined);
  const voice = useVoice(chat.messages);

  return (
    <section className="grid gap-6 xl:grid-cols-[420px_1fr]">
      <aside className="space-y-6">
        <AuthSection {...auth} />
        <AudioSection
          isRecording={voice.isRecording}
          transcript={voice.transcript}
          error={voice.error}
          toggleRecording={voice.toggleRecording}
          speakLatestResponse={voice.speakLatestResponse}
        />
      </aside>
      <ChatSection
        messages={chat.messages}
        input={chat.input}
        loading={chat.loading}
        error={chat.error}
        messagesEndRef={chat.messagesEndRef}
        profile={auth.profile}
        setInput={chat.setInput}
        sendMessage={chat.sendMessage}
      />
    </section>
  );
}
