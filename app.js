let tasks = [];

function addEditTask() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const dueDate = document.getElementById("dueDate").value;
  const priority = document.getElementById("priority").value;

  const task = { title, description, dueDate, priority };
  tasks.push(task);

  displayTasks();
  clearForm();
}

function editTask(index) {
  const task = tasks[index];
  document.getElementById("title").value = task.title;
  document.getElementById("description").value = task.description;
  document.getElementById("dueDate").value = task.dueDate;
  document.getElementById("priority").value = task.priority;
}

function deleteTask(index) {
  tasks.splice(index, 1);
  displayTasks();
}

function filterTasks() {
  const searchInput = document.getElementById("searchInput").value.toLowerCase();
  const priorityFilter = document.getElementById("priorityFilter").value.toLowerCase();

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchInput) &&
    (priorityFilter === '' || task.priority.toLowerCase() === priorityFilter)
  );

  displayFilteredTasks(filteredTasks);
}

function displayTasks() {
  displayFilteredTasks(tasks);
}

function displayFilteredTasks(filteredTasks) {
  const upcomingTasks = filteredTasks.filter(task => !isOverdue(task.dueDate) && !taskIsCompleted(task));
  const overdueTasks = filteredTasks.filter(task => isOverdue(task.dueDate) && !taskIsCompleted(task));
  const completedTasks = filteredTasks.filter(task => taskIsCompleted(task));

  displayList("upcomingTasks", upcomingTasks);
  displayList("overdueTasks", overdueTasks);
  displayList("completedTasks", completedTasks);
  displayList("allTasks", filteredTasks);
}

function displayList(listId, taskList) {
  const list = document.getElementById(listId);
  list.innerHTML = "";
  taskList.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `${task.title} - Due: ${task.dueDate} - Priority: ${task.priority} 
      <button onclick="editTask(${index})">Edit</button> 
      <button onclick="deleteTask(${index})">Delete</button>`;
    list.appendChild(listItem);
  });
}

function isOverdue(dueDate) {
  const today = new Date();
  const due = new Date(dueDate);
  return due < today;
}

function taskIsCompleted(task) {
  return task.completed === true;
}

function clearForm() {
  document.getElementById("taskForm").reset();
}

// Example tasks for initialization
tasks = [
  { title: "Sample Task 1", description: "Description 1", dueDate: "2024-01-10", priority: "High", completed: false },
  { title: "Sample Task 2", description: "Description 2", dueDate: "2024-01-15", priority: "Medium", completed: false }
];

window.onload = function () {
  displayTasks();
};
