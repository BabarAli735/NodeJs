const fs = require("fs");
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
exports.checkBody = (req, res, next)=>{ // middleware 1
  if (!req.body.price){
      return res.status(400).json({
          status:'fail',
          message:'Missing price!!!'
      })
  }
  next();
}
exports.createTour = (req, res, next) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId } , req.body);
  tours.push(req.body);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};
      exports.getAllTourse = (req, res) => {
        console.log(req.requestTime);
        res.status(200).json({
          status: "Success",
          requestedAt: req.requestTime,
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
