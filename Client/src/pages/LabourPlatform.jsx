// // src/pages/LabourDashboard.jsx
// import React, { useEffect, useMemo, useState } from "react";
// // import axios from "axios";
// import {
//   Search as SearchIcon,
//   Bell,
//   User,
//   Briefcase,
//   Clock,
//   MapPin,
//   CheckCircle,
//   AlertCircle,
//   ArrowRight,
//   Star
// } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";

// /**
//  * LabourDashboard.jsx
//  * - Dashboard shown after labour logs in
//  * - Replace API_BASE or endpoints according to backend
//  * - Expects token stored in localStorage key "token" (optional)
//  */

// // const API_BASE = process.env.REACT_APP_API_BASE || ""; // e.g. https://api.example.com

// // const api = axios.create({
// //   baseURL: API_BASE,
// //   headers: { "Content-Type": "application/json" }
// // });
// // api.interceptors.request.use((cfg) => {
// //   const token = localStorage.getItem("token");
// //   if (token) cfg.headers.Authorization = `Bearer ${token}`;
// //   return cfg;
// // });

// const MOCK_JOBS = [
//   { id: "j1", title: "Construction Helper", company: "BuildCo", location: "Kankarbagh, Patna", pay: "₹550/day", distance: "2.3 km", posted: "2h", skills: ["Masonry","Carrying"] },
//   { id: "j2", title: "Warehouse Packer", company: "QuickLogistics", location: "Patna Industrial", pay: "₹480/day", distance: "4.1 km", posted: "6h", skills: ["Packing","Sorting"] },
//   { id: "j3", title: "Painting Work", company: "Home Painters", location: "Boring Road", pay: "₹650/day", distance: "1.8 km", posted: "1d", skills: ["Painting"] }
// ];

// const MOCK_APPS = [
//   { id: "a1", job: "Construction Helper", company: "BuildCo", status: "pending", appliedAt: "2 days ago" },
//   { id: "a2", job: "Painting Work", company: "Home Painters", status: "accepted", appliedAt: "5 days ago", start: "Tomorrow" },
// ];

// export default function LabourDashboard() {
//   const navigate = useNavigate();
//   const [jobs, setJobs] = useState([]);
//   const [apps, setApps] = useState([]);
//   const [loadingJobs, setLoadingJobs] = useState(true);
//   const [loadingApps, setLoadingApps] = useState(true);
//   const [jobsError, setJobsError] = useState("");
//   const [appsError, setAppsError] = useState("");
//   const [query, setQuery] = useState("");
//   const [nearbyOnly, setNearbyOnly] = useState(false);

//   // profile snippet (in a real app fetch from /users/me)
//   const [profile] = useState({
//     name: "Ramesh Kumar",
//     phone: "9000000000",
//     location: "Kankarbagh, Patna",
//     rating: 4.3,
//     skills: ["Masonry", "Carrying"]
//   });

//   useEffect(() => {
//     let mounted = true;
//     setLoadingJobs(true);
//     setJobsError("");
//     api.get("/api/v1/jobs?limit=10")
//       .then(res => {
//         if (!mounted) return;
//         const data = Array.isArray(res.data) ? res.data : (res.data?.jobs || []);
//         setJobs(data.length ? data : MOCK_JOBS);
//       })
//       .catch(err => {
//         console.warn("Jobs fetch failed:", err?.message || err);
//         setJobs(MOCK_JOBS);
//         setJobsError("Unable to fetch jobs (showing sample).");
//       })
//       .finally(() => mounted && setLoadingJobs(false));
//     return () => { mounted = false; };
//   }, []);

//   useEffect(() => {
//     let mounted = true;
//     setLoadingApps(true);
//     setAppsError("");
//     api.get("/api/v1/applications?mine=true")
//       .then(res => {
//         if (!mounted) return;
//         const data = Array.isArray(res.data) ? res.data : (res.data?.applications || []);
//         setApps(data.length ? data : MOCK_APPS);
//       })
//       .catch(err => {
//         console.warn("Applications fetch failed:", err?.message || err);
//         setApps(MOCK_APPS);
//         setAppsError("Unable to fetch applications (showing sample).");
//       })
//       .finally(() => mounted && setLoadingApps(false));
//     return () => { mounted = false; };
//   }, []);

