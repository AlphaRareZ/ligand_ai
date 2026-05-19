"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/* ─── Types ──────────────────────────────────────────────────────── */
interface TeamMember {
    name: string;
    role: string;
    quote: string;
    image: string;
    linkedin: string;
    email: string;
    tags: string[];
}

/* ─── Data ───────────────────────────────────────────────────────── */
const TEAM: TeamMember[] = [
    {
        name: "Abdullah El-Afifi",
        role: "AI Drug Discovery Scientist",
        quote: "Bridging the gap between complex AI models and an intuitive user experience. I design the systems that turn raw molecular predictions into actionable clinical insights for researchers.",
        image: "https://pub-a36c7e0b4a1444c48def1977e87f7a9c.r2.dev/uploads/Afifi.jpg",
        linkedin: "https://eg.linkedin.com/in/abdullah-el-afifi",
        email: "mailto:aelafifi00@gmail.com",
        tags: ["PyTorch", "CUDA", "MLOps"],
    },

    {
        name: "Yousef Khaled",
        role: "Generative AI & Drug Design",
        quote: "Designing molecules from first principles using generative neural networks. Our models learn the grammar of chemistry to propose ligands that are both novel and synthesisable.",
        image: "https://pub-a36c7e0b4a1444c48def1977e87f7a9c.r2.dev/uploads/Yousef.jpg",
        linkedin: "https://eg.linkedin.com/in/yosefkhaled",
        email: "mailto:yosefffflm10@gmail.com",
        tags: ["GNN", "SMILES", "Docking"],
    },
    {
        name: "Mariam Muhammed",
        role: "Operations Research & Decision Support",
        quote: "Applying multi-objective optimisation to the drug discovery pipeline. We're not just ranking candidates — we're providing decision frameworks that account for toxicity, cost, and synthesisability simultaneously.",
        image: "https://static.vecteezy.com/system/resources/thumbnails/003/793/482/small/transparent-grid-pattern-for-background-vector.jpg",
        linkedin: "https://www.linkedin.com/in/mariamhanafy",
        email: "mailto:mariaam.mohammed4@gmail.com",
        tags: ["Active Researcher", "Data Science"],
    },
    {
        name: "Basma Mamdouh",
        role: "Operations Research & Decision Support",
        quote: "As a computational biologist, I work on the front lines of precision medicine — translating complex genomic data into actionable therapeutic strategies. My research focuses on deciphering the transcriptomic signatures of AML to identify novel drug targets and predict treatment response.",
        image: "https://static.vecteezy.com/system/resources/thumbnails/003/793/482/small/transparent-grid-pattern-for-background-vector.jpg",
        linkedin: "https://www.linkedin.com/in/basma-mamdouh-33710424b/",
        email: "mailto:basmammdouh120@gmail.com",
        tags: ["Computational Biologist", "Data Scientist"],
    },
    {
        name: "Muhammed Alaa Eddin ",
        role: "Software Engineer & DevOps",
        quote: "I build more than software — I build systems with intention.From architecture to deployment, every part of the project reflects problem solving, engineering, and countless hours of turning ideas into something real",
        image: "https://pub-a36c7e0b4a1444c48def1977e87f7a9c.r2.dev/uploads/Muhammed.jpg",
        linkedin: "https://www.linkedin.com/",
        email: "mailto:Muhammedalaa.404@gmail.com",
        tags: ["DevOps", "Software Architecture", "MLOps"],
    },
];

/* ─── Icons ──────────────────────────────────────────────────────── */
function LinkedInIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    );
}

function MailIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            className="w-5 h-5"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
            />
        </svg>
    );
}

function ChevronLeft() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="w-5 h-5"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
            />
        </svg>
    );
}

function ChevronRight() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="w-5 h-5"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
        </svg>
    );
}

