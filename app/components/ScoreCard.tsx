"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";

interface ScoreCardProps {
    score: number;
    onAnalyzeAnother: () => void;
}

export const ScoreCard = ({ score, onAnalyzeAnother }: ScoreCardProps) => {
    return (
        <div className="w-full industrial-border rounded-xl bg-black/40 p-6 md:p-8 relative overflow-hidden group">

            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-y-3 gap-x-4 mb-8 pb-4 border-zinc-800/50 border-b">
                <div className="flex items-center gap-2 font-mono text-[10px] md:text-[11px] tracking-[0.2em] text-zinc-400 uppercase">
                    <Activity size={14} className="text-lime-500" />
                    <span>Neural_Oscilloscope</span>
                </div>
                <div className="px-2 py-0.5 rounded border border-zinc-800 font-mono text-[9px] md:text-[10px] text-zinc-300 shrink-0">
                    SEQ_ID: 0x{Math.random().toString(16).substr(2, 6).toUpperCase()}
                </div>
            </div>

            {/* Main Score Display */}
            <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="relative mb-6">
                    <h2 className="text-[120px] font-extrabold leading-none text-white tracking-normal select-none relative z-10">
                        {score}
                    </h2>
                    {/* Glitch layers */}
                    <h2 className="text-[120px] font-extrabold leading-none tracking-normal select-none absolute top-0 left-0 opacity-10 blur-sm -z-10 translate-x-[3px] translate-y-[3px] text-lime-400">
                        {score}
                    </h2>
                </div>

                <h3 className="font-mono text-xs md:text-sm tracking-[0.5em] text-zinc-400 uppercase pl-[0.5em]">
                    Impact_Index
                </h3>
            </div>

            {/* Metadata Grid */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-zinc-900 pt-6 font-mono text-[11px] text-zinc-400 uppercase leading-none">
                <div className="flex flex-col gap-2">
                    <span className="opacity-60">Calibration</span>
                    <span className="text-zinc-200">Optimal</span>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="opacity-60">Latency</span>
                    <span className="text-zinc-200">42ms</span>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                    <span className="opacity-60">Confidence</span>
                    <span className="text-zinc-200">98.4%</span>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                    <span className="opacity-60">Security</span>
                    <span className="text-emerald-400">Verified</span>
                </div>
            </div>

        </div>
    );
};
