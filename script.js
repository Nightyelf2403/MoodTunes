document.addEventListener("DOMContentLoaded", () => {
  const storyTemplates = [
    `🌞 Today, I feel <select id="q0">${moods()}</select> because something <select id="q1">${events()}</select> happened. ⚡ My energy level is <select id="q2">${energy()}</select> and I'm feeling more <select id="q3">${feels()}</select> lately. 🧸 My best friend would say I'm <select id="q4">${friends()}</select>. 🎶 It feels like a <select id="q5">${genres()}</select> kind of day.`,

    `🌅 Woke up feeling <select id="q0">${moods()}</select>. A <select id="q1">${events()}</select> moment occurred. ☕ I’m <select id="q2">${energy()}</select> energy-wise and <select id="q3">${feels()}</select> in thoughts. 😅 I'd describe myself as <select id="q4">${friends()}</select>. This moment calls for <select id="q5">${genres()}</select> music.`,

    `😂 Like a cartoon character, I'm <select id="q0">${moods()}</select> after a <select id="q1">${events()}</select> morning. 💥 Energy is <select id="q2">${energy()}</select>, vibes are <select id="q3">${feels()}</select>. My buddy calls me <select id="q4">${friends()}</select>. Guess it’s <select id="q5">${genres()}</select> o'clock! 🕺`,

    `🚀 In a galaxy not so far away, I’m <select id="q0">${moods()}</select>. After a(n) <select id="q1">${events()}</select> mission, 🛰 my power level is <select id="q2">${energy()}</select>. Mentally I feel <select id="q3">${feels()}</select>. Captain Mood says I’m <select id="q4">${friends()}</select>. Let’s vibe to <select id="q5">${genres()}</select>. 🌌`,

    `🎢 Today started <select id="q0">${moods()}</select> because of a <select id="q1">${events()}</select> twist. 🎯 Energy? <select id="q2">${energy()}</select>. I’m feeling <select id="q3">${feels()}</select>, and people call me <select id="q4">${friends()}</select>. What I need now is some <select id="q5">${genres()}</select>. 🎧`,

    `☕ Just spilled my coffee but still feeling <select id="q0">${moods()}</select>. A <select id="q1">${events()}</select> thing just happened. ⚡ Energy is <select id="q2">${energy()}</select> and I’m <select id="q3">${feels()}</select> AF. Friends say I’m <select id="q4">${friends()}</select>. Queue the <select id="q5">${genres()}</select> playlist! 🔥`
  ];

  const storyForm = document.getElementById("storyForm");
  const loader = document.getElementById("loader");
  const resultDiv = document.getElementById("result");
  const emojiDiv = document.getElementById("emoji");
  const songsDiv = document.getElementById("songs");
  const moodGif = document.getElementById("mood-gif");
  const memeVideo = document.getElementById("meme-video");
  const moodAudio = document.getElementById("mood-audio");
  const confetti = document.getElementById("confetti");

  const randomStory = storyTemplates[Math.floor(Math.random() * storyTemplates.length)];
  storyForm.innerHTML = `
    <p>${randomStory}</p>
    <button type="submit">🎯 Detect Mood</button>
  `;

  storyForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const values = [];
    for (let i = 0; i < 6; i++) {
      const val = document.getElementById(`q${i}`).value;
      if (!val) return alert("Please select all options.");
      values.push(val);
    }

    loader.style.display = "block";
    resultDiv.textContent = "";
    emojiDiv.textContent = "";
    songsDiv.style.display = "none";
    moodGif.src = "";
    memeVideo.src = "";
    memeVideo.style.display = "none";
    moodAudio.pause();
    moodAudio.style.display = "none";
    confetti.style.display = "none";

    try {
      const res = await fetch("https://moodtunes-gjkh.onrender.com/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversation: [
            { question: "Mood?", answer: values[0] },
            { question: "Event?", answer: values[1] },
            { question: "Energy?", answer: values[2] },
            { question: "Mental state?", answer: values[3] },
            { question: "Friend description?", answer: values[4] },
            { question: "Genre?", answer: values[5] }
          ]
        })
      });

      const data = await res.json();
      loader.style.display = "none";

      const mood = data.mood || "neutral";
      const confidence = (data.confidence * 100).toFixed(2);

      document.body.className = mood;
      resultDiv.innerHTML = `Your mood is: <strong>${mood.toUpperCase()}</strong> (Confidence: ${confidence}%)`;
      emojiDiv.textContent = mood === "happy" ? "🐶" : mood === "sad" ? "😭" : "🌿";

      const songs = {
        happy: ["Levitating – Dua Lipa", "Blinding Lights – The Weeknd", "Peaches – Justin Bieber"],
        sad: ["Jealous – Labrinth", "Let Me Down Slowly – Alec Benjamin", "Lose You To Love Me – Selena Gomez"],
        neutral: ["Circles – Post Malone", "Memories – Maroon 5", "Watermelon Sugar – Harry Styles"]
      };

      const audios = {
        happy: "https://www.fesliyanstudios.com/play-mp3/6552",
        sad: "https://www.fesliyanstudios.com/play-mp3/6415",
        neutral: "https://www.fesliyanstudios.com/play-mp3/6724"
      };

      const gifs = {
        happy: "https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif",
        sad: "https://media.giphy.com/media/d2lcHJTG5Tscg/giphy.gif",
        neutral: "https://media.giphy.com/media/l0K4kWJirrp1JX8sY/giphy.gif"
      };

      const memes = {
        happy: ["https://media.giphy.com/media/26xBIygOcC3bAWgIE/giphy.mp4", "https://media.giphy.com/media/3o7abldj0b3rxrZUxW/giphy.mp4"],
        sad: ["https://media.giphy.com/media/xT9IgIc0lryrxvqVGM/giphy.mp4", "https://media.giphy.com/media/13borq7Zo2kulO/giphy.mp4"],
        neutral: ["https://media.giphy.com/media/fAnEC88LccN7a/giphy.mp4"]
      };

      const selectedMeme = memes[mood][Math.floor(Math.random() * memes[mood].length)];

      songsDiv.innerHTML = `<h3>🎵 Top Mood Picks:</h3><ul>${songs[mood].map(song => `<li>${song}</li>`).join("")}</ul>`;
      songsDiv.style.display = "block";

      moodGif.src = gifs[mood];
      document.querySelector(".animation").style.display = "block";

      memeVideo.src = selectedMeme;
      memeVideo.style.display = "block";

      moodAudio.src = audios[mood];
      moodAudio.style.display = "block";
      moodAudio.play();

      if (mood === "happy") {
        confetti.style.display = "block";
        confetti.classList.add("active");
      }

    } catch (err) {
      console.error("⚠️ Mood detection error:", err);
      loader.style.display = "none";
      resultDiv.textContent = "⚠️ Error detecting mood. Please try again.";
    }
  });

  function moods() {
    return `<option disabled selected value="">Select</option><option value="happy">Happy</option><option value="sad">Sad</option><option value="neutral">Neutral</option>`;
  }
  function events() {
    return `<option disabled selected value="">Select</option><option value="exciting">Exciting</option><option value="stressful">Stressful</option><option value="unexpected">Unexpected</option>`;
  }
  function energy() {
    return `<option disabled selected value="">Select</option><option value="high">High</option><option value="low">Low</option><option value="moderate">Moderate</option>`;
  }
  function feels() {
    return `<option disabled selected value="">Select</option><option value="positive">Positive</option><option value="reflective">Reflective</option><option value="overwhelmed">Overwhelmed</option>`;
  }
  function friends() {
    return `<option disabled selected value="">Select</option><option value="cheerful">Cheerful</option><option value="moody">Moody</option><option value="calm">Calm</option>`;
  }
  function genres() {
    return `<option disabled selected value="">Select</option><option value="pop">Pop</option><option value="lofi">Lofi</option><option value="classical">Classical</option>`;
  }
});
