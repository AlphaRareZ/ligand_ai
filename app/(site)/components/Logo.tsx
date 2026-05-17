import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDna } from "@fortawesome/free-solid-svg-icons";
import Link  from "next/link";

export default function Logo({ className = "" }) {
  return (
    <div className={`${className}`}>
      {/* Logo */}
      <div className="relative">
        <Link href="/">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#1152d4]/30 to-[#1152d4]/10 border border-[#1152d4]/20 shadow-[0_0_20px_rgba(17,82,212,0.15)]">
              <FontAwesomeIcon
                icon={faDna}
                className="w-4 h-4 text-[#4d8ef7]"
              />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white">
                AML<sub className="mx-0.5 text-[#4d8ef7]">2</sub>Ligand
              </h1>

            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
