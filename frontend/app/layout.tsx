import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "AI ATS Resume Scorer",
    description: "Evaluate your resume's overall quality and impact.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
