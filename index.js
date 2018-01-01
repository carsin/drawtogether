const express = require("express");
const app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.sendFile("index.html");
});

io.on("connection", function(socket){
  console.log("user connected");
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
    socket.on("draw", (clickX, clickY) => {
        console.log("client drew at X:" + clickX + " Y: " + clickY);
        io.emit("draw", clickX, clickY);
    });
});

server.listen(3000, () => console.log("App listening on part 3000"));
