"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, CheckCircle2, AlertCircle, FileText, ChevronRight, Loader2 } from "lucide-react";

export default function Home() {
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            if (droppedFile.type !== "application/pdf") {
                setError("Please upload a PDF file.");
            } else if (droppedFile.size > MAX_FILE_SIZE) {
                setError("File is too large. Max size is 10MB.");
            } else {
                setFile(droppedFile);
                setError(null);
            }
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setIsLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append("file", file);

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        try {
            const response = await fetch(`${apiUrl}/api/evaluate`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.detail || "Failed to process resume");
            }

            setResult(data.evaluation);
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-mesh font-sans selection:bg-white selection:text-black">
            <div className="max-w-5xl mx-auto px-6 py-20">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-white/80 mb-6">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        AI-Powered Analysis
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent pb-2">
                        Resume Intelligence
                    </h1>
                    <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
                        Upload your resume and instantly receive a comprehensive, AI-driven evaluation on formatting, impact, and overall quality.
                    </p>
                </motion.div>

                {/* Content Area */}
                <AnimatePresence mode="wait">
                    {!result ? (
                        <motion.div
                            key="upload"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4 }}
                            className="max-w-2xl mx-auto"
                        >
                            <div
                                className={`relative group rounded-3xl border-2 border-dashed p-16 transition-all duration-300 ease-out bg-white/[0.02] backdrop-blur-xl ${file ? 'border-white/40 border-solid bg-white/[0.04]' : 'border-white/10 hover:border-white/30 hover:bg-white/[0.04]'
                                    }`}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={handleDrop}
                            >
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    onChange={(e) => {
                                        const selected = e.target.files?.[0];
                                        if (selected) {
                                            if (selected.type !== "application/pdf") {
                                                setError("Please upload a PDF file.");
                                            } else if (selected.size > MAX_FILE_SIZE) {
                                                setError("File is too large. Max size is 10MB.");
                                            } else {
                                                setFile(selected);
                                                setError(null);
                                            }
                                        }
                                    }}
                                />

                                <div className="flex flex-col items-center justify-center text-center">
                                    <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl border border-white/10">
                                        {file ? <FileText className="w-10 h-10 text-white/90" /> : <UploadCloud className="w-10 h-10 text-white/50 group-hover:text-white/90 transition-colors" />}
                                    </div>
                                    <h3 className="text-2xl font-semibold mb-2 text-white/90">
                                        {file ? file.name : "Drop your resume here"}
                                    </h3>
                                    <p className="text-white/40 max-w-sm">
                                        {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB • PDF format` : "Supports PDF format up to 10MB. Click to browse or drag and drop."}
                                    </p>
                                </div>
                            </div>

                            {error && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3">
                                    <AlertCircle className="w-5 h-5" />
                                    <p className="text-sm font-medium">{error}</p>
                                </motion.div>
                            )}

                            <div className="mt-10 flex justify-center">
                                <button
                                    onClick={handleUpload}
                                    disabled={!file || isLoading}
                                    className="relative overflow-hidden group bg-white text-black px-8 py-4 rounded-full font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Analyzing via AI...
                                            </>
                                        ) : (
                                            <>
                                                Evaluate Resume
                                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </span>
                                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, staggerChildren: 0.1 }}
                            className="flex flex-col space-y-8"
                        >
                            {/* Score Card - Horizontal */}
                            <div className="w-full border border-white/10 rounded-3xl bg-white/[0.02] backdrop-blur-xl p-8 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16" />

                                <div className="flex flex-col md:flex-row items-center gap-8 z-10">
                                    {/* Score Circle */}
                                    <div className="relative w-40 h-40 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle cx="80" cy="80" r="72" className="stroke-white/10" strokeWidth="8" fill="none" />
                                            <motion.circle
                                                initial={{ strokeDasharray: "0, 1000" }}
                                                animate={{ strokeDasharray: `${(result.score / 100) * 452}, 1000` }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                cx="80" cy="80" r="72"
                                                className={`stroke-current ${result.score >= 80 ? 'text-emerald-500' : result.score >= 60 ? 'text-amber-500' : 'text-rose-500'}`}
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
                                                {result.score}
                                            </motion.span>
                                            <span className="text-white/40 text-xs mt-1">/ 100</span>
                                        </div>
                                    </div>

                                    {/* Text Info */}
                                    <div className="flex flex-col text-center md:text-left">
                                        <h3 className="text-white/60 font-medium tracking-wide uppercase text-sm mb-2">Overall Quality Match</h3>
                                        <p className="text-2xl font-semibold text-white/90 max-w-md mb-4">
                                            {result.score >= 80 ? "Excellent resume! Ready for applications." : result.score >= 60 ? "Good foundation, but needs refinement." : "Needs significant improvement."}
                                        </p>
                                        <div className="flex items-center justify-center md:justify-start gap-3">
                                            <div className={`px-4 py-1.5 rounded-full text-xs font-medium border ${result.score >= 80 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : result.score >= 60 ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}`}>
                                                {result.score >= 80 ? 'High Priority Match' : result.score >= 60 ? 'Medium Priority Match' : 'Low Priority Match'}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => { setResult(null); setFile(null); }}
                                    className="mt-8 md:mt-0 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-white hover:bg-white/10 transition-colors z-10"
                                >
                                    <UploadCloud className="w-4 h-4" /> Analyze Another
                                </button>
                            </div>

                            {/* Feedback Breakdown */}
                            <div className="w-full space-y-6">

                                {/* Positives */}
                                {result.positives && result.positives.length > 0 && (
                                    <div className="border border-white/10 rounded-2xl bg-white/[0.02] backdrop-blur-xl p-6">
                                        <h3 className="flex items-center gap-2 text-emerald-400 font-semibold mb-4">
                                            <CheckCircle2 className="w-5 h-5" /> What You Did Well
                                        </h3>
                                        <ul className="space-y-3">
                                            {result.positives.map((item: string, i: number) => (
                                                <li key={i} className="flex gap-3 text-white/80 text-sm leading-relaxed">
                                                    <span className="text-emerald-500/50 mt-1">•</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Things to Improve */}
                                {result.feedback_tips && result.feedback_tips.length > 0 && (
                                    <div className="border border-white/10 rounded-2xl bg-white/[0.02] backdrop-blur-xl p-6">
                                        <h3 className="flex items-center gap-2 text-amber-400 font-semibold mb-4">
                                            <AlertCircle className="w-5 h-5" /> Primary Tips for Improvement
                                        </h3>
                                        <ul className="space-y-3">
                                            {result.feedback_tips.map((item: string, i: number) => (
                                                <li key={i} className="flex gap-3 text-white/80 text-sm leading-relaxed">
                                                    <span className="text-amber-500/50 mt-1">•</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Missing Elements */}
                                {result.missing_keywords_or_sections && result.missing_keywords_or_sections.length > 0 && (
                                    <div className="border border-white/10 rounded-2xl bg-white/[0.02] backdrop-blur-xl p-6">
                                        <h3 className="flex items-center gap-2 text-rose-400 font-semibold mb-4">
                                            <FileText className="w-5 h-5" /> Missing Structure / Keywords
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {result.missing_keywords_or_sections.map((item: string, i: number) => (
                                                <span key={i} className="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium">
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Suggested Improvements */}
                                {result.suggested_improvements && result.suggested_improvements.length > 0 && (
                                    <div className="border border-white/10 rounded-2xl bg-white/[0.02] backdrop-blur-xl p-6">
                                        <h3 className="flex items-center gap-2 text-blue-400 font-semibold mb-6">
                                            <FileText className="w-5 h-5" /> Rewrite Recommendations
                                        </h3>
                                        <div className="space-y-8">
                                            {result.suggested_improvements.map((improvement: any, i: number) => (
                                                <div key={i} className="flex flex-col space-y-4">
                                                    {/* Text Comparison */}
                                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                        {/* Original */}
                                                        <div className="p-4 rounded-xl bg-red-500/5 text-sm border border-red-500/10 relative">
                                                            <span className="absolute -top-3 left-4 bg-mesh px-2 text-xs font-semibold text-red-400">Original</span>
                                                            <p className="text-white/60 mt-1 line-through decoration-red-500/30">
                                                                "{improvement.original_text}"
                                                            </p>
                                                        </div>

                                                        {/* Improved */}
                                                        <div className="p-4 rounded-xl bg-emerald-500/10 text-sm border border-emerald-500/20 relative shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                                                            <span className="absolute -top-3 left-4 bg-mesh px-2 text-xs font-semibold text-emerald-400">Recommended</span>
                                                            <p className="text-emerald-50 font-medium mt-1">
                                                                "{improvement.improved_text}"
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Context & Score Impact */}
                                                    <div className="flex items-center justify-between text-xs px-2">
                                                        <p className="text-white/50 flex-1">
                                                            <span className="font-semibold text-white/70">Why: </span> {improvement.reasoning}
                                                        </p>
                                                        <div className="ml-4 flex items-center gap-1.5 whitespace-nowrap bg-blue-500/10 text-blue-400 px-3 py-1.5 rounded-full border border-blue-500/20 font-semibold tracking-wide">
                                                            <span>+{improvement.potential_score_increase}</span>
                                                            <span>Pts Potential</span>
                                                        </div>
                                                    </div>
                                                    {i !== result.suggested_improvements.length - 1 && <hr className="border-white/10" />}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}
