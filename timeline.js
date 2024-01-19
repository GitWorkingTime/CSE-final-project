var chosenTaskID;

function init() {
  for (i = 1; i <= document.getElementsByClassName("task-bar").length; i++) {
    const barEl = document.getElementsByClassName("task-bar");
    const bar = barEl.item(i - 1).getAttribute("id");
    // console.log(bar);
    const start = document.getElementById(bar).dataset.start;
    const end = document.getElementById(bar).dataset.end;
    const row = document.getElementById(bar).dataset.row;

    document.getElementById(bar).style.gridColumnStart = start;
    document.getElementById(bar).style.gridColumnEnd = end;
    document.getElementById(bar).style.gridRowStart = row;
    document.getElementById(bar).style.gridRowEnd = row;
  }

  document.getElementById("chart-duration").style.gridRow =
    document.getElementsByClassName("task-bar").length;
}

function addTask() {
  const startDateEl = document.getElementById("start-days");
  const endDateEl = document.getElementById("end-days");
  const weekEl = document.getElementById("weeks");
  const taskDetails = document.getElementById("task-name");

  var weekValue = weekEl.options[weekEl.selectedIndex].value;
  var startDate = parseInt(
    startDateEl.options[startDateEl.selectedIndex].value
  );
  var endDate = parseInt(endDateEl.options[endDateEl.selectedIndex].value) + 1;
  var taskName = taskDetails.value;

  if (weekValue == 2) {
    startDate += 7;
    endDate += 7;
  } else if (weekValue == 3) {
    startDate += 14;
    endDate += 14;
  } else if (weekValue == 4) {
    startDate += 21;
    endDate += 21;
  }

  if (startDate > endDate) {
    alert("INVALID - IMPROPER DATES");
    return;
  }

  if (taskName == "") {
    alert("INVALID - UNTITLED TASK NAME");
    return;
  }

  for (i = 1; i <= document.getElementsByClassName("task-bar").length; i++) {
    const barEl = document.getElementsByClassName("task-bar");
    const bar = barEl.item(i - 1).getAttribute("id");

    if (bar == taskName + "-bar") {
      alert("INVALID - CAN'T HAVE THE SAME NAME");
      return;
    }
  }

  const taskContainer = document.getElementById("tasks-grid");
  const taskEl = document.createElement("div");
  taskEl.setAttribute("class", "task");
  var taskID = taskName.replaceAll(" ", "-").toLowerCase();
  taskEl.setAttribute("id", taskID);
  taskEl.setAttribute("oncontextmenu", "editPopUp(this); return false;");
  taskEl.innerText = taskName;
  taskContainer.append(taskEl);

  const taskBarEl = document.createElement("div");
  taskBarEl.setAttribute("class", "task-bar");

  var taskBarID = taskName.replaceAll(" ", "-").toLowerCase() + "-bar";
  taskBarEl.setAttribute("id", taskBarID);
  taskBarEl.setAttribute("data-start", startDate);
  taskBarEl.setAttribute("data-end", endDate);
  taskBarEl.setAttribute(
    "data-row",
    document.getElementById("chart-duration").children.length + 1
  );

  const taskBarContainer = document.getElementById("chart-duration");
  taskBarContainer.append(taskBarEl);

  taskDetails.value = "";
  startDateEl.value = 1;
  endDateEl.value = 1;
  weekEl.value = 1;
  init();
}

function editPopUp(object) {
  document.getElementById("edit-popup").style.display = "flex";
  var taskEl = object;
  chosenTaskID = taskEl.getAttribute("id");
  console.log(chosenTaskID);

  const editTaskDetails = document.getElementById("edit-task-details");
  editTaskDetails.value = object.innerText;
}

