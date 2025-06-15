document.addEventListener("DOMContentLoaded", () => {
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

  const storyForm = document.getElementById("storyForm");
  const loader = document.getElementById("loader");
  const resultDiv = document.getElementById("result");
  const emojiDiv = document.getElementById("emoji");
  const quoteDiv = document.getElementById("quote");
  const songsDiv = document.getElementById("songs");
  const moodGif = document.getElementById("mood-gif");
  const memeVideo = document.getElementById("meme-video");
  const animationDiv = document.getElementById("falling-anim");

  const story = storyTemplates[Math.floor(Math.random() * storyTemplates.length)];
  storyForm.innerHTML = `
    <p class="story-text story-large">${story}</p>
    <button type="submit">🎯 Detect Mood</button>
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
    songsDiv.style.display = "none";
    moodGif.style.display = "none";
    memeVideo.src = "";
    memeVideo.style.display = "none";
    animationDiv.className = ""; // Reset animation

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
      emojiDiv.textContent = mood === "happy" ? "😄" : mood === "sad" ? "😢" : "😐";

      const moodQuotes = {
        happy: "Happiness is a direction, not a place. 😊",
        sad: "Tears come from the heart and not from the brain. 💧",
        neutral: "Sometimes not feeling anything is a feeling too. 🍃"
      };

      const gifs = {
        happy: [
          "https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif",
          "https://media.giphy.com/media/13CoXDiaCcCoyk/giphy.gif"
        ],
        sad: [
          "https://media.giphy.com/media/d2lcHJTG5Tscg/giphy.gif",
          "https://media.giphy.com/media/fT0X0RPKgq4x2/giphy.gif"
        ],
        neutral: [
          "https://media.giphy.com/media/l0K4kWJirrp1JX8sY/giphy.gif",
          "https://media.giphy.com/media/xUPGcjGy8I928yIlAQ/giphy.gif"
        ]
      };

      const memes = {
        happy: [
          "https://media.giphy.com/media/3o7abldj0b3rxrZUxW/giphy.mp4",
          "https://media.giphy.com/media/l0ExncehJzexFpRHq/giphy.mp4"
        ],
        sad: [
          "https://media.giphy.com/media/13borq7Zo2kulO/giphy.mp4",
          "https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.mp4"
        ],
        neutral: [
          "https://media.giphy.com/media/fAnEC88LccN7a/giphy.mp4",
          "https://media.giphy.com/media/U3qYN8S0j3bpK/giphy.mp4"
        ]
      };

      const songs = {
        happy: [
          { name: "Levitating – Dua Lipa", link: "https://www.youtube.com/watch?v=TUVcZfQe-Kw" },
          { name: "Peaches – Justin Bieber", link: "https://www.youtube.com/watch?v=tQ0yjYUFKAE" }
        ],
        sad: [
          { name: "Let Me Down Slowly – Alec Benjamin", link: "https://www.youtube.com/watch?v=50VNCymT-Cs" },
          { name: "Lose You To Love Me – Selena Gomez", link: "https://www.youtube.com/watch?v=zlJDTxahav0" }
        ],
        neutral: [
          { name: "Circles – Post Malone", link: "https://www.youtube.com/watch?v=wXhTHyIgQ_U" },
          { name: "Memories – Maroon 5", link: "https://www.youtube.com/watch?v=SlPhMPnQ58k" }
        ]
      };

      quoteDiv.textContent = moodQuotes[mood];

      const songLinks = songs[mood]
        .map(song => `<li><a href="${song.link}" target="_blank">${song.name}</a></li>`)
        .join("");
      songsDiv.innerHTML = `<h3>🎵 Your Songs:</h3><ul>${songLinks}</ul>`;
      songsDiv.style.display = "block";

      const gifList = gifs[mood];
      moodGif.src = gifList[Math.floor(Math.random() * gifList.length)];
      moodGif.style.display = "block";

      const memeList = memes[mood];
      memeVideo.src = memeList[Math.floor(Math.random() * memeList.length)];
      memeVideo.style.display = "block";

     
      console.log("💬 Server returned:", data);

      // Add falling animation
      if (mood === "happy") animationDiv.classList.add("confetti");
      else if (mood === "sad") animationDiv.classList.add("rain");
      else if (mood === "neutral") animationDiv.classList.add("leaves");

      // Shrink story and show media
      document.querySelector(".story-text").classList.replace("story-large", "story-small");
      document.querySelector(".media").classList.add("show");

    } catch (err) {
      loader.style.display = "none";
      resultDiv.textContent = "⚠️ Error detecting mood. Please try again.";
      console.error("Mood Detection Failed:", err);
    }
  });

  function moods() {
    return `<option disabled selected value="">Select</option>
      <option value="happy">Happy</option>
      <option value="sad">Sad</option>
      <option value="neutral">Neutral</option>`;
  }
  function events() {
    return `<option disabled selected value="">Select</option>
      <option value="exciting">Exciting</option>
      <option value="stressful">Stressful</option>
      <option value="unexpected">Unexpected</option>`;
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
      <option value="classical">Classical</option>`;
  }
});
