"use client";

import { motion } from "framer-motion";
import { UploadCloud, FileText } from "lucide-react";

interface FileUploadProps {
    file: File | null;
    onDrop: (e: React.DragEvent) => void;
    onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
    maxSize: number;
}

export const FileUpload = ({ file, onDrop, onFileSelect, maxSize }: FileUploadProps) => {
    return (
        <div
            className={`relative group rounded-3xl border-2 border-dashed p-16 transition-all duration-300 ease-out bg-white/[0.02] backdrop-blur-xl ${file ? 'border-white/40 border-solid bg-white/[0.04]' : 'border-white/10 hover:border-white/30 hover:bg-white/[0.04]'
                }`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
        >
            <input
                type="file"
                accept="application/pdf"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                onChange={onFileSelect}
            />

            <div className="flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl border border-white/10">
                    {file ? <FileText className="w-10 h-10 text-white/90" /> : <UploadCloud className="w-10 h-10 text-white/50 group-hover:text-white/90 transition-colors" />}
                </div>
                <h3 className="text-2xl font-semibold mb-2 text-white/90">
                    {file ? file.name : "Drop your resume here"}
                </h3>
                <p className="text-white/40 max-w-sm">
                    {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB • PDF format` : `Supports PDF format up to ${maxSize / 1024 / 1024}MB. Click to browse or drag and drop.`}
                </p>
            </div>
        </div>
    );
};
