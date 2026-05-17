"use client";

import React, { useState } from "react";
import LabSidebar, { type LabView } from "./components/LabSidebar";
import TargetHistory from "./components/TargetHistory";
import TargetAnalyze from "./components/TargetAnalyze";
import ViewResults from "./components/ViewResults";
import LigandHistory from "./components/LigandHistory";
import LigandGenerate from "./components/LigandGenerate";

export default function LabPage() {
  const [activeView, setActiveView] = useState<LabView>("target-history");
  const [viewingResultsId, setViewingResultsId] = useState<string | null>(null);

  const renderContent = () => {
    switch (activeView) {
      case "target-history":
        return <TargetHistory onViewResults={(id) => setViewingResultsId(id)} />;
      case "target-analyze":
        return <TargetAnalyze onBack={() => setActiveView("target-history")} />;
      case "ligand-history":
        return <LigandHistory />;
      case "ligand-generate":
        return <LigandGenerate />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#101622]">
      <LabSidebar activeView={activeView} onViewChange={setActiveView} />

      {/* Main Content */}
      <div className="flex-1 relative overflow-hidden">
        {/* Background glow orbs */}
        <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#1152d4]/[0.04] blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-emerald-500/[0.03] blur-[100px]" />

        <div className="relative p-8 lg:p-12 overflow-y-auto max-h-screen">
          {renderContent()}
        </div>
      </div>

      {/* Results Modal */}
      {viewingResultsId && (
        <ViewResults
          analysisId={viewingResultsId}
          onClose={() => setViewingResultsId(null)}
        />
      )}
    </div>
  );
}
