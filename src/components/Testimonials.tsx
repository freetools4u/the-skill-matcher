import { Star, Trophy, Quote, ArrowRight } from "lucide-react";
import { testimonials } from "../data";

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-white py-20 sm:py-28 border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16" id="testimonials-header">
          <span className="text-xs font-extrabold uppercase tracking-widest text-teal-600">
            Success Stories
          </span>
          <h2 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl md:text-5xl tracking-tight">
            Transitional Triumphs
          </h2>
          <p className="font-sans text-base sm:text-lg text-slate-600 leading-relaxed">
            Real candidates who broke through career stagnation, overcame critical resume gaps, and crossed every hurdle to land competitive offers.
          </p>
        </div>

        {/* Testimonials List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="testimonials-grid">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="flex flex-col justify-between rounded-3xl border border-slate-150 bg-slate-50/10 p-6 sm:p-8 shadow-xs hover:shadow-lg transition duration-300 relative"
              id={`testimonial-card-${test.id}`}
            >
              {/* Decorative Quote Icon */}
              <Quote className="absolute top-6 right-6 h-10 w-10 text-slate-100 -z-10" />

              <div className="space-y-6">
                {/* Visual Transition Tracker Banner */}
                <div className="bg-teal-50/55 border border-teal-100/50 rounded-2xl p-3.5 flex items-center justify-between gap-2" id={`test-transition-${test.id}`}>
                  <div>
                    <span className="block text-[8px] font-extrabold uppercase tracking-wider text-slate-400">Former Role</span>
                    <span className="block font-display text-xs font-bold text-slate-800 mt-0.5 leading-none">{test.formerRole}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-teal-600 shrink-0" />
                  <div className="text-right">
                    <span className="block text-[8px] font-extrabold uppercase tracking-wider text-teal-600">New Role</span>
                    <span className="block font-display text-xs font-bold text-slate-900 mt-0.5 leading-none">{test.newRole}</span>
                  </div>
                </div>

                {/* Rating stars */}
                <div className="flex gap-0.5 text-amber-500" id={`test-stars-${test.id}`}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="font-sans text-sm text-slate-700 italic leading-relaxed">
                  "{test.quote}"
                </blockquote>
              </div>

              {/* Author Info */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={test.avatar}
                    alt={test.name}
                    className="h-10 w-10 rounded-full object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-display text-xs font-bold text-slate-900">{test.name}</h4>
                    <p className="font-sans text-[10px] text-slate-400 font-semibold">Landed at {test.company}</p>
                  </div>
                </div>

                {/* Time to land badge */}
                <div className="bg-slate-900 text-teal-400 rounded-xl px-2.5 py-1 text-[9px] font-mono font-bold flex items-center gap-1">
                  <Trophy className="h-3 w-3 text-teal-400" /> {test.timeToLand}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
