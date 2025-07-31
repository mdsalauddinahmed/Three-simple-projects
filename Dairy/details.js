const entryContainer = document.getElementById("entry-detail");
const params = new URLSearchParams(window.location.search);
const entryIndex = params.get("entry");

const entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];

if (entries[entryIndex]) {
  const { text, emoji, image } = entries[entryIndex];
  entryContainer.innerHTML = `
    <p class="mb-4">${text}</p>
    <p class="text-xl mb-4">${emoji}</p>
    ${image ? `<img src="${image}" class="w-full rounded" />` : ""}
  `;
} else {
  entryContainer.innerHTML = `<p class="text-red-500">Entry not found.</p>`;
}
