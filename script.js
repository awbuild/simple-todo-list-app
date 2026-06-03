// Your Todo List App implementation will go here!

let todos = [];

// TEST...
console.log("Script.js working!");

// DOM
let form = document.querySelector("#todo-form");
let input = document.querySelector("#todo-input");
let error = document.querySelector("#error-message");
let list = document.querySelector("#todo-list");

console.log("FORM", form);
console.log("INPUT", input);
console.log("ERROR", error);
console.log("LIST", list);

//PHASE 2 - ADD TODO 
function createTodo(todo) {
  console.log("ADD TODO", todo);

  let li = document.createElement("li");
  li.classList.add("todo-item");
  li.setAttribute("data-id", todo.id);

  if (todo.completed) {
    li.classList.add("completed");
  }

  let checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.checked = todo.completed;
  checkBox.classList.add("todo-checkbox");
  checkBox.setAttribute("aria-label", "Mark todo complete");

  li.appendChild(checkBox);

  let span = document.createElement("span");
  span.textContent = todo.text;
  span.classList.add("todo-text");

  li.appendChild(span);

  //PHASE 2 - DELETE
  let deLbtn = document.createElement("button");
  deLbtn.textContent = "Delete";
  deLbtn.classList.add("delete-btn");
  deLbtn.setAttribute("aria-label", "Delete todo");

  li.appendChild(deLbtn);

  list.appendChild(li);
}

list.addEventListener("click", function (event) {
  console.log("LIST CLICKED", event.target);

  let li = event.target.closest(".todo-item");
  console.log("CLOSEST LI", li);

  if (!li) return;

  let id = li.getAttribute("data-id");
  console.log("TODO ID", id);

  if (event.target.classList.contains("delete-btn")) {
    console.log("DELETE CLICKED", id);

    todos = todos.filter(function (item) {
      return item.id !== id;
    });

    li.remove();

    saVtodos();
  }

  if (event.target.classList.contains("todo-checkbox")) {
    console.log("CHECKBOX CLICKED", id);

    todos.forEach(function (item) {
      if (item.id === id) {
        item.completed = event.target.checked;
        console.log("TOGGLED", item);
      }
    });

    li.classList.toggle("completed", event.target.checked);

    saVtodos();
  }
});

//PHASE 3 - localStorage SAVE
function saVtodos() {
  console.log("SAVE Todos");

  localStorage.setItem("todos", JSON.stringify(todos));
}

//PHASE 3 - localStorage LOAD
function loaDtodos() {
  console.log("LOAD Todos");

  let stoRage = localStorage.getItem("todos");

  if (stoRage) {
    todos = JSON.parse(stoRage);
    console.log("LOAD COMPLETE", todos);

    todos.forEach(function (todo) {
      createTodo(todo);
    });
  }
}

//PHASE 1, 2 - SUBMIT
form.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("SUBMITTED");

  let text = input.value;
  console.log("INPUT", text);

  if (text.trim().length < 3) {
    error.textContent = "Error - minimum 3 characters";
    error.classList.add("show");
    console.log("Error - minimum 3 characters");
    return;
  }

  error.textContent = "";
  error.classList.remove("show");

  let todo = {
    id: Date.now().toString(),
    text: text,
    completed: false,
    createdAt: Date.now(),
  };

  console.log("TODO", todo);

  todos.push(todo);
  console.log("TODOS", todos);

  createTodo(todo);

  saVtodos();

  input.value = "";
});

// PHASE 4
loaDtodos();
