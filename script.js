document.addEventListener("DOMContentLoaded", () => {
  const storyVariants = [
    `Today, I feel <select id="q0">${moods()}</select> because something <select id="q1">${events()}</select> happened. My energy level is <select id="q2">${energy()}</select> and I'm feeling more <select id="q3">${feels()}</select> lately. If I had to describe my mood, my best friend would say I'm <select id="q4">${friends()}</select>. Today feels like a <select id="q5">${genres()}</select> kind of song.`,

    `I'm currently feeling <select id="q0">${moods()}</select> after a rather <select id="q1">${events()}</select> experience. My motivation is <select id="q2">${energy()}</select>, and I'm more <select id="q3">${feels()}</select> than usual. According to my friend, I'm <select id="q4">${friends()}</select>. If today had a soundtrack, it would be <select id="q5">${genres()}</select>.`,

    `This moment feels <select id="q0">${moods()}</select>. Earlier, something <select id="q1">${events()}</select> occurred. Energy-wise, I'm <select id="q2">${energy()}</select>. Internally, I sense a lot of <select id="q3">${feels()}</select>. I'm probably just being <select id="q4">${friends()}</select>. I'd say it's a <select id="q5">${genres()}</select> day.`,

    `Emotionally, I'm <select id="q0">${moods()}</select> today. An event that felt <select id="q1">${events()}</select> triggered it. Physically, I’m feeling <select id="q2">${energy()}</select>. Mentally, it’s more of a <select id="q3">${feels()}</select> vibe. My friends would call me <select id="q4">${friends()}</select>. The vibe of today sounds like <select id="q5">${genres()}</select>.`,

    `Lately, I’ve been feeling <select id="q0">${moods()}</select>. Something <select id="q1">${events()}</select> just happened. My energy is <select id="q2">${energy()}</select>. My mindset is leaning towards <select id="q3">${feels()}</select>. I'm acting kind of <select id="q4">${friends()}</select>. I'd choose a <select id="q5">${genres()}</select> track for this moment.`,

    `Like a movie, my day feels <select id="q0">${moods()}</select>. The plot twist was <select id="q1">${events()}</select>. I have <select id="q2">${energy()}</select> energy, feeling <select id="q3">${feels()}</select>. I'd probably be seen as <select id="q4">${friends()}</select>. This story plays to a <select id="q5">${genres()}</select> soundtrack.`,

    `Woke up feeling <select id="q0">${moods()}</select>, probably because of the <select id="q1">${events()}</select> dream. I'm operating on <select id="q2">${energy()}</select> energy today. My thoughts are very <select id="q3">${feels()}</select>. If you asked my friend, they’d say I’m <select id="q4">${friends()}</select>. I'd play <select id="q5">${genres()}</select> music right now.`
  ];

  const randomStory = storyVariants[Math.floor(Math.random() * storyVariants.length)];
  const storyForm = document.getElementById("storyForm");

  storyForm.style.opacity = 0;
  setTimeout(() => {
    storyForm.innerHTML = `
      <form id="moodForm">
        <p>${randomStory}</p>
        <button type="submit">Detect Mood</button>
      </form>
    `;
    storyForm.style.opacity = 1;

    const moodForm = document.getElementById("moodForm");
    moodForm.addEventListener("submit", handleSubmit);
  }, 300);

  async function handleSubmit(e) {
    e.preventDefault();
    const loader = document.getElementById("loader");
    const resultDiv = document.getElementById("result");
    const emojiDiv = document.getElementById("emoji");
    const songsDiv = document.getElementById("songs");
    const moodGif = document.getElementById("mood-gif");
    const moodAudio = document.getElementById("mood-audio");

    const values = [];
    for (let i = 0; i < 6; i++) {
      const select = document.getElementById(`q${i}`);
      if (!select || !select.value) {
        alert("Please complete all fields.");
        return;
      }
      values.push(select.value);
    }
    const text = values.join(" ");

    loader.style.display = "block";
    resultDiv.innerHTML = "";
    emojiDiv.innerHTML = "";
    songsDiv.style.display = "none";
    moodGif.src = "";
    moodGif.style.display = "none";
    moodAudio.style.display = "none";

    try {
      const res = await fetch("https://moodtunes-gjkh.onrender.com/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });

      const data = await res.json();
      loader.style.display = "none";

      const mood = data.label?.toLowerCase() || "uncertain";
      const confidence = data.score ? (data.score * 100).toFixed(2) : "0";

      document.body.className = mood;
      resultDiv.innerHTML = `Your mood is: <strong>${mood.toUpperCase()}</strong> (Confidence: ${confidence}%)`;

      const moodEmoji = mood === "positive" ? "😊" : mood === "negative" ? "😢" : "😐";
      emojiDiv.innerHTML = moodEmoji;

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

      songsDiv.innerHTML = "<h3>Top songs for your mood:</h3><ul>" +
        (songs[mood] || []).map(song => `<li>${song}</li>`).join("") + "</ul>";
      songsDiv.style.display = "block";

      moodGif.src = gifs[mood];
      moodGif.style.display = "block";

      moodAudio.src = audios[mood];
      moodAudio.style.display = "block";
      moodAudio.play();
    } catch (err) {
      loader.style.display = "none";
      resultDiv.innerHTML = "⚠️ Something went wrong.";
      console.error("API Error:", err);
    }
  }

  function moods() {
    return `<option disabled selected value="">Select</option>
            <option value="happy">happy</option>
            <option value="sad">sad</option>
            <option value="neutral">neutral</option>
            <option value="anxious">anxious</option>`;
  }
  function events() {
    return `<option disabled selected value="">Select</option>
            <option value="exciting">exciting</option>
            <option value="stressful">stressful</option>
            <option value="unexpected">unexpected</option>
            <option value="routine">routine</option>`;
  }
  function energy() {
    return `<option disabled selected value="">Select</option>
            <option value="high">high</option>
            <option value="low">low</option>
            <option value="moderate">moderate</option>
            <option value="drained">drained</option>`;
  }
  function feels() {
    return `<option disabled selected value="">Select</option>
            <option value="positive">positive</option>
            <option value="reflective">reflective</option>
            <option value="overwhelmed">overwhelmed</option>
            <option value="content">content</option>`;
  }
  function friends() {
    return `<option disabled selected value="">Select</option>
            <option value="cheerful">cheerful</option>
            <option value="moody">moody</option>
            <option value="calm">calm</option>
            <option value="irritated">irritated</option>`;
  }
  function genres() {
    return `<option disabled selected value="">Select</option>
            <option value="pop">pop</option>
            <option value="lofi">lofi</option>
            <option value="classical">classical</option>
            <option value="rock">rock</option>`;
  }
});
