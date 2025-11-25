import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Tag, Phone, User, Wallet } from "lucide-react";


const MOCK_JOBS = [
  {
    id: "job-001",
    title: "Construction Helper",
    company: "BuildCo Constructions",
    wage: "₹500-600 / day",
    payType: "Daily Wage",
    location: "Kankarbagh, Patna",
    coords: { lat: 25.5941, lng: 85.1376 }, // optional, placeholder
    duration: "3 days",
    posted: "2 hours ago",
    description:
      "Assist masons and laborers with carrying materials, mixing cement, and general site tasks. Basic experience preferred.",
    requirements: ["Physical fitness", "Prior construction experience (preferred)", "Bring water bottle & PPE if available"],
    contact: { name: "Mr. Rajesh", phone: "98765XXXXX" },
    skills: ["Carrying Materials", "Mixing Cement", "Site Assistance"],
    safetyNotes: "Use masks near dust; stay hydrated."
  },
  {
    id: "job-002",
    title: "Irrigation Assistant",
    company: "Sharma Farms",
    wage: "₹500 / day",
    payType: "Daily Wage",
    location: "Gram Panchayat Area",
    coords: { lat: 25.6000, lng: 85.1200 },
    duration: "1 week",
    posted: "1 day ago",
    description:
      "Help maintain canals and water distribution. Identifying blockages and assisting with piping as required.",
    requirements: ["Knowledge of basic irrigation", "Willingness to work near water"],
    contact: { name: "Smt. Sharma", phone: "98888XXXXX" },
    skills: ["Irrigation", "Canal Maintenance"]
  }
];

export default function JobDetails({ job: jobProp }) {
  const { id: jobIdFromParams } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(jobProp || null);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!job && jobIdFromParams) {
      // Simulate fetching job by ID (replace with API call)
      const found = MOCK_JOBS.find((j) => j.id === jobIdFromParams);
      if (found) setJob(found);
      else setError("Job not found.");
    }
  }, [jobIdFromParams, job]);

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
          <button onClick={() => navigate(-1)} className="btn btn-ghost mt-4">
            Go back
          </button>
        </div>
      </main>
    );
  }

  if (!job) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="text-gray-500">Loading job details...</div>
      </main>
    );
  }

  const handleApply = async () => {
    setApplying(true);
    setError("");
    try {
      // Replace with realistic API call: POST /jobs/:id/apply
      await new Promise((r) => setTimeout(r, 900)); // mock network
      setApplied(true);
      // Optionally navigate to Applications or show modal
    } catch (e) {
      setError("Failed to apply. Please try again."+e.error);
    } finally {
      setApplying(false);
    }
  };

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
            <p className="text-sm text-gray-600">{job.company} • Posted {job.posted}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main details */}
          <section className="md:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 text-blue-700 rounded-full w-12 h-12 flex items-center justify-center font-bold">
                  {job.company.split(" ").map(s => s[0]).slice(0,2).join("")}
                </div>
                <div>
                  <h2 className="text-lg font-medium text-gray-800">{job.company}</h2>
                  <p className="text-sm text-gray-500">{job.location}</p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xl font-bold text-blue-600">{job.wage}</div>
                <div className="text-xs text-gray-500">{job.payType}</div>
              </div>
            </div>

            <hr className="my-4" />

            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Job Description</h3>
                <p>{job.description}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Requirements</h3>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {job.requirements.map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((s, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs border border-blue-100">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Safety Notes</h3>
                <p className="text-sm text-gray-600">{job.safetyNotes}</p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={handleApply}
                disabled={applying || applied}
                className={`btn flex-1 ${applied ? "btn-ghost" : "btn-primary"}`}
              >
                {applying ? "Applying..." : applied ? "Applied" : "Apply Now"}
              </button>

              <a
                href={`tel:${job.contact.phone}`}
                className="btn btn-outline flex items-center gap-2"
                aria-label={`Call ${job.contact.name}`}
              >
                <Phone className="w-4 h-4" /> Contact
              </a>
            </div>

            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          </section>

          {/* Sidebar */}
          <aside className="bg-white rounded-lg shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-xs text-gray-500">Contact</p>
                <p className="font-medium text-gray-800">{job.contact.name}</p>
                <a className="text-sm text-primary" href={`tel:${job.contact.phone}`}>{job.contact.phone}</a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-xs text-gray-500">Location</p>
                <p className="font-medium text-gray-800">{job.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-xs text-gray-500">Duration</p>
                <p className="font-medium text-gray-800">{job.duration}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Wallet className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-xs text-gray-500">Pay</p>
                <p className="font-medium text-gray-800">{job.wage}</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-500">Other</p>
              <div className="mt-2 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">Immediate joining available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">Tools provided</span>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="mt-2">
              <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                <MapPin className="w-6 h-6" />
                <span className="ml-2 text-sm">Map preview (replace with Google/Mapbox)</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
