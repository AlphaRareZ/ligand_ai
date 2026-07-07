"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFlask, faUser, faLink, faDna, faHourglass,
  faBarsProgress, faSpinner, faTriangleExclamation,
  faFileCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

interface Props { onBack: () => void; }

interface QueueInfo {
  analysisId: string;
  positionInQueue: number;
  totalSeconds: number;
}

/**
 * Fetch the real filename from a URL by making a HEAD request
 * and reading the Content-Disposition header.
 */
async function fetchFilename(url: string): Promise<string | null> {
  if (!url.trim()) return null;
  try {
    const res = await fetch(url.trim(), { method: "HEAD" });
    const cd = res.headers.get("content-disposition");
    if (cd) {
      // Try filename*= (RFC 5987) first, then filename=
      const utf8Match = cd.match(/filename\*\s*=\s*(?:UTF-8''|utf-8'')(.+)/i);
      if (utf8Match) return decodeURIComponent(utf8Match[1].replace(/['"]/g, ""));
      const match = cd.match(/filename\s*=\s*"?([^";]+)"?/i);
      if (match) return match[1].trim();
    }
    // Fallback: derive from the final URL path
    const finalUrl = res.url || url.trim();
    const pathname = new URL(finalUrl).pathname;
    const segments = pathname.split("/").filter(Boolean);
    const last = segments[segments.length - 1];
    if (last && last.includes(".")) return decodeURIComponent(last.split("?")[0]);
    return null;
  } catch {
    return null;
  }
}

/**
 * Hook that fetches the filename from a URL with debouncing.
 */
function useFetchedFilename(url: string, delayMs = 600) {
  const [filename, setFilename] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!url.trim()) { setFilename(null); return; }

    let cancelled = false;
    setLoading(true);

    const timer = setTimeout(async () => {
      const name = await fetchFilename(url);
      if (!cancelled) {
        setFilename(name);
        setLoading(false);
      }
    }, delayMs);

    return () => { cancelled = true; clearTimeout(timer); };
  }, [url, delayMs]);

  return { filename, loading };
}

