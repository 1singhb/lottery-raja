const User = require("../models/user");
const Bank = require("../models/bank");
const Wallet = require("../models/wallet");
const Game = require("../models/game");
const GameDashboard = require("../models/game-dashboard");
const Participant = require("../models/participant");
const Authication = require("../util/authentication");

const user = new User();
const bank = new Bank();
const wallet = new Wallet();
const game = new Game();
const gameDashboard = new GameDashboard();
const participate = new Participant();

exports.getUserProfileInfo = (req, res, next) => {
  (async () => {
    try {
      const userId = Authication.fetchCurrentUserId(req, res, next);
      const response = await user.fetchUserByUserId(userId);

      return res.status(200).json({
        message: "Profile fetch successfully.",
        code: 200,
        timestamp: new Date(),
        status: "SUCCESS",
        data: response.data(),
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  })();
};

exports.updateUserProfileInfo = (req, res, next) => {
  (async () => {
    try {
      const userId = Authication.fetchCurrentUserId(req, res, next);
      const response = await user
          .updateUserInfo(userId, req.body.name, req.body.image);

      return res.status(200).json({
        message: "Profile updated successfully.",
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

exports.getUserGameDashboard = (req, res, next) => {
  (async () => {
    try {
      const userId = Authication.fetchCurrentUserId(req, res, next);
      const response = await gameDashboard.fetchGameDashboardByUserId(userId);
      return res.status(200).json({
        message: "Game dashboard fetch successfully.",
        code: 200,
        timestamp: new Date(),
        status: "SUCCESS",
        data: response.data(),
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  })();
};

exports.getUserBankInfo = (req, res, next) => {
  (async () => {
    try {
      const userId = Authication.fetchCurrentUserId(req, res, next);
      const response = await bank.fetchUserBankInfoByUserId(userId);

      return res.status(200).json({
        message: "Bank details fetch successfully.",
        code: 200,
        timestamp: new Date(),
        status: "SUCCESS",
        data: response.data(),
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  })();
};

exports.updateUserBankInfo = (req, res, next) => {
  (async () => {
    try {
      const userId = Authication.fetchCurrentUserId(req, res, next);
      const response = await bank
          .updateBankInfo( userId
              , req.body.name
              , req.body.bank
              , req.body.ifsc
              , req.body.account
              , req.body.upi );

      return res.status(200).json({
        message: "Bank details updated successfully.",
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


exports.getListOfGameUserHasParticipated = (req, res, next) => {
  (async () => {
    try {
      const userId = Authication.fetchCurrentUserId(req, res, next);
      const page =  req.query.page != undefined ?  req.query.page : 0;
      const limit =  req.query.size != undefined ?  req.query.size : 10;
      
      const response = await participate
      .fetchGamesParticipatedByUserId(userId, page, limit);

      let result = [];

      response.forEach(doc => {
        console.log(doc.id,doc.data().won);
        result.push({
          id:doc.id,
          won:doc.data().won,
          rank:doc.data().rank,
          amount:doc.data().amount
        });
      });

      return res.status(200).json({
        message: "Games user participated fetch successfully.",
        code: 200,
        timestamp: new Date(),
        status: "SUCCESS",
        data: result,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  })();
};

exports.getUserWalletInfo = (req, res, next) => {
  (async () => {
    try {
      const userId = Authication.fetchCurrentUserId(req, res, next);
      const response = await wallet.fetchUserWalletInfoByUserId(userId);
      return res.status(200).json({
        message: "Wallet details fetch successfully.",
        code: 200,
        timestamp: new Date(),
        status: "SUCCESS",
        data: response.data(),
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  })();
};
