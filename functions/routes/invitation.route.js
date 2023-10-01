const express = require("express");

const invitationController = require("../controllers/invitation.controller");

const router = express.Router();

router.get("/dashboard", invitationController.getUserInvitationDashboard);

router.get("", invitationController.getListOfUserInvitedByUser);

module.exports = router;
