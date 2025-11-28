// import React, { useEffect, useState } from "react";
// import { Bell, Menu, X, User, LogOut, Settings, Home, ChevronDown, Sun, Moon, Search } from "lucide-react";
// import {Link, useNavigate} from 'react-router-dom'

// function IconButton({ children, onClick, badge }) {
//   return (
//     <button
//       onClick={onClick}
//       className="relative inline-flex items-center justify-center p-2.5 rounded-xl hover:bg-linear-to-br hover:from-emerald-50 hover:to-cyan-50 dark:hover:from-emerald-950 dark:hover:to-cyan-950 transition-all duration-300 hover:scale-105"
//     >
//       {children}
//       {badge ? (
//         <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold bg-linear-to-r from-rose-500 to-pink-500 text-white rounded-full shadow-lg animate-pulse">
//           {badge}
//         </span>
//       ) : null}
//     </button>
//   );
// }

// function Sidebar({ collapsed, onNavigate, userInitials }) {
//   return (
//     <aside
//       className={`bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 h-full border-r border-slate-700/50 backdrop-blur-xl transition-all duration-300 ${
//         collapsed ? "w-20" : "w-64"
//       }`}
//     >
//       <div className="h-full flex flex-col">
//         <div className="px-4 py-6 flex items-center gap-3">
//           <div
//             className={`rounded-2xl bg-linear-to-br from-emerald-400 via-teal-500 to-cyan-500 text-white grid place-items-center font-black shadow-lg shadow-emerald-500/30 ${
//               collapsed ? "w-11 h-11" : "w-14 h-14"
//             }`}
//           >
//             KS
//           </div>
//           {!collapsed && (
//             <div>
//               <div className="text-xl font-black bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">KaamSetu</div>
//               <div className="text-xs text-slate-400 font-medium">Local work • Fair pay</div>
//             </div>
//           )}
//         </div>

//         <nav className="mt-6 px-3 flex-1 space-y-2">
//           <NavItem collapsed={collapsed} label="Dashboard" onClick={() => onNavigate("dashboard")} />
//           <NavItem collapsed={collapsed} label="Jobs" onClick={() => onNavigate("jobs")} />
//           <NavItem collapsed={collapsed} label="Applications" onClick={() => onNavigate("applications")} />
//           <NavItem collapsed={collapsed} label="Disputes" onClick={() => onNavigate("disputes")} />
//         </nav>

//         <div className="px-3 py-6">
//           <button className="w-full text-sm text-slate-300 px-4 py-2.5 rounded-xl hover:bg-slate-700/50 transition-all duration-300 font-medium">
//             Help & feedback
//           </button>
//         </div>
//       </div>
//     </aside>
//   );
// }

// function NavItem({ label, onClick, collapsed }) {
//   return (
//     <button
//       onClick={onClick}
//       className="group flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-linear-to-r hover:from-emerald-500/20 hover:to-cyan-500/20 transition-all duration-300 text-slate-300 hover:text-white relative overflow-hidden"
//     >
//       <div className="absolute inset-0 bg-linear-to-r from-emerald-500/0 to-cyan-500/0 group-hover:from-emerald-500/10 group-hover:to-cyan-500/10 transition-all duration-300" />
//       <Home className="w-5 h-5 relative z-10 group-hover:text-emerald-400 transition-colors" />
//       {!collapsed && <span className="text-sm font-semibold relative z-10">{label}</span>}
//     </button>
//   );
// }

// function Topbar({ onToggleSidebar, collapsed, onToggleDark, isDark, onSearch }) {
//   return (
//     <div className="flex items-center justify-between gap-4">
//       <div className="flex items-center gap-3">
//         <button onClick={onToggleSidebar} className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 hover:scale-105">
//           {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
//         </button>

//         <div className="relative hidden sm:flex items-center">
//           <input
//             onChange={(e) => onSearch(e.target.value)}
//             placeholder="Search jobs, applicants..."
//             className="pl-11 pr-4 py-3 rounded-2xl bg-linear-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 outline-none border-2 border-transparent focus:border-emerald-400 dark:focus:border-emerald-600 transition-all duration-300 w-80 shadow-sm"
//           />
//           <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
//             <Search className="w-5 h-5" />
//           </div>
//         </div>
//       </div>

//       <div className="flex items-center gap-2">
//         <IconButton onClick={() => {}} badge={3}>
//           <Bell className="w-5 h-5 text-slate-700 dark:text-slate-200" />
//         </IconButton>

