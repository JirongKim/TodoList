let todoInput = document.querySelector("#todoInput");
let todoList = document.querySelector(".todoList");
let todoListAppend = document.querySelector(".todoList ul");

let username = localStorage.getItem("username");
if (!username) {
  showFirstUse();
} else {
  showContainer();
}

let todoArr = [];
let localStorage_todoList = localStorage.getItem("todoList");
if(localStorage_todoList) {
  let array = JSON.parse(localStorage_todoList);
  array.forEach((todo, i)=>{
    todoArr.push(todo);
    let li = newTodoList(todo[0]);
    if(todo[1] === true) {
      li.childNodes[0].setAttribute("class", "todoList-checkBoxGroup checked");
    }
    li.setAttribute("number", i);
    todoListAppend.appendChild(li);
  })
}

let usernameInput = document.querySelector("#usernameInput");
usernameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    username = usernameInput.value;
    localStorage.setItem("username", username);
    showFirstUse(false);
    showContainer();
  }
});

function showContainer() {
  document.querySelector(".container").classList.remove("hidden");
  document.querySelector(".greeting span").innerHTML = username;
}

function showFirstUse(visiable = true) {
  if (visiable === false) {
    document.querySelector(".firstUse").classList.add("hidden");
  } else {
    document.querySelector(".firstUse").classList.remove("hidden");
  }
}

setInterval(function () {
  let date = new Date();
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");

  document.querySelector("#hours").innerHTML = hours;
  document.querySelector("#minutes").innerHTML = minutes;
}, 1000);


function getLocationWeather() {
  if (navigator.geolocation) {
    // GPS를 지원하면
    navigator.geolocation.getCurrentPosition(
      function (position) { //success
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        getWeather(latitude, longitude);
      },
      function (error) { //error
        console.error(error);
      },
      { //options
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity,
      }
    );
  } else {
    alert("GPS를 지원하지 않습니다");
  }
}

function getWeather(lat, lon){
  let key = `1eef797b323a1e22bb5dfee486c644f8`;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;


  fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    document.querySelector("#temperature").innerHTML = data.main.temp;
    document.querySelector("#location").innerHTML = data.name;
  });
}

getLocationWeather();

function showTodoList(){
  if(todoList.classList.contains('hidden')){
    todoList.classList.remove('hidden');
  }
  else{
    todoList.classList.add('hidden');
  }
}

todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    let todo = todoInput.value;
    if(todo === "" || todo === null || todo === undefined) { return; }

    let li = newTodoList(todo);
    todoListAppend.appendChild(li);
    todoInput.value = "";

    let arr = [todo, false]; // todo, done?
    todoArr.push(arr);
    localStorage.setItem("todoList", JSON.stringify(todoArr));
  } else if(e.code === "Space") {
    e.preventDefault();
  }
});

function newTodoList(todo){
  let li = document.createElement("li");
  li.setAttribute("class", "todoElement");
  li.setAttribute("onmouseover", "showMore(this)");
  li.setAttribute("onmouseout", "hiddenMore(this)");

  let group = document.createElement("div");
  group.setAttribute("class", "todoList-checkBoxGroup")

  let checkBtn = document.createElement("button");
  checkBtn.setAttribute("onclick", "doneTodo(this)");
  checkBtn.setAttribute("class", "checkBox");
  group.appendChild(checkBtn);

  let content = document.createElement("span");
  content.textContent = todo;
  group.appendChild(content);

  li.appendChild(group);

  let moreBtn = document.createElement("button");
  moreBtn.setAttribute("onclick", "showMoreTab(this)");
  moreBtn.setAttribute("class", "more hidden");
  moreBtn.textContent = "***";
  li.appendChild(moreBtn);

  let moreTab = document.createElement("div");
  moreTab.setAttribute("class", "moreTab hidden");
  
  let moreTab_edit = document.createElement("div");
  moreTab_edit.setAttribute("onclick", "editTodo(this)");
  moreTab_edit.textContent = "Edit";
  moreTab.appendChild(moreTab_edit);
  
  let moreTab_delete = document.createElement("div");
  moreTab_delete.setAttribute("onclick", "deleteTodo(this)");
  moreTab_delete.textContent = "Delete";
  moreTab.appendChild(moreTab_delete);

  moreBtn.appendChild(moreTab);
  
  return li;
}

function showMore(li){
  li.childNodes[1].classList.remove('hidden');
}

function hiddenMore(li){
  if(moreFlag != li.childNodes[1]){
    li.childNodes[1].classList.add('hidden');
  }
}

let moreFlag = false;
function showMoreTab(btn){
  if(!moreFlag){
    moreFlag = btn;
    btn.childNodes[1].classList.remove('hidden');
  }else{
    moreFlag.classList.add('hidden');
    moreFlag.childNodes[1].classList.add('hidden');

    if(moreFlag != btn){
      moreFlag = btn;
      btn.childNodes[1].classList.remove('hidden');
    } else{
      moreFlag = false;
    }
  }

  
}

function doneTodo(btn){
  let idx = btn.parentNode.parentNode.getAttribute("number");
  if(btn.parentNode.classList.contains('checked')){
    btn.parentNode.classList.remove('checked');
    todoArr[idx][1] = false;
  } else{
    btn.parentNode.classList.add('checked');
    todoArr[idx][1] = true;
  }
  localStorage.setItem("todoList", JSON.stringify(todoArr));
}

function deleteTodo(div){
  let li = div.parentNode.parentNode.parentNode;
  let idx = li.getAttribute("number");
  todoArr.splice(idx, 1);
  li.remove();
  localStorage.setItem("todoList", JSON.stringify(todoArr));
}

function editTodo(div){
  div.parentNode.parentNode.parentNode.getAttribute("number");
}