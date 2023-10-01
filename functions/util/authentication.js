const firebaseAdmin = require("firebase-admin");

exports.verifyIdToken = (req, res, next) => {
  (async () => {
    const token = req.header("X-Firebase-AppCheck");
    if (!token) {
      return res.status(403).json({
        message: "Forbidden Access",
        code: 403,
        timestamp: new Date(),
        status: "ACCESS_DENIED",
      });
    }
    try {
      await firebaseAdmin.appCheck().verifyToken(token);
      return next();
    } catch (err) {
      return res.status(401).json({
        message: "Unauthorized",
        code: 401,
        timestamp: new Date(),
        status: "ACCESS_DENIED",
      });
    }
  })();
};


exports.fetchCurrentUserId = (req, res, next) => {
 
  return "asyATfcKSAwoFUOtvDRL";

};
