const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Joi = require("joi");

const { Schema } = mongoose;

const customerSchema = new Schema({
  name: {
    type: String,
    minLength: 5,
    maxLength: 50,
    required: true,
  },
});

const Customer = mongoose.model("Customer", customerSchema);

function ValidateItem(customer) {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
  });
  return schema.validate(customer);
}

router.get('/', async (req, res)=>{
    
})