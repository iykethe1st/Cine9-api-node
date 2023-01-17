const mongoose = require("mongoose");
const Joi = require("Joi");
const { Schema } = mongoose;

const rentalsSchema = new Schema({
  customer: {
    type: new Schema({
      name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
      },
      isGold: {
        type: Boolean,
        default: false,
      },
      phone: {
        type: String,
        required: true,
        minlength: 11,
        maxlength: 15,
      },
    }),
    required: true,
  },

  movie: {
    type: new Schema({
      title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
      },
    }),
    required: true,
  },

  dateOut: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },
});

const Rental = mongoose.model("Rental", rentalsSchema);

function validateItem(rental) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });
  return schema.validate(rental);
}

exports.Rental = Rental;
exports.validate = validateItem;
