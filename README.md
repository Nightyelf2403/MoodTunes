# 🎧 MoodTunes — Feel the Vibe!

MoodTunes is an intelligent, mood-based music and meme recommendation web app. It analyzes your mood from a fun, story-like sentence and gives you:
- 🎵 Background music matching your vibe
- 🎭 Memes to laugh or cry with
- 💬 Uplifting quotes
- 🌧️ Visual effects (confetti/rain)
- 📱 Mobile-friendly UI with audio controls

---

## 🔥 Live Demo
👉 **[Launch MoodTunes](https://nightyelf2403.github.io/MoodTunes/)**

---

## 🖼️ Preview
![Preview](./assets/screenshot.png)

---

## 🧠 How It Works
1. **Fill in a playful story** — choose your mood, energy, etc.
2. **AI detects your mood** using a HuggingFace sentiment model.
3. You get:
   - 🎧 Genre-based BGM (autoplays)
   - 🎬 Meme video matching your mood
   - 📝 Motivational quote
   - 🎶 Top recommended YouTube tracks
   - 🌈 Visual background animations

---

## 📦 Project Structure
```bash
MoodTunes/
├── index.html       # Main page structure
├── style.css        # Styling and responsiveness
├── script.js        # Mood detection logic, music, effects
└── README.md        # Project details (this file)
```

---

## 🎵 Music Features
- Background music by genre:
  - **Pop**: `pop-ambience.mp3`
  - **Lofi**: `lofi-bg.mp3`
  - **Classical**: `classical-soft.mp3`

- Controls (shown only after detection):
  - 🔇 Mute / 🔈 Unmute
  - ⏸️ Pause / ▶️ Resume
  - 🔊 Volume Slider
  - 🎵 Now Playing indicator

---

## 🔗 Top Recommended Tracks
Based on your selected genre:

### 🌟 Pop
- [Blinding Lights](https://www.youtube.com/watch?v=fHI8X4OXluQ)
- [Levitating](https://www.youtube.com/watch?v=TUVcZfQe-Kw)

### ☁️ Lofi
- [Chillhop Essentials](https://www.youtube.com/watch?v=5qap5aO4i9A)
- [Lofi Hip Hop Radio](https://www.youtube.com/watch?v=jfKfPfyJRdk)

### 🎼 Classical
- [Beethoven – Für Elise](https://www.youtube.com/watch?v=_mVW8tgGY_w)
- [Mozart - Piano Sonata No. 16](https://www.youtube.com/watch?v=JcUh-ggBfzI)

---

## ⚠️ API Limitation (HuggingFace)
This app uses a free API model (`distilbert-base-uncased-finetuned-sst-2-english`) for sentiment analysis. You may encounter a 429 (rate limit) error.

### 🔑 Fix:
1. Get your token: https://huggingface.co/settings/tokens
2. Add `Authorization: Bearer YOUR_TOKEN` in backend headers

---

## 🛠️ Dev Setup
```bash
# Clone the repo
$ git clone https://github.com/your-username/MoodTunes.git
$ cd MoodTunes

# Just open index.html in your browser!
```

Optional: Host your own backend using Express + HuggingFace API Key.

---

## 🧩 To-Do / Ideas
- [ ] Dark Mode
- [ ] Add more genres (EDM, Jazz, etc.)
- [ ] Spotify Integration
- [ ] Offline fallback quotes/music

---

## 👨‍💻 Author
Built with 💖 by [Lalith Aditya Chunduri](https://github.com/nightyelf2403)

## 📜 License
MIT License

---

Enjoy the vibes. MoodTunes is here to tune into *you*! ✨🎧
