import "./globals.css";
import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Contact Me | Manish Solanki – MERN Developer",
  metadataBase: new URL("https://solankimanish.dev/"),
  description:
    "Contact Manish Solanki, MERN Stack Developer from India, for freelance work, projects, and collaborations.",
  keywords: [
    "Manish Solanki",
    "MERN Developer",
    "React Developer",
    "Next.js Developer",
    "Freelance Web Developer India",
    "Contact MERN Developer",
  ],
  openGraph: {
    title: "Contact Me | Manish Solanki",
    description: "Get in touch for MERN stack projects and collaborations.",
    url: "https://solankimanish.dev/",
    siteName: "Manish Solanki Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Manish Solanki Portfolio",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-white dark:bg-black">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
