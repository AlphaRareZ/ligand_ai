import { HeadingContent } from "../components/HeadingContent";
import PulsingMessage from "../components/PulsingMessage";
import { PageStartingContent } from "../components/PageStartingContent";

export default function Services() {
  return (
    <div className="w-full relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath%20d=%22M30%200l25.98%2015v30L30%2060%204.02%2045V15z%22%20fill-rule=%22evenodd%22%20stroke=%22%23ffffff%22%20fill=%22none%22/%3E%3C/svg%3E')] bg-[length:80px_80px] bg-repeat"></div>
      <div className="hidden lg:block absolute -top-40 -right-40 h-125 w-125 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="hidden lg:block absolute bottom-0 -left-40 h-125 w-125 bg-green-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto py-16 z-10">
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
      </div>
    </div>
  );
}
