let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let taskDiv = document.querySelector(".tasks");

//empty array to store the tasks
let arrayOfTasks = [];
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// trigger get data from local storage function
getDataFromLocalStorage();

// add task
submit.onclick = function () {
  if (input.value !== "") {
    //input.value is the value that the person will add
    addTaskToArray(input.value); // add task to array of tasks
    input.value = ""; //empty input field
  }
};

// Click On Task Element
taskDiv.addEventListener("click", (e) => {
  // Delete Button
  if (e.target.classList.contains("del")) {
    // Remove Task From Local Storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    // Remove Element From Page
    e.target.parentElement.remove();
  }

  // Task Element
  if (e.target.classList.contains("task")) {
    // Toggle Completed For The Task
    ToggleStatusTaskWith(e.target.getAttribute("data-id"));
    // Toggle Done Class
    e.target.classList.toggle("done");
  }
});

function addTaskToArray(taskText) {
  // task data
  const task = {
    id: Date.now(), // will print for you the date of today
    title: taskText,
    completed: false,
  };
  // push tasks to array of tasks
  arrayOfTasks.push(task);

  //add elemnts to page
  addElementsTopageFrom(arrayOfTasks);
  // add taxt to local storage
  addDataToLocalStorage(arrayOfTasks);
}

function addElementsTopageFrom(arrayOfTasks) {
  // empty the tasks div
  taskDiv.innerHTML = "";
  // looping on array of tasks
  arrayOfTasks.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";

    //check if task is done
    if (task.completed === true) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    // creat delete button
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    // append buttun to main div
    div.appendChild(span);
    // add tasks div to main div
    taskDiv.appendChild(div);
  });
}

function addDataToLocalStorage(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsTopageFrom(tasks);
  }
}

function deleteTaskWith(taskId) {
  // For Explain Only
  // for (let i = 0; i < arrayOfTasks.length; i++) {
  //   console.log(`${arrayOfTasks[i].id} === ${taskId}`);
  // }
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorage(arrayOfTasks);
}

function ToggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addDataToLocalStorage(arrayOfTasks);
}
