"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark, faTable, faCubes, faImage,
  faAtom, faDownload, faSpinner,
  faTriangleExclamation, faArrowsRotate,
  faExpand, faLink, faFileZipper, faArrowLeft
} from "@fortawesome/free-solid-svg-icons";

/* ─── Types ──────────────────────────────────────────────────────── */

interface Protein {
  id: number;
  name: string;
  structureUrl: string;
  top10AdvancedSaveLigandsImgUrl: string | null;
  top10AdvancedSaveLigandsCsvUrl: string | null;
  ligands: unknown[] | null;
}

interface AnalysisFile {
  id: number;
  fileName: string;
  fileUrl: string;
  type: "Csv" | "Png" | string;
}

interface AnalysisDetail {
  id: string;
  userID: string;
  name: string;
  status: string;
  createdAt: string;
  proteins: Protein[];
  files: AnalysisFile[];
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: AnalysisDetail;
}

/* ─── Helpers ────────────────────────────────────────────────────── */

/**
 * Route external file fetches through the Next.js server-side proxy to avoid
 * CORS errors when the browser would otherwise request S3 / blob URLs directly.
 */
function proxyUrl(externalUrl: string): string {
  return `/api/file-proxy?url=${encodeURIComponent(externalUrl)}`;
}

function parseCsv(text: string): string[][] {
  const lines = text.trim().split("\n");
  return lines.map(line => {
    const result: string[] = [];
    let cur = "";
    let inQ = false;
    for (const ch of line) {
      if (ch === '"') { inQ = !inQ; }
      else if (ch === "," && !inQ) { result.push(cur.trim()); cur = ""; }
      else { cur += ch; }
    }
    result.push(cur.trim());
    return result;
  });
}

async function downloadFile(url: string, filename: string) {
  try {
    // Always go through the proxy so downloads also work cross-origin
    const res = await fetch(proxyUrl(url));
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
    // Fallback: open in new tab
    window.open(url, "_blank");
  }
}

/* ─── CsvFileCard ────────────────────────────────────────────────── */

