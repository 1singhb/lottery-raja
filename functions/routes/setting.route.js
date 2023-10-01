const express = require("express");

const settingController = require("../controllers/setting.controller");
// const authController = require("../util/authentication");

const router = express.Router();

// router.get("", [authController.verifyIdToken],
// settingController.getUserSettings);
router.get("", settingController.getUserSettings);

router.put("", settingController.updateSettings);

module.exports = router;
