const { Customer, validate } = require("../models/customers");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.get("/:id", async (req, res) => {
  let customer = await Customer.findById(req.params.id);

  if (!customer) {
    res.status(404).send("The customer with the given id could not be found");
    return;
  }
  res.send(customer);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });

  await customer.save();
  res.send(customer);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, phone: req.body.phone },
    { new: true }
  );

  if (!customer) {
    res.status(404).send("The customer was not found");
    return;
  }

  res.send(customer);
});

router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer) {
    res.status(404).send("The customer was not found");
    return;
  }
  res.send(customer);
});

module.exports = router;
