const firebaseAdmin = require("firebase-admin");
const db = firebaseAdmin.firestore();

const Constant = require("../util/constants");
const GameStatus = require("../util/game-status");

module.exports = class Game {
  /**
     * Create Game .
     * @param {Date} gameStartDate Game Start Date Time.
     * @param {Date} gameEndDate Game End Date Time.
     * @param {number} gamePrice Game Price for Pariticipation.
     * @param {number} gameLimit Game Limit No. of Participants.
     * @return {string} "SUCCESS".
     */
  createGame(gameStartDate, gameEndDate, gamePrice, gameLimit) {
    const data = {
      start: new Date(gameStartDate),
      end: new Date(gameEndDate),
      price: gamePrice,
      limit: gameLimit,
      status: GameStatus._PLANNED,
    };
    return (new Promise((resolve, reject) => {
      const document = db.collection(Constant._GAMES).doc();
      document.create(data);
      resolve("SUCCESS");
    }));
  }

  /**
     * Update Game Status.
     * @param {string} gameId Game Unique Identifier.
     * @param {string} gameStatus Game Current Status.
     * @return {string} "SUCCESS".
     */
  updateGameStatus(gameId, gameStatus) {
    return (new Promise((resolve, reject) => {
      const document = db.collection(Constant._GAMES).doc(gameId);
      document.update("status", gameStatus);
      resolve("SUCCESS");
    }));
  }

  /**
     * Fetch List of Game By Date Range.
     * @param {Date} start Game Start Date Time.
     * @param {Date} end Game End Date Time.
     * @return {Array} List of Games.
     */
  fetchListOfGameByDateRange(start, end) {
    return (new Promise((resolve, reject) => {
      const data = [];
      const document = db.collection(Constant._GAMES)
          .where("start", ">=", start);
      const response = document.get();
      resolve(response.then( (QuerySnapshot) => {
        const docs = QuerySnapshot.docs;
        for (const doc of docs) {
          const selectedItem = {
            id: doc.id,
            start: new Date(doc.data().start._seconds * 1000),
            end: new Date(doc.data().end._seconds * 1000),
            price: doc.data().price,
            limit: doc.data().limit,
            status: doc.data().status,
          };
          data.push(selectedItem);
        }
        return data;
      }));
    }));
  }
};
