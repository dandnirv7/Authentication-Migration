const express = require("express");
require("dotenv").config();

const router = require("./routes/Routes");

const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  return res.status(200).send({
    response: "Hello World ",
  });
});

app.use(router);

app.listen(port, () => {
  console.log(`server listening at port: ${port}`);
});
