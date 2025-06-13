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

  const messages = conversation.map((item, index) => {
    return `${index + 1}. Q: ${item.question} A: ${item.answer} (Time: ${item.time}s)`;
  }).join("\n");

  const prompt = `Based on this conversation, predict the person's mood as one of the following: happy, sad, neutral, anxious, or excited.\nRespond in JSON format: { "mood": "mood_type", "confidence": number between 0 and 1 }\n\n${messages}`;

  try {
    const hfRes = await fetch("https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: prompt })
    });

    const raw = await hfRes.json();
    console.log("🔎 HuggingFace raw response:", raw);

    if (raw.error) {
      return res.status(500).json({ error: raw.error });
    }

    const text = raw.generated_text || "";
    const jsonMatch = text.match(/\{.*\}/);
    const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

    if (parsed?.mood && parsed?.confidence !== undefined) {
      return res.json(parsed);
    }

    res.status(200).json({ mood: "uncertain", confidence: 0 });
  } catch (err) {
    console.error("❌ API Error:", err);
    res.status(500).json({ error: "API request failed" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🎧 Server running on http://localhost:${PORT}`));
