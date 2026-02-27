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
            className="w-full flex flex-col space-y-8"
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
                        <div className="editorial-border rounded p-8 bg-zinc-950 h-full">
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-900">
                                <h3 className="font-serif italic text-xl text-white">
                                    Strengths Identified
                                </h3>
                            </div>

                            <ul className="space-y-4">
                                {positives.map((item, i) => (
                                    <li key={i} className="flex gap-4">
                                        <span className="font-sans text-xs font-bold text-zinc-500 mt-1 shrink-0">
                                            {(i + 1).toString().padStart(2, '0')}
                                        </span>
                                        <span className="text-zinc-300 text-sm font-sans leading-relaxed">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : null}

                    {/* Primary Tips */}
                    {(tips && tips.length > 0) && (
                        <div className="editorial-border rounded p-8 bg-zinc-950">
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-900">
                                <h3 className="font-serif italic text-xl text-white">
                                    Formatting & Style
                                </h3>
                            </div>

                            <ul className="space-y-4">
                                {tips.map((item, i) => (
                                    <li key={i} className="flex gap-4">
                                        <span className="font-sans text-xs font-bold text-zinc-500 mt-1 shrink-0">
                                            {(i + 1).toString().padStart(2, '0')}
                                        </span>
                                        <span className="text-zinc-300 text-sm font-sans leading-relaxed">
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
                        <div className="editorial-border rounded p-8 bg-zinc-950 h-full flex flex-col">
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-900">
                                <h3 className="font-serif italic text-xl text-white">
                                    Missing Critical Keywords
                                </h3>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {missing.map((item, i) => (
                                    <span key={i} className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded font-mono text-[11px] uppercase tracking-widest text-zinc-300">
                                        {item}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-auto pt-6 border-t border-zinc-900">
                                <p className="text-xs font-sans text-zinc-500 leading-relaxed">
                                    <span className="font-medium text-zinc-300">Impact Analysis:</span> Integrating these keywords naturally into your experience section can significantly improve ATS parse rates.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="editorial-border rounded p-8 bg-zinc-950 h-full flex items-center justify-center">
                            <span className="text-zinc-500 font-sans text-sm">
                                No critical keywords missing.
                            </span>
                        </div>
                    )}
                </motion.div>

            </div>

            {/* Bottom Section: Rewrite Recommendations */}
            {improvements && improvements.length > 0 && (
                <motion.div variants={itemVariant} className="editorial-border rounded p-8 md:p-12 bg-zinc-950 mt-8">
                    <div className="flex items-center justify-between mb-10 pb-6 border-b border-zinc-900">
                        <h3 className="font-serif italic text-2xl md:text-3xl text-white">
                            Suggested Rewrites
                        </h3>
                    </div>

                    <div className="space-y-8">
                        {improvements.map((improvement, i) => {
                            const newText = improvement.suggested_rewrite || improvement.improved_text;
                            return (
                                <div key={i} className="flex flex-col border border-zinc-800 rounded-sm overflow-hidden bg-zinc-950">
                                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-800">
                                        <div className="p-6 md:p-8 relative">
                                            <span className="uppercase tracking-widest text-[10px] font-bold text-zinc-500 mb-4 block">Original Draft</span>
                                            <p className="text-zinc-600 line-through decoration-zinc-800 text-sm font-sans leading-loose">
                                                {improvement.original_text}
                                            </p>
                                        </div>
                                        <div className="p-6 md:p-8 relative bg-white/5">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="uppercase tracking-widest text-[10px] font-bold text-white">Optimized Copy</span>
                                                <span className="px-2 py-0.5 rounded text-[10px] font-mono border border-zinc-600 text-zinc-300 bg-zinc-800">
                                                    +{improvement.potential_score_increase} Impact
                                                </span>
                                            </div>
                                            <p className="text-white text-sm font-sans leading-loose">
                                                {newText}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="px-6 md:px-8 py-4 bg-black border-t border-zinc-900 flex items-start gap-4">
                                        <p className="text-zinc-400 text-xs font-sans leading-relaxed">
                                            <strong className="text-zinc-300 font-medium">Rationale:</strong> {improvement.reasoning}
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
