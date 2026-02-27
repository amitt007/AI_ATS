"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";

interface ScoreCardProps {
    score: number;
    onAnalyzeAnother: () => void;
}

export const ScoreCard = ({ score, onAnalyzeAnother }: ScoreCardProps) => {
    return (
        <div className="w-full h-full editorial-border rounded bg-black p-8 flex flex-col relative overflow-hidden group shadow-2xl justify-between">

            {/* Top labels */}
            <div className="flex justify-between items-center w-full mb-12">
                <div className="flex items-center gap-2 text-[#00ff41]/50 font-mono text-[10px] uppercase tracking-widest">
                    <Activity className="w-3 h-3 text-[#00ff41]/60 flex-shrink-0" />
                    <span className="hidden sm:inline-block truncate">Neural_Impact_Oscilloscope</span>
                    <span className="sm:hidden">Oscilloscope</span>
                </div>
                <div className="border border-zinc-700 px-2 py-0.5 rounded-sm text-[#00ff41]/40 font-mono text-[9px] uppercase tracking-widest flex-shrink-0">
                    SEQ ID: RES-0042
                </div>
            </div>

            {/* Main Score Display */}
            <div className="flex flex-col items-center justify-center my-auto py-8">
                <h2 className="text-[140px] md:text-[160px] lg:text-[180px] font-serif italic font-medium leading-[0.75] text-[#00ff41] tracking-tighter select-none">
                    {score}
                </h2>
                <span className="font-mono text-[11px] tracking-[0.4em] text-[#00ff41]/50 uppercase mt-8 md:mt-12">
                    I M P A C T _ I N D E X
                </span>
            </div>

            {/* Bottom Section */}
            <div className="pt-12 w-full flex flex-col gap-4 mt-auto">
                <div className="flex justify-between items-center font-mono text-[9px] uppercase tracking-widest">
                    <div className="flex items-center gap-2 text-[#00ff41]/50">
                        <Activity className="w-3 h-3" />
                        <span>System_Calibration</span>
                    </div>
                    <span className="text-[#ffffff] font-bold">Adequate</span>
                </div>

                {/* Progress Bar */}
                <div className="h-5 w-full border border-zinc-700 bg-black p-0.5 rounded-sm flex gap-0.5">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${score}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-[#00ff41]/40 to-[#ffffff]"
                    />
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-full w-px bg-black ml-auto" />
                    ))}
                </div>

                <div className="flex justify-between items-start mt-2">
                    <div className="flex flex-col">
                        <span className="font-mono text-[9px] text-[#00ff41]/40 uppercase tracking-widest mb-1">Confidence</span>
                        <span className="font-mono text-[10px] text-[#00ff41]/80 uppercase tracking-widest">98.42%_Calibrated</span>
                    </div>
                    <div className="flex flex-col text-right">
                        <span className="font-mono text-[9px] text-[#00ff41]/40 uppercase tracking-widest mb-1">Latency</span>
                        <span className="font-mono text-[10px] text-[#00ff41]/80 uppercase tracking-widest">42ms_Processed</span>
                    </div>
                </div>

            </div>
        </div>
    );
};
