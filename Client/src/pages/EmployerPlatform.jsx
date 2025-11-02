/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from "react";
import {
  Building2,
  Briefcase,
  Users,
  CreditCard,
  AlertTriangle,
  BarChart3,
  CheckCircle,
  Clock,
  DollarSign,
  TrendingUp,
  Search,
  Filter,
  MoreVertical,
  Eye,
  MessageSquare,
  Download,
  Plus,
  FileText,
  XCircle,
  LogOut,
  Menu as MenuIcon,
  X as CloseIcon
} from "lucide-react";

const LS = {
  JOBS: "employer_jobs_v1",
  APPS: "employer_apps_v1"
};

const sampleJobs = [
  { id: "job-1", title: "Senior Software Engineer", category: "Software Development", type: "Full-time", location: "Remote", salaryMin: 50000, salaryMax: 80000, description: "Build backend systems", skills: ["Node.js", "React"], postedAt: "2 days ago" }
];

const sampleApplicants = [
  { id: "app-1", name: "Gaya singh", jobId: "job-1", position: "Worker", status: "New", match: 95, appliedAt: "2 hours ago" },
  { id: "app-2", name: "Samir kumar", jobId: "job-1", position: "coder", status: "Reviewing", match: 88, appliedAt: "1 day ago" }
];

