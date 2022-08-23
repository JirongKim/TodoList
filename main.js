let todoInput = document.querySelector("#todoInput");
let todoList = document.querySelector(".todoList");
let todoListAppend = document.querySelector(".todoList ul");

let username = localStorage.getItem("username");
if (!username) {
  showFirstUse();
} else {
  showContainer();
}

let localStorage_todoList = localStorage.getItem("todoList");
if(localStorage_todoList) {
  let array = JSON.parse(localStorage_todoList);
  array.forEach((todo)=>{
    let li = document.createElement("li");
    li.textContent = todo;
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

    let li = document.createElement("li");
    li.textContent = todo;
    todoListAppend.appendChild(li);
    todoInput.value = "";
    
    localStorage_todoList = localStorage.getItem("todoList");
    if(!localStorage_todoList) { localStorage_todoList = []; }
    else { localStorage_todoList = JSON.parse(localStorage_todoList); }

    localStorage_todoList.push(todo);
    localStorage.setItem("todoList", JSON.stringify(localStorage_todoList));
  } else if(e.code === "Space") {
    e.preventDefault();
  }
});