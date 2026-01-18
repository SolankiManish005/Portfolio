"use client";

import { Mail, MapPin, Send, Download } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        // Zod validation errors
        if (data.errors) {
          const firstError = Object.values(data.errors)[0] as string[];
          throw new Error(firstError[0]);
        }
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

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
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            label="Subject"
            name="subject"
            type="text"
            value={formData.subject}
            onChange={handleChange}
          />

          <div>
            <label className="text-sm mb-2 block">Message</label>
            <textarea
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full rounded-md bg-transparent border border-gray-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white dark:focus:ring-black transition"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-gray-700 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}

function Input({
  label,
  name,
  type,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div>
      <label className="text-sm mb-2 block">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full rounded-md bg-transparent border border-gray-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white dark:focus:ring-black transition"
      />
    </div>
  );
}
