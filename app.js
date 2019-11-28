const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const apiRoutes = require("./routers");

mongoose.connect("mongodb://localhost:27017/task", {
  useNewUrlParser: true
});

app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(express.static(path.join(__dirname, "static", "index.html")));

app.use("/api", apiRoutes);

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "static", "index.html"))
);
// Set Port
const port = process.env.PORT || 8000;
// Create Server
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`App listening to port ${port}`);
});
