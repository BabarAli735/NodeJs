const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Tours = require("../../model/toursModel");
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<passwor>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("DB Connecting Sccessfully ");
    if (process.argv[2] === "--import") {
      importData();
    } else if (process.argv[2] === "--delete") {
      deleteData();
    }
  })
  .catch((err) => {
    console.log("=====err", err);
  });

// // READ JSON FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8")
);
// const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
// const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'));

// // IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tours.create(tours);
    // await User.create(users, { validateBeforeSave: false });
    // await Review.create(reviews);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// // DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tours.deleteMany();
    // await User.deleteMany();
    // await Review.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};



// console.log(process.argv);

// deleteData();
// importData();
