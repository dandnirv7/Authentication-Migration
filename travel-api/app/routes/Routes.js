const express = require("express");
const router = express.Router();
const RoleController = require("../controllers/RoleController");
const UserController = require("../controllers/UserController");
const UserValidation = require("../middleware/UserValidation");

const Authorization = require("../middleware/Authorization");

router.get("/role", Authorization.Authenticated, RoleController.GetRole);
router.get("/role/:id", RoleController.GetRoleById);
router.post("/role", RoleController.CreateRole);
router.patch("/role/:id", RoleController.UpdateRole);
router.delete("/role/:id", RoleController.DeleteRole);

// User Routing
router.post(
  "/user/signup",
  UserValidation.RegisterValidation,
  UserValidation.ValidateRoles,
  UserController.Register
);

router.post("/user/login", UserController.UserLogin);

module.exports = router;
