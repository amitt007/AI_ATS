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
            className={`editorial-corners relative group p-12 md:p-16 w-full transition-all duration-500 ease-in-out bg-black/20`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
        >
            <div className="relative z-10 w-full h-full"> {/* Container for the first-child selector in CSS */}
                <input
                    type="file"
                    accept="application/pdf"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    onChange={onFileSelect}
                />

                <div className="flex flex-col items-center justify-center text-center">
                    {file ? (
                        <div className="flex flex-col items-center gap-6 text-center">
                            <div className="flex flex-col items-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse active-glow-green mb-4" />
                                <h3 className="text-[#00ff41] font-mono text-sm tracking-[0.2em] font-bold uppercase mb-2">
                                    PAYLOAD_LOCKED
                                </h3>
                                <p className="text-[#00ff41]/50 font-mono text-[9px] tracking-[0.3em] uppercase">
                                    {file.name} // {(file.size / 1024 / 1024).toFixed(2)}MB
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-8 w-full">
                            <div className="flex flex-col items-center gap-2 group-hover:active-glow-green transition-all duration-500">
                                <div className="h-px w-8 bg-[#08100A] group-hover:bg-[#00ff41] group-hover:shadow-[0_0_8px_rgba(0,255,65,0.8)] transition-all duration-500" />
                                <div className="h-px w-12 bg-[#00ff41]/10 group-hover:bg-[#00ff41] group-hover:shadow-[0_0_12px_rgba(0,255,65,0.9)] transition-all duration-500" />
                                <div className="h-px w-8 bg-[#08100A] group-hover:bg-[#00ff41] group-hover:shadow-[0_0_8px_rgba(0,255,65,0.8)] transition-all duration-500" />
                            </div>

                            <div className="text-center">
                                <h3 className="text-[#00ff41] font-mono font-black text-sm tracking-[0.4em] uppercase mb-4">
                                    Initiate_Scan_Sequence
                                </h3>
                                <p className="text-[#00ff41]/40 font-mono text-[9px] tracking-[0.2em] uppercase leading-relaxed max-w-xs mx-auto">
                                    Drop PDF Payload or Authorize Local Access
                                    <br />
                                    <span className="text-[#00ff41]/20 mt-4 block">
                                        SYSTEM_STANDARD: V2.0 // {(maxSize / 1024 / 1024).toFixed(0)}MB_LIMIT
                                    </span>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
