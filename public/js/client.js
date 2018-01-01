var canvas = $("#pad")[0];
var ctx = canvas.getContext("2d");
var socket = io();

$("#pad").click((e) => {
    var clickX = Math.round(e.pageX - $("#pad").offset().left);
    var clickY = Math.round(e.pageY - $("#pad").offset().top);
    ctx.fillRect(clickX, clickY, 5, 5);
    console.log(clickX + ", " + clickY);
});

