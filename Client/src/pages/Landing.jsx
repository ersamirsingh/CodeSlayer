import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Briefcase, Users, ShieldCheck, Search, X, Clock } from "lucide-react";
import Homeheader from "../components/HomeHeader";
import LaborerPlatform from "./LabourPlatform";
// import EmployerPlatform from "./EmployerPlatform";
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
    <article
      aria-labelledby={`job-${job.id}-title`}
      className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 id={`job-${job.id}-title`} className="text-lg font-semibold text-gray-800">
              {job.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {job.employer} • <span className="text-gray-600">{job.locationName}</span>
            </p>
            <p className="text-sm text-gray-600 mt-3 line-clamp-3">{job.description}</p>
          </div>

          <div className="text-right shrink-0">
            <div className="text-xl font-extrabold text-primary">{formatWage(job.wage)}</div>
            <div className="text-xs text-gray-500 mt-1">{job.payType}</div>
            <Link
              to={`/jobs/${job.id}`}
              className="inline-flex items-center justify-center mt-3 px-3 py-1.5 rounded-md bg-primary text-white text-sm font-medium shadow hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label={`View ${job.title}`}
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
    </article>
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
    <main className="min-h-screen bg-gray-50 text-gray-800">
      <Homeheader />

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 py-12 grid gap-8 md:grid-cols-2 items-center">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            Fair jobs, transparent payments — <span className="text-primary">for rural workers</span>
          </h1>
          <p className="mt-4 text-gray-600 max-w-xl">
            Find nearby verified jobs, apply with one tap, and use our mediation system for fair dispute resolution.
            SMS support available for low-connectivity areas.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/jobs" className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-primary text-white font-medium shadow hover:brightness-95">
              Find Jobs
            </Link>
            <Link to="/post-job" className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-primary text-primary bg-white hover:bg-primary/5">
              Post a Job
            </Link>
          </div>

          {/* Search card */}
          <div className="mt-6 bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
            <form className="grid sm:grid-cols-3 gap-3 items-center" onSubmit={(e) => e.preventDefault()}>
              <div className="sm:col-span-2 relative">
                <label htmlFor="job-search" className="sr-only">Search jobs</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                    <Search className="w-4 h-4" />
                  </span>

                  <input
                    id="job-search"
                    className="pl-10 pr-10 h-11 w-full rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="Search jobs, skills or employer"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    aria-label="Search jobs"
                  />

                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none"
                      aria-label="Clear search"
                    >
                      <X className="w-4 h-4 text-gray-600" />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setNearbyOnly((s) => !s)}
                  aria-pressed={nearbyOnly}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border ${
                    nearbyOnly ? "bg-primary/10 border-primary text-primary" : "bg-white border-gray-200 text-gray-700"
                  } focus:outline-none`}
                >
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{nearbyOnly ? "Nearby only" : "Nearby"}</span>
                </button>

                <Link
                  to="/jobs"
                  className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-sm hover:bg-gray-50"
                >
                  View all jobs
                </Link>
              </div>
            </form>
          </div>
        </div>

        <aside className="order-first md:order-last">
          <div className="bg-white rounded-xl shadow-sm p-5 grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl font-bold">1.2K+</div>
              <div className="text-xs text-gray-500 mt-1">Active Jobs</div>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl font-bold">8.5K+</div>
              <div className="text-xs text-gray-500 mt-1">Registered Workers</div>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-xs text-gray-500 mt-1">Employers</div>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl font-bold">98%</div>
              <div className="text-xs text-gray-500 mt-1">Payment Success</div>
            </div>
          </div>
        </aside>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4">What we offer</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="p-5 border rounded-xl bg-white text-center">
            <div className="mx-auto mb-3 w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-semibold">Verified Profiles</h4>
            <p className="text-sm text-gray-600 mt-2">KYC & ratings to build trust between workers and employers.</p>
          </div>

          <div className="p-5 border rounded-xl bg-white text-center">
            <div className="mx-auto mb-3 w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary">
              <Briefcase className="w-5 h-5" />
            </div>
            <h4 className="font-semibold">Skill-based Matching</h4>
            <p className="text-sm text-gray-600 mt-2">Find jobs that match your skills and distance preferences.</p>
          </div>

          <div className="p-5 border rounded-xl bg-white text-center">
            <div className="mx-auto mb-3 w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-semibold">Mediation Support</h4>
            <p className="text-sm text-gray-600 mt-2">Raise disputes and get help from trained mediators.</p>
          </div>
        </div>
      </section>

      {/* FEATURED JOBS */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Featured Jobs Near You</h2>
          <Link to="/jobs" className="text-sm text-primary hover:underline hidden sm:inline">View all jobs</Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.length ? (
            filtered.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <div className="col-span-full p-6 bg-white border rounded-xl text-center text-gray-500">
              No jobs found. Try clearing filters or expand your search radius.
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary/5 border-t mt-8">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">Ready to get started?</h3>
            <p className="text-gray-600">Sign up as a worker or post your first job — trusted, local, and fair.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/signup" className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-white">Get Started</Link>
            <Link to="/contact" className="inline-flex items-center px-4 py-2 rounded-md border border-gray-200">Contact Us</Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600">© {new Date().getFullYear()} ShramSetu</div>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="text-sm text-gray-500">Privacy</Link>
            <Link to="/terms" className="text-sm text-gray-500">Terms</Link>
            <div className="flex items-center text-sm text-gray-500 gap-2">
              <Phone className="w-4 h-4" /> <span>Help: 1800-XXX-XXXX</span>
            </div>
          </div>
        </div>
      </footer>
      <LaborerPlatform/>
    </main>
  );
}
