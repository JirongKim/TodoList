let username = localStorage.getItem("username");
if (!username) {
  showFirstUse();
} else {
  showContainer();
}

let usernameInput = document.querySelector('#usernameInput');
usernameInput.addEventListener("keydown", (e)=>{
  if(e.key === "Enter"){
    username = usernameInput.value;
    localStorage.setItem("username", username);
    showFirstUse(false);
    showContainer();
  }
})

function showContainer(){
  document.querySelector(".container").classList.remove("hidden");
  document.querySelector(".greeting span").innerHTML = username;
}

function showFirstUse(visiable = true){
  if(visiable === false){
    document.querySelector(".firstUse").classList.add("hidden");
  }else{
    document.querySelector(".firstUse").classList.remove("hidden");
  }
}

setInterval(function(){
  let date = new Date();
  let hours = date.getHours().toString().padStart(2, '0');
  let minutes = date.getMinutes().toString().padStart(2, '0');

  document.querySelector("#hours").innerHTML = hours;
  document.querySelector("#minutes").innerHTML = minutes;
}, 1000)