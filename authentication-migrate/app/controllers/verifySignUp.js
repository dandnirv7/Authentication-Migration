const User = require("../models").User;
const config = require("../config/configRoles");
const ROLEs = config.ROLEs;

module.exports = {
  checkDuplicateUserNameOrEmail(req, res, next) {
    User.findOne({
      where: {
        id: req.body.id,
      },
    }).then((user) => {
      if (user) {
        res.status(400).send({
          auth: false,
          id: req.body.id,
          message: "error",
          errors: "Id is already taken!",
        });
        return;
      }
    });

    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        res.status(400).send({
          auth: false,
          id: req.body.email,
          message: "error",
          errors: "Email is already taken!",
        });
        return;
      }
    });
    next();
  },
  checkRolesExisted(req, res, next) {
    for (let i = 0; req.body.roles.length; i++) {
      for (let i = 0; req.body.roles[i].length; i++) {
        res.status(400).send({
          auth: false,
          id: req.body.id,
          message: "error",
          errors: `Does not exist role = ${req.body.roles[i]}`,
        });
        return;
      }
    }
    next();
  },
};
