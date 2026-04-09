import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VIPWelcome from "@/components/VIPWelcome";
import AIChatbot from "@/components/AIChatbot";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <VIPWelcome />
      <main className="flex-1 pb-16">{children}</main>
      <Footer />
      <AIChatbot />
    </div>
  );
}
