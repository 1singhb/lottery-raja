const express = require("express");

const gameController = require("../controllers/game.controller");

const router = express.Router();

router.get("", gameController.getListOfGames);

router.get("/available", gameController.getListOfAvailableGames);

router.post("", gameController.createGame);

router.get("/:gameId", gameController.getGameResult);

router.post("/participate", gameController.participateTheGame);

module.exports = router;
