const express = require("express");
const Projects = require("./projects-model");
const Actions = require("../actions/actions-model");

const mw = require("../middleware/middlewares");

const router = express.Router();

router.get("/", mw.logger, (req, res) => {
  Projects.get()
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/:id", mw.validateProjectId, mw.logger, (req, res) => {
  const { id } = req.params;
  Projects.get(id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/", mw.validateProject, mw.logger, (req, res) => {
  const project = req.body;
  Projects.insert(project)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error inserting message" });
    });
});

router.put(
  "/:id",
  mw.validateProjectId,
  mw.validateProject,
  mw.logger,
  (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    Projects.update(id, changes)
      .then((project) => {
        res.status(201).json(project);
      })
      .catch((err) => {
        res.status(500).json({ message: "Error inserting that project" });
      });
  }
);

router.delete("/:id", mw.validateProjectId, mw.logger, (req, res) => {
  const { id } = req.params;
  Projects.remove(id).then((project) => {
    res.status(201).json();
  });
});

router.get("/:id/actions", mw.validateProjectId, mw.logger, (req, res) => {
  const { id } = req.params;
  Projects.getProjectActions(id)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
