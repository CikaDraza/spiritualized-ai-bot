export type Role = "user" | "assistant";

export type Message = {
  id: string;
  role: Role;
  content: string;
};

export type ChatHistoryItem = {
  role: Role;
  content: string;
};

export type ChatRequest = {
  message: string;
  history: ChatHistoryItem[];
  session_id: string;
};

export type ChatResponse = {
  assistant: string;
  error?: string;
};

export type AuthProfile = {
  email: string;
  full_name?: string;
};

export type AuthMode = "login" | "register";
