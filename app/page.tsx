"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, ChevronRight, Loader2 } from "lucide-react";
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
                            <FileUpload
                                file={file}
                                onDrop={handleDrop}
                                onFileSelect={handleFileSelect}
                                maxSize={MAX_FILE_SIZE}
                            />

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
                            <ScoreCard
                                score={result.score}
                                onAnalyzeAnother={() => { setResult(null); setFile(null); }}
                            />

                            <FeedbackList
                                positives={result.positives}
                                tips={result.feedback_tips}
                                missing={result.missing_keywords_or_sections}
                                improvements={result.suggested_improvements}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}
