export type ScenarioType =
  | "business_communication"
  | "everyday_conversation"
  | "job_interview"
  | "shopping"
  | "travel";

export type Level = "A1" | "A2" | "B1" | "B2" | "C1";
export type Persona = "mila" | "viktor" | "nora" | "maria";

export type Space = {
  id: number;
  title: string;
  scenario_type: ScenarioType;
  level: Level;
  persona: Persona;
  is_active: boolean;
  created_at: string | null;
  updated_at: string | null;
};

export const MAX_SPACES = 5;

export const SCENARIO_OPTIONS: { value: ScenarioType; label: string }[] = [
  { value: "business_communication", label: "Business communication" },
  { value: "everyday_conversation", label: "Everyday conversation" },
  { value: "job_interview", label: "Job interview" },
  { value: "shopping", label: "Shopping" },
  { value: "travel", label: "Travel" },
];

export const LEVEL_OPTIONS: Level[] = ["A1", "A2", "B1", "B2", "C1"];

export const PERSONA_OPTIONS: { value: Persona; label: string }[] = [
  { value: "mila", label: "Mila" },
  { value: "viktor", label: "Viktor" },
  { value: "nora", label: "Nora" },
  { value: "maria", label: "Maria" },
];
