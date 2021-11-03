require('dotenv').config();

const { DB = 'mongodb://localhost/moviesdb', JWT_SECRET = 'dev', PORT = '3000' } = process.env;

module.exports = {
  DB, PORT, JWT_SECRET,
};
