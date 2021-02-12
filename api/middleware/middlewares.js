//import models
const Actions = require("../actions/actions-model");
const Project = require("../projects/projects-model");

const logger = (req, res, next) => {
  console.log(
    `The ${req.method} was made on ${Date().toLocaleString()} to ${
      req.protocol
    }://${req.get("Host")}${req.originalUrl}`
  );
  next();
};

const validateActionsId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const action = await Actions.get(id);
    !action
      ? res.status(404).json({ message: "That id is not valid" })
      : (req.action = action);
    next();
  } catch (err) {
    res.status(500).json(`Server error: ${err}`);
  }
};

const validateAction = async (req, res, next) => {
  if (!req.body.description || !req.body.notes) {
    res
      .status(400)
      .json({ message: "Please insert both a description and note" });
  } else if (!req.body) {
    res.status(400).json({ message: "Missing action information" });
  } else {
    next();
  }
};

const validateProjectId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.get(id);
    !project
      ? res.status(404).json({ message: "That id is not valid" })
      : (req.project = project);
    next();
  } catch (err) {
    res.status(500).json(`Server error: ${err}`);
  }
};

const validateProject = async (req, res, next) => {
  if (!req.body.name || !req.body.description) {
    res
      .status(400)
      .json({ message: "Please insert both a name and description" });
  } else if (!req.body) {
    res.status(400).json({ message: "Missing action information" });
  } else {
    next();
  }
};

module.exports = {
  logger,
  validateActionsId,
  validateAction,
  validateProjectId,
  validateProject,
};
