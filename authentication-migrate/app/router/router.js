const verifySignUpController = require("../controllers").verifySignUp;
const verifySignController = require("../controllers").verifySign;
const statusController = require("../controllers").status;
const verifyJwtTokenController = require("../controllers").verifyJwtToken;

module.exports = function (app) {
  //User Auth
  app.post(
    "/api/auth/signup",
    [
      verifySignUpController.checkDuplicateUserNameOrEmail,
      verifySignUpController.checkRolesExisted,
    ],
    (req, res) => {
      verifySignController.signUp(req, res);
    }
  );

  app.post("/api/auth/signin", (req, res) => {
    verifySignController.signIn(req, res);
  });

  //Status
  app.get("/api/status", statusController.list);
  app.get(
    "/api/statususer",
    [verifyJwtTokenController.verifyToken],
    statusController.listStatusUser
  );
  app.get(
    "/api/status/:id",
    [verifyJwtTokenController.verifyToken, verifyJwtTokenController.isAdmin],
    statusController.getById
  );
  app.post(
    "/api/status",
    [verifyJwtTokenController.verifyToken, verifyJwtTokenController.isAdmin],
    statusController.add
  );
  app.put(
    "/api/status/:id",
    [verifyJwtTokenController.verifyToken, verifyJwtTokenController.isAdmin],
    statusController.update
  );
  app.delete(
    "/api/status/:id",
    [verifyJwtTokenController.verifyToken, verifyJwtTokenController.isAdmin],
    statusController.delete
  );
};
