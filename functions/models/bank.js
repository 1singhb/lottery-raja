const firebaseAdmin = require("firebase-admin");
const db = firebaseAdmin.firestore();

const Constant = require("../util/constants");

module.exports = class Bank {
  /**
     * Create User Bank Info.
     * @param {string} userId User Unique Identifier.
     * @param {string} userName User name as per Bank.
     * @param {string} userBank Name of the Bank.
     * @param {string} userIFSC User Bank IFSC.
     * @param {string} userAccNum User Bank Account Number.
     * @param {string} userUPI User UPI ID.
     * @return {string} "SUCCESS".
     */
  createDefaultBankInfo(userId, userName) {
    const data = {
      name: userName,
      bank: "",
      ifsc: "",
      account: "",
      upi: "",
    };

    return (new Promise((resolve, reject) => {
      const document = db.collection(Constant._BANKS).doc(userId);
      document.create(data);
      resolve("SUCCESS");
    }));
  }

  /**
     * Fetch User Bank Info.
     * @param {string} userId User Unique Identifier.
     * @return {JSON} User Bank Info.
     */
  fetchUserBankInfoByUserId(userId) {
    return (new Promise((resolve, reject) => {
      const document = db.collection(Constant._BANKS).doc(userId);
      const response = document.get();
      resolve(response);
    }));
  }

  /**
     * Update User Bank Info.
    * @param {string} userId User Unique Identifier.
     * @param {string} userName User name as per Bank.
     * @param {string} userBank Name of the Bank.
     * @param {string} userIFSC User Bank IFSC.
     * @param {string} userAccNum User Bank Account Number.
     * @param {string} userUPI User UPI ID.
     * @return {string} "SUCCESS".
     */
  updateBankInfo(userId, userName, userBank, userIFSC, userAccNum, userUPI) {
    const data = {
      name: userName,
      bank: userBank,
      ifsc: userIFSC,
      account: userAccNum,
      upi: userUPI,
    };

    return (new Promise((resolve, reject) => {
      const document = db.collection(Constant._BANKS).doc(userId);
      document.update(data);
      resolve("SUCCESS");
    }));
  }

  /**
     * Delete User Bank Info.
     * @param {string} userId User Unique Identifier.
     * @return {string} "SUCCESS".
     */
  deleteUserBankInfoByUserId(userId) {
    return (new Promise((resolve, reject) => {
      const document = db.collection(Constant._BANKS).doc(userId);
      document.delete();
      resolve("SUCCESS");
    }));
  }
};
