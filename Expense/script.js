const nameInput = document.getElementById("expense-name");
const valueInput = document.getElementById("expense-value");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("expense-list");
const totalDisplay = document.getElementById("total-expense");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function saveToLocalStorage() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function updateTotal() {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  totalDisplay.textContent = `Total: ৳${total.toFixed(2)}`;
}

function renderExpenses() {
  list.innerHTML = "";
  expenses.forEach((expense, index) => {
    const li = document.createElement("li");
    li.className = "bg-gray-50 p-3 rounded shadow flex justify-between items-center";

    li.innerHTML = `
      <div>
        <span class="font-medium">${expense.name}</span>
        <span class="text-green-600 font-semibold ml-2">৳${expense.amount.toFixed(2)}</span>
      </div>
      <div class="space-x-2">
        <button class="edit-btn bg-yellow-400 px-2 py-1 rounded text-white" data-index="${index}">Edit</button>
        <button class="delete-btn bg-red-500 px-2 py-1 rounded text-white" data-index="${index}">Delete</button>
      </div>
    `;
    list.appendChild(li);
  });

  attachDeleteListeners();
  attachEditListeners();
  updateTotal();
}

function attachDeleteListeners() {
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const index = parseInt(e.target.dataset.index);
      expenses.splice(index, 1);
      saveToLocalStorage();
      renderExpenses();
    });
  });
}

function attachEditListeners() {
  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const index = parseInt(e.target.dataset.index);
      const expense = expenses[index];
      const newName = prompt("Edit name:", expense.name);
      const newAmount = parseFloat(prompt("Edit amount:", expense.amount));

      if (newName && !isNaN(newAmount) && newAmount > 0) {
        expenses[index] = { name: newName.trim(), amount: newAmount };
        saveToLocalStorage();
        renderExpenses();
      }
    });
  });
}

addBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const amount = parseFloat(valueInput.value);

  if (name === "" || isNaN(amount) || amount <= 0) {
    alert("Please enter a valid name and amount.");
    return;
  }

  expenses.push({ name, amount });
  saveToLocalStorage();
  renderExpenses();

  nameInput.value = "";
  valueInput.value = "";
});

// Initial render
renderExpenses();
