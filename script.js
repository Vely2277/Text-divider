function splitText() {
  const text = document.getElementById("inputText").value.trim();
  const words = text.split(/\s+/); // split on any space, tab, or newline
  const count = parseInt(document.getElementById("wordCount").value, 10);

  const outputArea = document.getElementById("outputArea");
  outputArea.innerHTML = ""; // clear previous output

  if (words.length === 0 || isNaN(count) || count <= 0) {
    alert("Please input valid text and a word count.");
    return;
  }

  const totalChunks = Math.ceil(words.length / count);

  for (let i = 0; i < totalChunks; i++) {
    const chunkWords = words.slice(i * count, (i + 1) * count);
    const chunkText = chunkWords.join(" ");

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