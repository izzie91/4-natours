//this scrript is only for load al the data in the file to de db. Only run once.
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });

const dbConnectionString = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

//hosted datebase in Atlas
mongoose
  .connect(dbConnectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((connection) => {
    //console.log(connection);
    console.log('DB connection established');
  });

const tours = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'tours-simple.json'), 'utf8')
);

//import data to database
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully created');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//Delete all data from database
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//console.log(process.argv);

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
