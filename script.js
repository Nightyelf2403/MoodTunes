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

  const select = document.createElement("select");
  select.id = `answer-${index}`;
  select.className = "dropdown";
  select.onfocus = () => startTimes[index] = Date.now();

  const options = [
    "",
    "Very positive",
    "Somewhat positive",
    "Neutral",
    "Somewhat negative",
    "Very negative"
  ];

  options.forEach(opt => {
    const option = document.createElement("option");
    option.value = opt;
    option.textContent = opt;
    select.appendChild(option);
  });

  formDiv.appendChild(label);
  formDiv.appendChild(select);
});

function showLoadingSpinner() {
  resultDiv.innerHTML = "<div class='spinner'></div><p>Analyzing your mood...</p>";
}

function typeOutText(element, text, speed = 30) {
  element.textContent = "";
  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(interval);
    }
  }, speed);
}

async function submitAnswers() {
  const conversation = questions.map((q, i) => {
    const input = document.getElementById(`answer-${i}`);
    const time = startTimes[i] ? (Date.now() - startTimes[i]) / 1000 : 0;
    return { question: q, answer: input.value, time: time.toFixed(1) };
  });

  showLoadingSpinner();

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
      const message = `Your mood is: ${data.mood.toUpperCase()} (Confidence: ${Math.round(data.confidence * 100)}%)`;
      typeOutText(resultDiv, message);
    } else {
      resultDiv.textContent = "Unable to detect mood. Please try again.";
    }
  } catch (err) {
    console.error("Frontend error:", err);
    resultDiv.textContent = "Something went wrong while detecting mood.";
  }
}
