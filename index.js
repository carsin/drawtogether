const express = require("express");
const app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.sendFile("index.html");
});

var drawRoom = {
    clickX: new Array(),
    clickY: new Array(),
    clickDrag: new Array(),
    users: new Array(),
    totalUsers: 0,
    userCount: 0,
};

io.on("connection", function(socket){
    io.local.emit("draw", drawRoom);
    drawRoom.userCount++;
    drawRoom.totalUsers++;

    socket.on("add username", (username) => {
        drawRoom.users[drawRoom.totalUsers] = username;
        console.log(drawRoom.users)
        io.emit("update users", drawRoom.users, drawRoom.userCount, drawRoom.totalUsers);
    });

    socket.on("check username uniqueness", (username) => {
        for (i = 0; i < drawRoom.totalUsers; i++) {
            if (drawRoom.users[i] === username) {
                io.emit("check username uniqueness", false);
                console.log(drawRoom.users[i] + "=" + username);
            } else {
                io.emit("check username uniqueness", true);
                console.log(drawRoom.users[i] + "=" + username);
            }
        }
    });

    socket.on("disconnect", () => {
        console.log(drawRoom.users[socket.id] + " disconnected");
        delete drawRoom.users[socket.id];
        drawRoom.userCount--;
        io.emit("update users", drawRoom.users, drawRoom.userCount, drawRoom.totalUsers);
    });

    socket.on("draw", (x, y, dragging) => {
        drawRoom.clickX.push(x);
        drawRoom.clickY.push(y);
        drawRoom.clickDrag.push(dragging);

        io.emit("draw", drawRoom);
    });

    socket.on("clear pad", () => {
        drawRoom.clickX = new Array();
        drawRoom.clickY = new Array();
        drawRoom.clickDrag = new Array();

        io.emit("draw", drawRoom);
    });
});

server.listen(3000, () => console.log("App listening on part 3000"));
