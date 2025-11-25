import React, { useMemo, useState } from "react";
import {Link} from 'react-router-dom'
import { MapPin, Phone, Briefcase, Users, ShieldCheck, Search, X, Clock, ArrowRight, Star, TrendingUp } from "lucide-react";
import JobCard from "../components/JobCards";
import Footer from "../components/layout/Footer";

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
    rating: 4.8,
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
    rating: 4.6,
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
    rating: 4.9,
  },
];

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
    <main className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50">

      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-linear-to-br from-emerald-200/50 via-teal-50/30 to-cyan-50/50" />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-emerald-100 to-teal-100 text-emerald-700 font-bold text-sm mb-6 shadow-sm">
              <TrendingUp className="w-4 h-4" />
              <span>Trusted by 8.5K+ Workers</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-black leading-tight mb-6">
              <span className="bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
                Empowering Rural Workers,
              </span>
              <br />
              <span className="bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Building Tomorrow
              </span>
            </h1>
            
            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
              Find nearby verified jobs, apply with one tap, and use our mediation system for fair dispute resolution. Join thousands of workers building a better future.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link to="/jobs" className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-2xl hover:shadow-emerald-500/50 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 hover:scale-105">
                Find Jobs <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/signup" className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl border-2 border-slate-300 text-slate-700 bg-white hover:bg-slate-50 font-bold transition-all duration-300 hover:scale-105 hover:border-emerald-300">
                Post a Job
              </Link>
            </div>

            {/* Search Bar */}
            <div className="relative bg-white rounded-3xl border-2 border-slate-200 shadow-xl p-2 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white transition font-medium"
                    placeholder="Search jobs, skills, or employer..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                <button
                  onClick={() => setNearbyOnly((s) => !s)}
                  className={`inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl font-bold transition-all ${
                    nearbyOnly
                      ? "bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <MapPin className="w-5 h-5" />
                  <span>{nearbyOnly ? "Nearby Only" : "Nearby"}</span>
                </button>
                
                <button className="px-6 py-3.5 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-teal-600 transition-all">
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { num: "1.2K+", label: "Active Jobs", icon: Briefcase },
              { num: "8.5K+", label: "Workers", icon: Users },
              { num: "500+", label: "Employers", icon: ShieldCheck },
              { num: "98%", label: "Success Rate", icon: TrendingUp },
            ].map((stat, i) => (
              <div
                key={i}
                className="group relative bg-linear-to-br from-white to-slate-50 border border-slate-200 rounded-3xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-br from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/10 group-hover:to-teal-500/10 transition-all duration-500" />
                <div className="relative z-10">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-linear-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="text-3xl font-black bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    {stat.num}
                  </div>
                  <div className="text-sm text-slate-500 font-semibold mt-1">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-slate-900 mb-4">What We Offer</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Everything you need to find work, connect with employers, and resolve disputes fairly
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: "Verified Profiles",
              desc: "KYC & ratings to build trust between workers and employers.",
              gradient: "from-emerald-500 to-teal-500",
            },
            {
              icon: Briefcase,
              title: "Skill-based Matching",
              desc: "Find jobs that match your skills and distance preferences.",
              gradient: "from-teal-500 to-cyan-500",
            },
            {
              icon: Users,
              title: "Mediation Support",
              desc: "Raise disputes and get help from trained mediators.",
              gradient: "from-cyan-500 to-blue-500",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="group relative bg-linear-to-br from-white to-slate-50 border border-slate-200 rounded-3xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-br from-emerald-500/0 to-cyan-500/0 group-hover:from-emerald-500/5 group-hover:to-cyan-500/5 transition-all duration-500" />
              <div className="relative z-10">
                <div className={`w-16 h-16 mx-auto mb-5 rounded-2xl bg-linear-to-br ${feature.gradient} flex items-center justify-center shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-3">{feature.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section id="jobs" className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-4xl font-black text-slate-900 mb-2">Featured Jobs Near You</h2>
            <p className="text-slate-600">Hand-picked opportunities in your area</p>
          </div>
          <Link to="/jobs" className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 transition">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.length ? (
            filtered.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <div className="col-span-full p-12 bg-linear-to-br from-white to-slate-50 border-2 border-dashed border-slate-300 rounded-3xl text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-600 font-medium">No jobs found. Try clearing filters or expand your search radius.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-4xl lg:text-5xl font-black text-white mb-6">
              Ready to Get Started?
            </h3>
            <p className="text-xl text-slate-300 mb-10">
              Sign up as a worker or post your first job — trusted, local, and fair.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/signup" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-2xl hover:shadow-emerald-500/50 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 hover:scale-105">
                Get Started <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/contactpage" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-white text-white hover:bg-white hover:text-slate-900 font-bold transition-all duration-300 hover:scale-105">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer/>
      
    </main>
  );
}