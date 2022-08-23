export function showContainer(username) {
  document.querySelector(".container").classList.remove("hidden");
  document.querySelector(".greeting span").innerHTML = username;
}

export function showFirstUse(visiable = true) {
  if (visiable === false) {
    document.querySelector(".firstUse").classList.add("hidden");
  } else {
    document.querySelector(".firstUse").classList.remove("hidden");
  }
}

function showMore(li){
  console.log('hzz');
  li.childNodes[1].classList.remove('hidden');
}

function hiddenMore(li){
  if(moreFlag != li.childNodes[1]){
    li.childNodes[1].classList.add('hidden');
  }
}