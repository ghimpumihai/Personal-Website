import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Portfolio | Software Engineering Student",
  description: "Personal portfolio showcasing my software engineering projects, technical skills, and career experience.",
  openGraph: {
    title: "Portfolio | Software Engineering Student",
    description: "Personal portfolio showcasing my software engineering projects, technical skills, and career experience.",
    url: "https://your-portfolio-domain.com",
    siteName: "Software Engineer Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Software Engineering Student",
    description: "Personal portfolio showcasing my software engineering projects, technical skills, and career experience.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50 flex flex-col`}
      >
        <ThemeProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
