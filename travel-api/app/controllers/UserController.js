const express = require("express");
const { User } = require("../models");
const Helper = require("../helpers/helper");
const PasswordHelper = require("../helpers/passwordHelper");

const Register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    const hashed = await PasswordHelper.PasswordHashing(password);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role_id: 1,
    });

    return res
      .status(201)
      .send(Helper.ResponseData(201, "Created", null, user));
  } catch (err) {
    return res
      .status(500)
      .send(Helper.ResponseData(500, "", null, err.message));
  }
};

const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res
        .status(401)
        .send(Helper.ResponseData(401, "Unauthorize", null, null));
    }

    const matched = await PasswordHelper.PasswordCompare(
      password,
      user.password
    );

    if (!matched) {
      return res
        .status(401)
        .send(Helper.ResponseData(401, "Unauthorize", null, null));
    }

    const dataUser = {
      name: user.name,
      email: user.email,
      role_id: user.role_id,
    };

    const token = Helper.GenerateToken(dataUser);
    const refreshToken = Helper.GenerateRefreshToken(dataUser);

    user.accessToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    const responseUser = {
      name: user.name,
      email: user.email,
      role_id: user.role_id,
      token: token,
    };
    return res
      .status(200)
      .send(Helper.ResponseData(200, "OK", null, responseUser));
  } catch (err) {
    return res.status(500).send(Helper.ResponseData(500, "", err, null));
  }
};

module.exports = {
  Register,
  UserLogin,
};
