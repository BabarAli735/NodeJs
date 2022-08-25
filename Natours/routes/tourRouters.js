const express = require("express");
const fs = require("fs");
const { getAllTourse, createTour, getTour, updateTour, deleteTour } = require("../controller/tourController");
const router=express.Router()

router.route("/").get(getAllTourse).post(createTour);

router
  .route("/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

  module.exports=router