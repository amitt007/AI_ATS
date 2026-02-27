"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";

interface FileUploadProps {
    file: File | null;
    onDrop: (e: React.DragEvent) => void;
    onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
    maxSize: number;
}

export const FileUpload = ({ file, onDrop, onFileSelect, maxSize }: FileUploadProps) => {
    return (
        <div
            className={`relative group p-10 md:p-14 w-full editorial-border rounded transition-all duration-500 ease-in-out ${file ? 'bg-zinc-900 border-zinc-500' : 'bg-zinc-950 hover:bg-zinc-900/80 cursor-pointer hover:border-zinc-700'
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
                {file ? (
                    <div className="flex flex-col items-center gap-5 text-center">
                        <div className="w-16 h-16 bg-white rounded flex items-center justify-center shadow-lg">
                            <FileText className="w-8 h-8 text-black" strokeWidth={1.5} />
                        </div>
                        <div>
                            <h3 className="text-white font-sans font-medium text-lg tracking-tight mb-2">
                                {file.name}
                            </h3>
                            <p className="text-zinc-500 font-mono text-xs tracking-widest uppercase">
                                READINESS VERIFIED • {(file.size / 1024 / 1024).toFixed(2)}MB
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-6 w-full">
                        <div className="w-16 h-16 rounded-full border border-zinc-800 bg-zinc-900 flex items-center justify-center transition-transform group-hover:scale-110 duration-500">
                            <FileText className="w-6 h-6 text-zinc-400" strokeWidth={1.5} />
                        </div>

                        <div className="text-center">
                            <h3 className="text-white font-serif italic text-2xl mb-3">
                                Upload Resume
                            </h3>
                            <p className="text-zinc-500 font-sans text-sm leading-relaxed max-w-sm mx-auto">
                                Drag and drop your PDF here, or click to browse files.
                                <br />
                                <span className="font-mono text-[10px] tracking-widest uppercase mt-4 block text-zinc-600">
                                    Limit: {(maxSize / 1024 / 1024).toFixed(0)}MB
                                </span>
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
