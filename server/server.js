import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/predict", async (req, res) => {
  const prompt = `Classify the mood of this sentence into one of these: ["happy", "sad", "energetic", "chill", "romantic", "focus", "angry", "sleepy", "confident"]\nSentence: "${req.body.text}"\nMood:`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    }),
  });

  const data = await response.json();
  const mood = data.choices[0].message.content.trim().toLowerCase();
  res.json({ mood });
});

app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));
