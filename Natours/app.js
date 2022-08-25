const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const { createSecurePair } = require("tls");
const app = express();
//1 MIDDELE_WARE
app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
  console.log("Hellow from middleware ");
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//2 METHOOD
const getAllTourse = (req, res) => {
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
const createTour = (req, res) => {
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

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet define",
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet define",
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet define",
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet define",
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet define",
  });
};
//3 ROUTS
const tourRouter=express.Router()
const userRouter=express.Router()
tourRouter.route("/").get(getAllTourse).post(createTour);

tourRouter
  .route("/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

userRouter.route("/").get(getAllUsers).post(createUser);
userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

app.use("/api/v1/tours",tourRouter)
app.use("/api/v1/user",userRouter)
const port = 300;

//4 SERVER
app.listen(port, () => {
  console.log("appp runing");
});
