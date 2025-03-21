document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const editModal = document.getElementById("editModal");
    const editTaskInput = document.getElementById("editTaskInput");
    const saveEditBtn = document.getElementById("saveEditBtn");
    const closeModal = document.querySelector(".close");
    const clearAllBtn = document.getElementById("clearAllBtn");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let currentEditIndex = null;

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.classList.add("task-item");

            li.innerHTML = `
    <div class="task-content">
        <input type="checkbox" class="task-checkbox" onchange="toggleTask(${index})" ${task.completed ? 'checked' : ''}>
        <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
    </div>
    <div>
        <button class="edit" onclick="editTask(${index})"><i class="fa-solid fa-pen"></i></button>
        <button class="delete" onclick="deleteTask(${index})"><i class="fa-solid fa-trash"></i></button>
    </div>
`;

            taskList.appendChild(li);
        });
    }

    addTaskBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            saveTasks();
            taskInput.value = "";
            renderTasks();
        }
    });

    window.toggleTask = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    window.deleteTask = (index) => {
        if (confirm("Apakah kamu yakin ingin menghapus tugas ini?")) {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        }
    };

    window.editTask = (index) => {
        currentEditIndex = index;
        editTaskInput.value = tasks[index].text;
        editModal.style.display = "flex";
    };

    saveEditBtn.addEventListener("click", () => {
        if (editTaskInput.value.trim()) {
            tasks[currentEditIndex].text = editTaskInput.value.trim();
            saveTasks();
            editModal.style.display = "none";
            renderTasks();
        }
    });

    closeModal.addEventListener("click", () => {
        editModal.style.display = "none";
    });

    clearAllBtn.addEventListener("click", () => {
        if (tasks.length === 0) return;

        if (confirm("Apakah kamu yakin ingin menghapus semua tugas?")) {
            tasks = [];
            saveTasks();
            renderTasks();
        }
    });

    renderTasks();
});
