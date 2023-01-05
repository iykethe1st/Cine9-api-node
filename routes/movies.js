const { Movie, validate } = require("../models/movies");
const express = require("express");
const { Genre } = require("../models/genres");
const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("title");
  res.send(movies);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    res.status(404).send("The movie with the given Id was not found");
    return;
  }
  res.send(movie);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) {
    return res.status(400).send("Invalid genre");
  }
  let movie = new Movie({
    title: req.body.title,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
  });
  movie = await movie.save();
  res.send(movie);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
    },
    { new: true }
  );

  if (!movie) {
    res.status(404).send("The movie with the given Id was not found");
    return;
  }

  movie = await movie.save();
  res.send(movie);
});

router.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if (!movie) {
    res.status(404).send("The movie was not found");
    return;
  }
  res.send(movie);
});

module.exports = router;
