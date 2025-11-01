// src/pages/Jobs.jsx
import React from "react";
import JobCard from "../components/JobCards";

const jobList = [
  {
    title: "Farm Helper",
    location: "Patna, Bihar",
    wage: "₹500",
    type: "Daily Wage",
    skills: ["Ploughing", "Harvesting", "Irrigation"],
  },
  {
    title: "Construction Worker",
    location: "Varanasi, UP",
    wage: "₹650",
    type: "Contract",
    skills: ["Brick Laying", "Masonry", "Mixing Cement"],
  },
  {
    title: "Electrician Assistant",
    location: "Gaya, Bihar",
    wage: "₹700",
    type: "Skilled",
    skills: ["Wiring", "Fitting", "Safety"],
  },
];

export default function Jobs() {
  const handleApply = (job) => {
    alert(`You applied for ${job.title}`);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Available Jobs
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobList.map((job, index) => (
          <JobCard key={index} job={job} onApply={handleApply} />
        ))}
      </div>
    </main>
  );
}
