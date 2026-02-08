"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { trackVisitor } from "@/utils/visitor";

export default function VIPWelcome() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const visitCount = trackVisitor();
      const hasSeen = sessionStorage.getItem("hasSeenWelcome");

      if (!hasSeen && visitCount > 1) {
        sessionStorage.setItem("hasSeenWelcome", "true");
        setShow(true);
      }
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      setShow(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="relative max-w-md w-full rounded-2xl p-8 text-center bg-white dark:bg-zinc-900 text-gray-900 dark:text-white shadow-2xl animate-fadeIn">
        <button
          onClick={() => setShow(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="text-5xl mb-4">🚀</div>

        <h2 className="text-2xl font-bold mb-2">You&apos;re Back!</h2>

        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Thanks for being a regular visitor
        </p>

        <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold bg-black text-white dark:bg-white dark:text-black">
          VIP Experience ✨
        </span>
      </div>
    </div>
  );
}
