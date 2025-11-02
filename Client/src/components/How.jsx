/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Smartphone,
  MapPin,
  Clock,
  CheckCircle,
  Users,
  Briefcase,
  Globe2,
  Sparkles,
  ThumbsUp,
  Star,
  Zap,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Homeheader from "./HomeHeader";

const Typewriter = ({ phrases = [], speed = 60, pause = 1500, className = "" }) => {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!phrases.length) return;
    const current = phrases[idx % phrases.length];
    const tick = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) setTimeout(() => setDeleting(true), pause);
      } else {
        if (text.length === 0) {
          setDeleting(false);
          setIdx((i) => (i + 1) % phrases.length);
        } else setText(current.slice(0, text.length - 1));
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(tick);
  }, [text, deleting, idx, phrases, speed, pause]);

  return (
    <span className={`inline-block ${className}`} aria-hidden>
      {text}
      <span className="ml-1 inline-block animate-blink">|</span>
      <style>{`.animate-blink{animation: blink 1s steps(2,start) infinite}@keyframes blink{50%{opacity:0}}`}</style>
    </span>
  );
};

const How = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 text-gray-900">
      <Homeheader />
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
            >
              KaamSetu — <span className="text-indigo-600">Work local, grow local</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="mt-4 text-lg text-gray-600 max-w-2xl"
            >
              <Typewriter
                phrases={["Verified local jobs.", "Fair pay, fast hires.", "Mobile-first for every worker."]}
                speed={55}
                pause={1500}
                className="font-medium text-gray-700"
              />
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <NavLink
                to="/signup"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
              >
                <Sparkles size={16} /> Get Started
              </NavLink>

              <NavLink
                to="/how-it-works"
                className="inline-flex items-center gap-2 border border-gray-200 px-5 py-3 rounded-full text-gray-700 hover:bg-gray-50 transition"
              >
                Learn how it works
              </NavLink>
            </motion.div>

            <div className="mt-8 flex flex-wrap gap-4 text-sm text-gray-600">
              <Stat icon={<Star />} value="4.8" label="App rating" />
              <Stat icon={<ThumbsUp />} value="120k+" label="Jobs posted" />
              <Stat icon={<Zap />} value="<24h" label="Average hire time" />
            </div>
          </div>

          <div>
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl bg-white p-6 shadow-2xl border"
            >
              <div className="grid grid-cols-2 gap-4">
                <PromoCard title="Workers" desc="Create profile & get work" icon={<Users />} color="indigo" />
                <PromoCard title="Employers" desc="Post jobs & hire fast" icon={<Briefcase />} color="rose" />
                <PromoCard title="Local Matches" desc="Find nearby talent" icon={<MapPin />} color="emerald" />
                <PromoCard title="Offline Support" desc="Low-data friendly" icon={<Smartphone />} color="amber" />
              </div>
            </motion.div>
          </div>
        </div>

        <svg className="absolute -bottom-2 left-0 w-full opacity-30" viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 40C200 80 400 56 720 56C1040 56 1240 24 1440 8V56H0V40Z" fill="#fff" />
        </svg>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <section className="grid gap-8 md:grid-cols-2">
          <motion.div whileHover={{ y: -4 }} className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">For Workers</h3>
                <p className="text-sm text-gray-500">Find jobs, build reputation, get paid on time.</p>
              </div>
              <div className="text-indigo-600 p-2 rounded-md bg-indigo-50">
                <Users />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <StepCard num={1} icon={<Smartphone />} title="Create Profile" text="Sign up, add skills & documents" />
              <StepCard num={2} icon={<MapPin />} title="Browse Jobs" text="Filter by distance, pay and skills" />
              <StepCard num={3} icon={<Clock />} title="Work & Track" text="Check-in/out and get accurate timesheets" />
              <StepCard num={4} icon={<CheckCircle />} title="Get Paid" text="Secure payouts; build ratings" />
            </div>

            <div className="mt-6">
              <NavLink to="/signup" className="inline-block px-5 py-2 rounded-full bg-indigo-600 text-white font-medium">
                Sign up as Worker
              </NavLink>
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -4 }} className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">For Employers</h3>
                <p className="text-sm text-gray-500">Post jobs, manage hires and payouts easily.</p>
              </div>
              <div className="text-rose-600 p-2 rounded-md bg-rose-50">
                <Briefcase />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <StepCard num={1} icon={<Globe2 />} title="Create Account" text="Verify & set hiring preferences" />
              <StepCard num={2} icon={<Briefcase />} title="Post Job" text="Set wage, location & skills required" />
              <StepCard num={3} icon={<Users />} title="Select & Communicate" text="Review applicants and message them" />
              <StepCard num={4} icon={<CheckCircle />} title="Confirm & Pay" text="Secure payout on completion" />
            </div>

            <div className="mt-6">
              <NavLink to="/signup" className="inline-block px-5 py-2 rounded-full bg-rose-600 text-white font-medium">
                Sign up as Employer
              </NavLink>
            </div>
          </motion.div>
        </section>

        {/* Why section */}
        <section className="mt-12 bg-linear-to-tr from-white to-gray-50 rounded-2xl p-6 shadow">
          <h3 className="text-2xl font-bold mb-6 text-center">Why KaamSetu?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <MiniFeature icon={<CheckCircle />} title="Verified Jobs" desc="Only trusted employers" />
            <MiniFeature icon={<Clock />} title="Quick Hiring" desc="Post & hire fast" />
            <MiniFeature icon={<MapPin />} title="Local Matches" desc="Find nearby workers" />
            <MiniFeature icon={<Smartphone />} title="Mobile-first" desc="Works on low-end phones" />
          </div>
        </section>

        {/* Testimonials + FAQ */}
        <section className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">What people say</h3>
            <Testimonial text="Found reliable daily work through KaamSetu. Payouts are quick and consistent." name="Raju — Worker" />
            <Testimonial text="We hired 8 workers in a day for harvest — app made it painless." name="Sikha — Employer" />
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
            <Accordion q="How do payments work?" a="Employers release payments after job completion; payouts to bank or mobile wallets follow partner rules." />
            <Accordion q="Is verification required?" a="Basic verification improves trust — IDs or contact confirmation may be requested." />
            <Accordion q="What if a worker doesn't show up?" a="Employers can flag no-shows; repeated incidents affect worker rating." />
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 bg-indigo-700 text-white rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-semibold">Ready to get started?</h3>
          <p className="mt-2 text-indigo-100/90">Create your account and begin connecting with trusted local workers or employers.</p>
          <div className="mt-6 flex justify-center gap-3">
            <NavLink to="/signup" className="px-6 py-3 rounded-full bg-white text-indigo-700 font-semibold">
              Sign Up
            </NavLink>
            <NavLink to="/login" className="px-6 py-3 rounded-full border border-white/30 text-white">
              Login
            </NavLink>
          </div>
        </section>
      </main>
    </div>
  );
};

