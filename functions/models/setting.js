const firebaseAdmin = require("firebase-admin");
const db = firebaseAdmin.firestore();

const Constant = require("../util/constants");

module.exports = class Setting {
  /**
     * Create User Setting.
     * @param {string} userId User Unique Identifier.
     * @param {string} soundSetting User Sound Setting Info.
     * @param {string} languageSetting User Language Setting Info.
     * @param {string} privacyLink User Sound Setting Info.
     * @param {string} ruleLink User Language Setting Info.
     * @return {string} "SUCCESS".
     */
  createDefaultSettingInfo(userId) {
    const data = {
      music: "on",
      sound: "on",
      language: "english",
      privacy: Constant._PRIVACY_LINK,
      rules: Constant._RULE_LINK,
    };

    return (new Promise((resolve, reject) => {
      const document = db.collection(Constant._SETTINGS).doc(userId);
      document.create(data);
      resolve("SUCCESS");
    }));
  }

  /**
     * Fetch User Setting Info.
     * @param {string} userId User Unique Identifier.
     * @return {JSON} User Setting Info.
     */
  fetchUserSettingByUserId(userId) {
    return (new Promise((resolve, reject) => {
      const document = db.collection(Constant._SETTINGS).doc(userId);
      const response = document.get();
      resolve(response);
    }));
  }

  /**
     * Update User Setting Info.
     * @param {string} userId User Unique Identifier.
     * @param {string} soundSetting User Sound Setting Info.
     * @param {string} languageSetting User Language Setting Info.
     * @return {string} "SUCCESS".
     */
  updateSettingInfo(userId, musicSetting, soundSetting, languageSetting) {
    const data = {
      music: musicSetting,
      sound: soundSetting,
      language: languageSetting,
    };

    return (new Promise((resolve, reject) => {
      const document = db.collection(Constant._SETTINGS).doc(userId);
      document.update(data);
      resolve("SUCCESS");
    }));
  }

  /**
     * Delete User Setting Info.
     * @param {string} userId User Unique Identifier.
     * @return {string} "SUCCESS".
     */
  deleteUserSettingByUserId(userId) {
    return (new Promise((resolve, reject) => {
      const document = db.collection(Constant._SETTINGS).doc(userId);
      document.delete();
      resolve("SUCCESS");
    }));
  }
};
