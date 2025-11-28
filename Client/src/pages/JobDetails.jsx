import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosClient from "../API/axiosClient";
import { ArrowLeft, MapPin, Clock, Tag, Phone, User, Wallet, Users } from "lucide-react";

export default function JobDetails({ job: jobProp }) {
  const { id: jobIdFromParams } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth || {});

  const jobIdentifier = jobProp?._id || jobProp?.id || jobIdFromParams;

  const [job, setJob] = useState(jobProp || null);
  const [loading, setLoading] = useState(!jobProp);
  const [fetchError, setFetchError] = useState("");
  const [hasApplied, setHasApplied] = useState(false);
  const [canViewApplicants, setCanViewApplicants] = useState(false);
  const [applicants, setApplicants] = useState([]);
  const [applicantCount, setApplicantCount] = useState(0);
  const [applyStatus, setApplyStatus] = useState({ loading: false, error: "", success: "" });
  const [applyForm, setApplyForm] = useState({
    fullName: user?.firstName || "",
    contactNumber: user?.contact ? String(user.contact) : "",
    experience: "",
    message: ""
  });

  const fetchJob = useCallback(async () => {
    if(!jobIdentifier){
      setFetchError("Missing job identifier.");
      return;
    }
    setLoading(true);
    setFetchError("");
    try{
      const { data } = await axiosClient.get(`/jobs/${jobIdentifier}`);
      const payload = data?.data;
      if(payload?.job){
        setJob(payload.job);
        setCanViewApplicants(!!payload.canViewApplicants);
        setHasApplied(!!payload.hasApplied);
        setApplicantCount(payload.applicantCount ?? payload.job.applications?.length ?? 0);
        setApplicants(payload.canViewApplicants ? (payload.job.applications || []) : []);
      }else{
        setFetchError("Unable to load job details.");
      }
    }catch(err){
      const message = err.response?.data?.message || "Unable to load job details.";
      setFetchError(message);
    }finally{
      setLoading(false);
    }
  }, [jobIdentifier]);

  useEffect(() => {
    if(jobProp && !jobIdentifier){
      setJob(jobProp);
    }
  }, [jobProp, jobIdentifier]);

  useEffect(() => {
    if(jobIdentifier){
      fetchJob();
    }
  }, [jobIdentifier, fetchJob]);

  useEffect(() => {
    setApplyForm(prev => ({
      ...prev,
      fullName: prev.fullName || user?.firstName || "",
      contactNumber: prev.contactNumber || (user?.contact ? String(user.contact) : "")
    }));
  }, [user]);

  const formattedWage = useMemo(() => {
    if(!job) return "—";
    if(job.wage) return `₹${job.wage}`;
    if(job.salaryMin && job.salaryMax) return `₹${job.salaryMin} - ₹${job.salaryMax}`;
    if(job.salaryMin) return `₹${job.salaryMin}`;
    return job.payType || job.payFrequency || "—";
  }, [job]);

  const payFrequency = job?.payFrequency || job?.employmentType || job?.payType || "—";
  const locationText = job?.locationText || job?.location || "Location not specified";
  const employerName = job?.employer?.firstName || job?.company || "Hiring Manager";
  const employerContact = job?.employer?.contact || job?.contact?.phone || "";
  const skillList = job?.skills?.length ? job.skills : (job?.requirements || []);
  const postedLabel = job?.posted || (job?.createdAt ? new Date(job.createdAt).toLocaleString() : "");

  const handleInputChange = (field, value) => {
    setApplyForm(prev => ({ ...prev, [field]: value }));
    if(applyStatus.error){
      setApplyStatus(prev => ({ ...prev, error: "" }));
    }
  };

  const handleApply = async (event) => {
    event.preventDefault();
    if(!isAuthenticated){
      setApplyStatus({ loading: false, error: "Please log in to apply for this job.", success: "" });
      return;
    }
    if(!job?._id && !jobIdentifier){
      setApplyStatus({ loading: false, error: "Job information missing.", success: "" });
      return;
    }
    if(hasApplied){
      setApplyStatus({ loading: false, error: "You have already applied for this job.", success: "" });
      return;
    }

    const trimmedName = applyForm.fullName.trim();
    const trimmedContact = applyForm.contactNumber.trim();

    if(!trimmedName || !trimmedContact){
      setApplyStatus({ loading: false, error: "Please provide your name and contact number.", success: "" });
      return;
    }

    setApplyStatus({ loading: true, error: "", success: "" });
    try{
      await axiosClient.post(`/jobs/${job?._id || jobIdentifier}/apply`, {
        fullName: trimmedName,
        contactNumber: trimmedContact,
        experience: applyForm.experience.trim(),
        message: applyForm.message.trim()
      });
      setApplyStatus({ loading: false, error: "", success: "Application submitted successfully!" });
      setHasApplied(true);
      setApplyForm(prev => ({ ...prev, experience: "", message: "" }));
      fetchJob();
    }catch(err){
      const message = err.response?.data?.message || "Failed to submit your application. Please try again.";
      setApplyStatus({ loading: false, error: message, success: "" });
    }
  };

  if(fetchError){
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <p className="text-red-600 font-semibold">{fetchError}</p>
          <button onClick={() => navigate(-1)} className="btn btn-ghost">Go back</button>
        </div>
      </main>
    );
  }

  if(loading || !job){
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="text-gray-500">Loading job details...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header / Back */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-md hover:bg-gray-100"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{job.title}</h1>
            <p className="text-sm text-gray-600">{employerName}{postedLabel ? ` • Posted ${postedLabel}` : ""}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main details */}
          <section className="md:col-span-2 bg-white rounded-lg shadow-sm p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 text-blue-700 rounded-full w-12 h-12 flex items-center justify-center font-bold uppercase">
                  {(employerName || "Job").split(" ").map(s => s[0]).slice(0,2).join("")}
                </div>
                <div>
                  <h2 className="text-lg font-medium text-gray-800">{employerName}</h2>
                  <p className="text-sm text-gray-500">{locationText}</p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xl font-bold text-blue-600">{formattedWage}</div>
                <div className="text-xs text-gray-500">{payFrequency}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 rounded-xl border border-gray-100 p-4 bg-gray-50 text-sm text-gray-600">
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider text-gray-500">Applicants</span>
                <span className="text-lg font-semibold text-gray-900">{applicantCount}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider text-gray-500">Experience</span>
                <span className="text-lg font-semibold text-gray-900">{job.experienceLevel || "Not specified"}</span>
              </div>
            </div>

            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Job Description</h3>
                <p>{job.description || "No description provided."}</p>
              </div>

              {skillList.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((s, i) => (
                      <span key={`${s}-${i}`} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs border border-blue-100">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {job.safetyNotes && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Safety Notes</h3>
                  <p className="text-sm text-gray-600">{job.safetyNotes}</p>
                </div>
              )}
            </div>

            <section className="border-t border-gray-100 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Apply for this job</h3>
              <form className="space-y-4" onSubmit={handleApply}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      value={applyForm.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-blue-400 focus:outline-none"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                    <input
                      value={applyForm.contactNumber}
                      onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-blue-400 focus:outline-none"
                      placeholder="Phone number"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                    <input
                      value={applyForm.experience}
                      onChange={(e) => handleInputChange("experience", e.target.value)}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-blue-400 focus:outline-none"
                      placeholder="e.g. 2 years construction"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message / Availability</label>
                    <input
                      value={applyForm.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-blue-400 focus:outline-none"
                      placeholder="Share anything important"
                    />
                  </div>
                </div>

                {applyStatus.error && (
                  <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                    {applyStatus.error}
                  </div>
                )}
                {applyStatus.success && (
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                    {applyStatus.success}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={applyStatus.loading || hasApplied}
                  className={`btn btn-primary w-full md:w-auto ${applyStatus.loading || hasApplied ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {applyStatus.loading ? "Submitting..." : hasApplied ? "Application Sent" : "Submit Application"}
                </button>
              </form>
            </section>

            {canViewApplicants && (
              <section className="border-t border-gray-100 pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Applicants</h3>
                  <span className="text-sm text-gray-500">({applicants.length})</span>
                </div>
                {applicants.length === 0 ? (
                  <p className="text-sm text-gray-500">No applicants yet.</p>
                ) : (
                  <div className="space-y-3">
                    {applicants.map((app) => (
                      <div key={app._id || `${app.applicant}-${app.submittedAt}`} className="rounded-xl border border-gray-100 p-4 bg-gray-50">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div>
                            <p className="font-semibold text-gray-900">{app.fullName || app.applicant?.firstName}</p>
                            <p className="text-sm text-gray-500">{app.contactNumber || app.applicant?.contact}</p>
                          </div>
                          <span className="text-xs text-gray-500">{app.submittedAt ? new Date(app.submittedAt).toLocaleString() : ""}</span>
                        </div>
                        {(app.experience || app.message) && (
                          <div className="mt-3 text-sm text-gray-700 space-y-1">
                            {app.experience && <p><span className="font-medium">Experience:</span> {app.experience}</p>}
                            {app.message && <p><span className="font-medium">Note:</span> {app.message}</p>}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}
          </section>

          {/* Sidebar */}
          <aside className="bg-white rounded-lg shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-xs text-gray-500">Contact</p>
                <p className="font-medium text-gray-800">{employerName}</p>
                {employerContact && (
                  <a className="text-sm text-primary" href={`tel:${employerContact}`}>{employerContact}</a>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-xs text-gray-500">Location</p>
                <p className="font-medium text-gray-800">{locationText}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-xs text-gray-500">Duration</p>
                <p className="font-medium text-gray-800">{job.duration || "Not specified"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Wallet className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-xs text-gray-500">Pay</p>
                <p className="font-medium text-gray-800">{formattedWage}</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-500">Other</p>
              <div className="mt-2 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{job.payFrequency || "Flexible schedule"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{job.category || "General work"}</span>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="mt-2">
              <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                <MapPin className="w-6 h-6" />
                <span className="ml-2 text-sm">Map preview coming soon</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
