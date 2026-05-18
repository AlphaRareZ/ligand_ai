"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass, faArrowsRotate, faSpinner,
  faTriangleExclamation, faChevronDown, faChevronUp,
  faAtom, faDownload, faCubes, faLink,
  faExpand, faXmark, faChevronLeft, faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

/* ─── Types ──────────────────────────────────────────────────────── */

interface Ligand {
  id: number;
  name: string;
  pdbUrl: string;
  sdfUrl: string;
  proteinId: number;
}

interface Protein {
  id: number;
  name: string;
  structureUrl: string;
  createdAt: string;
  top10AdvancedSaveLigandsImgUrl: string | null;
  top10AdvancedSaveLigandsCsvUrl: string | null;
  ligands: Ligand[] | null;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: Protein[];
}

/* ─── Helpers ────────────────────────────────────────────────────── */

async function downloadFile(url: string, filename: string) {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  } catch {
    window.open(url, "_blank");
  }
}

/* ─── PdbViewer (3Dmol.js) ───────────────────────────────────────── */

function PdbViewer({ url, onClose }: { url: string; onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      try {
        if (!(window as unknown as Record<string, unknown>).$3Dmol) {
          await new Promise<void>((resolve, reject) => {
            const s = document.createElement("script");
            s.src = "https://cdn.jsdelivr.net/npm/3dmol@2.4.2/build/3Dmol-min.js";
            s.onload = () => resolve();
            s.onerror = () => reject(new Error("Failed to load 3Dmol.js"));
            document.head.appendChild(s);
          });
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch PDB file");
        const pdbData = await res.text();

        if (cancelled || !containerRef.current) return;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const $3Dmol = (window as any).$3Dmol;
        const viewer = $3Dmol.createViewer(containerRef.current, {
          backgroundColor: "#0a0f1a",
        });
        viewer.addModel(pdbData, "pdb");
        viewer.setStyle({}, { cartoon: { color: "spectrum" } });
        viewer.zoomTo();
        viewer.render();
        viewer.zoom(1.1, 1000);
        setIsLoading(false);
      } catch (err: unknown) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load viewer");
        setIsLoading(false);
      }
    };

    init();
    return () => { cancelled = true; };
  }, [url]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-5xl h-[80vh] mx-4 rounded-2xl border border-white/[0.08] bg-[#0a0f1a] overflow-hidden shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-6 py-3 border-b border-white/[0.06] bg-[#0b1120] shrink-0">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faAtom} className="w-4 h-4 text-[#4d8ef7]" />
            <span className="text-sm font-semibold text-white">{url.split("/").pop()}</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => downloadFile(url, url.split("/").pop() || "structure.pdb")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-slate-300 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer">
              <FontAwesomeIcon icon={faDownload} className="w-3 h-3" /> Download PDB
            </button>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/[0.06] transition-colors cursor-pointer">
              <FontAwesomeIcon icon={faXmark} className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>
        <div className="relative flex-1">
          {isLoading && !error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
              <FontAwesomeIcon icon={faSpinner} className="w-8 h-8 text-[#4d8ef7] animate-spin mb-3" />
              <p className="text-sm text-slate-500">Loading 3D structure...</p>
            </div>
          )}
          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
              <FontAwesomeIcon icon={faTriangleExclamation} className="w-8 h-8 text-rose-400 mb-3" />
              <p className="text-sm text-rose-300">{error}</p>
            </div>
          )}
          <div ref={containerRef} className="w-full h-full" style={{ position: "relative" }} />
        </div>
      </div>
    </div>
  );
}

/* ─── ProteinCard ────────────────────────────────────────────────── */

const gradients = [
  "from-blue-500/20 to-cyan-500/20", "from-violet-500/20 to-purple-500/20",
  "from-emerald-500/20 to-teal-500/20", "from-rose-500/20 to-pink-500/20",
  "from-amber-500/20 to-orange-500/20", "from-sky-500/20 to-indigo-500/20",
];

