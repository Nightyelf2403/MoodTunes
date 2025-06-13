document.addEventListener("DOMContentLoaded", () => {
  const storyTemplates = [
    `Today, I feel <select id="q0">${moods()}</select> because something <select id="q1">${events()}</select> happened. My energy level is <select id="q2">${energy()}</select> and I'm feeling more <select id="q3">${feels()}</select> lately. My best friend would say I'm <select id="q4">${friends()}</select>. It feels like a <select id="q5">${genres()}</select> kind of day.`,
    `Woke up feeling <select id="q0">${moods()}</select>. A <select id="q1">${events()}</select> moment occurred. I’m <select id="q2">${energy()}</select> energy-wise and <select id="q3">${feels()}</select> in thoughts. I'd describe myself as <select id="q4">${friends()}</select>. This moment calls for <select id="q5">${genres()}</select> music.`
  ];

  const randomStory = storyTemplates[Math.floor(Math.random() * storyTemplates.length)];
  const storyForm = document.getElementById("storyForm");

  storyForm.innerHTML = `
    <p>${randomStory}</p>
    <button type="submit">Detect Mood</button>
  `;

  storyForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const values = [];
    for (let i = 0; i < 6; i++) {
      const val = document.getElementById(`q${i}`).value;
      if (!val) return alert("Please select all options.");
      values.push(val);
    }

    const text = values.join(" ");
    document.getElementById("loader").style.display = "block";

    try {
      const res = await fetch("https://moodtunes-gjkh.onrender.com/detect-mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });

      const data = await res.json();
      document.getElementById("loader").style.display = "none";

      const mood = data.label?.toLowerCase() || "neutral";
      const confidence = (data.score * 100).toFixed(2);

      document.body.className = mood;
      document.getElementById("result").innerHTML = `Your mood is: <strong>${mood.toUpperCase()}</strong> (Confidence: ${confidence}%)`;
      document.getElementById("emoji").innerHTML = mood === "positive" ? "😊" : mood === "negative" ? "😢" : "😐";

      const songs = {
        positive: ["Happy – Pharrell", "Good Day – Nappy Roots", "Uptown Funk – Bruno Mars"],
        negative: ["Someone Like You – Adele", "Fix You – Coldplay", "Let Her Go – Passenger"],
        neutral: ["Let It Be – Beatles", "Imagine – John Lennon", "Counting Stars – OneRepublic"]
      };

      const gifs = {
        positive: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
        negative: "https://media.giphy.com/media/j2pOGeGYKe2xCCKwfi/giphy.gif",
        neutral: "https://media.giphy.com/media/d2Z9QYzA2aidiWn6/giphy.gif"
      };

      const audios = {
        positive: "https://www.fesliyanstudios.com/play-mp3/6552",
        negative: "https://www.fesliyanstudios.com/play-mp3/6415",
        neutral: "https://www.fesliyanstudios.com/play-mp3/6724"
      };

      const songList = songs[mood].map(song => `<li>${song}</li>`).join("");
      document.getElementById("songs").innerHTML = `<h3>Top songs:</h3><ul>${songList}</ul>`;
      document.getElementById("songs").style.display = "block";

      const gif = gifs[mood];
      const audio = audios[mood];
      document.getElementById("mood-gif").src = gif;
      document.querySelector(".animation").style.display = "block";

      const audioEl = document.getElementById("mood-audio");
      audioEl.src = audio;
      audioEl.style.display = "block";
      audioEl.play();

    } catch (err) {
      console.error(err);
      document.getElementById("result").textContent = "⚠️ Error detecting mood. Please try again.";
    }
  });

  // Option generator functions
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
