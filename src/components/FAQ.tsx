"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/data/faq";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white my-8">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className="rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between px-4 py-3 text-left"
              >
                <span className="text-base font-medium text-gray-900 dark:text-white">
                  {faq.question}
                </span>

                <ChevronDown
                  className={`text-gray-500 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden px-4 pb-3 text-sm text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
