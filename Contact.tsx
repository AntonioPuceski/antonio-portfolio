import React, { useState } from "react";
import emailjs from "emailjs-com";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    const templateParams = {
      name: form.name,
      message: form.message,
      time: new Date().toLocaleString(), // adds timestamp
      reply_to: form.email,              // lets you reply directly
    };

    emailjs
      .send(
        "service_8626w2k",       // ✅ service ID
        "template_rcfkojv",      // ✅ updated template ID
        templateParams,
        "81Y06nL1vhCDTTghX"      // ✅ public key
      )
      .then(() => {
        setStatus("✅ Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        setStatus("❌ Failed to send message. Check console for details.");
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 flex justify-center">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow">
        <h1 className="text-3xl font-bold mb-6">📬 Contact Me</h1>
        <form onSubmit={sendEmail} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border rounded-lg"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border rounded-lg"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <textarea
            placeholder="Your Message"
            className="w-full p-3 border rounded-lg"
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Send Message
          </button>
        </form>
        {status && <p className="mt-4 text-center">{status}</p>}
      </div>
    </div>
  );
}
