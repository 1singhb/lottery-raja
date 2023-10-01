const firebaseAdmin = require("firebase-admin");
const db = firebaseAdmin.firestore();

const Constant = require("../util/constants");

module.exports = class User {
  /**
     * Create User.
     * @param {string} userName User Full Name.
     * @param {string} userImage User Profile Image.
     * @param {string} userReferenceCode User Profile Image.
     * @param {string} userPhone User Profile Image.
     * @return {string} "SUCCESS".
     */
  createUser(userName, userImage, userReferenceCode, userPhone) {
    const userId = db.collection(Constant._USERS).doc().id;
    console.log("userID : " + userId);

    const data = {
      code: userReferenceCode,
      name: userName,
      image: userImage,
      phone: userPhone,
    };
    return (new Promise((resolve, reject) => {
      const document = db.collection(Constant._USERS).doc(userId);
      document.create(data);
      resolve(userId);
    }));
  }

  /**
     * Fetch User Info.
     * @param {string} userId User Unique Identifier.
     * @return {JSON} User Info.
     */
  fetchUserByUserId(userId) {
    return (new Promise((resolve, reject) => {
      const document = db.collection(Constant._USERS).doc(userId);
      const response = document.get();
      resolve(response);
    }));
  }

  /**
     * Update User Info.
     * @param {string} userId User Unique Identifier.
     * @param {string} userName User Full Name.
     * @param {string} userImage User Profile Image.
     * @return {string} "SUCCESS".
     */
  updateUserInfo(userId, userName, userImage) {
    const data = {
      name: userName,
      image: userImage,
    };
    return (new Promise((resolve, reject) => {
      const document = db.collection(Constant._USERS).doc(userId);
      document.update({
        name: data.name,
        image: data.image,
      });
      resolve("SUCCESS");
    }));
  }

   /**
     * Fetch User Info.
     * @param {string} userId User Unique Identifier.
     * @return {string} User Invitation Code.
     */
   fetchUserInvitationCodeByUserId(userId) {
    return (new Promise((resolve, reject) => {
      const document = db.collection(Constant._USERS).doc(userId);
      const response = document.get();
      resolve(response);
    }));
  }
};
