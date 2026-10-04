import { uiCopy } from "@/data/site";
import Image from "next/image";
export function WaitingPanel({ image }: { image: string }) {
  return (
    <>
      <Image
        className="waiting-photo"
        src={image}
        width={716}
        height={660}
        sizes="(max-width: 767px) 100vw, 480px"
        alt=""
      />
      <div className="waiting-message">
        <i className="waiting-ring">
          <span />
        </i>
        <h2>{uiCopy.WaitingPanel__1}</h2>
        <p>{uiCopy.WaitingPanel__2}</p>
      </div>
    </>
  );
}
