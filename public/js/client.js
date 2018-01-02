var canvas = $("#pad")[0];
var ctx = canvas.getContext("2d");
var socket = io();
var mouseX;
var mouseY;
var drawLoop;

$("#pad").mousedown(() => {
    drawLoop = setInterval(() => {
        socket.emit("draw", mouseX, mouseY, 20, 20);
    }, 1)
});

$(document).mouseup(() => {
    console.log("mouseup");
    clearInterval(drawLoop);
})

$("#pad").mousemove((e) => {
    mouseX = Math.round(e.pageX - $("#pad").offset().left);
    mouseY = Math.round(e.pageY - $("#pad").offset().top);
});

socket.on("draw", (clickX, clickY, height = 5, width = 5) => {
    ctx.fillRect(clickX, clickY, height, width);
});
