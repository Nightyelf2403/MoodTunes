// 📁 server/server.js
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/predict", async (req, res) => {
  const conversation = req.body.conversation;

  const combinedText = conversation.map((c, i) =>
    `Q${i + 1}: ${c.question} A${i + 1}: ${c.answer} (time: ${c.time}s)`
  ).join("\n");

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: combinedText })
    });

    const data = await response.json();
    console.log("🔎 HuggingFace raw response:", data);

    let mood = "neutral";
    let confidence = 0.0;

    if (Array.isArray(data) && data[0]?.label) {
      const label = data[0].label.toLowerCase();
      confidence = data[0].score || 0.0;
      if (label === "positive") mood = "happy";
      else if (label === "negative") mood = "sad";
    }

    res.json({ mood, confidence, raw: data });
  } catch (err) {
    console.error("🔥 API error:", err);
    res.status(500).json({ error: "Mood analysis failed", details: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("MoodTunes backend is live! Use POST /api/predict.");
});

app.listen(10000, () => console.log("✅ Server running on port 10000"));
