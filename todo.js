let todoInput = document.querySelector("#todoInput");
let todoList = document.querySelector(".todoList");
let todoListAppend = document.querySelector(".todoList ul");

function showTodoList(){
  console.log('hi');
  if(todoList.classList.contains('hidden')){
    todoList.classList.remove('hidden');
  }
  else{
    todoList.classList.add('hidden');
  }
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
  let li = div.parentNode.parentNode.parentNode;
  let idx = li.getAttribute("number");

  let tagE = li.childNodes[0].childNodes[1];
  let tagInput = document.createElement('input');
  tagInput.setAttribute("value", tagE.innerHTML);
  tagInput.setAttribute("id", "changeTodoInput");

  li.childNodes[0].replaceChild(tagInput, tagE);
  editListener(idx, tagE, tagInput);
}

function editListener(idx, tagE, tagInput){
  let changeIdx = idx;
  let changeBefore = tagE;
  let changeAfter = tagInput;
  let changeTodoInput = document.querySelector("#changeTodoInput");
  changeTodoInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      let todo = changeTodoInput.value;
      if(todo === "" || todo === null || todo === undefined) { return; }
  
      todoArr[changeIdx][0] = todo;
      changeBefore.innerHTML = todo;
      changeAfter.parentNode.replaceChild(changeBefore, changeAfter);
  
      localStorage.setItem("todoList", JSON.stringify(todoArr));
    } else if(e.code === "Space") {
      e.preventDefault();
    }
  });
}
