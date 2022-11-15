"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/hubs/chat").build();

//Disable the send button until connection is established.
document.getElementById("sendGoodButton").disabled = true;
document.getElementById("sendBadButton").disabled = true;


connection.start().then(function () {
    setup('Good');
    setup('Bad');
}).catch(function (err) {
    return console.error(err.toString());
});

function setup(type) {
    document.getElementById(`send${type}Button`).disabled = false;

    connection.on(`Send${type}`, function (message) {
        if (message === 'cls') {
            document.getElementById(`list${type}`).innerHTML = '';
        } else {
            var li = document.createElement("li");
            document.getElementById(`list${type}`).appendChild(li);
            li.textContent = message;
        }
    });

    document.getElementById(`send${type}Button`).addEventListener("click", function (event) {
        //var user = document.getElementById("userInput").value;
        var message = document.getElementById(`message${type}`).value;
        connection.invoke(`Send${type}`, message).catch(function (err) {
            return console.error(err.toString());
        });
        event.preventDefault();
    });
}
