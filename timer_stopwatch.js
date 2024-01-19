var userSeconds = 0;
var userMinutes = 0;
var userHours = 0;

var seconds = 0;
var minutes = 0;
var hours = 0;
var timerStart = false;

var checked = false;

function init() {
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;
}

function checkBox() {
  if (checked == false) {
    checked = true;
    document.getElementById("timer-mode").style.display = "none";
    document.getElementById("stopwatch-mode").style.display = "grid";
    hours = 0;
    minutes = 0;
    seconds = 0;
  } else {
    checked = false;
    document.getElementById("timer-mode").style.display = "grid";
    document.getElementById("stopwatch-mode").style.display = "none";
    hours = userHours;
    minutes = userMinutes;
    seconds = userSeconds;
  }

  timerStart = false;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;
}


function startTimer() {
  if (checked == false) {
    if (seconds == 0 && minutes == 0 && hours == 0) {
      timerStart = false;
    } else {
      timerStart = true;
    }
  } else {
    timerStart = true;
  }
}

function stopTimer() {
  timerStart = false;
}

function resetTimer() {
  if (timerStart == false && checked == false) {
    seconds = userSeconds;
    minutes = userMinutes;
    hours = userHours;

    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
  } else {
    seconds = 0;
    minutes = 0;
    hours = 0;

    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
  }
}

function clearPrompt() {
  document.getElementById("hours-option").value = "0";
  document.getElementById("minutes-option").value = "0";
  document.getElementById("seconds-option").value = "0";
}

function closeTimerPrompt() {
  document.getElementById("specify-time-options").style.display = "none";
  clearPrompt();
}

function openTimerPrompt() {
  document.getElementById("specify-time-options").style.display = "flex";
}

function submitTimerPrompt() {
  if (timerStart == false) {
    userHours = document.getElementById("hours-option").value;
    userMinutes = document.getElementById("minutes-option").value;
    userSeconds = document.getElementById("seconds-option").value;

    hours = userHours;
    minutes = userMinutes;
    seconds = userSeconds;
    document.getElementById("specify-time-options").style.display = "none";
    clearPrompt();

    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
  }
}

function exitNotif() {
  document.getElementById("notif-div").style.display = "none";
}

const timer = setInterval(function() {
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;
  if (checked == false) {
    if (timerStart == true) {
      seconds--;
      if (seconds < 0) {
        if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else {
          if (hours > 0) {
            hours--;
            minutes = 59;
            seconds = 59;
          } else {
            hours = 0;
            minutes = 0;
            seconds = 0;
            document.getElementById("notif-div").style.display = "flex";
            timerStart = false;
          }
        }
      }
    }
  } else {
    if (timerStart == true) {
      seconds++;
      if (seconds > 59) {
        seconds = 0;
        minutes++;
      }

      if (minutes > 59) {
        minutes = 0;
        hours++;
      }

      if (hours > 23) {
        hours = 23;
        minutes = 59;
        seconds = 59;
      }

    }
  }

}, 1000);

