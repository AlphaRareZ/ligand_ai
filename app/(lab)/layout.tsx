import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Lab Workspace — AML2Ligand",
  description:
    "AI-driven lab workspace for AML drug discovery. Analyze protein targets, generate ligand candidates, and explore pipeline results.",
};

export default function LabLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-full h-full bg-[#101622] text-white">
      {children}
    </div>
  );
}
