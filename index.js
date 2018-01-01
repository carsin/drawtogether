const express = require("express");
const app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.sendFile("index.html");
});

io.on("connection", function(socket){
  console.log("a user connected");
});

server.listen(3000, () => console.log("App listening on part 3000"));
