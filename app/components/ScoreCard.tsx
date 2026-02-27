"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";

interface ScoreCardProps {
    score: number;
    onAnalyzeAnother: () => void;
}

export const ScoreCard = ({ score, onAnalyzeAnother }: ScoreCardProps) => {
    return (
        <div className="w-full editorial-border rounded bg-zinc-950 p-8 md:p-10 relative overflow-hidden group flex flex-col items-center justify-center text-center shadow-2xl">

            {/* Main Score Display */}
            <div className="py-8">
                <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-500 uppercase mb-4 block">
                    ATS Impact Index
                </span>
                <div className="relative">
                    <h2 className="text-[140px] md:text-[160px] font-serif italic font-medium leading-none text-white tracking-tighter select-none">
                        {score}
                    </h2>
                </div>
            </div>

            {/* Metadata / Action */}
            <div className="mt-auto pt-8 flex flex-col items-center gap-4 w-full">
                <p className="font-sans text-xs text-zinc-400">
                    Analysis complete. Score is based on semantic parsing and industry-standard heuristic matching.
                </p>
                <button
                    onClick={onAnalyzeAnother}
                    className="mt-4 border border-zinc-800 hover:border-white text-zinc-300 hover:text-black hover:bg-white px-6 py-3 rounded-sm font-sans font-medium text-xs tracking-wide transition-all duration-300"
                >
                    Evaluate Another Resume
                </button>
            </div>

        </div>
    );
};
