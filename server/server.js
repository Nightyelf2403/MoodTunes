// 📁 server/server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fetch from 'node-fetch';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/predict", async (req, res) => {
  const conversation = req.body.conversation;

  const formatted = conversation.map((c, i) => `Q${i + 1}: ${c.question}\nA${i + 1}: ${c.answer} (Response time: ${c.time}s)`).join("\n\n");

  const prompt = `You are a mood analysis assistant. A user answered 6 mood-related multiple-choice questions. Based on their selected answers and response times, predict their overall mood.

Only return a valid JSON object like: {\"mood\": \"happy\", \"confidence\": 0.91 }

Conversation:\n${formatted}`;

  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt,
        max_tokens: 150,
        temperature: 0.4
      })
    });

    const data = await response.json();
    const content = data.choices?.[0]?.text?.trim();
    console.log("🔎 GPT raw response:", content);

    let mood = "uncertain";
    let confidence = 0.0;

    try {
      if (!content) throw new Error("Empty GPT response");
      const parsed = JSON.parse(content);
      mood = parsed.mood || "unknown";
      confidence = parsed.confidence || 0.0;
    } catch (e) {
      console.warn("⚠️ JSON parse failed, trying fallback extraction");
      const moodMatch = content?.match(/mood\s*[:=\-]?\s*(\w+)/i);
      const confidenceMatch = content?.match(/confidence\s*[:=\-]?\s*(\d+(\.\d+)?)/i);
      if (moodMatch) mood = moodMatch[1].toLowerCase();
      if (confidenceMatch) confidence = parseFloat(confidenceMatch[1]);
    }

    res.json({ mood, confidence, raw: content });
  } catch (error) {
    console.error("🔥 OpenAI API error:", error);
    res.status(500).json({ error: "API Error", details: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("MoodTunes backend is live! Use POST /api/predict.");
});

app.listen(10000, () => console.log("✅ Server running on port 10000"));
