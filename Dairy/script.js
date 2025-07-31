const saveBtn = document.getElementById("save-entry");
const textArea = document.getElementById("diary-text");
const emojiInput = document.getElementById("emoji");
const imageInput = document.getElementById("image-upload");
const entriesContainer = document.getElementById("entries");

let entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];

function saveEntriesToStorage() {
  localStorage.setItem("diaryEntries", JSON.stringify(entries));
}

function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

function renderEntries() {
  entriesContainer.innerHTML = "";
  entries.forEach((entry, index) => {
    const card = document.createElement("div");
    card.className = "bg-white p-4 rounded shadow";

    card.innerHTML = `
  <div class="mb-2 text-gray-500 text-sm">${formatDate(entry.timestamp)}</div>
  <p class="mb-2 text-lg whitespace-pre-wrap">${entry.text}</p>
  <p class="mb-2 text-2xl">${entry.emoji || ""}</p>
  ${entry.image ? `<img src="${entry.image}" class="w-full max-h-60 object-cover rounded mb-2" />` : ""}
  <button data-index="${index}" class="delete-entry text-red-500 hover:underline text-sm">🗑️ Delete</button>
`;



    entriesContainer.appendChild(card);
  });

  // Bind delete buttons
  document.querySelectorAll(".delete-entry").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = btn.getAttribute("data-index");
      entries.splice(idx, 1);
      saveEntriesToStorage();
      renderEntries();
    });
  });
}

saveBtn.addEventListener("click", () => {
  const text = textArea.value.trim();
  const emoji = emojiInput.value.trim();
  const imageFile = imageInput.files[0];

  if (!text) return;

  const reader = new FileReader();
  reader.onload = () => {
    const imageData = imageFile ? reader.result : null;

    const newEntry = {
      text,
      emoji,
      image: imageData,
      timestamp: Date.now(),
    };

    entries.unshift(newEntry);
    saveEntriesToStorage();
    renderEntries();

    // Reset form
    textArea.value = "";
    emojiInput.value = "";
    imageInput.value = "";
  };

  if (imageFile) {
    reader.readAsDataURL(imageFile);
  } else {
    reader.onload();
  }
});

renderEntries();
