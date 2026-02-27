"use client";

import { motion } from "framer-motion";
import { UploadCloud } from "lucide-react";

interface ScoreCardProps {
    score: number;
    onAnalyzeAnother: () => void;
}

export const ScoreCard = ({ score, onAnalyzeAnother }: ScoreCardProps) => {
    const getScoreColor = (s: number) => {
        if (s >= 80) return 'text-emerald-500';
        if (s >= 60) return 'text-amber-500';
        return 'text-rose-500';
    };

    const getBadgeStyles = (s: number) => {
        if (s >= 80) return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';
        if (s >= 60) return 'bg-amber-500/10 border-amber-500/20 text-amber-400';
        return 'bg-rose-500/10 border-rose-500/20 text-rose-400';
    };

    const getPerformanceText = (s: number) => {
        if (s >= 80) return "Excellent resume! Ready for applications.";
        if (s >= 60) return "Good foundation, but needs refinement.";
        return "Needs significant improvement.";
    };

    return (
        <div className="w-full border border-white/10 rounded-3xl bg-white/[0.02] backdrop-blur-xl p-8 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16" />

            <div className="flex flex-col md:flex-row items-center gap-8 z-10">
                <div className="relative w-40 h-40 flex items-center justify-center flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle cx="80" cy="80" r="72" className="stroke-white/10" strokeWidth="8" fill="none" />
                        <motion.circle
                            initial={{ strokeDasharray: "0, 1000" }}
                            animate={{ strokeDasharray: `${(score / 100) * 452}, 1000` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            cx="80" cy="80" r="72"
                            className={`stroke-current ${getScoreColor(score)}`}
                            strokeWidth="8"
                            strokeLinecap="round"
                            fill="none"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.span
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
                            className="text-5xl font-bold bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent"
                        >
                            {score}
                        </motion.span>
                        <span className="text-white/40 text-xs mt-1">/ 100</span>
                    </div>
                </div>

                <div className="flex flex-col text-center md:text-left">
                    <h3 className="text-white/60 font-medium tracking-wide uppercase text-sm mb-2">Overall Quality Match</h3>
                    <p className="text-2xl font-semibold text-white/90 max-w-md mb-4">
                        {getPerformanceText(score)}
                    </p>
                    <div className="flex items-center justify-center md:justify-start gap-3">
                        <div className={`px-4 py-1.5 rounded-full text-xs font-medium border ${getBadgeStyles(score)}`}>
                            {score >= 80 ? 'High Priority Match' : score >= 60 ? 'Medium Priority Match' : 'Low Priority Match'}
                        </div>
                    </div>
                </div>
            </div>

            <button
                onClick={onAnalyzeAnother}
                className="mt-8 md:mt-0 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-white hover:bg-white/10 transition-colors z-10"
            >
                <UploadCloud className="w-4 h-4" /> Analyze Another
            </button>
        </div>
    );
};
