const fs = require("fs");
const express = require("express");
const app = express();
app.use(express.json())
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// app.get("/api/v1/tours", (req, res) => {
//   res.status(200).json({
//     status: "Success",
//     result:tours.length, 
//     data: {
//       tours
//     },
//   });
// });

app.get("/api/v1/tours/:id", (req, res) => {
    const id=req.params.id*1
const tour=tours.find(el=>el.id===id)
console.log(tour);
  res.status(200).json({
    status: "Success",
    data: {
      tour
    },
  });
});



const port = 300;

app.listen(port, () => {
  console.log("appp runing");
});
