async function predictMood() {
  const userInput = document.getElementById("userInput").value.trim();
  const resultDiv = document.getElementById("result");
  const body = document.getElementById("body");
  const inputBox = document.getElementById("userInput");

  if (!userInput) {
    resultDiv.innerHTML = "<em>Please enter how you're feeling...</em>";
    return;
  }

  resultDiv.innerHTML = `<div class="spinner"></div><p>Analyzing mood...</p>`;

  try {
    const response = await fetch("https://moodtunes-gjkh.onrender.com/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: userInput })
    });

    const data = await response.json();
    const mood = data.mood;
    const confidence = data.confidence;

    const playlists = {
      happy: { msg: "😊 Happy Vibes", link: "https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC", color: "#ffe066" },
      sad: { msg: "😢 Sad Songs", link: "https://open.spotify.com/playlist/37i9dQZF1DX7qK8ma5wgG1", color: "#405070" },
      energetic: { msg: "⚡ Workout Bangers", link: "https://open.spotify.com/playlist/37i9dQZF1DX70RN3TfWWJh", color: "#ff4d4d" },
      chill: { msg: "🧘 Chill Beats", link: "https://open.spotify.com/playlist/37i9dQZF1DX4WYpdgoIcn6", color: "#88d8b0" },
      romantic: { msg: "💖 Romantic Hits", link: "https://open.spotify.com/playlist/37i9dQZF1DX50QitC6Oqtn", color: "#ff99c8" },
      focus: { msg: "🧠 Focus Flow", link: "https://open.spotify.com/playlist/37i9dQZF1DX3PFzdbtx1Us", color: "#79b1f3" },
      angry: { msg: "😡 Hard Rock", link: "https://open.spotify.com/playlist/37i9dQZF1DWZJmo7mlltU6", color: "#900c3f" },
      sleepy: { msg: "😴 Sleep Sounds", link: "https://open.spotify.com/playlist/37i9dQZF1DWZd79rJ6a7lp", color: "#3a3f58" },
      confident: { msg: "😎 Boss Vibes", link: "https://open.spotify.com/playlist/37i9dQZF1DX4fpCWaHOned", color: "#20c997" }
    };

    const playlist = playlists[mood] || { msg: "🤔 Couldn't detect mood.", link: "#", color: "#333" };
    body.style.transition = "background-color 1s ease";
    body.style.backgroundColor = playlist.color;

    let feedback = "";
    if (confidence >= 0.85) {
      feedback = "🔍 Very confident in your mood!";
    } else if (confidence >= 0.6) {
      feedback = "🙂 Fairly confident mood prediction.";
    } else {
      feedback = "⚠️ Low confidence. Try writing a bit more?";
    }

    resultDiv.innerHTML = `
      <div class="fade-in">
        <h2>${playlist.msg}</h2>
        <p><a href="${playlist.link}" target="_blank">Listen on Spotify</a></p>
        <p>Mood: <strong>${mood.toUpperCase()}</strong></p>
        <p>Confidence: ${(confidence * 100).toFixed(1)}%</p>
        <p>${feedback}</p>
      </div>
    `;

    inputBox.value = "";
  } catch (err) {
    resultDiv.innerHTML = "❌ Something went wrong. Please try again later.";
  }
}
