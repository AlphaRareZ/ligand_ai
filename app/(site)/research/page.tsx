import { HeadingContent } from "../components/HeadingContent";
import PulsingMessage from "../components/PulsingMessage";
import { PageStartingContent } from "../components/PageStartingContent";
import Section from "../components/Section";
import SectionGrid from "../components/SectionGrid";
import CTASection from "../components/CTASection";
import Link from "next/link";
import Button from "../components/Button";
import {
  Dna,
  FlaskConical,
  Brain,
  Target,
  Microscope,
  BarChart3,
  ArrowRight,
  BookOpen,
  Sparkles,
  Atom,
} from "lucide-react";

/* ─── Metadata ───────────────────────────────────────────────────── */
export const metadata = {
  title: "Research — AML2Ligand",
  description:
    "Explore our cutting-edge research in AI-driven drug discovery for Acute Myeloid Leukemia. From RNA-Seq analysis to de novo ligand generation.",
};

/* ─── Data ───────────────────────────────────────────────────────── */

const RESEARCH_AREAS = [
  {
    icon: Dna,
    tag: "Genomics",
    title: "Transcriptomic Profiling of AML Subtypes",
    description:
      "We apply advanced RNA-Seq analysis pipelines to identify differentially expressed genes and cryptic splicing events across AML patient cohorts, enabling the discovery of subtype-specific therapeutic vulnerabilities.",
    highlights: ["TCGA Integration", "HVG Selection", "Exon-Level Mapping"],
    gradient: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/20",
    tagColor: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    iconColor: "text-blue-400",
  },
  {
    icon: Brain,
    tag: "Artificial Intelligence",
    title: "Generative Models for Molecular Design",
    description:
      "Our generative AI engine leverages evolutionary algorithms and fragment-based assembly to design novel small molecules with optimized binding affinity, selectivity, and pharmacokinetic properties.",
    highlights: [
      "De Novo Generation",
      "Multi-Objective Optimization",
      "Novelty Scoring",
    ],
    gradient: "from-violet-500/20 to-purple-500/20",
    borderColor: "border-violet-500/20",
    tagColor: "text-violet-400 bg-violet-400/10 border-violet-400/20",
    iconColor: "text-violet-400",
  },
  {
    icon: Target,
    tag: "Target Discovery",
    title: "Network-Based Target Prioritization",
    description:
      "Using co-expression network analysis and multi-omic repository cross-referencing, we identify and validate the most druggable protein targets driving leukemogenesis and treatment resistance.",
    highlights: ["Gene Module Detection", "Druggability Scoring", "Biomarker Validation"],
    gradient: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-500/20",
    tagColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    iconColor: "text-emerald-400",
  },
  {
    icon: Atom,
    tag: "Structural Biology",
    title: "Protein Structure Prediction & Docking",
    description:
      "We integrate AlphaFold predictions with high-resolution geometric docking to map binding pockets, identify allosteric sites, and evaluate ligand-protein interactions at atomic resolution.",
    highlights: [
      "AlphaFold Integration",
      "Binding Pocket Analysis",
      "Molecular Docking",
    ],
    gradient: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/20",
    tagColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    iconColor: "text-amber-400",
  },
];

const PUBLICATIONS = [
  {
    title: "Automated Target Identification via Differential Expression Analysis in AML",
    authors: "AML2Ligand Research Team",
    venue: "Graduation Project — Cairo University, FCAI",
    year: "2026",
    type: "Thesis",
    description:
      "A comprehensive pipeline that processes RNA-Seq data from TCGA to identify the top 20 protein targets most relevant to Acute Myeloid Leukemia through automated differential expression and co-expression network analysis.",
  },
  {
    title: "De Novo Ligand Generation Using Evolutionary Fragment Assembly",
    authors: "AML2Ligand Research Team",
    venue: "Graduation Project — Cairo University, FCAI",
    year: "2026",
    type: "Thesis",
    description:
      "A generative molecular design system that employs fragment-based assembly with evolutionary mutation algorithms to create novel chemical entities tailored to specific protein binding geometries.",
  },
  {
    title: "End-to-End Drug Discovery: From Transcriptomic Data to Validated Lead Compounds",
    authors: "AML2Ligand Research Team",
    venue: "Graduation Project — Cairo University, FCAI",
    year: "2026",
    type: "Thesis",
    description:
      "An integrated platform combining multi-phase algorithmic processing — transcriptomic profiling, target prioritization, structural modeling, ligand generation, and physicochemical profiling — into a unified drug discovery workflow.",
  },
];

