const sequelize = require("../models/index.js");
const initModel = require("../models/init-models");
const { succesCode, errorCode, failCode } = require("../responses/response");
const models = initModel(sequelize);
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const AddRate = async (req, res) => {
  try {
    let body = req.body;
    let author_id = req.body.author_id || null;
    let entities = await models.rate.create({
      author_id: author_id,
      ...body,
    });
    succesCode(res, entities, "Tạo đánh giá thành công!");
  } catch (error) {
    failCode(res, error.message);
  }
};

module.exports = {
  AddRate,
};
