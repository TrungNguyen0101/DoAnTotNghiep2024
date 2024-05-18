const sequelize = require("../models/index");
const initModel = require("../models/init-models");
const { succesCode, errorCode, failCode } = require("../responses/response");
const models = initModel(sequelize);
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const findAll = async (req, res) => {
  let entities = await models.student_education.findAll({});
  return succesCode(res, entities, "Lấy danh sách học vấn thành công!!!");
};

const findById = async (req, res) => {
  let { id } = req.params;
  let entity = await models.student_education.findByPk(id);
  return succesCode(res, entity);
};

const create = async (req, res) => {
  let body = req.body;
  let entity = await models.student_education.create({
    student_education_id: uuidv4(),
    ...body,
  });

  return succesCode(res, entity);
};

const update = async (req, res) => {
  let { id } = req.params;
  let body = req.body;
  let model = await models.student_education.findByPk(id);
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
  let result = await models.student_education.destroy({
    where: {
      student_education_id: id,
    },
  });

  return result > 0 ? succesCode(res, true) : failCode(res, "Thất bại");
};

module.exports = { findAll, findById, create, update, deleteById };
