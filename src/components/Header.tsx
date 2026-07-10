import { useState } from "react";
import { Activity, Menu, X, PhoneCall, Sparkles } from "lucide-react";

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onOpenConsultation: () => void;
}

export default function Header({ activeSection, setActiveSection, onOpenConsultation }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "resume-scanner", label: "AI Resume Audit", highlight: true },
    { id: "coach-chat", label: "AI HurdleCoach" },
    { id: "jobs", label: "Remote Jobs" },
    { id: "coaches", label: "Our Coaches" }
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header id="app-header" className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <button 
          onClick={() => handleNavClick("home")} 
          className="flex items-center gap-2.5 text-left focus:outline-none"
          id="logo-button"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white shadow-sm transition hover:scale-105">
            <Activity className="h-5 w-5 rotate-45" />
          </div>
          <div>
            <span className="block font-display text-lg font-extrabold tracking-tight text-slate-900 leading-none">
              Crossing Hurdles
            </span>
            <span className="block font-sans text-[10px] uppercase tracking-widest text-teal-600 font-semibold mt-0.5">
              Career Optimization
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1" id="desktop-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`relative px-4 py-2 rounded-lg font-sans text-sm font-medium transition-all duration-200 focus:outline-none ${
                item.highlight 
                  ? "text-teal-700 bg-teal-50/70 hover:bg-teal-50 flex items-center gap-1.5 border border-teal-100" 
                  : activeSection === item.id
                    ? "text-teal-600 bg-slate-50"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50/50"
              }`}
              id={`nav-item-${item.id}`}
            >
              {item.highlight && <Sparkles className="h-3.5 w-3.5 text-teal-500 animate-pulse" />}
              {item.label}
              {activeSection === item.id && !item.highlight && (
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-teal-600 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenConsultation}
            className="hidden sm:flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 font-display text-xs font-semibold text-white shadow-md hover:bg-slate-800 hover:shadow-lg transition duration-200 cursor-pointer"
            id="book-consultation-btn"
          >
            <PhoneCall className="h-3.5 w-3.5" />
            Book Free Audit
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 md:hidden hover:bg-slate-50 focus:outline-none"
            id="mobile-menu-toggle"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-100 bg-white px-4 py-4 space-y-2 animate-in slide-in-from-top-4 duration-200" id="mobile-menu-container">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl text-left font-sans text-sm font-medium transition ${
                item.highlight
                  ? "bg-teal-50 text-teal-700 border border-teal-100"
                  : activeSection === item.id
                    ? "bg-slate-50 text-teal-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
              id={`mobile-nav-item-${item.id}`}
            >
              {item.highlight && <Sparkles className="h-4 w-4 text-teal-500" />}
              {item.label}
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 font-display text-sm font-semibold text-white shadow-md hover:bg-slate-800 transition"
              id="mobile-book-consultation-btn"
            >
              <PhoneCall className="h-4 w-4" />
              Book Free Audit
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
