import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/ui/Navbar";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { styleText } from "util";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Remind me",
  description: "Simple reminder app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark" style={{
        colorScheme: "dark"
      }}>
        <body>
          <ThemeProvider>
          <header>
          </header>
         <div className="flex min-h-screen w-full flex-col items-center dark:bg-black">
          <Navbar/>
          <Separator/>
          <main className="flex flex-grow w-full justify-center items-center dark:bg-neutral-950">
            {children}
            <Toaster/>
            </main>
          </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