//         <IconButton onClick={onToggleDark}>
//           {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
//         </IconButton>
//       </div>
//     </div>
//   );
// }

// function StatCard({ title, value, delta }) {
//   return (
//     <div className="group relative bg-linear-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 p-6 rounded-3xl shadow-lg hover:shadow-xl border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:scale-105 overflow-hidden">
//       <div className="absolute inset-0 bg-linear-to-br from-emerald-500/0 to-cyan-500/0 group-hover:from-emerald-500/5 group-hover:to-cyan-500/5 transition-all duration-300" />
//       <div className="relative z-10">
//         <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{title}</div>
//         <div className="mt-3 flex items-baseline gap-3">
//           <div className="text-3xl font-black bg-linear-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">{value}</div>
//           {delta && <div className="text-sm font-bold text-emerald-500 flex items-center gap-1">▲ {delta}</div>}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function HomePage() {
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [isDark, setIsDark] = useState(false);
//   const [query, setQuery] = useState("");
//   const [user] = useState({ firstName: "Demo" });
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (isDark) document.documentElement.classList.add("dark");
//     else document.documentElement.classList.remove("dark");
//   }, [isDark]);

//   const handleNavigate = (page) => {
//     console.log("Navigating to:", page);
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100">
//       <div className="flex h-screen">
//         <Sidebar collapsed={sidebarCollapsed} onNavigate={handleNavigate} userInitials={user?.firstName?.[0] || "U"} />

//         <div className="flex-1 flex flex-col">
//           <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-6 py-4 shadow-sm">
//             <Topbar
//               onToggleSidebar={() => setSidebarCollapsed((s) => !s)}
//               collapsed={sidebarCollapsed}
//               onToggleDark={() => setIsDark((s) => !s)}
//               isDark={isDark}
//               onSearch={(q) => setQuery(q)}
//             />
//           </header>

//           <main className="p-8 overflow-auto">
//             <div className="max-w-7xl mx-auto">
//               <div className="flex items-center justify-between mb-8">
//                 <div>
//                   <h1 className="text-4xl font-black bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">Dashboard</h1>
//                   <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">Overview of your KaamSetu activity</p>
//                 </div>

//                 <div className="flex items-center gap-4">
//                   <div className="text-right">
//                     <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Signed in as</div>
//                     <div className="font-bold text-slate-800 dark:text-slate-200">{user?.firstName || "User"}</div>
//                   </div>

//                   <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-emerald-400 via-teal-500 to-cyan-500 grid place-items-center font-black text-white shadow-lg shadow-emerald-500/30">{(user?.firstName || "U")[0]}</div>
//                 </div>
//               </div>

//               <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//                 <StatCard title="Open Jobs" value={42} delta="4%" />
//                 <StatCard title="Applications" value={128} delta="2%" />
//                 <StatCard title="Earnings (mo)" value="₹12,400" delta="8%" />
//               </section>

//               <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                 <div className="lg:col-span-2">
//                   <div className="bg-linear-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-3xl shadow-xl p-6 border border-slate-200 dark:border-slate-700">
//                     <div className="flex items-center justify-between mb-6">
//                       <h3 className="text-xl font-black text-slate-900 dark:text-slate-100">Latest activity</h3>
//                       <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30">Updated 2m ago</div>
//                     </div>

//                     <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-200">
//                       <li className="p-4 rounded-2xl hover:bg-linear-to-r hover:from-emerald-50 hover:to-cyan-50 dark:hover:from-emerald-950/50 dark:hover:to-cyan-950/50 transition-all duration-300 border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800">New applicant for <strong className="text-emerald-600 dark:text-emerald-400">Plumber</strong></li>
//                       <li className="p-4 rounded-2xl hover:bg-linear-to-r hover:from-emerald-50 hover:to-cyan-50 dark:hover:from-emerald-950/50 dark:hover:to-cyan-950/50 transition-all duration-300 border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800">Payment received for <strong className="text-emerald-600 dark:text-emerald-400">#145</strong></li>
//                       <li className="p-4 rounded-2xl hover:bg-linear-to-r hover:from-emerald-50 hover:to-cyan-50 dark:hover:from-emerald-950/50 dark:hover:to-cyan-950/50 transition-all duration-300 border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800">Job <strong className="text-emerald-600 dark:text-emerald-400">Electrician</strong> marked completed</li>
//                     </ul>

