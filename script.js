function splitText() {
  const input = document.getElementById("inputText").value.trim();
  const wordCount = parseInt(document.getElementById("wordCount").value);
  const addMessages = document.getElementById("addMessages").checked;

  const outputArea = document.getElementById("outputArea");
  outputArea.innerHTML = ""; // clear old results

  if (!input || isNaN(wordCount) || wordCount <= 0) {
    alert("Please enter valid text and a word count.");
    return;
  }

  const words = input.split(/\s+/);
  const totalChunks = Math.ceil(words.length / wordCount);

  for (let i = 0; i < totalChunks; i++) {
    const chunkWords = words.slice(i * wordCount, (i + 1) * wordCount);
    let chunkText = chunkWords.join(" ");

    if (addMessages) {
      if (i === 0) {
        chunkText = "THIS IS THE FIRST CODE, IT IS TOO LONG, PLEASE CALM DOWN AND WAIT FOR THE SECOND CODE\n\n" + chunkText;
      } else if (i === totalChunks - 1) {
        chunkText = "THIS IS THE LAST CODE, PLEASE READ AND ANALYZE THEN I WILL TELL YOU MY EXACT ISSUE\n\n" + chunkText;
      } else {
        const next = i + 2;
        chunkText = `THIS IS THE ${ordinal(i + 1)} CODE, IT IS TOO LONG, PLEASE CALM DOWN AND WAIT FOR THE ${ordinal(next)} CODE\n\n` + chunkText;
      }
    }

    const box = document.createElement("div");
    box.className = "splitBox";

    const textarea = document.createElement("textarea");
    textarea.readOnly = true;
    textarea.value = chunkText;

    const btn = document.createElement("button");
    btn.className = "copyBtn";
    btn.textContent = "Copy";
    btn.onclick = () => {
      navigator.clipboard.writeText(chunkText);
      btn.textContent = "Copied!";
      setTimeout(() => btn.textContent = "Copy", 2000);
    };

    box.appendChild(btn);
    box.appendChild(textarea);
    outputArea.appendChild(box);
  }
}

function ordinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}