//   const filteredJobs = useMemo(() => {
//     return (jobs || []).filter(j => {
//       const text = (j.title + " " + (j.company || "") + " " + (j.location || "") + " " + (j.skills || []).join(" ")).toLowerCase();
//       const qOk = !query || text.includes(query.toLowerCase());
//       const nearOk = !nearbyOnly || (typeof j.distance === "string" ? j.distance.includes("km") && parseFloat(j.distance) <= 5 : true);
//       return qOk && nearOk;
//     });
//   }, [jobs, query, nearbyOnly]);

//   const handleView = (job) => {
//     // navigate to job detail page (update route to match your router)
//     if (!job || !job.id) return;
//     navigate(`/jobs/${job.id}`);
//   };

//   const handleApply = async (job) => {
//     try {
//       // optimistic UI — in real app call POST /api/v1/jobs/:id/apply
//       const token = localStorage.getItem("token");
//       if (!token) { navigate("/login"); return; }
//       // example API call:
//       // await api.post(`/api/v1/jobs/${job.id}/apply`);
//       setApps(prev => [{ id: Date.now().toString(), job: job.title, company: job.company, status: 'pending', appliedAt: 'just now' }, ...prev]);
//       alert(`Applied for "${job.title}". Check My Applications.`);
//     } catch (err) {
//       console.error("Apply failed:", err);
//       alert("Failed to apply — try again.");
//     }
//   };

//   const quickNavigate = (screen) => {
//     // mapped screens: jobs/applications/dispute/profile
//     switch (screen) {
//       case "jobs": navigate("/jobs"); break;
//       case "applications": navigate("/applications"); break;
//       case "dispute": navigate("/disputes/new"); break;
//       case "profile": navigate("/profile"); break;
//       default: navigate("/"); break;
//     }
//   };

//   return (
//     <main className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow sticky top-0 z-20">
//         <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-2">
//               <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">SS</div>
//               <div>
//                 <div className="text-sm font-semibold">ShramSetu</div>
//                 <div className="text-xs text-gray-500">Labour Dashboard</div>
//               </div>
//             </div>

//             <div className="hidden md:flex items-center bg-gray-100 rounded-full px-3 py-1 gap-2 ml-4">
//               <SearchIcon className="w-4 h-4 text-gray-500" />
//               <input
//                 className="bg-transparent outline-none text-sm w-64"
//                 placeholder="Search jobs, skills or employer"
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 aria-label="Search jobs"
//               />
//             </div>
//           </div>

//           <div className="flex items-center gap-3">
//             <button className="relative p-2 rounded-md hover:bg-gray-100" title="Notifications" aria-label="Notifications">
//               <Bell className="w-5 h-5 text-gray-600" />
//               <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">2</span>
//             </button>

//             <button onClick={() => quickNavigate("jobs")} className="hidden md:inline-flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg">
//               <Briefcase className="w-4 h-4" /> Find Jobs
//             </button>

//             <div className="dropdown dropdown-end">
//               <button tabIndex={0} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
//                 <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-medium">{profile.name.charAt(0)}</div>
//                 <div className="hidden md:block text-left">
//                   <div className="text-sm font-medium">{profile.name}</div>
//                   <div className="text-xs text-gray-500">{profile.location}</div>
//                 </div>
//               </button>
//               <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-white rounded-box w-52 mt-2">
//                 <li><a onClick={() => quickNavigate("profile")}>Profile</a></li>
//                 <li><a onClick={() => quickNavigate("applications")}>My Applications</a></li>
//                 <li><a onClick={() => quickNavigate("dispute")}>Raise Dispute</a></li>
//                 <li><a onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>Logout</a></li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main */}
//       <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left: main feed */}
//         <section className="lg:col-span-2 space-y-6">
//           {/* Top stats */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             <div className="bg-white p-4 rounded-lg shadow-sm">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <div className="text-sm text-gray-500">Active Jobs</div>
//                   <div className="text-xl font-bold">{filteredJobs.length ?? jobs.length}</div>
//                 </div>
//                 <Briefcase className="w-6 h-6 text-blue-600" />
//               </div>
//             </div>