//                     <div className="mt-6 text-right">
//                       <button onClick={() => handleNavigate('applications')} className="text-sm font-bold px-6 py-3 rounded-2xl bg-linear-to-r from-emerald-500 to-cyan-500 text-white hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">View all</button>
//                     </div>
//                   </div>
//                 </div>

//                 <aside className="space-y-6">
//                   <div className="bg-linear-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-3xl shadow-xl p-6 border border-slate-200 dark:border-slate-700">
//                     <h4 className="text-sm font-black mb-4 text-slate-900 dark:text-slate-100 uppercase tracking-wider">Quick actions</h4>
//                     <div className="flex flex-col gap-3">
//                       <Link to="/employplatform" className="w-full px-4 py-3 rounded-2xl bg-linear-to-r from-emerald-500 to-cyan-500 text-white font-bold hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">Post a job</Link>
//                       <button onClick={() => handleNavigate('payments')} className="w-full px-4 py-3 rounded-2xl border-2 border-slate-300 dark:border-slate-600 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 hover:scale-105">View payouts</button>
//                     </div>
//                   </div>

//                   <div className="bg-linear-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-3xl shadow-xl p-6 border border-slate-200 dark:border-slate-700">
//                     <h4 className="text-sm font-black mb-4 text-slate-900 dark:text-slate-100 uppercase tracking-wider">Notifications</h4>
//                     <div className="text-sm text-slate-600 dark:text-slate-300 space-y-3">
//                       <div className="p-3 rounded-2xl hover:bg-linear-to-r hover:from-emerald-50 hover:to-cyan-50 dark:hover:from-emerald-950/50 dark:hover:to-cyan-950/50 transition-all duration-300">You have <strong className="text-emerald-600 dark:text-emerald-400">3</strong> new messages</div>
//                       <div className="p-3 rounded-2xl hover:bg-linear-to-r hover:from-emerald-50 hover:to-cyan-50 dark:hover:from-emerald-950/50 dark:hover:to-cyan-950/50 transition-all duration-300">Verification pending for bank account</div>
//                     </div>
//                   </div>
//                 </aside>
//               </section>
//             </div>
//           </main>

//           <footer className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 text-sm text-slate-500 dark:text-slate-400 font-medium backdrop-blur-sm bg-white/50 dark:bg-slate-900/50">© {new Date().getFullYear()} KaamSetu. All rights reserved.</footer>
//         </div>
//       </div>
//     </div>
//   );
// }








import React from "react";
import {Link} from 'react-router-dom'
import { Briefcase, Users, Wallet, ArrowUpRight, ArrowRight, Plus, Search, Filter, UserCheck, CreditCard, Clock, CheckCircle2, MoreHorizontal, IndianRupee, TrendingUp, MapPin } from "lucide-react";

const jobStats = [
  { label: "Open Jobs", value: 5, subtext: "2 closing this week", icon: Briefcase },
  { label: "Total Applications", value: 132, subtext: "18 new today", icon: Users },
  { label: "Hires This Month", value: 9, subtext: "On track for target", icon: UserCheck },
  { label: "Total Spent", value: "₹84,300", subtext: "Across 3 months", icon: Wallet },
];

const recentJobs = [
  { id: "KAM-1201", title: "Warehouse Helper", location: "Noida Sector 63", type: "Full-time", applications: 24, hired: 2, status: "Open", postedOn: "2 days ago" },
  { id: "KAM-1189", title: "House Painting Crew", location: "East Delhi", type: "Short-term", applications: 17, hired: 3, status: "Interviewing", postedOn: "5 days ago" },
  { id: "KAM-1175", title: "Electrician (Residential)", location: "Gurugram", type: "Contract", applications: 12, hired: 1, status: "Closed", postedOn: "1 week ago" },
];

const recentApplications = [
  { name: "Ravi Kumar", role: "Warehouse Helper", experience: "2 yrs", stage: "Shortlisted", appliedAt: "3h ago" },
  { name: "Sangeeta Devi", role: "Domestic Helper", experience: "5 yrs", stage: "Interview Scheduled", appliedAt: "Yesterday" },
  { name: "Imran Ali", role: "House Painting Crew", experience: "3 yrs", stage: "New", appliedAt: "Just now" },
];

const paymentSummary = {
  totalPaid: "₹84,300",
  upcomingPayout: "₹12,500",
  nextPayoutDate: "28 Nov, 2025",
};

