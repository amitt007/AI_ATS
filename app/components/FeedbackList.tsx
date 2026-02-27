"use client";

import { motion } from "framer-motion";
import { Activity, Layers } from "lucide-react";
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
            className="w-full flex flex-col space-y-8"
        >
            {/* 2-column layout: ScoreCard left, all 3 cards stacked on right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

                {/* Column 1: Score Card */}
                <motion.div variants={itemVariant} className="flex flex-col h-full">
                    <div className="h-full">
                        <ScoreCard score={score} onAnalyzeAnother={() => { }} />
                    </div>
                </motion.div>

                {/* Column 2: All 3 cards stacked */}
                <motion.div variants={itemVariant} className="flex flex-col gap-6">

                    {/* Strengths Identified */}
                    {positives && positives.length > 0 ? (
                        <div className="editorial-border rounded p-8 bg-card-dark">
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#00ff41]/10">
                                <h3 className="font-mono text-xs text-[#00ff41] uppercase tracking-[0.4em] text-glow-green flex items-center gap-2">
                                    <Activity className="w-3.5 h-3.5" />
                                    System_Positives
                                </h3>
                                <span className="font-mono text-[8px] text-[#00ff41]/40 uppercase tracking-widest">NODE_0x1A</span>
                            </div>
                            <ul className="space-y-6">
                                {positives.map((item, i) => (
                                    <li key={i} className="flex gap-5 items-start">
                                        <span className="font-mono text-[9px] text-[#00ff41]/40 mt-1 shrink-0">
                                            [{(i + 1).toString().padStart(2, '0')}]
                                        </span>
                                        <span className="text-[#00ff41]/60 text-[13px] font-sans leading-relaxed uppercase tracking-wider">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : null}

                    {/* Missing Critical Keywords */}
                    {missing && missing.length > 0 ? (
                        <div className="editorial-border rounded p-8 bg-card-dark">
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-amber-500/10">
                                <h3 className="font-mono text-xs text-amber-500 uppercase tracking-[0.4em] text-glow-orange flex items-center gap-2">
                                    <Layers className="w-3.5 h-3.5" />
                                    Missing_Data_Clusters
                                </h3>
                                <span className="font-mono text-[8px] text-[#00ff41]/40 uppercase tracking-widest">NODE_0x2B</span>
                            </div>
                            <div className="flex flex-wrap gap-2.5">
                                {missing.map((item, i) => (
                                    <div key={i} className="px-4 py-2 bg-black border border-zinc-700 rounded-sm font-mono text-[9px] uppercase tracking-[0.2em] text-[#00ff41]/50 hover:text-amber-500/80 hover:border-amber-500/30 transition-colors">
                                        {item}
                                    </div>
                                ))}
                            </div>
                            <p className="mt-10 text-[8px] font-mono text-[#00ff41]/40 uppercase tracking-[0.2em] leading-relaxed max-w-md">
                                CRITICAL DEFICIENCY DETECTED IN SEMANTIC CORE. INJECT THESE NODES TO INCREASE IMPACT PROBABILITY.
                            </p>
                        </div>
                    ) : null}

                    {/* Formatting & Style */}
                    {tips && tips.length > 0 && (
                        <div className="editorial-border rounded p-8 bg-card-dark">
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-cyan-500/10">
                                <h3 className="font-mono text-xs text-cyan-500 uppercase tracking-[0.4em] text-glow-cyan flex items-center gap-2">
                                    <Activity className="w-3.5 h-3.5 rotate-90" />
                                    Format_Styling
                                </h3>
                                <span className="font-mono text-[8px] text-[#00ff41]/40 uppercase tracking-widest">NODE_0x1B</span>
                            </div>
                            <ul className="space-y-6">
                                {tips.map((item, i) => (
                                    <li key={i} className="flex gap-5 items-start">
                                        <span className="font-mono text-[9px] text-cyan-500/50 mt-1 shrink-0">
                                            [{(i + 1).toString().padStart(2, '0')}]
                                        </span>
                                        <span className="text-[#00ff41]/60 text-[13px] font-sans leading-relaxed uppercase tracking-wider">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                </motion.div>
            </div>

            {/* Bottom Section: Rewrite Recommendations */}
            {improvements && improvements.length > 0 && (
                <motion.div variants={itemVariant} className="editorial-border rounded p-8 bg-card-dark mt-12">
                    <div className="flex items-center justify-between mb-10 pb-4 border-b border-[#00ff41]/20">
                        <h3 className="font-mono text-xs text-[#00ff41]/50 uppercase tracking-[0.4em] text-glow-green flex items-center gap-3">
                            <span className="text-[#00ff41] font-bold">&gt;_</span>
                            Semantic_Override_Proposals
                        </h3>
                        <span className="font-mono text-[8px] text-[#00ff41]/40 uppercase tracking-widest">LAYER_SC-03</span>
                    </div>

                    <div className="space-y-6">
                        {improvements.map((improvement, i) => {
                            const newText = improvement.suggested_rewrite || improvement.improved_text;
                            return (
                                <div key={i} className="flex flex-col border border-[#00ff41]/20 rounded-sm overflow-hidden bg-black/40">
                                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-900">
                                        <div className="p-8 relative group">
                                            <span className="uppercase tracking-[0.2em] text-[8px] font-mono font-bold text-[#00ff41]/40 mb-6 block">Original_Draft //</span>
                                            <p className="text-[#00ff41]/40 line-through decoration-zinc-800/50 text-xs font-sans leading-relaxed uppercase tracking-wider">
                                                {improvement.original_text}
                                            </p>
                                        </div>
                                        <div className="p-8 relative bg-white/[0.02]">
                                            <div className="flex items-center justify-between mb-6">
                                                <span className="uppercase tracking-[0.2em] text-[8px] font-mono font-bold text-[#00ff41] text-glow-green">Optimized_Signal //</span>
                                                <span className="px-2 py-0.5 rounded-sm text-[8px] font-mono border border-[#00ff41]/20 text-[#00ff41]/80 bg-[#050A06] uppercase tracking-widest">
                                                    +{improvement.potential_score_increase} Impact
                                                </span>
                                            </div>
                                            <p className="text-[#00ff41] text-xs font-sans leading-relaxed uppercase tracking-widest text-glow-green">
                                                {newText}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="px-8 py-5 bg-black/60 border-t border-[#00ff41]/20 flex items-start gap-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#08100A] animate-pulse" />
                                        </div>
                                        <p className="text-[#00ff41]/50 text-[10px] font-mono leading-relaxed uppercase tracking-wider">
                                            <span className="text-[#00ff41]/30 font-bold mr-2">Rationale:</span> {improvement.reasoning}
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
