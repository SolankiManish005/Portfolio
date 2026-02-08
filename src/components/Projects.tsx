"use client";
import { projects } from "@/data/projects";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import FAQ from "./FAQ";

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const visibleProjects = showAll ? projects : projects.slice(0, 3);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setVisibleCards((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.1 },
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [visibleProjects]);

  return (
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 animate-slideUp">
        Projects
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 animate-slideUp animate-delay-100">
        Featured Projects
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 cursor-pointer">
        {visibleProjects.map((project, index) => (
          <div
            key={index}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            data-index={index}
            className={`bg-white dark:bg-neutral-900 rounded-2xl border border-gray-200 dark:border-neutral-800 p-6 flex flex-col justify-between hover:shadow-xl hover:border-primary transition-all duration-300 hover:-translate-y-1 ${
              visibleCards.includes(index) ? "animate-fadeIn" : "opacity-0"
            }`}
            style={{ animationDelay: `${(index % 3) * 0.1}s` }}
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 hover:text-indigo-500">
                {project.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="text-sm px-3 py-1 rounded-full bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-neutral-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="text-sm px-4 py-2 rounded-lg bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 mb-5">
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  Role:
                </span>{" "}
                {project.role}
              </div>
            </div>

            <Link
              href={project.link || "#"}
              target="_blank"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              View Project
              <ExternalLink size={15} />
            </Link>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        {!showAll && projects.length > 3 && (
          <button
            onClick={() => setShowAll(true)}
            className="px-6 py-3 rounded-lg border border-gray-300 dark:border-neutral-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-800 transition hover:scale-105"
          >
            Show All {projects.length} Projects
          </button>
        )}

        {showAll && (
          <button
            onClick={() => {
              setShowAll(false);
              window.scrollTo({
                top: document.getElementById("projects")?.offsetTop ?? 0,
                behavior: "smooth",
              });
            }}
            className="px-6 py-3 rounded-lg border border-gray-300 dark:border-neutral-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-800 transition hover:scale-105"
          >
            Show Less Projects
          </button>
        )}
      </div>
      <FAQ />
    </div>
  );
}
