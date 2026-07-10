import { Award, Mail, MessageSquare, Linkedin } from "lucide-react";
import { coaches } from "../data";

export default function Coaches() {
  return (
    <section id="coaches" className="bg-slate-50/50 py-20 sm:py-28 border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16" id="coaches-header">
          <span className="text-xs font-extrabold uppercase tracking-widest text-teal-600">
            Expert Consultants
          </span>
          <h2 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl md:text-5xl tracking-tight">
            Meet Our Recruiting Coaches
          </h2>
          <p className="font-sans text-base sm:text-lg text-slate-600 leading-relaxed">
            Our team consists of veteran talent acquisitions leaders, ex-FAANG hiring managers, and certified executive coaches dedicated to diagnosing and solving your career bottlenecks.
          </p>
        </div>

        {/* Coaches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="coaches-grid">
          {coaches.map((coach) => (
            <div
              key={coach.id}
              className="flex flex-col justify-between rounded-3xl bg-white border border-slate-100 p-6 sm:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300"
              id={`coach-card-${coach.id}`}
            >
              <div className="space-y-6">
                
                {/* Profile Header Image/Role */}
                <div className="flex items-center gap-4">
                  <img
                    src={coach.image}
                    alt={coach.name}
                    className="h-16 w-16 rounded-2xl object-cover border-2 border-teal-500/10 shadow-sm shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="font-display text-base font-extrabold text-slate-900">{coach.name}</h3>
                    <p className="font-sans text-xs font-semibold text-teal-600 mt-0.5">{coach.role}</p>
                  </div>
                </div>

                {/* Bio text */}
                <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">{coach.bio}</p>

                {/* Specialties Tag Cloud */}
                <div className="space-y-2 pt-2 border-t border-slate-50">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <Award className="h-3.5 w-3.5 text-teal-500" /> Focus Specialties
                  </span>
                  <div className="flex flex-wrap gap-1.5" id={`coach-specs-${coach.id}`}>
                    {coach.specialties.map((spec, idx) => (
                      <span
                        key={idx}
                        className="rounded-lg bg-slate-50 border border-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-700"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Social or contact footer actions inside coach card */}
              <div className="pt-6 mt-6 border-t border-slate-50 flex items-center justify-between">
                <span className="font-mono text-[9px] font-bold uppercase text-slate-400 tracking-wider">
                  Crossing Certified
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert(`Connect with ${coach.name} directly via scheduling a custom session package.`)}
                    className="h-9 w-9 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition focus:outline-none"
                    title="Send secure email"
                  >
                    <Mail className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => alert(`LinkedIn integration requires login callback. Direct profile reference for ${coach.name} can be fetched via career consult.`)}
                    className="h-9 w-9 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition focus:outline-none"
                    title="LinkedIn Reference Profile"
                  >
                    <Linkedin className="h-4 w-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
