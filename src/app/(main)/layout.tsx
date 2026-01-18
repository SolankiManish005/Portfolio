import "../globals.css";
import { ThemeProvider } from "next-themes";
import { Playfair_Display, Inter } from "next/font/google";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-1 pb-16">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
