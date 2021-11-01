const Movie = require('../models/movies');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFoundError');
const {
  incorrectData,
  notFoundedMovie,
  forbiddenToDelete,
  successfulDelete,
} = require('../errors/errorsMessages');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ data: movies }))
    .catch((err) => {
      next(err);
    });
};

module.exports.addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(incorrectData));
      } next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw next(new NotFound(notFoundedMovie));
    })
    .then((movie) => {
      if (String(movie.owner) === owner) {
        return movie.remove();
      } throw next(new BadRequest(forbiddenToDelete));
    })
    .then(() => res.send(successfulDelete))
    .catch((err) => {
      if (err === 'CastError') {
        next(new BadRequest(incorrectData));
      } next(err);
    });
};
