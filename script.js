// Full Enhanced script.js for MoodTunes with Story Options, Audio Controls, and Mood-Based Memes

document.addEventListener("DOMContentLoaded", () => {
  const audio = new Audio();
  audio.loop = true;

  const nowPlaying = document.getElementById("nowPlaying") || document.createElement("div");
  nowPlaying.id = "nowPlaying";

  const volumeSlider = document.getElementById("volumeSlider") || document.createElement("input");
  volumeSlider.type = "range";
  volumeSlider.min = 0;
  volumeSlider.max = 1;
  volumeSlider.step = 0.01;
  volumeSlider.value = 0.6;
  audio.volume = volumeSlider.value;

  const muteBtn = document.getElementById("muteBtn") || document.createElement("button");
  muteBtn.id = "muteBtn";
  muteBtn.textContent = "🔇 Mute";

  const pauseBtn = document.getElementById("pauseBtn") || document.createElement("button");
  pauseBtn.id = "pauseBtn";
  pauseBtn.textContent = "⏸️ Pause";

  muteBtn.onclick = () => {
    audio.muted = !audio.muted;
    muteBtn.textContent = audio.muted ? "🔈 Unmute" : "🔇 Mute";
  };

  pauseBtn.onclick = () => {
    if (audio.paused) {
      audio.play();
      pauseBtn.textContent = "⏸️ Pause";
    } else {
      audio.pause();
      pauseBtn.textContent = "▶️ Resume";
    }
  };

  volumeSlider.oninput = () => {
    audio.volume = volumeSlider.value;
  };

  let audioControls = document.getElementById("audio-controls");
  if (!audioControls) {
    audioControls = document.createElement("div");
    audioControls.id = "audio-controls";

    const label = document.createElement("label");
    label.textContent = "🔊 Volume: ";

    audioControls.append(nowPlaying, label, volumeSlider, muteBtn, pauseBtn);
    document.body.appendChild(audioControls);
  }

  const genreAudios = {
    pop: "https://dl.sndup.net/q6p7/pop-ambience.mp3",
    lofi: "https://dl.sndup.net/t5mk/lofi-bg.mp3",
    classical: "https://dl.sndup.net/8xdp/classical-soft.mp3"
  };

  const recommendedTracks = {
    pop: [
      { title: "Blinding Lights", url: "https://www.youtube.com/watch?v=fHI8X4OXluQ" },
      { title: "Levitating", url: "https://www.youtube.com/watch?v=TUVcZfQe-Kw" }
    ],
    lofi: [
      { title: "Chillhop Essentials", url: "https://www.youtube.com/watch?v=5qap5aO4i9A" },
      { title: "Lofi Hip Hop Radio", url: "https://www.youtube.com/watch?v=jfKfPfyJRdk" }
    ],
    classical: [
      { title: "Moonlight Sonata", url: "https://www.youtube.com/watch?v=4Tr0otuiQuU" },
      { title: "Clair de Lune", url: "https://www.youtube.com/watch?v=CvFH_6DNRCY" }
    ]
  };

  const memes = {
    happy: [
      "https://media.giphy.com/media/3o7abldj0b3rxrZUxW/giphy.gif",
      "https://media.giphy.com/media/l0ExncehJzexFpRHq/giphy.gif"
    ],
    sad: [
      "https://media.giphy.com/media/13borq7Zo2kulO/giphy.gif",
      "https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif"
    ],
    neutral: [
      "https://media.giphy.com/media/U3qYN8S0j3bpK/giphy.gif",
      "https://media.giphy.com/media/fAnEC88LccN7a/giphy.gif"
    ]
  };

  window.updateMoodAudio = function (genre, mood) {
    audio.src = genreAudios[genre] || genreAudios.lofi;
    nowPlaying.innerHTML = `🎵 Now Playing: <em>${genre.charAt(0).toUpperCase() + genre.slice(1)}</em>`;
    audio.play();

    const songsDiv = document.getElementById("songs");
    const tracks = recommendedTracks[genre] || [];
    songsDiv.innerHTML = `<h3 style="margin-top: 1rem;">🎧 Recommended Songs:</h3><ul>` +
      tracks.map(t => `<li><a href="${t.url}" target="_blank">${t.title}</a></li>`).join('') +
      `</ul>`;

    const media = document.getElementById("mediaContent") || document.createElement("div");
    media.id = "mediaContent";
    const gif = document.getElementById("mood-gif") || document.createElement("img");
    gif.id = "mood-gif";
    gif.src = memes[mood]?.[Math.floor(Math.random() * memes[mood].length)] || "";
    gif.alt = "Mood GIF";
    gif.style.maxWidth = "90vw";
    gif.style.borderRadius = "12px";
    media.appendChild(gif);
    document.body.appendChild(media);
  };

  const storyForm = document.getElementById("storyForm");
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
    <div style="display: flex; flex-direction: column; align-items: center;">
      <p class="story-text story-large">${story}</p>
      <button type="submit" style="margin-top: 1rem; font-size: 1.1rem;">🎯 Detect Mood</button>
    </div>
  `;

  storyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const mood = document.getElementById("q0").value;
    const genre = document.getElementById("q5").value;
    if (!mood || !genre) return alert("Please select mood and genre!");
    updateMoodAudio(genre, mood);
  });

  function moods() {
    return `<option value="happy">Happy</option><option value="sad">Sad</option><option value="neutral">Neutral</option>`;
  }
  function events() {
    return `<option value="exciting">Exciting</option><option value="stressful">Stressful</option><option value="unexpected">Unexpected</option>`;
  }
  function energy() {
    return `<option value="high">High</option><option value="moderate">Moderate</option><option value="low">Low</option>`;
  }
  function feels() {
    return `<option value="positive">Positive</option><option value="reflective">Reflective</option><option value="overwhelmed">Overwhelmed</option>`;
  }
  function friends() {
    return `<option value="cheerful">Cheerful</option><option value="moody">Moody</option><option value="calm">Calm</option>`;
  }
  function genres() {
    return `<option value="pop">Pop</option><option value="lofi">Lofi</option><option value="classical">Classical</option>`;
  }
});
