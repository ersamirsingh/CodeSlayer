import React, { useMemo, useState } from "react";
import { MapPin, Navigation, Search, Filter, Clock, CheckCircle, Star, MessageSquare, FileText, AlertTriangle, DollarSign, User } from "lucide-react";

const SAMPLE_JOBS = [
  {
    id: "job-001",
    title: "Construction Helper Needed",
    company: "BuildRight Co.",
    location: "Downtown",
    distance: 2.3,
    pay: "₹800/day",
    duration: "3 days",
    posted: "2 hours ago",
    urgent: true,
    description: "Tasks include moving materials, assisting skilled workers, site cleanup, and general labor. Bring boots & gloves."
  },
  {
    id: "job-002",
    title: "Warehouse Packer",
    company: "QuickShip Logistics",
    location: "Industrial Park",
    distance: 4.1,
    pay: "₹400/day",
    duration: "1 week",
    posted: "5 hours ago",
    urgent: false,
    description: "Packing & labeling shipments. Standing work. Basic physical fitness required."
  },
  {
    id: "job-003",
    title: "Moving Assistant",
    company: "Swift Movers",
    location: "Westside",
    distance: 1.8,
    pay: "₹600/day",
    duration: "1 day",
    posted: "1 day ago",
    urgent: false,
    description: "Help load/unload household goods. Lifting required. Short-term gig."
  },
  {
    id: "job-004",
    title: "General Laborer",
    company: "Metro Construction",
    location: "City Center",
    distance: 3.5,
    pay: "₹500/day",
    duration: "2 weeks",
    posted: "1 day ago",
    urgent: true,
    description: "Longer-term site work assisting skilled tradespeople."
  }
];

function Header({ query, setQuery, onNearMe, onToggleFilters, showFilters }) {
  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-emerald-400 via-teal-500 to-cyan-500 grid place-items-center font-black text-white shadow-lg shadow-emerald-500/30">
              J
            </div>
            <div>
              <h1 className="text-xl font-black bg-linear-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                Find Jobs
              </h1>
              <span className="text-xs text-slate-500 font-medium">Nearby verified daily work</span>
            </div>
          </div>

          <div className="flex-1 md:ml-6 flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search jobs"
                placeholder="Search by title, company or skills"
                className="w-full pl-12 pr-10 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-emerald-400 focus:bg-white outline-none transition font-medium"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-600 transition"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              onClick={onToggleFilters}
              className={`hidden sm:inline-flex items-center gap-2 px-4 py-3 rounded-2xl font-bold transition-all ${
                showFilters
                  ? "bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                  : "border-2 border-slate-300 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <Filter className="w-4 h-4" /> Filters
            </button>

            <button
              onClick={onNearMe}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-teal-600 transition-all"
            >
              <Navigation className="w-4 h-4" /> Near Me
            </button>
          </div>
        </div>
        <div className="mt-3 flex gap-2 sm:hidden">
          <button
            onClick={onToggleFilters}
            className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-bold transition-all ${
              showFilters
                ? "bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                : "border-2 border-slate-300 text-slate-700"
            }`}
          >
            <Filter className="w-4 h-4" /> Filters
          </button>
          <button
            onClick={onNearMe}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-lg"
          >
            <Navigation className="w-4 h-4" /> Near Me
          </button>
        </div>
      </div>
    </div>
  );
}

