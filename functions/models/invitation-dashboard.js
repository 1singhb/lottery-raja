const firebaseAdmin = require("firebase-admin");
const {FieldValue} = require("firebase-admin/firestore");
const db = firebaseAdmin.firestore();

const Constant = require("../util/constants");

module.exports = class InvitationDashboard {
  /**
     * Create Invitation Dashboard Info.
     * @param {string} userId User Unique Identifier.
     * @param {number} inviTotal Total Number of User Invitations.
     * @param {number} inviAccepted Number of User Accepted.
     * @param {number} inviCode User Invitation Code.
     * @param {number} inviAmount Total Amount Won by Invitation.
     * @return {string} "SUCCESS".
     */
  createInvitationDashboardInfo(
      userId,
      inviTotal,
      inviAccepted,
      inviCode,
      inviAmount) {
    const data = {
      total: inviTotal,
      accepted: inviAccepted,
      code: inviCode,
      amount: inviAmount,
    };

    return (new Promise((resolve, reject) => {
      const document = db.collection(Constant._INVITATION_DASHBOARDS)
          .doc(userId);
      document.create(data);
      resolve("SUCCESS");
    }));
  }

  /**
     * Fetch User Invitation Dashboard Info.
     * @param {string} userId User Unique Identifier.
     * @return {JSON} User Invitation Dashboard Info.
     */
  fetchInvitationDashboardByUserId(userId) {
    return (new Promise((resolve, reject) => {
      const document = db.collection(Constant._INVITATION_DASHBOARDS)
          .doc(userId);
      const response = document.get();
      resolve(response);
    }));
  }

  /**
     * Increment Invitation Total Count.
     * @param {string} userInvCode User Unique Identifier.
     * @return {string} "SUCCESS".
     */
  updateInvitationTotalByOne(userInvCode) {
    console.log(userInvCode);

    return (new Promise((resolve, reject) => {
            const document =  db.collection(Constant._INVITATION_DASHBOARDS)
            .where('code','==',userInvCode);

            document.get().then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
              doc.ref.update({total: FieldValue.increment(1)});
             });
           });
      
            resolve("SUCCESS");
    }));
  }

  /**
     * Increment Invitation Accepted Count and Amount.
     * @param {string} userId User Unique Identifier.
     * @param {number} inviAmount Total Amount Earned By Invitation.
     * @return {string} "SUCCESS".
     */
  updateInvitationAcceptedAndAmount(userId, inviAmount) {
    return (new Promise((resolve, reject) => {
      const document = db.collection(Constant._INVITATION_DASHBOARDS)
          .doc(userId).get();
          
      document.update("accepted", FieldValue.increment(1),
          "amount", FieldValue.increment(inviAmount));
      resolve("SUCCESS");
    }));
  }

  /**
     * Delete User Invitation Dashboard Info.
     * @param {string} userId User Unique Identifier.
     * @return {string} "SUCCESS".
     */
  deleteInvitationDashboardInfoByUserId(userId) {
    return (new Promise((resolve, reject) => {
      const document = db.collection(Constant._INVITATION_DASHBOARDS)
          .doc(userId);
      document.delete();
      resolve("SUCCESS");
    }));
  }
};
