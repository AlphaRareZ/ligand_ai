"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";
import { startAnalysis } from "../routing/startAnalysis";

export default function StartAnalysisButton({ children }:{children:React.ReactNode}) {
    const router = useRouter();

    return (
        <Button
            className="ml-8 hidden sm:inline-flex"
            onClick={() => startAnalysis(router)}
        >
            {children}
        </Button>
    );
}
