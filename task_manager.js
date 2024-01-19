var taskAdder;
var listID;
var chosenTaskID;
var taskHeaderIndex;

function change(object) {
  const divParent = document.getElementById(object.id);
  const deadlineEl = divParent.querySelector('.task-deadline');
  if (object.checked == true) {
    deadlineEl.style.textDecoration = "line-through";
  } else {
    deadlineEl.style.textDecoration = "none";
  }
}

function clearTaskPrompt() {
  document.getElementById("title").value = "";
  document.getElementById("details").value = "";
  document.getElementById("months").value = 0;
  document.getElementById("days").value = 0;
  document.getElementById("years").value = 0;
}

function clearListPrompt() {
  document.getElementById("list-title").value = "";
}

function closeTaskPrompt() {
  document.getElementById("add-task-prompt").style.display = "none";
  clearTaskPrompt();
}

function openTaskPrompt(object) {
  taskAdder = object.id + "-content";
  //console.log(taskAdder);
  document.getElementById("add-task-prompt").style.display = "block";
}

function closeListPrompt() {
  document.getElementById("add-list-prompt").style.display = "none";
  clearListPrompt();
}

function openListPrompt() {
  document.getElementById("add-list-prompt").style.display = "block";
}

function addTask() {
  const taskDiv = document.createElement("div");
  taskDiv.setAttribute("class", "task");

  var taskId = document.getElementById("title").value;
  taskId = taskId.replaceAll(" ", "-").toLowerCase();
  taskDiv.setAttribute("id", taskId);
  taskDiv.setAttribute("oncontextmenu", "editPopUp(this);return false;");

  var taskTitle = document.getElementById("title").value;
  console.log("taskTitle: " + taskTitle);
  const taskHeader = document.createElement("div");
  taskHeader.setAttribute("class", "task-header");
  taskHeader.innerText = taskTitle;
  taskDiv.append(taskHeader);

  const taskDetails = document.createElement("div");
  taskDetails.setAttribute("class", "task-details");
  taskDetails.innerHTML += document.getElementById("details").value;

  const taskDeadlines = document.createElement("div");
  taskDeadlines.setAttribute("class", "task-deadline");
  taskDeadlines.innerText = "Due: ";

  const monthValue = document.getElementById("months").value;
  const dayValue = document.getElementById("days").value;
  const yearValue = document.getElementById("years").value;

  const deadlineMonth = document.createElement("span");
  deadlineMonth.setAttribute("class", "month-task");
  deadlineMonth.innerText = monthValue + " / ";

  const deadlineDay = document.createElement("span");
  deadlineDay.setAttribute("class", "day-text");
  deadlineDay.innerText = dayValue + " / ";

  const deadlineYear = document.createElement("span");
  deadlineYear.setAttribute("class", "year-text");
  deadlineYear.innerText = yearValue + " ";

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("id", taskId);
  checkbox.setAttribute("class", "checkbox");
  checkbox.setAttribute("onchange", "change(this)");

  taskDeadlines.append(deadlineMonth, deadlineDay, deadlineYear, checkbox);


  const listDiv = document.getElementById(taskAdder);

  if (monthValue != 0 && dayValue != 0 && yearValue != 0) {
    taskDiv.append(taskDeadlines);
  } else if (monthValue != 0 || dayValue != 0 || yearValue != 0) {
    alert("INVALID - PLEASE FILL IN ALL OF THE BOXES");
    return;
  }

  if (taskTitle == "") {
    alert("INVALID - NO TITLE");
    return;
  }

  for (i = 0; i < document.getElementsByClassName("task").length; i++) {
    const taskTotalEl = document.getElementsByClassName("task");
    const task = taskTotalEl.item(i).getAttribute('id');
    if (task == taskTitle) {
      alert("INVALID - SAME NAME WITH OTHER TASKS");
      return;
    }
  }

  for (i = 0; i < document.getElementsByClassName("list").length; i++) {
    const listTotalEl = document.getElementsByClassName("list");
    const list = listTotalEl.item(i).getAttribute('id');
    if (list == taskTitle) {
      alert("INVALID - SAME NAME WITH OTHER LISTS");
      return;
    }
  }

  taskDiv.append(taskHeader);
  taskDiv.append(taskDetails);
  listDiv.append(taskDiv);
  document.getElementById("add-task-prompt").style.display = "none";
  clearTaskPrompt();
}

