const button = document.querySelector(".button-add-task");
const input = document.querySelector(".input-task");
const completeList = document.querySelector(".list-task");

let itemList = [];

function addTask() {
  if (input.value == "") {
    alert("Preencha o campo de tarefa");
  } else {
    itemList.push({
      task: input.value,
      checked: false,
    });
    input.value = "";
    showTask();
  }
}

function showTask() {
  let newLi = "";
  itemList.forEach((task, index) => {
    newLi =
      newLi +
      `<li class="task ${task.checked && "done"}">
        <img src="./img/checked.png" alt="check"  onClick = "checkTask(${index})" />
        <p>${task.task}</p>
        <img src="./img/trash.png" alt="trash" onClick = "deleteItem(${index})"/>
      </li>`;
  });

  completeList.innerHTML = newLi;

  localStorage.setItem("list", JSON.stringify(itemList));
}

function checkTask(index) {
  itemList[index].checked = !itemList[index].checked;
  showTask();
}

function deleteItem(index) {
  itemList.splice(index, 1);
  showTask();
}

function reloadTasks() {
  const LocalStorageTasks = localStorage.getItem("list");
  if (LocalStorageTasks) {
    itemList = JSON.parse(LocalStorageTasks);
  }
  showTask();
}
reloadTasks();

button.addEventListener("click", addTask);
