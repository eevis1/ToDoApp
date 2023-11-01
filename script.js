// Define variables
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter"); 
let tasks = [];

// Get the saved tasks from localStorage
const storedTasks = localStorage.getItem('tasks');
if (storedTasks) {
  tasks = JSON.parse(storedTasks);
  displayTasks();
}

taskInput.addEventListener("input", function () {
  // Poista virheilmoitus ja punainen reunus
  taskInput.classList.remove("error");
});

// Function to add task to the list
function addTask() {
  // Get the task name
  const taskName = taskInput.value.trim();

  // Check if task name contains invalid characters
  if (!/^[a-zA-Z0-9 ]*$/.test(taskName)) {
    taskInput.classList.add("error");
    alert("Task name contains invalid characters. Please use only letters, numbers, and spaces.");
    return;
  } 

  // Check if task name is blank or too short
  if (taskName === "" || taskName.length < 3) {
    taskInput.classList.add("error");
    alert("Task name must be at least 3 characters long.");
    return;
  }

  // Add the task to the list
  tasks.push({ name: taskName, done: false });
  localStorage.setItem('tasks', JSON.stringify(tasks)); 

  taskInput.value = '';
  displayTasks();
}  

function clearTasks() {
  // Empty the task list
  tasks = [];
  localStorage.removeItem('tasks');
  displayTasks();
}

// Display the tasks on screen
function displayTasks() {
  taskList.innerHTML = ''; // Empty the list

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    const newTaskItem = document.createElement('li');
    newTaskItem.classList.add('taskItem');
    newTaskItem.innerText = task.name;
    if (task.done) {
      newTaskItem.classList.add('done');
    }

    const doneCheckbox = document.createElement('input');
    doneCheckbox.type = 'checkbox';
    doneCheckbox.checked = task.done;
    doneCheckbox.addEventListener('change', function () {
      tasks[i].done = doneCheckbox.checked;
      newTaskItem.classList.toggle("done", doneCheckbox.checked);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      updateTaskCounter();
    });
    newTaskItem.insertBefore(doneCheckbox, newTaskItem.firstChild);

    const removeImage = document.createElement('img');
    removeImage.src = 'remove.png';
    removeImage.alt = 'Remove';
    removeImage.classList.add('removeButton');
    removeImage.addEventListener('click', function () {
      tasks.splice(i, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      displayTasks(); // Update the screen
      updateTaskCounter();
    });
    newTaskItem.appendChild(removeImage);

    taskList.appendChild(newTaskItem);
  }
  updateTaskCounter();
}

// Function to update the task counter
function updateTaskCounter() {
  const openTasks = tasks.filter((task) => !task.done).length;
  taskCounter.innerText = `Open tasks: ${openTasks}`;
}

// Function to show the active tasks
function showActiveTasks() {
  for (let i = 0; i < taskList.children.length; i++) {
    const taskItem = taskList.children[i];
    taskItem.classList.remove('invisible');
    if (taskItem.classList.contains('done')) {
      taskItem.classList.add('invisible');
    } else {
      taskItem.classList.remove('invisible');
    }
  } 
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to show the completed tasks
function showCompletedTasks() {
  for (let i = 0; i < taskList.children.length; i++) {
    taskList.children[i].classList.remove('invisible');
    if (taskList.children[i].classList.contains('done')) {
      taskList.children[i].classList.add('visible');
    }
    else {
      taskList.children[i].classList.add('invisible');
    }
  } 
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to show all the tasks
function showAllTasks() {
  for (let i = 0; i < taskList.children.length; i++) {
    taskList.children[i].classList.remove('invisible');
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
