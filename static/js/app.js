var httpRequest = new XMLHttpRequest();

function updateWidget() {
    console.log('updateWidget');
}

httpRequest.onreadystatechange = updateWidget;

httpRequest.open('GET', 'http://localhost:5000/widgets/auuid', true);
httpRequest.send();
