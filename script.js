const questions = [
  "How do you feel about your day so far?",
  "Did anything exciting or disappointing happen today?",
  "How’s your energy level right now?",
  "Are you feeling more positive or reflective lately?",
  "How would your best friend describe your mood today?",
  "If today was a song, what genre would it be?"
];

document.addEventListener("DOMContentLoaded", () => {
  const formContainer = document.getElementById("form");
  const loader = document.getElementById("loader");
  const resultDiv = document.getElementById("result");
  const emojiDiv = document.getElementById("emoji");
  const songsDiv = document.getElementById("songs");
  const moodGif = document.getElementById("mood-gif");
  const moodAudio = document.getElementById("mood-audio");

  // Load questions
  questions.forEach((q, i) => {
    const label = document.createElement("label");
    label.textContent = `${i + 1}. ${q}`;
    const textarea = document.createElement("textarea");
    textarea.rows = 2;
    textarea.id = `answer-${i}`;
    formContainer.appendChild(label);
    formContainer.appendChild(document.createElement("br"));
    formContainer.appendChild(textarea);
    formContainer.appendChild(document.createElement("br"));
  });

  // Attach submit function globally so it's available in HTML onclick
  window.submitAnswers = async function () {
    const answers = questions.map((_, i) => document.getElementById(`answer-${i}`).value).join(" ");
    if (!answers.trim()) return alert("Please answer the questions!");

    loader.style.display = "block";
    resultDiv.innerHTML = "";
    emojiDiv.innerHTML = "";
    songsDiv.style.display = "none";
    moodGif.src = "";
    moodGif.parentElement.style.display = "none";
    moodAudio.style.display = "none";

    try {
      const res = await fetch("https://moodtunes-gjkh.onrender.com/detect-mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: answers })
      });

      const data = await res.json();
      loader.style.display = "none";

      const mood = data.label.toLowerCase();
      const confidence = (data.score * 100).toFixed(2);

      document.body.className = mood;
      resultDiv.innerHTML = `Your mood is: <strong>${mood.toUpperCase()}</strong> (Confidence: ${confidence}%)`;

      const moodEmoji = mood === "positive" ? "😊" : mood === "negative" ? "😢" : "😐";
      emojiDiv.innerHTML = moodEmoji;

      const songs = {
        positive: ["Happy – Pharrell", "Good Day – Nappy Roots", "Uptown Funk – Bruno Mars"],
        negative: ["Someone Like You – Adele", "Fix You – Coldplay", "Let Her Go – Passenger"],
        neutral: ["Let It Be – Beatles", "Imagine – John Lennon", "Counting Stars – OneRepublic"]
      };

      const audios = {
        positive: "https://www.fesliyanstudios.com/play-mp3/6552",
        negative: "https://www.fesliyanstudios.com/play-mp3/6415",
        neutral: "https://www.fesliyanstudios.com/play-mp3/6724"
      };

      const gifs = {
        positive: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
        negative: "https://media.giphy.com/media/j2pOGeGYKe2xCCKwfi/giphy.gif",
        neutral: "https://media.giphy.com/media/d2Z9QYzA2aidiWn6/giphy.gif"
      };

      songsDiv.innerHTML = "<h3>Top songs for your mood:</h3><ul>" +
        songs[mood].map(song => `<li>${song}</li>`).join("") + "</ul>";
      songsDiv.style.display = "block";

      moodGif.src = gifs[mood];
      moodGif.parentElement.style.display = "block";

      moodAudio.src = audios[mood];
      moodAudio.style.display = "block";
      moodAudio.play();

    } catch (err) {
      loader.style.display = "none";
      resultDiv.innerHTML = "⚠️ Something went wrong.";
      console.error(err);
    }
  };
});
