const fs = require("fs");
const express = require("express");
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  console.log("Hellow from middleware ");
  next();
});
app.use((req, res, next) => {
  req.requestTime=new Date().toISOString()
  next();
});
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTourse = (req, res) => {
  console.log(req.requestTime)
  res.status(200).json({
    status: "Success",
    requestedAt:req.requestTime,
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

app.route("/api/v1/tours").get(getAllTourse).post(createTour);

// If we use Midleware here and consumee getAllTours APi
//then middle ware doesn't called because api Request responces finshed
// using middleware order Really maters

{
  /* *****************************************/
}

// app.use((req,res,next)=>{
//   console.log('Hellow from middleware ');
//   next()
// })

{
  /* *****************************************/
}
app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);
const port = 300;

app.listen(port, () => {
  console.log("appp runing");
});