/* ─── Component ──────────────────────────────────────────────────── */
export default function TeamCarousel() {
    const [current, setCurrent] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [direction, setDirection] = useState<"left" | "right">("right");
    const [imageReady, setImageReady] = useState(true);
    const preloadRef = useRef<HTMLImageElement | null>(null);

    const count = TEAM.length;

    const go = useCallback(
        (next: number, dir: "left" | "right") => {
            if (animating) return;
            const nextIndex = ((next % count) + count) % count;

            // Preload the next image while slide-out is happening
            const img = new Image();
            img.src = TEAM[nextIndex].image;
            preloadRef.current = img;

            setDirection(dir);
            setAnimating(true);
            setImageReady(false);

            setTimeout(() => {
                setCurrent(nextIndex);
                setAnimating(false);
            }, 340);
        },
        [animating, count],
    );

    const prev = () => go(current - 1, "left");
    const next = () => go(current + 1, "right");

    // Auto-advance every 6 s
    useEffect(() => {
        const id = setInterval(() => go(current + 1, "right"), 6000);
        return () => clearInterval(id);
    }, [current, go]);

    // Preload ALL images on mount so subsequent transitions are instant
    useEffect(() => {
        TEAM.forEach((m) => {
            const img = new Image();
            img.src = m.image;
        });
    }, []);

    const member = TEAM[current];

    const handleImageLoad = () => {
        setImageReady(true);
    };

    // Slide animation classes
    const slideOut =
        direction === "right"
            ? "-translate-x-8 opacity-0"
            : "translate-x-8 opacity-0";

    return (
        <div className="w-full">
            {/* Card */}
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-sm shadow-2xl">
                {/* Glow orb */}
                <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#1152d4]/15 rounded-full blur-[80px] pointer-events-none" />

                <div
                    className={`grid grid-cols-1 lg:grid-cols-2 transition-all duration-300 ease-in-out ${
                        animating ? slideOut : "translate-x-0 opacity-100"
                    }`}
                >
                    {/* ── Left: text ── */}
                    <div className="flex flex-col justify-between p-8 lg:p-12 order-2 lg:order-1">
                        {/* Quote */}
                        <div className="mb-8">
                            <span className="text-5xl font-serif text-[#1152d4]/40 leading-none select-none">
                                &ldquo;
                            </span>
                            <p className="text-white/80 text-lg lg:text-xl leading-relaxed font-light -mt-4">
                                {member.quote}
                            </p>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {member.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 rounded-full text-xs font-semibold bg-[#1152d4]/10 border border-[#1152d4]/20 text-[#4d8ef7]"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Footer: name + links */}
                        <div className="flex items-end justify-between gap-4">
                            <div>
                                <p className="text-white font-bold text-lg">
                                    {member.name}
                                </p>
                                <p className="text-[#1152d4] text-sm font-semibold mt-0.5">
                                    {member.role}
                                </p>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                                <a
                                    href={member.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${member.name} LinkedIn`}
                                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] text-slate-400 hover:text-[#0a66c2] hover:border-[#0a66c2]/40 hover:bg-[#0a66c2]/10 transition-all duration-200"
                                >
                                    <LinkedInIcon />
                                </a>
                                <a
                                    href={member.email}
                                    aria-label={`Email ${member.name}`}
                                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] text-slate-400 hover:text-[#4d8ef7] hover:border-[#1152d4]/40 hover:bg-[#1152d4]/10 transition-all duration-200"
                                >
                                    <MailIcon />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* ── Right: blank avatar placeholder ── */}
                    <div className="relative h-64 lg:h-auto min-h-[280px] order-1 lg:order-2 overflow-hidden bg-gradient-to-br from-[#0d1629] to-[#111827] flex items-center justify-center">
                        {/* Silhouette icon */}
                        <img
                            key={member.image}
                            src={member.image}
                            alt={member.name}
                            onLoad={handleImageLoad}
                            className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${
                                imageReady ? "opacity-100" : "opacity-0"
                            }`}
                        />
                        {/* <svg
                            viewBox="0 0 120 140"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-32 h-32 opacity-20"
                        >
                            <circle cx="60" cy="45" r="30" fill="white" />
                            <path
                                d="M10 130 C10 95 110 95 110 130"
                                stroke="white"
                                strokeWidth="2"
                                fill="white"
                            />
                        </svg> */}
                        {/* Subtle grid overlay */}
                        <div className="absolute inset-0 opacity-[0.04] bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M0%200h40v40H0z%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M40%200v40M0%2040h40%22%20stroke%3D%22%23ffffff%22%20stroke-width%3D%220.5%22%2F%3E%3C%2Fsvg%3E')] bg-[length:40px_40px] pointer-events-none" />
                        {/* gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1220]/80 via-transparent to-transparent lg:block hidden" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220]/80 via-transparent to-transparent lg:hidden" />
                        {/* slide counter badge */}
                        <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-xs font-mono text-white/60">
                            {current + 1} / {count}
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-6">
                {/* Dots */}
                <div className="flex items-center gap-2">
                    {TEAM.map((_, i) => (
                        <button
                            key={i}
                            onClick={() =>
                                go(i, i > current ? "right" : "left")
                            }
                            aria-label={`Go to team member ${i + 1}`}
                            className={`rounded-full transition-all duration-300 cursor-pointer ${
                                i === current
                                    ? "w-7 h-2.5 bg-[#1152d4]"
                                    : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"
                            }`}
                        />
                    ))}
                </div>

                {/* Arrows */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={prev}
                        className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/[0.1] hover:border-[#1152d4]/30 transition-all duration-200 cursor-pointer"
                        aria-label="Previous team member"
                    >
                        <ChevronLeft />
                    </button>
                    <button
                        onClick={next}
                        className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/[0.1] hover:border-[#1152d4]/30 transition-all duration-200 cursor-pointer"
                        aria-label="Next team member"
                    >
                        <ChevronRight />
                    </button>
                </div>
            </div>
        </div>
    );
}
