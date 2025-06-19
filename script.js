
document.addEventListener("DOMContentLoaded", () => {
  const audio = new Audio();
  audio.loop = true;
  audio.volume = 0.6;

  const volumeSlider = document.getElementById("volumeSlider");
  const muteBtn = document.getElementById("muteBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const nowPlaying = document.getElementById("nowPlaying");
  const audioControls = document.getElementById("audio-controls");
  audioControls.style.display = "none";

  let isMuted = false;
  let isPaused = false;

  muteBtn.onclick = () => {
    isMuted = !isMuted;
    audio.muted = isMuted;
    muteBtn.textContent = isMuted ? "🔈 Unmute" : "🔇 Mute";
  };

  pauseBtn.onclick = () => {
    isPaused = !isPaused;
    if (isPaused) {
      audio.pause();
      pauseBtn.textContent = "▶️ Resume";
    } else {
      audio.play();
      pauseBtn.textContent = "⏸️ Pause";
    }
  };

  volumeSlider.oninput = () => {
    audio.volume = volumeSlider.value;
  };

  const genreAudios = {
    pop: "https://dl.sndup.net/q6p7/pop-ambience.mp3",
    lofi: "https://dl.sndup.net/t5mk/lofi-bg.mp3",
    classical: "https://dl.sndup.net/8xdp/classical-soft.mp3"
  };

  const recommendedTracks = {
    pop: [
      { title: "Taylor Swift - Cruel Summer", url: "https://www.youtube.com/watch?v=ic8j13piAhQ" },
      { title: "Dua Lipa - Houdini", url: "https://www.youtube.com/watch?v=8V1a5MJWQ5o" }
    ],
    lofi: [
      { title: "lofi hip hop radio - beats to relax/study to", url: "https://www.youtube.com/watch?v=jfKfPfyJRdk" },
      { title: "chillhop - jazzy beats", url: "https://www.youtube.com/watch?v=5yx6BWlEVcY" }
    ],
    classical: [
      { title: "Beethoven – Für Elise", url: "https://www.youtube.com/watch?v=_mVW8tgGY_w" },
      { title: "Mozart - Piano Sonata No. 16", url: "https://www.youtube.com/watch?v=XEczDRZs0xY" }
    ]
  };

  const storyForm = document.getElementById("storyForm");
  const loader = document.getElementById("loader");
  const resultDiv = document.getElementById("result");
  const emojiDiv = document.getElementById("emoji");
  const quoteDiv = document.getElementById("quote");
  const songsDiv = document.getElementById("songs");
  const memeVideo = document.getElementById("meme-video");
  const animationDiv = document.getElementById("mood-effect");

  const heading = document.createElement("h1");
  heading.textContent = "🎧 Welcome to MoodTunes!";
  heading.style.margin = "20px auto";
  heading.style.color = "#0077cc";
  heading.style.textAlign = "center";
  heading.style.fontSize = "2rem";
  heading.style.animation = "slideDownFade 1s ease-out";
  document.body.insertBefore(heading, document.body.firstChild);

  const storyTemplates = [
    `🌞 Today, I feel <select id="q0">${moods()}</select> because something <select id="q1">${events()}</select> happened. ⚡ My energy level is <select id="q2">${energy()}</select> and I'm feeling more <select id="q3">${feels()}</select> lately. 🧸 My best friend would say I'm <select id="q4">${friends()}</select>. 🎶 It feels like a <select id="q5">${genres()}</select> kind of day.`,
    `🌅 Woke up feeling <select id="q0">${moods()}</select>. A <select id="q1">${events()}</select> moment occurred. ☕ I’m <select id="q2">${energy()}</select> energy-wise and <select id="q3">${feels()}</select> in thoughts. 😅 I'd describe myself as <select id="q4">${friends()}</select>. This moment calls for <select id="q5">${genres()}</select> music.`,
    `😂 Like a cartoon character, I'm <select id="q0">${moods()}</select> after a <select id="q1">${events()}</select> morning. 💥 Energy is <select id="q2">${energy()}</select>, vibes are <select id="q3">${feels()}</select>. My buddy calls me <select id="q4">${friends()}</select>. Guess it’s <select id="q5">${genres()}</select> o'clock! 🕺`,
    `🚀 In a galaxy not so far away, I’m <select id="q0">${moods()}</select>. After a(n) <select id="q1">${events()}</select> mission, 🛰 my power level is <select id="q2">${energy()}</select>. Mentally I feel <select id="q3">${feels()}</select>. Captain Mood says I’m <select id="q4">${friends()}</select>. Let’s vibe to <select id="q5">${genres()}</select>. 🌌`,
    `🎢 Today started <select id="q0">${moods()}</select> because of a <select id="q1">${events()}</select> twist. 🎯 Energy? <select id="q2">${energy()}</select>. I’m feeling <select id="q3">${feels()}</select>, and people call me <select id="q4">${friends()}</select>. What I need now is some <select id="q5">${genres()}</select>. 🎧`,
    `☕ Just spilled my coffee but still feeling <select id="q0">${moods()}</select>. A <select id="q1">${events()}</select> thing just happened. ⚡ Energy is <select id="q2">${energy()}</select> and I’m <select id="q3">${feels()}</select> AF. Friends say I’m <select id="q4">${friends()}</select>. Queue the <select id="q5">${genres()}</select> playlist! 🔥`,
    `🌈 Somehow I feel <select id="q0">${moods()}</select> today. Maybe it’s because of something <select id="q1">${events()}</select>. My energy is <select id="q2">${energy()}</select>, and emotionally I feel <select id="q3">${feels()}</select>. They always say I’m <select id="q4">${friends()}</select>. Definitely a <select id="q5">${genres()}</select> mood! 🎼`,
    `🎭 Drama alert! I'm feeling <select id="q0">${moods()}</select> after this <select id="q1">${events()}</select> situation. ⚡ Energy: <select id="q2">${energy()}</select>. Mental state? <select id="q3">${feels()}</select>. Nicknamed <select id="q4">${friends()}</select>. Cue the <select id="q5">${genres()}</select> vibes! 🎬`
  ];

  const story = storyTemplates[Math.floor(Math.random() * storyTemplates.length)];
  storyForm.innerHTML = `
    <div class="story-large">
      <p class="story-text">${story}</p>
      <button type="submit">🎯 Detect Mood</button>
    </div>
  `;

  storyForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const values = [];
    for (let i = 0; i < 6; i++) {
      const val = document.getElementById(`q${i}`).value;
      if (!val) return alert("Please fill all fields!");
      values.push(val);
    }

    loader.style.display = "block";
    resultDiv.textContent = "";
    emojiDiv.textContent = "";
    quoteDiv.textContent = "";
    songsDiv.innerHTML = "";
    memeVideo.src = "";
    memeVideo.style.display = "none";
    animationDiv.className = "";
    animationDiv.innerHTML = "";

    try {
      const res = await fetch("https://moodtunes-gjkh.onrender.com/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversation: values.map((v, i) => ({ question: `Q${i}`, answer: v }))
        })
      });
      const data = await res.json();
      loader.style.display = "none";

      const mood = data.mood || "neutral";
      const genre = values[5].toLowerCase();
      const confidence = (data.confidence * 100).toFixed(1);

      document.body.style.background = mood === "happy" ? "#eaffea" : mood === "sad" ? "#fceaea" : "#f4f4f4";
      audio.src = genreAudios[genre] || genreAudios.lofi;
      audio.play();
      audioControls.style.display = "flex";
      nowPlaying.textContent = `🎵 Now Playing: ${genre.charAt(0).toUpperCase() + genre.slice(1)}`;

      resultDiv.innerHTML = `<div>Your mood is: <strong>${mood.toUpperCase()}</strong> (Confidence: ${confidence}%)</div>`;
      emojiDiv.textContent = mood === "happy" ? "😄" : mood === "sad" ? "😢" : "😐";
      quoteDiv.textContent = mood === "happy"
        ? "Happiness is a direction, not a place."
        : mood === "sad"
        ? "Tears come from the heart and not from the brain."
        : "Sometimes not feeling anything is a feeling too.";

      const tracks = recommendedTracks[genre] || [];
      songsDiv.innerHTML = `<h3>🎵 Recommended Tracks:</h3><ul>` +
        tracks.map(track => `<li><a href="${track.url}" target="_blank">${track.title}</a></li>`).join("") +
        `</ul>`;
      songsDiv.style.display = "block";

      const memes = {
        happy: ["https://media.giphy.com/media/3o7abldj0b3rxrZUxW/giphy.mp4"],
        sad: ["https://media.giphy.com/media/13borq7Zo2kulO/giphy.mp4"],
        neutral: ["https://media.giphy.com/media/U3qYN8S0j3bpK/giphy.mp4"]
      };

      const memeList = memes[mood];
      memeVideo.src = memeList[Math.floor(Math.random() * memeList.length)];
      memeVideo.style.display = "block";

      const effect = mood === "happy" ? "confetti" : mood === "sad" ? "rain" : "";
      animationDiv.className = effect;
      for (let i = 0; i < 35; i++) {
        const p = document.createElement("div");
        p.className = "particle";
        p.style.left = Math.random() * 100 + "vw";
        p.style.top = "-" + Math.random() * 20 + "vh";
        if (effect === "confetti") {
          p.style.setProperty("--hue", Math.random().toFixed(2));
        }
        animationDiv.appendChild(p);
      }

    } catch (err) {
      loader.style.display = "none";
      resultDiv.textContent = "⚠️ Error detecting mood. Please try again.";
      console.error("Error:", err);
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
