"use client";

import { experience } from "@/data/experience";

export default function Experience() {
  return (
    <section className="pt-16 pb-30">
      <h2 className="mb-10 text-3xl font-bold">Experience</h2>

      <div className="space-y-10">
        {experience.map((item, index) => (
          <div
            key={index}
            className="relative border-l-2 border-gray-300 dark:border-gray-700 pl-6"
          >
            <div className="absolute -left-1.75 top-1 h-3 w-3 rounded-full bg-primary" />

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {item.title}
            </h3>

            <p className="mb-1 text-gray-500 dark:text-gray-400">
              {item.company}
            </p>

            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              {item.duration}
            </p>

            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
