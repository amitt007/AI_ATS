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
            className={`relative group p-8 md:p-12 w-full industrial-border rounded-lg transition-colors duration-300 ${file ? 'bg-black/60 border-lime-500/30' : 'bg-black/40 hover:bg-black/60 cursor-pointer'
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

            {/* Corner Brackets */}
            <div className="absolute top-4 left-4 w-4 h-4 border-l border-t border-zinc-800 transition-colors group-hover:border-zinc-600" />
            <div className="absolute top-4 right-4 w-4 h-4 border-r border-t border-zinc-800 transition-colors group-hover:border-zinc-600" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-l border-b border-zinc-800 transition-colors group-hover:border-zinc-600" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-r border-b border-zinc-800 transition-colors group-hover:border-zinc-600" />

            <div className="flex flex-col items-center justify-center text-center">
                {file ? (
                    <div className="flex flex-col items-center gap-4 text-center">
                        <div className="w-12 h-12 bg-lime-500/10 rounded flex items-center justify-center border border-lime-500/30">
                            <FileText className="w-6 h-6 text-lime-400" />
                        </div>
                        <div>
                            <h3 className="text-white font-mono text-sm tracking-wider uppercase mb-1">
                                {file.name}
                            </h3>
                            <p className="text-lime-400/80 font-mono text-[10px] tracking-widest">
                                PAYLOAD_SECURED // {(file.size / 1024 / 1024).toFixed(2)}MB
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-6 w-full">
                        {/* Scanning Laser Icon */}
                        <div className="flex flex-col items-center justify-center h-12 w-12 rounded border border-zinc-800 bg-zinc-900/50 overflow-hidden relative">
                            <motion.div
                                className="absolute top-0 w-full h-[1px] bg-lime-400/50 shadow-[0_0_8px_rgba(163,230,53,0.5)]"
                                animate={{ y: [0, 48, 0] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 2,
                                    ease: "linear",
                                }}
                            />
                        </div>

                        <div className="text-center">
                            <h3 className="text-white font-bold tracking-widest text-lg uppercase mb-2">
                                INITIATE_SCAN_SEQUENCE
                            </h3>
                            <p className="text-zinc-400 font-mono text-[11px] md:text-xs tracking-[0.2em] leading-relaxed uppercase">
                                DROP PDF PAYLOAD OR AUTHORIZE<br />
                                LOCAL ACCESS<br />
                                <span className="opacity-50">SYSTEM_STANDARD: V2.0 // {(maxSize / 1024 / 1024).toFixed(0)}MB_LIMIT</span>
                            </p>
                        </div>
                    </div>
                )}

                {/* Tech Bar */}
                <div className="w-full mt-8 pt-4 border-t border-zinc-800/80 flex justify-between items-center text-[9px] font-mono tracking-widest">
                    <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${file ? 'bg-lime-500' : 'bg-emerald-500 animate-pulse'}`} />
                        <span className="text-zinc-500">READY</span>
                        <span className="text-zinc-700 ml-2">BUFFER: {file ? 'LOADED' : 'CLEAR'}</span>
                    </div>
                    <span className="text-zinc-700 hidden sm:inline-block">EXTRACT_PROTOCOL: 0X42F</span>
                </div>
            </div>
        </div>
    );
};
