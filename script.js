const questions = [
  "How do you feel when you wake up?",
  "Describe your last conversation in a few words.",
  "What are your thoughts about the day ahead?",
  "Are you feeling more energized or drained?",
  "Is your mind more calm or racing right now?",
  "Would you prefer being around people or alone today?"
];

let answers = [];

function createForm() {
  const formDiv = document.getElementById("form");
  formDiv.innerHTML = "";
  questions.forEach((q, i) => {
    const input = document.createElement("textarea");
    input.placeholder = q;
    input.rows = 2;
    input.className = "fade-in";
    input.oninput = (e) => answers[i] = e.target.value;
    formDiv.appendChild(input);
  });
}

async function submitAnswers() {
  const text = answers.filter(a => a).join(" ");
  if (!text) return alert("Please answer at least one question!");

  document.getElementById("result").innerText = "Detecting mood...";
  document.body.className = "";

  try {
    const res = await fetch("https://moodtunes-gjkh.onrender.com/detect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    const data = await res.json();
    const mood = data.mood || "neutral";
    const confidence = Math.round((data.confidence || 0) * 100);
    const emoji = mood === "happy" ? "😊" : mood === "sad" ? "😢" : "😐";

    document.getElementById("result").innerText = `Your mood is: ${mood.toUpperCase()} (Confidence: ${confidence}%)`;
    document.getElementById("emoji").innerText = emoji;
    document.body.className = mood;

    const songList = {
      happy: ["🎶 'Happy' - Pharrell", "🎵 'Good Life' - OneRepublic", "🌞 'Can't Stop the Feeling' - Justin Timberlake"],
      sad: ["🎶 'Someone Like You' - Adele", "🎵 'Let Her Go' - Passenger", "💧 'Fix You' - Coldplay"],
      neutral: ["🎶 'Counting Stars' - OneRepublic", "🎵 'Lost in Japan' - Shawn Mendes", "🌥 'Blinding Lights' - The Weeknd"]
    };

    const songs = songList[mood] || [];
    const songsDiv = document.getElementById("songs");
    songsDiv.innerHTML = `<h3>Recommended Songs:</h3><ul>${songs.map(s => `<li>${s}</li>`).join('')}</ul>`;
    songsDiv.style.display = "block";

  } catch (err) {
    document.getElementById("result").innerText = "Something went wrong. Try again.";
    console.error("❌", err);
  }
}

createForm();