function JobCard({ job, onView, onApply }) {
  return (
    <article
      className="group relative bg-linear-to-br from-white to-slate-50 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border border-slate-200 overflow-hidden hover:scale-[1.02] cursor-pointer"
    >
      <div className="absolute inset-0 bg-linear-to-br from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/5 group-hover:to-teal-500/5 transition-all duration-500" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors">
                {job.title}
              </h3>
              {job.urgent && (
                <span className="px-3 py-1 rounded-full bg-linear-to-r from-rose-500 to-pink-500 text-white text-xs font-bold uppercase tracking-wide shadow-lg animate-pulse">
                  URGENT
                </span>
              )}
            </div>
            <p className="text-sm text-slate-600 font-medium mb-3">
              {job.company} • {job.location} • {job.distance} km
            </p>
            <p className="text-sm text-slate-700 leading-relaxed line-clamp-2">{job.description}</p>
          </div>

          <div className="shrink-0 text-right">
            <div className="text-3xl font-black bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              {job.pay}
            </div>
            <div className="text-xs text-slate-500 font-semibold mt-1">{job.posted}</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-xs font-semibold text-slate-700">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {job.location}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-xs font-semibold text-slate-700">
            <Clock className="w-3.5 h-3.5 text-teal-600" /> {job.duration}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-xs font-semibold text-slate-700">
            <FileText className="w-3.5 h-3.5 text-cyan-600" /> {job.posted}
          </span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => onApply(job.id)}
            className="flex-1 py-3 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-teal-600 transition-all"
          >
            Apply Now
          </button>
          <button
            onClick={() => onView(job.id)}
            className="px-6 py-3 rounded-2xl border-2 border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition-all"
          >
            View
          </button>
        </div>
      </div>
    </article>
  );
}

