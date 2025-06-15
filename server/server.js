import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();
const app = express();

app.use(cors({
  origin: "https://nightyelf2403.github.io",
  methods: ["POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("🎧 MoodTunes backend is running!");
});

app.post("/api/predict", async (req, res) => {
  const { conversation } = req.body;

  if (!conversation || !Array.isArray(conversation)) {
    return res.status(400).json({ error: "Invalid conversation format." });
  }

  const combinedText = conversation
    .map((item, index) => `${index + 1}. ${item.question} ${item.answer}`)
    .join(" ");

  console.log("🧠 Predicting mood for text:", combinedText);

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
      console.error("❌ HuggingFace API error:", errorText);
      return res.status(500).json({ error: "Hugging Face API error", details: errorText });
    }

    const result = await hfResponse.json();
    console.log("✅ HuggingFace result:", result);

    let mood = "neutral";
    let confidence = 0.0;

    if (Array.isArray(result) && Array.isArray(result[0])) {
      const topLabel = result[0][0];
      confidence = topLabel.score;
      const label = topLabel.label.toLowerCase();

      if (label === "positive") mood = "happy";
      else if (label === "negative") mood = "sad";
    }

    return res.json({ mood, confidence });
  } catch (error) {
    console.error("🔥 Unexpected server error:", error);
    return res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 MoodTunes backend running at http://localhost:${PORT}`);
});
