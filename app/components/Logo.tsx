import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDna } from "@fortawesome/free-solid-svg-icons";
import Link  from "next/link";

export default function Logo({ className = "" }) {
  return (
    <div className={`${className}`}>
      <Link href="/">
        <h1 className="text-xl md:text-2xl font-bold flex items-center gap-4 shrink-0">
          <div className="p-4 bg-[#0f1b37] rounded-xl">
          <FontAwesomeIcon icon={faDna} className="w-4 h-4 md:h-6 md:w-6 text-[#1152d4]" />

          </div>
          Ligand AI
        </h1>
      </Link>
    </div>
  );
}
