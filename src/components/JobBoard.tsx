import { useState } from "react";
import { Briefcase, MapPin, DollarSign, Calendar, ChevronDown, ChevronUp, AlertCircle, HelpCircle, ArrowUpRight, Search } from "lucide-react";
import { curatedJobs } from "../data";

export default function JobBoard() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedJobId, setExpandedJobId] = useState<string | null>("job-1");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Tech", "Design", "Marketing", "Operations"];

  const filteredJobs = curatedJobs.filter((job) => {
    const matchesCat = selectedCategory === "All" || job.category === selectedCategory;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    if (expandedJobId === id) {
      setExpandedJobId(null);
    } else {
      setExpandedJobId(id);
    }
  };

  return (
    <section id="jobs" className="bg-white py-20 sm:py-28 border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16" id="jobs-header">
          <span className="text-xs font-extrabold uppercase tracking-widest text-teal-600">
            Curated Listings
          </span>
          <h2 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl md:text-5xl tracking-tight">
            Curated Remote Job Board
          </h2>
          <p className="font-sans text-base sm:text-lg text-slate-600 leading-relaxed">
            Explore premium remote roles. Toggle each card to view competitive hurdles and how our services help you bypass automatic screens and excel.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-100" id="jobs-filter-controls">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5" id="jobs-cat-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4.5 py-2 rounded-xl font-display text-xs font-bold transition focus:outline-none ${
                  selectedCategory === cat
                    ? "bg-teal-600 text-white shadow-sm"
                    : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:max-w-xs" id="jobs-search-box">
            <Search className="absolute top-3 left-4 h-4.5 w-4.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title or company..."
              className="w-full rounded-xl border border-slate-200 pl-11 pr-4 py-2.5 text-xs font-sans focus:border-teal-500 focus:outline-none bg-white shadow-xs"
            />
          </div>
        </div>

        {/* Jobs Directory List */}
        <div className="space-y-4" id="jobs-list">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => {
              const isExpanded = expandedJobId === job.id;
              return (
                <div
                  key={job.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isExpanded 
                      ? "border-teal-500 bg-teal-50/5 shadow-md" 
                      : "border-slate-150 bg-white hover:border-slate-300 hover:shadow-sm"
                  }`}
                  id={`job-card-${job.id}`}
                >
                  {/* Job Primary Row */}
                  <div
                    onClick={() => toggleExpand(job.id)}
                    className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-md bg-slate-100 px-2.5 py-0.5 text-[9px] font-bold text-slate-600 uppercase tracking-wide">
                          {job.category}
                        </span>
                        <span className="font-sans text-[10px] text-slate-400 flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {job.posted}
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-slate-900 leading-tight">
                        {job.title} <span className="font-sans text-sm font-normal text-slate-500">at {job.company}</span>
                      </h3>
                      
                      {/* Meta Tags Grid */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-sans text-xs text-slate-600">
                        <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-slate-400" /> {job.location}</span>
                        <span className="flex items-center gap-1.5"><DollarSign className="h-3.5 w-3.5 text-slate-400" /> {job.salary}</span>
                        <span className="flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5 text-slate-400" /> {job.type}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 justify-between sm:justify-end border-t border-slate-100 sm:border-0 pt-3 sm:pt-0">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 rounded-xl bg-slate-50 border border-slate-200/60 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 transition focus:outline-none"
                      >
                        Hurdles Review 
                        {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                      </button>
                      
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert("Curated client-only job database referral. Register or consult with a coach to gain secure referral keys.");
                        }}
                        className="inline-flex items-center gap-1 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-bold text-white hover:bg-slate-800 shadow-sm transition focus:outline-none"
                      >
                        Apply <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Expansion panel: Hurdles & Solutions */}
                  {isExpanded && (
                    <div className="bg-slate-50/70 border-t border-slate-100 p-5 sm:p-6 space-y-4" id={`job-expanded-${job.id}`}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Hurdles box */}
                        <div className="space-y-3">
                          <h4 className="font-display text-xs font-extrabold uppercase tracking-widest text-rose-500 flex items-center gap-1.5">
                            <AlertCircle className="h-4.5 w-4.5" /> Competitive Hurdles
                          </h4>
                          <div className="space-y-2.5">
                            {job.hurdles.map((hurd, idx) => (
                              <p key={idx} className="font-sans text-xs text-slate-700 leading-relaxed bg-white border border-slate-100 rounded-xl p-3 shadow-xs">
                                {hurd}
                              </p>
                            ))}
                          </div>
                        </div>

                        {/* Solutions box */}
                        <div className="space-y-3">
                          <h4 className="font-display text-xs font-extrabold uppercase tracking-widest text-teal-600 flex items-center gap-1.5">
                            <HelpCircle className="h-4.5 w-4.5" /> Crossing Blueprint
                          </h4>
                          <div className="space-y-2.5">
                            {job.solutions.map((sol, idx) => (
                              <p key={idx} className="font-sans text-xs text-slate-700 leading-relaxed bg-white border border-slate-150 rounded-xl p-3 shadow-xs">
                                {sol}
                              </p>
                            ))}
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                </div>
              );
            })
          ) : (
            <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl bg-slate-50/30" id="jobs-no-results">
              <Briefcase className="h-10 w-10 text-slate-300 mx-auto mb-2" />
              <p className="font-sans text-sm font-semibold text-slate-500">No remote roles found matching "{searchQuery}"</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="font-sans text-xs font-bold text-teal-600 hover:text-teal-500 mt-1 focus:outline-none"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
