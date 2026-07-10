import { useState, FormEvent } from "react";
import { Check, Sparkles, AlertCircle, Calendar, User, Clock, ChevronRight, CheckCircle2, X } from "lucide-react";
import { ServicePackage } from "../types";
import { servicePackages, coaches } from "../data";

interface ServicesProps {
  onOpenConsultation: (preselectedPackageId?: string) => void;
  bookingModalOpen: boolean;
  onCloseBooking: () => void;
  preselectedPackageId: string;
}

export default function Services({ onOpenConsultation, bookingModalOpen, onCloseBooking, preselectedPackageId }: ServicesProps) {
  // Multi-step booking state
  const [step, setStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<string>(preselectedPackageId || "resume-rewrite");
  const [selectedCoach, setSelectedCoach] = useState<string>("first-available");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    targetRole: "",
    linkedin: "",
    notes: ""
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Sync state if preselectedPackageId changes
  useState(() => {
    if (preselectedPackageId) {
      setSelectedPackage(preselectedPackageId);
    }
  });

  const activePackageData = servicePackages.find(p => p.id === selectedPackage) || servicePackages[0];

  const handlePackageSelect = (pkgId: string) => {
    setSelectedPackage(pkgId);
    onOpenConsultation(pkgId);
    setStep(1);
    setBookingSuccess(false);
  };

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (!selectedDate || !selectedTime) {
        alert("Please select a date and time slot.");
        return;
      }
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmitBooking = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Name and email are required.");
      return;
    }
    // Simulate API call
    setBookingSuccess(true);
  };

  const dates = [
    { day: "Fri", num: "10", dateStr: "2026-07-10" },
    { day: "Sat", num: "11", dateStr: "2026-07-11" },
    { day: "Mon", num: "13", dateStr: "2026-07-13" },
    { day: "Tue", num: "14", dateStr: "2026-07-14" },
    { day: "Wed", num: "15", dateStr: "2026-07-15" }
  ];

  const timeSlots = [
    "09:00 AM EST",
    "11:00 AM EST",
    "01:30 PM EST",
    "03:30 PM EST",
    "05:00 PM EST"
  ];

  return (
    <section id="services" className="bg-slate-50/50 py-20 sm:py-28 border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16" id="services-header">
          <span className="text-xs font-extrabold uppercase tracking-widest text-teal-600">
            Coaching Packages
          </span>
          <h2 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl md:text-5xl tracking-tight">
            Our Service Offerings
          </h2>
          <p className="font-sans text-base sm:text-lg text-slate-600 leading-relaxed">
            Select one of our specialized career development options below. Each includes structured audits, real recruiters, and actionable milestones.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="packages-grid">
          {servicePackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative flex flex-col justify-between rounded-3xl bg-white p-8 border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${
                pkg.popular 
                  ? "border-teal-500 ring-2 ring-teal-500/15 md:scale-105 z-10" 
                  : "border-slate-100"
              }`}
              id={`package-card-${pkg.id}`}
            >
              {pkg.popular && (
                <span className="absolute -top-4 right-8 inline-flex items-center gap-1 rounded-full bg-teal-500 px-3.5 py-1 text-xs font-extrabold text-white shadow-sm">
                  <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                  Most Popular Package
                </span>
              )}

              <div className="space-y-5">
                {/* Meta details */}
                <div className="space-y-2">
                  <h3 className="font-display text-xl font-bold text-slate-900">{pkg.name}</h3>
                  <p className="font-sans text-xs text-slate-500 font-medium bg-slate-50 px-2.5 py-1 rounded-md inline-block">
                    {pkg.duration}
                  </p>
                </div>

                {/* Price tag */}
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-4xl font-extrabold text-slate-950">${pkg.price}</span>
                  {pkg.originalPrice && (
                    <span className="font-sans text-sm font-semibold text-slate-400 line-through">
                      ${pkg.originalPrice}
                    </span>
                  )}
                  <span className="font-sans text-xs font-bold text-slate-500 uppercase tracking-wide ml-1">USD</span>
                </div>

                <p className="font-sans text-sm text-slate-600 leading-relaxed">{pkg.description}</p>

                {/* Feature List */}
                <ul className="space-y-3 pt-2 border-t border-slate-50">
                  {pkg.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-tight">
                      <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600 border border-teal-100">
                        <Check className="h-3 w-3" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Call to Action */}
              <div className="pt-6 mt-6 border-t border-slate-50">
                <button
                  onClick={() => handlePackageSelect(pkg.id)}
                  className={`w-full rounded-2xl py-3.5 font-display text-sm font-bold shadow-sm hover:shadow-md transition cursor-pointer ${
                    pkg.popular
                      ? "bg-teal-600 text-white hover:bg-teal-500"
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
                  id={`pkg-btn-${pkg.id}`}
                >
                  Configure Package
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Dynamic Consultation Booking Modal */}
        {bookingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fade-in" id="booking-modal-backdrop">
            <div className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 bg-slate-50/50">
                <div>
                  <h3 className="font-display text-lg font-bold text-slate-900">Career Consultant Planner</h3>
                  <p className="font-sans text-xs text-slate-500 mt-0.5">Customize your session milestones and coach selections</p>
                </div>
                <button
                  onClick={onCloseBooking}
                  className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Progress Steps Indicators */}
              <div className="flex border-b border-slate-50 px-6 py-3 bg-white" id="modal-step-indicator">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="flex items-center flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${
                        step === num 
                          ? "bg-teal-600 text-white" 
                          : step > num 
                            ? "bg-teal-50 text-teal-600 border border-teal-200" 
                            : "bg-slate-100 text-slate-400"
                      }`}>
                        {step > num ? "✓" : num}
                      </span>
                      <span className={`text-[11px] font-semibold tracking-wide uppercase ${
                        step === num ? "text-slate-900" : "text-slate-400"
                      }`}>
                        {num === 1 ? "Services" : num === 2 ? "Schedule" : "Details"}
                      </span>
                    </div>
                    {num < 3 && <ChevronRight className="h-4 w-4 text-slate-200 mx-auto" />}
                  </div>
                ))}
              </div>

              {/* Scrollable Container */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {bookingSuccess ? (
                  <div className="text-center py-12 px-4 space-y-4" id="booking-success-view">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-teal-600 border border-teal-200 shadow-sm mx-auto">
                      <CheckCircle2 className="h-10 w-10 animate-bounce" />
                    </div>
                    <h4 className="font-display text-2xl font-extrabold text-slate-900">Transition Plan Activated!</h4>
                    <p className="font-sans text-slate-600 max-w-md mx-auto text-sm leading-relaxed">
                      We have scheduled your session. A customized agenda, preparation guidelines, and secure meeting credentials have been sent to <strong className="text-slate-950 font-semibold">{formData.email}</strong>.
                    </p>
                    
                    {/* Booking Details card */}
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left max-w-md mx-auto space-y-2">
                      <p className="font-sans text-xs text-slate-500 uppercase tracking-widest font-extrabold">Session Itinerary</p>
                      <p className="font-display text-sm font-bold text-slate-950">{activePackageData.name}</p>
                      <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-sans text-slate-700 border-t border-slate-200/60">
                        <p className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-teal-600" /> {selectedDate}</p>
                        <p className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-teal-600" /> {selectedTime}</p>
                        <p className="flex items-center gap-1.5 col-span-2"><User className="h-3.5 w-3.5 text-teal-600" /> Coach: {selectedCoach === "first-available" ? "First Available Recruiter" : coaches.find(c => c.id === selectedCoach)?.name}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onCloseBooking();
                        setStep(1);
                        setBookingSuccess(false);
                      }}
                      className="rounded-2xl bg-slate-900 px-6 py-3 font-display text-sm font-semibold text-white shadow hover:bg-slate-800 transition mt-4"
                    >
                      Return to Website
                    </button>
                  </div>
                ) : (
                  <>
                    {/* STEP 1: SERVICE & COACH SELECTION */}
                    {step === 1 && (
                      <div className="space-y-5" id="booking-step-1">
                        <div className="space-y-2">
                          <label className="font-display text-sm font-bold text-slate-800 block">1. Confirm Package Type</label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {servicePackages.map((pkg) => (
                              <button
                                key={pkg.id}
                                type="button"
                                onClick={() => setSelectedPackage(pkg.id)}
                                className={`flex items-center justify-between p-3.5 rounded-2xl border text-left transition ${
                                  selectedPackage === pkg.id 
                                    ? "border-teal-500 bg-teal-50/20 shadow-sm" 
                                    : "border-slate-150 bg-white hover:bg-slate-50"
                                }`}
                              >
                                <div>
                                  <span className="block font-display text-xs font-bold text-slate-900">{pkg.name}</span>
                                  <span className="block font-sans text-[10px] text-slate-500 mt-0.5">{pkg.duration}</span>
                                </div>
                                <span className="font-display text-sm font-extrabold text-slate-950">${pkg.price}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2 pt-2">
                          <label className="font-display text-sm font-bold text-slate-800 block">2. Match with an Expert Coach</label>
                          <div className="space-y-2">
                            <button
                              type="button"
                              onClick={() => setSelectedCoach("first-available")}
                              className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border text-left transition ${
                                selectedCoach === "first-available"
                                  ? "border-teal-500 bg-teal-50/20 shadow-sm"
                                  : "border-slate-150 bg-white hover:bg-slate-50"
                              }`}
                            >
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 font-semibold text-slate-700 text-xs">
                                Match
                              </div>
                              <div>
                                <span className="block font-display text-xs font-bold text-slate-900">First Available Recruiting Coach</span>
                                <span className="block font-sans text-[10px] text-slate-500 mt-0.5">We will match you with the coach whose industry specialties best align with your goals.</span>
                              </div>
                            </button>

                            {coaches.map((coach) => (
                              <button
                                key={coach.id}
                                type="button"
                                onClick={() => setSelectedCoach(coach.id)}
                                className={`w-full flex items-start gap-3 p-3.5 rounded-2xl border text-left transition ${
                                  selectedCoach === coach.id
                                    ? "border-teal-500 bg-teal-50/20 shadow-sm"
                                    : "border-slate-150 bg-white hover:bg-slate-50"
                                }`}
                              >
                                <img
                                  src={coach.image}
                                  alt={coach.name}
                                  className="h-10 w-10 shrink-0 rounded-xl object-cover"
                                  referrerPolicy="no-referrer"
                                />
                                <div>
                                  <span className="block font-display text-xs font-bold text-slate-900">{coach.name}</span>
                                  <span className="block font-sans text-[10px] text-teal-600 font-semibold">{coach.role}</span>
                                  <span className="block font-sans text-[10px] text-slate-500 mt-1 leading-normal">{coach.bio.slice(0, 100)}...</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 2: DATE & TIME */}
                    {step === 2 && (
                      <div className="space-y-6" id="booking-step-2">
                        <div className="space-y-3">
                          <label className="font-display text-sm font-bold text-slate-800 block">Select a Session Date</label>
                          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                            {dates.map((d) => (
                              <button
                                key={d.dateStr}
                                type="button"
                                onClick={() => setSelectedDate(d.dateStr)}
                                className={`flex-1 min-w-[70px] flex flex-col items-center py-3.5 px-2.5 rounded-2xl border text-center transition ${
                                  selectedDate === d.dateStr
                                    ? "border-teal-500 bg-teal-50/20 shadow-sm"
                                    : "border-slate-150 bg-white hover:bg-slate-50"
                                }`}
                              >
                                <span className="block font-sans text-[10px] uppercase tracking-wider text-slate-500 font-semibold">{d.day}</span>
                                <span className="block font-display text-lg font-extrabold text-slate-950 mt-1">{d.num}</span>
                                <span className="block font-sans text-[9px] text-slate-400 mt-1">July '26</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label className="font-display text-sm font-bold text-slate-800 block">Available Time Slots (Your Local Time)</label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {timeSlots.map((slot) => (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setSelectedTime(slot)}
                                className={`py-3.5 px-2 rounded-2xl border font-sans text-xs font-bold text-center transition ${
                                  selectedTime === slot
                                    ? "border-teal-500 bg-teal-50/20 shadow-sm text-teal-700"
                                    : "border-slate-150 bg-white hover:bg-slate-50 text-slate-700"
                                }`}
                              >
                                {slot}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 p-3.5 rounded-2xl border border-amber-100">
                          <AlertCircle className="h-4 w-4 shrink-0" />
                          <span>All times are customized based on the Eastern Standard Time (EST) schedule of our coaches.</span>
                        </div>
                      </div>
                    )}

                    {/* STEP 3: DETAILS */}
                    {step === 3 && (
                      <form onSubmit={handleSubmitBooking} className="space-y-4" id="booking-step-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="font-display text-xs font-bold text-slate-700 block">Your Full Name *</label>
                            <input
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="Sarah Jenkins"
                              className="w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm focus:border-teal-500 focus:outline-none bg-slate-50/50"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="font-display text-xs font-bold text-slate-700 block">Your Contact Email *</label>
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              placeholder="sarah@example.com"
                              className="w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm focus:border-teal-500 focus:outline-none bg-slate-50/50"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="font-display text-xs font-bold text-slate-700 block">Target Role / Sector</label>
                            <input
                              type="text"
                              value={formData.targetRole}
                              onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                              placeholder="Senior Product Designer"
                              className="w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm focus:border-teal-500 focus:outline-none bg-slate-50/50"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="font-display text-xs font-bold text-slate-700 block">LinkedIn Profile URL</label>
                            <input
                              type="url"
                              value={formData.linkedin}
                              onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                              placeholder="https://linkedin.com/in/username"
                              className="w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm focus:border-teal-500 focus:outline-none bg-slate-50/50"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="font-display text-xs font-bold text-slate-700 block">Specific Hurdles or Context (Optional)</label>
                          <textarea
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            placeholder="e.g. 2 year career break, transitioning from hospitality, struggle with technical portfolios, or need help mapping out a story."
                            rows={3}
                            className="w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm focus:border-teal-500 focus:outline-none bg-slate-50/50"
                          />
                        </div>

                        {/* Order Summary badge */}
                        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-2">
                          <p className="font-sans text-[10px] text-slate-400 uppercase tracking-widest font-extrabold">Final Package Configuration</p>
                          <div className="flex items-center justify-between">
                            <span className="font-display text-sm font-bold text-slate-900">{activePackageData.name}</span>
                            <span className="font-display text-base font-extrabold text-slate-950">${activePackageData.price}</span>
                          </div>
                        </div>
                      </form>
                    )}
                  </>
                )}

              </div>

              {/* Modal Footer (Hidden on Success) */}
              {!bookingSuccess && (
                <div className="flex items-center justify-between border-t border-slate-100 px-6 py-5 bg-slate-50/50">
                  <button
                    onClick={handlePrevStep}
                    disabled={step === 1}
                    className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                      step === 1 
                        ? "text-slate-300 cursor-not-allowed" 
                        : "text-slate-600 hover:bg-slate-150"
                    }`}
                  >
                    Back
                  </button>

                  <div className="flex gap-2">
                    <button
                      onClick={onCloseBooking}
                      className="rounded-xl px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-150 transition"
                    >
                      Cancel
                    </button>

                    {step < 3 ? (
                      <button
                        onClick={handleNextStep}
                        className="rounded-xl bg-teal-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-teal-500 transition"
                      >
                        Continue
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmitBooking}
                        className="rounded-xl bg-slate-950 px-6 py-2.5 font-display text-xs font-bold text-white shadow hover:bg-slate-800 transition cursor-pointer"
                      >
                        Activate Schedule
                      </button>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
