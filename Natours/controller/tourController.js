
const fs = require("fs");
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
  );
  
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
  exports.createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId } | req.body);
    tours.push(newTour);
    fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(tours),
      (err) => {
        res.status(201).JSON({
          status: "Success",
          data: newTour,
        });
      }
    );
    res.status(200).json({
      status: "Success",
      data: {
        tours: newTour,
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
    if (req.params.id * 1 > tours.length) {
      res.status(404).json({
        status: "fail",
        message: "Data not Found",
      });
    }
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
    if (req.params.id * 1 > tours.length) {
      res.status(404).json({
        status: "fail",
        message: "Data not Found",
      });
    }
    res.status(200).json({
      status: "Success",
      data: {
        tour: null,
      },
    });
  };