//             <div className="bg-white p-4 rounded-lg shadow-sm">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <div className="text-sm text-gray-500">My Applications</div>
//                   <div className="text-xl font-bold">{apps.length}</div>
//                 </div>
//                 <Clock className="w-6 h-6 text-amber-500" />
//               </div>
//             </div>

//             <div className="bg-white p-4 rounded-lg shadow-sm">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <div className="text-sm text-gray-500">Rating</div>
//                   <div className="text-xl font-bold flex items-center gap-2">{profile.rating} <Star className="w-4 h-4 text-yellow-400" /></div>
//                 </div>
//                 <CheckCircle className="w-6 h-6 text-green-500" />
//               </div>
//             </div>
//           </div>

//           {/* Quick actions */}
//           <div className="bg-white p-4 rounded-lg shadow-sm flex flex-wrap items-center gap-3">
//             <button onClick={() => quickNavigate("jobs")} className="btn btn-ghost btn-sm">Find Jobs</button>
//             <button onClick={() => quickNavigate("applications")} className="btn btn-ghost btn-sm">My Applications</button>
//             <button onClick={() => quickNavigate("dispute")} className="btn btn-ghost btn-sm text-red-600">Raise Dispute</button>
//             <button onClick={() => quickNavigate("profile")} className="btn btn-ghost btn-sm">Edit Profile</button>
//             <div className="ml-auto text-sm text-gray-500">SMS support available</div>
//           </div>

//           {/* Recent / recommended jobs */}
//           <div className="bg-white p-4 rounded-lg shadow-sm">
//             <div className="flex items-center justify-between mb-3">
//               <h3 className="text-lg font-semibold">Recommended jobs for you</h3>
//               <div className="flex items-center gap-2">
//                 <label className="flex items-center gap-2 text-sm">
//                   <input type="checkbox" className="checkbox checkbox-sm" checked={nearbyOnly} onChange={(e) => setNearbyOnly(e.target.checked)} />
//                   Nearby
//                 </label>
//                 <button onClick={() => { setQuery(""); setNearbyOnly(false); }} className="btn btn-ghost btn-sm">Reset</button>
//               </div>
//             </div>

//             {loadingJobs ? (
//               <div className="text-center py-8 text-gray-500">Loading jobs...</div>
//             ) : jobsError ? (
//               <div className="text-yellow-700 bg-yellow-50 p-3 rounded">{jobsError}</div>
//             ) : (
//               <div className="space-y-3">
//                 {filteredJobs.slice(0,6).map(job => (
//                   <article key={job.id} className="p-3 border rounded hover:shadow-sm flex items-start justify-between">
//                     <div>
//                       <h4 className="font-medium">{job.title}</h4>
//                       <div className="text-xs text-gray-500">{job.company} • {job.location} • {job.posted} ago</div>
//                       <div className="mt-2 text-sm text-gray-700">{job.pay} • {job.skills?.slice(0,3).join(", ")}</div>
//                     </div>

//                     <div className="flex flex-col items-end gap-2">
//                       <button onClick={() => handleView(job)} className="text-sm btn btn-ghost btn-xs">View</button>
//                       <button onClick={() => handleApply(job)} className="text-sm btn btn-primary btn-xs">Apply</button>
//                       <div className="text-xs text-gray-500">{job.distance || ""}</div>
//                     </div>
//                   </article>
//                 ))}
//                 {filteredJobs.length === 0 && <div className="text-center py-6 text-gray-500">No jobs found</div>}
//               </div>
//             )}
//           </div>

