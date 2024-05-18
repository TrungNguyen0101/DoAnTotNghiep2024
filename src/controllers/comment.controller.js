const sequelize = require("../models/index");
const initModel = require("../models/init-models");
const { succesCode, errorCode, failCode } = require("../responses/response");
const models = initModel(sequelize);
const { Op } = require("sequelize");
const { v4: uuidv4 } = require('uuid');

const AddComment = async (req, res) => {
   try {
        let body = req.body;
        let author_id = req.body.author_id || null;

        let entities = await models.comments.create({
            comment_id: uuidv4(),
            create_at: Date.now(),
            ...body,
            author_id: author_id,
        })
        succesCode(res, entities, "Tạo bình luận thành công!")
   } catch(error) {
        failCode(res,error.message)
   }
}

const findById = async (req,res) => {
   try {
        let author_id  = req.params.author_id;
        let allCommnent = await models.comments.findAll({
            where:{
                author_id: author_id
            },
            include: [
                { 
                    model: models.users, 
                    as: "user", 
                    attributes: ["user_id","last_name", "first_name", "avatar_url", "role_id"],
                    foreignKey: "user_id"
                },
            ],
        })
        succesCode(res,allCommnent, "Lấy danh sách comment thành công!")
   } catch(error) {
    errorCode(res, error.message) 
   }
}


const findAll = async (req,res) => {
    try {
        let all_Comment = await models.comments.findAll({
            include: [
                {
                    model: models.users,
                    as: "users",
                    attributes: ["user_id","last_name", "first_name", "avatar_url", "role_id"],
                    foreignKey: "user_id"
                }
            ]
        })
        succesCode(res,allCommnent)
    } catch (error) {
        errorCode(error.message)
    }
}
module.exports = {
    AddComment,
    findById,
    findAll
}


