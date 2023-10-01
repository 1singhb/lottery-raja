const firebaseAdmin = require("firebase-admin");
const db = firebaseAdmin.firestore();

const Constant = require("../util/constants");

module.exports = class Wallet {
  /**
     * Create User Wallet Info.
     * @param {string} userId User Unique Identifier.
     * @param {number} walletBalance User Wallet Info.
     * @return {string} "SUCCESS".
     */
  createDefaultWalletInfo(userId) {
    const data = {
      balance: 20,
      limit: {
        min: 20,
        occurrence: 4,
        withdrawl: 2000,
      },
    };

    return (new Promise((resolve, reject) => {
      const document = db.collection(Constant._WALLETS).doc(userId);
      document.create(data);
      resolve("SUCCESS");
    }));
  }

  /**
     * Fetch User Wallet Info.
     * @param {string} userId User Unique Identifier.
     * @return {JSON} User Wallet Info.
     */
  fetchUserWalletInfoByUserId(userId) {
    return (new Promise((resolve, reject) => {
      const document = db.collection(Constant._WALLETS).doc(userId);
      const response = document.get();
      resolve(response);
    }));
  }

  /**
     * Update User Wallet Info.
     * @param {string} userId User Unique Identifier.
     * @param {number} balance Wallet Balance Info.
     * @param {number} minBalLimit Wallet minimum balance limit.
     * @param {number} dailyLimit Wallet daily withdrawl limit.
     * @param {number} maxLimit Wallet maximum widthdrawl limit.
     * @return {string} "SUCCESS".
     */
  updateWalletInfoByUserId(userId, balance, minBalLimit, dailyLimit, maxLimit) {
    const data = {
      balance: balance,
      limit: {
        min: minBalLimit,
        occurrence: dailyLimit,
        withdrawl: maxLimit,
      },
    };

    return (new Promise((resolve, reject) => {
      const document = db.collection(Constant._WALLETS).doc(userId);
      document.update(data);
      resolve("SUCCESS");
    }));
  }

  /**
     * Delete User Wallet Info.
     * @param {string} userId User Unique Identifier.
     * @return {string} "SUCCESS".
     */
  deleteUserWalletInfoByUserId(userId) {
    return (new Promise((resolve, reject) => {
      const document = db.collection(Constant._WALLETS).doc(userId);
      document.delete();
      resolve("SUCCESS");
    }));
  }
};