export default function TargetAnalyze({ onBack }: Props) {
  const [name, setName] = useState("");
  const [mappingUrl, setMappingUrl] = useState("");
  const [exonUrl, setExonUrl] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [queue, setQueue] = useState<QueueInfo | null>(null);

  // Countdown state (in seconds)
  const [remaining, setRemaining] = useState(0);
  const totalRef = useRef(0);

  // Fetch filenames from the provided URLs
  const mappingFile = useFetchedFilename(mappingUrl);
  const exonFile = useFetchedFilename(exonUrl);

  // ── Countdown timer ────────────────────────────────────────────
  useEffect(() => {
    if (!queue) return;
    const iv = setInterval(() => {
      setRemaining(r => (r > 0 ? r - 1 : 0));
    }, 1000);
    return () => clearInterval(iv);
  }, [queue]);

  // ── Format seconds → "Xm Ys" ──────────────────────────────────
  const formatTime = useCallback((secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    if (m > 0) return `${m}m ${s.toString().padStart(2, "0")}s`;
    return `${s}s`;
  }, []);

  // ── Progress percentage (0→100 as time elapses) ────────────────
  const progress = totalRef.current > 0
    ? Math.min(100, ((totalRef.current - remaining) / totalRef.current) * 100)
    : 0;

  // ── Submit handler ─────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !mappingUrl.trim() || !exonUrl.trim()) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_ANALYSIS_BASE_URL;
      const res = await fetch(`${baseUrl}/create`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          exonDataUrl: exonUrl.trim(),
          mappingDataUrl: mappingUrl.trim(),
        }),
      });

      const json = await res.json();

      if (!json.success) {
        setSubmitError(json.message || "Failed to create analysis.");
        setSubmitting(false);
        return;
      }

      const pos = (json.data.positionInQueue ?? 0) + 1;
      const estMinutes = 3.04 * pos;
      const estSeconds = Math.round(estMinutes * 60);

      totalRef.current = estSeconds;
      setRemaining(estSeconds);
      setQueue({
        analysisId: json.data.analysisId,
        positionInQueue: pos,
        totalSeconds: estSeconds,
      });
    } catch {
      setSubmitError("Failed to connect to the analysis service.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Reset ──────────────────────────────────────────────────────
  const handleReset = () => {
    setQueue(null);
    setRemaining(0);
    totalRef.current = 0;
    setName("");
    setMappingUrl("");
    setExonUrl("");
  };

  // ── Queued state ───────────────────────────────────────────────
  if (queue) {
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
              <p className="mt-1 text-[11px] font-mono text-slate-500">{queue.analysisId}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-4">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <FontAwesomeIcon icon={faBarsProgress} className="w-3.5 h-3.5 text-[#4d8ef7]" />
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Position</span>
                </div>
                <p className="text-2xl font-bold text-white">#{queue.positionInQueue}</p>
              </div>
              <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-4">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <FontAwesomeIcon icon={faHourglass} className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Est. Time</span>
                </div>
                <p className="text-2xl font-bold text-white font-mono">{formatTime(remaining)}</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#1152d4] to-[#4d8ef7] transition-all duration-1000 ease-linear"
                  style={{ width: `${Math.max(2, progress)}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>{remaining > 0 ? "Processing..." : "Finalizing..."}</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>

            <button onClick={handleReset}
              className="px-6 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-sm text-slate-300 hover:bg-white/[0.1] transition-all duration-200 cursor-pointer">
              Submit Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────
  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">New Target Analysis</h2>
        <p className="mt-2 text-sm text-slate-400 leading-relaxed">Submit a new protein target analysis. Provide patient data and reference files to initiate the AI pipeline.</p>
      </div>

      {submitError && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-rose-500/[0.08] border border-rose-500/20">
          <FontAwesomeIcon icon={faTriangleExclamation} className="w-4 h-4 text-rose-400 shrink-0" />
          <p className="text-sm text-rose-300">{submitError}</p>
        </div>
      )}

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
          {mappingFile.loading && mappingUrl.trim() && (
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faSpinner} className="w-3 h-3 text-slate-500 animate-spin" />
              <span className="text-xs text-slate-500">Fetching file info...</span>
            </div>
          )}
          {mappingFile.filename && !mappingFile.loading && (
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faFileCircleCheck} className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-medium text-emerald-400">{mappingFile.filename}</span>
            </div>
          )}
        </div>

        {/* Exon Data */}
        <div className="space-y-2">
          <label htmlFor="exon-url" className="flex items-center gap-2 text-sm font-medium text-slate-300">
            <FontAwesomeIcon icon={faDna} className="w-3.5 h-3.5 text-slate-500" />
            Exon Data File URL
          </label>
          <input id="exon-url" type="url" value={exonUrl} onChange={e => setExonUrl(e.target.value)} placeholder="https://storage.example.com/exon_data.csv"
            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#4d8ef7]/40 focus:ring-1 focus:ring-[#4d8ef7]/20 transition-all duration-200" />
          {exonFile.loading && exonUrl.trim() && (
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faSpinner} className="w-3 h-3 text-slate-500 animate-spin" />
              <span className="text-xs text-slate-500">Fetching file info...</span>
            </div>
          )}
          {exonFile.filename && !exonFile.loading && (
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faFileCircleCheck} className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-medium text-emerald-400">{exonFile.filename}</span>
            </div>
          )}
        </div>

        <button id="submit-analysis" type="submit" disabled={submitting || !name.trim() || !mappingUrl.trim() || !exonUrl.trim()}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#1152d4] to-[#2963d8] text-white font-semibold text-sm hover:shadow-[0_0_30px_rgba(17,82,212,0.35)] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer flex items-center justify-center gap-2">
          {submitting ? (
            <><FontAwesomeIcon icon={faSpinner} className="w-4 h-4 animate-spin" /> Submitting...</>
          ) : (
            "Submit Analysis"
          )}
        </button>
      </form>
    </div>
  );
}
