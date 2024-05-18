const sequelize = require("../models/index");
const initModel = require("../models/init-models");
const { succesCode, errorCode, failCode } = require("../responses/response");
const models = initModel(sequelize);
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const findAll = async (req, res) => {
  let entities = await models.tutoring_contract.findAll({
    include: ["booked_session", "tutor"],
  });
  return succesCode(res, entities, "Lấy danh sách thành công!!!");
};

const findById = async (req, res) => {
  let { id } = req.params;
  let entity = await models.tutoring_contract.findByPk(id, {
    include: ["booked_session", "tutor"],
  });
  return succesCode(res, entity);
};

const create = async (req, res) => {
  let body = req.body;
  let entity = await models.tutoring_contract.create({
    tutoring_contract_id: uuidv4(),
    ...body,
  });

  return succesCode(res, entity);
};

const update = async (req, res) => {
  let { id } = req.params;
  let body = req.body;
  let model = await models.tutoring_contract.findByPk(id);
  if (!model) {
    return failCode(res, "model is not exists");
  }

  model.update(body);
  await model.save();

  model.reload();
  return succesCode(res, model);
};

const deleteById = async (req, res) => {
  let { id } = req.params;
  let result = await models.tutoring_contract.destroy({
    where: {
      tutoring_contract_id: id,
    },
  });

  return result > 0 ? succesCode(res, true) : failCode(res, "Thất bại");
};

module.exports = { findAll, findById, create, update, deleteById };
