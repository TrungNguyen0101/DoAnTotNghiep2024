const sequelize = require("../models/index.js");
const initModel = require("../models/init-models");
const { succesCode, errorCode, failCode } = require("../responses/response");
const models = initModel(sequelize);
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const findAll = async (req, res) => {
  let entities = await models.category.findAll({});
  return succesCode(res, entities, "Lấy danh sách loại khóa học thành công!!!");
};

const findById = async (req, res) => {
  let { id } = req.params;
  let entity = await models.category.findByPk(id);
  return succesCode(res, entity);
};

const findTurtolBySubject = async (req, res) => {
  let entity = await models.category.findAll({
    where: {
      category_id: req.params.id,
    },
  });

  entity.forEach(async (item) => {
    let entitylist = await models.turtor_category.findAll({
      where: {
        category_id: item.category_id,
      },
    });
  });

  return succesCode(res, entity, "Lấy danh sách loại khóa học thành công!!!");
};
const create = async (req, res) => {
  let body = req.body;
  const image_url = req.files["image_url"]
    ? req.files["image_url"][0].path
    : "";
  let entity = await models.category.create({
    category_id: uuidv4(),
    image_url,
    ...body,
  });

  return succesCode(res, entity);
};

const update = async (req, res) => {
  let { id } = req.params;
  let body = req.body;
  const image_url = req.files["image_url"]
    ? req.files["image_url"][0].path
    : "";
  let model = await models.category.findByPk(id);
  if (!model) {
    return failCode(res, "model is not exists");
  }

  model.update({ image_url, ...body });
  await model.save();

  model.reload();
  return succesCode(res, model);
};

const deleteById = async (req, res) => {
  let { id } = req.params;
  let result = await models.category.destroy({
    where: {
      category_id: id,
    },
  });

  return result > 0 ? succesCode(res, true) : failCode(res, "Thất bại");
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  deleteById,
  findTurtolBySubject,
};
