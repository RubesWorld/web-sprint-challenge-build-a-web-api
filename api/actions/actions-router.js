const express = require("express");
const Actions = require("./actions-model");

const mw = require("../middleware/middlewares");

const router = express.Router();

router.get("/", mw.logger, (req, res) => {
  Actions.get()
    .then((action) => {
      console.log(action);
      res.status(200).json(action);
    })
    .catch((err) => {
      res.status(500).json({ message: "error retrieving the actions" });
    });
});

router.get("/:id", mw.validateActionsId, mw.logger, (req, res) => {
  res.status(200).json(req.action);
});

router.post("/", mw.validateAction, mw.logger, (req, res) => {
  const action = req.body;
  Actions.insert(action)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error inserting message" });
    });
});

router.put(
  "/:id",
  mw.validateAction,
  mw.validateAction,
  mw.logger,
  (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    Actions.update(id, changes)
      .then((action) => {
        res.status(201).json(action);
      })
      .catch((err) => {
        res.status(500).json({ message: "Server error" });
      });
  }
);

router.delete("/:id", mw.validateActionsId, mw.logger, (req, res) => {
  const { id } = req.params;
  Actions.remove(id).then((action) => {
    res.status(201).json();
  });
});

module.exports = router;
