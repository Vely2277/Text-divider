function splitText() {
  const text = document.getElementById("inputText").value.trim();
  const words = text.split(/\s+/);
  const count = parseInt(document.getElementById("wordCount").value, 10);
  const addMessages = document.getElementById("addMessages").checked;

  const outputArea = document.getElementById("outputArea");
  outputArea.innerHTML = "";

  if (words.length === 0 || isNaN(count) || count <= 0) {
    alert("Please input valid text and a word count.");
    return;
  }

  const totalChunks = Math.ceil(words.length / count);

  for (let i = 0; i < totalChunks; i++) {
    const chunkWords = words.slice(i * count, (i + 1) * count);
    let chunkText = chunkWords.join(" ");

    // If user wants the message added
    if (addMessages) {
      if (i === 0) {
        chunkText = "THIS IS THE FIRST CODE, IT IS TOO LONG, PLEASE CALM DOWN AND WAIT FOR THE SECOND CODE\n\n" + chunkText;
      } else if (i === totalChunks - 1) {
        chunkText = "THIS IS THE LAST CODE, PLEASE READ AND ANALYZE THEN I WILL TELL YOU MY EXACT ISSUE\n\n" + chunkText;
      } else {
        const nth = getOrdinal(i + 1); // e.g. 2 → SECOND
        const next = getOrdinal(i + 2); // e.g. 3 → THIRD
        chunkText = `THIS IS THE ${nth} CODE, IT IS TOO LONG, PLEASE CALM DOWN AND WAIT FOR THE ${next} CODE\n\n` + chunkText;
      }
    }

    const splitBox = document.createElement("div");
    splitBox.className = "splitBox";

    const textarea = document.createElement("textarea");
    textarea.readOnly = true;
    textarea.value = chunkText;

    const copyBtn = document.createElement("button");
    copyBtn.className = "copyBtn";
    copyBtn.innerText = "Copy";
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(chunkText);
      copyBtn.innerText = "Copied!";
      setTimeout(() => (copyBtn.innerText = "Copy"), 2000);
    };

    splitBox.appendChild(copyBtn);
    splitBox.appendChild(textarea);
    outputArea.appendChild(splitBox);
  }
}

// Helper function to convert numbers to ordinal words (2 → SECOND, 3 → THIRD, etc.)
function getOrdinal(n) {
  const ordinals = [
    "", "FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH", "SIXTH", "SEVENTH", "EIGHTH", "NINTH", "TENTH",
    "ELEVENTH", "TWELFTH", "THIRTEENTH", "FOURTEENTH", "FIFTEENTH", "SIXTEENTH", "SEVENTEENTH",
    "EIGHTEENTH", "NINETEENTH", "TWENTIETH"
  ];
  return ordinals[n] || `${n}TH`;
}