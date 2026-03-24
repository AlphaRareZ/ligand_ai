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
import { PageStartingContent } from "../components/PageStartingContent";
import { CardWithBackground } from "./CardWithBackground";
import { HowItWorksCardFooter } from "./HowItWorksCardFooter";
import { HowItWorksCard } from "./HowItWorksCard";
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
export const colors = {
  blue: "text-[#3b82f6]",
  orange: "text-[#f59e0b]",
  green: "text-[#10b981]",
  purple: "text-[#c084fc]",
  red: "text-[#ef4444]",
};
export type ColorKey = keyof typeof colors;
export default function HowItWorks() {
  return (
    <div className="w-full bg-[#101622] text-white md:px-6 lg:px-8 overflow-hidden relative">
      <div className="hidden lg:block absolute -top-40 -right-40 h-125 w-125 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="hidden lg:block absolute bottom-200 -left-40 h-125 w-125 bg-green-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Heading Content */}
      <div className="z-10 max-w-7xl mx-auto py-16 ">
        <PageStartingContent>
          <PulsingMessage>The Synthetic Oracle Workflow</PulsingMessage>
          <HeadingContent
            heading="From Raw Data to"
            bluePart="Validated Leads"
            description="Our multi-phase algorithmic process leverages generative intelligence and structural biology to accelerate drug discovery with unprecedented precision."
            className="flex flex-col items-center text-center gap-6 max-w-fit"
          ></HeadingContent>
        </PageStartingContent>

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
