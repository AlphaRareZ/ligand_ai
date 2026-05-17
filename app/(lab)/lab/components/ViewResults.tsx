"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark, faTable, faCubes, faChartBar,
  faAtom, faWeightHanging, faBolt, faDownload,
} from "@fortawesome/free-solid-svg-icons";

interface Props { analysisId: string; onClose: () => void; }

type Tab = "csv" | "pdb" | "images";

const csvHeaders = ["Gene", "Expression", "Fold Change", "P-Value", "FDR", "Binding Score", "Status", "Pathway"];
const csvRows = [
  ["FLT3", "12.45", "3.21", "0.0012", "0.005", "0.89", "Active", "RTK/RAS"],
  ["NPM1", "8.92", "2.15", "0.0034", "0.012", "0.76", "Active", "Nucleolar"],
  ["DNMT3A", "6.78", "1.89", "0.0089", "0.023", "0.82", "Active", "Epigenetic"],
  ["IDH2", "4.56", "-1.45", "0.0156", "0.034", "0.71", "Inactive", "Metabolic"],
  ["CEBPA", "9.12", "2.67", "0.0023", "0.008", "0.91", "Active", "TF"],
  ["TP53", "3.45", "-2.34", "0.0001", "0.001", "0.95", "Active", "Tumor Supp."],
  ["RUNX1", "7.23", "1.56", "0.0178", "0.041", "0.68", "Inactive", "TF"],
  ["KIT", "11.34", "3.89", "0.0005", "0.003", "0.87", "Active", "RTK/RAS"],
  ["ASXL1", "5.67", "-1.23", "0.0234", "0.052", "0.64", "Inactive", "Epigenetic"],
  ["TET2", "6.89", "1.78", "0.0067", "0.019", "0.79", "Active", "Epigenetic"],
];

const proteins = [
  { name: "FLT3 Kinase Domain", pdb: "4XUF", weight: "37.2 kDa", resolution: "2.1 Å", chains: 2, color: "from-blue-500/20 to-cyan-500/20" },
  { name: "NPM1 C-terminal", pdb: "4YPC", weight: "12.8 kDa", resolution: "1.8 Å", chains: 1, color: "from-violet-500/20 to-purple-500/20" },
  { name: "DNMT3A PWWP", pdb: "3LLR", weight: "45.1 kDa", resolution: "2.4 Å", chains: 4, color: "from-emerald-500/20 to-teal-500/20" },
];

const chartTitles = [
  { title: "Expression Heatmap", desc: "Gene expression across AML subtypes", gradient: "from-rose-500/30 via-orange-500/20 to-yellow-500/30" },
  { title: "Binding Affinity Plot", desc: "Ligand-receptor docking scores", gradient: "from-blue-500/30 via-cyan-500/20 to-teal-500/30" },
  { title: "Pathway Enrichment", desc: "KEGG pathway analysis results", gradient: "from-violet-500/30 via-purple-500/20 to-indigo-500/30" },
  { title: "Volcano Plot", desc: "Differential expression significance", gradient: "from-emerald-500/30 via-green-500/20 to-lime-500/30" },
  { title: "PCA Clustering", desc: "Sample clustering by components", gradient: "from-amber-500/30 via-orange-500/20 to-red-500/30" },
  { title: "Survival Curve", desc: "Kaplan-Meier by mutation status", gradient: "from-sky-500/30 via-blue-500/20 to-indigo-500/30" },
];

export default function ViewResults({ analysisId, onClose }: Props) {
  const [tab, setTab] = useState<Tab>("csv");

  const tabs: { key: Tab; label: string; icon: typeof faTable }[] = [
    { key: "csv", label: "CSV Data", icon: faTable },
    { key: "pdb", label: "Protein Structures", icon: faCubes },
    { key: "images", label: "Image Results", icon: faChartBar },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-6xl mx-4 my-8 rounded-2xl border border-white/[0.08] bg-[#0d1526]/95 backdrop-blur-xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-white/[0.06]">
          <div>
            <h2 className="text-xl font-bold text-white">Analysis Results — <span className="text-[#4d8ef7]">{analysisId}</span></h2>
            <p className="mt-1 text-sm text-slate-400">Comprehensive pipeline output for protein target analysis</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/[0.06] transition-colors cursor-pointer">
            <FontAwesomeIcon icon={faXmark} className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 px-8 pt-4">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                tab === t.key ? "bg-[#1152d4]/15 text-white border border-[#1152d4]/25" : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] border border-transparent"
              }`}>
              <FontAwesomeIcon icon={t.icon} className={`w-3.5 h-3.5 ${tab === t.key ? "text-[#4d8ef7]" : ""}`} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-8">
          {tab === "csv" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">Top 10 rows — Genomic expression & binding scores</p>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-slate-400 hover:text-white transition-colors cursor-pointer">
                  <FontAwesomeIcon icon={faDownload} className="w-3 h-3" /> Export CSV
                </button>
              </div>
              <div className="rounded-xl border border-white/[0.06] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-white/[0.03]">
                        {csvHeaders.map(h => (
                          <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {csvRows.map((row, i) => (
                        <tr key={i} className="border-t border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                          {row.map((cell, j) => (
                            <td key={j} className={`px-4 py-2.5 whitespace-nowrap ${
                              j === 0 ? "font-mono font-semibold text-[#4d8ef7]" :
                              cell === "Active" ? "text-emerald-400" :
                              cell === "Inactive" ? "text-slate-500" : "text-slate-300"
                            }`}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {tab === "pdb" && (
            <div className="space-y-4">
              <p className="text-sm text-slate-400">3D protein structures analyzed in this pipeline run</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {proteins.map(p => (
                  <div key={p.pdb} className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden hover:border-white/[0.12] transition-all duration-300">
                    {/* 3D placeholder */}
                    <div className={`relative h-48 bg-gradient-to-br ${p.color} flex items-center justify-center`}>
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAyMCAwIEwgMCAwIDAgMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2dyaWQpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')] opacity-50" />
                      <FontAwesomeIcon icon={faAtom} className="w-16 h-16 text-white/20 group-hover:text-white/30 transition-colors group-hover:scale-110 transform duration-500" />
                      <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/40 backdrop-blur-sm text-[10px] font-mono text-white/70">{p.pdb}</div>
                    </div>
                    <div className="p-5 space-y-3">
                      <h4 className="font-semibold text-white">{p.name}</h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <FontAwesomeIcon icon={faWeightHanging} className="w-3 h-3 text-slate-500" /> {p.weight}
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <FontAwesomeIcon icon={faBolt} className="w-3 h-3 text-slate-500" /> {p.resolution}
                        </div>
                      </div>
                      <p className="text-xs text-slate-500">{p.chains} chain{p.chains > 1 ? "s" : ""}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "images" && (
            <div className="space-y-4">
              <p className="text-sm text-slate-400">Generated visual analytics from the AI pipeline</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {chartTitles.map((c, i) => (
                  <div key={i} className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden hover:border-white/[0.12] transition-all duration-300">
                    <div className={`relative h-40 bg-gradient-to-br ${c.gradient} flex items-center justify-center`}>
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAyMCAwIEwgMCAwIDAgMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2dyaWQpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')] opacity-50" />
                      <FontAwesomeIcon icon={faChartBar} className="w-12 h-12 text-white/20 group-hover:text-white/30 transition-colors" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-sm text-white">{c.title}</h4>
                      <p className="mt-1 text-xs text-slate-500">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