const recentPayments = [
  { id: "#PAY-9821", purpose: "Wages - House Painting Crew", amount: "₹18,000", status: "Completed", date: "25 Nov", method: "UPI" },
  { id: "#PAY-9775", purpose: "Advance - Warehouse Helpers", amount: "₹7,500", status: "Processing", date: "23 Nov", method: "Bank Transfer" },
  { id: "#PAY-9710", purpose: "Full & Final - Electrician", amount: "₹12,800", status: "Completed", date: "18 Nov", method: "UPI" },
];

const recentActivity = [
  { type: "job", title: "New job posted", description: "Warehouse Helper at Noida Sector 63", time: "2h ago" },
  { type: "hire", title: "Candidate hired", description: "Ravi Kumar hired for Construction Helper", time: "Yesterday" },
  { type: "payment", title: "Payment completed", description: "₹18,000 paid for House Painting Crew", time: "2 days ago" },
  { type: "job", title: "Job closed", description: "Electrician (Residential) marked as filled", time: "5 days ago" },
];

const EmployerDashboard = () => {
  const employerName = "KaamSetu Employer";

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500 rounded-full blur-3xl opacity-5" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-5" />
      </div>

      {/* Header */}
      <header className=" top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-linear-to-r from-emerald-100 to-teal-100 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-3">
                <Briefcase className="w-3 h-3" />
                Employer Control Panel
              </div>
              <h1 className="text-3xl font-black bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2">
                Hi, {employerName.split(" ")[0]} — let's manage your workforce 🚀
              </h1>
              <p className="text-slate-600 font-medium max-w-2xl">
                Post jobs, track applications, review payments, and keep a history of all your hiring activity in one place.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <button className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border-2 border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition-all">
                <IndianRupee className="w-4 h-4" />
                Payment Center
              </button>
              <Link to="/jobpost" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-teal-600 transition-all">
                <Plus className="w-5 h-5" />
                Post a Job
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {jobStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="group relative bg-linear-to-br from-white to-slate-50 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200 overflow-hidden hover:scale-105"
              >
                <div className="absolute inset-0 bg-linear-to-br from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/5 group-hover:to-teal-500/5 transition-all duration-500" />
                
                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-black text-slate-900 mb-2">
                      {stat.value}
                    </p>
                    <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {stat.subtext}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-emerald-100 to-teal-100 flex items-center justify-center shadow-lg">
                    <Icon className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Jobs & Applications */}
          <section className="lg:col-span-2 space-y-6">
            {/* Jobs Section */}
            <div className="bg-linear-to-br from-white to-slate-50 rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-black text-slate-900">Your Job Postings</h2>
                    <p className="text-sm text-slate-600 mt-1">Overview of recent jobs and their application funnel.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search jobs..."
                        className="pl-10 pr-4 py-2.5 rounded-2xl border-2 border-slate-200 bg-white text-sm outline-none focus:border-emerald-400 transition font-medium"
                      />
                    </div>
                    <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border-2 border-slate-300 bg-white text-sm font-bold text-slate-700 hover:bg-slate-50 transition">
                      <Filter className="w-4 h-4" />
                      Filters
                    </button>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-slate-200">
                {recentJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-6 hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-linear-to-r from-emerald-100 to-teal-100 text-emerald-700 text-xs font-black">
                            {job.id}
                          </span>
                          <h3 className="text-lg font-black text-slate-900">{job.title}</h3>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm">
                          <span className="inline-flex items-center gap-1.5 text-slate-600">
                            <MapPin className="w-4 h-4 text-emerald-600" />
                            {job.location}
                          </span>
                          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs">
                            {job.type}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="text-2xl font-black text-slate-900">{job.applications}</div>
                          <div className="text-xs text-slate-500 font-semibold">Applications</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-black text-emerald-600">{job.hired}</div>
                          <div className="text-xs text-slate-500 font-semibold">Hired</div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                            job.status === "Open"
                              ? "bg-linear-to-r from-emerald-100 to-teal-100 text-emerald-700"
                              : job.status === "Interviewing"
                              ? "bg-linear-to-r from-cyan-100 to-blue-100 text-cyan-700"
                              : "bg-slate-100 text-slate-700"
                          }`}>
                            {job.status}
                          </span>
                          <button className="inline-flex items-center gap-1 text-sm font-bold text-emerald-600 hover:text-emerald-700">
                            View <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <p className="text-sm text-slate-600 font-medium">
                  Showing {recentJobs.length} recent job postings
                </p>
                <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700">
                  View all jobs →
                </button>
              </div>
            </div>

            {/* Recent Applications */}
            <div className="bg-linear-to-br from-white to-slate-50 rounded-3xl shadow-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Recent Applications</h2>
                  <p className="text-sm text-slate-600 mt-1">Latest candidates across your open jobs.</p>
                </div>
                <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700">
                  View all
                </button>
              </div>

              <div className="space-y-3">
                {recentApplications.map((app) => (
                  <div
                    key={app.name + app.role}
                    className="flex items-center justify-between p-4 rounded-2xl border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-black shadow-lg">
                        {app.name.split(" ")[0][0]}
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900">{app.name}</p>
                        <p className="text-sm text-emerald-600 font-semibold">{app.role}</p>
                        <p className="text-xs text-slate-500 font-medium">{app.experience}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        app.stage === "New"
                          ? "bg-slate-100 text-slate-700"
                          : app.stage === "Shortlisted"
                          ? "bg-linear-to-r from-emerald-100 to-teal-100 text-emerald-700"
                          : "bg-linear-to-r from-cyan-100 to-blue-100 text-cyan-700"
                      }`}>
                        {app.stage}
                      </span>
                      <p className="text-xs text-slate-500 font-medium">{app.appliedAt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Right: Payments & Activity */}
          <section className="space-y-6">
            {/* Payments */}
            <div className="bg-linear-to-br from-white to-slate-50 rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-black text-slate-900">Payments Overview</h2>
                    <p className="text-xs text-slate-600 mt-1">Track payouts and hiring spend.</p>
                  </div>
                  <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1">
                    View all <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-6 bg-linear-to-r from-slate-900 via-slate-800 to-slate-900">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">Total Paid</p>
                    <p className="text-3xl font-black text-white flex items-center gap-2">
                      <IndianRupee className="w-6 h-6" />
                      {paymentSummary.totalPaid.replace("₹", "")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1 justify-end mb-1">
                      <Clock className="w-3 h-3" />
                      Next payout
                    </p>
                    <p className="text-sm font-bold text-white">{paymentSummary.nextPayoutDate}</p>
                    <p className="text-lg font-black text-emerald-400 mt-2">{paymentSummary.upcomingPayout}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-3">
                {recentPayments.map((pay) => (
                  <div
                    key={pay.id}
                    className="flex items-start justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{pay.purpose}</p>
                        <p className="text-xs text-slate-500 font-medium mt-1">
                          {pay.id} • {pay.method} • {pay.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <p className="text-sm font-black text-slate-900">{pay.amount}</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        pay.status === "Completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}>
                        {pay.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="bg-linear-to-br from-white to-slate-50 rounded-3xl shadow-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-black text-slate-900">Recent Activity</h2>
                <p className="text-xs text-slate-500 font-semibold">Jobs • Hires • Payments</p>
              </div>

              <div className="space-y-4">
                {recentActivity.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-lg ${
                        item.type === "job"
                          ? "bg-linear-to-br from-sky-500 to-blue-600"
                          : item.type === "hire"
                          ? "bg-linear-to-br from-emerald-500 to-teal-600"
                          : "bg-linear-to-br from-amber-500 to-orange-600"
                      }`}>
                        {item.type === "job" && <Briefcase className="w-5 h-5" />}
                        {item.type === "hire" && <CheckCircle2 className="w-5 h-5" />}
                        {item.type === "payment" && <Wallet className="w-5 h-5" />}
                      </div>
                      {index !== recentActivity.length - 1 && (
                        <div className="w-0.5 flex-1 bg-slate-200 mt-2" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-900">{item.title}</p>
                      <p className="text-sm text-slate-600 mt-1">{item.description}</p>
                      <p className="text-xs text-slate-500 font-medium mt-1">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Card */}
            <div className="relative overflow-hidden bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl p-6 text-white shadow-2xl">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl" />
              </div>
              <div className="relative z-10">
                <h3 className="text-lg font-black mb-2">Want to hire faster with verified workers?</h3>
                <p className="text-sm text-emerald-50 mb-4">
                  Boost your job visibility and get more applications from trusted workers in your area.
                </p>
                <button className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/20 backdrop-blur-sm hover:bg-white/30 text-sm font-bold transition-all">
                  <TrendingUp className="w-4 h-4" />
                  Explore Boost Options
                </button>
              </div>
            </div>
          </section>
        </div>

        <footer className="pt-6 pb-4 text-center text-sm text-slate-500 font-medium">
          © {new Date().getFullYear()} KaamSetu • Employer Dashboard
        </footer>
      </main>
    </div>
  );
};

export default EmployerDashboard;