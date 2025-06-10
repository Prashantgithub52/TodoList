const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const clearBtn = document.getElementById("clearBtn");

function updateClearButton() {
  const tasks = taskList.querySelectorAll("li");
  const checkedTasks = taskList.querySelectorAll("input[type='checkbox']:checked");

  if (tasks.length === 0) {
    clearBtn.textContent = "Clear All";
    clearBtn.disabled = true;
    clearBtn.classList.add("opacity-50", "cursor-not-allowed");
  } else if (checkedTasks.length > 0) {
    clearBtn.textContent = "Clear Selected";
    clearBtn.disabled = false;
    clearBtn.classList.remove("opacity-50", "cursor-not-allowed");
  } else {
    clearBtn.textContent = "Clear All";
    clearBtn.disabled = false;
    clearBtn.classList.remove("opacity-50", "cursor-not-allowed");
  }
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  const li = document.createElement("li");
  li.className = "flex items-center justify-between bg-white/10 px-5 py-4 rounded-xl shadow-md hover:shadow-lg transition";

  const label = document.createElement("label");
  label.className = "flex items-center gap-3 cursor-pointer";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "form-checkbox w-5 h-5 text-green-500 rounded-full cursor-pointer";
  checkbox.addEventListener("change", updateClearButton);

  const span = document.createElement("span");
  span.textContent = taskText;
  span.className = "text-white text-lg";

  label.appendChild(checkbox);
  label.appendChild(span);

  const delBtn = document.createElement("button");
  delBtn.innerHTML = "🗑️";
  delBtn.title = "Delete task";
  delBtn.className = "text-white text-xl hover:text-red-500 transition-transform hover:scale-125 cursor-pointer";
  delBtn.onclick = () => {
    li.remove();
    updateClearButton();
  };

  li.appendChild(label);
  li.appendChild(delBtn);
  taskList.appendChild(li);

  taskInput.value = "";
  updateClearButton();
}

function handleClear() {
  const checkedTasks = taskList.querySelectorAll("input[type='checkbox']:checked");
  const allTasks = taskList.querySelectorAll("li");

  if (checkedTasks.length > 0) {
    checkedTasks.forEach(checkbox => checkbox.closest("li").remove());
  } else {
    allTasks.forEach(task => task.remove());
  }

  updateClearButton();
}

taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTask();
  }
});

updateClearButton(); // Initialize button state
