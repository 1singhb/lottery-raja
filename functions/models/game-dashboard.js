const firebaseAdmin = require("firebase-admin");
const {FieldValue} = require("firebase-admin/firestore");
const db = firebaseAdmin.firestore();
const Constant = require("../util/constants");

module.exports = class GameDashboard {
  /**
     * Create Game Dashboard Info.
     * @param {string} userId User Unique Identifier.
     * @param {number} gameTotal Total Number of Game Participated.
     * @param {number} gameWon Number of Game Won.
     * @param {number} gamePercent Averange Winning Percent of User.
     * @param {number} gameAmount Total Game Amount Won by User.
     * @return {string} "SUCCESS".
     */
  createGameDashboardInfo(userId, gameTotal, gameWon, gamePercent, gameAmount) {
    const data = {
      total: gameTotal,
      won: gameWon,
      percent: gamePercent,
      amount: gameAmount,
    };

    return (new Promise((resolve, reject) => {
      const document = db.collection(Constant._GAME_DASHBOARDS).doc(userId);
      document.create(data);
      resolve("SUCCESS");
    }));
  }

  /**
     * Fetch User Game Dashboard Info.
     * @param {string} userId User Unique Identifier.
     * @return {JSON} User Game Dashboard Info.
     */
  fetchGameDashboardByUserId(userId) {
    return (new Promise((resolve, reject) => {
      const document = db.collection(Constant._GAME_DASHBOARDS).doc(userId);
      const response = document.get();
      resolve(response);
    }));
  }

  /**
     * Increment Total Game Participated.
     * @param {string} userId User Unique Identifier.
     * @return {string} "SUCCESS".
     */
  updateGameTotalByOne(userId) {
    return (new Promise((resolve, reject) => {
      const document = db.collection(Constant._GAME_DASHBOARDS).doc(userId);
      document.update("total", FieldValue.increment(1));
      resolve("SUCCESS");
    }));
  }

    /**
     * Decrement Total Game Participated.
     * @param {string} userId User Unique Identifier.
     * @return {string} "SUCCESS".
     */
    updateGameTotalByOneOnFailure(userId) {
      return (new Promise((resolve, reject) => {
        const document = db.collection(Constant._GAME_DASHBOARDS).doc(userId);
        document.update("total", FieldValue.increment(-1));
        resolve("SUCCESS");
      }));
    }

  /**
     * Increment Invitation Accepted Count and Amount.
     * @param {string} userId User Unique Identifier.
     * @param {number} gamePercent User Average Game Won Percent.
     * @param {number} gameAmount Game Amount Won By User.
     * @return {string} "SUCCESS".
     */
  updateGameWonPercentAndAmount(userId, gamePercent, gameAmount) {
    return (new Promise((resolve, reject) => {
      const document = db.collection(Constant._GAME_DASHBOARDS).doc(userId);
      document.update("won", FieldValue.increment(1),
          "percent", gamePercent,
          "amount", FieldValue.increment(gameAmount));
      resolve("SUCCESS");
    }));
  }

  /**
     * Delete User Game Dashboard Info.
     * @param {string} userId User Unique Identifier.
     * @return {string} "SUCCESS".
     */
  deleteGameDashboardInfoByUserId(userId) {
    return (new Promise((resolve, reject) => {
      const document = db.collection(Constant._GAME_DASHBOARDS).doc(userId);
      document.delete();
      resolve("SUCCESS");
    }));
  }
};
