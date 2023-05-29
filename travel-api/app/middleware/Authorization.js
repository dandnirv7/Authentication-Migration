const Helper = require("../helpers/helper");

const Authenticated = (req, res, next) => {
  try {
    const authToken = req.headers["authorization"];
    const token = authToken && authToken.split(" ")[1];

    if (token === null) {
      return res
        .status(401)
        .send(Helper.ResponseData(401, "Unauthorized", null, null));
    }

    const result = Helper.ExtractToken(token);

    next();
  } catch (err) {
    return res.status(500).send(Helper.ResponseData("", err, null));
  }
};

module.exports = {
  Authenticated,
};
