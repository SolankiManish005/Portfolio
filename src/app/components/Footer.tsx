import { Github, Linkedin, InstagramIcon } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 inset-x-0 bg-white/90 dark:bg-black/90 text-gray-700 dark:text-gray-300 backdrop-blur border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 overflow-x-hidden">
        <p className="text-sm text-center sm:text-left">
          &copy; 2025 Manish. All rights reserved.
        </p>

        <div className="flex gap-3">
          <Link
            href="https://github.com/SolankiManish005"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2 border border-gray-300 dark:border-gray-700 rounded-full transition-colors bg-white dark:bg-black text-gray-800 dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
          >
            <Github size={20} />
          </Link>

          <Link
            href="https://www.linkedin.com/in/manish-solanki-b787b1357/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-2 border border-gray-300 dark:border-gray-700 rounded-full transition-colors bg-white dark:bg-black text-gray-800 dark:text-white hover:bg-blue-700 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white"
          >
            <Linkedin size={20} />
          </Link>

          <Link
            href="https://www.instagram.com/_manish_solanki_512/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="p-2 border border-gray-300 dark:border-gray-700 rounded-full transition-colors bg-white dark:bg-black text-gray-800 dark:text-white hover:bg-pink-500 hover:text-white dark:hover:bg-pink-400 dark:hover:text-white"
          >
            <InstagramIcon size={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
