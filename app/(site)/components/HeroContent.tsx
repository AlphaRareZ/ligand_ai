"use client";
import Button from "./Button";
import { HeadingContent } from "./HeadingContent";
import PulsingMessage from "./PulsingMessage";
import Link from "next/link";
import StartAnalysisButton from "./StartAnalysisButton";
import { startAnalysis } from "../routing/startAnalysis";
import { useRouter } from "next/navigation";
export default function HeroContent() {
    const router = useRouter();
    return (
        // قللنا الـ gap لـ 8 (32px) في الموبايل، و 12 (48px) في الديسكتوب
        <div className="flex flex-col gap-8 lg:gap-12 justify-center">
            {/* يفضل نحطها في div عشان متأثرش على محاذاة اللي تحتها */}
            <div>
                <PulsingMessage>AI-Driven AML Drug Discovery</PulsingMessage>
            </div>

            {/* التعديل الأهم: 
        1. غيرنا ال div لـ h1 عشان الـ SEO والـ Semantics
        2. الخط 4xl في الموبايل، و 6xl في الشاشات الكبيرة
      */}
            <HeadingContent
                heading="Accelerating AML Drug Discovery with"
                bluePart="AI & RNA-Seq"
                description="Ligand AI leverages advanced generative models and precision RNA sequencing to identify novel therapeutic targets and small molecules for Acute Myeloid Leukemia."
            />
            {/* <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
        Accelerating AML Drug Discovery with{" "}
        <span className="text-[#1152d4]">AI & RNA-Seq</span>
      </h1>

      <p className="text-[#94a3b8] text-base md:text-lg font-medium max-w-2xl">
        Ligand AI leverages advanced generative models and precision RNA
        sequencing to identify novel therapeutic targets and small molecules for
        Acute Myeloid Leukemia.
      </p> */}

            {/* ضفنا flex-wrap عشان لو الشاشة صغيرة جداً الزراير تنزل تحت بعض بشياكة */}
            <div className="flex flex-wrap gap-4 mt-4">
                <Button onClick={() => startAnalysis(router)}>
                    Start Discovery
                </Button>
                <Link
                    href="/how-it-works"
                    className="inline-flex items-center justify-center rounded-md font-semibold transition duration-200 cursor-pointer border border-gray-600 text-white bg-transparent hover:bg-[#364153] px-6 py-3 text-base"
                >
                    View Pipeline
                </Link>
            </div>
        </div>
    );
}
