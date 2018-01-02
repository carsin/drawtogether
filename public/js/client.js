// String prototype function to check if username is only spaces
String.prototype.trim = function () {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
}

var canvas = $("#pad")[0];
var ctx = canvas.getContext("2d");
var socket = io();
var mouseX;
var mouseY;
var draw;
var username = "Anon McNonymous";
while (username === "Anon McNonymous" || username === "" || username.trim().length === 0) {
    username = prompt("Enter a username: ")
}

socket.emit("add username", username);

function addDraw(x, y, dragging) {
    socket.emit("draw", x, y, dragging);
}

function redraw(drawRoom) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clears the canvas

    ctx.strokeStyle = "black";
    ctx.lineJoin = "round";
    ctx.lineWidth = 5;

    for(var i = 0; i < drawRoom.clickX.length; i++) {
        ctx.beginPath();
        if (drawRoom.clickDrag[i] && i) {
            ctx.moveTo(drawRoom.clickX[i - 1], drawRoom.clickY[i - 1]);
        } else {
            ctx.moveTo(drawRoom.clickX[i] - 1, drawRoom.clickY[i]);
        }
        ctx.lineTo(drawRoom.clickX[i], drawRoom.clickY[i]);
        ctx.closePath();
        ctx.stroke();
    }
}

$("#pad").mousedown((e) => {
    mouseX = Math.round(e.pageX - $("#pad").offset().left);
    mouseY = Math.round(e.pageY - $("#pad").offset().top);

    addDraw(mouseX, mouseY)
    draw = true;
});

$(document).mouseup(() => {
    draw = false;
});

$("#pad").mouseleave(() => {
    draw = false;
});

$("#pad").mousemove((e) => {
    if (draw){
        addDraw(Math.round(e.pageX - $("#pad").offset().left), Math.round(e.pageY - $("#pad").offset().top), true);
    }
});

socket.on("draw", (drawRoom) => {
    redraw(drawRoom);
});

socket.on("update users", (users, userCount) => {
    users.forEach((username, index) => {
        console.log(index);
        $("#user-list").append("<li>" + current_value +"</li>")
    });

    $("#user-total").html(userCount);
});

$("#btn-clear").click(() => {
    socket.emit("clear pad");
});
