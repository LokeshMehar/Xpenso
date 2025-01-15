
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "../components/Navbar";
import RootProviders from "@/components/providers/RootProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abracadabra",
  description: "Abracadabra is a magic app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl={"/auth/sign-in"}>
      <html
        lang="en"
        className="dark"
        style={{
          colorScheme: "dark",
        }}
      >
        <body className= {`${geistSans.className} ${geistMono.className}`}>
          <RootProviders>
            <Navbar />
            {children}
          </RootProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
