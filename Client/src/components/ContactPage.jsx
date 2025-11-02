import React, { useState } from "react";
import { NavLink } from "react-router";
import Homeheader from "./HomeHeader";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "worker",
    message: "",
  });
  const [status, setStatus] = useState({ loading: false, ok: null, msg: "" });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.email.trim()) return "Please enter your email.";
    // simple email regex
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(form.email)) return "Please enter a valid email.";
    if (!form.message.trim()) return "Please enter a message.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setStatus({ loading: false, ok: false, msg: err });
      return;
    }

    setStatus({ loading: true, ok: null, msg: "" });
    try {
      // Replace URL with your backend endpoint
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Server error");
      }

      setStatus({ loading: false, ok: true, msg: "Thanks — we received your message!" });
      setForm({ name: "", email: "", role: "worker", message: "" });
    } catch (err) {
      setStatus({ loading: false, ok: false, msg: err.message || "Something went wrong." });
    }
  };

  return (
    <>
    <Homeheader/>
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-2 items-start">
          {/* Left: Contact info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h1 className="text-2xl font-bold text-gray-900">Contact Us</h1>
              <p className="mt-2 text-gray-600">
                Have a question or need help? Fill out the form and our team will get back to you within 1-2 business days.
              </p>

              <div className="mt-6 grid gap-4">
                <ContactInfoRow label="Email" value="support@shramsetu.example" />
                <ContactInfoRow label="Phone" value="+91 98765 43210" />
                <ContactInfoRow label="Working hours" value="Mon - Sat, 9:00 AM - 6:00 PM" />
                <div className="mt-4 text-sm text-gray-500">
                  Prefer immediate help? Call us or check the <NavLink to="/help" className="text-indigo-600 hover:underline">Help & FAQs</NavLink>.
                </div>
              </div>
            </div>

            {/* Optional: small map placeholder */}
            <div className="bg-white rounded-2xl p-0 overflow-hidden shadow-sm">
              <div className="w-full h-56">
                
                <iframe
                  title="ShramSetu Office"
                  className="w-full h-full border-0"
                  src="https://www.google.com/maps?q=India&output=embed"
                />
              </div>
            </div>
          </div>

          {/* Right: Contact form */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <div className="mt-1 flex gap-3">
                  <label className="inline-flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="worker"
                      checked={form.role === "worker"}
                      onChange={onChange}
                      className="accent-indigo-600"
                    />
                    <span className="text-sm text-gray-700">Worker</span>
                  </label>

                  <label className="inline-flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="employer"
                      checked={form.role === "employer"}
                      onChange={onChange}
                      className="accent-indigo-600"
                    />
                    <span className="text-sm text-gray-700">Employer</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  rows="5"
                  className="mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  placeholder="How can we help?"
                  required
                />
              </div>

              {/* Status */}
              {status.ok === true && (
                <div className="rounded-md bg-green-50 border border-green-200 text-green-700 px-4 py-2 text-sm">
                  {status.msg}
                </div>
              )}
              {status.ok === false && (
                <div className="rounded-md bg-red-50 border border-red-200 text-red-700 px-4 py-2 text-sm">
                  {status.msg}
                </div>
              )}

              <div className="flex items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={status.loading}
                  className={`inline-flex items-center justify-center px-4 py-2 rounded-md text-white font-medium ${
                    status.loading ? "bg-indigo-300" : "bg-indigo-600 hover:bg-indigo-500"
                  }`}
                >
                  {status.loading ? "Sending..." : "Send Message"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setForm({ name: "", email: "", role: "worker", message: "" });
                    setStatus({ loading: false, ok: null, msg: "" });
                  }}
                  className="text-sm text-gray-600 hover:underline"
                >
                  Reset
                </button>
              </div>
            </form>

            <div className="mt-6 text-xs text-gray-500">
              By contacting us you agree to our <NavLink to="/privacy" className="text-indigo-600 hover:underline">Privacy Policy</NavLink>.
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

/* Small helper component */
function ContactInfoRow({ label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-sm font-medium text-gray-700 w-28">{label}</div>
      <div className="text-sm text-gray-600">{value}</div>
    </div>
  );
}
