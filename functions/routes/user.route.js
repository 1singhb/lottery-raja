const express = require("express");

const userController = require("../controllers/user.controller");

const router = express.Router();

router.get("/profile", userController.getUserProfileInfo);

router.put("/profile", userController.updateUserProfileInfo);

router.get("/dashboard", userController.getUserGameDashboard);

router.get("/bank", userController.getUserBankInfo);

router.put("/bank", userController.updateUserBankInfo);

router.get("/game", userController.getListOfGameUserHasParticipated);

router.get("/wallet", userController.getUserWalletInfo);

module.exports = router;
