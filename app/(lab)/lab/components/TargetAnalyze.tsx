"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlask, faUser, faLink, faDna, faHourglass, faBarsProgress } from "@fortawesome/free-solid-svg-icons";

interface Props { onBack: () => void; }

export default function TargetAnalyze({ onBack }: Props) {
  const [name, setName] = useState("");
  const [mappingUrl, setMappingUrl] = useState("");
  const [exonUrl, setExonUrl] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [estTime, setEstTime] = useState(14);

  useEffect(() => {
    if (!submitted) return;
    const iv = setInterval(() => {
      setEstTime(t => (t > 1 ? t - 1 : t));
    }, 60000);
    return () => clearInterval(iv);
  }, [submitted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !mappingUrl.trim() || !exonUrl.trim()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="relative w-full max-w-md">
          {/* Glow orbs */}
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#1152d4]/15 blur-[80px]" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-emerald-500/10 blur-[80px]" />

          <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-8 text-center space-y-6">
            {/* Pulsing animation */}
            <div className="relative mx-auto w-20 h-20">
              <div className="absolute inset-0 rounded-full bg-[#1152d4]/20 animate-ping" />
              <div className="absolute inset-2 rounded-full bg-[#1152d4]/30 animate-pulse" />
              <div className="relative flex items-center justify-center w-full h-full rounded-full bg-gradient-to-br from-[#1152d4] to-[#0a3a9e] shadow-[0_0_30px_rgba(17,82,212,0.4)]">
                <FontAwesomeIcon icon={faFlask} className="w-8 h-8 text-white" />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">Analysis Queued</h3>
              <p className="mt-1 text-sm text-slate-400">Your analysis has been submitted to the processing pipeline.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-4">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <FontAwesomeIcon icon={faBarsProgress} className="w-3.5 h-3.5 text-[#4d8ef7]" />
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Position</span>
                </div>
                <p className="text-2xl font-bold text-white">#4</p>
              </div>
              <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-4">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <FontAwesomeIcon icon={faHourglass} className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Est. Time</span>
                </div>
                <p className="text-2xl font-bold text-white">~{estTime} mins</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[#1152d4] to-[#4d8ef7] animate-pulse" style={{ width: "15%" }} />
              </div>
              <p className="text-xs text-slate-500">Initializing analysis pipeline...</p>
            </div>

            <button onClick={() => { setSubmitted(false); setName(""); setMappingUrl(""); setExonUrl(""); }}
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
        <h2 className="text-2xl font-bold text-white tracking-tight">New Target Analysis</h2>
        <p className="mt-2 text-sm text-slate-400 leading-relaxed">Submit a new protein target analysis. Provide patient data and reference files to initiate the AI pipeline.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Analysis Name */}
        <div className="space-y-2">
          <label htmlFor="analysis-name" className="flex items-center gap-2 text-sm font-medium text-slate-300">
            <FontAwesomeIcon icon={faUser} className="w-3.5 h-3.5 text-slate-500" />
            Analysis Name or Patient Name
          </label>
          <input id="analysis-name" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Patient-AML-042"
            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#4d8ef7]/40 focus:ring-1 focus:ring-[#4d8ef7]/20 transition-all duration-200" />
        </div>

        {/* Mapping Data */}
        <div className="space-y-2">
          <label htmlFor="mapping-url" className="flex items-center gap-2 text-sm font-medium text-slate-300">
            <FontAwesomeIcon icon={faLink} className="w-3.5 h-3.5 text-slate-500" />
            Mapping Data File URL
          </label>
          <input id="mapping-url" type="url" value={mappingUrl} onChange={e => setMappingUrl(e.target.value)} placeholder="https://storage.example.com/mapping_data.csv"
            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#4d8ef7]/40 focus:ring-1 focus:ring-[#4d8ef7]/20 transition-all duration-200" />
        </div>

        {/* Exon Data */}
        <div className="space-y-2">
          <label htmlFor="exon-url" className="flex items-center gap-2 text-sm font-medium text-slate-300">
            <FontAwesomeIcon icon={faDna} className="w-3.5 h-3.5 text-slate-500" />
            Exon Data File URL
          </label>
          <input id="exon-url" type="url" value={exonUrl} onChange={e => setExonUrl(e.target.value)} placeholder="https://storage.example.com/exon_data.csv"
            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#4d8ef7]/40 focus:ring-1 focus:ring-[#4d8ef7]/20 transition-all duration-200" />
        </div>

        <button id="submit-analysis" type="submit" disabled={!name.trim() || !mappingUrl.trim() || !exonUrl.trim()}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#1152d4] to-[#2963d8] text-white font-semibold text-sm hover:shadow-[0_0_30px_rgba(17,82,212,0.35)] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer">
          Submit Analysis
        </button>
      </form>
    </div>
  );
}
