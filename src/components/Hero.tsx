import { ArrowRight, Trophy, Zap, ShieldCheck, Users } from "lucide-react";

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenConsultation: () => void;
}

export default function Hero({ onScrollToSection, onOpenConsultation }: HeroProps) {
  return (
    <section 
      id="home" 
      className="relative overflow-hidden bg-radial from-teal-50/40 via-white to-white py-16 sm:py-24 lg:py-32 border-b border-slate-100"
    >
      {/* Background grids */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#0f172a05_1px,transparent_1px),linear-gradient(to_bottom,#0f172a05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      {/* Visual blur highlights */}
      <div className="absolute top-1/4 left-1/10 h-96 w-96 rounded-full bg-teal-100/40 blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/10 h-96 w-96 rounded-full bg-slate-100/40 blur-3xl -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left" id="hero-text-content">
            
            {/* Promo Tag */}
            <div className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3.5 py-1.5 text-xs font-semibold text-teal-800 border border-teal-100/50 shadow-sm" id="hero-badge">
              <Trophy className="h-3.5 w-3.5 text-teal-600 animate-bounce" />
              Overcome Career Obstacles • Land The Offer
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl md:text-6xl lg:leading-[1.1]" id="hero-headline">
              Cross your career hurdles. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
                Secure your dream role.
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto lg:mx-0 max-w-2xl font-sans text-lg text-slate-600 leading-relaxed" id="hero-subtext">
              Action-driven career coaching, bespoke resume optimization, and mock interview mastery tailored for high-stakes career transitions. Re-frame your past, outsmart automated ATS filters, and negotiate with absolute confidence.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2" id="hero-ctas">
              <button
                onClick={() => onScrollToSection("resume-scanner")}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-teal-600 px-8 py-4 font-display text-base font-bold text-white shadow-lg hover:bg-teal-500 hover:shadow-xl hover:shadow-teal-100 hover:-translate-y-0.5 transition duration-200 cursor-pointer"
                id="hero-scan-btn"
              >
                Scan Resume Free
                <ArrowRight className="h-5 w-5" />
              </button>
              
              <button
                onClick={onOpenConsultation}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-8 py-4 font-display text-base font-bold text-slate-800 shadow-sm hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-0.5 transition duration-200 cursor-pointer"
                id="hero-coaching-btn"
              >
                Book Career Strategy
              </button>
            </div>

            {/* Value Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100 max-w-md mx-auto lg:mx-0" id="hero-value-indicators">
              <div className="text-center lg:text-left">
                <span className="block font-display text-2xl font-extrabold text-slate-900">94.7%</span>
                <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">Offer Success Rate</span>
              </div>
              <div className="text-center lg:text-left border-x border-slate-150 px-2">
                <span className="block font-display text-2xl font-extrabold text-slate-900">+$24.5k</span>
                <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">Avg Salary Boost</span>
              </div>
              <div className="text-center lg:text-left">
                <span className="block font-display text-2xl font-extrabold text-slate-900">42 Days</span>
                <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">Avg Time to Land</span>
              </div>
            </div>

          </div>

          {/* Hero Right Visual Column */}
          <div className="lg:col-span-5 relative" id="hero-visual-content">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl border border-slate-100 bg-white/80 p-6 shadow-2xl backdrop-blur-sm">
              
              {/* Header inside visual card */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-teal-400" />
                </div>
                <span className="font-mono text-[10px] font-bold text-slate-400 tracking-wider uppercase">Live Transition Engine</span>
              </div>

              {/* Steps or Cards */}
              <div className="space-y-4 pt-5">
                
                {/* Step 1: Hurdle */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-rose-50/70 border border-rose-100/50 shadow-xs transition hover:scale-[1.02] duration-200" id="hero-card-hurdle">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-500 text-white shadow-sm">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block font-sans text-[10px] font-extrabold uppercase tracking-wider text-rose-600">The Hurdle Found</span>
                    <span className="block font-display text-sm font-bold text-slate-900 mt-0.5">Candidate resume has a 12-month parenting gap.</span>
                    <span className="block font-sans text-xs text-rose-700/80 mt-1">Status: Flagged by automated ATS scanner.</span>
                  </div>
                </div>

                {/* Arrow Connector */}
                <div className="flex justify-center -my-2">
                  <div className="h-6 w-0.5 bg-slate-200" />
                </div>

                {/* Step 2: Crossing */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-teal-50/70 border border-teal-100/50 shadow-xs transition hover:scale-[1.02] duration-200" id="hero-card-crossing">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white shadow-sm">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block font-sans text-[10px] font-extrabold uppercase tracking-wider text-teal-600">Crossing Strategy</span>
                    <span className="block font-display text-sm font-bold text-slate-900 mt-0.5">Reframed gap into 'Full-Time Project Lead & Operations' consulting.</span>
                    <span className="block font-sans text-xs text-teal-700/80 mt-1">Outcome: Resume score increased to 95, passed automatic recruiter review.</span>
                  </div>
                </div>

                {/* Success Banner */}
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900 text-white shadow-md" id="hero-card-success">
                  <Users className="h-4 w-4 text-teal-400" />
                  <span className="font-sans text-xs font-semibold">
                    David K. landed a <strong className="text-teal-400">CSM role at Slack</strong> (+35% salary) in 35 days!
                  </span>
                </div>

              </div>

            </div>

            {/* Decorative abstract elements */}
            <div className="absolute -bottom-4 -left-4 -z-10 h-24 w-24 rounded-2xl bg-amber-100/60 rotate-12 blur-xs" />
            <div className="absolute -top-4 -right-4 -z-10 h-32 w-32 rounded-full bg-teal-500/10 blur-xl animate-pulse" />
          </div>

        </div>
      </div>
    </section>
  );
}
