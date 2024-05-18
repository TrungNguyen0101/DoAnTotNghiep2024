const sequelize = require("../models/index");

const initModel = require("../models/init-models");
const { succesCode, failCode } = require("../responses/response");
const models = initModel(sequelize);
const { v4: uuidv4 } = require("uuid");

const findAll = async (req, res) => {
  let entities = await models.student_profile.findAll({
    include: [{
      model: models.student_education,
      as: "student_educations",
      include: ["schools"]
    },{
      model: models.users,
      as :"user"
    }],
  });
  return succesCode(
    res,
    entities,
    "Lấy danh sách profile học sinh thành công!!!"
  );
};

const findById = async (req, res) => {
  let { id } = req.params;
  let entity = await models.student_profile.findOne({
    include: [{
      model: models.student_education,
      as: "student_educations",
      include: ["schools"]
    },{
      model: models.users,
      as :"user"
    }],
  });

  return succesCode(res, entity, "Success");
};

const create = async (req, res) => {
  let body = req.body;
  let entity = await models.student_profile.create({
    student_profile_id: uuidv4(),
    ...body,
  });

  return succesCode(res, entity);
};

const update = async (req, res) => {
  let { id } = req.params;
  let body = req.body;
  let model = await models.student_profile.findByPk(id);
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
  let result = await models.student_profile.destroy({
    where: {
      student_profile_id: id,
    },
  });

  return result > 0 ? succesCode(res, true) : failCode(res, "Thất bại");
};

/**
 *  update 1 array tutor_certifications
 *  params id: là tutor_id
 *  body: array tutor_certification
 * @param {*} req
 * @param {*} res
 */

/**
 *  update 1 array tutor_certifications
 *  params id: là tutor_id
 *  body: array tutor_certification
 * @param {*} req
 * @param {*} res
 */
const updateStudentEducations = async (req, res) => {
  let { id } = req.params;
  let body = req.body;

  await models.student_education.destroy({
    where: {
      student_education_id: id,
    },
  });

  let entity = await models.student_education.bulkCreate(
    body.map((x) => {
      x.student_education_id = uuidv4();
      x.student_profile_id = id;
      return x;
    })
  );

  return succesCode(res, entity);
};

/**
 *  update 1 array tutor_certifications
 *  params id: là tutor_id
 *  body: array tutor_certification
 * @param {*} req
 * @param {*} res
 */

const getStudentByUserId = async (req, res) => {
  let { id } = req.params;
  let entity = await models.users.findOne({
    where: {
      user_id: id,
    },
    include: [
      {
        model: models.student_profile,
        as: "student_profiles",
        include: ["student_educations"],
      },
    ],
  });

  return succesCode(res, entity, "Success");
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  deleteById,
  updateStudentEducations,
  getStudentByUserId,
};