const KEY_METRICS = [
  { value: "50B+", label: "Genomic Data Points", icon: BarChart3, color: "text-emerald-400" },
  { value: "Top 20", label: "Targets Identified", icon: Target, color: "text-blue-400" },
  { value: "Top 10", label: "Ligands Generated", icon: FlaskConical, color: "text-violet-400" },
  { value: "5-Phase", label: "Discovery Pipeline", icon: Sparkles, color: "text-amber-400" },
];

/* ─── Page ───────────────────────────────────────────────────────── */

export default function Research() {
  return (
    <main className="relative w-full overflow-hidden">
      {/* Background grid texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath%20d=%22M30%200l25.98%2015v30L30%2060%204.02%2045V15z%22%20fill-rule=%22evenodd%22%20stroke=%22%23ffffff%22%20fill=%22none%22/%3E%3C/svg%3E')] bg-[length:80px_80px] bg-repeat" />
      {/* Glow orbs */}
      <div className="hidden lg:block absolute -top-40 -right-40 h-[500px] w-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="hidden lg:block absolute bottom-0 -left-40 h-[500px] w-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10">
        {/* ─── Hero ────────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 min-h-[70vh] flex items-center border-b border-[#364153] py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
            {/* Left: heading */}
            <div className="flex flex-col gap-8">
              <PulsingMessage>Peer-Reviewed Research</PulsingMessage>
              <HeadingContent
                heading="Pioneering AML Drug Discovery Through"
                bluePart="AI Research"
                description="Our multidisciplinary research program combines computational biology, machine learning, and structural chemistry to accelerate the discovery of novel therapeutics for Acute Myeloid Leukemia."
              />
              <div className="flex flex-wrap gap-4 mt-4">
                <Link href="/lab">
                  <Button>Explore the Lab</Button>
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center justify-center rounded-md font-semibold transition duration-200 cursor-pointer border border-gray-600 text-white bg-transparent hover:bg-[#364153] px-6 py-3 text-base"
                >
                  View Pipeline
                </Link>
              </div>
            </div>

            {/* Right: Key metrics grid */}
            <div className="grid grid-cols-2 gap-4">
              {KEY_METRICS.map((metric) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={metric.label}
                    className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 flex flex-col gap-2 hover:border-[#1152d4]/30 hover:bg-white/[0.05] transition-all duration-300"
                  >
                    <Icon className={`w-5 h-5 ${metric.color}`} />
                    <span className="text-3xl font-extrabold text-white">
                      {metric.value}
                    </span>
                    <span className="text-sm text-slate-400 font-medium">
                      {metric.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Research Areas ───────────────────────────────────────── */}
        <Section
          title="Core Research Areas"
          description="Our research spans four interconnected disciplines — each reinforcing the others to create a truly integrated drug discovery pipeline."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RESEARCH_AREAS.map((area) => {
              const Icon = area.icon;
              return (
                <div
                  key={area.title}
                  className={`group rounded-2xl border ${area.borderColor} bg-white/[0.02] p-6 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(17,82,212,0.07)] transition-all duration-300`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${area.gradient} border border-white/[0.08] shrink-0 group-hover:scale-105 transition-transform duration-300`}
                    >
                      <Icon className={`w-5 h-5 ${area.iconColor}`} />
                    </div>
                    <div>
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border mb-2 ${area.tagColor}`}
                      >
                        {area.tag}
                      </span>
                      <h3 className="text-white font-bold text-lg leading-snug">
                        {area.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {area.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {area.highlights.map((h) => (
                      <span
                        key={h}
                        className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[11px] font-medium text-slate-400"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* ─── Research Highlights with Images ──────────────────────── */}
        <Section
          title="Research Highlights"
          description="Tackling the most challenging mutations in AML with AI-driven precision medicine."
          hasBorder={true}
        >
          <SectionGrid className="items-start md:grid-cols-2">
            <div className="flex flex-col gap-4">
              <div className="w-full aspect-video rounded-2xl overflow-hidden grayscale hover:scale-[1.02] hover:grayscale-0 transition-all duration-500">
                <img
                  src="Research1.png"
                  alt="Targeted Protein Degradation research"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-2xl text-white">
                Targeted Protein Degradation
              </h3>
              <p className="text-[#8fa3b8]">
                Developing PROTACs and molecular glues to eliminate oncogenic
                proteins previously considered &lsquo;undruggable&rsquo; by
                standard inhibitors. Our AI models predict optimal linker
                geometries and E3 ligase recruiters.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Microscope className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Computational Chemistry
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="w-full aspect-video rounded-2xl overflow-hidden grayscale hover:scale-[1.02] hover:grayscale-0 transition-all duration-500">
                <img
                  src="Research2.png"
                  alt="Splicing Modulators research"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-2xl text-white">
                Splicing Modulators
              </h3>
              <p className="text-[#8fa3b8]">
                Harnessing deep RNA-seq insights to identify and correct
                aberrant splicing patterns that drive leukemogenesis and drug
                resistance. Our pipeline detects novel splice junctions invisible
                to traditional tools.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Dna className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Transcriptomics
                </span>
              </div>
            </div>
          </SectionGrid>
        </Section>

        {/* ─── Publications ───────────────────────────────────────── */}
        <Section
          title="Publications & Theses"
          description="Academic contributions from the AML2Ligand research program at Cairo University."
          hasBorder={true}
        >
          <div className="space-y-5">
            {PUBLICATIONS.map((pub, index) => (
              <div
                key={pub.title}
                className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-[#1152d4]/25 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#1152d4]/10 border border-[#1152d4]/20 shrink-0 mt-1">
                    <BookOpen className="w-5 h-5 text-[#4d8ef7]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#1152d4]/10 text-[#4d8ef7] border border-[#1152d4]/20">
                        {pub.type}
                      </span>
                      <span className="text-xs text-slate-500">
                        {pub.year}
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-base mb-1 group-hover:text-[#4d8ef7] transition-colors">
                      {pub.title}
                    </h3>
                    <p className="text-xs text-slate-500 mb-2">
                      {pub.authors} — <em>{pub.venue}</em>
                    </p>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {pub.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ─── Methodology Snapshot ──────────────────────────────── */}
        <Section
          title="Our Methodology"
          description="A rigorous, multi-phase approach that bridges computational prediction and biological validation."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                step: "01",
                label: "Data Ingestion",
                desc: "TCGA RNA-Seq normalization",
                icon: BarChart3,
                color: "text-blue-400",
              },
              {
                step: "02",
                label: "Target Ranking",
                desc: "Network co-expression",
                icon: Target,
                color: "text-amber-400",
              },
              {
                step: "03",
                label: "Structure Mapping",
                desc: "AlphaFold integration",
                icon: Atom,
                color: "text-emerald-400",
              },
              {
                step: "04",
                label: "Ligand Design",
                desc: "Generative fragment assembly",
                icon: FlaskConical,
                color: "text-violet-400",
              },
              {
                step: "05",
                label: "Validation",
                desc: "Docking & ADMET profiling",
                icon: Microscope,
                color: "text-rose-400",
              },
            ].map((phase) => {
              const PhaseIcon = phase.icon;
              return (
                <div
                  key={phase.step}
                  className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 text-center hover:border-[#1152d4]/25 hover:bg-white/[0.04] transition-all duration-300"
                >
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-3">
                    Phase {phase.step}
                  </span>
                  <div className="flex items-center justify-center mx-auto w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] mb-3 group-hover:scale-110 transition-transform duration-300">
                    <PhaseIcon className={`w-5 h-5 ${phase.color}`} />
                  </div>
                  <h4 className="text-white font-semibold text-sm mb-1">
                    {phase.label}
                  </h4>
                  <p className="text-slate-500 text-xs">{phase.desc}</p>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center mt-10">
            <Link href="/how-it-works">
              <Button variant="secondary" size="md">
                <span className="flex items-center gap-2">
                  Full Pipeline Details
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Button>
            </Link>
          </div>
        </Section>

        {/* ─── CTA ────────────────────────────────────────────────── */}
        <CTASection />
      </div>
    </main>
  );
}
