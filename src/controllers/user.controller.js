const sequelize = require("../models/index.js");

const initModel = require("../models/init-models");
const { succesCode, errorCode, failCode } = require("../responses/response");
const models = initModel(sequelize);
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
var jwt = require("jsonwebtoken");

const getUserInfo = async (req, res) => {
  let { id } = req.params;
  let entity = await models.users.findOne({
    where: {
      user_id: id,
    },
    include: [
      {
        model: models.tutor_profile,
        as: "tutor_profiles",
        include: [
          // "tutor_certifications",
          "tutor_educations",
          // "tutor_experiences",
        ],
      },
      // {
      //   model: models.tutor_available_date,
      //   as:'tutor_available_dates',
      // }
    ],
  });

  var student_profile = await models.student_profile.findOne({
    where: {
      student_id: id,
    },
    include: [
      {
        model: models.student_education,
        as: "student_educations",
        // include: [
        //   {
        //     model: models.school,
        //     as: "schools",
        //   },
        // ],
      },
    ],
  });

  var response = {
    ...entity.dataValues,
    student_profile: student_profile,
  };
  return succesCode(res, response, "Success");
};

const updateUserInfo = async (req, res) => {
  let { id } = req.params;
  let entity = await models.users.findOne({
    where: {
      user_id: id,
    },
  });
  entity.update(req.body);

  return succesCode(res, entity, "Success");
};

const findAllAccount = async (req, res) => {
  let entities = await models.users.findAndCountAll();
  return succesCode(res, entities, "Lấy danh sách khóa học thành công!!!");
};

module.exports = { getUserInfo, updateUserInfo, findAllAccount };
