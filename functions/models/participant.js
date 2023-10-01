const firebaseAdmin = require("firebase-admin");
const db = firebaseAdmin.firestore();

const Constant = require("../util/constants");

module.exports = class Participant {
  /**
     * Create Participant .
     * @param {string} gameId Game Id on which user has participate.
     * @param {string} userId User unique identifier.
     * @return {string} "SUCCESS".
     */
  createParticipant(gameId, userId) {
    const data = {
      rank: 0,
      amount: 0,
      date: new Date(),
      won: false,
      user: db.doc(Constant._USERS + "/" + userId ),
      game: db.doc(Constant._GAMES + "/" + gameId ),
    };

    return (new Promise((resolve, reject) => {
      const document = db.collection(Constant._PARTICIPANTS).doc();
      document.create(data);
      resolve("SUCCESS");
    }));
  }

  //TO DO
    /**
     * Fetch List of Game User has participated Page Wise.
     * @param {string} userId User Unique Identifier.
     * @param {number} page Current Page Number.
     * @param {number} limit No of Records to retrieve.
     * @return {JSON} User Game Dashboard Info.
     */
  fetchGamesParticipatedByUserId(userId, page, limit){

    return (new Promise((resolve, reject) => {
      const document = db.collection(Constant._PARTICIPANTS);
      const response = document
      .where('user','=',db.doc(Constant._USERS + "/" + userId ) )
      .orderBy('date')
      .limit(Number(limit)).get();

      resolve(response);
    }));
  }

   /**
     * Fetch Game Result.
     * @param {string} gameId User Unique Identifier.
     * @return {JSON} User Game Dashboard Info.
     */
  fetchGameResultByGameId(gameId,userId){
    return (new Promise((resolve, reject) => {
      const document = db.collection(Constant._PARTICIPANTS);
      const response = document
      .orderBy('date')
      .startAt(0)
      .limit(10).get();

      resolve(response);
    }));
  }

};
