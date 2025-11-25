
import React, { useState } from "react";
import { Briefcase, Users, CreditCard, AlertTriangle, BarChart3, CheckCircle, FileText, XCircle, Search, Download, Plus, Eye, MessageSquare } from "lucide-react";

export default function EmployerPlatform() {
  const [currentPage, setCurrentPage] = useState("postjob");
  const [jobPostStep, setJobPostStep] = useState(1);
  
  const [postData, setPostData] = useState({
    title: "",
    category: "Agriculture",
    type: "Full-time",
    location: "",
    description: "",
    salaryMin: "",
    salaryMax: "",
    payFreq: "Daily",
    skillsInput: "",
    skills: [],
    experience: "Entry Level"
  });
  
  const [postErrors, setPostErrors] = useState({});

  const validateStep = (step) => {
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
      if (postData.skills.length === 0) e.skills = "Add at least one skill";
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
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      setJobPostStep(1);
      return;
    }
    alert("Job published successfully!");
    setCurrentPage("applicants");
  };

  const navItems = [
    { id: "postjob", label: "Post Job", icon: FileText },
    { id: "applicants", label: "Applicants", icon: Users },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "disputes", label: "Disputes", icon: AlertTriangle },
    { id: "analytics", label: "Analytics", icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50">

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-3">
          <div className="bg-linear-to-br from-white to-slate-50 rounded-3xl p-6 shadow-xl border border-slate-200 sticky top-24">
            <div className="space-y-2 mb-6">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${
                    currentPage === item.id
                      ? "bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-200">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Quick Actions</div>
              <button
                onClick={() => { setCurrentPage("postjob"); setJobPostStep(1); }}
                className="w-full px-4 py-3 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-lg hover:shadow-xl transition-all"
              >
                + New Job
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-9">
          {currentPage === "postjob" && (
            <div className="bg-linear-to-br from-white to-slate-50 rounded-3xl shadow-xl border border-slate-200 p-8">
              <div className="mb-8">
                <h1 className="text-3xl font-black bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2">
                  Post a New Job
                </h1>
                <p className="text-slate-600">Create a job post to receive qualified applicants.</p>
              </div>

              {/* Step Indicator */}
              <div className="mb-8">
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4].map(s => (
                    <div key={s} className="flex items-center flex-1">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-xl font-black transition-all ${
                        jobPostStep >= s
                          ? "bg-linear-to-br from-emerald-500 to-teal-500 text-white shadow-lg"
                          : "bg-slate-200 text-slate-500"
                      }`}>
                        {s}
                      </div>
                      {s < 4 && (
                        <div className={`h-2 flex-1 mx-2 rounded-full transition-all ${
                          jobPostStep > s ? "bg-linear-to-r from-emerald-500 to-teal-500" : "bg-slate-200"
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Step Content */}
              <div className="space-y-6">
                {jobPostStep === 1 && (
                  <div>
                    <h2 className="text-xl font-black text-slate-900 mb-6">Basic Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-900 mb-2">Job Title</label>
                        <input
                          value={postData.title}
                          onChange={(e) => setPostData(p => ({ ...p, title: e.target.value }))}
                          className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-emerald-400 focus:bg-white outline-none transition font-medium"
                          placeholder="e.g. Field Worker, Painter"
                        />
                        {postErrors.title && <div className="text-xs text-rose-600 mt-2 font-semibold">{postErrors.title}</div>}
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-900 mb-2">Category</label>
                        <select
                          value={postData.category}
                          onChange={(e) => setPostData(p => ({ ...p, category: e.target.value }))}
                          className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-emerald-400 focus:bg-white outline-none transition font-medium"
                        >
                          <option>Agriculture</option>
                          <option>Construction</option>
                          <option>Manufacturing</option>
                          <option>Services</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-900 mb-2">Employment Type</label>
                        <select
                          value={postData.type}
                          onChange={(e) => setPostData(p => ({ ...p, type: e.target.value }))}
                          className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-emerald-400 focus:bg-white outline-none transition font-medium"
                        >
                          <option>Full-time</option>
                          <option>Part-time</option>
                          <option>Contract</option>
                          <option>Daily Wage</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-900 mb-2">Location</label>
                        <input
                          value={postData.location}
                          onChange={(e) => setPostData(p => ({ ...p, location: e.target.value }))}
                          className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-emerald-400 focus:bg-white outline-none transition font-medium"
                          placeholder="City, village or area"
                        />
                        {postErrors.location && <div className="text-xs text-rose-600 mt-2 font-semibold">{postErrors.location}</div>}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-slate-900 mb-2">Job Description</label>
                        <textarea
                          value={postData.description}
                          onChange={(e) => setPostData(p => ({ ...p, description: e.target.value }))}
                          rows={5}
                          className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-emerald-400 focus:bg-white outline-none transition font-medium resize-none"
                          placeholder="Describe the role, responsibilities, and requirements..."
                        />
                        {postErrors.description && <div className="text-xs text-rose-600 mt-2 font-semibold">{postErrors.description}</div>}
                      </div>
                    </div>
                  </div>
                )}

                {jobPostStep === 2 && (
                  <div>
                    <h2 className="text-xl font-black text-slate-900 mb-6">Compensation & Budget</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-900 mb-2">Minimum Salary (₹)</label>
                        <input
                          value={postData.salaryMin}
                          onChange={(e) => setPostData(p => ({ ...p, salaryMin: e.target.value }))}
                          type="number"
                          className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-emerald-400 focus:bg-white outline-none transition font-medium"
                          placeholder="e.g. 300"
                        />
                        {postErrors.salaryMin && <div className="text-xs text-rose-600 mt-2 font-semibold">{postErrors.salaryMin}</div>}
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-900 mb-2">Maximum Salary (₹)</label>
                        <input
                          value={postData.salaryMax}
                          onChange={(e) => setPostData(p => ({ ...p, salaryMax: e.target.value }))}
                          type="number"
                          className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-emerald-400 focus:bg-white outline-none transition font-medium"
                          placeholder="e.g. 500"
                        />
                        {postErrors.salaryMax && <div className="text-xs text-rose-600 mt-2 font-semibold">{postErrors.salaryMax}</div>}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-slate-900 mb-2">Payment Frequency</label>
                        <select
                          value={postData.payFreq}
                          onChange={(e) => setPostData(p => ({ ...p, payFreq: e.target.value }))}
                          className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-emerald-400 focus:bg-white outline-none transition font-medium"
                        >
                          <option>Daily</option>
                          <option>Weekly</option>
                          <option>Monthly</option>
                        </select>
                      </div>

                      <div className="md:col-span-2 p-6 rounded-2xl bg-linear-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200">
                        <div className="flex items-center gap-3 mb-2">
                          <CheckCircle className="w-5 h-5 text-emerald-600" />
                          <div className="font-black text-emerald-800">Secure Payment Protection</div>
                        </div>
                        <div className="text-sm text-emerald-700">
                          All payments are protected through our secure escrow system.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {jobPostStep === 3 && (
                  <div>
                    <h2 className="text-xl font-black text-slate-900 mb-6">Requirements & Skills</h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-900 mb-2">Required Skills</label>
                        <div className="flex gap-3">
                          <input
                            value={postData.skillsInput}
                            onChange={(e) => setPostData(p => ({ ...p, skillsInput: e.target.value }))}
                            className="flex-1 px-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-emerald-400 focus:bg-white outline-none transition font-medium"
                            placeholder="Enter skills (comma separated)"
                          />
                          <button
                            onClick={addSkillFromInput}
                            className="px-6 py-3.5 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-lg hover:shadow-xl transition-all"
                          >
                            Add
                          </button>
                        </div>
                        {postErrors.skills && <div className="text-xs text-rose-600 mt-2 font-semibold">{postErrors.skills}</div>}

                        <div className="flex flex-wrap gap-2 mt-4">
                          {postData.skills.map(s => (
                            <span
                              key={s}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-emerald-100 to-teal-100 text-emerald-700 font-bold text-sm"
                            >
                              {s}
                              <button onClick={() => removeSkill(s)} className="hover:scale-110 transition">
                                <XCircle className="w-4 h-4" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-900 mb-2">Experience Level</label>
                        <select
                          value={postData.experience}
                          onChange={(e) => setPostData(p => ({ ...p, experience: e.target.value }))}
                          className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:border-emerald-400 focus:bg-white outline-none transition font-medium"
                        >
                          <option>Entry Level</option>
                          <option>Experienced</option>
                          <option>Senior</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {jobPostStep === 4 && (
                  <div>
                    <h2 className="text-xl font-black text-slate-900 mb-6">Review & Publish</h2>
                    <div className="p-6 rounded-2xl bg-slate-50 border-2 border-slate-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="text-xs font-bold text-slate-500 uppercase mb-1">Job Title</div>
                          <div className="font-bold text-slate-900">{postData.title || "—"}</div>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-500 uppercase mb-1">Location</div>
                          <div className="font-bold text-slate-900">{postData.location || "—"}</div>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-500 uppercase mb-1">Type</div>
                          <div className="font-bold text-slate-900">{postData.type}</div>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-500 uppercase mb-1">Salary Range</div>
                          <div className="font-bold text-slate-900">₹{postData.salaryMin || "—"} - ₹{postData.salaryMax || "—"}</div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <div className="text-xs font-bold text-slate-500 uppercase mb-2">Skills</div>
                        <div className="flex flex-wrap gap-2">
                          {postData.skills.map(s => (
                            <span key={s} className="px-3 py-1 rounded-full bg-linear-to-r from-emerald-100 to-teal-100 text-emerald-700 font-bold text-sm">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6">
                        <div className="text-xs font-bold text-slate-500 uppercase mb-2">Description</div>
                        <div className="text-sm text-slate-700">{postData.description || "—"}</div>
                      </div>
                    </div>

                    <div className="mt-6 p-6 rounded-2xl bg-linear-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                        <div>
                          <div className="font-black text-emerald-800">Ready to Publish</div>
                          <div className="text-sm text-emerald-700">Your job will be visible to candidates immediately.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="mt-8 flex items-center justify-between">
                <div>
                  {jobPostStep > 1 && (
                    <button
                      onClick={prevStep}
                      className="px-6 py-3.5 rounded-2xl border-2 border-slate-300 font-bold text-slate-700 hover:bg-slate-50 transition"
                    >
                      Back
                    </button>
                  )}
                </div>
                <div>
                  {jobPostStep < 4 ? (
                    <button
                      onClick={nextStep}
                      className="px-8 py-3.5 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-lg hover:shadow-xl transition-all"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      onClick={publishJob}
                      className="px-8 py-3.5 rounded-2xl bg-linear-to-r from-green-500 to-emerald-500 text-white font-bold shadow-lg hover:shadow-xl transition-all"
                    >
                      Publish Job
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentPage === "applicants" && (
            <div className="bg-linear-to-br from-white to-slate-50 rounded-3xl shadow-xl border border-slate-200 p-8">
              <h2 className="text-3xl font-black bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2">
                Applicant Management
              </h2>
              <p className="text-slate-600 mb-8">Review and manage candidates for your roles</p>
              
              <div className="text-center py-12 text-slate-500">
                No applicants yet. Check back later!
              </div>
            </div>
          )}

          {currentPage !== "postjob" && currentPage !== "applicants" && (
            <div className="bg-linear-to-br from-white to-slate-50 rounded-3xl shadow-xl border border-slate-200 p-8 text-center">
              <h2 className="text-2xl font-black text-slate-900 mb-4">{navItems.find(n => n.id === currentPage)?.label}</h2>
              <p className="text-slate-600">This section is under development.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}