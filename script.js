const questions = [
  "How did you sleep last night?",
  "What’s something exciting that happened today?",
  "Are you looking forward to anything soon?",
  "What’s on your mind right now?",
  "How do you feel about the past week?",
  "Anything that's been bothering you lately?"
];

const formDiv = document.getElementById("form");
const resultDiv = document.getElementById("result");

let startTimes = {};

questions.forEach((q, index) => {
  const label = document.createElement("label");
  label.textContent = q;
  label.className = "question";

  const input = document.createElement("input");
  input.type = "text";
  input.id = `answer-${index}`;
  input.placeholder = "Type your answer...";
  input.onfocus = () => startTimes[index] = Date.now();

  formDiv.appendChild(label);
  formDiv.appendChild(input);
});

async function submitAnswers() {
  const conversation = questions.map((q, i) => {
    const input = document.getElementById(`answer-${i}`);
    const time = startTimes[i] ? (Date.now() - startTimes[i]) / 1000 : 0;
    return { question: q, answer: input.value, time: time.toFixed(1) };
  });

  resultDiv.innerHTML = "Detecting mood... ⏳";

  try {
    const response = await fetch("https://moodtunes-gjkh.onrender.com/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversation })
    });

    const data = await response.json();
    if (data.mood) {
      const color = data.mood === "happy" ? "#d1f7c4" : data.mood === "sad" ? "#fcd5ce" : "#e0e0e0";
      resultDiv.style.backgroundColor = color;
      resultDiv.textContent = `Your mood is: ${data.mood.toUpperCase()} (Confidence: ${Math.round(data.confidence * 100)}%)`;
    } else {
      resultDiv.textContent = "Unable to detect mood. Please try again.";
    }
  } catch (err) {
    console.error("Frontend error:", err);
    resultDiv.textContent = "Something went wrong while detecting mood.";
  }
}