export default function LaborerPlatform() {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [nearbyRadius, setNearbyRadius] = useState(10);
  const [selectedPay, setSelectedPay] = useState("any");
  const [view, setView] = useState("feed");
  const [selectedJob, setSelectedJob] = useState(null);

  const filteredJobs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SAMPLE_JOBS.filter((j) => {
      const text = `${j.title} ${j.company} ${j.description} ${j.location}`.toLowerCase();
      const matchesQuery = q === "" || text.includes(q);
      const matchesPay = selectedPay === "any" || (selectedPay === "high" ? j.pay.includes("₹800") || j.pay.includes("₹600") : true);
      const matchesRadius = j.distance <= nearbyRadius;
      return matchesQuery && matchesPay && matchesRadius;
    });
  }, [query, selectedPay, nearbyRadius]);

  function handleNearMe() {
    setNearbyRadius((r) => (r === 10 ? 5 : r === 5 ? 25 : 10));
  }

  function handleToggleFilters() {
    setShowFilters((s) => !s);
  }

  function handleViewJob(jobId) {
    const job = SAMPLE_JOBS.find((j) => j.id === jobId);
    setSelectedJob(job || null);
    setView("details");
  }

  function handleApply(jobId) {
    alert(`Applied to ${jobId}. Your application has been sent.`);
  }

  if (view === "details" && selectedJob) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50 p-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setView("feed")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-emerald-600 font-bold hover:bg-emerald-50 transition mb-6"
          >
            ← Back to Jobs
          </button>

          <div className="bg-linear-to-br from-white to-slate-50 rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
            <div className="bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-black mb-3">{selectedJob.title}</h1>
                  <p className="text-emerald-100 font-medium mb-4">{selectedJob.company} • {selectedJob.location}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm">
                      <MapPin className="w-4 h-4" /> {selectedJob.distance} km
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm">
                      <Clock className="w-4 h-4" /> {selectedJob.duration}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-4xl font-black">{selectedJob.pay}</div>
                  <div className="text-sm mt-2 text-emerald-100">{selectedJob.posted}</div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <h2 className="text-2xl font-black text-slate-900 mb-4">Job Description</h2>
              <p className="text-slate-700 leading-relaxed mb-8">{selectedJob.description}</p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-black text-slate-900 mb-4">Requirements</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-slate-700">Must be 18+ years old</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-slate-700">Able to lift 50 kg</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-slate-700">Punctual & safety aware</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900 mb-4">Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50">
                      <span className="text-slate-600">Start</span>
                      <span className="font-bold text-slate-900">Nov 5, 2025</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50">
                      <span className="text-slate-600">Hours</span>
                      <span className="font-bold text-slate-900">7 AM - 3 PM</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50">
                      <span className="text-slate-600">Payment</span>
                      <span className="font-bold text-slate-900">Daily via Escrow</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50">
                      <span className="text-slate-600">Positions</span>
                      <span className="font-bold text-slate-900">3 available</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => handleApply(selectedJob.id)}
                  className="flex-1 py-4 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-teal-600 transition-all"
                >
                  Apply
                </button>
                <button
                  onClick={() => alert("Saved for later")}
                  className="px-8 py-4 rounded-2xl border-2 border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition-all"
                >
                  Save
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-linear-to-br from-white to-slate-50 rounded-3xl p-6 shadow-lg border border-slate-200">
            <h3 className="text-lg font-black text-slate-900 mb-3">About {selectedJob.company}</h3>
            <p className="text-slate-700 leading-relaxed">
              Trusted contractor in residential construction. Rated highly for fair pay and clear terms.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50">
      <Header
        query={query}
        setQuery={setQuery}
        onNearMe={handleNearMe}
        onToggleFilters={handleToggleFilters}
        showFilters={showFilters}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <main className="lg:col-span-2 space-y-6">
            {/* Filters panel */}
            {showFilters && (
              <div className="bg-linear-to-br from-white to-slate-50 rounded-3xl p-6 border border-slate-200 shadow-lg">
                <h3 className="text-lg font-black text-slate-900 mb-4">Filters</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Pay Range</label>
                    <select
                      value={selectedPay}
                      onChange={(e) => setSelectedPay(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-emerald-400 outline-none transition font-medium"
                    >
                      <option value="any">Any Pay</option>
                      <option value="high">Higher pay</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Radius: {nearbyRadius} km
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={nearbyRadius}
                      onChange={(e) => setNearbyRadius(Number(e.target.value))}
                      className="w-full h-3 rounded-full appearance-none cursor-pointer bg-slate-200"
                      style={{
                        background: `linear-gradient(to right, rgb(16 185 129) 0%, rgb(16 185 129) ${(nearbyRadius / 50) * 100}%, rgb(226 232 240) ${(nearbyRadius / 50) * 100}%, rgb(226 232 240) 100%)`
                      }}
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={() => {
                        setQuery("");
                        setSelectedPay("any");
                        setNearbyRadius(10);
                      }}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition-all"
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Job list */}
            <div className="space-y-6">
              {filteredJobs.length ? (
                filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} onView={handleViewJob} onApply={handleApply} />
                ))
              ) : (
                <div className="bg-linear-to-br from-white to-slate-50 rounded-3xl p-12 text-center border border-slate-200 shadow-lg">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                    <Search className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-600 font-medium">No jobs found matching filters.</p>
                </div>
              )}
            </div>
          </main>

          <aside className="space-y-6">
            {/* Map */}
            <div className="bg-linear-to-br from-white to-slate-50 rounded-3xl overflow-hidden shadow-lg border border-slate-200">
              <div className="w-full h-64">
                <iframe
                  title="Job Locations Map"
                  className="w-full h-full border-0"
                  src="https://www.google.com/maps?q=India&output=embed"
                />
              </div>
            </div>

            <div className="bg-linear-to-br from-white to-slate-50 rounded-3xl p-6 shadow-lg border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-black text-slate-900">Quick Actions</h4>
                <MessageSquare className="w-5 h-5 text-emerald-600" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setView("applications")}
                  className="px-4 py-3 rounded-2xl border-2 border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all"
                >
                  Applications
                </button>
                <button
                  onClick={() => setView("profile")}
                  className="px-4 py-3 rounded-2xl border-2 border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all"
                >
                  Profile
                </button>
                <button
                  onClick={() => setView("dispute")}
                  className="px-4 py-3 rounded-2xl border-2 border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all"
                >
                  Disputes
                </button>
                <button
                  onClick={() => alert("Contact support")}
                  className="px-4 py-3 rounded-2xl border-2 border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all"
                >
                  Help
                </button>
              </div>
            </div>

            <div className="bg-linear-to-br from-white to-slate-50 rounded-3xl p-6 shadow-lg border border-slate-200">
              <h4 className="text-lg font-black text-slate-900 mb-4">Top Employers</h4>
              <ul className="space-y-3">
                <li className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition">
                  <span className="font-semibold text-slate-800">BuildRight Co.</span>
                  <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400" /> 4.8
                  </span>
                </li>
                <li className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition">
                  <span className="font-semibold text-slate-800">QuickShip</span>
                  <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400" /> 4.6
                  </span>
                </li>
                <li className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition">
                  <span className="font-semibold text-slate-800">Swift Movers</span>
                  <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400" /> 4.5
                  </span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}