function addList() {
  const taskManagerBody = document.getElementById("task-manager-body");
  var listTitle = document.getElementById("list-title").value;
  listID = document.getElementById("list-title").value.replaceAll(" ", "-").toLowerCase();

  const listDiv = document.createElement("div");
  listDiv.setAttribute("class", "list");
  listDiv.setAttribute("id", listID);

  const listHeaderContainer = document.createElement("div");
  listHeaderContainer.setAttribute("class", "container-list-header");

  const listHeader = document.createElement("span");
  listHeader.setAttribute("class", "list-header");
  listHeader.textContent = listTitle;

  const flexAdder = document.createElement("span");
  flexAdder.setAttribute("class", "list-add-task");
  flexAdder.setAttribute("id", listID);
  flexAdder.setAttribute("onclick", "openTaskPrompt(this)");
  flexAdder.textContent = "Add";

  listHeaderContainer.append(listHeader);
  listHeaderContainer.append(flexAdder);

  const listContent = document.createElement("div");
  listContent.setAttribute("class", "container-list-content");
  listContent.setAttribute("id", listID + "-content");

  listDiv.append(listHeaderContainer);
  listDiv.append(listContent)

  if (listID == "") {
    alert("INVALID - ADD TITLE");
    return;
  }
  for (i = 0; i < document.getElementsByClassName("task").length; i++) {
    const taskTotalEl = document.getElementsByClassName("task");
    const task = taskTotalEl.item(i).getAttribute('id');
    if (task == listID) {
      alert("INVALID - SAME NAME WITH A TASKS");
      return;
    }
  }

  for (i = 0; i < document.getElementsByClassName("list").length; i++) {
    const listTotalEl = document.getElementsByClassName("list");
    const list = listTotalEl.item(i).getAttribute('id');
    if (list == listID) {
      alert("INVALID - SAME NAME WITH OTHER LIST");
      return;
    }
  }


  taskManagerBody.append(listDiv);
  closeListPrompt();
}

function editPopUp(object) {
  chosenTaskID = object.id;
  // console.log(object.children)

  if (object.children.length == 2) {
    taskHeaderIndex = 0;
  } else {
    taskHeaderIndex = 1;
  }

  // console.log(chosenTaskID);
  // console.log(object.children.item(0));
  // console.log(object.children.item(taskHeaderIndex).innerText);
  // console.log(object.children.item(taskHeaderIndex).getAttribute("id"));
  // console.log(object.children.item(taskHeaderIndex + 1).innerText);
  const popup = document.getElementById("task-popup");
  popup.style.display = "flex";

  const editTaskHeader = document.getElementById("edit-task-header");
  const editTaskDetails = document.getElementById("edit-task-details");
  editTaskHeader.value = object.children.item(taskHeaderIndex).innerText;
  editTaskDetails.value = object.children.item(taskHeaderIndex + 1).innerText;
}

function deleteTask() {
  const popup = document.getElementById("task-popup");
  const deleteDiv = document.getElementById("deleted-content");
  const deletedTask = document.getElementById(chosenTaskID);
  var parentEl = deletedTask.parentElement.id + "-task";
  const parentList = document.createElement("div");
  parentList.setAttribute("id", parentEl);
  deletedTask.append(parentList);

  deletedTask.setAttribute("oncontextmenu", "restore(this); return false;");
  document.getElementById(chosenTaskID).remove();
  deleteDiv.append(deletedTask);
  popup.style.display = "none";
}

function saveChanges() {
  const popup = document.getElementById("task-popup");
  const editTaskHeader = document.getElementById("edit-task-header");
  const editTaskDetails = document.getElementById("edit-task-details");
  const chosenTask = document.getElementById(chosenTaskID);
  const taskHeader = chosenTask.children.item(taskHeaderIndex);
  const taskDetails = chosenTask.children.item(taskHeaderIndex + 1);
  taskHeader.innerText = editTaskHeader.value;
  taskDetails.innerText = editTaskDetails.value;
  var newTaskID = editTaskHeader.value.replaceAll(" ", "-").toLowerCase();

  if (chosenTask.children.length == 3) {
    chosenTask.children.item(0).children.item(3).setAttribute("id", newTaskID);
  }

  chosenTask.setAttribute("id", newTaskID);
  popup.style.display = "none";
}

function exitPopUp() {
  const popup = document.getElementById("task-popup");
  popup.style.display = "none";
}

function exitDelete() {
  const deleteDiv = document.getElementById("delete-folder-div");
  deleteDiv.style.display = "none";
}

function restore(object) {
  document.getElementById("deleted-popup").style.display = "flex";
  chosenTaskID = object.id;
}

function doRestore() {
  const chosenTask = document.getElementById(chosenTaskID);
  document.getElementById(chosenTaskID).remove();
  chosenTask.setAttribute("oncontextmenu", "editPopUp(this); return false;");
  var parentID = chosenTask.lastChild.id.replace("-content", "").replace("-task", "");
  console.log(parentID);
  chosenTask.lastChild.remove();
  const parentList = document.getElementsByClassName("list");
  for (let i = 0; i < parentList.length; i++) {
    if (parentList.item(i).id == parentID) {
      const parentEl = parentList.item(i).children.item(1);
      parentEl.append(chosenTask);
    }
  }

  document.getElementById("deleted-popup").style.display = "none";
}

function doNotRestore() {
  document.getElementById("deleted-popup").style.display = "none";
}

function openDeleteFolder() {
  document.getElementById("delete-folder-div").style.display = "flex";
}

function clearTrash() {
  const deletedContent = document.getElementById("deleted-content").children;
  while (deletedContent.length != 0) {
    deletedContent.item(0).remove();
  }
}
