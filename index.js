let input = document.querySelector(".type");
let submit = document.querySelector(".submit");
let tasks = document.querySelector(".tasks");
// let task = document.querySelector(".task");

let arrayOfTasks = [];

if (window.localStorage.getItem("task")) {
  arrayOfTasks = JSON.parse(window.localStorage.getItem("task"));
}

addDataToPage();

submit.onclick = function () {
  if (input.value != "") {
    addDataToArray(input.value);
    input.value = "";
  }
};

function addDataToArray(textValue) {
  const data = {
    text: textValue,
    completed: false,
    id: Date.now(),
  };
  arrayOfTasks.push(data);
  addDataToPage();
  addDateToLoacl(arrayOfTasks);
}

function addDateToLoacl(arr) {
  window.localStorage.setItem("task", JSON.stringify(arr));
  arrayOfTasks = JSON.parse(window.localStorage.getItem("task"));
}

function addDataToPage() {
  tasks.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    let div = document.createElement("div");
    let text = document.createTextNode(task.text);
    let btn = document.createElement("button");
    btn.classList.add("del");
    btn.appendChild(document.createTextNode("Delete"));
    if (task.completed == true) {
      div.classList.add("task");
      div.classList.add("done");
    } else {
      div.classList.add("task");
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(text);
    div.appendChild(btn);
    tasks.appendChild(div);
  });
  tasks.style.display = "block";
  TasksDivHidden();
}

tasks.addEventListener("click", function (e) {
  if (e.target.classList.contains("del")) {
    deleteTask(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
    TasksDivHidden();
  }
  if (e.target.classList.contains("task")) {
    taskCompleted(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});

function deleteTask(id) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != id);
  addDateToLoacl(arrayOfTasks);
}

function taskCompleted(id) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == id) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addDateToLoacl(arrayOfTasks);
}

function TasksDivHidden() {
  if (tasks.innerHTML == "") {
    tasks.style.display = "none";
  }
}
