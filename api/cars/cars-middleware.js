const Cars = require("../cars/cars-model");
const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params;
  const car = await Cars.getById(id);
  if (!car) {
    res.status(404).json({ message: `car with id ${id} not found` });
  } else {
    req.car = car;
    next();
  }
};

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const { vin, make, model, mileage } = req.body;
  if (!vin) {
    res.status(400).json("vin is missing");
  }
  if (!make) {
    res.status(400).json("make is missing");
  }
  if (!model) {
    res.status(400).json("model is missing");
  }
  if (!mileage) {
    res.status(400).json("mileage is missing");
  } else {
    next();
  }
};

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const { vin } = req.body;
  if (vinValidator.validate(vin)) {
    next();
  } else {
    res.status(400).json({ message: `vin ${vin} is invalid` });
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const { vin } = req.body;
  const car = await Cars.getByVin(vin);
  if (!car) {
    next();
  } else {
    res.status(400).json(car);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
};
