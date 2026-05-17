"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCubes, faCrosshairs, faSliders, faSeedling,
  faHourglass, faBarsProgress, faFlask,
} from "@fortawesome/free-solid-svg-icons";

export default function LigandGenerate() {
  const [targetProtein, setTargetProtein] = useState("");
  const [numCandidates, setNumCandidates] = useState("50");
  const [bindingThreshold, setBindingThreshold] = useState("0.7");
  const [optimizeFor, setOptimizeFor] = useState("affinity");
  const [submitted, setSubmitted] = useState(false);
  const [estTime, setEstTime] = useState(22);

  useEffect(() => {
    if (!submitted) return;
    const iv = setInterval(() => setEstTime(t => (t > 1 ? t - 1 : t)), 60000);
    return () => clearInterval(iv);
  }, [submitted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetProtein.trim()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="relative w-full max-w-md">
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-emerald-500/15 blur-[80px]" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[#1152d4]/15 blur-[80px]" />
          <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-8 text-center space-y-6">
            <div className="relative mx-auto w-20 h-20">
              <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
              <div className="absolute inset-2 rounded-full bg-emerald-500/30 animate-pulse" />
              <div className="relative flex items-center justify-center w-full h-full rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                <FontAwesomeIcon icon={faCubes} className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Generation Queued</h3>
              <p className="mt-1 text-sm text-slate-400">Ligand candidates are being generated for <span className="text-emerald-400 font-medium">{targetProtein}</span>.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-4">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <FontAwesomeIcon icon={faBarsProgress} className="w-3.5 h-3.5 text-[#4d8ef7]" />
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Position</span>
                </div>
                <p className="text-2xl font-bold text-white">#2</p>
              </div>
              <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-4">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <FontAwesomeIcon icon={faHourglass} className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Est. Time</span>
                </div>
                <p className="text-2xl font-bold text-white">~{estTime} mins</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 animate-pulse" style={{ width: "25%" }} />
              </div>
              <p className="text-xs text-slate-500">Generating molecular structures...</p>
            </div>
            <button onClick={() => { setSubmitted(false); setTargetProtein(""); }}
              className="px-6 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-sm text-slate-300 hover:bg-white/[0.1] transition-all duration-200 cursor-pointer">
              Submit Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Generate Ligand Candidates</h2>
        <p className="mt-2 text-sm text-slate-400 leading-relaxed">Configure parameters for AI-driven ligand generation against a target protein.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="target-protein" className="flex items-center gap-2 text-sm font-medium text-slate-300">
            <FontAwesomeIcon icon={faCrosshairs} className="w-3.5 h-3.5 text-slate-500" />
            Target Protein
          </label>
          <input id="target-protein" type="text" value={targetProtein} onChange={e => setTargetProtein(e.target.value)} placeholder="e.g., FLT3, NPM1, DNMT3A"
            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#4d8ef7]/40 focus:ring-1 focus:ring-[#4d8ef7]/20 transition-all duration-200" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="num-candidates" className="flex items-center gap-2 text-sm font-medium text-slate-300">
              <FontAwesomeIcon icon={faSeedling} className="w-3.5 h-3.5 text-slate-500" />
              Number of Candidates
            </label>
            <input id="num-candidates" type="number" value={numCandidates} onChange={e => setNumCandidates(e.target.value)} min="10" max="200"
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white focus:outline-none focus:border-[#4d8ef7]/40 focus:ring-1 focus:ring-[#4d8ef7]/20 transition-all duration-200" />
          </div>
          <div className="space-y-2">
            <label htmlFor="binding-threshold" className="flex items-center gap-2 text-sm font-medium text-slate-300">
              <FontAwesomeIcon icon={faSliders} className="w-3.5 h-3.5 text-slate-500" />
              Binding Threshold
            </label>
            <input id="binding-threshold" type="number" step="0.05" value={bindingThreshold} onChange={e => setBindingThreshold(e.target.value)} min="0.1" max="1.0"
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white focus:outline-none focus:border-[#4d8ef7]/40 focus:ring-1 focus:ring-[#4d8ef7]/20 transition-all duration-200" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
            <FontAwesomeIcon icon={faFlask} className="w-3.5 h-3.5 text-slate-500" />
            Optimize For
          </label>
          <div className="grid grid-cols-3 gap-3">
            {["affinity", "selectivity", "druglikeness"].map(opt => (
              <button key={opt} type="button" onClick={() => setOptimizeFor(opt)}
                className={`py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 capitalize cursor-pointer ${
                  optimizeFor === opt
                    ? "bg-[#1152d4]/15 text-white border-[#1152d4]/30 shadow-[0_0_15px_rgba(17,82,212,0.1)]"
                    : "bg-white/[0.03] text-slate-400 border-white/[0.08] hover:bg-white/[0.06]"
                }`}>
                {opt}
              </button>
            ))}
          </div>
        </div>

        <button id="submit-generation" type="submit" disabled={!targetProtein.trim()}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-sm hover:shadow-[0_0_30px_rgba(16,185,129,0.35)] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer">
          Start Generation
        </button>
      </form>
    </div>
  );
}
