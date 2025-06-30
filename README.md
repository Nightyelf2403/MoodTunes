# 🎧 MoodTunes — Feel the Vibe!

MoodTunes is an intelligent, mood-detection-based music and meme recommendation web app. It analyzes your current mood using a short story-based form and plays background music to match your vibe, while also showing memes, quotes, and trending track recommendations!

## 🚀 Live Demo
**👉 Try it now:** [nightyelf2403.github.io/MoodTunes](https://nightyelf2403.github.io/MoodTunes)

---


---

## 📦 Features

- ✅ Mood prediction from a short interactive story
- ✅ Auto-changing background based on mood
- ✅ Background music (BGM) that matches the detected genre
- ✅ Meme video based on mood
- ✅ Inspirational quote based on emotion
- ✅ Volume, mute, pause/resume controls
- ✅ Dynamic track recommendations
- ✅ Falling confetti/rain effects
- ✅ Fully mobile-responsive design

---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **AI API:** HuggingFace Transformers (BERT Sentiment Analysis)
- **Deployment:** GitHub Pages

---

## 📁 Project Structure

MoodTunes/
│
├── index.html # Main HTML file
├── style.css # All UI styling and responsive design
├── script.js # Core logic: mood detection, audio, API, UI updates
├── README.md # You're here!
└── assets/ # (Optional) media files like icons, screenshots

markdown
Copy
Edit

---

## ✨ How It Works

1. **Interactive Story Form**  
   Users fill in a sentence like:  
   `"Today I feel [Happy] because something [Exciting] happened..."`

2. **Mood Prediction**  
   On clicking "Detect Mood", the filled values are sent to a backend API powered by a BERT sentiment model hosted on HuggingFace.

3. **Matching Actions:**
   - Mood-based quote & emoji
   - Genre-specific BGM plays automatically
   - Meme matching your mood
   - Music links for top YouTube tracks in that genre
   - Rain/confetti visual effects
   - Volume/mute/pause controls shown only after detection

---

## 🔊 Audio Options

BGM automatically plays from these links:
- **Pop:** [pop-ambience.mp3](https://dl.sndup.net/q6p7/pop-ambience.mp3)
- **Lofi:** [lofi-bg.mp3](https://dl.sndup.net/t5mk/lofi-bg.mp3)
- **Classical:** [classical-soft.mp3](https://dl.sndup.net/8xdp/classical-soft.mp3)

Tracks are looped and controlled via:
- Mute / Unmute
- Pause / Resume
- Volume Slider

---

## 💡 Recommended Tracks

Top music tracks for each genre:

### Pop
- [Blinding Lights](https://www.youtube.com/watch?v=fHI8X4OXluQ)
- [Levitating](https://www.youtube.com/watch?v=TUVcZfQe-Kw)

### Lofi
- [Chillhop Essentials](https://www.youtube.com/watch?v=5qap5aO4i9A)
- [Lofi Hip Hop Radio](https://www.youtube.com/watch?v=jfKfPfyJRdk)

### Classical
- [Beethoven – Für Elise](https://www.youtube.com/watch?v=_mVW8tgGY_w)
- [Mozart - Piano Sonata No. 16](https://www.youtube.com/watch?v=JcUh-ggBfzI)

---

## ⚠️ API Limitations

The app uses HuggingFace's free sentiment model (`distilbert-base-uncased-finetuned-sst-2-english`). Due to **rate limits**, you may occasionally hit a 429 error.

### To fix:
- Get a free API key from [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
- Add it to your backend in the `Authorization` header

---

## 🧪 Local Development

```bash
# Clone the repo
git clone https://github.com/your-username/MoodTunes.git
cd MoodTunes

# Open index.html in a browser
open index.html  # or just drag into Chrome
To use a local backend:

Create a simple Express.js server

Add your HuggingFace API key

Enable CORS

Deploy using Render or Railway

📝 To-Do / Future Ideas
 Add dark mode toggle

 Offline fallback mood rules

 More genres (EDM, Rock, Jazz)

 User profile & history

 Spotify integration

📄 License
MIT License © 2025 Lalith Aditya Chunduri

❤️ Credits
Background Music: SndUp.net

AI Model: HuggingFace Transformers

Memes: Giphy

UI Design & Logic: Lalith Aditya

Happy Mood Detecting! 🎧✨
