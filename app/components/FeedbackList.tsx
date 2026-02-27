"use client";

import { motion } from "framer-motion";
import { ScoreCard } from "./ScoreCard";

interface FeedbackListProps {
    positives: string[];
    tips: string[];
    missing: string[];
    improvements: Array<{
        original_text: string;
        suggested_rewrite?: string;
        improved_text?: string;
        reasoning: string;
        potential_score_increase: number;
    }>;
    score: number;
}

export const FeedbackList = ({ positives, tips, missing, improvements, score }: FeedbackListProps) => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariant = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="w-full flex flex-col space-y-6"
        >
            {/* Top 3-column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">

                {/* Column 1: Score Card */}
                <motion.div variants={itemVariant} className="flex flex-col h-full">
                    <ScoreCard score={score} onAnalyzeAnother={() => { }} />
                </motion.div>

                {/* Column 2: Positives and Tips */}
                <motion.div variants={itemVariant} className="flex flex-col gap-6">
                    {/* Positives */}
                    {(positives && positives.length > 0) ? (
                        <div className="industrial-border rounded-xl p-6 bg-black/40 h-full">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="flex items-center gap-3 text-[11px] md:text-xs font-mono uppercase tracking-[0.4em] text-emerald-500 font-bold overflow-hidden">
                                    <span className="shrink-0">SYSTEM_POSITIVES</span>
                                    <div className="h-[1px] w-full bg-emerald-500/20" />
                                </h3>
                                <span className="text-[10px] font-mono text-zinc-500 shrink-0">NODE_0x1A</span>
                            </div>

                            <ul className="space-y-4">
                                {positives.map((item, i) => (
                                    <li key={i} className="flex gap-3 group/li">
                                        <span className="font-mono text-[11px] text-emerald-500/60 mt-1 shrink-0">
                                            [{(i + 1).toString().padStart(2, '0')}]
                                        </span>
                                        <span className="text-zinc-300 text-xs md:text-sm font-mono leading-relaxed group-hover/li:text-white transition-colors uppercase tracking-tight">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : null}

                    {/* Primary Tips (Usually empty if UI matches screenshot exactly, but retained for completion) */}
                    {(tips && tips.length > 0) && (
                        <div className="industrial-border rounded-xl p-6 bg-black/40">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="flex items-center gap-3 text-[11px] md:text-xs font-mono uppercase tracking-[0.4em] text-amber-400 font-bold overflow-hidden">
                                    <span className="shrink-0">General Heuristics_</span>
                                    <div className="h-[1px] w-full bg-amber-400/20" />
                                </h3>
                                <span className="text-[10px] font-mono text-zinc-500 shrink-0">NODE_0x1B</span>
                            </div>

                            <ul className="space-y-4">
                                {tips.map((item, i) => (
                                    <li key={i} className="flex gap-3 group/li">
                                        <span className="font-mono text-[11px] text-amber-500/60 mt-1 shrink-0">
                                            [{(i + 1).toString().padStart(2, '0')}]
                                        </span>
                                        <span className="text-zinc-300 text-xs md:text-sm font-mono leading-relaxed group-hover/li:text-white transition-colors uppercase tracking-tight">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </motion.div>

                {/* Column 3: Missing Elements */}
                <motion.div variants={itemVariant} className="flex flex-col h-full">
                    {missing && missing.length > 0 ? (
                        <div className="industrial-border rounded-xl p-6 bg-black/40 h-full">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="flex items-center gap-3 text-[11px] md:text-xs font-mono uppercase tracking-[0.2em] text-amber-500 font-bold overflow-hidden">
                                    <span className="shrink-0">MISSING_DATA_CLUSTERS</span>
                                    <div className="h-[1px] w-full bg-amber-500/20" />
                                </h3>
                                <span className="text-[10px] font-mono text-zinc-500 shrink-0 hidden sm:block">NODE_0x2B</span>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {missing.map((item, i) => (
                                    <span key={i} className="px-3 py-2 bg-black/60 border border-zinc-800 rounded-md text-[10px] md:text-[11px] font-mono uppercase tracking-widest text-zinc-400 hover:border-amber-500/30 hover:text-amber-400 transition-all cursor-crosshair">
                                        {item}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-zinc-900">
                                <p className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-zinc-500 leading-relaxed">
                                    CRITICAL DEFICIENCY DETECTED IN SEMANTIC CORE. INJECT THESE NODES TO INCREASE IMPACT PROBABILITY.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="industrial-border rounded-xl p-6 bg-black/40 h-full flex items-center justify-center">
                            <span className="text-zinc-600 font-mono text-xs uppercase tracking-widest">
                                DATA_CLUSTERS_OPTIMAL
                            </span>
                        </div>
                    )}
                </motion.div>

            </div>

            {/* Bottom Section: Rewrite Recommendations */}
            {improvements && improvements.length > 0 && (
                <motion.div variants={itemVariant} className="industrial-border rounded-xl p-6 md:p-8 bg-black/40 mt-8">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="flex items-center gap-3 text-xs md:text-sm font-mono uppercase tracking-[0.4em] text-zinc-400 font-bold overflow-hidden">
                            <span className="shrink-0">SEMANTIC_OVERRIDE_PROPOSALS</span>
                            <div className="h-[1px] w-full bg-zinc-800" />
                        </h3>
                        <span className="text-[10px] font-mono text-zinc-500 shrink-0">NODE_0x3C</span>
                    </div>

                    <div className="space-y-6">
                        {improvements.map((improvement, i) => {
                            const newText = improvement.suggested_rewrite || improvement.improved_text;
                            return (
                                <div key={i} className="flex flex-col border border-zinc-800/80 rounded-lg overflow-hidden bg-black/20">
                                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-800/80">
                                        <div className="p-5 relative">
                                            <span className="absolute top-5 right-5 font-mono text-[9px] text-red-500 uppercase tracking-widest">[REMOVED]</span>
                                            <p className="text-zinc-400 line-through decoration-zinc-700 text-xs md:text-sm font-mono leading-relaxed uppercase tracking-tight mt-6">
                                                {improvement.original_text}
                                            </p>
                                        </div>
                                        <div className="p-5 relative bg-emerald-500/5">
                                            <span className="absolute top-5 right-5 font-mono text-[9px] text-emerald-400 uppercase tracking-widest">[ADDED]</span>
                                            <span className="absolute top-5 left-5 px-2 py-0.5 rounded-sm bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px]">
                                                +{improvement.potential_score_increase} PTS
                                            </span>
                                            <p className="text-emerald-400/90 drop-shadow-[0_0_8px_rgba(52,211,153,0.1)] text-xs md:text-sm font-mono leading-relaxed uppercase tracking-tight mt-6 font-medium">
                                                {newText}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="px-6 py-4 bg-zinc-900/50 border-t border-zinc-800/80 flex items-start md:items-center gap-4">
                                        <div className="w-2 h-2 rounded-full bg-lime-400/60 mt-1 md:mt-0 shrink-0" />
                                        <p className="text-zinc-300 text-[10px] md:text-xs font-mono leading-relaxed uppercase tracking-wider">
                                            <span className="text-zinc-500 mr-2">SYS_RATIONALE:</span>
                                            {improvement.reasoning}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};
