import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("MoodTunes API is live 🎶");
});

app.post("/api/predict", async (req, res) => {
  const conversation = req.body.conversation;

  if (!conversation || !Array.isArray(conversation)) {
    return res.status(400).json({ error: "Invalid conversation data" });
  }

  const combinedText = conversation.map((c, i) =>
    `${i + 1}. ${c.question} ${c.answer}`
  ).join("\n");

  try {
    const hfRes = await fetch(
      "https://api-inference.huggingface.co/models/distilbert/distilbert-base-uncased-finetuned-sst-2-english",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: combinedText })
      }
    );

    if (!hfRes.ok) {
      const errorText = await hfRes.text();
      console.error("❌ Hugging Face API Error:", errorText);
      return res.status(500).json({ error: errorText });
    }

    const data = await hfRes.json();
    console.log("🔎 Hugging Face response:", data);

    let mood = "neutral";
    let confidence = 0.0;

    if (Array.isArray(data) && data[0]?.label) {
      const label = data[0].label.toLowerCase();
      confidence = data[0].score || 0.0;
      mood = label === "positive" ? "happy" : label === "negative" ? "sad" : "neutral";
    }

    res.json({ mood, confidence });
  } catch (err) {
    console.error("🔥 Unexpected error:", err);
    res.status(500).json({ error: "Request failed", details: err.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🎧 Server running on http://localhost:${PORT}`));
