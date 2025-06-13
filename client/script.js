// 📁 client/script.js
async function predictMood() {
  const userInput = document.getElementById("userInput").value;
  const resultDiv = document.getElementById("result");
  const body = document.getElementById("body");

  resultDiv.innerHTML = "Detecting mood...";

  try {
    const response = await fetch("https://your-render-backend.onrender.com/api/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: userInput })
    });

    const data = await response.json();
    const mood = data.mood;
    displayPlaylist(mood);
  } catch (err) {
    resultDiv.innerHTML = "Something went wrong. Try again later.";
  }
}

function displayPlaylist(mood) {
  const body = document.getElementById("body");
  const resultDiv = document.getElementById("result");

  const playlists = {
    happy: { msg: "😊 Happy Vibes: <a href='https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC'>Listen</a>", color: "#ffe066" },
    sad: { msg: "😢 Sad Songs: <a href='https://open.spotify.com/playlist/37i9dQZF1DX7qK8ma5wgG1'>Listen</a>", color: "#405070" },
    energetic: { msg: "⚡ Workout Bangers: <a href='https://open.spotify.com/playlist/37i9dQZF1DX70RN3TfWWJh'>Listen</a>", color: "#ff4d4d" },
    chill: { msg: "🧘 Chill Beats: <a href='https://open.spotify.com/playlist/37i9dQZF1DX4WYpdgoIcn6'>Listen</a>", color: "#88d8b0" },
    romantic: { msg: "💖 Romantic Hits: <a href='https://open.spotify.com/playlist/37i9dQZF1DX50QitC6Oqtn'>Listen</a>", color: "#ff99c8" },
    focus: { msg: "🧠 Focus Flow: <a href='https://open.spotify.com/playlist/37i9dQZF1DX3PFzdbtx1Us'>Listen</a>", color: "#79b1f3" },
    angry: { msg: "😡 Hard Rock: <a href='https://open.spotify.com/playlist/37i9dQZF1DWZJmo7mlltU6'>Listen</a>", color: "#900c3f" },
    sleepy: { msg: "😴 Sleep Sounds: <a href='https://open.spotify.com/playlist/37i9dQZF1DWZd79rJ6a7lp'>Listen</a>", color: "#3a3f58" },
    confident: { msg: "😎 Boss Vibes: <a href='https://open.spotify.com/playlist/37i9dQZF1DX4fpCWaHOned'>Listen</a>", color: "#20c997" }
  };

  const playlist = playlists[mood] || { msg: "🤔 Couldn't detect mood.", color: "#222" };
  resultDiv.innerHTML = playlist.msg;
  body.style.backgroundColor = playlist.color;
}
