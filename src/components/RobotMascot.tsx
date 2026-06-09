// import { Sparkles } from "lucide-react";
import Image from "next/image";

/** CSS robot mascot placeholder. Swap for a 3D render later: <Image src="/robot.png" .../>. */
export default function RobotMascot() {
  return (
    // <div className="robot">
    //   <div className="r-antenna" />
    //   <div className="r-arm l" />
    //   <div className="r-arm r" />
    //   <div className="r-head" />
    //   <div className="r-visor">
    //     <div className="r-eye" />
    //     <div className="r-eye" />
    //   </div>
    //   <div className="r-body" />
    //   <div className="r-chest">
    //     <Sparkles size={16} />
    //   </div>
    // </div>
    <Image
      src="/hero-section-little-robot.png"
      alt="Robot Mascot"
      width={720}
      height={720}
      className="z-10 w-[360px] aspect-[4/3] object-contain md:w-[480px]"
    />
  );
}
