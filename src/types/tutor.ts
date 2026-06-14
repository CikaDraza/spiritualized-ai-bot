export type ChatRole = "user" | "assistant";

export type Severity = "minor" | "moderate" | "major";

export type Mistake = {
  category: string;
  original: string;
  correction: string;
  explanation: string; // Serbian
  severity: Severity;
};

export type TutorTranslation = {
  ai_response: string; // Serbian translation of ai_response
  correction: string; // Serbian translation of correction ("" if none)
};

// Mirrors backend TutorTurnResponse (app/schemas.py).
export type TutorTurnResponse = {
  ai_response: string;
  correction: string;
  translation: TutorTranslation;
  hints: string[];
  mistakes: Mistake[];
  persona: string;
  session_id: string;
};

// A rendered chat message. Assistant tutor messages carry the structured turn so the UI can
// render the correction card / hints / translation under the bubble.
export type ChatMsg = {
  role: ChatRole;
  content: string;
  turn?: TutorTurnResponse;
};
