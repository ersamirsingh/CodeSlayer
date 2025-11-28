import React, { useEffect, useState } from "react";
import { Smartphone, MapPin, Clock, CheckCircle, Users, Briefcase, Globe2, Sparkles, ThumbsUp, Star, Zap, ArrowRight, Shield, TrendingUp, Award, Rocket, Heart, Check } from "lucide-react";
import {Link} from 'react-router-dom'

const Typewriter = ({ phrases = [], speed = 60, pause = 1500, className = "" }) => {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!phrases.length) return;
    const current = phrases[idx % phrases.length];
    const tick = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) setTimeout(() => setDeleting(true), pause);
      } else {
        if (text.length === 0) {
          setDeleting(false);
          setIdx((i) => (i + 1) % phrases.length);
        } else setText(current.slice(0, text.length - 1));
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(tick);
  }, [text, deleting, idx, phrases, speed, pause]);

  return (
    <span className={`inline-block ${className}`} aria-hidden>
      {text}
      <span className="ml-1 inline-block animate-blink">|</span>
      <style>{`.animate-blink{animation: blink 1s steps(2,start) infinite}@keyframes blink{50%{opacity:0}}`}</style>
    </span>
  );
};

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50">
 
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-emerald-50/50 via-teal-50/30 to-cyan-50/50" />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-20 grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-emerald-100 to-teal-100 text-emerald-700 font-bold text-sm mb-6 shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span>Trusted by 120K+ Workers</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-black leading-tight mb-6">
              <span className="bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
                KaamSetu —
              </span>
              <br />
              <span className="bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Work Local, Grow Local
              </span>
            </h1>
            
            <div className="text-xl text-slate-600 mb-8 min-h-8">
              <Typewriter
                phrases={["Verified local jobs.", "Fair pay, fast hires.", "Mobile-first for every worker."]}
                speed={55}
                pause={1500}
                className="font-semibold"
              />
            </div>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link to="/login" className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-2xl hover:shadow-emerald-500/50 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 hover:scale-105">
                <Sparkles className="w-5 h-5" /> Get Started
              </Link>
              <Link to="/howitwork" className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl border-2 border-slate-300 text-slate-700 bg-white hover:bg-slate-50 font-bold transition-all duration-300 hover:scale-105">
                Learn How It Works
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              <Stat icon={<Star className="w-5 h-5" />} value="4.8" label="App rating" />
              <Stat icon={<ThumbsUp className="w-5 h-5" />} value="120k+" label="Jobs posted" />
              <Stat icon={<Zap className="w-5 h-5" />} value="<24h" label="Avg hire time" />
            </div>
          </div>

          {/* Promo Cards Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <PromoCard 
                title="Workers" 
                desc="Create profile & get work" 
                icon={<Users className="w-6 h-6" />} 
                gradient="from-emerald-500 to-teal-500" 
              />
              <PromoCard 
                title="Employers" 
                desc="Post jobs & hire fast" 
                icon={<Briefcase className="w-6 h-6" />} 
                gradient="from-rose-500 to-pink-500" 
              />
              <PromoCard 
                title="Local Matches" 
                desc="Find nearby talent" 
                icon={<MapPin className="w-6 h-6" />} 
                gradient="from-teal-500 to-cyan-500" 
              />
              <PromoCard 
                title="Offline Support" 
                desc="Low-data friendly" 
                icon={<Smartphone className="w-6 h-6" />} 
                gradient="from-amber-500 to-orange-500" 
              />
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-20">
        <section className="grid gap-8 lg:grid-cols-2 mb-20">
          {/* Workers Card */}
          <div className="group relative bg-linear-to-br from-white to-slate-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200 overflow-hidden hover:scale-[1.02]">
            <div className="absolute inset-0 bg-linear-to-br from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/5 group-hover:to-teal-500/5 transition-all duration-500" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">For Workers</h3>
                  <p className="text-slate-600">Find jobs, build reputation, get paid on time.</p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                  <Users className="w-7 h-7 text-white" />
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <StepCard 
                  num={1} 
                  icon={<Smartphone className="w-5 h-5" />} 
                  title="Create Profile" 
                  text="Sign up, add skills & documents" 
                  color="emerald"
                />
                <StepCard 
                  num={2} 
                  icon={<MapPin className="w-5 h-5" />} 
                  title="Browse Jobs" 
                  text="Filter by distance, pay and skills" 
                  color="emerald"
                />
                <StepCard 
                  num={3} 
                  icon={<Clock className="w-5 h-5" />} 
                  title="Work & Track" 
                  text="Check-in/out and get accurate timesheets" 
                  color="emerald"
                />
                <StepCard 
                  num={4} 
                  icon={<CheckCircle className="w-5 h-5" />} 
                  title="Get Paid" 
                  text="Secure payouts; build ratings" 
                  color="emerald"
                />
              </div>

              <Link to="/signup" className="w-full px-6 py-4 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 flex items-center justify-center gap-2">
                Sign up as Worker <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Employers Card */}
          <div className="group relative bg-linear-to-br from-white to-slate-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200 overflow-hidden hover:scale-[1.02]">
            <div className="absolute inset-0 bg-linear-to-br from-rose-500/0 to-pink-500/0 group-hover:from-rose-500/5 group-hover:to-pink-500/5 transition-all duration-500" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">For Employers</h3>
                  <p className="text-slate-600">Post jobs, manage hires and payouts easily.</p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-rose-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <Briefcase className="w-7 h-7 text-white" />
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <StepCard 
                  num={1} 
                  icon={<Globe2 className="w-5 h-5" />} 
                  title="Create Account" 
                  text="Verify & set hiring preferences" 
                  color="rose"
                />
                <StepCard 
                  num={2} 
                  icon={<Briefcase className="w-5 h-5" />} 
                  title="Post Job" 
                  text="Set wage, location & skills required" 
                  color="rose"
                />
                <StepCard 
                  num={3} 
                  icon={<Users className="w-5 h-5" />} 
                  title="Select & Communicate" 
                  text="Review applicants and message them" 
                  color="rose"
                />
                <StepCard 
                  num={4} 
                  icon={<CheckCircle className="w-5 h-5" />} 
                  title="Confirm & Pay" 
                  text="Secure payout on completion" 
                  color="rose"
                />
              </div>

              <Link to="/signup" className="w-full px-6 py-4 rounded-2xl bg-linear-to-r from-rose-500 to-pink-500 text-white font-bold shadow-lg hover:shadow-xl hover:from-rose-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-2">
                Sign up as Employer <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Why KaamSetu */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-slate-900 mb-4">Why KaamSetu?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need for seamless work connections
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <MiniFeature 
              icon={<Shield className="w-6 h-6" />} 
              title="Verified Jobs" 
              desc="Only trusted employers"
              gradient="from-emerald-500 to-teal-500"
            />
            <MiniFeature 
              icon={<Clock className="w-6 h-6" />} 
              title="Quick Hiring" 
              desc="Post & hire fast"
              gradient="from-teal-500 to-cyan-500"
            />
            <MiniFeature 
              icon={<MapPin className="w-6 h-6" />} 
              title="Local Matches" 
              desc="Find nearby workers"
              gradient="from-cyan-500 to-blue-500"
            />
            <MiniFeature 
              icon={<Smartphone className="w-6 h-6" />} 
              title="Mobile-first" 
              desc="Works on low-end phones"
              gradient="from-blue-500 to-indigo-500"
            />
          </div>
        </section>

        {/* Testimonials + FAQ */}
        <section className="grid gap-12 lg:grid-cols-2 mb-20">
          {/* Testimonials */}
          <div>
            <h3 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <Heart className="w-8 h-8 text-rose-500" />
              What People Say
            </h3>
            <div className="space-y-6">
              <Testimonial 
                text="Found reliable daily work through KaamSetu. Payouts are quick and consistent." 
                name="Raju" 
                role="Worker"
                rating={5}
              />
              <Testimonial 
                text="We hired 8 workers in a day for harvest — app made it painless." 
                name="Sikha" 
                role="Employer"
                rating={5}
              />
              <Testimonial 
                text="Best platform for finding local work. The verification process makes it trustworthy." 
                name="Amit" 
                role="Worker"
                rating={5}
              />
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h3 className="text-3xl font-black text-slate-900 mb-8">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <Accordion 
                q="How do payments work?" 
                a="Employers release payments after job completion; payouts to bank or mobile wallets follow partner rules." 
              />
              <Accordion 
                q="Is verification required?" 
                a="Basic verification improves trust — IDs or contact confirmation may be requested." 
              />
              <Accordion 
                q="What if a worker doesn't show up?" 
                a="Employers can flag no-shows; repeated incidents affect worker rating." 
              />
              <Accordion 
                q="How quickly can I get hired?" 
                a="Most workers get hired within 24 hours of applying, depending on job requirements and location." 
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-12 shadow-2xl">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
          </div>
          
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-4xl font-black text-white mb-4">Ready to Get Started?</h3>
            <p className="text-xl text-slate-300 mb-8">
              Create your account and begin connecting with trusted local workers or employers.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/signup" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-2xl hover:shadow-emerald-500/50 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 hover:scale-105">
                Sign Up <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/login" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-white text-white hover:bg-white hover:text-slate-900 font-bold transition-all duration-300 hover:scale-105">
                Login
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-sm text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} KaamSetu. Empowering rural workers, building a better tomorrow.</p>
        </div>
      </footer>
    </div>
  );
};

