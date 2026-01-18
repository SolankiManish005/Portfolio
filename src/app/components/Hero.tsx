"use client";

import { Download } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="md:h-[calc(100vh-8.1rem)] flex items-center bg-white dark:bg-black text-gray-900 dark:text-white transition-colors">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center pt-2">
        {/* Left Content */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
            Hi, I'm
          </h1>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight text-indigo-500">
            Manish Solanki
          </h1>

          <p className="mt-4 text-gray-600 dark:text-gray-300 text-base sm:text-lg font-bold">
            Nice to meet you.
          </p>

          <p className="mt-2 text-gray-600 dark:text-gray-300 font-bold">
            Full-stack Developer • MERN Stack • Open Source Contributor
          </p>

          {/* Buttons */}
          <div className="mt-8 flex justify-center md:justify-start">
            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg transition bg-white dark:bg-black text-gray-900 dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
            >
              <Download size={18} />
              Download Resume
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-end">
          <Image
            src="/profile.jpg"
            alt="Profile"
            width={280}
            height={280}
            priority
            className="rounded-full border-4 border-gray-300 dark:border-gray-700 shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
