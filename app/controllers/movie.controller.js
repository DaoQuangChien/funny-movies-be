const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const db = require("../models");
const Movie = db.movie;

const getListMovies = (req, res) => {
  const limit = req.query.limit || 10;
  const offset = req.query.offset || 0;
  const query = {};

  if (req.query.email) {
    query.email = req.query.email;
  }
  Promise.all([
    Movie.find(query)
      .sort({ createdAt: "desc" })
      .limit(Number(limit))
      .skip(Number(offset))
      .populate([
        { path: "user", select: "email _id" },
        { path: "upVotes", select: "email _id" },
        { path: "downVotes", select: "email _id" },
      ])
      .exec(),
    Movie.countDocuments(query).exec(),
  ])
    .then((results) => {
      const [data, totalMovies] = results;

      res.status(200).send({
        data,
        totalMovies,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
      return;
    });
};

const postMovie = (req, res) => {
  const token = req.headers["access-token"];
  const decoded = jwt.verify(token, secretKey);
  const { title, description, movieUrlId } = req.body;
  const movie = new Movie({
    title,
    description,
    movieUrlId,
    user: decoded.id,
    upVotes: [],
    downVotes: [],
  });

  movie.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({ message: "Movie posted successfully!" });
  });
};

const upVoteMovie = async (req, res) => {
  const token = req.headers["access-token"];
  const decoded = jwt.verify(token, secretKey);

  try {
    await Movie.updateOne(
      {
        _id: req.body.movieId,
      },
      {
        $push: { upVotes: decoded.id },
      }
    );
    res.status(200).send({ message: "Movie upvoted successfully!" });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

const downVoteMovie = async (req, res) => {
  const token = req.headers["access-token"];
  const decoded = jwt.verify(token, config.secret);

  try {
    await Movie.updateOne(
      {
        _id: req.body.movieId,
      },
      {
        $push: { downVotes: decoded.id },
      }
    );
    res.status(200).send({ message: "Movie downvoted successfully!" });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

module.exports = {
  getListMovies,
  postMovie,
  upVoteMovie,
  downVoteMovie,
};
