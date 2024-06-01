const sequelize = require("../models/index.js");
const initModel = require("../models/init-models");
const { succesCode, errorCode, failCode } = require("../responses/response");
const models = initModel(sequelize);
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const findAll = async (req, res) => {
  let entities = await models.booked_session.findAll({
    include: ["tutor", "student", "course"],
  });
  return succesCode(res, entities, "Lấy danh sách thành công!!!");
};

const findById = async (req, res) => {
  let { id } = req.params;
  let entity = await models.booked_session.findByPk(id, {
    include: ["tutor", "student", "course"],
  });
  return succesCode(res, entity);
};

const create = async (req, res) => {
  let body = req.body;
  let entity = await models.booked_session.create({
    booked_session_id: uuidv4(),
    ...body,
  });

  return succesCode(res, entity);
};

const update = async (req, res) => {
  let { id } = req.params;
  let body = req.body;
  let model = await models.booked_session.findByPk(id);
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
  let result = await models.booked_session.destroy({
    where: {
      booked_session_id: id,
    },
  });

  return result > 0 ? succesCode(res, true) : failCode(res, "Thất bại");
};

const findByUserIdAndCourseId = async (req, res) => {
  let { user_id, course_id } = req.query;
  try {
    let sessions = await models.booked_session.findAll({
      where: {
        student_id: user_id,
        course_id: course_id,
        status: "DONE",
      },
      include: ["tutor", "student", "course"],
    });
    if (sessions) {
      return succesCode(res, sessions);
    } else {
      return errorCode(res, "Không tìm thấy");
    }
  } catch (error) {
    return errorCode(res, error.message);
  }
};
const findByUserIdDone = async (req, res) => {
  let { user_id } = req.query;
  try {
    let sessions = await models.booked_session.findAll({
      where: {
        student_id: user_id,
        status: "DONE",
      },
      include: ["tutor", "student", "course"],
    });
    if (sessions) {
      return succesCode(res, sessions);
    } else {
      return errorCode(res, "Không tìm thấy");
    }
  } catch (error) {
    return errorCode(res, error.message);
  }
};

const findByCourseIdDone = async (req, res) => {
  let { course_id } = req.query;
  try {
    let sessionCount = await models.booked_session.count({
      where: {
        course_id: course_id,
        status: "DONE",
      },
    });
    return succesCode(res, { count: sessionCount });
  } catch (error) {
    return errorCode(res, error.message);
  }
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  deleteById,
  findByUserIdAndCourseId,
  findByCourseIdDone,
  findByUserIdDone,
};