//           {/* Recent applications */}
//           <div className="bg-white p-4 rounded-lg shadow-sm">
//             <div className="flex items-center justify-between mb-3">
//               <h3 className="text-lg font-semibold">Recent applications</h3>
//               <Link to="/applications" className="text-sm text-blue-600">View all</Link>
//             </div>

//             {loadingApps ? (
//               <div className="text-center py-6 text-gray-500">Loading applications...</div>
//             ) : appsError ? (
//               <div className="text-yellow-700 bg-yellow-50 p-3 rounded">{appsError}</div>
//             ) : (
//               <div className="space-y-3">
//                 {apps.slice(0,5).map(a => (
//                   <div key={a.id} className="p-3 border rounded flex items-center justify-between">
//                     <div>
//                       <div className="font-medium">{a.job}</div>
//                       <div className="text-xs text-gray-500">{a.company} • {a.appliedAt}</div>
//                     </div>
//                     <div className="text-right">
//                       <div className={`text-sm font-medium ${a.status === 'accepted' ? 'text-green-600' : a.status === 'pending' ? 'text-yellow-600' : 'text-gray-600'}`}>
//                         {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
//                       </div>
//                       {a.start && <div className="text-xs text-gray-500">Start: {a.start}</div>}
//                     </div>
//                   </div>
//                 ))}
//                 {apps.length === 0 && <div className="text-center py-6 text-gray-500">You haven't applied to any jobs yet.</div>}
//               </div>
//             )}
//           </div>
//         </section>

//         {/* Right: profile + shortcuts */}
//         <aside className="space-y-6">
//           <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-start gap-3">
//             <div className="flex items-center gap-3 w-full">
//               <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">{profile.name.charAt(0)}</div>
//               <div className="flex-1">
//                 <div className="font-semibold">{profile.name}</div>
//                 <div className="text-sm text-gray-500">{profile.location}</div>
//                 <div className="text-xs text-gray-500 mt-1">Rating: {profile.rating} <Star className="w-3 h-3 inline text-yellow-400" /></div>
//               </div>
//               <button onClick={() => quickNavigate("profile")} className="btn btn-ghost btn-sm">Edit</button>
//             </div>

//             <div className="w-full flex flex-wrap gap-2">
//               {profile.skills.map(s => (
//                 <span key={s} className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full border border-blue-100">{s}</span>
//               ))}
//             </div>

//             <div className="w-full border-t pt-3 flex gap-2">
//               <button onClick={() => quickNavigate("jobs")} className="btn btn-primary btn-sm flex-1">Find Jobs</button>
//               <button onClick={() => quickNavigate("applications")} className="btn btn-ghost btn-sm">My Work</button>
//             </div>
//           </div>

//           <div className="bg-white p-4 rounded-lg shadow-sm">
//             <div className="flex items-center justify-between mb-2">
//               <div className="text-sm font-medium">Support</div>
//               <div className="text-xs text-gray-500">24/7</div>
//             </div>
//             <div className="text-sm text-gray-600">
//               Helpline: <a href="tel:1800123456" className="text-blue-600">1800-123-456</a>
//             </div>
//             <div className="mt-3">
//               <button onClick={() => quickNavigate("dispute")} className="btn btn-outline btn-sm w-full">Raise Dispute</button>
//             </div>
//           </div>

//           <div className="bg-white p-4 rounded-lg shadow-sm">
//             <div className="text-sm font-medium mb-2">Safety tips</div>
//             <ul className="text-xs text-gray-600 space-y-2">
//               <li><CheckCircle className="w-4 h-4 inline mr-2 text-green-500" /> Carry water & PPE</li>
//               <li><AlertCircle className="w-4 h-4 inline mr-2 text-red-500" /> Report unsafe conditions</li>
//               <li><MapPin className="w-4 h-4 inline mr-2 text-blue-500" /> Confirm location before travel</li>
//             </ul>
//           </div>
//         </aside>
//       </div>
//     </main>
//   );
// }






