import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono, DM_Serif_Display } from "next/font/google";
import "./globals.css";

// Using distinctive fonts: DM Serif Display for headings, Space Mono for code/numbers
const dmSerif = DM_Serif_Display({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-display",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
});

const spaceGrotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "ArcLearn — Student Dashboard",
  description: "Next-generation learning platform dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${dmSerif.variable} ${spaceMono.variable} ${spaceGrotesk.variable} font-body bg-space-950 text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
