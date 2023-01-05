const mongoose = require("mongoose");
const Joi = require("joi");

const { Schema } = mongoose;

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

exports.Genre = Genre;
exports.genreSchema = genreSchema;
exports.validate = validateItem;
