const firebaseAdmin = require("firebase-admin");
const db = firebaseAdmin.firestore();

const Constant = require("../util/constants");

module.exports = class Invitation {
  /**
     * Create Invitation Info.
     * @param {string} inviCode User Invitation Code.
     * @param {number} inviAmount Amount by Invitation.
     * @param {number} inviSource Source of Iniviation.
     * @param {number} inviUserId Invited User Unique Identifier
     * @return {string} "SUCCESS".
     */
  createInvitationInfo(inviCode, inviAmount, inviSource, inviUserId) {
    const data = {
      code: inviCode,
      amount: inviAmount,
      date: new Date(),
      source: inviSource,
      user: db.doc(Constant._USERS + "/" + inviUserId ),
      recharge: false,
    };

    
    return (new Promise((resolve, reject) => {
      const document = db.collection(Constant._INVITATIONS).doc();
      document.create(data);
      resolve("SUCCESS");
    }));
  }

  // TO DO
  /**
     * Fetch Invitations Page Wise by Users .
     * @param {string} inviCode User Unique Invitation Code.
     * @param {number} page Current Page Number.
     * @param {number} limit No of Records to retrieve.
     * @return {JSON} User Invitation Dashboard Info.
     */
  fetchAllInvitationsByCode(inviCode, page, limit) {
    console.log(inviCode);
    
    return (new Promise((resolve, reject) => {
      const document = db.collection(Constant._INVITATIONS);
      const response = document
      .where('code','==', inviCode )
      .orderBy('date')
      .limit(Number(limit)).get();
      resolve(response);
    }));
  }

  /**
     * Update User Invitation Info.
     * @param {string} inviCode User Invitation Code.
     * @param {number} inviUserId Invited User Unique Identifier
     * @return {string} "SUCCESS".
     */
  updateInvitationAcceptedTrue(inviCode, inviUserId) {
    return (new Promise((resolve, reject) => {
      const document = db.collection(Constant._INVITATIONS)
       .where("user", "==", inviUserId)
       .where("code", "==", inviCode)
       .update("accepted",true);

      resolve("SUCCESS");
    }));
  }

  /**
     * Delete User Invitation Dashboard Info.
     * @param {string} inviCode User Invitation Code.
     * @return {string} "SUCCESS".
     */
  deleteAllInvitationsInfoByCode(inviCode) {
    return (new Promise((resolve, reject) => {
      const document = db.collection(Constant._INVITATIONS)
      .where('code', '==',inviCode);
        document.get().then(function(querySnapshot) {
         querySnapshot.forEach(function(doc) {
         doc.ref.delete();
        });
      });
      resolve("SUCCESS");
    }));
  }
};
