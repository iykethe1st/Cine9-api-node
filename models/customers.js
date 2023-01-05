const mongoose = require("mongoose");
const Joi = require("joi");
const { Schema } = mongoose;

const customerSchema = new Schema({
  name: {
    type: String,
    minLength: 5,
    maxLength: 50,
    required: true,
  },
  phone: {
    type: String,
    minLength: 11,
    maxLength: 15,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
});

const Customer = mongoose.model("Customer", customerSchema);

function validateItem(customer) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(11).max(15),
    isGold: Joi.boolean(),
  });
  return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateItem;
