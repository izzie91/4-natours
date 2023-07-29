const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '/config.env') });
const app = require('./app');

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
    console.log(connection);
    console.log('DB connection established');
  });

//local database
/*mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((connection) => {
    console.log(connection);
    console.log('DB connection established');
  });*/

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on ${port}`);
});
