import { useState, FormEvent } from "react";
import { Sparkles, Loader2, AlertCircle, CheckCircle2, RefreshCw, FileText, Briefcase, Award, TrendingUp, Check, X } from "lucide-react";
import { ResumeAnalysisResult } from "../types";

export default function ResumeScanner() {
  const [resumeText, setResumeText] = useState("");
  const [targetJob, setTargetJob] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResumeAnalysisResult | null>(null);

  const handleScan = async (e: FormEvent) => {
    e.preventDefault();
    if (!resumeText.trim()) {
      setError("Please paste your resume text to begin analysis.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/analyze-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText,
          targetJob
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to analyze resume");
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred. Make sure your developer secrets are configured.");
    } finally {
      setLoading(false);
    }
  };

  const loadExample = () => {
    setResumeText(`DAVID KOVACS
david.kovacs@email.com | 555-019-2831 | Austin, TX

SUMMARY
Experienced Retail Store Manager looking to pivot into a corporate Tech role. Managed operations, inventory, and a small team in high-volume stores. Good at customer service and sales.

EXPERIENCE
Store Manager | Apex Apparel | 2021 - Present
- Ran daily store operations and managed a team of 8 sales associates.
- Helped customers find clothes and handled checkout counters.
- Kept track of store inventory and restocked shelves weekly.
- Handled store schedule and resolved staff conflicts.
- Increased sales compared to last year.

Assistant Manager | Shoe World | 2018 - 2021
- Opened and closed store, counted cash drawers, and made bank deposits.
- Answered phones and resolved customer complaints.
- Trained new sales hires.
- Placed monthly inventory orders.`);
    
    setTargetJob("Customer Success Manager / Remote Tech Pivot");
  };

  return (
    <section id="resume-scanner" className="bg-white py-20 sm:py-28 border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16" id="scanner-header">
          <span className="text-xs font-extrabold uppercase tracking-widest text-teal-600">
            Interactive AI Tool
          </span>
          <h2 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl md:text-5xl tracking-tight">
            AI-Powered Resume Audit
          </h2>
          <p className="font-sans text-base sm:text-lg text-slate-600 leading-relaxed">
            Paste your resume text below and optionally input a target role. Our server-side Gemini algorithm will analyze your ATS compatibility and rewrite weak bullets in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12" id="scanner-grid">
          
          {/* Inputs Section */}
          <div className="lg:col-span-5 space-y-6" id="scanner-inputs">
            <div className="rounded-3xl border border-slate-100 bg-slate-50/50 p-6 sm:p-8 shadow-sm space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="font-display text-base font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-teal-600" />
                  Audit Workspace
                </h3>
                <button
                  type="button"
                  onClick={loadExample}
                  className="font-sans text-xs font-semibold text-teal-600 hover:text-teal-500 transition focus:outline-none"
                  id="example-load-btn"
                >
                  Load Example Pivot Resume
                </button>
              </div>

              <form onSubmit={handleScan} className="space-y-4">
                {/* Resume Text Input */}
                <div className="space-y-1">
                  <label className="font-display text-xs font-bold text-slate-700 block">
                    Paste Resume Text *
                  </label>
                  <textarea
                    required
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="Paste the full text of your current resume here..."
                    rows={12}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-xs font-mono focus:border-teal-500 focus:outline-none bg-white shadow-xs resize-y"
                    id="resume-text-input"
                  />
                </div>

                {/* Target Role Input */}
                <div className="space-y-1">
                  <label className="font-display text-xs font-bold text-slate-700 block">
                    Target Job Title / Sector (Optional)
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute top-3.5 left-4 h-4.5 w-4.5 text-slate-400" />
                    <input
                      type="text"
                      value={targetJob}
                      onChange={(e) => setTargetJob(e.target.value)}
                      placeholder="e.g. Customer Success Manager, Product Designer..."
                      className="w-full rounded-2xl border border-slate-200 pl-11 pr-4 py-3.5 text-xs font-sans focus:border-teal-500 focus:outline-none bg-white shadow-xs"
                      id="target-job-input"
                    />
                  </div>
                </div>

                {error && (
                  <div className="flex items-start gap-2 text-xs text-rose-700 bg-rose-50 border border-rose-100 p-3.5 rounded-2xl" id="scanner-error">
                    <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
                    <span className="leading-tight">{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-teal-600 py-4 font-display text-sm font-extrabold text-white shadow-md hover:bg-teal-500 hover:shadow-lg transition cursor-pointer disabled:bg-slate-400 disabled:cursor-not-allowed"
                  id="scanner-submit-btn"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4.5 w-4.5 animate-spin" />
                      Analyzing and Rewriting Bullets...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4.5 w-4.5 animate-pulse" />
                      Run Real-Time AI Review
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>

          {/* Results/Report Section */}
          <div className="lg:col-span-7" id="scanner-reports">
            {!result && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 rounded-3xl border border-dashed border-slate-200 bg-slate-50/20 min-h-[350px]">
                <Award className="h-12 w-12 text-slate-300 mb-4" />
                <h4 className="font-display text-lg font-bold text-slate-800">No Report Generated Yet</h4>
                <p className="font-sans text-xs text-slate-500 max-w-sm mt-1.5 leading-relaxed">
                  Enter your resume details on the left and start our Transition Engine to view scores, ATS hurdles, and complete bullet rewrites.
                </p>
              </div>
            )}

            {loading && (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 rounded-3xl border border-slate-100 bg-white shadow-md min-h-[450px]">
                <Loader2 className="h-10 w-10 text-teal-600 animate-spin mb-4" />
                <h4 className="font-display text-lg font-bold text-slate-900">Transition Engine Active</h4>
                <p className="font-sans text-xs text-slate-500 max-w-sm mt-1.5 leading-relaxed">
                  Our professional recruiter AI is evaluating keywords, matching experience against your target role, and generating impact-driven achievements...
                </p>
              </div>
            )}

            {result && !loading && (
              <div className="rounded-3xl border border-slate-150 bg-white p-6 sm:p-8 shadow-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300" id="scanner-report-panel">
                
                {/* Report Header & Overall Score */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100" id="report-header">
                  <div className="text-center sm:text-left space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-teal-600">Crossing Hurdles Report</span>
                    <h3 className="font-display text-xl font-extrabold text-slate-950">AI Career Scorecard</h3>
                    <p className="font-sans text-xs text-slate-500">Compare results against modern recruitment benchmarks</p>
                  </div>

                  {/* Circular Score display */}
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-teal-50 border border-teal-100 shadow-xs" id="overall-score-display">
                    <div className="text-center">
                      <span className="block font-display text-3xl font-extrabold text-teal-700 leading-none">{result.score}</span>
                      <span className="block text-[8px] font-bold uppercase tracking-wider text-teal-500 mt-1">Quality Score</span>
                    </div>
                  </div>
                </div>

                {/* Sub Scores Progress */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="report-subscores">
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-xs font-bold text-slate-800">ATS Formatting & Keywords</span>
                      <span className="font-display text-xs font-bold text-slate-900">{result.atsScore}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-600 rounded-full" style={{ width: `${result.atsScore}%` }} />
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-xs font-bold text-slate-800">Action Verb Strength</span>
                      <span className="font-display text-xs font-bold text-slate-900">{result.verbScore}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-600 rounded-full" style={{ width: `${result.verbScore}%` }} />
                    </div>
                  </div>
                </div>

                {/* High-Level Coach Summary */}
                <div className="space-y-2" id="report-summary">
                  <h4 className="font-display text-xs font-extrabold uppercase tracking-widest text-slate-500">Coach's Summary Evaluation</h4>
                  <p className="font-sans text-sm text-slate-700 leading-relaxed bg-teal-50/30 border border-teal-100/30 rounded-2xl p-4">
                    "{result.summary}"
                  </p>
                </div>

                {/* Strengths & Weaknesses (Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" id="report-strengths-weaknesses">
                  <div className="space-y-3">
                    <h4 className="font-display text-xs font-extrabold uppercase tracking-widest text-slate-500">Key Strengths Found</h4>
                    <ul className="space-y-2">
                      {result.strengths.map((str, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <Check className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-display text-xs font-extrabold uppercase tracking-widest text-slate-500">Strategic Gaps</h4>
                    <ul className="space-y-2">
                      {result.weaknesses.map((weak, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <X className="h-4 w-4 shrink-0 text-rose-500 mt-0.5" />
                          <span>{weak}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Specific Transition Hurdles */}
                {result.hurdles && result.hurdles.length > 0 && (
                  <div className="space-y-3 pt-4 border-t border-slate-100" id="report-hurdles">
                    <h4 className="font-display text-xs font-extrabold uppercase tracking-widest text-rose-500">Critical Hurdles to Cross</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {result.hurdles.map((h, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-800 bg-rose-50/50 border border-rose-100/30 p-3 rounded-xl">
                          <AlertCircle className="h-4.5 w-4.5 shrink-0 text-rose-500" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bullet Rewrites */}
                {result.bulletRewrites && result.bulletRewrites.length > 0 && (
                  <div className="space-y-4 pt-4 border-t border-slate-100" id="report-rewrites">
                    <h4 className="font-display text-xs font-extrabold uppercase tracking-widest text-teal-600">Impact-Driven STAR Rewrites</h4>
                    <p className="font-sans text-xs text-slate-500">See how weak, task-based bullet points are transformed into rich commercial achievements:</p>
                    
                    <div className="space-y-4">
                      {result.bulletRewrites.map((item, idx) => (
                        <div key={idx} className="border border-slate-100 rounded-2xl bg-slate-50/30 p-4 space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-rose-500 bg-rose-50 px-2 py-0.5 rounded">Original (Task-focused)</span>
                              <p className="font-sans text-xs text-slate-500 line-through italic leading-relaxed">{item.original}</p>
                            </div>
                            <div className="space-y-1">
                              <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-2 py-0.5 rounded">Optimized (Metric-STAR)</span>
                              <p className="font-display text-xs font-bold text-slate-900 leading-relaxed">{item.rewritten}</p>
                            </div>
                          </div>
                          <div className="pt-2 border-t border-slate-200/50 text-[11px] font-sans text-slate-600 leading-normal">
                            <strong className="text-slate-800 font-semibold">Coach Insight:</strong> {item.explanation}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Formatting Tips */}
                {result.formattingTips && result.formattingTips.length > 0 && (
                  <div className="space-y-3 pt-4 border-t border-slate-100" id="report-formatting">
                    <h4 className="font-display text-xs font-extrabold uppercase tracking-widest text-slate-500">Layout & Formatting Recommendations</h4>
                    <ul className="space-y-2">
                      {result.formattingTips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <TrendingUp className="h-4 w-4 shrink-0 text-teal-600 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Coaching Encouragement */}
                <div className="bg-slate-950 text-white rounded-2xl p-5 space-y-2 border border-slate-850" id="report-coach-advice">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-teal-400">Coach's Parting Guidance</span>
                  <p className="font-sans text-xs leading-relaxed text-slate-300">
                    "{result.coachingAdvice}"
                  </p>
                </div>

                {/* Reset button */}
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => {
                      setResult(null);
                      setResumeText("");
                      setTargetJob("");
                    }}
                    className="flex items-center gap-1.5 font-display text-xs font-bold text-slate-600 hover:text-slate-900 transition focus:outline-none"
                    id="scanner-reset-btn"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    Reset & Audit Another Resume
                  </button>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
