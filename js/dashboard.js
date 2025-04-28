
const sheetURL = "https://script.google.com/macros/s/AKfycbyvgq-Yl7AuGhsjLAxNXN_FCzW0mrGVtNixemxtyEgPNKrT9HmgcBOnePTWBxL6yjCqtQ/exec";
fetch(sheetURL)
  .then(res => res.json())
  .then(data => {
    const body = document.getElementById("resultBody");
    let total = 0, low = 0, med = 0, high = 0;
    data.forEach(row => {
      total++;
      const rec = row["recommendation"];
      if (rec.includes("ต่ำ")) low++;
      else if (rec.includes("ปานกลาง")) med++;
      else if (rec.includes("สูง")) high++;

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${new Date(row["timestamp"]).toLocaleString()}</td>
        <td>${row["name"]}</td>
        <td>${row["hn"]}</td>
        <td>${row["score"]}</td>
        <td>${row["recommendation"]}</td>
      `;
      body.appendChild(tr);
    });
    document.getElementById("summary").innerHTML = `
      <p>จำนวนทั้งหมด: ${total} ราย</p>
      <p>เสี่ยงต่ำ: ${low} | ปานกลาง: ${med} | สูง: ${high}</p>
    `;
  });
