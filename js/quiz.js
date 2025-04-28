// ดึงข้อมูลจาก URL
const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get("name");
const hn = urlParams.get("hn");

console.log("ชื่อ:", name);
console.log("HN:", hn);

if (name) {
  document.getElementById("quizTitle").textContent += ` - คุณ ${name}`;
}

const scriptURL = "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLglyKXleYV7xoQG0daZIK_AHCl-_bjmyGCU7eEEqBGaKYa3_ypm5Zrx0WY5yMzuaukiIwHmdMrGd482HYDn2FNGWSY_qQcGh7evOAcsE_m7Mn043h5ywfnH6fs18bfeeUBAdu6hW4gml6BSD1Oea4xuJpI1wIQl3uR1xTrMuUBJ6j2i_qqsPYzh974X_VAROXPEY5BWItXaNWnjfd6-qMOkIwzG9_Y1-2jiIXJb_6-GMNCntepNf_Dndc2qPUWkThURJONNmcdsH0s1OxzgAfGjIHEgzhoQMAZG91s4&lib=MyHr3CPImKpOGbA8w0JmCo9kcHQ6lO-wB";

document.getElementById("quizForm").addEventListener("submit", function(event) {
  event.preventDefault();
  let score = 0;

  const answers = {
    q1: { correct: "b", weight: 1 },
    q2: { correct: "a", weight: 2 },
    q3: { correct: "a", weight: 1 },
    q4: { correct: "b", weight: 1 }
  };

  Object.keys(answers).forEach(q => {
    const selected = document.querySelector(`input[name="${q}"]:checked`);
    if (selected && selected.value === answers[q].correct) {
      score += answers[q].weight;
    }
  });

  let recommendation = "";
  let riskClass = "";
  if (score === 0) {
    recommendation = "เสี่ยงต่ำ → ประเมินซ้ำอีก 1 สัปดาห์";
    riskClass = "low-risk";
  } else if (score >= 1 && score <= 3) {
    recommendation = "เสี่ยงปานกลาง → แจ้งแพทย์เจ้าของไข้";
    riskClass = "medium-risk";
  } else if (score >= 4) {
    recommendation = "เสี่ยงสูง → แจ้งแพทย์เจ้าของไข้";
    riskClass = "high-risk";
  }

  const resultBox = document.getElementById("result");
  resultBox.className = `result ${riskClass}`;
  resultBox.innerHTML = `
    ได้คะแนน: <strong>${score} / 5</strong><br>
    <div class="recommendation">${recommendation}</div>
  `;
  resultBox.style.display = "block";

  // ส่งข้อมูลไป Google Sheets
  fetch(scriptURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name || "ไม่ระบุ",
      hn: hn || "ไม่ระบุ",
      score: score,
      recommendation: recommendation
    })
  })
  .then(res => console.log("ส่งข้อมูลสำเร็จ"))
  .catch(err => console.error("เกิดข้อผิดพลาด:", err));
});
