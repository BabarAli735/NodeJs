const Users= require("../model/userModel");
const CatchAsync = require("../utills/catcAsync");
const jwt=require('jsonwebtoken')
const AppError = require("./../utills/appError");
const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRETE, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};
exports.signUp = CatchAsync(async (req, res) => {
  const newUser = await Users.create(req.body)

  const token=signToken(newUser._id)
  res.status(201).json({
    status: "Success",
    token:token,
    data: {
      user: newUser,
    },
  });
});

exports.signIn = CatchAsync(async (req, res,next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct
  const user = await Users.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
//3 if everything is ok send token to clients
const token=signToken(user._id);
res.status(200).json({
  statuc:'success',
  user,
  token
})
})