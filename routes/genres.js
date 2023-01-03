const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Joi = require("joi");

const { Schema } = mongoose;

// Genre List
// const genres = [
//   { id: 1, name: "Action" },
//   { id: 2, name: "Adventure" },
//   { id: 3, name: "Comedy" },
//   { id: 4, name: "Horror" },
//   { id: 5, name: "History" },
//   { id: 6, name: "Documentary" },
// ];

// genre schema
const genreSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
});

// genre model
const Genre = mongoose.model("Genre", genreSchema);

function validateItem(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(genre);
}

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) {
    res.status(404).send("The genre with the given id could not be found");
    return;
  }

  res.send(genre);
});

router.post("/", async (req, res) => {
  const { error } = validateItem(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let genre = new Genre({
    name: req.body.name,
  });

  genre = await genre.save();
  res.send(genre);
});

router.put("/:id", async (req, res) => {
  const { error } = validateItem(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre) {
    res.status(404).send("The genre was not found");
    return;
  }

  res.send(genre);
});

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) {
    res.status(404).send("The genre was not found");
    return;
  }

  res.send(genre);
});

module.exports = router;