function NavButton({ id, icon: Icon, label, current, onClick }) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition text-left ${
        current ? "bg-indigo-50 border border-indigo-200" : "hover:bg-gray-50"
      }`}
      aria-current={current ? "page" : undefined}
    >
      <Icon size={18} className="text-indigo-600" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

export default function EmployerPlatform() {
  const [currentPage, setCurrentPage] = useState("postjob"); // postjob | applicants | payments | disputes | analytics
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // jobs & applicants persisted locally for demo
  const [jobs, setJobs] = useState(() => {
    try {
      const raw = localStorage.getItem(LS.JOBS);
      return raw ? JSON.parse(raw) : sampleJobs;
    } catch {
      return sampleJobs;
    }
  });
  const [apps, setApps] = useState(() => {
    try {
      const raw = localStorage.getItem(LS.APPS);
      return raw ? JSON.parse(raw) : sampleApplicants;
    } catch {
      return sampleApplicants;
    }
  });

  useEffect(() => localStorage.setItem(LS.JOBS, JSON.stringify(jobs)), [jobs]);
  useEffect(() => localStorage.setItem(LS.APPS, JSON.stringify(apps)), [apps]);

  const initialPost = {
    title: "",
    category: "Software Development",
    type: "Full-time",
    location: "",
    description: "",
    salaryMin: "",
    salaryMax: "",
    payFreq: "Annual",
    skillsInput: "",
    skills: [],
    experience: "Mid Level"
  };
  const [jobPostStep, setJobPostStep] = useState(1);
  const [postData, setPostData] = useState(initialPost);
  const [postErrors, setPostErrors] = useState({});

  const validateStep = (step = jobPostStep) => {
    const e = {};
    if (step === 1) {
      if (!postData.title.trim()) e.title = "Job title required";
      if (!postData.location.trim()) e.location = "Location required";
      if (!postData.description.trim()) e.description = "Description required";
    }
    if (step === 2) {
      if (!postData.salaryMin || isNaN(Number(postData.salaryMin))) e.salaryMin = "Enter min salary";
      if (!postData.salaryMax || isNaN(Number(postData.salaryMax))) e.salaryMax = "Enter max salary";
      if (Number(postData.salaryMin) > Number(postData.salaryMax)) e.salaryMax = "Max must be >= Min";
    }
    if (step === 3) {
      if ((postData.skills || []).length === 0) e.skills = "Add at least one skill";
    }
    setPostErrors(e);
    return Object.keys(e).length === 0;
  };

  const nextStep = () => {
    if (validateStep(jobPostStep)) setJobPostStep(s => Math.min(4, s + 1));
  };
  const prevStep = () => setJobPostStep(s => Math.max(1, s - 1));

  const addSkillFromInput = () => {
    const raw = postData.skillsInput.trim();
    if (!raw) return;
    const list = raw.split(",").map(s => s.trim()).filter(Boolean);
    setPostData(prev => ({ ...prev, skills: Array.from(new Set([...prev.skills, ...list])), skillsInput: "" }));
    setPostErrors(prev => ({ ...prev, skills: undefined }));
  };
  const removeSkill = (s) => setPostData(prev => ({ ...prev, skills: prev.skills.filter(x => x !== s) }));

  const publishJob = () => {
    // final validation
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      setJobPostStep(1);
      return;
    }
    const newJob = {
      ...postData,
      id: `job-${Date.now()}`,
      postedAt: "Just now"
    };
    setJobs(prev => [newJob, ...prev]);

    setPostData(initialPost);
    setJobPostStep(1);
    setCurrentPage("applicants");
    setMobileNavOpen(false);
  };

  const [appSearch, setAppSearch] = useState("");
  const [appFilterJob, setAppFilterJob] = useState("all");
  const filteredApps = useMemo(() => {
    return apps.filter(a => {
      const matchQuery = !appSearch || (a.name + " " + a.position + " " + a.status).toLowerCase().includes(appSearch.toLowerCase());
      const matchJob = appFilterJob === "all" || a.jobId === appFilterJob;
      return matchQuery && matchJob;
    });
  }, [apps, appSearch, appFilterJob]);

  // eslint-disable-next-line no-unused-vars
  const changeApplicantStatus = (appId, status) => {
    setApps(prev => prev.map(a => a.id === appId ? { ...a, status } : a));
  };

  const mockReleaseEscrow = (project) => {
    alert(`Mock: Released funds for ${project}. Replace with API integration.`);
  };

  // eslint-disable-next-line no-unused-vars
  const [disputes, setDisputes] = useState([
    { id: "DSP-001", title: "Incomplete Milestone Delivery", contractor: "John Doe", amount: 1500, status: "Open", date: "Oct 26", priority: "high" },
    { id: "DSP-002", title: "Quality Issues with Deliverables", contractor: "Jane Smith", amount: 2200, status: "Under Review", date: "Oct 24", priority: "medium" }
  ]);

  const analytics = useMemo(() => {
    const totalJobs = jobs.length;
    const totalApplicants = apps.length;
    const hires = apps.filter(a => a.status.toLowerCase() === "hired").length;
    return { totalJobs, totalApplicants, hires };
  }, [jobs, apps]);

  const mobileNavItems = [
    { id: "postjob", label: "Post Job", icon: FileText },
    { id: "applicants", label: "Applicants", icon: Users },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "disputes", label: "Disputes", icon: AlertTriangle },
    { id: "analytics", label: "Analytics", icon: BarChart3 }
  ];

  const quickNavTo = (page) => {
    setCurrentPage(page);
    setMobileNavOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const Header = () => (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              onClick={() => setMobileNavOpen(v => !v)}
              aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
            >
              {mobileNavOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
            </button>

            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">EP</div>
              <div className="hidden sm:block">
                <div className="text-sm font-semibold">Employer Portal</div>
                <div className="text-xs text-gray-500">Manage hiring & payments</div>
              </div>
            </div>
          </div> */}


          <div className="hidden md:flex items-center gap-2 ml-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className="pl-10 pr-3 py-2 border rounded-lg w-72 focus:outline-none"
                placeholder="Search jobs, applicants..."
                onChange={() => { /* optional live search hook */ }}
                aria-label="Search"
              />
            </div>
            <button className="px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Filter size={16} /> Filters
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3">
            <button className="px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-2" onClick={() => alert("Export (mock)")}>
              <Download size={16} /> Export
            </button>
            <button className="px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-2" onClick={() => alert("Alerts (mock)")}>
              <AlertTriangle size={16} /> Alerts
            </button>
          </div>

          {/* <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right mr-2">
              <div className="text-sm font-medium">Acme Corp</div>
              <div className="text-xs text-gray-500">Account: Premium</div>
            </div>
            <button
              className="p-2 rounded-full hover:bg-gray-100"
              title="Account actions"
              onClick={() => {
                if (confirm("Logout (mock)?")) {
                  alert("Logged out (mock)");
                }
              }}
            >
              <LogOut size={18} />
            </button>
          </div> */}
        </div>
      </div>

      <div className={`lg:hidden bg-white border-t ${mobileNavOpen ? "block" : "hidden"}`}>
        <nav className="px-3 py-2 space-y-2">
          {mobileNavItems.map(item => (
            <button key={item.id} onClick={() => quickNavTo(item.id)} className={`w-full flex items-center gap-3 px-3 py-2 rounded ${currentPage === item.id ? "bg-indigo-50" : "hover:bg-gray-50"}`}>
              <item.icon size={18} className="text-indigo-600" />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );

  const PostJobContent = (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Post a New Job</h1>
        <p className="text-sm text-gray-600">Create a job post to receive qualified applicants.</p>
      </div>

      <div className="mt-4 mb-6">
        <div className="flex gap-2 items-center">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className="flex-1 flex items-center gap-2">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${jobPostStep >= s ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"}`}>{s}</div>
              {s < 4 && <div className={`h-1 flex-1 ${jobPostStep > s ? "bg-indigo-600" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {jobPostStep === 1 && (
          <div>
            <h2 className="text-lg font-semibold">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div>
                <label className="text-sm text-gray-700">Job Title</label>
                <input value={postData.title} onChange={(e) => setPostData(p => ({ ...p, title: e.target.value }))} className="w-full px-4 py-2 border rounded mt-1" placeholder="e.g. labour, painter" />
                {postErrors.title && <div className="text-xs text-red-600 mt-1">{postErrors.title}</div>}
              </div>
              <div>
                <label className="text-sm text-gray-700">Category</label>
                <select value={postData.category} onChange={(e) => setPostData(p => ({ ...p, category: e.target.value }))} className="w-full px-4 py-2 border rounded mt-1">
                  <option>Painter</option>
                  <option>Carpainter</option>
                  <option>Plumber</option>
                  <option>Construction</option>
                  <option>Operations</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-700">Employment Type</label>
                <select value={postData.type} onChange={(e) => setPostData(p => ({ ...p, type: e.target.value }))} className="w-full px-4 py-2 border rounded mt-1">
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Daily Wage</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-700">Location</label>
                <input value={postData.location} onChange={(e) => setPostData(p => ({ ...p, location: e.target.value }))} className="w-full px-4 py-2 border rounded mt-1" placeholder="City, area or Remote" />
                {postErrors.location && <div className="text-xs text-red-600 mt-1">{postErrors.location}</div>}
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-gray-700">Job Description</label>
                <textarea value={postData.description} onChange={(e) => setPostData(p => ({ ...p, description: e.target.value }))} rows={5} className="w-full px-4 py-2 border rounded mt-1" placeholder="Role, responsibilities, and requirements..." />
                {postErrors.description && <div className="text-xs text-red-600 mt-1">{postErrors.description}</div>}
              </div>
            </div>
          </div>
        )}

        {jobPostStep === 2 && (
          <div>
            <h2 className="text-lg font-semibold">Compensation & Budget</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div>
                <label className="text-sm text-gray-700">Minimum Salary</label>
                <input value={postData.salaryMin} onChange={(e) => setPostData(p => ({ ...p, salaryMin: e.target.value }))} type="number" className="w-full px-4 py-2 border rounded mt-1" placeholder="e.g. 50000" />
                {postErrors.salaryMin && <div className="text-xs text-red-600 mt-1">{postErrors.salaryMin}</div>}
              </div>
              <div>
                <label className="text-sm text-gray-700">Maximum Salary</label>
                <input value={postData.salaryMax} onChange={(e) => setPostData(p => ({ ...p, salaryMax: e.target.value }))} type="number" className="w-full px-4 py-2 border rounded mt-1" placeholder="e.g. 80000" />
                {postErrors.salaryMax && <div className="text-xs text-red-600 mt-1">{postErrors.salaryMax}</div>}
              </div>

              <div>
                <label className="text-sm text-gray-700">Payment Frequency</label>
                <select value={postData.payFreq} onChange={(e) => setPostData(p => ({ ...p, payFreq: e.target.value }))} className="w-full px-4 py-2 border rounded mt-1">
                  <option>Annual</option>
                  <option>Monthly</option>
                  <option>Daily</option>
                  <option>Hourly</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <div className="bg-indigo-50 border border-indigo-100 rounded p-4">
                  <div className="font-semibold text-indigo-700">Escrow Protection</div>
                  <div className="text-sm text-indigo-600 mt-1">Use escrow to secure payments for contract and milestone-based work.</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {jobPostStep === 3 && (
          <div>
            <h2 className="text-lg font-semibold">Requirements & Skills</h2>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-700">Required Skills (comma separated)</label>
                <div className="flex gap-2 mt-1">
                  <input value={postData.skillsInput} onChange={(e) => setPostData(p => ({ ...p, skillsInput: e.target.value }))} className="flex-1 px-4 py-2 border rounded" placeholder="e.g. React, Node.js" />
                  <button onClick={addSkillFromInput} className="px-4 py-2 bg-indigo-600 text-white rounded">Add</button>
                </div>
                {postErrors.skills && <div className="text-xs text-red-600 mt-1">{postErrors.skills}</div>}
                <div className="flex flex-wrap gap-2 mt-3">
                  {postData.skills.map(s => (
                    <span key={s} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      {s}
                      <button onClick={() => removeSkill(s)} className="p-0.5"><XCircle size={14} /></button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-700">Experience Level</label>
                <select value={postData.experience} onChange={(e) => setPostData(p => ({ ...p, experience: e.target.value }))} className="w-full px-4 py-2 border rounded mt-1">
                  <option>Entry Level</option>
                  <option>Mid Level</option>
                  <option>Senior Level</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {jobPostStep === 4 && (
          <div>
            <h2 className="text-lg font-semibold">Review & Publish</h2>
            <div className="mt-3 bg-gray-50 p-4 rounded border">
              <div className="mb-3">
                <div className="text-sm text-gray-600">Job Title</div>
                <div className="font-semibold">{postData.title || "—"}</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <div className="text-sm text-gray-600">Location</div>
                  <div className="font-semibold">{postData.location || "—"}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Type</div>
                  <div className="font-semibold">{postData.type}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Salary Range</div>
                  <div className="font-semibold">${postData.salaryMin || "—"} - ${postData.salaryMax || "—"}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Experience</div>
                  <div className="font-semibold">{postData.experience}</div>
                </div>
              </div>

              <div className="mt-3">
                <div className="text-sm text-gray-600">Skills</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {postData.skills.length ? postData.skills.map(s => <span key={s} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded">{s}</span>) : <span className="text-sm text-gray-500">No skills</span>}
                </div>
              </div>

              <div className="mt-3">
                <div className="text-sm text-gray-600">Description</div>
                <div className="text-sm text-gray-700 mt-1">{postData.description || "—"}</div>
              </div>
            </div>

            <div className="mt-4 bg-green-50 border border-green-100 p-4 rounded">
              <div className="text-sm text-green-800 font-semibold">Ready to Publish</div>
              <div className="text-sm text-green-700">Your job will be visible to candidates after publishing.</div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-between">
        <div>
          {jobPostStep > 1 && <button onClick={prevStep} className="px-4 py-2 border rounded hover:bg-gray-50 w-full sm:w-auto">Back</button>}
        </div>
        <div className="flex gap-3">
          {jobPostStep < 4 ? (
            <button onClick={nextStep} className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 w-full sm:w-auto">Continue</button>
          ) : (
            <button onClick={publishJob} className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-full sm:w-auto">Publish Job</button>
          )}
        </div>
      </div>
    </div>
  );

  const ApplicantManagementContent = (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold">Applicant Management</h2>
          <p className="text-sm text-gray-600">Review and manage candidates for your roles</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={appSearch} onChange={(e) => setAppSearch(e.target.value)} placeholder="Search applicants..." className="pl-10 pr-3 py-2 border rounded w-full md:w-64" />
          </div>
          <select value={appFilterJob} onChange={(e) => setAppFilterJob(e.target.value)} className="px-3 py-2 border rounded">
            <option value="all">All Jobs</option>
            {jobs.map(j => <option key={j.id} value={j.id}>{j.title}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'New', count: apps.filter(a => a.status === 'New').length },
          { label: 'Reviewing', count: apps.filter(a => a.status === 'Reviewing').length },
          { label: 'Interviewing', count: apps.filter(a => a.status === 'Interviewing').length },
          { label: 'Hired', count: apps.filter(a => a.status === 'Hired').length }
        ].map(s => (
          <div key={s.label} className="bg-gray-50 border rounded p-4 shadow">
            <div className="text-sm text-gray-600">{s.label}</div>
            <div className="text-2xl font-bold text-gray-800">{s.count}</div>
          </div>
        ))}
      </div>

      <div className="divide-y rounded overflow-hidden border">
        {filteredApps.map(app => (
          <div key={app.id} className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold">
                {app.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <div className="font-semibold">{app.name}</div>
                <div className="text-sm text-gray-500">{app.position} • Applied {app.appliedAt}</div>
              </div>
              <div className="ml-0 md:ml-6 text-sm">
                <div className="text-xs text-gray-500">Match</div>
                <div className="font-medium text-indigo-600">{app.match}%</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-sm text-right mr-2">
                <div className={`font-medium ${app.status === 'Hired' ? 'text-green-600' : app.status === 'Reviewing' ? 'text-yellow-600' : 'text-gray-700'}`}>{app.status}</div>
              </div>
              <button onClick={() => alert(`View resume for ${app.name} (mock)`)} className="p-2 hover:bg-gray-100 rounded"><Eye size={18} /></button>
              <button onClick={() => alert(`Message ${app.name} (mock)`)} className="p-2 hover:bg-gray-100 rounded"><MessageSquare size={18} /></button>
              <div className="relative">
                <button className="p-2 hover:bg-gray-100 rounded"><MoreVertical size={18} /></button>
                <div className="hidden"> {/* placeholder for action menu; implement if needed */} </div>
              </div>
            </div>
          </div>
        ))}
        {filteredApps.length === 0 && <div className="p-6 text-center text-gray-500">No applicants found.</div>}
      </div>
    </div>
  );

  const PaymentContent = (
    <div className="space-y-6">
      <div className="bg-white rounded shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Payment & Escrow</h2>
          <p className="text-sm text-gray-600">Manage balances and escrowed funds</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded"><Download size={16} /> Export</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-linear-to-br from-green-500 to-green-600 rounded-lg p-6 text-white shadow">
          <div className="flex justify-between">
            <div>
              <div className="text-sm opacity-90">Available Balance</div>
              <div className="text-2xl font-bold mt-2">12,450</div>
            </div>
            <DollarSign size={28} />
          </div>
        </div>

        <div className="bg-linear-to-br from-yellow-500 to-orange-500 rounded-lg p-6 text-white shadow">
          <div className="flex justify-between">
            <div>
              <div className="text-sm opacity-90">In Escrow</div>
              <div className="text-2xl font-bold mt-2">8,200</div>
            </div>
            <Clock size={28} />
          </div>
        </div>

        <div className="bg-linear-to-br from-indigo-600 to-purple-600 rounded-lg p-6 text-white shadow">
          <div className="flex justify-between">
            <div>
              <div className="text-sm opacity-90">This Month</div>
              <div className="text-2xl font-bold mt-2">24,680</div>
            </div>
            <TrendingUp size={28} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded shadow p-4">
          <div className="font-semibold mb-3">Active Escrow Contracts</div>
          <div className="space-y-4">
            {[
              { project: 'Mobile App', freelancer: 'Sarah J.', amount: 3500, released: 60 },
              { project: 'Website Redesign', freelancer: 'Michael C.', amount: 2800, released: 30 }
            ].map((c, i) => (
              <div key={i} className="border rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold">{c.project}</div>
                    <div className="text-sm text-gray-500">{c.freelancer}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">${c.amount}</div>
                    <div className="text-xs text-gray-500">Escrowed</div>
                  </div>
                </div>
                <div className="mt-3 h-2 bg-gray-200 rounded overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: `${c.released}%` }} />
                </div>
                <div className="mt-2 text-xs text-gray-500">{c.released}% released</div>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => mockReleaseEscrow(c.project)} className="px-3 py-2 bg-indigo-600 text-white rounded">Release</button>
                  <button className="px-3 py-2 border rounded">Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded shadow p-4">
          <div className="font-semibold mb-3">Recent Transactions</div>
          <div className="space-y-3">
            {[
              { type: 'Payment Released', desc: 'Milestone 2 - Mobile App', amount: -2100, date: 'Oct 27' },
              { type: 'Escrow Deposit', desc: 'New Contract - Website', amount: 2800, date: 'Oct 25' }
            ].map((t, i) => (
              <div key={i} className="flex justify-between">
                <div>
                  <div className="font-medium">{t.type}</div>
                  <div className="text-sm text-gray-500">{t.desc}</div>
                </div>
                <div className={`text-right ${t.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {t.amount > 0 ? '+' : '-'}${Math.abs(t.amount)}
                  <div className="text-xs text-gray-500">{t.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const DisputeContent = (
    <div>
      <div className="bg-white rounded shadow p-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-xl font-semibold">Dispute Management</h2>
            <p className="text-sm text-gray-600">Track and respond to raised disputes</p>
          </div>
          <button className="px-4 py-2 bg-red-600 text-white rounded flex items-center gap-2"><Plus size={16} /> Raise Dispute</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded p-4 text-center">
            <div className="text-sm text-gray-600">Open Disputes</div>
            <div className="text-2xl font-bold">{disputes.filter(d => d.status === "Open").length}</div>
          </div>
          <div className="bg-gray-50 rounded p-4 text-center">
            <div className="text-sm text-gray-600">Under Review</div>
            <div className="text-2xl font-bold">{disputes.filter(d => d.status === "Under Review").length}</div>
          </div>
          <div className="bg-gray-50 rounded p-4 text-center">
            <div className="text-sm text-gray-600">Resolved</div>
            <div className="text-2xl font-bold">{disputes.filter(d => d.status === "Resolved").length}</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded shadow divide-y">
        {disputes.map(d => (
          <div key={d.id} className="p-4 flex flex-col md:flex-row justify-between gap-3">
            <div>
              <div className="font-mono text-xs text-gray-500">{d.id} • <span className="text-xs text-gray-400">{d.date}</span></div>
              <div className="font-semibold text-lg">{d.title}</div>
              <div className="text-sm text-gray-600">Contractor: {d.contractor} • Amount: ${d.amount.toLocaleString()}</div>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-2 border rounded">View</button>
              <button className="px-3 py-2 bg-indigo-600 text-white rounded">Respond</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const AnalyticsContent = (
    <div>
      <div className="bg-white rounded shadow p-6 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Analytics</h2>
          <div className="text-sm text-gray-600">Hiring performance and trends</div>
        </div>
        <div className="flex gap-3">
          <select className="px-3 py-2 border rounded">
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
          <button className="px-3 py-2 bg-indigo-600 text-white rounded"><Download size={14} /> Export</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded shadow p-4">
          <div className="text-sm text-gray-500">Total Jobs Posted</div>
          <div className="text-2xl font-bold">{analytics.totalJobs}</div>
          <div className="text-xs text-green-600 flex items-center gap-1"><TrendingUp size={12} /> +12%</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-sm text-gray-500">Total Applicants</div>
          <div className="text-2xl font-bold">{analytics.totalApplicants}</div>
          <div className="text-xs text-green-600 flex items-center gap-1"><TrendingUp size={12} /> +28%</div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="text-sm text-gray-500">Successful Hires</div>
          <div className="text-2xl font-bold">{analytics.hires}</div>
          <div className="text-xs text-gray-600">Stable</div>
        </div>
      </div>

      <div className="bg-white rounded shadow p-4">
        <div className="text-sm text-gray-600">Latest Activity</div>
        <div className="mt-3 space-y-2">
          <div className="flex justify-between">
            <div className="text-sm">New applicant: Sarah Johnson</div>
            <div className="text-xs text-gray-500">2 hours ago</div>
          </div>
          <div className="flex justify-between">
            <div className="text-sm">Job published: Senior Software Engineer</div>
            <div className="text-xs text-gray-500">Yesterday</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar (desktop) */}
        <aside className="hidden lg:block lg:col-span-3 bg-white rounded-lg p-4 shadow sticky top-20 self-start h-fit">
          <div className="flex flex-col gap-2">
            <NavButton id="postjob" icon={FileText} label="Post Job" current={currentPage === "postjob"} onClick={(id) => setCurrentPage(id)} />
            <NavButton id="applicants" icon={Users} label="Applicants" current={currentPage === "applicants"} onClick={(id) => setCurrentPage(id)} />
            <NavButton id="payments" icon={CreditCard} label="Payments" current={currentPage === "payments"} onClick={(id) => setCurrentPage(id)} />
            <NavButton id="disputes" icon={AlertTriangle} label="Disputes" current={currentPage === "disputes"} onClick={(id) => setCurrentPage(id)} />
            <NavButton id="analytics" icon={BarChart3} label="Analytics" current={currentPage === "analytics"} onClick={(id) => setCurrentPage(id)} />
          </div>

          <div className="mt-6 border-t pt-4">
            <div className="text-sm text-gray-600 mb-2">Quick actions</div>
            <div className="flex flex-col gap-2">
              <button onClick={() => { setCurrentPage("postjob"); setJobPostStep(1); }} className="px-3 py-2 bg-indigo-600 text-white rounded">New Job</button>
              <button onClick={() => { alert("Export (mock)"); }} className="px-3 py-2 border rounded">Export data</button>
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="lg:col-span-9 space-y-6">
          {/* Render current page content (responsive containers) */}
          {currentPage === "postjob" && (
            <div>{PostJobContent}</div>
          )}
          {currentPage === "applicants" && (
            <div>{ApplicantManagementContent}</div>
          )}
          {currentPage === "payments" && (
            <div>{PaymentContent}</div>
          )}
          {currentPage === "disputes" && (
            <div>{DisputeContent}</div>
          )}
          {currentPage === "analytics" && (
            <div>{AnalyticsContent}</div>
          )}

          {/* bottom quick nav for mobile */}
          <div className="lg:hidden fixed bottom-3 left-4 right-4 z-50">
            <div className="bg-white border rounded-lg shadow p-2 flex justify-between">
              {mobileNavItems.map(item => (
                <button key={item.id} onClick={() => quickNavTo(item.id)} className={`flex-1 flex flex-col items-center gap-1 py-2 ${currentPage === item.id ? "text-indigo-600" : "text-gray-600"}`}>
                  <item.icon size={18} />
                  <span className="text-xs">{item.label.split(" ")[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
