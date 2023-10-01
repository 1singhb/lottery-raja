const InvitationDashboard = require("../models/invitation-dashboard");
const Invitation = require("../models/invitation");
const User = require("../models/user");

const Authication = require("../util/authentication");

const invitationDashboard = new InvitationDashboard();
const invitation = new Invitation();
const user = new User();

exports.getUserInvitationDashboard = (req, res, next) => {
  (async () => {
    try {
      const userId = Authication.fetchCurrentUserId(req, res, next);
      const response = await invitationDashboard
      .fetchInvitationDashboardByUserId(userId);
      return res.status(200).json({
        message: "Invitation dashboard fetch successfully.",
        code: 200,
        timestamp: new Date(),
        status: "SUCCESS",
        data: response.data(),
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  })();
};

exports.getListOfUserInvitedByUser = (req, res, next) => {
  (async () => {
    try {
      const userId = Authication.fetchCurrentUserId(req, res, next);
      const page =  req.query.page != undefined ?  req.query.page : 0;
      const limit =  req.query.size != undefined ?  req.query.size : 10;
      
      const code = await user.fetchUserInvitationCodeByUserId(userId);
      const response = await invitation
      .fetchAllInvitationsByCode(code.data().code, page, limit);

      const fetchPromises = [];

      response.forEach((doc) => {

        // Fetch the nested document
        const fetchPromise = doc.get('user').get();
     
        fetchPromises.push(fetchPromise);

      });

      // Wait for all the fetch promises to resolve
    const nestedDocs = await Promise.all(fetchPromises);

    // Process the nested documents
    const result = nestedDocs.map((nestedDoc) => nestedDoc.data());

    // Log the array of nested document data
    console.log(result);

      return res.status(200).json({
        message: "Invited users fetch successfully.",
        code: 200,
        timestamp: new Date(),
        status: "SUCCESS",
        data: result,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  })();
};
