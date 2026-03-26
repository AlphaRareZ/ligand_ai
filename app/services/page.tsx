import { HeadingContent } from "../components/HeadingContent";
import PulsingMessage from "../components/PulsingMessage";
import { PageStartingContent } from "../components/PageStartingContent";
import { CardBody } from "../components/CardBody";
import { Atom, Dna } from "lucide-react";
import Button from "../components/Button";
import React from "react";
const content = [
  {
    primaryColor: "blue",
    title: "Automated Target Identification",
    description:
      "Upload your RNA-Seq and exon data to our AI engine. We analyze differential expression and network connectivity to identify the top 20 protein targets most relevant to Acute Myeloid Leukemia.",
    imgSrc: "service1.png",
    icon: "dna",
  },
  {
    primaryColor: "green",
    title: "De Novo Ligand Generation",
    description:
      "Input your target protein to our generative models. Receive the top 10 high-affinity ligand candidates, each accompanied by comprehensive proxy scoring and novelty assessments.",
    imgSrc: "service2.png",
    icon: "atom",
  },
] as const;
const COLORS = {
  blue: "#1152d4",
  green: "#0fb17b",
  gray: "#94a3b8",
};
const ICONS = {
  atom: Atom,
  dna: Dna,
};
type ColorType = keyof typeof COLORS;
type IconType = keyof typeof ICONS;
export default function Services() {
  return (
    <div className="w-full relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath%20d=%22M30%200l25.98%2015v30L30%2060%204.02%2045V15z%22%20fill-rule=%22evenodd%22%20stroke=%22%23ffffff%22%20fill=%22none%22/%3E%3C/svg%3E')] bg-[length:80px_80px] bg-repeat"></div>
      <div className="hidden lg:block absolute -top-40 -right-40 h-125 w-125 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="hidden lg:block absolute -bottom-20 -left-40 h-150 w-150 bg-green-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto py-16 px-4 md:px-20 z-10 relative">
        <PageStartingContent>
          <PulsingMessage>Next-Gen Oncology Solutions</PulsingMessage>
          <HeadingContent
            heading="Precision Scientific"
            bluePart="Services."
            description="Harness the power of the Synthetic Oracle. Our AI-driven pipelines accelerate target discovery and ligand design with unprecedented molecular accuracy."
            className="flex flex-col items-center text-center gap-6 max-w-fit"
          ></HeadingContent>
          <div className="h-0.5 w-35 bg-[#94a3b8]"></div>
        </PageStartingContent>
        <ServicesSection />
        <div className="mb-12"></div>
        <div className="min-h-45 flex flex-col md:items-center md:flex-row p-6 bg-[#171e2d]/50 rounded-2xl gap-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-white font-bold text-2xl">
              Unmatched Precision Oncology
            </h2>
            <p className="text-[#8e9cb1] font-semibold">
              Our algorithms are trained on over 500TB of clinical and molecular
              data, providing verified insights that reduce lead optimization
              time by 65%.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex flex-col">
              <h3 className="font-bold text-2xl md:text-3xl">99.8%</h3>
              <p className="whitespace-nowrap font-bold text-sm uppercase text-[#8e9cb1]">
                In-Silico Accuracy
              </p>
            </div>
            <div className="flex flex-col">
              <h3 className="font-bold text-2xl md:text-3xl">12ms</h3>
              <p className="whitespace-nowrap font-bold text-sm uppercase text-[#8e9cb1]">
                Inference Speed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function ServicesSection() {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-8">
      <ServiceCard {...content[0]}>
        <Features>
          <FeatureCard
            primaryColor={"blue"}
            title="Key Feature"
            description="Identifies Top 20 Candidates"
          ></FeatureCard>
        </Features>
        <Button
          variant="primaryGlow"
          className="w-full font-bold! text-xl! shadow-md hover:shadow-[0_0_20px_#1152d4] transition-shadow duration-300"
        >
          Start Target Analysis
        </Button>
      </ServiceCard>
      <ServiceCard {...content[1]}>
        <Features>
          <FeatureCard
            primaryColor={"green"}
            title="Key Feature"
            description="Top 10 Ligands"
          ></FeatureCard>
          <FeatureCard
            primaryColor={"gray"}
            title="Metrics"
            description="Binding Affinity, Novelty"
          ></FeatureCard>
        </Features>
        <Button
          variant="primaryGlow"
          className="w-full font-bold! text-xl! shadow-md hover:shadow-[0_0_20px_#1152d4] transition-shadow duration-300"
        >
          Begin Ligand Generation{" "}
        </Button>
      </ServiceCard>
    </div>
  );
}
function ServiceCard({
  primaryColor,
  title,
  description,
  imgSrc,
  icon,
  children,
}: {
  primaryColor: ColorType;
  title: string;
  description: string;
  imgSrc: string;
  icon: IconType;
  children?: React.ReactNode;
}) {
  // 2. Look up the classes based on the prop
  const themeColor = COLORS[primaryColor];
  const Icon = ICONS[icon];
  return (
    <div
      style={{ "--theme-color": themeColor } as React.CSSProperties}
      className={`group flex flex-col gap-4 bg-[#131b2b] rounded-xl border border-transparent duration-300 hover:border-(--theme-color) overflow-hidden shadow-xl transition-all`}
    >
      {/* image */}
      <div className="w-full overflow-hidden relative">
        <div className="flex items-center justify-center absolute w-12 h-12 bg-[#0d1119] z-1 left-5 top-5 rounded-md border-[0.5px] border-gray-800 text-(--theme-color)">
          <Icon size={24} />
        </div>
        <img
          src={imgSrc}
          alt=""
          className="w-full h-64 aspect-video object-cover scale-105 grayscale group-hover:scale-100 group-hover:grayscale-0 transform duration-500"
        />
        <div className="absolute bottom-0 left-0 w-full h-full bg-linear-to-t from-[#131b2b] to-transparent"></div>
      </div>
      {/* Content */}
      <div className="max-w-[90%] mx-auto flex flex-col gap-6">
        <CardBody
          heading={title}
          description={description}
          className="text-3xl! tracking-tight"
        />
        <div className="flex flex-col gap-6 mb-6">{children}</div>
      </div>
    </div>
  );
}
function Features({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col md:flex-row gap-4">{children}</div>;
}
function FeatureCard({
  primaryColor,
  title,
  description,
}: {
  primaryColor: ColorType;
  title: string;
  description: string;
}) {
  return (
    <div
      style={{ "--theme-color": COLORS[primaryColor] } as React.CSSProperties}
      className="border-[#1e293b] border-[0.5px] px-4 py-2 bg-[#161e2f] rounded-sm w-full"
    >
      <h3 className="text-sm font-semibold uppercase font-mono text-(--theme-color) tracking-wider mb-1">
        {title}
      </h3>
      <p className=" font-medium tracking-wide">{description}</p>
    </div>
  );
}
