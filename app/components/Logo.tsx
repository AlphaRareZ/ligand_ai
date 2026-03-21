import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDna } from "@fortawesome/free-solid-svg-icons";

export default function Logo({ className }) {
  return (
    <div className={`${className}`}>
      <a href="#">
        <h1 className="text-2xl font-bold flex items-center gap-4 shrink-0">
          <FontAwesomeIcon icon={faDna} className="h-6" />
          Ligand AI
        </h1>
      </a>
    </div>
  );
}
