var canvas = $("#pad")[0];
var ctx = canvas.getContext("2d");
var socket = io();

$("#pad").mousedown((e) => {
    var clickX = Math.round(e.pageX - $("#pad").offset().left);
    var clickY = Math.round(e.pageY - $("#pad").offset().top);
    socket.emit("draw", clickX, clickY);
});

socket.on("draw", (clickX, clickY) => {
    ctx.fillRect(clickX, clickY, 5, 5);
});
