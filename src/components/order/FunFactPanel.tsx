import type { FunFact } from "@/lib/types";
import Image from "next/image";
export function FunFactPanel({ fact }: { fact: FunFact }) {
  return (
    <div className="tracking-fact">
      <div className="fact-dish">
        <Image
          src={`/assets/dishes/${fact.image}.webp`}
          width={170}
          height={170}
          sizes="170px"
          alt=""
        />
      </div>
      <span>{fact.tag}</span>
      <p>{fact.text}</p>
    </div>
  );
}
