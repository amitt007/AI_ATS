"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlaskConical, Terminal, Activity, Loader2, Cpu, AlertCircle, ChevronRight } from "lucide-react";
import { FileUpload } from "./components/FileUpload";
import { ScoreCard } from "./components/ScoreCard";
import { FeedbackList } from "./components/FeedbackList";

export default function Home() {
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files?.[0];
        if (droppedFile) validateAndSetFile(droppedFile);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) validateAndSetFile(selected);
    };

    const validateAndSetFile = (selectedFile: File) => {
        if (selectedFile.type !== "application/pdf") {
            setError("Please upload a PDF file.");
        } else if (selectedFile.size > MAX_FILE_SIZE) {
            setError("File is too large. Max size is 10MB.");
        } else {
            setFile(selectedFile);
            setError(null);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setIsLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/evaluate", {
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
        <main className="min-h-screen bg-editorial-dark font-sans selection:bg-white selection:text-black">
            <div className="max-w-7xl mx-auto px-6 py-20 pb-40">
                <AnimatePresence mode="wait">
                    {!result ? (
                        <motion.div
                            key="upload"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 min-h-[70vh] items-center"
                        >
                            {/* Left Column: Typography */}
                            <div className="flex flex-col justify-center order-2 lg:order-1 pt-12 lg:pt-0">
                                <div className="inline-flex w-max items-center gap-2 px-3 py-1 rounded-sm border border-zinc-800 bg-zinc-900/50 text-[10px] font-mono font-medium text-zinc-400 uppercase tracking-widest mb-10">
                                    <Activity size={12} />
                                    ATS SCORING ALGORITHM V2.0
                                </div>
                                <h1 className="text-[clamp(4rem,10vw,8rem)] font-serif italic font-medium leading-[0.85] tracking-tight mb-8 text-white">
                                    Resume<br />
                                    <span className="text-zinc-500 font-sans not-italic font-black tracking-tighter uppercase text-[clamp(3.5rem,8vw,7rem)] block mt-2">
                                        Intelligence
                                    </span>
                                </h1>
                                <p className="text-zinc-400 font-sans text-sm md:text-base leading-relaxed max-w-xl">
                                    An elite semantic evaluation engine that dissects your professional narrative
                                    across formatting, impact, and cross-system compatibility.
                                </p>
                            </div>

                            {/* Right Column: Upload Box */}
                            <div className="flex flex-col justify-center w-full max-w-xl mx-auto lg:ml-auto order-1 lg:order-2">
                                <FileUpload
                                    file={file}
                                    onDrop={handleDrop}
                                    onFileSelect={handleFileSelect}
                                    maxSize={MAX_FILE_SIZE}
                                />

                                {error && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full editorial-border bg-red-950/20 p-4 md:p-6 mt-6 flex items-start gap-4">
                                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                        <div className="flex flex-col">
                                            <span className="font-mono text-xs text-red-500 font-bold uppercase tracking-widest mb-1">Parsing Error</span>
                                            <span className="font-sans text-sm text-red-400/80">{error}</span>
                                        </div>
                                    </motion.div>
                                )}

                                <div className="mt-8 flex justify-end">
                                    <button
                                        onClick={handleUpload}
                                        disabled={!file || isLoading}
                                        className="relative overflow-hidden group border border-zinc-800 hover:border-white text-zinc-300 hover:text-black hover:bg-white px-8 py-4 bg-zinc-950 rounded-sm font-sans font-medium text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                                    >
                                        <span className="relative z-10 flex items-center gap-3">
                                            {isLoading ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin text-zinc-400 group-hover:text-zinc-600" />
                                                    Evaluating...
                                                </>
                                            ) : (
                                                <>
                                                    Run Analysis
                                                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                                </>
                                            )}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, staggerChildren: 0.1 }}
                            className="flex flex-col space-y-12"
                        >
                            {/* Results Header */}
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-900">
                                <div>
                                    <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-500 tracking-widest uppercase mb-4">
                                        <Terminal className="w-3 h-3" />
                                        ATS REPORT GENERATED
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-serif italic text-white tracking-tight">
                                        Evaluation <span className="font-sans font-black not-italic tracking-tighter">Results</span>
                                    </h2>
                                </div>
                                <button
                                    onClick={() => { setResult(null); setFile(null); setError(null); }}
                                    className="flex items-center gap-2 font-sans text-xs font-medium text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-500 bg-zinc-950 rounded-sm px-6 py-3 transition-colors"
                                >
                                    Upload New Resume
                                </button>
                            </div>

                            <FeedbackList
                                positives={result.positives || []}
                                tips={result.feedback_tips || []}
                                missing={result.missing_keywords_or_sections || []}
                                improvements={result.suggested_improvements || []}
                                score={result.score} // Notice: Add a score prop so it can render the ScoreCard in its grid
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}
