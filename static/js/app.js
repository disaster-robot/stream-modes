var xhr = new XMLHttpRequest();

function updateWidget() {
    console.log('updateWidget');
}

xhr.onreadystatechange = updateWidget;

let leftWidget = document.getElementById("left");
let centerWidget = document.getElementById("center");
let rightWidget = document.getElementById("right");

let widgetData, left, center, right;

xhr.onload = function(e) {
    widgetData = JSON.parse(xhr.response);
    left = widgetData["left"];
    center = widgetData["center"];
    right = widgetData["right"];

    leftWidget.innerHTML = left;
    centerWidget.innerHTML = center;
    rightWidget.innerHTML = right;
}

xhr.open('GET', '/widgets/auuid');
xhr.send();
