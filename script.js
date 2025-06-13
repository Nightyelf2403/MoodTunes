const questions = [
  {
    q: "How did you sleep last night?",
    options: ["Great 😴", "Okay 😐", "Poor 😫"]
  },
  {
    q: "What’s your energy level now?",
    options: ["High ⚡", "Moderate 🙂", "Low 💤"]
  },
  {
    q: "What are you doing today?",
    options: ["Studying 📘", "Relaxing 🛋️", "Working 💼"]
  },
  {
    q: "Are you excited about anything?",
    options: ["Yes! 🎉", "Sort of 🤷", "Not really 🙁"]
  },
  {
    q: "How’s your mood compared to yesterday?",
    options: ["Better 😊", "Same 😐", "Worse 😞"]
  },
  {
    q: "Choose one word that fits you now:",
    options: ["Focused 🎯", "Tired 💤", "Happy 😄", "Bored 😐"]
  }
];

let current = 0;
let responses = [];
let startTime;

function loadQuestion() {
  const q = questions[current];
  document.getElementById("question-text").innerText = q.q;
  document.getElementById("counter").innerText = `🟢 Question ${current + 1} of ${questions.length}`;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.className = "option-btn";
    btn.onclick = () => handleAnswer(opt, btn);
    optionsDiv.appendChild(btn);
  });

  startTime = Date.now();
}

function handleAnswer(answer, btn) {
  const timeTaken = (Date.now() - startTime) / 1000;

  // Highlight selected button
  document.querySelectorAll(".option-btn").forEach(b => b.disabled = true);
  btn.classList.add("selected");

  responses.push({
    question: questions[current].q,
    answer,
    time: timeTaken.toFixed(2)
  });

  setTimeout(() => {
    current++;
    if (current < questions.length) {
      loadQuestion();
    } else {
      submitResponses();
    }
  }, 600);
}

async function submitResponses() {
  const resultBox = document.getElementById("result");
  document.getElementById("question-box").style.display = "none";
  resultBox.innerHTML = `<div class="spinner"></div><p>Analyzing your mood...</p>`;

  try {
    const response = await fetch("https://moodtunes-gjkh.onrender.com/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversation: responses })
    });

    const data = await response.json();
    resultBox.innerHTML = `
      <div class="fade-in">
        <h2>Your mood: ${data.mood.toUpperCase()}</h2>
        <p>Confidence: ${(data.confidence * 100).toFixed(1)}%</p>
      </div>
    `;
  } catch (err) {
    resultBox.innerHTML = "❌ Something went wrong. Please try again later.";
  }
}

window.onload = loadQuestion;
