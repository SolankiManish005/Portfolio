"use client";

import { Mail, MapPin, Send, Download } from "lucide-react";

export default function Contact() {
  return (
    <section className="px-6 py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left Content */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Contact Me</h2>

          <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
            I'm interested in freelance opportunities and collaborations. If you
            have a project that could use my help, please get in touch.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5" />
              <span className="text-sm">solankimanish0045@gmail.com</span>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5" />
              <span className="text-sm">Gujarat, India</span>
            </div>
          </div>

          <button className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-gray-700 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition">
            <Download className="w-4 h-4" />
            Resume
          </button>
        </div>

        {/* Right Form */}
        <form className="space-y-6">
          <Input label="Name" type="text" />
          <Input label="Email" type="email" />
          <Input label="Subject" type="text" />

          <div>
            <label className="text-sm mb-2 block">Message</label>
            <textarea
              rows={5}
              className="w-full rounded-md bg-transparent border border-gray-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white dark:focus:ring-black transition"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-gray-700 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
          >
            <Send className="w-4 h-4" />
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

function Input({ label, type }: { label: string; type: string }) {
  return (
    <div>
      <label className="text-sm mb-2 block">{label}</label>
      <input
        type={type}
        className="w-full rounded-md bg-transparent border border-gray-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white dark:focus:ring-black transition"
      />
    </div>
  );
}
