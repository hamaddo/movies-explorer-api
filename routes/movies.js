const router = require('express').Router();
const {
  getMovies,
  addMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  importMovieValidation,
  removeMovieValidation,
} = require('../middlewares/validation');

router.get('/', getMovies);
router.post('/', importMovieValidation, addMovie);
router.delete('/:movieId', removeMovieValidation, deleteMovie);

module.exports = router;
