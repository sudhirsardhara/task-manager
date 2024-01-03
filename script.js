document.addEventListener('DOMContentLoaded', function () {
    loadTasks();

    document.getElementById('taskForm').addEventListener('submit', function (event) {
        event.preventDefault();
        addTask();
    });
});

function addTask() {
    var title = document.getElementById('title').value;
    var description = document.getElementById('description').value;
    var dueDate = document.getElementById('due_date').value;
    var priority = document.getElementById('priority').value;

    if (!title || !description || !dueDate) {
        alert('Please fill in all fields.');
        return;
    }

    var task = {
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority
    };

    var tasks = getTasksFromStorage();
    tasks.push(task);
    saveTasksToStorage(tasks);

    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('due_date').value = '';

    loadTasks();
}

function loadTasks() {
    var tasks = getTasksFromStorage();

    var taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(function (task) {
        var listItem = document.createElement('li');
        listItem.innerHTML = `
            <span class="${getPriorityClass(task.priority)}">${task.title} - ${task.description} - Due: ${task.dueDate} - Priority: ${task.priority}</span>
            <button onclick="deleteTask('${task.title}')">Delete</button>
        `;
        taskList.appendChild(listItem);
    });
}

function deleteTask(title) {
    var tasks = getTasksFromStorage();
    tasks = tasks.filter(task => task.title !== title);
    saveTasksToStorage(tasks);
    loadTasks();
}

function getPriorityClass(priority) {
    switch (priority) {
        case 'High':
            return 'high-priority';
        case 'Medium':
            return 'medium-priority';
        case 'Low':
            return 'low-priority';
        default:
            return '';
    }
}

function getTasksFromStorage() {
    var storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
}

function saveTasksToStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
