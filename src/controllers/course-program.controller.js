const sequelize = require("../models/index");

const initModel = require("../models/init-models");
const { succesCode, errorCode, failCode } = require("../responses/response");
const models = initModel(sequelize);
const { v4: uuidv4 } = require("uuid");

const create = async (req, res) => {
  let body = req.body;
  let entity = await models.course_program.create({
    course_program_id: uuidv4(),
    ...body,
  });

  return succesCode(res, entity);
};

const update = async (req, res) => {
  let { id } = req.params;
  let body = req.body;
  let model = await models.course_program.findByPk(id);
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
  await models.course_program_phase.destroy({
    where: {
      course_program_id: id,
    },
  });

  let result = await models.course_program.destroy({
    where: {
      course_program_id: id,
    },
  });

  return result > 0 ? succesCode(res, true) : failCode(res, "Thất bại");
};

const createPhase = async (req, res) => {
  let body = req.body;
  let entity = await models.course_program_phase.create({
    course_program_phase_id: uuidv4(),
    ...body,
  });

  return succesCode(res, entity);
};

const updatePhase = async (req, res) => {
  let { id } = req.params;
  let body = req.body;
  let model = await models.course_program_phase.findByPk(id);
  if (!model) {
    return failCode(res, "model is not exists");
  }

  model.update(body);
  await model.save();

  model.reload();
  return succesCode(res, model);
};

const deletePhaseById = async (req, res) => {
  let { id } = req.params;

  let result = await models.course_program_phase.destroy({
    where: {
      course_program_phase_id: id,
    },
  });

  return result > 0 ? succesCode(res, true) : failCode(res, "Thất bại");
};

module.exports = {
  create,
  update,
  deleteById,
  createPhase,
  updatePhase,
  deletePhaseById,
};
