
document.addEventListener("DOMContentLoaded", () => {
  const storyTemplates = [
    `🌞 Today, I feel <select id="q0">${moods()}</select> because something <select id="q1">${events()}</select> happened. ⚡ My energy level is <select id="q2">${energy()}</select> and I'm feeling more <select id="q3">${feels()}</select> lately. 🧸 My best friend would say I'm <select id="q4">${friends()}</select>. 🎶 It feels like a <select id="q5">${genres()}</select> kind of day.`,
    `😂 Like a cartoon character, I'm <select id="q0">${moods()}</select> after a <select id="q1">${events()}</select> morning. 💥 Energy is <select id="q2">${energy()}</select>, vibes are <select id="q3">${feels()}</select>. My buddy calls me <select id="q4">${friends()}</select>. Guess it’s <select id="q5">${genres()}</select> o'clock! 🕺`,
    `🚀 In a galaxy not so far away, I’m <select id="q0">${moods()}</select>. After a(n) <select id="q1">${events()}</select> mission, 🛰 my power level is <select id="q2">${energy()}</select>. Mentally I feel <select id="q3">${feels()}</select>. Captain Mood says I’m <select id="q4">${friends()}</select>. Let’s vibe to <select id="q5">${genres()}</select>. 🌌`,
    `🎢 Today started <select id="q0">${moods()}</select> because of a <select id="q1">${events()}</select> twist. 🎯 Energy? <select id="q2">${energy()}</select>. I’m feeling <select id="q3">${feels()}</select>, and people call me <select id="q4">${friends()}</select>. What I need now is some <select id="q5">${genres()}</select>. 🎧`,
    `☕ Just spilled my coffee but still feeling <select id="q0">${moods()}</select>. A <select id="q1">${events()}</select> thing just happened. ⚡ Energy is <select id="q2">${energy()}</select> and I’m <select id="q3">${feels()}</select> AF. Friends say I’m <select id="q4">${friends()}</select>. Queue the <select id="q5">${genres()}</select> playlist! 🔥`
  ];

  const greeting = document.getElementById("greeting");
  const hour = new Date().getHours();
  greeting.textContent = hour < 12 ? "Good Morning!" : hour < 18 ? "Good Afternoon!" : "Good Evening!";

  const storyForm = document.getElementById("storyForm");
  const loader = document.getElementById("loader");
  const resultDiv = document.getElementById("result");
  const emojiDiv = document.getElementById("emoji");
  const quoteDiv = document.getElementById("quote");
  const songsDiv = document.getElementById("songs");
  const moodGif = document.getElementById("mood-gif");
  const memeVideo = document.getElementById("meme-video");
  const confetti = document.getElementById("confetti");
  const rain = document.getElementById("rain");
  const leaves = document.getElementById("leaves");

  const story = storyTemplates[Math.floor(Math.random() * storyTemplates.length)];
  storyForm.innerHTML = `<p>${story}</p><button type="submit">🎯 Detect Mood</button>`;

  storyForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const values = [];
    for (let i = 0; i < 6; i++) {
      const val = document.getElementById("q" + i).value;
      if (!val) return alert("Please fill all fields!");
      values.push(val);
    }

    loader.style.display = "block";
    resultDiv.textContent = "";
    emojiDiv.textContent = "";
    quoteDiv.textContent = "";
    songsDiv.innerHTML = "";
    songsDiv.style.display = "none";
    moodGif.style.display = "none";
    memeVideo.src = "";
    memeVideo.style.display = "none";
    confetti.style.display = "none";
    rain.style.display = "none";
    leaves.style.display = "none";

    try {
      const res = await fetch("https://moodtunes-gjkh.onrender.com/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversation: [
            { question: "Mood?", answer: values[0] },
            { question: "Event?", answer: values[1] },
            { question: "Energy?", answer: values[2] },
            { question: "Mental?", answer: values[3] },
            { question: "Friend?", answer: values[4] },
            { question: "Genre?", answer: values[5] }
          ]
        })
      });

      const data = await res.json();
      loader.style.display = "none";

      const mood = data.mood || "neutral";
      const confidence = (data.confidence * 100).toFixed(1);
      resultDiv.innerHTML = `Your mood is: <strong>${mood.toUpperCase()}</strong> (Confidence: ${confidence}%)`;

      const emojiMap = { happy: "😄", sad: "😢", neutral: "😐", romantic: "😍" };
      emojiDiv.textContent = emojiMap[mood] || "😐";

      const quoteMap = {
        happy: "Happiness is a direction, not a place.",
        sad: "Tears come from the heart and not from the brain.",
        neutral: "Balance is not something you find, it’s something you create.",
        romantic: "Love is not something you look for. Love is something you become."
      };
      quoteDiv.textContent = quoteMap[mood] || "";

      const songLinks = {
        happy: [
          { title: "Levitating – Dua Lipa", url: "https://www.youtube.com/watch?v=TUVcZfQe-Kw" },
          { title: "Blinding Lights – The Weeknd", url: "https://www.youtube.com/watch?v=4NRXx6U8ABQ" }
        ],
        sad: [
          { title: "Let Me Down Slowly – Alec Benjamin", url: "https://www.youtube.com/watch?v=50VNCymT-Cs" }
        ],
        neutral: [
          { title: "Circles – Post Malone", url: "https://www.youtube.com/watch?v=wXhTHyIgQ_U" }
        ],
        romantic: [
          { title: "Perfect – Ed Sheeran", url: "https://www.youtube.com/watch?v=2Vv-BfVoq4g" }
        ]
      };

      const gifs = {
        happy: "https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif",
        sad: "https://media.giphy.com/media/d2lcHJTG5Tscg/giphy.gif",
        neutral: "https://media.giphy.com/media/l0K4kWJirrp1JX8sY/giphy.gif",
        romantic: "https://media.giphy.com/media/J1ABRhlfvQNwIOBeCk/giphy.gif"
      };

      const memes = {
        happy: ["https://media.giphy.com/media/3o7abldj0b3rxrZUxW/giphy.mp4"],
        sad: ["https://media.giphy.com/media/13borq7Zo2kulO/giphy.mp4"],
        neutral: ["https://media.giphy.com/media/fAnEC88LccN7a/giphy.mp4"],
        romantic: ["https://media.giphy.com/media/1rNWzNOZ2cxqNYt8bJ/giphy.mp4"]
      };

      moodGif.src = gifs[mood];
      moodGif.style.display = "block";

      memeVideo.src = memes[mood][0];
      memeVideo.style.display = "block";

      if (mood === "happy") confetti.style.display = "block";
      else if (mood === "sad") rain.style.display = "block";
      else if (mood === "neutral") leaves.style.display = "block";

      const links = songLinks[mood].map(song => `<a href="${song.url}" target="_blank">${song.title}</a>`).join("");
      songsDiv.innerHTML = `<h3>🎵 Recommended Songs:</h3>${links}`;
      songsDiv.style.display = "block";

    } catch (err) {
      loader.style.display = "none";
      resultDiv.textContent = "⚠️ Error detecting mood. Please try again.";
      console.error("Error:", err);
    }
  });

  function moods() {
    return `<option disabled selected value="">Select</option>
      <option value="happy">Happy</option>
      <option value="sad">Sad</option>
      <option value="neutral">Neutral</option>
      <option value="romantic">Romantic</option>`;
  }
  function events() {
    return `<option disabled selected value="">Select</option>
      <option value="exciting">Exciting</option>
      <option value="stressful">Stressful</option>
      <option value="unexpected">Unexpected</option>
      <option value="romantic">Romantic</option>`;
  }
  function energy() {
    return `<option disabled selected value="">Select</option>
      <option value="high">High</option>
      <option value="low">Low</option>
      <option value="moderate">Moderate</option>`;
  }
  function feels() {
    return `<option disabled selected value="">Select</option>
      <option value="positive">Positive</option>
      <option value="reflective">Reflective</option>
      <option value="overwhelmed">Overwhelmed</option>`;
  }
  function friends() {
    return `<option disabled selected value="">Select</option>
      <option value="cheerful">Cheerful</option>
      <option value="moody">Moody</option>
      <option value="calm">Calm</option>`;
  }
  function genres() {
    return `<option disabled selected value="">Select</option>
      <option value="pop">Pop</option>
      <option value="lofi">Lofi</option>
      <option value="classical">Classical</option>
      <option value="romantic">Romantic</option>`;
  }
});
