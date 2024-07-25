document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false to avoid duplicate save
    }

    // Save tasks to Local Storage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(task => {
            tasks.push(task.firstChild.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Create the addTask Function
    function addTask(taskText, save = true) {
        if (taskText.trim() === '') {
            return;
        }

        // Create new task element
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');
        removeBtn.onclick = () => {
            taskList.removeChild(li);
            saveTasks(); // Update Local Storage after removal
        };

        // Append remove button to task element
        li.appendChild(removeBtn);

        // Append task element to list
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = '';

        // Save tasks to Local Storage if needed
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Attach Event Listeners
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        addTask(taskText); // Add task with saving
    });

    taskInput.addEventListener('keypress', (e) => {
        if (event.key === 'Enter') {  // Check if Enter key is pressed
            const taskText = taskInput.value.trim();
            addTask(taskText); // Add task with saving
        }
    });

    // Load tasks on page load
    loadTasks();
});