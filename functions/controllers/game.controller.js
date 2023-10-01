const Game = require("../models/game");
const GameDashboard = require("../models/game-dashboard");
const Participant = require("../models/participant");
const Authication = require("../util/authentication");

const game = new Game();
const gameDashboard = new GameDashboard();
const participant = new Participant();

exports.getListOfGames = (req, res, next) => {
  return null;
};

exports.getListOfAvailableGames = (req, res, next) => {
  (async () => {
    try {
      const start = new Date("2023-04-01");
      const end = new Date("2023-04-01");
      const response = await game.fetchListOfGameByDateRange(start, end);
      return res.status(200).json({
        message: "Games fetch successfully.",
        code: 200,
        timestamp: new Date(),
        status: "SUCCESS",
        data: response,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  })();
};

exports.createGame = (req, res, next) => {
  (async () => {
    try {
      const response = await game
          .createGame(req.body.start
              , req.body.end
              , req.body.price
              , req.body.limit);

      return res.status(200).json({
        message: "Game created successfully.",
        code: 200,
        timestamp: new Date(),
        status: response,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  })();
};

exports.getGameResult = (req, res, next) => {
  (async () => {
    try {
      const userId = "QbBNVtESq0GSWzIWOGnf";
      const response = await participant
          .fetchGameResultByGameId(req.params.gameId, userId);

      return res.status(200).json({
        message: "Game result fetch successfully.",
        code: 200,
        timestamp: new Date(),
        status: response,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  })();
};

exports.participateTheGame = (req, res, next) => {
  (async () => {
    try {
      const userId = Authication.fetchCurrentUserId(req, res, next);
      const response = await participant
          .createParticipant(req.body.game, userId);

      // Increment the Game Participant Count by One
      gameDashboard.updateGameTotalByOne(userId);

      return res.status(200).json({
        message: "Participated in the game successfully.",
        code: 200,
        timestamp: new Date(),
        status: response,
      });
    } catch (error) {
      console.log(error);
         
      // Decrement the Game Participant Count by One
      gameDashboard.updateGameTotalByOneOnFailure(userId);

      return res.status(500).send(error.message);
    }
  })();
};
