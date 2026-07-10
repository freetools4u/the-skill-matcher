import { useState, FormEvent } from "react";
import { Activity, Mail, Check, ArrowRight, Github, Twitter, Linkedin } from "lucide-react";

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Footer({ onScrollToSection }: FooterProps) {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // Simulate subscribe
    setSuccess(true);
    setEmail("");
    setTimeout(() => setSuccess(false), 5000);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="app-footer" className="bg-slate-950 text-slate-400 border-t border-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12" id="footer-layout">
          
          {/* Logo & description (5 cols) */}
          <div className="lg:col-span-5 space-y-6" id="footer-logo-desc">
            <button 
              onClick={() => onScrollToSection("home")} 
              className="flex items-center gap-2 text-left focus:outline-none"
              id="footer-logo"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white shadow-sm">
                <Activity className="h-5 w-5 rotate-45" />
              </div>
              <div>
                <span className="block font-display text-lg font-extrabold tracking-tight text-white leading-none">
                  Crossing Hurdles
                </span>
                <span className="block font-sans text-[10px] uppercase tracking-widest text-teal-400 font-semibold mt-0.5">
                  Career Optimization
                </span>
              </div>
            </button>
            <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Crossing Hurdles (crossinghurdles.com) is a premier full-stack career consultancy matching candidates with ex-FAANG talent acquisitions experts to audit resumes, maximize recruiter visibility, and prepare for high-stakes interviews.
            </p>
            
            {/* Social icons */}
            <div className="flex items-center gap-3" id="footer-socials">
              <button onClick={() => alert("LinkedIn connection callback.")} className="h-9 w-9 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition">
                <Linkedin className="h-4 w-4" />
              </button>
              <button onClick={() => alert("Twitter/X connection callback.")} className="h-9 w-9 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition">
                <Twitter className="h-4 w-4" />
              </button>
              <button onClick={() => alert("Github repository reference.")} className="h-9 w-9 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition">
                <Github className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Quick links navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-4" id="footer-links-col">
            <h4 className="font-display text-xs font-extrabold uppercase tracking-widest text-white">
              Consulting Directory
            </h4>
            <nav className="flex flex-col gap-2.5 font-sans text-xs" id="footer-nav">
              <button onClick={() => onScrollToSection("home")} className="text-left text-slate-400 hover:text-white transition">Home / Introduction</button>
              <button onClick={() => onScrollToSection("services")} className="text-left text-slate-400 hover:text-white transition">Pricing & Packages</button>
              <button onClick={() => onScrollToSection("resume-scanner")} className="text-left text-slate-400 hover:text-white transition">AI Resume Scorecard</button>
              <button onClick={() => onScrollToSection("coach-chat")} className="text-left text-slate-400 hover:text-white transition">HurdleCoach Chat</button>
              <button onClick={() => onScrollToSection("jobs")} className="text-left text-slate-400 hover:text-white transition">Remote Job Directory</button>
              <button onClick={() => onScrollToSection("coaches")} className="text-left text-slate-400 hover:text-white transition">Coaching Biographies</button>
            </nav>
          </div>

          {/* Newsletter (4 cols) */}
          <div className="lg:col-span-4 space-y-4" id="footer-newsletter-col">
            <h4 className="font-display text-xs font-extrabold uppercase tracking-widest text-white">
              Subscribe to Career Insights
            </h4>
            <p className="font-sans text-xs text-slate-400 leading-relaxed">
              Receive twice-weekly updates on modern resume keywords, market-specific hiring surges, and direct coaching interview templates.
            </p>
            
            <form onSubmit={handleSubscribe} className="space-y-2" id="footer-newsletter-form">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="flex-1 rounded-xl bg-slate-900 border border-slate-800 px-3.5 py-2 text-xs text-white focus:border-teal-500 focus:outline-none placeholder-slate-600"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-teal-600 px-3.5 text-white hover:bg-teal-500 shadow transition flex items-center justify-center"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              {success && (
                <div className="flex items-center gap-1.5 text-[10px] text-teal-400 bg-teal-950/40 p-2 rounded-lg border border-teal-900/50" id="footer-newsletter-success">
                  <Check className="h-3.5 w-3.5" />
                  <span>Success! Check your inbox for our Starter Kit.</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Bottom copyright details */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans text-[11px] text-slate-500" id="footer-bottom">
          <p>© {currentYear} Crossing Hurdles LLC. All rights reserved. Built for professional career transition success.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => alert("Terms of Service")} className="hover:text-slate-300 transition">Terms of Service</button>
            <span className="text-slate-800">•</span>
            <button onClick={() => alert("Privacy Policy")} className="hover:text-slate-300 transition">Privacy Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
