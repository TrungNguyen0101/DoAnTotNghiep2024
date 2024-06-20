const sequelize = require("../models/index.js");
const initModel = require("../models/init-models");
const { succesCode, errorCode, failCode } = require("../responses/response");
const models = initModel(sequelize);
const { Op, fn, col } = require("sequelize");
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

// const getMessageRead = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Lấy các tin nhắn chưa đọc mới nhất được nhóm theo người gửi
//     const latestUnreadMessages = await models.message.findAll({
//       where: {
//         receiver_id: id,
//         isRead: false, // Lọc chỉ bao gồm tin nhắn chưa đọc
//       },
//       attributes: [
//         "sender_id",
//         [fn("MAX", col("timestamp")), "latest_timestamp"], // Lấy timestamp mới nhất theo người gửi
//       ],
//       group: ["sender_id"], // Nhóm theo sender_id
//       order: [[col("sender_id"), "ASC"]], // Sắp xếp theo sender_id (tăng dần)
//     });

//     // Duyệt qua từng sender_id để lấy tin nhắn chưa đọc mới nhất
//     const latestUnreadMessagesFromSenders = await Promise.all(
//       latestUnreadMessages.map(async (message) => {
//         const { sender_id, latest_timestamp } = message.dataValues;

//         // Lấy tin nhắn chưa đọc mới nhất từ sender_id này
//         const latestUnreadMessage = await models.message.findOne({
//           where: {
//             receiver_id: id,
//             sender_id,
//             isRead: false,
//             timestamp: latest_timestamp, // Chỉ lấy tin nhắn mới nhất
//           },
//           order: [[col("timestamp"), "DESC"]], // Sắp xếp theo timestamp (giảm dần) để lấy tin nhắn mới nhất
//         });

//         return {
//           latestUnreadMessage,
//         };
//       })
//     );

//     if (latestUnreadMessagesFromSenders.length > 0) {
//       succesCode(
//         res,
//         latestUnreadMessagesFromSenders,
//         "Lấy tin nhắn mới nhất chưa đọc từ từng người gửi!"
//       );
//     } else {
//       succesCode(res, null, "Không có tin nhắn mới chưa đọc."); // Thông báo cho người dùng nếu không có tin nhắn chưa đọc
//     }
//   } catch (error) {
//     failCode(res, error.message);
//   }
// };

const getMessageRead = async (req, res) => {
  try {
    const { id } = req.params;

    // Lấy các tin nhắn chưa đọc mới nhất được nhóm theo người gửi
    const latestUnreadMessages = await models.message.findAll({
      where: {
        receiver_id: id,
        isRead: false, // Lọc chỉ bao gồm tin nhắn chưa đọc
      },
      attributes: [
        "sender_id",
        [fn("MAX", col("timestamp")), "latest_timestamp"], // Lấy timestamp mới nhất theo người gửi
      ],
      group: ["sender_id"], // Nhóm theo sender_id
      order: [[col("sender_id"), "ASC"]], // Sắp xếp theo sender_id (tăng dần)
    });

    // Duyệt qua từng sender_id để lấy tin nhắn chưa đọc mới nhất
    const latestUnreadMessagesFromSenders = await Promise.all(
      latestUnreadMessages.map(async (message) => {
        const { sender_id, latest_timestamp } = message.dataValues;

        // Lấy tin nhắn chưa đọc mới nhất từ sender_id này
        const latestUnreadMessage = await models.message.findOne({
          where: {
            receiver_id: id,
            sender_id,
            isRead: false,
            timestamp: latest_timestamp, // Chỉ lấy tin nhắn mới nhất
          },
          order: [[col("timestamp"), "DESC"]], // Sắp xếp theo timestamp (giảm dần) để lấy tin nhắn mới nhất
        });

        // Kiểm tra xem người nhận đã gửi phản hồi chưa
        const reply = await models.message.findOne({
          where: {
            sender_id: id, // Người nhận ban đầu trở thành người gửi
            receiver_id: sender_id, // Người gửi ban đầu trở thành người nhận
            timestamp: {
              [Op.gt]: latest_timestamp, // Tin nhắn phải gửi sau latest_timestamp
            },
          },
          attributes: ["message_id", "timestamp", "message"],
        });

        return {
          latestUnreadMessage,
          replied: !!reply, // Boolean chỉ định nếu có trả lời
          reply_message: reply ? reply.message : null,
          reply_timestamp: reply ? reply.timestamp : null,
        };
      })
    );

    if (latestUnreadMessagesFromSenders.length > 0) {
      succesCode(
        res,
        latestUnreadMessagesFromSenders,
        "Lấy tin nhắn mới nhất chưa đọc từ từng người gửi và kiểm tra xem đã trả lời chưa!"
      );
    } else {
      succesCode(res, null, "Không có tin nhắn mới chưa đọc."); // Thông báo cho người dùng nếu không có tin nhắn chưa đọc
    }
  } catch (error) {
    failCode(res, error.message);
  }
};

module.exports = {
  getMessageById,
  getAllMessagesBySenderIdAndReceiverId,
  getMessageRead,
};
