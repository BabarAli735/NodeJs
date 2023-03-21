const Users = require("../model/userModel");
const CatchAsync = require("../utills/catcAsync");

exports.signUp = CatchAsync(async (req, res) => {
  const newUser = await Users.create(req.body);

  res.status(201).json({
    status: "Success",
    data: {
      user: newUser,
    },
  });
});
