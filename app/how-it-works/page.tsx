import CTASection from "../components/CTASection";
import { HeadingContent } from "../components/HeadingContent";
import PulsingMessage from "../components/PulsingMessage";
import {
  ChartNoAxesColumn,
  Dna,
  Box,
  DraftingCompass,
  Sparkles,
  BadgeCheck,
  Zap,
} from "lucide-react";
const data = [
  [
    {
      icon: ChartNoAxesColumn,
      text: "Automated TCGA Data Normalization",
    },
    {
      icon: Dna,
      text: "Precision Exon-to-Gene Mapping",
    },
  ],
  [
    {
      icon: Box,
      text: "AlphaFold-2 Structural Integration",
    },
    {
      icon: DraftingCompass,
      text: "Binding Pocket Volumetric Analysis",
    },
  ],
  [
    {
      icon: BadgeCheck,
      text: "Multi-Objective Fitness Functions",
    },
    {
      icon: Zap,
      text: "High-Resolution Geometric Docking",
    },
  ],
];
const colors = {
  blue: "text-[#3b82f6]",
  orange: "text-[#f59e0b]",
  green: "text-[#10b981]",
  purple: "text-[#c084fc]",
  red: "text-[#ef4444]",
};
type ColorKey = keyof typeof colors;
export default function HowItWorks() {
  return (
    <div className="w-full bg-[#101622] text-white md:px-6 lg:px-8">
      {/* Heading Content */}
      <div className="max-w-7xl mx-auto py-16 ">
        <div className="flex flex-col gap-4 items-center mb-8 md:mb-16 lg:mb-32">
          <PulsingMessage>The Synthetic Oracle Workflow</PulsingMessage>
          <HeadingContent
            heading="From Raw Data to"
            bluePart="Validated Leads"
            description="Our multi-phase algorithmic process leverages generative intelligence and structural biology to accelerate drug discovery with unprecedented precision."
            className="flex flex-col items-center text-center gap-6 max-w-fit"
          ></HeadingContent>
        </div>
        <div className="flex flex-col px-4 gap-12 ">
          {/* First Card */}
          <HowItWorksCard
            hasBg={false}
            color="blue"
            phase="Phase 01"
            heading="Transcriptomic Profiling & Preprocessing"
            description="We begin by ingesting massive raw TCGA datasets. Our proprietary pipeline executes high-fidelity exon-to-gene mapping and HVG (Highly Variable Gene) selection to isolate the most relevant biological signals for therapeutic intervention."
            imgSrc="phase1.png"
            // isReversed={true}
          >
            <HowItWorksCardFooter
              data={data[0]}
              textColor={colors["blue"]}
            ></HowItWorksCardFooter>
          </HowItWorksCard>
          {/* Second Card */}
          <HowItWorksCard
            hasBg={true}
            isReversed
            color="orange"
            phase="Phase 02"
            heading="Network-Based Target Prioritization"
            description="Utilizing co-expression network analysis, we detect gene modules associated with disease progression. Our system validates biomarkers through cross-referencing multi-omic repositories to ensure target druggability."
            imgSrc="phase2.png"
            // isReversed={true}
          >
            <div className="flex flex-col md:flex-row gap-6">
              <CardWithBackground
                title="98%"
                description="Validation accuracy"
              />
              <CardWithBackground title="50k+" description="Modules analyzed" />
            </div>
          </HowItWorksCard>
          {/* Third Card */}
          <HowItWorksCard
            color="green"
            phase="Phase 03"
            heading="Network-Based Target Prioritization"
            description="We transition from genetic data to physical structure. By integrating AlphaFold PDB predictions, we define precise binding pockets and identify cryptic sites for allosteric modulation."
            imgSrc="phase3.png"
            // isReversed={true}
          >
            <HowItWorksCardFooter
              data={data[1]}
              textColor={colors["green"]}
            ></HowItWorksCardFooter>
          </HowItWorksCard>
          {/* Fourth Card */}
          <HowItWorksCard
            color="purple"
            isReversed
            hasBg
            phase="Phase 04"
            heading="De Novo Ligand Assembly"
            description="Our generative engine employs fragment-based assembly and evolutionary mutation algorithms. This creates novel chemical entities tailored specifically to the target's unique geometry."
            imgSrc="phase4.png"
            // isReversed={true}
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full flex flex-row gap-4 bg-[#1b1d35] border border-[#37285b] p-4 rounded-xl items-center">
                <Sparkles size={28} className={colors["purple"]} />
                <div>
                  <p className="text-white font-semibold">
                    Evolutionary Algorithms
                  </p>
                  <p className="text-[#94a3b8] text-sm">
                    Iterative mutation for optimal affinity
                  </p>
                </div>
              </div>
            </div>
          </HowItWorksCard>
          {/* Fifth Card */}
          <HowItWorksCard
            color="red"
            phase="Phase 05"
            heading="Physicochemical Profiling & Docking"
            description="Final candidates undergo multi-objective fitness screening. We utilize geometric docking and ADMET profiling to rank candidates based on safety, efficacy, and synthesis feasibility."
            imgSrc="phase5.png"
            // isReversed={true}
          >
            <HowItWorksCardFooter
              data={data[2]}
              textColor={colors["red"]}
            ></HowItWorksCardFooter>
          </HowItWorksCard>
          <CTASection></CTASection>
        </div>
      </div>
    </div>
  );
}

function HowItWorksCard({
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
        <h2 className={`font-bold text-4xl mb-4`}>{heading}</h2>
        <p className="tracking-wider text-[#94a3b8] mb-4">{description}</p>
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
function HowItWorksCardFooter({
  data,
  textColor,
}: {
  data: { icon: any; text: string }[];
  textColor?: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      {data.map((item, index) => (
        <div key={index} className="flex flex-row gap-4">
          <item.icon size={24} className={textColor} />
          <p className="text-[#cbd5d5] font-semibold tracking-wide">
            {item.text}
          </p>
        </div>
      ))}
    </div>
  );
}
function CardWithBackground({
  title,
  description,
  bg,
  border,
}: {
  title: string;
  description: string;
  bg?: string;
  border?: string;
}) {
  return (
    <div
      className={`${bg || "bg-[#1e2129]"} border ${border || "border-[#332e25]"} p-4 w-full rounded-xl`}
    >
      <h1 className={`text-2xl font-semibold ${colors["orange"]}`}>{title}</h1>
      <p className="font-mono text-[#94a3b8] uppercase">{description}</p>
    </div>
  );
}
