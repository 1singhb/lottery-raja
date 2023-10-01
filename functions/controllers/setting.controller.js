const Setting = require("../models/setting");
const Authication = require("../util/authentication");

const setting = new Setting();

exports.getUserSettings = (req, res, next) => {
  (async () => {
    try {
      const userId = Authication.fetchCurrentUserId(req, res, next);
      const response = await setting.fetchUserSettingByUserId(userId);
      return res.status(200).json({
        message: "Settings fetch successfully.",
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

exports.updateSettings = (req, res, next) => {
  (async () => {
    try {
      const userId = Authication.fetchCurrentUserId(req, res, next);
      const response = await setting
          .updateSettingInfo(userId, req.body.music, req.body.sound, req.body.language);

      return res.status(200).json({
        message: "Settings updated successfully.",
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
