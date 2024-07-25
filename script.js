document.addEventListener('DOMContentLoaded', () => {
    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Create the addTask Function
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create new task element
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');  // Use classList.add to add the class
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

        // Save tasks to local storage
        saveTasks();
    }

    // Save tasks to local storage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(task => {
            tasks.push(task.firstChild.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from local storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(taskText => {
            const li = document.createElement('li');
            li.textContent = taskText;

            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.classList.add('remove-btn');  // Use classList.add to add the class
            removeBtn.onclick = () => {
                taskList.removeChild(li);
                saveTasks(); // Update Local Storage after removal
            };

            li.appendChild(removeBtn);
            taskList.appendChild(li);
        });
    }

    // Attach Event Listeners
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {  // Check if Enter key is pressed
            addTask();
        }
    });

    // Load tasks on page load
    loadTasks();
});