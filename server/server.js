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
  const userText = req.body.text;

  const prompt = `You are a mood analysis assistant.
Given the user message (which may contain 2–4 sentences), infer the overall mood from this list:
[\"happy\", \"sad\", \"energetic\", \"chill\", \"romantic\", \"focus\", \"angry\", \"sleepy\", \"confident\"]

Base your answer on the tone, context, and emotional intent — not just keywords.
Return only a JSON object like this:
{\"mood\": \"happy\", \"confidence\": 0.92 }

Text: "${userText}"`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3
      })
    });

    const data = await response.json();
    const content = data.choices[0].message.content.trim();

    let mood = "unknown";
    let confidence = 0.0;
    try {
      const parsed = JSON.parse(content);
      mood = parsed.mood;
      confidence = parsed.confidence;
    } catch (e) {
      console.error("Failed to parse GPT response as JSON:", content);
    }

    res.json({ mood, confidence });
  } catch (error) {
    res.status(500).json({ error: "API Error", details: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("MoodTunes backend is live! Use POST /api/predict.");
});

app.listen(10000, () => console.log("\u2705 Server running on port 10000"));
