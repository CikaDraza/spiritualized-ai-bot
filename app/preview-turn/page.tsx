import TutorMessage from "@/components/TutorMessage";
import type { ChatMsg, TutorTurnResponse } from "@/types/tutor";

// TEMP preview route. Real JSON captured from a live POST /tutor/turn (gpt-4o-mini),
// fed into the actual TutorMessage + CorrectionCard. Delete when done reviewing.
const turn: TutorTurnResponse = {
  ai_response:
    "That's great! You went shopping yesterday. What kind of bread did you buy?",
  correction: "Yesterday I went to the shop and bought two loaves of bread.",
  translation: {
    ai_response: "To je sjajno! Išli ste u kupovinu juče. Kakav hleb ste kupili?",
    correction: "Juče sam otišao u prodavnicu i kupio dva hleba.",
  },
  hints: [
    "Use 'went' instead of 'go' for past actions.",
    "Use 'bought' instead of 'buy' for past purchases.",
    "Remember to specify 'loaves of bread' when talking about quantity.",
  ],
  mistakes: [
    {
      subtype: "verb_tenses",
      category: "syntax",
      original: "I go to the shop",
      correction: "I went to the shop",
      explanation:
        "Koristimo prošlo vreme jer govorimo o nečemu što se desilo juče.",
      severity: "minor",
    },
    {
      subtype: "verb_tenses",
      category: "syntax",
      original: "buy two bread",
      correction: "bought two loaves of bread",
      explanation:
        "Treba koristiti 'bought' za prošlo vreme i 'loaves' da bismo pravilno označili količinu.",
      severity: "minor",
    },
  ],
  persona: "viktor",
  session_id: "preview-0001",
};

const tutorMsg: ChatMsg = { role: "assistant", content: turn.ai_response, turn };

export default function PreviewTurnPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-8">
      <div className="mx-auto flex max-w-[480px] flex-col gap-4">
        <h1 className="text-[15px] font-extrabold text-ink">
          Preview · TutorMessage + CorrectionCard
        </h1>

        {/* learner message that gets corrected */}
        <div className="max-w-[88%] self-end rounded-[18px] rounded-br-[6px] bg-primary px-[15px] py-3 font-body text-[13.5px] text-white">
          Yesterday I go to the shop and buy two bread.
        </div>

        {/* structured tutor turn — bubble + Translate + hints + CorrectionCard */}
        <TutorMessage m={tutorMsg} />
      </div>
    </main>
  );
}
