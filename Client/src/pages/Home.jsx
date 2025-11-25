

import React, { useEffect, useState } from "react";
import { Bell, Menu, X, User, LogOut, Settings, Home, ChevronDown, Sun, Moon, Search } from "lucide-react";
import {Link} from 'react-router-dom'

function IconButton({ children, onClick, badge }) {
  return (
    <button
      onClick={onClick}
      className="relative inline-flex items-center justify-center p-2.5 rounded-xl hover:bg-linear-to-br hover:from-emerald-50 hover:to-cyan-50 dark:hover:from-emerald-950 dark:hover:to-cyan-950 transition-all duration-300 hover:scale-105"
    >
      {children}
      {badge ? (
        <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold bg-linear-to-r from-rose-500 to-pink-500 text-white rounded-full shadow-lg animate-pulse">
          {badge}
        </span>
      ) : null}
    </button>
  );
}

function Sidebar({ collapsed, onNavigate, userInitials }) {
  return (
    <aside
      className={`bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 h-full border-r border-slate-700/50 backdrop-blur-xl transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="px-4 py-6 flex items-center gap-3">
          <div
            className={`rounded-2xl bg-linear-to-br from-emerald-400 via-teal-500 to-cyan-500 text-white grid place-items-center font-black shadow-lg shadow-emerald-500/30 ${
              collapsed ? "w-11 h-11" : "w-14 h-14"
            }`}
          >
            KS
          </div>
          {!collapsed && (
            <div>
              <div className="text-xl font-black bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">KaamSetu</div>
              <div className="text-xs text-slate-400 font-medium">Local work • Fair pay</div>
            </div>
          )}
        </div>

        <nav className="mt-6 px-3 flex-1 space-y-2">
          <NavItem collapsed={collapsed} label="Dashboard" onClick={() => onNavigate("dashboard")} />
          <NavItem collapsed={collapsed} label="Jobs" onClick={() => onNavigate("jobs")} />
          <NavItem collapsed={collapsed} label="Applications" onClick={() => onNavigate("applications")} />
          <NavItem collapsed={collapsed} label="Disputes" onClick={() => onNavigate("disputes")} />
        </nav>

        <div className="px-3 py-6">
          <button className="w-full text-sm text-slate-300 px-4 py-2.5 rounded-xl hover:bg-slate-700/50 transition-all duration-300 font-medium">
            Help & feedback
          </button>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ label, onClick, collapsed }) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-linear-to-r hover:from-emerald-500/20 hover:to-cyan-500/20 transition-all duration-300 text-slate-300 hover:text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-linear-to-r from-emerald-500/0 to-cyan-500/0 group-hover:from-emerald-500/10 group-hover:to-cyan-500/10 transition-all duration-300" />
      <Home className="w-5 h-5 relative z-10 group-hover:text-emerald-400 transition-colors" />
      {!collapsed && <span className="text-sm font-semibold relative z-10">{label}</span>}
    </button>
  );
}

function Topbar({ onToggleSidebar, collapsed, onToggleDark, isDark, onSearch }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <button onClick={onToggleSidebar} className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 hover:scale-105">
          {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
        </button>

        <div className="relative hidden sm:flex items-center">
          <input
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search jobs, applicants..."
            className="pl-11 pr-4 py-3 rounded-2xl bg-linear-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 outline-none border-2 border-transparent focus:border-emerald-400 dark:focus:border-emerald-600 transition-all duration-300 w-80 shadow-sm"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <Search className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <IconButton onClick={() => {}} badge={3}>
          <Bell className="w-5 h-5 text-slate-700 dark:text-slate-200" />
        </IconButton>

        <IconButton onClick={onToggleDark}>
          {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
        </IconButton>
      </div>
    </div>
  );
}

function StatCard({ title, value, delta }) {
  return (
    <div className="group relative bg-linear-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 p-6 rounded-3xl shadow-lg hover:shadow-xl border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:scale-105 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-emerald-500/0 to-cyan-500/0 group-hover:from-emerald-500/5 group-hover:to-cyan-500/5 transition-all duration-300" />
      <div className="relative z-10">
        <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{title}</div>
        <div className="mt-3 flex items-baseline gap-3">
          <div className="text-3xl font-black bg-linear-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">{value}</div>
          {delta && <div className="text-sm font-bold text-emerald-500 flex items-center gap-1">▲ {delta}</div>}
        </div>
      </div>
    </div>
  );
}

export default function Hhome() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [query, setQuery] = useState("");
  const [user] = useState({ firstName: "Demo" });

  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  const handleNavigate = (page) => {
    console.log("Navigating to:", page);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100">
      <div className="flex h-screen">
        <Sidebar collapsed={sidebarCollapsed} onNavigate={handleNavigate} userInitials={user?.firstName?.[0] || "U"} />

        <div className="flex-1 flex flex-col">
          <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-6 py-4 shadow-sm">
            <Topbar
              onToggleSidebar={() => setSidebarCollapsed((s) => !s)}
              collapsed={sidebarCollapsed}
              onToggleDark={() => setIsDark((s) => !s)}
              isDark={isDark}
              onSearch={(q) => setQuery(q)}
            />
          </header>

          <main className="p-8 overflow-auto">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-4xl font-black bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">Dashboard</h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">Overview of your KaamSetu activity</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Signed in as</div>
                    <div className="font-bold text-slate-800 dark:text-slate-200">{user?.firstName || "User"}</div>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-emerald-400 via-teal-500 to-cyan-500 grid place-items-center font-black text-white shadow-lg shadow-emerald-500/30">{(user?.firstName || "U")[0]}</div>
                </div>
              </div>

              <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard title="Open Jobs" value={42} delta="4%" />
                <StatCard title="Applications" value={128} delta="2%" />
                <StatCard title="Earnings (mo)" value="₹12,400" delta="8%" />
              </section>

              <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="bg-linear-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-3xl shadow-xl p-6 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-black text-slate-900 dark:text-slate-100">Latest activity</h3>
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30">Updated 2m ago</div>
                    </div>

                    <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-200">
                      <li className="p-4 rounded-2xl hover:bg-linear-to-r hover:from-emerald-50 hover:to-cyan-50 dark:hover:from-emerald-950/50 dark:hover:to-cyan-950/50 transition-all duration-300 border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800">New applicant for <strong className="text-emerald-600 dark:text-emerald-400">Plumber</strong></li>
                      <li className="p-4 rounded-2xl hover:bg-linear-to-r hover:from-emerald-50 hover:to-cyan-50 dark:hover:from-emerald-950/50 dark:hover:to-cyan-950/50 transition-all duration-300 border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800">Payment received for <strong className="text-emerald-600 dark:text-emerald-400">#145</strong></li>
                      <li className="p-4 rounded-2xl hover:bg-linear-to-r hover:from-emerald-50 hover:to-cyan-50 dark:hover:from-emerald-950/50 dark:hover:to-cyan-950/50 transition-all duration-300 border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800">Job <strong className="text-emerald-600 dark:text-emerald-400">Electrician</strong> marked completed</li>
                    </ul>

                    <div className="mt-6 text-right">
                      <button onClick={() => handleNavigate('applications')} className="text-sm font-bold px-6 py-3 rounded-2xl bg-linear-to-r from-emerald-500 to-cyan-500 text-white hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">View all</button>
                    </div>
                  </div>
                </div>

                <aside className="space-y-6">
                  <div className="bg-linear-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-3xl shadow-xl p-6 border border-slate-200 dark:border-slate-700">
                    <h4 className="text-sm font-black mb-4 text-slate-900 dark:text-slate-100 uppercase tracking-wider">Quick actions</h4>
                    <div className="flex flex-col gap-3">
                      <Link to="/employplatform" className="w-full px-4 py-3 rounded-2xl bg-linear-to-r from-emerald-500 to-cyan-500 text-white font-bold hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">Post a job</Link>
                      <button onClick={() => handleNavigate('payments')} className="w-full px-4 py-3 rounded-2xl border-2 border-slate-300 dark:border-slate-600 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 hover:scale-105">View payouts</button>
                    </div>
                  </div>

                  <div className="bg-linear-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-3xl shadow-xl p-6 border border-slate-200 dark:border-slate-700">
                    <h4 className="text-sm font-black mb-4 text-slate-900 dark:text-slate-100 uppercase tracking-wider">Notifications</h4>
                    <div className="text-sm text-slate-600 dark:text-slate-300 space-y-3">
                      <div className="p-3 rounded-2xl hover:bg-linear-to-r hover:from-emerald-50 hover:to-cyan-50 dark:hover:from-emerald-950/50 dark:hover:to-cyan-950/50 transition-all duration-300">You have <strong className="text-emerald-600 dark:text-emerald-400">3</strong> new messages</div>
                      <div className="p-3 rounded-2xl hover:bg-linear-to-r hover:from-emerald-50 hover:to-cyan-50 dark:hover:from-emerald-950/50 dark:hover:to-cyan-950/50 transition-all duration-300">Verification pending for bank account</div>
                    </div>
                  </div>
                </aside>
              </section>
            </div>
          </main>

          <footer className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 text-sm text-slate-500 dark:text-slate-400 font-medium backdrop-blur-sm bg-white/50 dark:bg-slate-900/50">© {new Date().getFullYear()} KaamSetu. All rights reserved.</footer>
        </div>
      </div>
    </div>
  );
}









// import React, { useEffect, useRef, useState, useMemo } from "react";
// import {
//   Bell,
//   Menu,
//   X,
//   User,
//   LogOut,
//   Settings,
//   Home as HomeIcon,
//   ChevronDown,
//   Sun,
//   Moon,
//   Search as SearchIcon,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logoutUser } from "../store/authSlice";
// import EmployerPlatform from "./EmployerPlatform";

// /**
//  * Home-modern.jsx (updated color palette)
//  * - New modern color scheme using teal/cyan gradients and warm accents
//  * - Softer shadows, smooth rounded corners, and subtle glassy surfaces
//  */

// function IconButton({ children, onClick, badge }) {
//   return (
//     <button
//       onClick={onClick}
//       className="relative inline-flex items-center justify-center p-2 rounded-xl hover:bg-white/50 dark:hover:bg-black/20 transition shadow-sm"
//     >
//       {children}
//       {badge ? (
//         <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold bg-pink-500 text-white rounded-full">
//           {badge}
//         </span>
//       ) : null}
//     </button>
//   );
// }

// function Sidebar({ collapsed, onNavigate, userInitials }) {
//   return (
//     <aside
//       className={`bg-white/60 backdrop-blur-sm dark:bg-gray-900/50 dark:backdrop-blur-sm h-full border-r dark:border-gray-800 transition-all ${
//         collapsed ? "w-20" : "w-72"
//       }`}
//     >
//       <div className="h-full flex flex-col">
//         <div className="px-4 py-5 flex items-center gap-3">
//           <div
//             className={`rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 text-white grid place-items-center font-bold ${
//               collapsed ? "w-10 h-10" : "w-14 h-14"
//             } shadow-lg`}
//           >
//             KS
//           </div>
//           {!collapsed && (
//             <div>
//               <div className="text-lg font-extrabold tracking-tight">KaamSetu</div>
//               <div className="text-xs text-slate-500 dark:text-slate-400 -mt-0.5">Local work • Fair pay</div>
//             </div>
//           )}
//         </div>

//         <nav className="mt-4 px-3 flex-1 space-y-1">
//           <NavItem collapsed={collapsed} label="Dashboard" onClick={() => onNavigate("/")} icon={<HomeIcon />} />
//           <NavItem collapsed={collapsed} label="Jobs" onClick={() => onNavigate("/jobs")} icon={<HomeIcon />} />
//           <NavItem collapsed={collapsed} label="Applications" onClick={() => onNavigate("/applications")} icon={<HomeIcon />} />
//           <NavItem collapsed={collapsed} label="Disputes" onClick={() => onNavigate("/disputes")} icon={<HomeIcon />} />
//         </nav>

//         <div className="px-4 py-6">
//           <button className="w-full text-sm text-slate-700 dark:text-slate-200 px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-gray-800 transition shadow-sm">
//             Help & feedback
//           </button>
//         </div>
//       </div>
//     </aside>
//   );
// }

// function NavItem({ label, onClick, collapsed, icon }) {
//   return (
//     <button
//       onClick={onClick}
//       className="flex items-center gap-3 w-full px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-gray-800 transition text-slate-700 dark:text-slate-200"
//     >
//       <div className="p-2 rounded-lg bg-white/30 dark:bg-white/5 shadow-inner">
//         {icon || <HomeIcon className="w-4 h-4 text-slate-500" />}
//       </div>
//       {!collapsed && <span className="text-sm font-medium">{label}</span>}
//     </button>
//   );
// }

// function Topbar({ onToggleSidebar, collapsed, onToggleDark, isDark, onSearch }) {
//   return (
//     <div className="flex items-center justify-between gap-4">
//       <div className="flex items-center gap-3">
//         <button onClick={onToggleSidebar} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800 transition">
//           {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
//         </button>

//         <div className="relative hidden sm:flex items-center">
//           <input
//             onChange={(e) => onSearch(e.target.value)}
//             placeholder="Search jobs, applicants..."
//             className="pl-10 pr-3 py-2 rounded-xl bg-white/60 dark:bg-gray-800/60 outline-none border border-transparent focus:border-teal-300 dark:focus:border-cyan-600 backdrop-blur-sm transition w-80"
//           />
//           <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
//             <SearchIcon className="w-4 h-4" />
//           </div>
//         </div>
//       </div>

//       <div className="flex items-center gap-3">
//         <IconButton onClick={() => {}} badge={3}>
//           <Bell className="w-5 h-5 text-slate-700 dark:text-slate-200" />
//         </IconButton>

//         <IconButton onClick={onToggleDark}>
//           {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
//         </IconButton>
//       </div>
//     </div>
//   );
// }

// function StatCard({ title, value, delta }) {
//   return (
//     <div className="bg-white/60 dark:bg-gray-900/60 p-4 rounded-2xl shadow-sm border border-transparent backdrop-blur-sm">
//       <div className="text-sm text-slate-500">{title}</div>
//       <div className="mt-2 flex items-baseline gap-3">
//         <div className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{value}</div>
//         {delta && <div className="text-sm text-violet-500">▲ {delta}</div>}
//       </div>
//     </div>
//   );
// }

// export default function Home() {
//   const { user } = useSelector((state) => state.auth);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [isDark, setIsDark] = useState(false);
//   const [query, setQuery] = useState("");

//   useEffect(() => {
//     if (isDark) document.documentElement.classList.add("dark");
//     else document.documentElement.classList.remove("dark");
//   }, [isDark]);

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     navigate("/");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-950 dark:to-gray-900 text-slate-900 dark:text-slate-100">
//       <div className="flex h-screen">
//         <Sidebar collapsed={sidebarCollapsed} onNavigate={(p) => navigate(p)} userInitials={user?.firstName?.[0] || "U"} />

//         <div className="flex-1 flex flex-col">
//           <header className="bg-transparent px-6 py-4">
//             <Topbar
//               onToggleSidebar={() => setSidebarCollapsed((s) => !s)}
//               collapsed={sidebarCollapsed}
//               onToggleDark={() => setIsDark((s) => !s)}
//               isDark={isDark}
//               onSearch={(q) => setQuery(q)}
//             />
//           </header>

//           <main className="p-6 overflow-auto">
//             <div className="max-w-7xl mx-auto">
//               <div className="flex items-center justify-between mb-6">
//                 <div>
//                   <h1 className="text-2xl font-bold">Dashboard</h1>
//                   <p className="text-sm text-slate-500">Overview of your KaamSetu activity</p>
//                 </div>

//                 <div className="flex items-center gap-4">
//                   <div className="text-right">
//                     <div className="text-sm text-slate-500">Signed in as</div>
//                     <div className="font-medium">{user?.firstName || "User"}</div>
//                   </div>

//                   <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 grid place-items-center font-semibold shadow-lg">{(user?.firstName || "U")[0]}</div>
//                 </div>
//               </div>

//               <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//                 <StatCard title="Open Jobs" value={42} delta="4%" />
//                 <StatCard title="Applications" value={128} delta="2%" />
//                 <StatCard title="Earnings (mo)" value="₹12,400" delta="8%" />
//               </section>

//               <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                 <div className="lg:col-span-2">
//                   <div className="bg-white/60 dark:bg-gray-900/60 rounded-2xl p-4 shadow-sm border border-transparent backdrop-blur-sm">
//                     <div className="flex items-center justify-between mb-4">
//                       <h3 className="text-lg font-semibold">Latest activity</h3>
//                       <div className="text-sm text-slate-500">Updated 2m ago</div>
//                     </div>

//                     <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-200">
//                       <li className="p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-gray-800 transition">New applicant for <strong>Plumber</strong></li>
//                       <li className="p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-gray-800 transition">Payment received for <strong>#145</strong></li>
//                       <li className="p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-gray-800 transition">Job <strong>Electrician</strong> marked completed</li>
//                     </ul>

//                     <div className="mt-4 text-right">
//                       <button onClick={() => navigate('/applications')} className="text-sm px-3 py-2 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 text-white">View all</button>
//                     </div>
//                   </div>

//                   <div className="mt-4">
//                     <EmployerPlatform />
//                   </div>
//                 </div>

//                 <aside>
//                   <div className="bg-white/60 dark:bg-gray-900/60 rounded-2xl p-4 shadow-sm border border-transparent backdrop-blur-sm mb-4">
//                     <h4 className="text-sm font-medium mb-2">Quick actions</h4>
//                     <div className="flex flex-col gap-2">
//                       <button onClick={() => navigate('/jobs/new')} className="w-full px-3 py-2 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 text-white">Post a job</button>
//                       <button onClick={() => navigate('/payments')} className="w-full px-3 py-2 rounded-xl border">View payouts</button>
//                     </div>
//                   </div>

//                   <div className="bg-white/60 dark:bg-gray-900/60 rounded-2xl p-4 shadow-sm border border-transparent backdrop-blur-sm">
//                     <h4 className="text-sm font-medium mb-2">Notifications</h4>
//                     <div className="text-sm text-slate-600 dark:text-slate-300 space-y-2">
//                       <div className="p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-gray-800">You have <strong>3</strong> new messages</div>
//                       <div className="p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-gray-800">Verification pending for bank account</div>
//                     </div>
//                   </div>
//                 </aside>
//               </section>
//             </div>
//           </main>

//           {/* <footer className="px-6 py-4 border-t dark:border-gray-800 text-sm text-slate-500">© {new Date().getFullYear()} KaamSetu. All rights reserved.</footer> */}
//         </div>
//       </div>
//     </div>
//   );
// }
