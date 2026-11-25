import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FitLogProvider } from "@/context/FitLogContext";
import { Toaster } from "sonner";


export const metadata: Metadata = {
  title: "FitLog | Workout Library",
  description: "Train with intent. Log every set.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <FitLogProvider>
          <Navbar />
          {children}
          <Footer />
          <Toaster theme="dark" position="top-right" />
        </FitLogProvider>
      </body>
    </html>
  );
}
