import Hero from "./components/Hero";
import { DnaIcon, Brain, FlaskConical } from "lucide-react";
import SectionCard from "./components/SectionCard";
import ResearchCard from "./components/ResearchCard";
import StatsSection from "./components/statsSection";
import SectionGrid from "./components/SectionGrid";
import Section from "./components/Section";
import CTASection from "./components/CTASection";
const icons = {
  dna: DnaIcon,
  brain: Brain,
  flask: FlaskConical,
};
export default function Home() {
  return (
    <main className="relative w-full overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath%20d=%22M30%200l25.98%2015v30L30%2060%204.02%2045V15z%22%20fill-rule=%22evenodd%22%20stroke=%22%23ffffff%22%20fill=%22none%22/%3E%3C/svg%3E')] bg-size-[80px_80px] bg-repeat"></div>
      <div className="hidden lg:block absolute -top-40 -right-40 h-125 w-125 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="hidden lg:block absolute bottom-0 -left-40 h-125 w-125 bg-green-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="relative z-10 ">
        {/* <Header /> */}
        <Hero />
        <StatsSection />
        {/* How it Works Section */}
        <Section
          title="How It Works"
          description="Our proprietary platform integrates multi-omic data with deep learning to revolutionize the drug development lifecycle for hematologic malignancies."
        >
          <SectionGrid className={"md:grid-cols-3"}>
            <SectionCard
              icon={icons.dna}
              title={"RNA-Seq Integration"}
              description={
                "We process massive datasets of RNA sequences from AML patients to identify unique cellular signatures and cryptic splicing events."
              }
            />
            <SectionCard
              icon={icons.brain}
              title={"Generative AI Models"}
              description={
                "Our AI designs optimized ligand structures with high binding affinity, targeted specificity, and minimized off-target toxicity profiles."
              }
            />
            <SectionCard
              icon={icons.flask}
              title={"In-Vitro Validation"}
              description={
                "In-silico predictions are rapidly validated through automated high-throughput laboratory workflows to confirm biological activity."
              }
            />
          </SectionGrid>
        </Section>
        {/* Research Focus Section */}
        <Section
          title="Research Focus"
          description="Targeting the most challenging mutations in Acute Myeloid Leukemia with AI-driven precision medicine."
          hasBorder={true}
        >
          <SectionGrid className={"items-start md:grid-cols-2"}>
            <ResearchCard
              imgSrc="Research1.png"
              title="Targeted Protein Degradation"
              description="Developing PROTACs and molecular glues to eliminate oncogenic proteins previously considered 'undruggable' by standard inhibitors."
            />
            <ResearchCard
              imgSrc="Research2.png"
              title="Splicing Modulators"
              description="Harnessing deep RNA-seq insights to identify and correct aberrant splicing patterns that drive leukemogenesis and drug resistance."
            />
          </SectionGrid>
        </Section>
        {/* CTA Section */}
        <CTASection />
        {/* <Footer /> */}
      </div>
    </main>
  );
}
