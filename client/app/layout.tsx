import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import { ToastProvider } from "@/components/ui/toast";
/*
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});*/

export const metadata: Metadata = {
  title: "MiniDiz - Sistema de Gestão Financeira para Igrejas",
  description:
    "Uma solução completa para gerenciar as finanças da sua igreja com facilidade e eficiência.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      > */}
      <body className={`antialiased dark`}>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
          <ToastProvider />
      </body>
    </html>
  );
}
