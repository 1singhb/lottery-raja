const functions = require("firebase-functions");

const express = require("express");
const app = express();

const admin = require("firebase-admin");
const serviceAccount = require("./permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lottery-app-c208a.firebaseio.com",
});

const cors = require("cors");
app.use( cors({origin: true} ));

const bodyParser = require("body-parser");
const userRoutes = require("./routes/user.route");
const gameRoutes = require("./routes/game.route");
const invitationRoutes = require("./routes/invitation.route");
const settingRoutes = require("./routes/setting.route");
const authRoutes = require("./routes/auth.route");

app.use(bodyParser.json()); // application/json
app.use("/v1/", authRoutes);
app.use("/v1/users", userRoutes);
app.use("/v1/games", gameRoutes);
app.use("/v1/invitations", invitationRoutes);
app.use("/v1/settings", settingRoutes);

// Export the APIs to firebase Cloud Functions
exports.app = functions.https.onRequest(app);
