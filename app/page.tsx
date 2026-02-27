"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Upload, AlertCircle, Loader2, CheckCircle2, ChevronRight, ChevronLeft, Activity, Target, Zap, Layout, ArrowRight, RefreshCw, Cpu, Database, Network } from "lucide-react";
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
        <main className="min-h-screen bg-black font-sans selection:bg-white selection:text-black">
            <div className="max-w-7xl mx-auto px-6 py-10 pb-40">
                <AnimatePresence mode="wait">
                    {!result ? (
                        <motion.div
                            key="upload"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4 }}
                            className="relative min-h-[70vh] pt-4 lg:pt-8"
                        >
                            {/* Hero Section */}
                            <div className="flex flex-col items-start max-w-7xl text-left">
                                <div className="inline-flex w-max items-center gap-2 px-0 py-1 text-[9px] font-mono font-bold text-[#00ff41] uppercase tracking-[0.3em] mb-12">
                                    <Activity size={12} className="active-glow-green" />
                                    NEURAL_ANALYSIS_ENGINE_V2.0
                                </div>

                                <div className="space-y-2 mb-12">
                                    <h1 className="text-[clamp(3.5rem,10vw,7rem)] font-sans font-black leading-[0.8] tracking-tighter text-[#00ff41] uppercase text-glow-green">
                                        Resume
                                    </h1>
                                    <h1 className="text-[clamp(3.5rem,10vw,7rem)] font-sans font-black leading-[0.8] tracking-tighter text-[#00ff41]/10 uppercase">
                                        Intelligence
                                    </h1>
                                </div>

                                <div className="max-w-xl mb-20">
                                    <p className="text-[#00ff41]/40 font-mono text-[10px] tracking-[0.2em] uppercase leading-relaxed text-left">
                                        Initiate high-fidelity data extraction for deep-tier semantic evaluation of professional impact, narrative clarity, and cross-system compatibility.
                                    </p>
                                </div>

                                {/* Upload Section */}
                                <div className="w-full max-w-2xl flex flex-col items-end gap-12 ml-auto mt-20">
                                    <div className="w-full">
                                        <FileUpload
                                            file={file}
                                            onDrop={handleDrop}
                                            onFileSelect={handleFileSelect}
                                            maxSize={MAX_FILE_SIZE}
                                        />

                                        {error && (
                                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full bg-red-950/20 border-r-2 border-red-500 p-4 mt-6 text-right">
                                                <div className="flex items-center justify-end gap-3">
                                                    <span className="font-mono text-[9px] text-red-500 font-bold uppercase tracking-widest">Protocol_Error // {error}</span>
                                                    <AlertCircle className="w-4 h-4 text-red-500" />
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>

                                    <div className="flex justify-end w-full">
                                        <button
                                            onClick={handleUpload}
                                            disabled={!file || isLoading}
                                            className="group relative editorial-corners p-5 md:p-6 transition-all duration-500 bg-black/40 disabled:opacity-30 disabled:cursor-not-allowed"
                                        >
                                            <div className="relative z-10 flex items-center gap-6 px-4">
                                                <div className="flex items-center">
                                                    {isLoading ? (
                                                        <Loader2 className="w-4 h-4 animate-spin text-[#00ff41]" />
                                                    ) : (
                                                        <ChevronLeft className="w-4 h-4 text-[#00ff41]/30 group-hover:text-[#00ff41]/80 group-hover:active-glow-green transition-all duration-500" />
                                                    )}
                                                </div>
                                                <span className="text-[#00ff41]/50 group-hover:text-[#00ff41]/80 font-mono font-bold text-[11px] tracking-[0.4em] uppercase group-hover:text-glow-green transition-all duration-500">
                                                    {isLoading ? "Processing_Payload..." : "Execute_Analysis"}
                                                </span>
                                            </div>
                                        </button>
                                    </div>
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
                            {/* Results Header: Mirroring SYSTEM_DIAGNOSTICS style */}
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-[#00ff41]/20">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 font-mono text-[9px] text-[#00ff41]/50 tracking-[0.3em] uppercase">
                                        <span className="text-[#00ff41] font-bold active-glow-green">&gt;_</span>
                                        EVALUATION_LOG // ENTRY_SUCCESS
                                    </div>
                                    <h2 className="text-5xl md:text-6xl font-sans font-black uppercase tracking-tighter text-[#00ff41] text-glow-green">
                                        Evaluation Result
                                    </h2>
                                </div>
                                <button
                                    onClick={() => { setResult(null); setFile(null); setError(null); }}
                                    className="group flex items-center gap-3 font-mono text-[10px] font-bold text-[#00ff41]/60 hover:text-[#00ff41]/80 border border-zinc-700 hover:border-[#00ff41]/60 bg-white/0 hover:bg-[#08100A] rounded-sm px-8 py-4 transition-all tracking-[0.2em] uppercase"
                                >
                                    <Activity size={14} className="group-hover:rotate-180 transition-transform duration-500" />
                                    Initialize_New_Scan
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
