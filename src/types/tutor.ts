export type ChatRole = "user" | "assistant";

export type ChatMsg = { role: ChatRole; content: string };

export type Mistake = {
  category: string;
  original: string;
  correction: string;
  explanation: string;
};

// Mirrors backend TutorTurnResponse (app/schemas.py).
export type TutorTurnResponse = {
  assistant: string;
  persona: string;
  session_id: string;
  mistakes: Mistake[];
};
