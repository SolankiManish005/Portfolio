"use client";
import Skills from "./Skills";

export default function Experience() {
  return (
    <section className="bg-gray-50 dark:bg-black/10">
      <div className="max-w-7xl mx-auto px-6">
        <section className="py-10">
          <h1 className="font-bold mb-6 md:text-5xl text-4xl">About Me</h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">
            I’m a MERN Stack Developer who enjoys building beautiful and
            performant web apps.
          </p>
          <br />
          <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">
            With expertise in modern JavaScript frameworks and libraries, I
            build responsive interfaces that provide excellent user experiences
            across all devices.
          </p>
          <br />
          <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">
            When I'm not coding, you can find me exploring new technologies,
            contributing to open-source projects, or enjoying outdoor
            activities.
          </p>
        </section>

        <section className="pt-16 pb-30">
          <h2 className="font-bold mb-10 text-3xl">Experience</h2>
          <div className="space-y-10">
            <div className="relative border-l-2 border-gray-300 dark:border-gray-700 pl-6 opacity-100 transform-none">
              <div className="absolute -left-[-7px] top-1 h-3 w-3 rounded-full bg-primary"></div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Junior MERN Stack Developer
              </h3>
              <p className="mb-1 text-gray-500 dark:text-gray-400">
                Anansi Techsol LLP
              </p>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                October 2025 - Present
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Leading scalable MERN applications using MVC architecture and
                real-time data integration. Responsible for code quality,
                deployments, and mentoring interns.
              </p>
            </div>
            <br />
            <div className="relative border-l-2 border-gray-300 dark:border-gray-700 pl-6 opacity-100 transform-none">
              <div className="absolute -left-[-7px] top-1 h-3 w-3 rounded-full bg-primary"></div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Internship - MERN Stack Developer
              </h3>
              <p className="mb-1 text-gray-500 dark:text-gray-400">
                Infydots Technologies
              </p>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                May 2025 - September 2025
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Contributed to backend systems using Node.js and Express.js,
                focusing on API performance, secure data flow, and scalable
                enterprise solutions.
              </p>
            </div>
            <br />
            <div className="relative border-l-2 border-gray-300 dark:border-gray-700 pl-6 opacity-100 transform-none">
              <div className="absolute -left-[-7px] top-1 h-3 w-3 rounded-full bg-primary"></div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Trainee
              </h3>
              <p className="mb-1 text-gray-500 dark:text-gray-400">
                Divine ERP Solutions Pvt. Ltd.
              </p>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                October 2024 - April 2025
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Contributed to backend systems using Node.js and Express.js,
                focusing on API performance, secure data flow, and scalable
                enterprise solutions.
              </p>
            </div>
          </div>
        </section>

        <Skills />
      </div>
    </section>
  );
}