// import React, { useMemo, useState } from "react";
// import { Link } from "react-router-dom"; // optional: remove if not using router
// import {
//   MapPin,
//   Navigation,
//   Search,
//   Filter,
//   Clock,
//   CheckCircle,
//   Star,
//   MessageSquare,
//   FileText,
//   AlertTriangle,
//   DollarSign,
//   User
// } from "lucide-react";

// /* -----------------------------------------
//    Sample data (move to API / state management)
//    ----------------------------------------- */
// const SAMPLE_JOBS = [
//   {
//     id: "job-001",
//     title: "Construction Helper Needed",
//     company: "BuildRight Co.",
//     location: "Downtown",
//     distance: 2.3,
//     pay: "₹800/day",
//     duration: "3 days",
//     posted: "2 hours ago",
//     urgent: true,
//     description:
//       "Tasks include moving materials, assisting skilled workers, site cleanup, and general labor. Bring boots & gloves."
//   },
//   {
//     id: "job-002",
//     title: "Warehouse Packer",
//     company: "QuickShip Logistics",
//     location: "Industrial Park",
//     distance: 4.1,
//     pay: "₹400/day",
//     duration: "1 week",
//     posted: "5 hours ago",
//     urgent: false,
//     description: "Packing & labeling shipments. Standing work. Basic physical fitness required."
//   },
//   {
//     id: "job-003",
//     title: "Moving Assistant",
//     company: "Swift Movers",
//     location: "Westside",
//     distance: 1.8,
//     pay: "₹600/day",
//     duration: "1 day",
//     posted: "1 day ago",
//     urgent: false,
//     description: "Help load/unload household goods. Lifting required. Short-term gig."
//   },
//   {
//     id: "job-004",
//     title: "General Laborer",
//     company: "Metro Construction",
//     location: "City Center",
//     distance: 3.5,
//     pay: "₹500/day",
//     duration: "2 weeks",
//     posted: "1 day ago",
//     urgent: true,
//     description: "Longer-term site work assisting skilled tradespeople."
//   }
// ];

// /* -------------------------
//    Small presentational comps
//    ------------------------- */

// function Header({ query, setQuery, onNearMe, onToggleFilters, showFilters }) {
//   return (
//     <div className="bg-white border-b sticky top-0 z-30">
//       <div className="max-w-7xl mx-auto px-4 py-3">
//         <div className="md:flex md:items-center md:justify-between space-y-3 md:space-y-0">
//           <div className="flex items-center gap-3">
//             <h1 className="text-xl md:text-2xl font-bold text-gray-800">Find Jobs</h1>
//             <span className="hidden md:inline text-sm text-gray-500">Nearby verified daily work</span>
//           </div>

//           <div className="flex-1 md:ml-6">
//             <div className="flex gap-3">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                 <input
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   aria-label="Search jobs"
//                   placeholder="Search by title, company or skills"
//                   className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200"
//                 />
//                 {query && (
//                   <button
//                     onClick={() => setQuery("")}
//                     aria-label="Clear search"
//                     className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
//                   >
//                     ✕
//                   </button>
//                 )}
//               </div>
//               <button
//                 onClick={onToggleFilters}
//                 className={`hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg border ${
//                   showFilters ? "bg-indigo-50 border-indigo-300" : "bg-white border-gray-200"
//                 }`}
//               >
//                 <Filter size={16} /> Filters
//               </button>

