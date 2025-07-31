document.addEventListener('DOMContentLoaded', () => {
  const Input_text = document.getElementById("todo-input");
  const todoAddButton = document.getElementById("add-button");
  const todoList = document.getElementById("todoList");

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  tasks.forEach(task => renderTask(task));

  todoAddButton.addEventListener("click", () => {
    const taskText = Input_text.value.trim();
    if (taskText === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTask(newTask);
    Input_text.value = "";
  });

  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    li.className = "todo-item";

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text;
    if (task.completed) span.classList.add("completed");

    // Complete checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      span.classList.toggle("completed");
      saveTasks();
    });

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.innerHTML = "✏️";
    editBtn.className = "edit-btn";
    editBtn.addEventListener("click", () => {
      const newText = prompt("Edit task:", task.text);
      if (newText !== null && newText.trim() !== "") {
        task.text = newText.trim();
        span.textContent = task.text;
        saveTasks();
      }
    });

    // Remove button
    const removeBtn = document.createElement("button");
    removeBtn.innerHTML = "❌";
    removeBtn.className = "remove-btn";
    removeBtn.addEventListener("click", () => {
      tasks = tasks.filter(t => t.id !== task.id);
      li.remove();
      saveTasks();
    });

    const actionsDiv = document.createElement("div");
    actionsDiv.className = "actions";
    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(removeBtn);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(actionsDiv);
    todoList.appendChild(li);
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
