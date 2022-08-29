const express = require("express");
const fs = require("fs");
const { getAllTourse, createTour, getTour, updateTour, deleteTour, checkId, checkBody } = require("../controller/tourController");
const router=express.Router()

//create and check Body middleware
//Check if the body contain name and Price 
//if not send back 400 (bad Request)
//add it to post handle stack
router.param('id',checkId)
router.route("/").get(getAllTourse).post(createTour);

router
  .route("/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

  module.exports=router