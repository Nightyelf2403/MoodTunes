document.addEventListener("DOMContentLoaded", () => {
  const audio = new Audio();
  const nowPlaying = document.getElementById("nowPlaying");
  const volumeSlider = document.getElementById("volumeSlider");
  const muteBtn = document.getElementById("muteBtn");
  const pauseBtn = document.getElementById("pauseBtn");

  audio.loop = true;
  audio.volume = volumeSlider.value;

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
      { title: "Beethoven - Moonlight Sonata", url: "https://www.youtube.com/watch?v=4Tr0otuiQuU" },
      { title: "Clair de Lune - Debussy", url: "https://www.youtube.com/watch?v=CvFH_6DNRCY" }
    ]
  };

  window.updateMoodAudio = function(genre) {
    audio.src = genreAudios[genre] || genreAudios.lofi;
    nowPlaying.innerHTML = `🎵 Now Playing: <em>${genre.charAt(0).toUpperCase() + genre.slice(1)}</em>`;
    audio.play();

    const songsDiv = document.getElementById("songs");
    const tracks = recommendedTracks[genre] || [];
    songsDiv.innerHTML = `<h3 style="margin-top: 1rem;">🎧 Recommended Songs:</h3><ul>` +
      tracks.map(t => `<li><a href="${t.url}" target="_blank">${t.title}</a></li>`).join('') +
      `</ul>`;
  };

  // Mobile-friendly audio controls
  const audioControls = document.getElementById("audio-controls");
  if (audioControls) {
    audioControls.style.display = "flex";
    audioControls.style.flexDirection = "column";
    audioControls.style.alignItems = "center";
    audioControls.style.gap = "0.5rem";
    audioControls.style.marginTop = "1rem";
    audioControls.style.padding = "0.5rem";
    audioControls.style.maxWidth = "90vw";
  }
});
