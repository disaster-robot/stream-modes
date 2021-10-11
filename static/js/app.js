var xhr = new XMLHttpRequest();

function updateWidget() {
    console.log('updateWidget');
}

xhr.onreadystatechange = updateWidget;

let leftWidget = document.getElementById("left");
let centerWidget = document.getElementById("center");
let rightWidget = document.getElementById("right");

let widgetData, left, center, right;

let timerRegex = /^timer:(\d+)h:(\d+)m:(\d+)s$/;

xhr.onload = function(e) {
    widgetData = JSON.parse(xhr.response);
    left = widgetData["left"];
    center = widgetData["center"];
    right = widgetData["right"];

    var timerMatch = timerRegex.exec(left);
    // leftWidget.innerHTML = left;
    renderTimer(leftWidget, timerMatch[1], timerMatch[2], timerMatch[3]);
    centerWidget.innerHTML = center;
    rightWidget.innerHTML = right;
}

xhr.open('GET', '/widgets/auuid');
xhr.send();

// https://www.w3schools.com/howto/howto_js_countdown.asp
const MS_PER_DAY = (1000 * 60 * 60 * 24);
const MS_PER_HOUR = (1000 * 60 * 60);
const MS_PER_MIN = (1000 * 60);
const MS_PER_SEC = 1000;

function renderTimer(el, h, m, s) {
    var now, countDownDate, distance;
    var remainingHours, remainingMinutes, remainingSeconds;

    countDownDate = new Date().getTime() +(h * MS_PER_HOUR) + (m * MS_PER_MIN) + (s * MS_PER_SEC);

    setInterval(function() {
      now = new Date().getTime();
      distance = countDownDate - now;

      remainingHours = Math.floor((distance % MS_PER_DAY) / MS_PER_HOUR);
      remainingMinutes = Math.floor((distance % MS_PER_HOUR) / MS_PER_MIN);
      remainingSeconds = Math.floor((distance % MS_PER_MIN) / MS_PER_SEC);

      el.innerHTML = remainingHours + "h " + remainingMinutes + "m " + remainingSeconds + "s ";

      if (distance < 0) {
        clearInterval(x);
        el.innerHTML = "EXPIRED";
      }
    }, 1000);
}
