import { Sparkles } from "lucide-react";

/** CSS robot mascot placeholder. Swap for a 3D render later: <Image src="/robot.png" .../>. */
export default function RobotMascot() {
  return (
    <div className="robot">
      <div className="r-antenna" />
      <div className="r-arm l" />
      <div className="r-arm r" />
      <div className="r-head" />
      <div className="r-visor">
        <div className="r-eye" />
        <div className="r-eye" />
      </div>
      <div className="r-body" />
      <div className="r-chest">
        <Sparkles size={16} />
      </div>
    </div>
  );
}
