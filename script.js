const playlists = {
  happy: {
    msg: `😊 You're feeling happy! Check out <a href="https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC" target="_blank">Happy Vibes</a>`,
    color: "#ffe066"
  },
  sad: {
    msg: `😢 Feeling low? Here's <a href="https://open.spotify.com/playlist/37i9dQZF1DX7qK8ma5wgG1" target="_blank">Sad Songs</a>`,
    color: "#405070"
  },
  energetic: {
    msg: `⚡ Need energy? Try <a href="https://open.spotify.com/playlist/37i9dQZF1DX70RN3TfWWJh" target="_blank">Workout Bangers</a>`,
    color: "#ff4d4d"
  },
  chill: {
    msg: `🧘 Take it easy with <a href="https://open.spotify.com/playlist/37i9dQZF1DX4WYpdgoIcn6" target="_blank">Lo-Fi Chill Beats</a>`,
    color: "#88d8b0"
  },
  romantic: {
    msg: `💖 Feel the love with <a href="https://open.spotify.com/playlist/37i9dQZF1DX50QitC6Oqtn" target="_blank">Romantic Hits</a>`,
    color: "#ff99c8"
  },
  focus: {
    msg: `🧠 Stay sharp with <a href="https://open.spotify.com/playlist/37i9dQZF1DX3PFzdbtx1Us" target="_blank">Focus Flow</a>`,
    color: "#79b1f3"
  },
  angry: {
    msg: `😡 Let it out with <a href="https://open.spotify.com/playlist/37i9dQZF1DWZJmo7mlltU6" target="_blank">Hard Rock Hits</a>`,
    color: "#900c3f"
  },
  sleepy: {
    msg: `😴 Time to relax with <a href="https://open.spotify.com/playlist/37i9dQZF1DWZd79rJ6a7lp" target="_blank">Sleepy Sounds</a>`,
    color: "#3a3f58"
  },
  confident: {
    msg: `😎 Walk with style! Here's <a href="https://open.spotify.com/playlist/37i9dQZF1DX4fpCWaHOned" target="_blank">Boss Vibes</a>`,
    color: "#20c997"
  }
};

function suggest(mood) {
  const result = document.getElementById("result");
  const body = document.getElementById("body");

  result.innerHTML = playlists[mood].msg;
  body.style.backgroundColor = playlists[mood].color;
}
