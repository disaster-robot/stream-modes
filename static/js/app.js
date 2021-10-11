let DateTime = luxon.DateTime;

var xhr = new XMLHttpRequest();

function updateWidget() {
    console.log('updateWidget');
}

xhr.onreadystatechange = updateWidget;

let widgetEls = {
  "left": document.getElementById("left"),
  "center": document.getElementById("center"),
  "right": document.getElementById("right")
};

xhr.onload = function(e) {
    let statusLineData = JSON.parse(xhr.response);

    for (const [widgetPosition, widgetData] of Object.entries(statusLineData)) {

      switch(widgetData.type) {
      case "text":
        widgetEls[widgetPosition].innerHTML = widgetData.value;
        break;
      case "timer":
        renderTimer(
          widgetEls[widgetPosition],
          widgetData.hours,
          widgetData.mins,
          widgetData.secs
        );

        break;
      default:
        console.error(`unknown widget type ${widgetType}`);
      }
    };
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
