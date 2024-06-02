const sequelize = require("../models/index.js");
const initModel = require("../models/init-models");
const { succesCode, errorCode, failCode } = require("../responses/response");
const models = initModel(sequelize);
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const getMessageById = async (req, res) => {
  try {
    let { id } = req.params;
    let entities = await models.message.findAll({
      where: {
        [Op.or]: [{ sender_id: id }, { receiver_id: id }],
      },
      attributes: [
        "sender_id",
        "receiver_id",
        [sequelize.fn("MIN", sequelize.col("timestamp")), "timestamp"],
      ],
      group: ["sender_id", "receiver_id"],
    });

    succesCode(res, entities, "Lấy tin nhắn thành công!");
  } catch (error) {
    failCode(res, error.message);
  }
};

const getAllMessagesBySenderIdAndReceiverId = async (req, res) => {
  try {
    const { sender_id, receiver_id } = req.query;

    const messages = await models.message.findAll({
      where: {
        [Op.or]: [
          { sender_id, receiver_id },
          { sender_id: receiver_id, receiver_id: sender_id },
        ],
      },
      order: [["timestamp", "ASC"]],
    });

    if (messages.length === 0) {
      return failCode(
        res,
        "Không tìm thấy tin nhắn cho sender_id và receiver_id đã chỉ định."
      );
    }

    return succesCode(res, messages, "Lấy tin nhắn thành công!");
  } catch (error) {
    return failCode(res, error.message);
  }
};

module.exports = {
  getMessageById,
  getAllMessagesBySenderIdAndReceiverId,
};
