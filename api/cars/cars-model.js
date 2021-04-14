const db = require("../../data/db-config");

const getAll = () => {
  // DO YOUR MAGIC
  return db("cars");
};

const getById = (id) => {
  // DO YOUR MAGIC
  return db("cars").where("id", id).first();
};

const create = async (carData) => {
  // DO YOUR MAGIC
  const [id] = await db("cars").insert(carData);
  return db("cars").getById(id);
};

const getByVin = async (vin) => {
  return db("cars").where("vin", vin);
};

module.exports = {
  getAll,
  getById,
  create,
  getByVin,
};
