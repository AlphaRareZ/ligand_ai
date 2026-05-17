"use client";

import React, { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass, faCalendarDays, faFilter,
  faArrowUpLong, faArrowDownLong, faCircleCheck,
  faSpinner, faCircleXmark, faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

type AnalysisStatus = "Completed" | "Processing" | "Failed";
type SortDir = "asc" | "desc";

interface Row { id: string; date: string; status: AnalysisStatus; metadata: string; }

const mockData: Row[] = [
  { id: "AN-12345", date: "Oct 26, 2023 10:30 AM", status: "Completed", metadata: "3 proteins, 100 ligands" },
  { id: "AN-12346", date: "Oct 26, 2023 10:30 AM", status: "Completed", metadata: "3 proteins, 100 ligands" },
  { id: "AN-12347", date: "Oct 26, 2023 10:30 AM", status: "Processing", metadata: "3 proteins, 100 ligands" },
  { id: "AN-12348", date: "Oct 26, 2023 10:30 AM", status: "Completed", metadata: "3 proteins, 100 ligands" },
  { id: "AN-12349", date: "Oct 26, 2023 10:30 AM", status: "Failed", metadata: "3 proteins, 100 ligands" },
];

function StatusBadge({ status }: { status: AnalysisStatus }) {
  const cfg = {
    Completed: { icon: faCircleCheck, cls: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
    Processing: { icon: faSpinner, cls: "text-sky-400 bg-sky-400/10 border-sky-400/20" },
    Failed: { icon: faCircleXmark, cls: "text-rose-400 bg-rose-400/10 border-rose-400/20" },
  }[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${cfg.cls}`}>
      <FontAwesomeIcon icon={cfg.icon} className={`w-3 h-3 ${status === "Processing" ? "animate-spin" : ""}`} />
      {status}
    </span>
  );
}

interface Props { onViewResults: (id: string) => void; }

export default function TargetHistory({ onViewResults }: Props) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | AnalysisStatus>("All");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [showDate, setShowDate] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [dateRange, setDateRange] = useState("All Time");

  const filtered = useMemo(() => {
    let d = [...mockData];
    if (search.trim()) d = d.filter(r => r.id.toLowerCase().includes(search.toLowerCase()) || r.metadata.toLowerCase().includes(search.toLowerCase()));
    if (statusFilter !== "All") d = d.filter(r => r.status === statusFilter);
    d.sort((a, b) => sortDir === "asc" ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id));
    return d;
  }, [search, statusFilter, sortDir]);

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

        {/* Date Range */}
        <div className="relative">
          <button id="date-range-filter" onClick={() => { setShowDate(!showDate); setShowStatus(false); }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-slate-300 hover:bg-white/[0.06] transition-all duration-200 cursor-pointer">
            <FontAwesomeIcon icon={faCalendarDays} className="w-3.5 h-3.5 text-slate-500" />
            <span>{dateRange}</span>
            <FontAwesomeIcon icon={faChevronDown} className="w-2.5 h-2.5 text-slate-500" />
          </button>
          {showDate && (
            <div className="absolute top-full mt-2 right-0 w-44 rounded-xl bg-[#141c2f] border border-white/[0.08] shadow-2xl z-50 py-1.5">
              {["All Time", "Last 7 Days", "Last 30 Days", "Last 90 Days"].map(r => (
                <button key={r} onClick={() => { setDateRange(r); setShowDate(false); }}
                  className={`w-full text-left px-4 py-2 text-sm cursor-pointer ${dateRange === r ? "text-[#4d8ef7] bg-[#1152d4]/10" : "text-slate-400 hover:text-white hover:bg-white/[0.04]"}`}>{r}</button>
              ))}
            </div>
          )}
        </div>

        {/* Status */}
        <div className="relative">
          <button id="status-filter" onClick={() => { setShowStatus(!showStatus); setShowDate(false); }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-slate-300 hover:bg-white/[0.06] transition-all duration-200 cursor-pointer">
            <FontAwesomeIcon icon={faFilter} className="w-3.5 h-3.5 text-slate-500" />
            <span>Status: {statusFilter}</span>
            <FontAwesomeIcon icon={faChevronDown} className="w-2.5 h-2.5 text-slate-500" />
          </button>
          {showStatus && (
            <div className="absolute top-full mt-2 right-0 w-40 rounded-xl bg-[#141c2f] border border-white/[0.08] shadow-2xl z-50 py-1.5">
              {(["All", "Completed", "Processing", "Failed"] as const).map(s => (
                <button key={s} onClick={() => { setStatusFilter(s); setShowStatus(false); }}
                  className={`w-full text-left px-4 py-2 text-sm cursor-pointer ${statusFilter === s ? "text-[#4d8ef7] bg-[#1152d4]/10" : "text-slate-400 hover:text-white hover:bg-white/[0.04]"}`}>{s}</button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <button onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")} className="flex items-center gap-2 hover:text-slate-300 transition-colors cursor-pointer">
                    Analysis ID <FontAwesomeIcon icon={sortDir === "asc" ? faArrowUpLong : faArrowDownLong} className="w-2.5 h-2.5 text-[#4d8ef7]" />
                  </button>
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Date/Time</th>
                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Metadata</th>
                <th className="text-right px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <tr key={row.id} className={`border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors ${i === filtered.length - 1 ? "border-b-0" : ""}`}>
                  <td className="px-6 py-4"><span className="font-mono font-semibold text-white">{row.id}</span></td>
                  <td className="px-6 py-4 text-slate-400">{row.date}</td>
                  <td className="px-6 py-4"><StatusBadge status={row.status} /></td>
                  <td className="px-6 py-4 text-slate-400">{row.metadata}</td>
                  <td className="px-6 py-4 text-right">
                    <button id={`view-results-${row.id}`} onClick={() => onViewResults(row.id)}
                      className="px-4 py-2 rounded-lg bg-[#1152d4] text-white text-xs font-semibold hover:bg-[#2963d8] hover:shadow-[0_0_20px_rgba(17,82,212,0.3)] transition-all duration-200 cursor-pointer">
                      View Results
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-500">No analyses found matching your criteria.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