function savePopUp() {
  const chosenTask = document.getElementById(chosenTaskID);
  const editTaskDetails = document.getElementById("edit-task-details");
  const taskBarEl = document.getElementById(chosenTaskID + "-bar");
  //   console.log(taskBarEl);

  const editStartDateEl = document.getElementById("edit-start-days");
  const editEndDateEl = document.getElementById("edit-end-days");
  const editWeekEl = document.getElementById("edit-weeks");
  //   console.log(editStartDateEl, editEndDateEl, editWeekEl);

  var weekValue = editWeekEl.options[editWeekEl.selectedIndex].value;
  var startDate = parseInt(
    editStartDateEl.options[editStartDateEl.selectedIndex].value
  );
  var endDate =
    parseInt(editEndDateEl.options[editEndDateEl.selectedIndex].value) + 1;

  if (weekValue == 2) {
    startDate += 7;
    endDate += 7;
  } else if (weekValue == 3) {
    startDate += 14;
    endDate += 14;
  } else if (weekValue == 4) {
    startDate += 21;
    endDate += 21;
  }

  if (startDate > endDate) {
    alert("INVALID - IMPROPER DATES");
    return;
  }
  if (editTaskDetails.value == "") {
    alert("INVALID - NO TASK DETAILS");
    return;
  }
  console.log(chosenTaskID);
  var newTaskID = editTaskDetails.value.replaceAll(" ", "-").toLowerCase();
  taskBarEl.setAttribute("id", newTaskID + "-bar");
  taskBarEl.setAttribute("data-start", startDate);
  taskBarEl.setAttribute("data-end", endDate);

  chosenTask.innerText = editTaskDetails.value;
  chosenTask.setAttribute("id", newTaskID);
  init();

  editTaskDetails.value = "";
  editEndDateEl.value = 1;
  editStartDateEl.value = 1;
  editWeekEl.value = 1;
  //   console.log(document.getElementById("edit-popup"));
  document.getElementById("edit-popup").style.display = "none";
}

function exitPopUp() {
  document.getElementById("edit-popup").style.display = "none";
  document.getElementById("edit-start-days").value = 1;
  document.getElementById("edit-end-days").value = 1;
  document.getElementById("edit-weeks").value = 1;
}

function deleteTask() {
  const deletedTask = document.getElementById(chosenTaskID);
  const deletedBar = document.getElementById(chosenTaskID + "-bar");

  deletedTask.setAttribute("oncontextmenu", "restoreTask(this); return false;");
  deletedTask.style.padding = "1rem";
  deletedTask.style.backgroundColor = "var(--BACKGROUND)";
  deletedTask.style.borderRadius = "var(--BORDERRADIUS)";
  deletedTask.style.width = "fit-content";
  deletedTask.style.boxShadow = "0px 0px 5px var(--PRIMARY)";

  const trashEl = document.getElementById("deleted-content");

  document.getElementById(chosenTaskID).remove();
  document.getElementById(chosenTaskID + "-bar").remove();

  trashEl.append(deletedTask, deletedBar);

  for (
    let i = 0;
    i < document.getElementById("chart-duration").children.length;
    i++
  ) {
    document
      .getElementById("chart-duration")
      .children.item(i)
      .setAttribute("data-row", i + 1);
  }
  init();
  exitPopUp();
}

function restoreTask(object) {
  document.getElementById("deleted-popup").style.display = "flex";
  chosenTaskID = object.id;
  //   console.log(chosenTaskID);
}

function goToTaskAdder() {
  document.getElementById("container-adding-task").style.display = "block";
  document.getElementById("container-trash").style.display = "none";
}

function goToTrash() {
  document.getElementById("container-trash").style.display = "block";
  document.getElementById("container-adding-task").style.display = "none";
}

function doNotRestore() {
  document.getElementById("deleted-popup").style.display = "none";
}

function doRestore() {
  const restoredTask = document.getElementById(chosenTaskID);
  const restoredBar = document.getElementById(chosenTaskID + "-bar");
  const taskEl = document.getElementById("tasks-grid");
  const barEl = document.getElementById("chart-duration");
  restoredTask.style.padding = 0;
  restoredTask.style.backgroundColor = "null";
  restoredTask.style.boxShadow = "0px 0px 0px var(--PRIMARY)";
  restoredTask.setAttribute("oncontextmenu", "editPopUp(this); return false;");
  taskEl.append(restoredTask);
  barEl.append(restoredBar);
  init();
  document.getElementById("deleted-popup").style.display = "none";
}

function clearTrash() {
  //   console.log(document.getElementById("deleted-content").children);
  while (document.getElementById("deleted-content").children.length != 0) {
    document.getElementById("deleted-content").children.item(0).remove();
  }
}
