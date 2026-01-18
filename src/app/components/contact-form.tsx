"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

interface ContactFormState {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormState>({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("✅ Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("❌ Failed to send message.");
      }
    } catch {
      setStatus("❌ Server error.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card text-card-foreground shadow-lg rounded-xl px-8 pt-6 pb-8 w-full max-w-md mx-auto border border-border transition-colors"
    >
      {(["name", "email"] as const).map((field) => (
        <div key={field} className="mb-4">
          <input
            name={field}
            type={field === "email" ? "email" : "text"}
            value={form[field]}
            onChange={handleChange}
            required
            placeholder={`Your ${
              field.charAt(0).toUpperCase() + field.slice(1)
            }`}
            className="w-full px-4 py-2 rounded-lg bg-background text-foreground
                       border border-border
                       placeholder:text-muted-foreground
                       focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      ))}

      <div className="mb-6">
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          placeholder="Your Message"
          rows={4}
          className="w-full px-4 py-2 rounded-lg bg-background text-foreground
                     border border-border
                     placeholder:text-muted-foreground
                     focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
        >
          Send
        </button>
      </div>

      <p className="text-center mt-4 text-sm text-muted-foreground">
        {status}
      </p>
    </form>
  );
}
