import { CardBody } from "../components/CardBody";
import { ColorKey, colors } from "./page";

export function HowItWorksCard({
  hasBg,
  isReversed,
  color,
  phase,
  heading,
  description,
  imgSrc,
  children,
}: {
  hasBg?: boolean;
  isReversed?: boolean;
  color: ColorKey;
  phase?: string;
  heading?: string;
  description?: string;
  imgSrc?: string;
  footerData?: { icon: any; text: string }[];
  children?: React.ReactNode;
}) {
  const bgColor = hasBg ? "bg-[#131b2b]" : "transparent";
  return (
    <div
      className={`flex flex-col md:flex-row gap-18  p-4 md:px-12 md:py-18 rounded-4xl ${bgColor} ${isReversed ? "md:flex-row-reverse" : ""}`}
    >
      {/* Info */}
      <div className="flex flex-col gap-4 md:w-1/2">
        <h3 className={`uppercase ${colors[color]} font-bold tracking-wide`}>
          {phase}{" "}
        </h3>
        <CardBody heading={heading!} description={description!} />
        {/* Icon and Text */}
        {children}
      </div>
      {/* Image */}
      <div className="w-full md:w-1/2 ">
        <div className="w-full h-64 md:h-90 ">
          <img
            src={imgSrc}
            alt=""
            className={`w-full h-full object-cover rounded-2xl `}
          />
        </div>
      </div>
    </div>
  );
}
