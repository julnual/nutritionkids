
function renderPrint() {
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get("name");
  const hn = urlParams.get("hn");
  const score = urlParams.get("score");
  const rec = urlParams.get("rec");

  document.getElementById("printContent").innerHTML = `
    <p><strong>ชื่อผู้ป่วย:</strong> ${name}</p>
    <p><strong>HN:</strong> ${hn}</p>
    <p><strong>คะแนน:</strong> ${score}</p>
    <p><strong>คำแนะนำ:</strong> ${rec}</p>
    <p><strong>วันที่:</strong> ${new Date().toLocaleString()}</p>
  `;
}
