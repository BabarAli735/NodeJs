const fs = require("fs");
const express = require("express");
const app = express();
app.use(express.json());
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTourse = (req, res) => {
  res.status(200).json({
    status: "Success",
    result: tours.length,
    data: {
      tours,
    },
  });
};
const getTour = (req, res) => {
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
const updateTour = (req, res) => {
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

const deleteTour = (req, res) => {
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
app.get("/api/v1/tours", getAllTourse);
app.get("/api/v1/tours/:id", getTour);
app.patch("/api/v1/tours/:id", updateTour);
app.delete("/api/v1/tours/:id", deleteTour);

const port = 300;

app.listen(port, () => {
  console.log("appp runing");
});
