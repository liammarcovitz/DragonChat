const WebSocket = require('ws');

var username = "";
let sendButton = document.getElementById("send-button");
let latestMessage = document.getElementById("latest-message");
var newMessage = document.getElementById("latest-message");
let inputField = document.getElementById("input-message");
let setUserButton = document.getElementById("set-user");
let usernameBox = document.getElementById("username-box");

inputField.style.display = "none";
sendButton.style.display = "none";

const ws = new WebSocket('ws://liammarcovitz.com/dragonchat');

ws.on('error', () => {
    console.error();
});

ws.on('open', function open() {
    ws.send('Connected to client.');
});

ws.on('message', function message(data) {
    newMessage = latestMessage.cloneNode(true);

    newMessage.innerText = data;

    // prepare for next message
    latestMessage.before(newMessage);

    latestMessage.innerText = "";

    // scroll to bottom
    window.scrollTo(0, document.body.scrollHeight);
});

function sendMessage() {
    // scroll to bottom
    window.scrollTo(0, document.body.scrollHeight);
    
    ws.send("MESSAGE: " + username + ": " + inputField.value);

    inputField.value = "";
}

function setUsername() {
    if (usernameBox.value.length < 1) {
        // send error message
        return;
    }
    username = usernameBox.value;
    inputField.style.display = "block";
    sendButton.style.display = "block";

    setUserButton.style.display = "none";
    usernameBox.style.display = "none";
    ws.send('CONNECTION: ' + username);
}

sendButton.addEventListener("click", sendMessage);
setUserButton.addEventListener("click", setUsername);
inputField.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});