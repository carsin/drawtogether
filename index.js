const express = require("express");
const app = express();
app.use(express.static("public"))


app.get("/", (req, res) => {
    res.sendFile("/views/index.html");
});

app.listen(3000, () => console.log("App listening on part 3000"));
