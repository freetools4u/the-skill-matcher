import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Sparkles, Loader2, RefreshCw, AlertCircle, HelpCircle, ArrowRight } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "coach";
  text: string;
  timestamp: string;
}

export default function CoachChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "coach",
      text: "Hello! I'm **HurdleCoach**, your personal career transition consultant from Crossing Hurdles.\n\nWhether you have a severe employment gap, are completely shifting sectors (like hospitality to IT), or want advice on negotiating your next salary package, I'm here to map out a clear crossing strategy.\n\nWhat career hurdle can we solve together today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const presets = [
    { label: "Explain employment gap", query: "What is the best way to explain a 1-year career gap due to health/parenting on my resume?" },
    { label: "Transition: Retail to Tech", query: "How do I re-frame my experience as a Retail Store Manager to pivot into a Remote Tech Customer Success role?" },
    { label: "Answer: 'Why should we hire you?'", query: "Give me a structured response template for 'Why should we hire you?' for a role I'm underqualified for." },
    { label: "Salary negotiation script", query: "Can you write me a polite, high-converting email template to negotiate a job offer's base salary up by 15%?" }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/career-coach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: textToSend })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to fetch advice");
      }

      const data = await res.json();

      const coachMsg: Message = {
        id: `coach-${Date.now()}`,
        sender: "coach",
        text: data.text || "I was unable to formulate a strategy for that query. Please try rephrasing.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, coachMsg]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred. Verify that your API keys are configured.");
    } finally {
      setLoading(false);
    }
  };

  const handlePresetClick = (query: string) => {
    handleSend(query);
  };

  const resetChat = () => {
    setMessages([
      {
        id: "welcome",
        sender: "coach",
        text: "Hello! I'm **HurdleCoach**, your personal career transition consultant from Crossing Hurdles.\n\nWhether you have a severe employment gap, are completely shifting sectors (like hospitality to IT), or want advice on negotiating your next salary package, I'm here to map out a clear crossing strategy.\n\nWhat career hurdle can we solve together today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setError(null);
  };

  return (
    <section id="coach-chat" className="bg-slate-50/50 py-20 sm:py-28 border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16" id="coach-header">
          <span className="text-xs font-extrabold uppercase tracking-widest text-teal-600">
            Interactive AI Consultant
          </span>
          <h2 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl md:text-5xl tracking-tight">
            Meet Your HurdleCoach
          </h2>
          <p className="font-sans text-base sm:text-lg text-slate-600 leading-relaxed">
            Chat with our customized, recruiter-informed AI consultant. Ask tactical questions regarding resumes, interviews, portfolio presentation, or salary negotiation.
          </p>
        </div>

        {/* Messenger Panel */}
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-150 bg-white shadow-xl overflow-hidden flex flex-col h-[600px]" id="coach-messenger-panel">
          
          {/* Messenger Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-sm font-display font-black text-sm">
                  HC
                </div>
                {/* Online Indicator pulsing dot */}
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 animate-ping" />
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
              </div>
              <div>
                <span className="block font-display text-sm font-extrabold text-slate-950">HurdleCoach</span>
                <span className="block font-sans text-[10px] text-teal-600 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> AI Consulting Agent • Active
                </span>
              </div>
            </div>

            <button
              onClick={resetChat}
              className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition"
              title="Reset conversation"
              id="reset-chat-btn"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>

          {/* Messages Stream Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/25" id="chat-stream">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-in fade-in duration-150`}
                id={`chat-bubble-${msg.id}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-4 shadow-sm text-sm ${
                    msg.sender === "user"
                      ? "bg-slate-900 text-white"
                      : "bg-white border border-slate-100 text-slate-800"
                  }`}
                >
                  <p className="font-sans whitespace-pre-wrap leading-relaxed">
                    {/* Render basic bold formatting manually to keep React light and avoid markdown library dependency */}
                    {msg.text.split("**").map((chunk, idx) => {
                      if (idx % 2 === 1) {
                        return <strong key={idx} className="font-bold text-teal-600">{chunk}</strong>;
                      }
                      return chunk;
                    })}
                  </p>
                  <span className={`block text-[9px] font-medium uppercase tracking-wider mt-2.5 text-right ${
                    msg.sender === "user" ? "text-slate-400" : "text-slate-400"
                  }`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start" id="chat-loading-bubble">
                <div className="max-w-[85%] rounded-2xl p-4 bg-white border border-slate-100 text-slate-500 flex items-center gap-2 text-xs">
                  <Loader2 className="h-4 w-4 animate-spin text-teal-600" />
                  <span>Coach is mapping out your career crossing strategy...</span>
                </div>
              </div>
            )}

            {error && (
              <div className="flex justify-center p-3 text-xs text-rose-700 bg-rose-50 border border-rose-100 rounded-2xl gap-2" id="chat-error-message">
                <AlertCircle className="h-4.5 w-4.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Presets & Helper Inputs */}
          <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
              <HelpCircle className="h-3 w-3" /> Quick Scenario Solvers
            </span>
            <div className="flex flex-wrap gap-1.5" id="chat-presets">
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handlePresetClick(p.query)}
                  className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[10px] font-bold text-slate-600 hover:border-teal-500 hover:text-teal-600 hover:bg-teal-50/20 transition cursor-pointer"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Chat text Form Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputText);
            }}
            className="flex items-center gap-2 px-6 py-4 border-t border-slate-100 bg-white"
            id="chat-input-form"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything (e.g. How do I transition from teaching?)"
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-xs focus:border-teal-500 focus:outline-none bg-slate-50/30"
              id="chat-input-text"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || loading}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm hover:bg-slate-800 transition focus:outline-none disabled:bg-slate-300 disabled:cursor-not-allowed"
              id="chat-send-btn"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}
