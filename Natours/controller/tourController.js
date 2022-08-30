const { match } = require("assert");
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
    const newTour = await Tours.create(req.body);
    res.status(202).json({
      status: "Success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      Error: err,
    });
  }
  next();
};
exports.getAllTourse = async (req, res) => {
  try {
    // console.log(req.query);
    //BUID QUERY
    //1A ) FILTERING
    const queryObject = { ...req.query };
    const excludedField = ["page", "sort", "limit", "feilds"];
    excludedField.forEach((el) => delete queryObject[el]);

    // 1B ) ADVANCE FILTERING
    let queryStr = JSON.stringify(queryObject);
    const regex = /\b(gt|gte|lt|lte|in)\b/g;
    queryStr = queryStr.replace(regex, "$$" + "$1");
    let query = Tours.find(JSON.parse(queryStr));

    // 2)SORTING
    if (req.query.sort) {
      const sortBy=req.query.sort.split(',').join(' ')
      console.log(sortBy);
      query = query.sort(sortBy);
      //Sort(price , ratingsAverage)
    }else{
      //Expample if createdAt date available in Data createdAt 
      query = query.sort('-createdAt'); 
    }
    //EXECUTE QUERY
    const tours = await query;
    res.status(200).json({
      status: "Success",
      result: tours.length,
      data: {
        tours: tours,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err,
    });
  }
};
exports.getTour = async (req, res) => {
  try {
    const getTour = await Tours.findById(req.params.id);
    //Tour.findOne({id:req.params.id})
    res.status(200).json({
      status: "Success",
      data: {
        tour: getTour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const updateTour = await Tours.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    //Tour.findOne({id:req.params.id})
    res.status(200).json({
      status: "Success",
      data: {
        tour: updateTour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const DeleteTour = await Tours.findByIdAndDelete(req.params.id);
    //Tour.findOne({id:req.params.id})
    res.status(200).json({
      status: "Success",
      message: "Item Deleted Successfuly",
      data: {
        tour: DeleteTour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};
