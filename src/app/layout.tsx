import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Font Awesome config
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import { LenisProvider, LoadingProvider } from "@/components";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["200", "400", "600", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Next Zen AI Strategix | Enterprise Intelligence",
  description:
    "Next Zen AI Strategix accelerates growth with AI, cloud, and automation built for scale, security, and real business impact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} antialiased selection:bg-zen selection:text-white`}
      >
        <LoadingProvider>
          <LenisProvider>{children}</LenisProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
