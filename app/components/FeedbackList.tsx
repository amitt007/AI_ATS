"use client";

import { motion } from "framer-motion";

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
}

export const FeedbackList = ({ positives, tips, missing, improvements }: FeedbackListProps) => {
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
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any }
        }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="w-full space-y-6"
        >
            {/* Positives */}
            {positives && positives.length > 0 && (
                <motion.div variants={itemVariant} className="industrial-border rounded-xl p-6 bg-black/40">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="flex items-center gap-3 text-[11px] md:text-xs font-mono uppercase tracking-[0.4em] text-emerald-500 font-bold overflow-hidden">
                            <span className="shrink-0">Positives Pattern_Match</span>
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
                </motion.div>
            )}

            {/* Primary Tips */}
            {tips && tips.length > 0 && (
                <motion.div variants={itemVariant} className="industrial-border rounded-xl p-6 bg-black/40">
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
                </motion.div>
            )}

            {/* Missing Elements */}
            {missing && missing.length > 0 && (
                <motion.div variants={itemVariant} className="industrial-border rounded-xl p-6 bg-black/40">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="flex items-center gap-3 text-[11px] md:text-xs font-mono uppercase tracking-[0.4em] text-amber-500 font-bold overflow-hidden">
                            <span className="shrink-0">Missing Data_Clusters</span>
                            <div className="h-[1px] w-full bg-amber-500/20" />
                        </h3>
                        <span className="text-[10px] font-mono text-zinc-500 shrink-0">NODE_0x2B</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {missing.map((item, i) => (
                            <span key={i} className="px-3 py-1.5 bg-zinc-900/50 border border-zinc-800 rounded text-[11px] font-mono uppercase tracking-widest text-zinc-400 hover:border-amber-500/30 hover:text-amber-400 transition-all cursor-crosshair">
                                {item}
                            </span>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Rewrite Recommendations */}
            {improvements && improvements.length > 0 && (
                <motion.div variants={itemVariant} className="industrial-border rounded-xl p-6 bg-black/40">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="flex items-center gap-3 text-[11px] md:text-xs font-mono uppercase tracking-[0.4em] text-lime-400 font-bold overflow-hidden">
                            <span className="shrink-0">Override Proposals</span>
                            <div className="h-[1px] w-full bg-lime-400/20" />
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
