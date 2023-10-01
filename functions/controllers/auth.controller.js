const User = require("../models/user");
const Wallet = require("../models/wallet");
const Setting = require("../models/setting");
const Bank = require("../models/bank");
const Invitation = require("../models/invitation");
const InvitationDashboard = require("../models/invitation-dashboard");
const GameDashboard = require("../models/game-dashboard");

const Number = require("../util/number");
const invitationDashboard = new InvitationDashboard();
const invitation = new Invitation;
const user = new User();
const wallet = new Wallet();
const bank = new Bank();
const setting = new Setting();
const gameDashboard = new GameDashboard();

exports.registerUser = (req, res, next) => {
  const userReferCode = Number.generateReferenceCode();

  (async () => {
    try {
      const userId = await user
          .createUser(req.body.name
              , req.body.image
              , userReferCode
              , req.body.phone);

      // Creating Bank Info
      bank.createDefaultBankInfo(userId, "", "", "", "", "");

      // Creating Default Setting Info
      setting.createDefaultSettingInfo(userId);

      // Creating Default Wallet Info
      wallet.createDefaultWalletInfo(userId);

      // Creating Invitation Dashboard Info
      invitationDashboard.createInvitationDashboardInfo(userId, 0, 0, userReferCode, 0);

      // Creating Game Dashboard Info
      gameDashboard.createGameDashboardInfo(userId,0,0,0,0);

      // Create Invitation Info 
      if(req.query.referal){
        invitation.createInvitationInfo(req.query.referal, 0, req.query.source, userId);

        // Update Invitation Dashboard Referal Total Count
        invitationDashboard.updateInvitationTotalByOne(req.query.referal);
      }

      return res.status(200).json({
        message: "User register successfully.",
        code: 200,
        timestamp: new Date(),
        status: "SUCCESS",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  })();
};
