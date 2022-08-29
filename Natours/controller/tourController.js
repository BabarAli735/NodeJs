const fs = require("fs");
const Tours = require("../model/toursModel");
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkId = (req, res, next, val) => {
  if (req.params.id * 1 > tours.length) {
    res.status(404).json({
      status: "fail",
      message: "Data not Found!!!",
    });
  }
};

exports.createTour = async (req, res, next) => {
  try {
    const newTour =await  Tours.create(req.body);
    console.log(newTour);
    res.status(202).json({
      status: "Success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      Error: 'Invalid Data Sent!',
    });
  }
  next();
};
exports.getAllTourse = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: "Success",
    result: tours.length,
    data: {
      tours,
    },
  });
};
exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    res.status(404).json({
      status: "fail",
      message: "Data not Found",
    });
  }
  res.status(200).json({
    status: "Success",
    data: {
      tour,
    },
  });
};

exports.updateTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: "Success",
    data: {
      tour: "Update here",
    },
  });
};

exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: "Success",
    data: {
      tour: null,
    },
  });
};
