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
const updateExpiry = async (req, res) => {
  let { id } = req.params;
  let body = req.body;
  let model = await models.booked_session.findByPk(id);
  if (!model) {
    return failCode(res, "model is not exists");
  }

  model.update({
    is_expiry: "false",
  });
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
        is_expiry: "true",
      },
      include: ["tutor", "student", "course"],
    });
    let sessions1 = await models.booked_session.findAll({
      where: {
        student_id: user_id,
        course_id: course_id,
        status: "DONE",
        is_expiry: "false",
      },
      include: ["tutor", "student", "course"],
    });
    const result = {
      isExpiry: sessions1,
      isNotExpiry: sessions,
    };
    if (sessions) {
      return succesCode(res, result);
    } else {
      return errorCode(res, "Không tìm thấy");
    }
  } catch (error) {
    return errorCode(res, error.message);
  }
};
const findByUserIdDone = async (req, res) => {
  let { user_id, status } = req.query;
  console.log("findByUserIdDone ~ status:", status);
  let whereClause = {
    student_id: user_id,
    status: "DONE",
  };

  if (status === "1") {
    whereClause.is_expiry = "false";
  } else if (status === "2") {
    whereClause.is_expiry = "true";
  }
  try {
    let sessions = await models.booked_session.findAll({
      where: whereClause,
      include: ["tutor", "student", "course"],
    });

    // if (!sessions || sessions.length === 0) {
    //   return succesCode(res, []);
    // }

    let tutorProfileIds = sessions?.map((session) => session.tutor_profile_id);

    let tutorProfiles = await models.tutor_profile.findAll({
      where: {
        tutor_profile_id: tutorProfileIds,
      },
    });

    let tutorProfileMap = {};
    tutorProfiles.forEach((profile) => {
      tutorProfileMap[profile.id] = profile;
    });

    let enrichedSessions = sessions?.map((session) => {
      return {
        ...session.toJSON(),
        tutor_profile: tutorProfileMap[session.tutor_profile_id] || null,
      };
    });

    let entities = await models.course.findAll({
      where: {
        type_course: "false",
      },
      include: [
        {
          model: models.category,
          as: "category",
        },
        {
          model: models.tutor_profile,
          as: "tutor_profile",
          include: [
            { model: models.users, as: "user" },
            { model: models.tutor_education, as: "tutor_educations" },
          ],
        },
        {
          model: models.course_program,
          as: "course_programs",
          include: ["course_program_phases"],
        },
      ],
    });
    if (status === "2" || status === "3") {
      return succesCode(res, { sessions: enrichedSessions, courses: entities });
    } else {
      return succesCode(res, { sessions: enrichedSessions });
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
  updateExpiry,
};
