
const express = require("express");

const emojis = require("./emojis");


// eslint-disable-next-line new-cap
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.post("/hoge", (req, res) => {
  // payer : string
  // cost : u32
  // paid_for : [name]

  if (req.body.name) {
    console.log(req.body.name);
    res.json({
      error: "should give name",
    });
  } else {
    res.json({
      message: "API - 👋🌎🌍🌏",
    });
  }
});

router.use("/emojis", emojis);

module.exports = router;
