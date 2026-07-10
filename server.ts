import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Setup Gemini client
  let ai: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }

  // API Route: Resume Analysis
  app.post("/api/analyze-resume", async (req, res) => {
    try {
      const { resumeText, targetJob } = req.body;
      if (!resumeText) {
        return res.status(400).json({ error: "Resume text is required" });
      }

      if (!ai) {
        return res.status(500).json({ 
          error: "Gemini API key is not configured in environment variables. Please configure it in the Secrets panel." 
        });
      }

      const prompt = `You are a world-class professional career coach and expert ATS (Applicant Tracking System) recruiter. 
Your job is to analyze the following resume and compare it against the target job (or provide general strategic advice if no target job is specified).

Evaluate the resume on the following key metrics:
1. Overall Quality & Impact (out of 100)
2. ATS Optimization (out of 100)
3. Action Verb Strength (out of 100)
4. Layout & Readability Advice
5. Specific critical hurdles to cross to land this or a similar role
6. Tailored line-by-line or bullet point recommendations for optimization (Rewrite at least 2-3 of their worst bullets into STAR-format, impact-driven achievements with metrics).

Provide your complete analysis in a structured JSON format. Return ONLY a valid JSON object matching this schema. Do not wrap the JSON in markdown formatting blocks. Just return raw JSON.

Schema:
{
  "score": number, // Overall quality score out of 100
  "atsScore": number, // ATS optimization score out of 100
  "verbScore": number, // Action verb strength score out of 100
  "summary": "string", // A high-level 2-3 sentence overview of their resume quality
  "strengths": ["string"], // Array of 3-4 strengths
  "weaknesses": ["string"], // Array of 3-4 key areas of improvement
  "hurdles": ["string"], // Array of specific hurdles they need to cross for this role
  "formattingTips": ["string"], // Array of layout or formatting improvements
  "bulletRewrites": [
    {
      "original": "string",
      "rewritten": "string",
      "explanation": "string"
    }
  ],
  "coachingAdvice": "string" // A supportive final piece of advice from a personal coach perspective
}

Resume Text:
"""
${resumeText}
"""

Target Job:
"""
${targetJob || "General Remote Career Search (e.g. Software Engineering, Marketing, Product Management, Design, or General)"}
"""`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      });

      const responseText = response.text || "{}";
      const parsedData = JSON.parse(responseText.trim());
      res.json(parsedData);
    } catch (error: any) {
      console.error("Error analyzing resume:", error);
      res.status(500).json({ error: error.message || "An error occurred during resume analysis." });
    }
  });

  // API Route: AI Career Coach Chat / Advice
  app.post("/api/career-coach", async (req, res) => {
    try {
      const { message } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      if (!ai) {
        return res.status(500).json({ 
          error: "Gemini API key is not configured. Please configure it in the Secrets panel." 
        });
      }

      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction: "You are 'ZenireCoach', a supportive, expert career consultant from Zenire AI (zenire.in). Your mission is to help job seekers overcome their specific career hurdles, such as resume gaps, career transitions, imposter syndrome, and interview anxiety. You give practical, actionable, highly positive advice. Keep responses clear, professional, and formatted in easy-to-read markdown. Avoid generic advice; give specific tactical steps."
        }
      });

      const response = await chat.sendMessage({ message });
      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Error in career coach:", error);
      res.status(500).json({ error: error.message || "An error occurred in the career coach chat." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
