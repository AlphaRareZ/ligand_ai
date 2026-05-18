"use client";

import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass, faArrowsRotate, faSpinner,
  faTriangleExclamation, faAtom, faFlask,
  faChevronLeft, faChevronRight, faCircleCheck,
  faCubes,
} from "@fortawesome/free-solid-svg-icons";

/* ─── Types ──────────────────────────────────────────────────────── */

interface Protein {
  id: number;
  name: string;
  structureUrl: string;
  createdAt: string;
  top10AdvancedSaveLigandsImgUrl: string | null;
  top10AdvancedSaveLigandsCsvUrl: string | null;
  ligands: unknown[] | null;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: Protein[];
}

interface CreateResponse {
  success: boolean;
  message: string;
}

/* ─── Main Component ─────────────────────────────────────────────── */

export default function LigandGenerate() {
  const [proteins, setProteins] = useState<Protein[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);

  /* Track per-row generation state: "idle" | "generating" | "success" | "error" */
  const [genState, setGenState] = useState<Record<number, "idle" | "generating" | "success" | "error">>({});
  const [genError, setGenError] = useState<Record<number, string>>({});

  const fetchProteins = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_LIGAND_BASE_URL;
      const res = await fetch(
        `${baseUrl}/getproteinswithnoligands?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        { credentials: "include" },
      );
      const json: ApiResponse = await res.json();
      if (!json.success) {
        setErrorMsg(json.message);
        setProteins([]);
        return;
      }
      setProteins(json.data ?? []);
    } catch {
      setErrorMsg("Failed to connect to the ligand service. Please try again later.");
      setProteins([]);
    } finally {
      setLoading(false);
    }
  }, [pageNumber, pageSize]);

  useEffect(() => { fetchProteins(); }, [fetchProteins]);

  /* ── Generate ligands for a protein ─────────────────────────────── */
  const handleGenerate = async (protein: Protein) => {
    const proteinId = protein.id;
    const proteinName = protein.name.replace(/\.pdb$/i, "");

    setGenState(prev => ({ ...prev, [proteinId]: "generating" }));
    setGenError(prev => {
      const next = { ...prev };
      delete next[proteinId];
      return next;
    });

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_LIGAND_BASE_URL;
      const res = await fetch(`${baseUrl}/create`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proteinAccessions: {
            [String(proteinId)]: proteinName,
          },
        }),
      });

      const json: CreateResponse = await res.json();

      if (!json.success) {
        setGenState(prev => ({ ...prev, [proteinId]: "error" }));
        setGenError(prev => ({ ...prev, [proteinId]: json.message }));
        return;
      }

      setGenState(prev => ({ ...prev, [proteinId]: "success" }));
    } catch {
      setGenState(prev => ({ ...prev, [proteinId]: "error" }));
      setGenError(prev => ({ ...prev, [proteinId]: "Network error. Please try again." }));
    }
  };

  /* Filter by search */
  const filtered = search.trim()
    ? proteins.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || String(p.id).includes(search))
    : proteins;

  /* ── Error state ────────────────────────────────────────────────── */
  if (!loading && errorMsg) {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Generate Ligand Candidates</h2>
          <p className="mt-2 text-sm text-slate-400 max-w-xl leading-relaxed">Select a protein target to generate ligand candidates using the AI pipeline.</p>
        </div>
        <div className="flex flex-col items-center justify-center py-16 rounded-2xl border border-rose-500/20 bg-rose-500/[0.04]">
          <FontAwesomeIcon icon={faTriangleExclamation} className="w-10 h-10 text-rose-400 mb-4" />
          <p className="text-sm text-rose-300 max-w-md text-center">{errorMsg}</p>
          <button onClick={fetchProteins}
            className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-sm text-slate-300 hover:bg-white/[0.1] transition-all duration-200 cursor-pointer">
            <FontAwesomeIcon icon={faArrowsRotate} className="w-3.5 h-3.5" /> Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Generate Ligand Candidates</h2>
        <p className="mt-2 text-sm text-slate-400 max-w-xl leading-relaxed">Proteins without ligands are listed below. Click &quot;Generate&quot; to start AI-driven ligand generation for a target protein.</p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px] max-w-sm">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
          <input id="search-ligand-generate" type="text" placeholder="Search proteins..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#4d8ef7]/40 focus:ring-1 focus:ring-[#4d8ef7]/20 transition-all duration-200" />
        </div>
        <button onClick={fetchProteins} disabled={loading}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-slate-300 hover:bg-white/[0.06] transition-all duration-200 cursor-pointer disabled:opacity-50">
          <FontAwesomeIcon icon={faArrowsRotate} className={`w-3.5 h-3.5 text-slate-500 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <FontAwesomeIcon icon={faSpinner} className="w-8 h-8 text-[#4d8ef7] animate-spin mb-4" />
          <p className="text-sm text-slate-500">Loading proteins...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
          <FontAwesomeIcon icon={faCubes} className="w-10 h-10 text-slate-600 mb-4" />
          <p className="text-sm text-slate-500">No proteins without ligands found.</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Protein Name</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Protein ID</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Created At</th>
                  <th className="text-right px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((protein, i) => {
                  const state = genState[protein.id] ?? "idle";
                  return (
                    <tr key={protein.id} className={`border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors ${i === filtered.length - 1 ? "border-b-0" : ""}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20">
                            <FontAwesomeIcon icon={faAtom} className="w-3.5 h-3.5 text-violet-400" />
                          </div>
                          <span className="font-semibold text-white">{protein.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-xs text-slate-400">{protein.id}</span>
                      </td>
                      <td className="px-6 py-4 text-slate-400">
                        {new Date(protein.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {state === "error" && (
                            <span className="text-[11px] text-rose-400 max-w-[160px] truncate" title={genError[protein.id]}>
                              {genError[protein.id]}
                            </span>
                          )}
                          {state === "success" ? (
                            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20">
                              <FontAwesomeIcon icon={faCircleCheck} className="w-3 h-3" /> Queued
                            </span>
                          ) : (
                            <button
                              id={`generate-${protein.id}`}
                              onClick={() => handleGenerate(protein)}
                              disabled={state === "generating"}
                              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                                state === "generating"
                                  ? "bg-white/[0.06] text-slate-400 cursor-wait"
                                  : "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                              }`}
                            >
                              <FontAwesomeIcon icon={state === "generating" ? faSpinner : faFlask} className={`w-3 h-3 ${state === "generating" ? "animate-spin" : ""}`} />
                              {state === "generating" ? "Generating..." : "Generate"}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {!loading && (
        <div className="flex items-center justify-center gap-3 pt-2">
          <button onClick={() => setPageNumber(p => Math.max(1, p - 1))} disabled={pageNumber <= 1}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-slate-300 hover:bg-white/[0.06] transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed">
            <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3" /> Previous
          </button>
          <span className="px-4 py-2 rounded-xl bg-[#1152d4]/10 border border-[#1152d4]/20 text-sm font-semibold text-[#4d8ef7]">
            Page {pageNumber}
          </span>
          <button onClick={() => setPageNumber(p => p + 1)} disabled={proteins.length < pageSize}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-slate-300 hover:bg-white/[0.06] transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed">
            Next <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}
