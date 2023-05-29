const { User } = require("../models");
const { Op } = require("sequelize");
const config = require("../config/configRoles.js");
const ROLEs = config.ROLEs;
const helper = require("../helpers/helper");

const validateName = (name) => {
  if (!name) {
    return { isValid: false, message: "Name is required" };
  }

  if (typeof name !== "string") {
    return { isValid: false, message: "Name must be a string" };
  }

  if (name.length > 50) {
    return { isValid: false, message: "Name must not exceed 50 characters" };
  }

  return { isValid: true };
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateEmail = (email) => {
  if (!email) {
    return { isValid: false, message: "Email is required" };
  }

  if (!isValidEmail(email)) {
    return { isValid: false, message: "Invalid email format" };
  }

  return { isValid: true };
};

const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, message: "Password is required" };
  }

  if (password.length < 8) {
    return {
      isValid: false,
      message: "Password must be at least 8 characters",
    };
  }

  return { isValid: true };
};

const validateConfirmPassword = (confirmPassword, password) => {
  if (!confirmPassword) {
    return { isValid: false, message: "Confirm password is required" };
  }

  if (confirmPassword !== password) {
    return {
      isValid: false,
      message: "Password and confirm password do not match",
    };
  }

  return { isValid: true };
};

const checkDuplicateUserNameOrEmail = async (name, email) => {
  try {
    const existingUser = await User.findOne({
      where: { [Op.or]: [{ name }, { email }] },
    });

    if (existingUser) {
      const error =
        existingUser.name === name
          ? "Name is already taken!"
          : "Email is already taken!";

      throw new Error(error);
    }
  } catch (error) {
    throw new Error("Error during duplicate username or email check: " + error);
  }
};

const RegisterValidation = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    const nameValidation = validateName(name);
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
    const confirmPasswordValidation = validateConfirmPassword(
      confirmPassword,
      password
    );

    if (!nameValidation.isValid) {
      throw new Error(nameValidation.message);
    }

    if (!emailValidation.isValid) {
      throw new Error(emailValidation.message);
    }

    if (!passwordValidation.isValid) {
      throw new Error(passwordValidation.message);
    }

    if (!confirmPasswordValidation.isValid) {
      throw new Error(confirmPasswordValidation.message);
    }

    await checkDuplicateUserNameOrEmail(name, email);

    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const ValidateRoles = (req, res, next) => {
  try {
    if (!req.body.roles || !Array.isArray(req.body.roles)) {
      // Jika roles tidak ada atau bukan array, bisa dianggap valid
      return next();
    }

    const invalidRoles = req.body.roles.filter(
      (role) => !ROLEs.includes(role.toUpperCase())
    );

    if (invalidRoles.length > 0) {
      return res
        .status(400)
        .send(
          helper.ResponseData(
            400,
            "Error",
            "Invalid Roles: " + invalidRoles.join(", "),
            null
          )
        );
    }

    next();
  } catch (err) {
    console.log("Error during roles check: ", err),
      res
        .status(500)
        .send(
          helper.ResponseData(
            500,
            "Error during roles check",
            err.message,
            null
          )
        );
  }
};

module.exports = {
  RegisterValidation,
  ValidateRoles,
};