// Component Definitions
const Stat = ({ icon, value, label }) => (
  <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border border-slate-200 shadow-sm">
    <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-100 to-teal-100 flex items-center justify-center text-emerald-600">
      {icon}
    </div>
    <div>
      <div className="font-black text-slate-900">{value}</div>
      <div className="text-xs text-slate-500 font-semibold">{label}</div>
    </div>
  </div>
);

const PromoCard = ({ title, desc, icon, gradient }) => (
  <div className="group relative bg-linear-to-br from-white to-slate-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-slate-200 overflow-hidden hover:scale-105">
    <div className={`absolute inset-0 bg-linear-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-all duration-500`} />
    <div className="relative z-10">
      <div className={`w-12 h-12 mb-4 rounded-xl bg-linear-to-br ${gradient} flex items-center justify-center shadow-lg`}>
        {icon}
      </div>
      <h4 className="font-black text-slate-900 mb-1">{title}</h4>
      <p className="text-sm text-slate-600">{desc}</p>
    </div>
  </div>
);

const StepCard = ({ num, icon, title, text, color = "emerald" }) => {
  const gradientClass = color === "rose" 
    ? "from-rose-500 to-pink-500" 
    : "from-emerald-500 to-teal-500";
  
  const iconColorClass = color === "rose" ? "text-rose-600" : "text-emerald-600";
  
  return (
    <div className="flex gap-4 items-start p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-white transition-all duration-300">
      <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${gradientClass} flex items-center justify-center font-black text-white shadow-lg shrink-0`}>
        {num}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <div className={iconColorClass}>{icon}</div>
          <h4 className="font-bold text-slate-900">{title}</h4>
        </div>
        <p className="text-sm text-slate-600">{text}</p>
      </div>
    </div>
  );
};

const MiniFeature = ({ icon, title, desc, gradient }) => (
  <div className="group relative bg-linear-to-br from-white to-slate-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-slate-200 overflow-hidden hover:scale-105">
    <div className={`absolute inset-0 bg-linear-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-all duration-500`} />
    <div className="relative z-10">
      <div className={`w-14 h-14 mb-4 rounded-xl bg-linear-to-br ${gradient} flex items-center justify-center shadow-lg`}>
        {icon}
      </div>
      <h4 className="font-black text-slate-900 mb-2">{title}</h4>
      <p className="text-sm text-slate-600">{desc}</p>
    </div>
  </div>
);

const Testimonial = ({ text, name, role, rating }) => (
  <div className="bg-linear-to-br from-white to-slate-50 rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
    <div className="flex gap-1 mb-4">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
      ))}
    </div>
    <p className="text-slate-700 mb-4 italic">"{text}"</p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center font-bold text-white">
        {name[0]}
      </div>
      <div>
        <div className="font-bold text-slate-900">{name}</div>
        <div className="text-sm text-slate-500">{role}</div>
      </div>
    </div>
  </div>
);

const Accordion = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-all">
      <button
        onClick={() => setOpen((s) => !s)}
        className="w-full flex items-center justify-between text-left"
        aria-expanded={open}
      >
        <span className="font-bold text-slate-900">{q}</span>
        <div className={`w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center transform transition-transform ${open ? "rotate-180" : ""}`}>
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
            <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "mt-3 opacity-100" : "max-h-0 opacity-0"}`}>
        <p className="text-sm text-slate-600 leading-relaxed">{a}</p>
      </div>
    </div>
  );
};

export default FeaturesPage;