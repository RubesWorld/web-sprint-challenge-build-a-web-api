const express = require("express");
const server = express();
server.use(express.json());

//import routers
const ActionRouter = require("./actions/actions-router");
const ProjectRouter = require("./projects/projects-router");

server.use("/api/actions", ActionRouter);
server.use("/api/projects", ProjectRouter);

server.get("/", (req, res) => {
  res.send("Welcome to this API");
});


// Complete your server here!
// Do NOT `server.listen()` inside this file!

module.exports = server;
