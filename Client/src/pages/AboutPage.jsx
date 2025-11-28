/* eslint-disable no-unused-vars */
import React from "react";
import {Link } from 'react-router-dom'
import { Users, Heart, Target, Clock, Mail, Phone, Shield, Award, TrendingUp, Sparkles, ArrowRight, CheckCircle } from "lucide-react";
import Footer from "../components/layout/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50">

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-emerald-50/50 via-teal-50/30 to-cyan-50/50" />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-emerald-100 to-teal-100 text-emerald-700 font-bold text-sm mb-6 shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span>Building Trust, Creating Opportunity</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-black leading-tight mb-6">
              <span className="bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
                About
              </span>
              <br />
              <span className="bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                KaamSetu
              </span>
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
              KaamSetu is built to make local daily-wage work discoverable, safe and fair. 
              We design for low-bandwidth environments, simple onboarding, and transparent 
              payments so workers and employers can transact with trust.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/jobpage" className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-2xl hover:shadow-emerald-500/50 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 hover:scale-105">
                Browse Jobs <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to='/contactpage' className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl border-2 border-slate-300 text-slate-700 bg-white hover:bg-slate-50 font-bold transition-all duration-300 hover:scale-105">
                Contact Support
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: "Active Jobs", value: "1.2K+", icon: Target },
              { title: "Workers", value: "8.5K+", icon: Users },
              { title: "Employers", value: "500+", icon: Award },
              { title: "Success Rate", value: "98%", icon: TrendingUp },
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
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-500 font-semibold mt-1">{stat.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 mb-4">Our Mission</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Connecting honest work with local workers through transparent, accessible technology
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          <Feature 
            icon={Target} 
            title="Fair Pay"
            gradient="from-emerald-500 to-teal-500"
          >
            We promote transparent wage listings and on-time payments so workers receive fair compensation for their labor.
          </Feature>

          <Feature 
            icon={Users} 
            title="Local Trust"
            gradient="from-teal-500 to-cyan-500"
          >
            Verified employers, simple KYC and community ratings — building trust at the village level.
          </Feature>

          <Feature 
            icon={Heart} 
            title="Worker-First"
            gradient="from-cyan-500 to-blue-500"
          >
            Low-connectivity support (SMS flows), multilingual UI and simple design for first-time users.
          </Feature>
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="bg-linear-to-br from-white to-slate-50 border border-slate-200 rounded-3xl p-12 shadow-2xl">
          <h2 className="text-3xl font-black text-slate-900 mb-8 text-center">Why Choose KaamSetu?</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Verified Opportunities", desc: "All jobs are verified and employers are background-checked" },
              { title: "Instant Payments", desc: "Get paid on time through secure digital payment methods" },
              { title: "Dispute Resolution", desc: "Fair mediation system to resolve any work-related issues" },
              { title: "Local Focus", desc: "Find work near you and build connections in your community" },
              { title: "No Hidden Fees", desc: "Transparent pricing with no surprise charges or deductions" },
              { title: "24/7 Support", desc: "Help is always available when you need it" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-4 p-5 rounded-2xl hover:bg-linear-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-300 border border-transparent hover:border-emerald-200"
              >
                <div className="shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="relative overflow-hidden bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-12 shadow-2xl">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h3 className="text-3xl font-black text-white mb-3">
                Have Questions or Want to Partner?
              </h3>
              <p className="text-slate-300 text-lg">
                We love collaborating with NGOs, local governments and community groups.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-2xl hover:shadow-emerald-500/50 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 hover:scale-105">
                <Mail className="w-5 h-5" /> Email Us
              </button>
              <Link to="/contactpage" className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl border-2 border-white text-white hover:bg-white hover:text-slate-900 font-bold transition-all duration-300 hover:scale-105">
                Contact Page
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </main>
  );
}

function Feature({ icon: Icon, title, children, gradient }) {
  return (
    <div className="group relative bg-linear-to-br from-white to-slate-50 border border-slate-200 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-emerald-500/0 to-cyan-500/0 group-hover:from-emerald-500/5 group-hover:to-cyan-500/5 transition-all duration-500" />
      <div className="relative z-10">
        <div className={`w-16 h-16 mb-5 rounded-2xl bg-linear-to-br ${gradient} flex items-center justify-center shadow-lg`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h4 className="text-xl font-black text-slate-900 mb-3">{title}</h4>
        <p className="text-sm text-slate-600 leading-relaxed">{children}</p>
      </div>
    </div>
  );
}