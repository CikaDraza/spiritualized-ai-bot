import {
  Briefcase,
  MessagesSquare,
  Plane,
  ShoppingBag,
  UserCheck,
  type LucideIcon,
} from "lucide-react";

import {
  PERSONA_OPTIONS,
  SCENARIO_OPTIONS,
  type Persona,
  type ScenarioType,
  type Space,
} from "@/types/space";

// Icon + friendly topic name per scenario (used by the slot card and the classroom header).
export const SCENARIO_META: Record<ScenarioType, { Icon: LucideIcon; title: string }> = {
  business_communication: { Icon: Briefcase, title: "Business English" },
  everyday_conversation: { Icon: MessagesSquare, title: "Everyday English" },
  job_interview: { Icon: UserCheck, title: "Interview Prep" },
  shopping: { Icon: ShoppingBag, title: "Shopping Trip" },
  travel: { Icon: Plane, title: "Travel Talk" },
};

export const scenarioLabel = (v: ScenarioType) =>
  SCENARIO_OPTIONS.find((o) => o.value === v)?.label ?? v;

export const personaLabel = (v: Persona) =>
  PERSONA_OPTIONS.find((o) => o.value === v)?.label ?? v;

// e.g. "Business English · Viktor · B1"
export const classroomTitle = (space: Space) =>
  `${SCENARIO_META[space.scenario_type].title} · ${personaLabel(space.persona)} · ${space.level}`;
