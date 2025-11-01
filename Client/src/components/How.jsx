import React from "react";
import { Smartphone, MapPin, Clock, CheckCircle, Users, Briefcase, Globe2 } from "lucide-react";
import { NavLink } from "react-router";
import Homeheader from "./HomeHeader";

const How = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Homeheader/>
      <section className="bg-white py-14 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">How KaamSetu Works</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Simple, reliable, and transparent — KaamSetu connects rural workers with employers through a
            user-friendly platform designed for quick hiring and fair work.
          </p>
        </div>
      </section>


      <section className="max-w-6xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-2 items-start">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-lg bg-indigo-50 text-indigo-600">
              <Users size={24} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">For Workers</h2>
              <p className="text-sm text-gray-500">Find local jobs, build your profile, and get paid fairly.</p>
            </div>
          </div>

          <ol className="space-y-4 mt-4">
            <Step num="1" icon={<Smartphone className="w-6 h-6" />} title="Create a Profile">
              Sign up in minutes, add basic details, skills, and documents (if required). Your profile helps
              employers find you.
            </Step>

            <Step num="2" icon={<MapPin className="w-6 h-6" />} title="Browse Local Jobs">
              Explore nearby job posts filtered by distance, wage, and skill. Apply or accept offers with a tap.
            </Step>

            <Step num="3" icon={<Clock className="w-6 h-6" />} title="Work & Track">
              View job details, start time, and location. Use in-app directions and check-in/out to record attendance.
            </Step>

            <Step num="4" icon={<CheckCircle className="w-6 h-6" />} title="Get Paid">
              Receive timely payments via the preferred payout method. Review employers and build reputation.
            </Step>
          </ol>

          <div className="mt-6">
            <NavLink
              to="/signup"
              className="inline-block px-5 py-2 rounded-md bg-indigo-600 text-white font-medium shadow-sm hover:bg-indigo-500"
            >
              Sign up as Worker
            </NavLink>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-lg bg-rose-50 text-rose-600">
              <Briefcase size={24} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">For Employers</h2>
              <p className="text-sm text-gray-500">Post jobs quickly, hire reliably, and manage payments smoothly.</p>
            </div>
          </div>

          <ol className="space-y-4 mt-4">
            <Step num="1" icon={<Globe2 className="w-6 h-6" />} title="Create an Account">
              Register your business or profile, verify contact details, and set hiring preferences.
            </Step>

            <Step num="2" icon={<Briefcase className="w-6 h-6" />} title="Post Job">
              Create a job with clear details — wage, start/end time, location, and required skills.
            </Step>

            <Step num="3" icon={<Users className="w-6 h-6" />} title="Select & Communicate">
              Review applicants, view profiles, and message workers to confirm availability.
            </Step>

            <Step num="4" icon={<CheckCircle className="w-6 h-6" />} title="Confirm & Pay">
              Confirm workers, monitor completion, and pay through the secure payout flow. Leave feedback to build trust.
            </Step>
          </ol>

          <div className="mt-6">
            <NavLink
              to="/signup"
              className="inline-block px-5 py-2 rounded-md bg-rose-600 text-white font-medium shadow-sm hover:bg-rose-500"
            >
              Sign up as Employer
            </NavLink>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Why KaamSetu?</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            <Feature icon={<CheckCircle />} title="Verified Jobs" desc="Only verified employers and fair contracts." />
            <Feature icon={<Clock />} title="Quick Hiring" desc="Post jobs and hire within hours." />
            <Feature icon={<MapPin />} title="Local Matches" desc="Find workers close to the job site." />
            <Feature icon={<Smartphone />} title="Mobile First" desc="Designed for low-end devices and intermittent connectivity." />
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <Faq q="How do payments work?" a="Payments are handled through secure payout partners. You can withdraw to a bank or mobile wallet; employers confirm completion before release." />
          <Faq q="Is verification required?" a="Basic verification helps build trust. Workers and employers may be asked to upload ID or contact details." />
          <Faq q="What if a worker doesn't show up?" a="Employers can flag no-shows; repeated incidents affect worker rating. We encourage clear communication before the job." />
        </div>
      </section>

      <section className="bg-linear-to-r from-indigo-600 to-indigo-500 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-3">Ready to get started?</h3>
          <p className="mb-6 text-indigo-100">Create your account and start connecting with trusted local workers or employers.</p>
          <div className="flex items-center justify-center gap-3">
            <NavLink to="/signup" className="px-5 py-3 rounded-md bg-white text-indigo-600 font-semibold">
              Sign Up
            </NavLink>
            <NavLink to="/login" className="px-5 py-3 rounded-md border border-white/30 text-white">
              Login
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};

const Step = ({ num, icon, title, children }) => (
  <li className="flex gap-4 items-start">
    <div className="shrink-0 w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-semibold">
      {num}
    </div>
    <div>
      <div className="flex items-center gap-2">
        {icon}
        <h4 className="text-md font-semibold text-gray-900">{title}</h4>
      </div>
      <p className="text-sm text-gray-600 mt-1">{children}</p>
    </div>
  </li>
);

const Feature = ({ icon, title, desc }) => (
  <div className="bg-gray-50 p-5 rounded-lg shadow-sm flex flex-col items-start gap-3">
    <div className="text-indigo-600">{icon}</div>
    <h4 className="font-semibold text-gray-900">{title}</h4>
    <p className="text-sm text-gray-600">{desc}</p>
  </div>
);

const Faq = ({ q, a }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border">
    <h5 className="font-semibold text-gray-900">{q}</h5>
    <p className="text-sm text-gray-600 mt-2">{a}</p>
  </div>
);

export default How;
