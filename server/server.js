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

  const prompt = `Classify the mood of this sentence into one of these: [\"happy\", \"sad\", \"energetic\", \"chill\", \"romantic\", \"focus\", \"angry\", \"sleepy\", \"confident\"]\nSentence: \"${userText}\"\nMood:`;

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
    const mood = data.choices[0].message.content.trim().toLowerCase();
    res.json({ mood });
  } catch (error) {
    res.status(500).json({ error: "API Error", details: error.message });
  }
});

app.listen(10000, () => console.log("\u2705 Server running on port 10000"));