function ProteinCard({ protein, index, onView3D }: { protein: Protein; index: number; onView3D: (url: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const ligands = protein.ligands ?? [];

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden hover:border-white/[0.12] transition-all duration-300">
      {/* Protein header */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${gradients[index % gradients.length]} border border-white/[0.08]`}>
            <FontAwesomeIcon icon={faAtom} className="w-5 h-5 text-white/60" />
          </div>
          <div>
            <h3 className="font-semibold text-white">{protein.name}</h3>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs text-slate-500">ID: {protein.id}</span>
              <span className="text-xs text-slate-500">
                {new Date(protein.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                <FontAwesomeIcon icon={faCubes} className="w-2.5 h-2.5" />
                {ligands.length} ligand{ligands.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => onView3D(protein.structureUrl)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1152d4]/15 border border-[#1152d4]/25 text-xs font-semibold text-[#4d8ef7] hover:bg-[#1152d4]/25 transition-all duration-200 cursor-pointer">
            <FontAwesomeIcon icon={faExpand} className="w-3 h-3" /> View 3D
          </button>
          <button onClick={() => downloadFile(protein.structureUrl, protein.name)}
            className="p-2 rounded-lg hover:bg-white/[0.06] transition-colors cursor-pointer" title="Download PDB">
            <FontAwesomeIcon icon={faDownload} className="w-3.5 h-3.5 text-slate-400" />
          </button>
          {ligands.length > 0 && (
            <button onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-slate-300 hover:bg-white/[0.06] transition-all duration-200 cursor-pointer">
              <span>{expanded ? "Hide" : "Show"} Ligands</span>
              <FontAwesomeIcon icon={expanded ? faChevronUp : faChevronDown} className="w-2.5 h-2.5" />
            </button>
          )}
        </div>
      </div>

      {/* Top-10 image + csv links */}
      {(protein.top10AdvancedSaveLigandsImgUrl || protein.top10AdvancedSaveLigandsCsvUrl) && (
        <div className="px-6 pb-3 flex items-center gap-3">
          {protein.top10AdvancedSaveLigandsImgUrl && (
            <button onClick={() => downloadFile(protein.top10AdvancedSaveLigandsImgUrl!, protein.name.replace(".pdb", "_top10.png"))}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[11px] text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer">
              <FontAwesomeIcon icon={faDownload} className="w-2.5 h-2.5" /> Top 10 Image
            </button>
          )}
          {protein.top10AdvancedSaveLigandsCsvUrl && (
            <button onClick={() => downloadFile(protein.top10AdvancedSaveLigandsCsvUrl!, protein.name.replace(".pdb", "_top10.csv"))}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[11px] text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer">
              <FontAwesomeIcon icon={faDownload} className="w-2.5 h-2.5" /> Top 10 CSV
            </button>
          )}
        </div>
      )}

      {/* Ligands expandable */}
      {expanded && ligands.length > 0 && (
        <div className="border-t border-white/[0.04]">
          <div className="px-6 py-3 bg-white/[0.01]">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-3">Generated Ligands</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {ligands.map(lig => (
                <div key={lig.id} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 hover:border-white/[0.12] transition-all duration-200">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20">
                      <FontAwesomeIcon icon={faCubes} className="w-3 h-3 text-violet-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{lig.name}</p>
                      <p className="text-[10px] text-slate-500">ID: {lig.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => downloadFile(lig.pdbUrl, `${lig.name}.pdb`)}
                      className="flex-1 flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[11px] font-medium text-slate-300 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer">
                      <FontAwesomeIcon icon={faDownload} className="w-2.5 h-2.5" /> PDB
                    </button>
                    <button onClick={() => downloadFile(lig.sdfUrl, `${lig.name}.sdf`)}
                      className="flex-1 flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[11px] font-medium text-slate-300 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer">
                      <FontAwesomeIcon icon={faDownload} className="w-2.5 h-2.5" /> SDF
                    </button>
                    <button onClick={() => onView3D(lig.pdbUrl)}
                      className="px-2.5 py-1.5 rounded-lg bg-[#1152d4]/10 border border-[#1152d4]/20 text-[11px] font-medium text-[#4d8ef7] hover:bg-[#1152d4]/20 transition-all cursor-pointer" title="View ligand in 3D">
                      <FontAwesomeIcon icon={faExpand} className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────── */

export default function LigandHistory() {
  const [proteins, setProteins] = useState<Protein[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [pdbViewerUrl, setPdbViewerUrl] = useState<string | null>(null);

  const fetchProteins = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_LIGAND_BASE_URL;
      const res = await fetch(
        `${baseUrl}/getproteinswithligands?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        { credentials: "include", headers: { "Content-Type": "application/json" } },
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

  /* Filter by search */
  const filtered = search.trim()
    ? proteins.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || String(p.id).includes(search))
    : proteins;

  /* ── Error state ────────────────────────────────────────────────── */
  if (!loading && errorMsg) {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Ligand Generation History</h2>
          <p className="mt-2 text-sm text-slate-400 max-w-xl leading-relaxed">Browse proteins with generated ligand candidates.</p>
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
    <>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Ligand Generation History</h2>
          <p className="mt-2 text-sm text-slate-400 max-w-xl leading-relaxed">Browse proteins with generated ligand candidates. Expand each protein to view and download ligands.</p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px] max-w-sm">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input id="search-ligand-history" type="text" placeholder="Search proteins..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#4d8ef7]/40 focus:ring-1 focus:ring-[#4d8ef7]/20 transition-all duration-200" />
          </div>
          <button onClick={fetchProteins} disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-slate-300 hover:bg-white/[0.06] transition-all duration-200 cursor-pointer disabled:opacity-50">
            <FontAwesomeIcon icon={faArrowsRotate} className={`w-3.5 h-3.5 text-slate-500 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FontAwesomeIcon icon={faSpinner} className="w-8 h-8 text-[#4d8ef7] animate-spin mb-4" />
            <p className="text-sm text-slate-500">Loading proteins with ligands...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            <FontAwesomeIcon icon={faCubes} className="w-10 h-10 text-slate-600 mb-4" />
            <p className="text-sm text-slate-500">No proteins with ligands found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((protein, i) => (
              <ProteinCard key={protein.id} protein={protein} index={i} onView3D={(url) => setPdbViewerUrl(url)} />
            ))}
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

      {/* PDB 3D Viewer Modal */}
      {pdbViewerUrl && <PdbViewer url={pdbViewerUrl} onClose={() => setPdbViewerUrl(null)} />}
    </>
  );
}
