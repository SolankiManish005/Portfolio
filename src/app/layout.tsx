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
  metadataBase: new URL("https://solankimanish.dev"),

  title: {
    default: "Manish Solanki | MERN Stack Developer",
    template: "%s | Manish Solanki",
  },

  description:
    "Manish Solanki is a MERN Stack Developer from India specializing in React, Next.js, Node.js, and MongoDB. Available for freelance projects and collaborations.",

  applicationName: "Manish Solanki Portfolio",

  authors: [{ name: "Manish Solanki", url: "https://solankimanish.dev" }],
  creator: "Manish Solanki",
  publisher: "Manish Solanki",

  alternates: {
    canonical: "https://solankimanish.dev",
  },

  keywords: [
    "Manish Solanki",
    "MERN Stack Developer",
    "React.js Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Freelance Web Developer India",
    "Web Developer Portfolio",
    "Web Developer",
  ],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon2.ico", sizes: "any" },
      { url: "/favicon2.ico", type: "image/x-icon" },
    ],
    shortcut: "/favicon2.ico",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    title: "Manish Solanki | MERN Stack Developer",
    description:
      "Portfolio of Manish Solanki — MERN Stack Developer building scalable web applications using React, Next.js, Node.js, and MongoDB.",
    url: "https://solankimanish.dev",
    siteName: "Manish Solanki Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Manish Solanki – MERN Stack Developer Portfolio",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Manish Solanki | MERN Stack Developer",
    description:
      "MERN Stack Developer from India specializing in React, Next.js, Node.js & MongoDB.",
    images: ["/og-image.png"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Manish Solanki",
              url: "https://solankimanish.dev",
              jobTitle: "MERN Stack Developer",
              sameAs: [
                "https://github.com/SolankiManish005",
                "https://www.linkedin.com/in/manish-solanki-b787b1357/",
              ],
              worksFor: {
                "@type": "Organization",
                name: "Freelance",
              },
              knowsAbout: [
                "React",
                "Next.js",
                "Node.js",
                "MongoDB",
                "JavaScript",
                "Web Development",
              ],
            }),
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
