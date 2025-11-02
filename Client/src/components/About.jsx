import React from "react";
import { Link } from "react-router-dom";
import { Users, Heart, Target, Clock, Mail } from "lucide-react";
import Homeheader from "./HomeHeader";

export default function About() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      <Homeheader />

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold">
              About KaamSetu — connecting honest work with local workers
            </h1>
            <p className="mt-4 text-gray-600 max-w-prose">
              KaamSetu is built to make local daily-wage work discoverable, safe and fair.
              We design for low-bandwidth environments, simple onboarding, and transparent
              payments so workers and employers can transact with trust.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/jobs"
                className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-white font-medium shadow hover:brightness-95"
              >
                Browse Jobs
              </Link>
              <Link
                to="/contactpage"
                className="inline-flex items-center px-4 py-2 rounded-md border border-gray-200 text-sm"
              >
                Contact Support
              </Link>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold">By the numbers</h3>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <Stat title="Active Jobs" value="1.2K+" />
              <Stat title="Workers" value="8.5K+" />
              <Stat title="Employers" value="500+" />
              <Stat title="Payment Success" value="98%" />
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VALUES */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4">Our mission</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Feature icon={<Target className="w-5 h-5" />} title="Fair pay">
            We promote transparent wage listings and on-time payments so workers receive fair compensation.
          </Feature>

          <Feature icon={<Users className="w-5 h-5" />} title="Local trust">
            Verified employers, simple KYC and community ratings — building trust at the village level.
          </Feature>

          <Feature icon={<Heart className="w-5 h-5" />} title="Worker-first">
            Low-connectivity support (SMS flows), multilingual UI and simple design for first-time users.
          </Feature>
        </div>
      </section>
   
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">Have questions or want to partner?</h3>
            <p className="text-sm text-gray-600 mt-1">We love collaborating with NGOs, local governments and community groups.</p>
          </div>

          <div className="flex gap-3">
            <a href="mailto:support@kaamsetu.example" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-white">
              <Mail className="w-4 h-4" /> Email us
            </a>
            <Link to="/contactpage" className="inline-flex items-center px-4 py-2 rounded-md border border-gray-200">Contact page</Link>
          </div>
        </div>
      </section>

  
      <footer className="bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600">© {new Date().getFullYear()} KaamSetu</div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="inline-flex items-center gap-2">
              <PhoneIcon /> <span>1800-XXX-XXXX</span>
            </div>
            <Link to="/privacy" className="text-gray-500">Privacy</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ---------- small UI subcomponents used above ---------- */

function Stat({ title, value }) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 text-center">
      <div className="text-xl font-extrabold text-gray-900">{value}</div>
      <div className="text-xs text-gray-500 mt-1">{title}</div>
    </div>
  );
}

function Feature({ icon, title, children }) {
  return (
    <div className="p-5 border rounded-xl bg-white">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-md bg-primary/10 text-primary flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm text-gray-600 mt-2">{children}</p>
        </div>
      </div>
    </div>
  );
}

function TimelineItem({ year, title, children }) {
  return (
    <li className="mb-8 ml-4">
      <div className="absolute -left-2 mt-1 w-3 h-3 rounded-full bg-primary"></div>
      <time className="mb-1 text-sm font-semibold text-primary">{year}</time>
      <h3 className="text-md font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{children}</p>
    </li>
  );
}

/* Small inline icon for footer phone (keeps import compact) */
function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h2.5a1 1 0 011 1l.18 2.3a1 1 0 01-.28.9L7.3 9.7a16 16 0 006 6l2.5-1.1a1 1 0 01.9-.28L18 15.5a1 1 0 011 1V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
    </svg>
  );
}
