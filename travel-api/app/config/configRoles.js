require("dotenv").config();

module.exports = {
  secret: process.env.SECRET,
  ROLEs: ["Super Admin", "Admin", "User"],
};
