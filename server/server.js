// 📁 server/server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fetch from 'node-fetch';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// New route for conversation-based mood detection
app.post("/api/predict", async (req, res) => {
  const conversation = req.body.conversation;

  const formatted = conversation.map((c, i) => `Q${i + 1}: ${c.question}\nA${i + 1}: ${c.answer} (Response time: ${c.time}s)`).join("\n\n");

  const prompt = `You are a mood analysis assistant. A user answered a series of questions. Based on their responses and how quickly they answered, infer their current mood from the list:
[\"happy\", \"sad\", \"energetic\", \"chill\", \"romantic\", \"focus\", \"angry\", \"sleepy\", \"confident\"].

Return a JSON object like this: {\"mood\": \"happy\", \"confidence\": 0.92 }

Conversation:
${formatted}`;

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
        temperature: 0.4
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
      console.error("Failed to parse GPT response:", content);
    }

    res.json({ mood, confidence });
  } catch (error) {
    res.status(500).json({ error: "API Error", details: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("MoodTunes backend is live! Use POST /api/predict.");
});

app.listen(10000, () => console.log("✅ Server running on port 10000"));
