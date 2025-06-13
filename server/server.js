import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🎧 MoodTunes backend is running!");
});

app.post("/api/predict", async (req, res) => {
  const { conversation } = req.body;

  if (!conversation || !Array.isArray(conversation)) {
    return res.status(400).json({ error: "Invalid conversation format." });
  }

  // Convert the conversation to a string for sentiment analysis
  const combinedText = conversation
    .map((item, index) => `${index + 1}. ${item.question} ${item.answer}`)
    .join(" ");

  console.log("🧠 Requesting Hugging Face with:", combinedText);

  try {
    const hfResponse = await fetch(
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

    if (!hfResponse.ok) {
      const errorText = await hfResponse.text();
      console.error("❌ HF API error:", errorText);
      return res.status(500).json({ error: "Hugging Face API error", details: errorText });
    }

    const result = await hfResponse.json();
    console.log("✅ HF response:", result);

    let mood = "neutral";
    let confidence = 0.0;

    if (Array.isArray(result) && Array.isArray(result[0])) {
      const topLabel = result[0][0]; // top prediction
      confidence = topLabel.score;
      mood =
        topLabel.label.toLowerCase() === "positive"
          ? "happy"
          : topLabel.label.toLowerCase() === "negative"
          ? "sad"
          : "neutral";
    }

    return res.json({ mood, confidence });
  } catch (err) {
    console.error("🔥 Unexpected server error:", err);
    return res.status(500).json({ error: "Internal server error", details: err.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 MoodTunes backend live at http://localhost:${PORT}`);
});
