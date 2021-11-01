require('dotenv').config();

const { DB, JWT_SECRET, PORT } = process.env;

module.exports = {
  DB, PORT, JWT_SECRET,
};