const Stat = ({ icon, value, label }) => (
  <div className="flex items-center gap-3">
    <div className="p-2 rounded bg-white/90 shadow-sm">{icon}</div>
    <div>
      <div className="font-semibold">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  </div>
);


const PromoCard = ({ title, desc, icon, color = "indigo" }) => (
  <div className="flex gap-3 items-start p-3 rounded-lg border bg-white">
    <div className="p-3 rounded-md bg-gray-50 text-indigo-600">{icon}</div>
    <div>
      <div className="font-semibold">{title}</div>
      <div className="text-sm text-gray-500">{desc}</div>
    </div>
  </div>
);

const StepCard = ({ num, icon, title, text }) => (
  <div className="flex gap-4 items-start bg-gray-50 p-3 rounded-lg border">
    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-semibold text-indigo-600">{num}</div>
    <div>
      <div className="flex items-center gap-2">
        <div className="text-indigo-600">{icon}</div>
        <div className="font-semibold">{title}</div>
      </div>
      <div className="text-sm text-gray-600 mt-1">{text}</div>
    </div>
  </div>
);

const MiniFeature = ({ icon, title, desc }) => (
  <div className="p-4 rounded-lg bg-white shadow-sm border flex flex-col gap-3">
    <div className="p-2 rounded-md bg-indigo-50 text-indigo-600">{icon}</div>
    <h4 className="font-semibold">{title}</h4>
    <p className="text-sm text-gray-600">{desc}</p>
  </div>
);

const Testimonial = ({ text, name }) => (
  <motion.blockquote
    initial={{ opacity: 0, y: 6 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="p-4 rounded-lg bg-white border shadow-sm"
  >
    <p className="text-gray-700">“{text}”</p>
    <footer className="mt-3 text-sm text-gray-500">— {name}</footer>
  </motion.blockquote>
);

const Accordion = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b last:border-b-0">
      <button
        onClick={() => setOpen((s) => !s)}
        className="w-full flex items-center justify-between py-3 text-left"
        aria-expanded={open}
      >
        <span className="font-semibold">{q}</span>
        <svg className={`w-5 h-5 transform transition ${open ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="none">
          <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.28 }} className="overflow-hidden">
        <div className="pb-4 text-sm text-gray-600">{a}</div>
      </motion.div>
    </div>
  );
};

export default How;