function CsvFileCard({ file }: { file: AnalysisFile }) {
  const [preview, setPreview] = useState<{ headers: string[]; rows: string[][]; total: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    fetch(proxyUrl(file.fileUrl))
      .then(r => r.text())
      .then(text => {
        const parsed = parseCsv(text);
        if (parsed.length > 0) {
          setPreview({ headers: parsed[0], rows: parsed.slice(1, 11), total: Math.max(0, parsed.length - 1) });
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [file.fileUrl]);

  const handleDownload = async () => {
    setDownloading(true);
    await downloadFile(file.fileUrl, file.fileName);
    setDownloading(false);
  };

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.04]">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <FontAwesomeIcon icon={faTable} className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">{file.fileName}</p>
            {preview && <p className="text-[11px] text-slate-500 mt-0.5">{preview.total} rows total — showing top 10</p>}
          </div>
        </div>
        <button onClick={handleDownload} disabled={downloading}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.08] transition-all duration-200 cursor-pointer disabled:opacity-50">
          <FontAwesomeIcon icon={downloading ? faSpinner : faDownload} className={`w-3 h-3 ${downloading ? "animate-spin" : ""}`} />
          {downloading ? "Saving..." : "Download"}
        </button>
      </div>

      {/* Table preview */}
      <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center py-10">
            <FontAwesomeIcon icon={faSpinner} className="w-5 h-5 text-[#4d8ef7] animate-spin" />
          </div>
        ) : error ? (
          <div className="py-8 text-center text-sm text-rose-400">Failed to load CSV preview.</div>
        ) : preview ? (
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10">
              <tr className="bg-[#0d1526]">
                {preview.headers.map((h, i) => (
                  <th key={i} className="text-left px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap border-b border-white/[0.06]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {preview.rows.map((row, i) => (
                <tr key={i} className="border-t border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                  {row.map((cell, j) => (
                    <td key={j} className={`px-4 py-2 whitespace-nowrap text-xs ${j === 0 ? "font-medium text-slate-200" : "text-slate-400"}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
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
        // Use 3Dmol 2.0.3 — version 2.4.x has a known internal bug where it
        // crashes with "Cannot read properties of undefined (reading 'symmetries')"
        // when parsing CRYST1 / REMARK 290 symmetry records in some PDB files.
        if (!(window as unknown as Record<string, unknown>).$3Dmol) {
          await new Promise<void>((resolve, reject) => {
            const s = document.createElement("script");
            s.src = "https://cdn.jsdelivr.net/npm/3dmol@2.0.3/build/3Dmol-min.js";
            s.onload = () => resolve();
            s.onerror = () => reject(new Error("Failed to load 3Dmol.js"));
            document.head.appendChild(s);
          });
        }

        const res = await fetch(proxyUrl(url));
        if (!res.ok) throw new Error("Failed to fetch PDB file");
        const rawPdb = await res.text();

        if (cancelled || !containerRef.current) return;

        // Strip CRYST1 and REMARK 290 symmetry lines — these are the lines that
        // trigger the internal 'symmetries' crash in 3Dmol's PDB parser when the
        // records don't exactly match the expected format.
        const pdbData = rawPdb
          .split("\n")
          .filter(line => !line.startsWith("CRYST1") && !line.startsWith("REMARK 290"))
          .join("\n");

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const $3Dmol = (window as any).$3Dmol;
        const viewer = $3Dmol.createViewer(containerRef.current, {
          backgroundColor: "#0a0f1a",
        });

        // addModel can still throw for malformed records — catch it separately
        // so the viewer shell itself stays alive and we can show a useful error.
        try {
          viewer.addModel(pdbData, "pdb");
          viewer.setStyle({}, { cartoon: { color: "spectrum" } });
          viewer.zoomTo();
          viewer.render();
          viewer.zoom(1.1, 1000);
          setIsLoading(false);
        } catch (parseErr: unknown) {
          const msg = parseErr instanceof Error ? parseErr.message : "PDB parse error";
          throw new Error(`3D viewer could not parse the structure: ${msg}`);
        }
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
        {/* Header */}
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
        {/* Viewer */}
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

/* ─── Main Component ─────────────────────────────────────────────── */

interface Props { analysisId: string; onClose: () => void; }
type Tab = "csv" | "pdb" | "images";

export default function ViewResults({ analysisId, onClose }: Props) {
  const [tab, setTab] = useState<Tab>("csv");
  const [data, setData] = useState<AnalysisDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [pdbViewerUrl, setPdbViewerUrl] = useState<string | null>(null);
  const [downloadingAll, setDownloadingAll] = useState<Tab | null>(null);

  const downloadAllFiles = async (files: { url: string; name: string }[], section: Tab) => {
    setDownloadingAll(section);
    for (const f of files) {
      await downloadFile(f.url, f.name);
      // Small delay between downloads to avoid browser throttling
      await new Promise(r => setTimeout(r, 400));
    }
    setDownloadingAll(null);
  };

  const fetchDetail = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_ANALYSIS_BASE_URL;
      const res = await fetch(`${baseUrl}/get?guid=${analysisId}`, {
        credentials: "include",
      });
      const json: ApiResponse = await res.json();
      if (!json.success) { setErrorMsg(json.message); return; }
      setData(json.data ?? null);
    } catch {
      setErrorMsg("Failed to load analysis results. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [analysisId]);

  useEffect(() => { fetchDetail(); }, [fetchDetail]);

  const csvFiles = data?.files.filter(f => f.type === "Csv") ?? [];
  const imageFiles = data?.files.filter(f => f.type === "Png") ?? [];
  const proteins = data?.proteins ?? [];

  const tabs: { key: Tab; label: string; icon: typeof faTable; count: number }[] = [
    { key: "csv", label: "CSV Files", icon: faTable, count: csvFiles.length },
    { key: "pdb", label: "Protein Structures", icon: faCubes, count: proteins.length },
    { key: "images", label: "Images", icon: faImage, count: imageFiles.length },
  ];

  const gradients = [
    "from-blue-500/20 to-cyan-500/20", "from-violet-500/20 to-purple-500/20",
    "from-emerald-500/20 to-teal-500/20", "from-rose-500/20 to-pink-500/20",
    "from-amber-500/20 to-orange-500/20", "from-sky-500/20 to-indigo-500/20",
  ];

  return (
    <>
      <div className="w-full space-y-6">
        <button onClick={onClose} className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer w-fit">
          <FontAwesomeIcon icon={faArrowLeft} className="w-3.5 h-3.5" />
          <span>Back to Analysis History</span>
        </button>

        <div className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-5 border-b border-white/[0.06]">
            <div>
              <h2 className="text-xl font-bold text-white">
                Analysis Results — <span className="text-[#4d8ef7]">{data?.name ?? analysisId}</span>
              </h2>
              <p className="mt-1 text-sm text-slate-400">Comprehensive pipeline output for protein target analysis</p>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <FontAwesomeIcon icon={faSpinner} className="w-8 h-8 text-[#4d8ef7] animate-spin mb-4" />
              <p className="text-sm text-slate-500">Loading analysis results...</p>
            </div>
          ) : errorMsg ? (
            <div className="flex flex-col items-center justify-center py-20">
              <FontAwesomeIcon icon={faTriangleExclamation} className="w-10 h-10 text-rose-400 mb-4" />
              <p className="text-sm text-rose-300 max-w-md text-center">{errorMsg}</p>
              <button onClick={fetchDetail}
                className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-sm text-slate-300 hover:bg-white/[0.1] transition-all duration-200 cursor-pointer">
                <FontAwesomeIcon icon={faArrowsRotate} className="w-3.5 h-3.5" /> Retry
              </button>
            </div>
          ) : (
            <>
              {/* Tabs */}
              <div className="flex items-center gap-1 px-8 pt-4">
                {tabs.map(t => (
                  <button key={t.key} onClick={() => setTab(t.key)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                      tab === t.key ? "bg-[#1152d4]/15 text-white border border-[#1152d4]/25" : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] border border-transparent"
                    }`}>
                    <FontAwesomeIcon icon={t.icon} className={`w-3.5 h-3.5 ${tab === t.key ? "text-[#4d8ef7]" : ""}`} />
                    {t.label}
                    <span className={`ml-1 px-1.5 py-0.5 rounded-md text-[10px] font-semibold ${
                      tab === t.key ? "bg-[#4d8ef7]/20 text-[#4d8ef7]" : "bg-white/[0.06] text-slate-500"
                    }`}>{t.count}</span>
                  </button>
                ))}
              </div>

              <div className="p-8">
                {/* ── CSV Tab ──────────────────────────────────── */}
                {tab === "csv" && (
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-slate-400">Data files generated by the analysis pipeline — showing top 10 rows</p>
                      {csvFiles.length > 0 && (
                        <button onClick={() => downloadAllFiles(csvFiles.map(f => ({ url: f.fileUrl, name: f.fileName })), "csv")}
                          disabled={downloadingAll === "csv"}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1152d4]/15 border border-[#1152d4]/25 text-xs font-semibold text-[#4d8ef7] hover:bg-[#1152d4]/25 transition-all duration-200 cursor-pointer disabled:opacity-50">
                          <FontAwesomeIcon icon={downloadingAll === "csv" ? faSpinner : faFileZipper} className={`w-3.5 h-3.5 ${downloadingAll === "csv" ? "animate-spin" : ""}`} />
                          {downloadingAll === "csv" ? "Downloading..." : `Download All (${csvFiles.length})`}
                        </button>
                      )}
                    </div>
                    {csvFiles.length === 0
                      ? <div className="py-12 text-center text-slate-500 text-sm">No CSV files available.</div>
                      : csvFiles.map(f => <CsvFileCard key={f.id} file={f} />)
                    }
                  </div>
                )}

                {/* ── PDB Tab ──────────────────────────────────── */}
                {tab === "pdb" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-slate-400">3D protein structures — click to view interactively</p>
                      {proteins.length > 0 && (
                        <button onClick={() => downloadAllFiles(proteins.map(p => ({ url: p.structureUrl, name: p.name })), "pdb")}
                          disabled={downloadingAll === "pdb"}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1152d4]/15 border border-[#1152d4]/25 text-xs font-semibold text-[#4d8ef7] hover:bg-[#1152d4]/25 transition-all duration-200 cursor-pointer disabled:opacity-50">
                          <FontAwesomeIcon icon={downloadingAll === "pdb" ? faSpinner : faFileZipper} className={`w-3.5 h-3.5 ${downloadingAll === "pdb" ? "animate-spin" : ""}`} />
                          {downloadingAll === "pdb" ? "Downloading..." : `Download All (${proteins.length})`}
                        </button>
                      )}
                    </div>
                    {proteins.length === 0
                      ? <div className="py-12 text-center text-slate-500 text-sm">No protein structures available.</div>
                      : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                          {proteins.map((p, idx) => (
                            <div key={p.id} className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden hover:border-[#4d8ef7]/30 hover:shadow-[0_0_25px_rgba(17,82,212,0.1)] transition-all duration-300">
                              {/* Clickable preview area */}
                              <button onClick={() => setPdbViewerUrl(p.structureUrl)}
                                className={`relative w-full h-44 bg-gradient-to-br ${gradients[idx % gradients.length]} flex items-center justify-center cursor-pointer`}>
                                <FontAwesomeIcon icon={faAtom} className="w-14 h-14 text-white/15 group-hover:text-white/30 group-hover:scale-110 transform transition-all duration-500" />
                                <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/40 backdrop-blur-sm text-[10px] font-mono text-white/70">PDB</div>
                                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-all duration-300">
                                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1152d4]/90 text-white text-xs font-semibold shadow-lg">
                                    <FontAwesomeIcon icon={faExpand} className="w-3 h-3" /> View in 3D
                                  </div>
                                </div>
                              </button>
                              {/* Info + download */}
                              <div className="p-4 flex items-center justify-between">
                                <div>
                                  <h4 className="font-semibold text-sm text-white">{p.name}</h4>
                                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                                    <FontAwesomeIcon icon={faLink} className="w-3 h-3" />
                                    <span className="truncate max-w-[140px]">{p.structureUrl.split("/").pop()}</span>
                                  </div>
                                </div>
                                <button onClick={() => downloadFile(p.structureUrl, p.name)}
                                  className="p-2 rounded-lg hover:bg-white/[0.06] transition-colors cursor-pointer" title="Download PDB">
                                  <FontAwesomeIcon icon={faDownload} className="w-3.5 h-3.5 text-slate-400" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                )}

                {/* ── Images Tab ───────────────────────────────── */}
                {tab === "images" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-slate-400">Generated visual analytics from the AI pipeline</p>
                      {imageFiles.length > 0 && (
                        <button onClick={() => downloadAllFiles(imageFiles.map(f => ({ url: f.fileUrl, name: f.fileName })), "images")}
                          disabled={downloadingAll === "images"}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1152d4]/15 border border-[#1152d4]/25 text-xs font-semibold text-[#4d8ef7] hover:bg-[#1152d4]/25 transition-all duration-200 cursor-pointer disabled:opacity-50">
                          <FontAwesomeIcon icon={downloadingAll === "images" ? faSpinner : faFileZipper} className={`w-3.5 h-3.5 ${downloadingAll === "images" ? "animate-spin" : ""}`} />
                          {downloadingAll === "images" ? "Downloading..." : `Download All (${imageFiles.length})`}
                        </button>
                      )}
                    </div>
                    {imageFiles.length === 0
                      ? <div className="py-12 text-center text-slate-500 text-sm">No image results available.</div>
                      : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                          {imageFiles.map(img => (
                            <div key={img.id} className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden hover:border-white/[0.12] transition-all duration-300">
                              <div className="relative h-48 bg-[#0a0f1a] flex items-center justify-center overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={img.fileUrl} alt={img.fileName} className="w-full h-full object-contain p-2" />
                              </div>
                              <div className="p-4 flex items-center justify-between">
                                <div>
                                  <h4 className="font-semibold text-sm text-white truncate max-w-[180px]">{img.fileName}</h4>
                                  <p className="mt-0.5 text-xs text-slate-500">PNG Image</p>
                                </div>
                                <button onClick={() => downloadFile(img.fileUrl, img.fileName)}
                                  className="p-2 rounded-lg hover:bg-white/[0.06] transition-colors cursor-pointer" title="Download image">
                                  <FontAwesomeIcon icon={faDownload} className="w-3.5 h-3.5 text-slate-400" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* PDB 3D Viewer Modal */}
      {pdbViewerUrl && <PdbViewer url={pdbViewerUrl} onClose={() => setPdbViewerUrl(null)} />}
    </>
  );
}
