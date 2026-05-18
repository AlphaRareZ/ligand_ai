"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass, faFilter,
  faArrowUpLong, faArrowDownLong, faCircleCheck,
  faSpinner, faCircleXmark, faChevronDown,
  faClockRotateLeft, faTriangleExclamation,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";

/* ─── Types ──────────────────────────────────────────────────────── */

type AnalysisStatus = "ToDo" | "Pending" | "Completed";

interface Analysis {
  id: string;
  userID: string;
  name: string;
  status: AnalysisStatus;
  createdAt: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: { analyses: Analysis[] };
}

/* ─── StatusBadge ────────────────────────────────────────────────── */

function StatusBadge({ status }: { status: AnalysisStatus }) {
  const cfg: Record<AnalysisStatus, { icon: typeof faCircleCheck; cls: string }> = {
    Completed: { icon: faCircleCheck, cls: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
    Pending:   { icon: faSpinner,     cls: "text-sky-400 bg-sky-400/10 border-sky-400/20" },
    ToDo:      { icon: faClockRotateLeft, cls: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
  };
  const c = cfg[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${c.cls}`}>
      <FontAwesomeIcon icon={c.icon} className={`w-3 h-3 ${status === "Pending" ? "animate-spin" : ""}`} />
      {status}
    </span>
  );
}

/* ─── Component ──────────────────────────────────────────────────── */

interface Props { onViewResults: (id: string) => void; }

export default function TargetHistory({ onViewResults }: Props) {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | AnalysisStatus>("All");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [showStatus, setShowStatus] = useState(false);

  /* ── Fetch analyses ─────────────────────────────────────────────── */
  const fetchAnalyses = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_ANALYSIS_BASE_URL;

      const res = await fetch(`${baseUrl}/getAll`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json: ApiResponse = await res.json();

      if (!json.success) {
        setErrorMsg(json.message);
        setAnalyses([]);
        return;
      }

      setAnalyses(json.data?.analyses ?? []);
    } catch (err) {
      setErrorMsg("Failed to connect to the analysis service. Please try again later.");
      setAnalyses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAnalyses(); }, [fetchAnalyses]);

  /* ── Filter & sort ──────────────────────────────────────────────── */
  const filtered = useMemo(() => {
    let d = [...analyses];
    if (search.trim()) {
      const q = search.toLowerCase();
      d = d.filter(r => r.name.toLowerCase().includes(q) || r.id.toLowerCase().includes(q));
    }
    if (statusFilter !== "All") d = d.filter(r => r.status === statusFilter);
    d.sort((a, b) => sortDir === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
    return d;
  }, [analyses, search, statusFilter, sortDir]);

  /* ── Error state ────────────────────────────────────────────────── */
  if (!loading && errorMsg) {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Analysis History Overview</h2>
          <p className="mt-2 text-sm text-slate-400 max-w-xl leading-relaxed">AI-driven drug discovery platform for AML research. View a list of previous protein analyses.</p>
        </div>

        <div className="flex flex-col items-center justify-center py-16 rounded-2xl border border-rose-500/20 bg-rose-500/[0.04]">
          <FontAwesomeIcon icon={faTriangleExclamation} className="w-10 h-10 text-rose-400 mb-4" />
          <p className="text-sm text-rose-300 max-w-md text-center">{errorMsg}</p>
          <button onClick={fetchAnalyses}
            className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-sm text-slate-300 hover:bg-white/[0.1] transition-all duration-200 cursor-pointer">
            <FontAwesomeIcon icon={faArrowsRotate} className="w-3.5 h-3.5" /> Retry
          </button>
        </div>
      </div>
    );
  }

  /* ── Main render ────────────────────────────────────────────────── */
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Analysis History Overview</h2>
        <p className="mt-2 text-sm text-slate-400 max-w-xl leading-relaxed">AI-driven drug discovery platform for AML research. View a list of previous protein analyses.</p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px] max-w-sm">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
          <input id="search-analyses" type="text" placeholder="Search analyses..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#4d8ef7]/40 focus:ring-1 focus:ring-[#4d8ef7]/20 transition-all duration-200" />
        </div>

        {/* Status */}
        <div className="relative">
          <button id="status-filter" onClick={() => setShowStatus(!showStatus)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-slate-300 hover:bg-white/[0.06] transition-all duration-200 cursor-pointer">
            <FontAwesomeIcon icon={faFilter} className="w-3.5 h-3.5 text-slate-500" />
            <span>Status: {statusFilter}</span>
            <FontAwesomeIcon icon={faChevronDown} className="w-2.5 h-2.5 text-slate-500" />
          </button>
          {showStatus && (
            <div className="absolute top-full mt-2 right-0 w-40 rounded-xl bg-[#141c2f] border border-white/[0.08] shadow-2xl z-50 py-1.5">
              {(["All", "ToDo", "Pending", "Completed"] as const).map(s => (
                <button key={s} onClick={() => { setStatusFilter(s); setShowStatus(false); }}
                  className={`w-full text-left px-4 py-2 text-sm cursor-pointer ${statusFilter === s ? "text-[#4d8ef7] bg-[#1152d4]/10" : "text-slate-400 hover:text-white hover:bg-white/[0.04]"}`}>{s}</button>
              ))}
            </div>
          )}
        </div>

        {/* Refresh */}
        <button onClick={fetchAnalyses} disabled={loading}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-slate-300 hover:bg-white/[0.06] transition-all duration-200 cursor-pointer disabled:opacity-50">
          <FontAwesomeIcon icon={faArrowsRotate} className={`w-3.5 h-3.5 text-slate-500 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <button onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")} className="flex items-center gap-2 hover:text-slate-300 transition-colors cursor-pointer">
                    Analysis Name <FontAwesomeIcon icon={sortDir === "asc" ? faArrowUpLong : faArrowDownLong} className="w-2.5 h-2.5 text-[#4d8ef7]" />
                  </button>
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Analysis ID</th>
                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Created At</th>
                <th className="text-right px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <FontAwesomeIcon icon={faSpinner} className="w-6 h-6 text-[#4d8ef7] animate-spin mb-3" />
                    <p className="text-sm text-slate-500">Loading analyses...</p>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">No analyses found matching your criteria.</td>
                </tr>
              ) : (
                filtered.map((row, i) => (
                  <tr key={row.id} className={`border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors ${i === filtered.length - 1 ? "border-b-0" : ""}`}>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-white">{row.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs text-slate-400">{row.id}</span>
                    </td>
                    <td className="px-6 py-4"><StatusBadge status={row.status} /></td>
                    <td className="px-6 py-4 text-slate-400">{new Date(row.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</td>
                    <td className="px-6 py-4 text-right">
                      <button id={`view-results-${row.id}`} onClick={() => onViewResults(row.id)}
                        disabled={row.status !== "Completed"}
                        className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                          row.status === "Completed"
                            ? "bg-[#1152d4] text-white hover:bg-[#2963d8] hover:shadow-[0_0_20px_rgba(17,82,212,0.3)] cursor-pointer"
                            : "bg-white/[0.06] text-slate-500 cursor-not-allowed"
                        }`}>
                        View Results
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
