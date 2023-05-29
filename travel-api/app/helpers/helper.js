const jwt = require("jsonwebtoken");
require("dotenv").config();

const ResponseData = (status, message, error, data) => {
  const res = {
    status,
    message,
    errors: error,
    data: data,
  };
  return res;
};

const GenerateToken = (data) => {
  const token = jwt.sign(data, process.env.JWT_TOKEN, { expiresIn: 600 });

  return token;
};

const GenerateRefreshToken = (data) => {
  const token = jwt.sign(data, process.env.JWT_REFRESH_TOKEN, {
    expiresIn: 86400,
  });

  return token;
};

const ExtractToken = (token) => {
  const secretKey = process.env.JWT_TOKEN;

  let resData;

  const res = jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      resData = null;
    } else {
      resData = decoded;
    }
  });

  if (resData) {
    const result = resData;
    return result;
  }

  return null;
};

const ExtractRefreshToken = (token) => {
  const secretKey = process.env.JWT_Refresh_TOKEN;

  let resData;

  const res = jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      resData = null;
    } else {
      resData = decoded;
    }
  });

  if (resData) {
    const result = resData;
    return result;
  }

  return null;
};

module.exports = {
  ResponseData,
  GenerateToken,
  GenerateRefreshToken,
  ExtractToken,
  ExtractRefreshToken,
};