//               <button
//                 onClick={onNearMe}
//                 className="inline-flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//               >
//                 <Navigation size={16} /> Near Me
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Small mobile filter button row */}
//         <div className="mt-3 flex gap-2 md:hidden">
//           <button
//             onClick={onToggleFilters}
//             className={`flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border ${
//               showFilters ? "bg-indigo-50 border-indigo-300" : "bg-white border-gray-200"
//             }`}
//           >
//             <Filter size={16} /> Filters
//           </button>
//           <button onClick={onNearMe} className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-indigo-600 text-white">
//             <Navigation size={16} /> Near Me
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function JobCard({ job, onView, onApply }) {
//   return (
//     <article
//       role="button"
//       tabIndex={0}
//       onKeyDown={(e) => e.key === "Enter" && onView(job.id)}
//       className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-5 cursor-pointer flex flex-col justify-between"
//     >
//       <div>
//         <div className="flex items-start justify-between gap-4">
//           <div className="flex-1 pr-3">
//             <div className="flex items-center gap-2">
//               <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
//               {job.urgent && <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">URGENT</span>}
//             </div>
//             <p className="text-sm text-gray-600">{job.company} • {job.location} • {job.distance} km</p>
//             <p className="mt-3 text-sm text-gray-700 line-clamp-3">{job.description}</p>
//           </div>

//           <div className="shrink-0 text-right">
//             <div className="text-2xl font-extrabold text-green-600">{job.pay}</div>
//             <div className="text-xs text-gray-500 mt-1">{job.posted}</div>
//           </div>
//         </div>

//         <div className="mt-4 flex items-center gap-3 text-xs text-gray-500">
//           <span className="inline-flex items-center gap-1"><MapPin size={14}/> {job.location}</span>
//           <span className="inline-flex items-center gap-1"><Clock size={14}/> {job.duration}</span>
//           <span className="inline-flex items-center gap-1"><FileText size={14}/> {job.posted}</span>
//         </div>
//       </div>

//       <div className="mt-5 flex gap-3">
//         <button
//           onClick={() => onApply(job.id)}
//           className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
//         >
//           Apply Now
//         </button>
//         <button
//           onClick={() => onView(job.id)}
//           className="px-4 py-2 border rounded-lg hover:bg-gray-50"
//         >
//           View
//         </button>
//       </div>
//     </article>
//   );
// }

// function SidebarMapPlaceholder() {
//   return (
//     <div className="bg-white rounded-lg shadow p-4 sticky top-24">
//       <h3 className="font-semibold text-gray-800 mb-3">Map View</h3>
//       <div className="bg-gray-100 rounded h-64 flex items-center justify-center">
//         <div className="text-center text-gray-500">
//           <MapPin size={36} className="mx-auto mb-2" />
//           <p className="text-sm">Map showing nearby jobs</p>
//         </div>
//       </div>
//       <div className="mt-4 text-sm text-gray-600">Tip: allow location access for better results.</div>
//     </div>
//   );
// }

// /* -------------------------
//    Main page component
//    ------------------------- */

// export default function LaborerPlatform() {
//   const [query, setQuery] = useState("");
//   const [showFilters, setShowFilters] = useState(false);
//   const [nearbyRadius, setNearbyRadius] = useState(10); // km
//   const [selectedPay, setSelectedPay] = useState("any");
//   const [view, setView] = useState("feed"); // feed | details | applications | profile | dispute
//   const [selectedJob, setSelectedJob] = useState(null);

//   // Filtered jobs (memoized)
//   const filteredJobs = useMemo(() => {
//     const q = query.trim().toLowerCase();
//     return SAMPLE_JOBS.filter((j) => {
//       const text = `${j.title} ${j.company} ${j.description} ${j.location}`.toLowerCase();
//       const matchesQuery = q === "" || text.includes(q);
//       const matchesPay = selectedPay === "any" || (selectedPay === "high" ? j.pay.includes("₹1,8") || j.pay.includes("₹1,6") : true);
//       const matchesRadius = j.distance <= nearbyRadius;
//       return matchesQuery && matchesPay && matchesRadius;
//     });
//   }, [query, selectedPay, nearbyRadius]);

//   /* -------------------------
//      Action handlers (connect to backend or navigation)
//      ------------------------- */
//   function handleNearMe() {
//     // In production: request geolocation and update radius results
//     // For now: toggle radius between 5/10/25 km to simulate
//     setNearbyRadius((r) => (r === 10 ? 5 : r === 5 ? 25 : 10));
//   }

//   function handleToggleFilters() {
//     setShowFilters((s) => !s);
//   }

//   function handleViewJob(jobId) {
//     const job = SAMPLE_JOBS.find((j) => j.id === jobId);
//     setSelectedJob(job || null);
//     setView("details");
//     // Optionally navigate: history.push(`/jobs/${jobId}`)
//   }

//   function handleApply(jobId) {
//     // In production: call API to apply; here we'll show a small confirmation
//     alert(`Applied to ${jobId}. Your application has been sent.`);
//     // Optionally update state to reflect application
//   }

//   /* -------------
//      Views
//      ------------- */
//   if (view === "details" && selectedJob) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-4">
//         <div className="max-w-4xl mx-auto">
//           <button onClick={() => setView("feed")} className="text-indigo-600 mb-4">← Back to Jobs</button>

//           <div className="bg-white rounded-lg overflow-hidden shadow">
//             <div className="bg-linear-to-r from-indigo-600 to-purple-600 text-white p-6">
//               <div className="flex items-start justify-between gap-4">
//                 <div>
//                   <h1 className="text-2xl md:text-3xl font-bold">{selectedJob.title}</h1>
//                   <p className="mt-1 text-indigo-100">{selectedJob.company} • {selectedJob.location}</p>
//                   <div className="mt-3 flex items-center gap-4 text-sm">
//                     <span className="inline-flex items-center gap-1"><MapPin size={16}/> {selectedJob.distance} km</span>
//                     <span className="inline-flex items-center gap-1"><Clock size={16}/> {selectedJob.duration}</span>
//                   </div>
//                 </div>

//                 <div className="text-right">
//                   <div className="text-3xl font-extrabold">{selectedJob.pay}</div>
//                   <div className="text-sm mt-1 text-indigo-100">{selectedJob.posted}</div>
//                 </div>
//               </div>
//             </div>

//             <div className="p-6">
//               <h2 className="text-lg font-semibold mb-2">Job Description</h2>
//               <p className="text-gray-700 leading-relaxed mb-4">{selectedJob.description}</p>

//               <div className="grid md:grid-cols-2 gap-6 mb-6">
//                 <div>
//                   <h3 className="font-semibold mb-2">Requirements</h3>
//                   <ul className="space-y-2 text-gray-700">
//                     <li className="flex items-start gap-2"><CheckCircle className="text-green-600" size={18} /> Must be 18+ years old</li>
//                     <li className="flex items-start gap-2"><CheckCircle className="text-green-600" size={18} /> Able to lift 50 kg</li>
//                     <li className="flex items-start gap-2"><CheckCircle className="text-green-600" size={18} /> Punctual & safety aware</li>
//                   </ul>
//                 </div>
//                 <div>
//                   <h3 className="font-semibold mb-2">Details</h3>
//                   <div className="space-y-2 text-gray-700">
//                     <div className="flex justify-between"><span>Start</span><span className="font-semibold">Nov 5, 2025</span></div>
//                     <div className="flex justify-between"><span>Hours</span><span className="font-semibold">7 AM - 3 PM</span></div>
//                     <div className="flex justify-between"><span>Payment</span><span className="font-semibold">Daily via Escrow</span></div>
//                     <div className="flex justify-between"><span>Positions</span><span className="font-semibold">3 available</span></div>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex gap-3">
//                 <button onClick={() => handleApply(selectedJob.id)} className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700">Apply</button>
//                 <button onClick={() => alert("Saved for later")} className="px-4 py-3 border rounded-lg">Save</button>
//               </div>
//             </div>
//           </div>

//           <div className="mt-6 space-y-4">
//             <div className="bg-white rounded-lg p-4 shadow">
//               <h3 className="font-semibold text-gray-800 mb-2">About {selectedJob.company}</h3>
//               <p className="text-gray-700">Trusted contractor in residential construction. Rated highly for fair pay and clear terms.</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   /* -------------
//      Feed (default) view
//      ------------- */
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header
//         query={query}
//         setQuery={setQuery}
//         onNearMe={handleNearMe}
//         onToggleFilters={handleToggleFilters}
//         showFilters={showFilters}
//       />

//       <div className="max-w-7xl mx-auto px-4 py-6">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <main className="lg:col-span-2 space-y-4">
//             {/* filters panel */}
//             {showFilters && (
//               <div className="bg-white rounded-lg p-4 border">
//                 <div className="grid sm:grid-cols-3 gap-3">
//                   <select value={selectedPay} onChange={(e) => setSelectedPay(e.target.value)} className="px-3 py-2 border rounded">
//                     <option value="any">Any Pay</option>
//                     <option value="high">Higher pay</option>
//                   </select>

//                   <div className="flex items-center gap-2">
//                     <label className="text-sm text-gray-600">Radius (km)</label>
//                     <input
//                       type="range"
//                       min="1"
//                       max="50"
//                       value={nearbyRadius}
//                       onChange={(e) => setNearbyRadius(Number(e.target.value))}
//                       className="flex-1"
//                     />
//                     <div className="text-sm w-12 text-right">{nearbyRadius}</div>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <button onClick={() => { setQuery(""); setSelectedPay("any"); setNearbyRadius(10); }} className="px-3 py-2 border rounded">Reset</button>
//                     <div className="text-sm text-gray-500">Filters update instantly</div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* job list */}
//             <div className="space-y-4">
//               {filteredJobs.length ? (
//                 filteredJobs.map((job) => (
//                   <JobCard key={job.id} job={job} onView={handleViewJob} onApply={handleApply} />
//                 ))
//               ) : (
//                 <div className="bg-white rounded-lg p-6 text-center text-gray-500">No jobs found matching filters.</div>
//               )}
//             </div>
//           </main>

//           <aside className="lg:col-span-1">
//             {/* <SidebarMapPlaceholder /> */}
//                 <div className="bg-white rounded-2xl p-0 overflow-hidden shadow-sm">
//               <div className="w-full h-56">
                
//                 <iframe
//                   title="ShramSetu Office"
//                   className="w-full h-full border-0"
//                   src="https://www.google.com/maps?q=India&output=embed"
//                 />
//               </div>
//             </div>

//             <div className="mt-4 space-y-4">
//               <div className="bg-white rounded-lg p-4 shadow">
//                 <div className="flex items-center justify-between mb-3">
//                   <div className="text-sm text-gray-600">Quick Actions</div>
//                   <MessageSquare size={16} className="text-gray-400" />
//                 </div>

//                 <div className="grid grid-cols-2 gap-2">
//                   <button onClick={() => setView("applications")} className="px-3 py-2 rounded border text-sm">Applications</button>
//                   <button onClick={() => setView("profile")} className="px-3 py-2 rounded border text-sm">Profile</button>
//                   <button onClick={() => setView("dispute")} className="px-3 py-2 rounded border text-sm">Disputes</button>
//                   <button onClick={() => alert("Contact support")} className="px-3 py-2 rounded border text-sm">Help</button>
//                 </div>
//               </div>

//               <div className="bg-white rounded-lg p-4 shadow">
//                 <h4 className="font-semibold mb-2">Top Employers</h4>
//                 <ul className="space-y-2 text-sm text-gray-700">
//                   <li className="flex items-center justify-between"><span>BuildRight Co.</span> <span className="text-xs text-gray-500">4.8 ★</span></li>
//                   <li className="flex items-center justify-between"><span>QuickShip</span> <span className="text-xs text-gray-500">4.6 ★</span></li>
//                   <li className="flex items-center justify-between"><span>Swift Movers</span> <span className="text-xs text-gray-500">4.5 ★</span></li>
//                 </ul>
//               </div>
//             </div>
//           </aside>
//         </div>
//       </div>
//     </div>
//   );
// }















import React, { useMemo, useState } from "react";
import { MapPin, Navigation, Search, Filter, Clock, CheckCircle, Star, MessageSquare, FileText, AlertTriangle, DollarSign, User } from "lucide-react";

/* Sample data */
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

        {/* Mobile filter buttons */}
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

            {/* Quick Actions */}
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

            {/* Top Employers */}
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