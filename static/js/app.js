let DateTime = luxon.DateTime;

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

function renderTimer(el, h, m, s) {
    var now, countDownDate, timeDiff;
    var remainingHours, remainingMinutes, remainingSeconds;

    countDownTime = DateTime.now().plus({hours: h, minutes: m, seconds: s});

    setInterval(function() {
      timeDiff = countDownTime.diff(DateTime.now(), ['hours', 'minutes', 'seconds']);

      el.innerHTML = timeDiff.hours + "h " + timeDiff.minutes + "m " + parseInt(timeDiff.seconds) + "s ";

      if (timeDiff < 0) {
        clearInterval(x);
        el.innerHTML = "EXPIRED";
      }
    }, 1000);
}
