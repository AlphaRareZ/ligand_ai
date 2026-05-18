import Section from "../components/Section";
import { HeadingContent } from "../components/HeadingContent";
import TeamCarousel from "./components/TeamCarousel";
import { Brain, Dna, FlaskConical, Users } from "lucide-react";

/* ─── Metadata ───────────────────────────────────────────────────── */
export const metadata = {
  title: "About Us — AML2Ligand",
  description:
    "Meet the AML2Ligand research team — computer science students from the Faculty of Computers and AI - Cairo University, building the next generation of AI-driven drug discovery tools for Acute Myeloid Leukemia.",
};

/* ─── Value cards ────────────────────────────────────────────────── */
const VALUES = [
  {
    icon: Brain,
    title: "AI-First Research",
    body: "Every decision in our pipeline is informed by our department vision. We build models that learn the language of chemistry and biology to propose hypotheses no human would reach alone.",
  },
  {
    icon: Dna,
    title: "Precision Genomics",
    body: "We exploit RNA-Seq profiles of AML patients to identify the exact molecular vulnerabilities of each tumour subtype — enabling targeted therapies with minimal collateral damage.",
  },
  {
    icon: FlaskConical,
    title: "Translational Science",
    body: "Our in-silico predictions are designed to be immediately testable. We close the loop between computational proposals and wet-lab validation to accelerate the development cycle.",
  },
  {
    icon: Users,
    title: "Collaborative by Design",
    body: "We are students, researchers, and engineers working at the intersection of computer science, operations research, and molecular biology — because hard problems need diverse minds.",
  },
];

export default function AboutUs() {
  return (
    <main className="relative w-full overflow-hidden">
      {/* Background grid texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath%20d=%22M30%200l25.98%2015v30L30%2060%204.02%2045V15z%22%20fill-rule=%22evenodd%22%20stroke=%22%23ffffff%22%20fill=%22none%22/%3E%3C/svg%3E')] bg-[length:80px_80px] bg-repeat" />
      {/* Glow orbs */}
      <div className="hidden lg:block absolute -top-40 -right-40 h-[500px] w-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="hidden lg:block absolute bottom-0 -left-40 h-[500px] w-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10">
        {/* ─── Hero ────────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 min-h-[70vh] flex items-center border-b border-[#364153] py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
            {/* Left: heading */}
            <HeadingContent
              heading="The Minds Behind"
              bluePart="AML2Ligand"
              description="We are computer science students from the Faculty of Computers and Artificial Intelligence, Department of Operations Research and Decision Support. Enthusiasts of computational biology and AI-driven drug discovery — building the next generation of synthetic oracles."
            />

            {/* Right: stat pills */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "5+", label: "Team Members" },
                { value: "AML", label: "Disease Focus" },
                { value: "AI & OR", label: "Disciplines" },
                { value: "2026", label: "Graduation Project" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 flex flex-col gap-1 hover:border-[#1152d4]/30 hover:bg-white/[0.05] transition-all duration-300"
                >
                  <span className="text-3xl font-extrabold text-white">{stat.value}</span>
                  <span className="text-sm text-slate-400 font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Mission ─────────────────────────────────────────────── */}
        <Section
          title="Our Mission"
          description="Harnessing the intersection of artificial intelligence and molecular biology to accelerate life-saving therapies for one of oncology's most complex diseases."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {VALUES.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-[#1152d4]/25 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(17,82,212,0.07)] transition-all duration-300"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#1152d4]/10 border border-[#1152d4]/20 mb-4 group-hover:bg-[#1152d4]/15 transition-colors">
                  <Icon className="w-5 h-5 text-[#4d8ef7]" />
                </div>
                <h3 className="text-white font-bold text-base mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ─── Core Research Team (Carousel) ───────────────────────── */}
        <Section
          title="Core Research Team"
          description="Architecting the intersection of deep learning and molecular biology."
          hasBorder={false}
        >
          <TeamCarousel />
        </Section>
      </div>
    </main>
  );
}
