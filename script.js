const playlists = {
  happy: "Try this: 🎶 [Happy Vibes Playlist](https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC)",
  sad: "Try this: 😔 [Sad Songs Playlist](https://open.spotify.com/playlist/37i9dQZF1DX7qK8ma5wgG1)",
  energetic: "Try this: ⚡ [Workout Bangers](https://open.spotify.com/playlist/37i9dQZF1DX70RN3TfWWJh)",
  chill: "Try this: 🧘 [Lo-Fi Chill Beats](https://open.spotify.com/playlist/37i9dQZF1DX4WYpdgoIcn6)"
};

function suggest(mood) {
  const result = document.getElementById("result");
  result.innerHTML = playlists[mood];
}
