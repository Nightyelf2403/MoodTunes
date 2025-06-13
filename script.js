const playlists = {
  happy: `😊 You're feeling happy! Try this: <a href="https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC" target="_blank">Happy Vibes Playlist</a>`,
  sad: `😢 Need a moment? Here's a <a href="https://open.spotify.com/playlist/37i9dQZF1DX7qK8ma5wgG1" target="_blank">Sad Songs Playlist</a>`,
  energetic: `⚡ Let’s move! Check this out: <a href="https://open.spotify.com/playlist/37i9dQZF1DX70RN3TfWWJh" target="_blank">Workout Bangers</a>`,
  chill: `🧘 Unwind here: <a href="https://open.spotify.com/playlist/37i9dQZF1DX4WYpdgoIcn6" target="_blank">Lo-Fi Chill Beats</a>`,
  romantic: `💖 Feel the love: <a href="https://open.spotify.com/playlist/37i9dQZF1DX50QitC6Oqtn" target="_blank">Romantic Hits</a>`,
  focus: `🧠 Stay sharp: <a href="https://open.spotify.com/playlist/37i9dQZF1DX3PFzdbtx1Us" target="_blank">Focus Flow Playlist</a>`
};

function suggest(mood) {
  const result = document.getElementById("result");
  result.innerHTML = playlists[mood];
}
