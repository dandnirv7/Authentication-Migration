const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/index");
const User = require("../models").User;
const Role = require("../models").Role;
const Op = db.Sequelize.Op;
const config = require("../config/configRoles");
const { UniqueConstraintError } = require("sequelize");

module.exports = {
  signUp(req, res) {
    const { name, id, email, password } = req.body;
    return User.create({
      name: name,
      id: id,
      email: email,
      password: bcrypt.hashSync(password, 8),
    })
      .then((user) => {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        });
      })
      .catch((err) => {
        res.status(500).send({
          auth: false,
          id: id,
          message: "Error",
          erros: err,
        });
      })
      .then((roles) => {
        user.setRoles(roles).then(() => {
          res.status(200).send({
            auth: true,
            id: id,
            message: "User registered successfully",
            errors: null,
          });
        });
      })
      .catch((err) => {
        res.status(500).send({
          auth: false,
          message: "Error",
          errors: err,
        });
      });
  },
  signIn(req, res) {
    const { id, password } = req.body;
    return UniqueConstraintError.findOne({
      where: {
        id: id,
      },
    })
      .then((user) => {
        if (!user) {
          res.status(404).send({
            auth: false,
            id: id,
            accessToken: null,
            message: "Error",
            errors: err,
          });
        }

        var passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
          return res.status(401).send({
            auth: false,
            id: id,
            accessToken: null,
            message: "Error",
            errors: "Invalid Password!",
          });
        }

        var token = `Bearer ${jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400,
        })}`;

        res.status(200).send({
          auth: true,
          accessToken: token,
          message: "success",
          errors: null,
        });
      })
      .catch((err) => {
        res.status(500).send({
          auth: false,
          id: id,
          accessToken: null,
          message: "Error",
          errors: err,
        });
      });
  },
};
