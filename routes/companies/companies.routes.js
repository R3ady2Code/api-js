const { Router } = require("express");
const actions = require("./companies.actions");
const validator = require("./companies.validator");

module.exports = Router()
  .get("/companies/:id", ...validator.getOne, actions.getOne)
  .patch("/companies/:id", ...validator.editOne, actions.editOne)
  .get("/companies", ...validator.getAll, actions.getAll);
