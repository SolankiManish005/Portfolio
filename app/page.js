import Image from "next/image";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header */}
      <header className="bg-white shadow p-4 flex flex-col md:flex-row justify-between items-center">
        <Image
          src="/favicon.png"
          alt="SM Logo"
          width={40}
          height={40}
          className="rounded-full"
        />
        <h1 className="text-2xl font-bold text-gray-800">
          Manish | MERN Stack Developer
        </h1>
        <nav className="mt-2 md:mt-0">
          <a href="#about" className="mx-2 text-gray-600 hover:underline">
            About
          </a>
          <a href="#projects" className="mx-2 text-gray-600 hover:underline">
            Projects
          </a>
          <a href="#contact" className="mx-2 text-gray-600 hover:underline">
            Contact
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center p-10 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <h2 className="text-4xl font-bold mb-4">Hi, I'm Manish 👋</h2>
        <p className="text-lg mb-4">A MERN Stack Developer</p>
        <p className="text-lg mb-6">
          I specialize in building modern web interfaces using MongoDB, Express,
          React, and Node.js.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="#projects"
            className="bg-white text-blue-600 font-semibold px-4 py-2 rounded hover:bg-gray-200"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="bg-transparent border border-white text-white font-semibold px-4 py-2 rounded hover:bg-white hover:text-blue-600"
          >
            Contact Me
          </a>
        </div>
      </section>

      {/* About Me */}
      <section id="about" className="p-8 bg-white text-center">
        <h3 className="text-3xl font-semibold mb-4">About Me</h3>
        <p className="text-gray-700 mb-4">
          I'm a passionate and self-driven MERN Stack Developer who thrives on
          building fast, responsive, and user-friendly web applications. With
          hands-on experience in MongoDB, Express.js, React.js, and Node.js, I
          love turning complex problems into elegant, scalable solutions.
        </p>
        <p className="text-gray-700 mb-4">
          My development journey began with curiosity and has grown into a
          full-fledged commitment to continuous learning and delivering
          real-world projects. Whether it's crafting intuitive UIs or connecting
          robust backend APIs, I aim to create seamless digital experiences.
        </p>
        <h4 className="text-xl font-semibold mt-6 mb-2">Skills</h4>
        <div className="flex justify-center flex-wrap gap-4 mb-4">
          <span className="bg-gray-200 px-4 py-2 rounded">MongoDB</span>
          <span className="bg-gray-200 px-4 py-2 rounded">Express.js</span>
          <span className="bg-gray-200 px-4 py-2 rounded">React.js</span>
          <span className="bg-gray-200 px-4 py-2 rounded">Node.js</span>
          <span className="bg-gray-200 px-4 py-2 rounded">JavaScript</span>
          <span className="bg-gray-200 px-4 py-2 rounded">Tailwind CSS</span>
          <span className="bg-gray-200 px-4 py-2 rounded">Next.js</span>
          <span className="bg-gray-200 px-4 py-2 rounded">Bootstrap</span>
        </div>
        <a
          href="Manish_Resume.pdf"
          download
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Download Resume
        </a>
      </section>

      {/* Projects */}
      <section id="projects" className="p-8">
        <h3 className="text-3xl font-semibold mb-6 text-center">Projects</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Task Manager */}
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg">
            <h4 className="text-xl font-bold mb-2">Task Manager</h4>
            <p className="text-gray-700 mb-2">
              A full-stack task manager app with CRUD operations using MERN.
            </p>
            <p className="text-sm text-gray-600">
              MongoDB, Express, React, Node.js
            </p>
            <a
              href="https://github.com/solankimanish005"
              target="_blank"
              className="text-blue-500 underline"
            >
              View Project
            </a>
          </div>

          {/* TextUtils-React */}
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg">
            <h4 className="text-xl font-bold mb-2">TextUtils-React</h4>
            <p className="text-gray-700 mb-2">
              A text utility app built using React that manipulates text in
              different ways.
            </p>
            <p className="text-sm text-gray-600">HTML, React</p>
            <a
              href="https://github.com/solankimanish005/TextUtils-React"
              target="_blank"
              className="text-blue-500 underline"
            >
              View Project
            </a>
          </div>

          {/* NewsMonkey-React */}
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg">
            <h4 className="text-xl font-bold mb-2">NewsMonkey-React</h4>
            <p className="text-gray-700 mb-2">
              A React app that fetches categorized news from NewsAPI.org without
              reloading.
            </p>
            <p className="text-sm text-gray-600">JavaScript, React</p>
            <a
              href="https://github.com/solankimanish005/NewsMonkey-React"
              target="_blank"
              className="text-blue-500 underline"
            >
              View Project
            </a>
          </div>

          {/* Netflix-Clone */}
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg">
            <h4 className="text-xl font-bold mb-2">Netflix-Clone</h4>
            <p className="text-gray-700 mb-2">
              A clone of Netflix UI with HTML and CSS, showcasing responsive
              layout.
            </p>
            <p className="text-sm text-gray-600">HTML, CSS</p>
            <a
              href="https://github.com/solankimanish005/Netflix-Clone"
              target="_blank"
              className="text-blue-500 underline"
            >
              View Project
            </a>
          </div>

          {/* TodoList-React-App */}
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg">
            <h4 className="text-xl font-bold mb-2">TodoList-React-App</h4>
            <p className="text-gray-700 mb-2">
              A simple todo list application built using React and JavaScript.
            </p>
            <p className="text-sm text-gray-600">React, JavaScript</p>
            <a
              href="https://github.com/solankimanish005/TodoList-React-App"
              target="_blank"
              className="text-blue-500 underline"
            >
              View Project
            </a>
          </div>

          {/* Rock-Paper-Scissor-Game */}
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg">
            <h4 className="text-xl font-bold mb-2">Rock-Paper-Scissor-Game</h4>
            <p className="text-gray-700 mb-2">
              A classic Rock Paper Scissors game with simple CSS animations and
              logic.
            </p>
            <p className="text-sm text-gray-600">CSS, JavaScript</p>
            <a
              href="https://github.com/solankimanish005/Rock-Paper-Scissor-Game"
              target="_blank"
              className="text-blue-500 underline"
            >
              View Project
            </a>
          </div>

          {/* URL Shortener - Next.js */}
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg">
            <h4 className="text-xl font-bold mb-2">URL Shortener</h4>
            <p className="text-gray-700 mb-2">
              A URL shortener application built using Next.js 15 as part of the
              Sigma Web Dev Course.
            </p>
            <p className="text-sm text-gray-600">Next.js, Tailwind CSS</p>
            <a
              href="https://github.com/solankimanish005/url-shortener-nextjs"
              target="_blank"
              className="text-blue-500 underline"
            >
              View Project
            </a>
          </div>

          {/* LinkTree Clone - Next.js */}
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg">
            <h4 className="text-xl font-bold mb-2">LinkTree Clone</h4>
            <p className="text-gray-700 mb-2">
              A responsive LinkTree clone developed with Next.js and Tailwind
              CSS, inspired by the original LinkTree UI.
            </p>
            <p className="text-sm text-gray-600">Next.js, Tailwind CSS</p>
            <a
              href="https://github.com/solankimanish005/linktree-clone-nextjs"
              target="_blank"
              className="text-blue-500 underline"
            >
              View Project
            </a>
          </div>
        </div>
      </section>

      {/* Experience / Education */}
      <section id="experience" className="p-8 bg-white">
        <h3 className="text-3xl font-semibold mb-6 text-center">
          Experience & Education
        </h3>
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="p-4 bg-gray-100 rounded shadow">
            <h4 className="font-bold">
              MERN stack Developer -{" "}
              <a href="http://divineerp.com/" target="_blank">
                Divine ERP Solutions Pvt. Ltd.
              </a>
            </h4>
            {/* <p className="text-gray-600">October 2024 - April 2025</p> */}
            <p className="text-gray-600">1 Year</p>
            <p className="text-gray-700">
              Built responsive user interfaces with React and Tailwind CSS.
            </p>
          </div>
          <div className="p-4 bg-gray-100 rounded shadow">
            <h4 className="font-bold">
              Bachelor of Computer Applications -{" "}
              <a href="https://www.saurashtrauniversity.edu/" target="_blank">
                Saurashtra University
              </a>{" "}
            </h4>
            <p className="text-gray-600">2023 - 2026</p>
          </div>
        </div>
      </section>

      {/* Contact */}
      {/* <section id="contact" className="p-8 text-center">
        <h3 className="text-3xl font-semibold mb-4">Contact Me</h3>
        <form className="max-w-md mx-auto space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded"
          />
          <textarea
            placeholder="Message"
            className="w-full px-4 py-2 border rounded"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Send
          </button>
        </form>
        <div className="mt-6">
          <a
            href="https://github.com/solankimanish005"
            target="_blank"
            className="text-blue-500 underline mx-2"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/manish-solanki-b787b1357/"
            target="_blank"
            className="text-blue-500 underline mx-2"
          >
            LinkedIn
          </a>
        </div>
      </section> */}

      <section id="contact" className="p-8 text-center">
        <h3 className="text-3xl font-semibold mb-4">Contact Me</h3>
        <ContactForm />
      </section>

      {/* Footer */}
      <footer className="text-center text-sm p-4 text-gray-500 bg-gray-50 mt-10">
        <p>© 2025 Manish. All rights reserved.</p>
      </footer>
    </div>
  );
}
