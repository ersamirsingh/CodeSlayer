/* eslint-disable no-unused-vars */
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Briefcase, Users, ShieldCheck, Search, X, Clock } from "lucide-react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import Homeheader from "../components/HomeHeader";
import LaborerPlatform from "./LabourPlatform";

const sampleJobs = [
  {
    id: "job-001",
    title: "Field Harvester — Seasonal",
    employer: "Kumar Farms",
    description: "Harvesting and bundling wheat. 7 AM - 5 PM. Tools provided.",
    wage: 600,
    payType: "Daily",
    locationName: "Sikandarpur Village",
    distance: 2.1,
  },
  {
    id: "job-002",
    title: "Masonry Helper",
    employer: "Rai Construction",
    description: "Assist masons on-site. 8 AM - 6 PM. Basic experience required.",
    wage: 700,
    payType: "Daily",
    locationName: "Block Market",
    distance: 4.5,
  },
  {
    id: "job-003",
    title: "Irrigation Assistant",
    employer: "Sharma Farms",
    description: "Help in canal irrigation and maintenance.",
    wage: 500,
    payType: "Daily",
    locationName: "Gram Panchayat",
    distance: 1.2,
  },
];

function formatWage(w) {
  return `₹${w.toLocaleString("en-IN")}`;
}

function JobCard({ job }) {
  return (
    <motion.article
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      aria-labelledby={`job-${job.id}-title`}
      className="bg-linear-to-tr from-indigo-50 via-white to-indigo-100 border border-indigo-100 rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 id={`job-${job.id}-title`} className="text-lg font-semibold text-indigo-900">
              {job.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {job.employer} • <span className="text-gray-600">{job.locationName}</span>
            </p>
            <p className="text-sm text-gray-700 mt-3 line-clamp-3">{job.description}</p>
          </div>

          <div className="text-right shrink-0">
            <div className="text-xl font-extrabold text-indigo-600">{formatWage(job.wage)}</div>
            <div className="text-xs text-gray-500 mt-1">{job.payType}</div>
            <Link
              to={`/jobs/${job.id}`}
              className="inline-flex items-center justify-center mt-3 px-3 py-1.5 rounded-md bg-indigo-600 text-white text-sm font-medium shadow hover:bg-indigo-700 transition"
            >
              View
            </Link>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
          <span className="inline-flex items-center gap-1">
            <MapPin className="w-4 h-4" /> <span>{job.distance} km</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-4 h-4" /> <span>{job.payType}</span>
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function Landing() {
  const [query, setQuery] = useState("");
  const [nearbyOnly, setNearbyOnly] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sampleJobs.filter((j) => {
      const hay = `${j.title} ${j.description} ${j.employer} ${j.locationName}`.toLowerCase();
      const matchesQuery = q === "" || hay.includes(q);
      const matchesNearby = !nearbyOnly || j.distance <= 5;
      return matchesQuery && matchesNearby;
    });
  }, [query, nearbyOnly]);

  return (
    <main className="min-h-screen bg-linear-to-b from-indigo-50 via-white to-indigo-100 text-gray-800">
      <Homeheader />

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-12 grid gap-8 md:grid-cols-2 items-center">
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-indigo-900">
            <Typewriter
              options={{
                strings: [
                  "Fair Jobs, Transparent Payments",
                  "Empowering Rural Workers",
                  "Building a Better Tomorrow",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>
          <p className="mt-4 text-gray-700 max-w-xl">
            Find nearby verified jobs, apply with one tap, and use our mediation system for fair dispute resolution.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-indigo-600 text-white font-medium shadow hover:scale-105 hover:bg-indigo-700 transition"
            >
              Find Jobs
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-indigo-500 text-indigo-600 bg-white hover:bg-indigo-50 hover:scale-105 transition"
            >
              Post a Job
            </Link>
          </div>

          {/* SEARCH BAR */}
          <div className="mt-6 bg-white/80 backdrop-blur-sm border border-indigo-100 rounded-xl p-4 shadow-sm">
            <form className="grid sm:grid-cols-3 gap-3 items-center" onSubmit={(e) => e.preventDefault()}>
              <div className="sm:col-span-2 relative">
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <Search className="w-4 h-4" />
                  </span>
                  <input
                    className="pl-10 pr-10 h-11 w-full rounded-lg border border-indigo-100 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    placeholder="Search jobs, skills or employer"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center h-8 w-8 rounded-full bg-indigo-50 hover:bg-indigo-100"
                    >
                      <X className="w-4 h-4 text-indigo-600" />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setNearbyOnly((s) => !s)}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border transition ${
                    nearbyOnly
                      ? "bg-indigo-100 border-indigo-500 text-indigo-700"
                      : "bg-white border-indigo-100 text-gray-700 hover:bg-indigo-50"
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{nearbyOnly ? "Nearby only" : "Nearby"}</span>
                </button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* STATISTICS SECTION */}
        <motion.aside
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="order-first md:order-last"
        >
          <div className="bg-white rounded-xl shadow-md p-5 grid grid-cols-2 gap-4">
            {[
              { num: "1.2K+", label: "Active Jobs" },
              { num: "8.5K+", label: "Registered Workers" },
              { num: "500+", label: "Employers" },
              { num: "98%", label: "Payment Success" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="p-4 border border-indigo-100 rounded-lg text-center bg-linear-to-tr from-white to-indigo-50"
              >
                <div className="text-2xl font-bold text-indigo-700">{stat.num}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.aside>
      </section>

      {/* FEATURES */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 py-8"
      >
        <h2 className="text-2xl font-semibold mb-4 text-indigo-900">What We Offer</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: "Verified Profiles",
              desc: "KYC & ratings to build trust between workers and employers.",
            },
            {
              icon: Briefcase,
              title: "Skill-based Matching",
              desc: "Find jobs that match your skills and distance preferences.",
            },
            {
              icon: Users,
              title: "Mediation Support",
              desc: "Raise disputes and get help from trained mediators.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-5 border border-indigo-100 rounded-xl bg-linear-to-br from-white to-indigo-50 text-center shadow-sm hover:shadow-md transition"
            >
              <div className="mx-auto mb-3 w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                <feature.icon className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-indigo-900">{feature.title}</h4>
              <p className="text-sm text-gray-600 mt-2">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FEATURED JOBS */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-indigo-900">Featured Jobs Near You</h2>
          <Link to="/jobs" className="text-sm text-indigo-600 hover:underline">
            View all jobs
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.length ? (
            filtered.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <div className="col-span-full p-6 bg-white border border-indigo-100 rounded-xl text-center text-gray-500">
              No jobs found. Try clearing filters or expand your search radius.
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-linear-to-r from-indigo-600 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold">Ready to get started?</h3>
            <p className="text-indigo-100">
              Sign up as a worker or post your first job — trusted, local, and fair.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/signup"
              className="inline-flex items-center px-5 py-2 rounded-md bg-white text-indigo-700 font-medium shadow hover:bg-indigo-100 transition"
            >
              Get Started
            </Link>
            <Link
              to="/contactpage"
              className="inline-flex items-center px-5 py-2 rounded-md border border-white text-white hover:bg-indigo-700 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-600">
          <div className="text-sm">© {new Date().getFullYear()} ShramSetu</div>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="text-sm hover:text-indigo-600">Privacy</Link>
            <Link to="/terms" className="text-sm hover:text-indigo-600">Terms</Link>
            <div className="flex items-center text-sm gap-2">
              <Phone className="w-4 h-4" /> <span>Help: 1800-XXX-XXXX</span>
            </div>
          </div>
        </div>
      </footer>

      <LaborerPlatform />
    </main>
  );
}

