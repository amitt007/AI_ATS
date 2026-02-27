"use client";

import { CheckCircle2, AlertCircle, FileText } from "lucide-react";

interface FeedbackListProps {
    positives: string[];
    tips: string[];
    missing: string[];
    improvements: Array<{
        original_text: string;
        improved_text: string;
        reasoning: string;
        potential_score_increase: number;
    }>;
}

export const FeedbackList = ({ positives, tips, missing, improvements }: FeedbackListProps) => {
    return (
        <div className="w-full space-y-6">
            {/* Positives */}
            {positives && positives.length > 0 && (
                <div className="border border-white/10 rounded-2xl bg-white/[0.02] backdrop-blur-xl p-6">
                    <h3 className="flex items-center gap-2 text-emerald-400 font-semibold mb-4">
                        <CheckCircle2 className="w-5 h-5" /> What You Did Well
                    </h3>
                    <ul className="space-y-3">
                        {positives.map((item, i) => (
                            <li key={i} className="flex gap-3 text-white/80 text-sm leading-relaxed">
                                <span className="text-emerald-500/50 mt-1">•</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Primary Tips */}
            {tips && tips.length > 0 && (
                <div className="border border-white/10 rounded-2xl bg-white/[0.02] backdrop-blur-xl p-6">
                    <h3 className="flex items-center gap-2 text-amber-400 font-semibold mb-4">
                        <AlertCircle className="w-5 h-5" /> Primary Tips for Improvement
                    </h3>
                    <ul className="space-y-3">
                        {tips.map((item, i) => (
                            <li key={i} className="flex gap-3 text-white/80 text-sm leading-relaxed">
                                <span className="text-amber-500/50 mt-1">•</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Missing Elements */}
            {missing && missing.length > 0 && (
                <div className="border border-white/10 rounded-2xl bg-white/[0.02] backdrop-blur-xl p-6">
                    <h3 className="flex items-center gap-2 text-rose-400 font-semibold mb-4">
                        <FileText className="w-5 h-5" /> Missing Structure / Keywords
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {missing.map((item, i) => (
                            <span key={i} className="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Rewrite Recommendations */}
            {improvements && improvements.length > 0 && (
                <div className="border border-white/10 rounded-2xl bg-white/[0.02] backdrop-blur-xl p-6">
                    <h3 className="flex items-center gap-2 text-blue-400 font-semibold mb-6">
                        <FileText className="w-5 h-5" /> Rewrite Recommendations
                    </h3>
                    <div className="space-y-8">
                        {improvements.map((improvement, i) => (
                            <div key={i} className="flex flex-col space-y-4">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl bg-red-500/5 text-sm border border-red-500/10 relative">
                                        <span className="absolute -top-3 left-4 bg-[#0a0a0a] px-2 text-xs font-semibold text-red-400">Original</span>
                                        <p className="text-white/60 mt-1 line-through decoration-red-500/30">
                                            "{improvement.original_text}"
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-emerald-500/10 text-sm border border-emerald-500/20 relative shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                                        <span className="absolute -top-3 left-4 bg-[#0a0a0a] px-2 text-xs font-semibold text-emerald-400">Recommended</span>
                                        <p className="text-emerald-50 font-medium mt-1">
                                            "{improvement.improved_text}"
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-xs px-2">
                                    <p className="text-white/50 flex-1">
                                        <span className="font-semibold text-white/70">Why: </span> {improvement.reasoning}
                                    </p>
                                    <div className="ml-4 flex items-center gap-1.5 whitespace-nowrap bg-blue-500/10 text-blue-400 px-3 py-1.5 rounded-full border border-blue-500/20 font-semibold tracking-wide">
                                        <span>+{improvement.potential_score_increase}</span>
                                        <span>Pts Potential</span>
                                    </div>
                                </div>
                                {i !== improvements.length - 1 && <hr className="border-white/10" />}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
