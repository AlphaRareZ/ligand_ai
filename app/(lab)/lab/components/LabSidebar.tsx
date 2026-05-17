"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDna,
  faCrosshairs,
  faClockRotateLeft,
  faMicroscope,
  faCubes,
  faFlask,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export type LabView =
  | "target-history"
  | "target-analyze"
  | "ligand-history"
  | "ligand-generate";

interface LabSidebarProps {
  activeView: LabView;
  onViewChange: (view: LabView) => void;
}

interface NavSection {
  label: string;
  icon: typeof faCrosshairs;
  items: {
    label: string;
    icon: typeof faClockRotateLeft;
    view: LabView;
  }[];
}

const navSections: NavSection[] = [
  {
    label: "Target Analysis",
    icon: faCrosshairs,
    items: [
      { label: "History", icon: faClockRotateLeft, view: "target-history" },
      { label: "Analyze", icon: faMicroscope, view: "target-analyze" },
    ],
  },
  {
    label: "Ligand Generation",
    icon: faCubes,
    items: [
      { label: "History", icon: faClockRotateLeft, view: "ligand-history" },
      { label: "Generate", icon: faFlask, view: "ligand-generate" },
    ],
  },
];

export default function LabSidebar({
  activeView,
  onViewChange,
}: LabSidebarProps) {
  return (
    <aside className="relative flex flex-col w-72 min-h-screen bg-[#0b1120]/90 border-r border-white/[0.06] backdrop-blur-xl z-20">
      {/* Glow orb accent */}
      <div className="pointer-events-none absolute -top-20 -left-20 w-56 h-56 rounded-full bg-[#1152d4]/20 blur-[100px]" />

      {/* Logo */}
      <div className="relative px-6 py-7 border-b border-white/[0.06]">
        <Link href="/">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#1152d4]/30 to-[#1152d4]/10 border border-[#1152d4]/20 shadow-[0_0_20px_rgba(17,82,212,0.15)]">
              <FontAwesomeIcon
                icon={faDna}
                className="w-4 h-4 text-[#4d8ef7]"
              />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white">
                AML<sub className="mx-0.5 text-[#4d8ef7]">2</sub>Ligand
              </h1>
              <p className="text-[10px] font-medium tracking-widest uppercase text-slate-500">
                Lab Workspace
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation Sections */}
      <nav className="relative flex-1 px-4 py-6 space-y-6 overflow-y-auto">
        {navSections.map((section) => (
          <div key={section.label}>
            {/* Section header */}
            <div className="flex items-center gap-2.5 px-3 mb-3">
              <FontAwesomeIcon
                icon={section.icon}
                className="w-3.5 h-3.5 text-slate-500"
              />
              <span className="text-[11px] font-semibold tracking-widest uppercase text-slate-500">
                {section.label}
              </span>
            </div>

            {/* Sub-items */}
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = activeView === item.view;
                return (
                  <button
                    key={item.view}
                    id={`nav-${item.view}`}
                    onClick={() => onViewChange(item.view)}
                    className={`group relative w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer
                      ${
                        isActive
                          ? "bg-[#1152d4]/15 text-white shadow-[0_0_20px_rgba(17,82,212,0.1)]"
                          : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                      }`}
                  >
                    {/* Active indicator bar */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-[#4d8ef7] shadow-[0_0_8px_rgba(77,142,247,0.6)]" />
                    )}
                    <FontAwesomeIcon
                      icon={item.icon}
                      className={`w-3.5 h-3.5 transition-colors duration-200 ${
                        isActive ? "text-[#4d8ef7]" : "text-slate-500 group-hover:text-slate-400"
                      }`}
                    />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="relative px-4 py-5 border-t border-white/[0.06]">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] transition-all duration-200"
        >
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            className="w-3.5 h-3.5 text-slate-500"
          />
          <span>Back to Site</span>
        </Link>
      </div>
    </aside>
  );
}
