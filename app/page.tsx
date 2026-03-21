import Footer from "./common/Footer";
import Header from "./common/Header";
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
    <main className="bg-[#101622] text-white h-full">
      <Header />
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
      <Footer />
    </main>
  );
}
