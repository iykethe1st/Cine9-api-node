const mongoose = require("mongoose");
const Joi = require("Joi");
const { Schema } = mongoose;
const { genreSchema } = require("./genres");

const moviesSchema = new Schema({
  title: {
    type: String,
    minLength: 3,
    maxLength: 50,
    required: true,
    trim: true,
  },
  numberInStock: {
    type: Number,
    min: 0,
    max: 255,
    required: true,
  },
  dailyRentalRate: {
    type: Number,
    min: 0,
    max: 255,
    required: true,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
});

const Movie = mongoose.model("Movies", moviesSchema);

function validateItem(movie) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    numberInStock: Joi.number().min(0).max(255).required(),
    dailyRentalRate: Joi.number().min(0).max(255).required(),
    genreId: Joi.objectId().required(),
  });
  return schema.validate(movie);
}

exports.Movie = Movie;
exports.validate = validateItem;
