const sequelize = require("../models/index.js");

const initModel = require("../models/init-models");
const { succesCode, errorCode, failCode } = require("../responses/response");
const models = initModel(sequelize);
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
var jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = { ...req.body };

    let user = await models.users.findOne({
      where: {
        email: email,
      },
    });

    if (!user?.dataValues) {
      return failCode(res, "Tài khoản không tồn tại");
    }

    if (user?.dataValues?.password != password) {
      return failCode(res, "Mật khẩu không chính xác");
    }

    // let refreshToken = jwt.sign(user.dataValues, "refresh_token_doangiasu", {
    //   expiresIn: "40 days",
    // });

    // await models.token.create({
    //   token_id: uuidv4(),
    //   user_id: user?.dataValues?.user_id,
    //   refresh_token: refreshToken,
    //   expiresIn: "40 days",
    // });

    return succesCode(res, {
      type: "Bearer",
      access_token: getToken(user.dataValues),
      role_id: user.dataValues.role_id,
      avatar_url: user?.dataValues?.avatar_url,
    });
  } catch (err) {
    errorCode(res, err);
  }
};

const register = async (req, res) => {
  try {
    const {
      email,
      last_name,
      first_name,
      gender,
      phone_number,
      // google_id,
      role_id,
      type,
      password,
      // tutor_profile: { description, stripe_account_id },
      tutor_profile: { description },
    } = req.body;

    // const file_cv = req.files["file_cv"] ? req.files["file_cv"][0].path : "";
    const avatar_url =
      req.files && req.files["avatar_url"]
        ? req.files["avatar_url"][0].path
        : "";
    // console.log(file_cv, avatar_url);

    var check = await models.users.findOne({
      where: {
        email: email,
      },
    });
    console.log("register ~ check:", check);
    if (check) {
      return failCode(
        res,
        "Email đã tồn tại. Vui lòng đăng nhập hoặc tạo tài khoản mới"
      );
    }

    let user = await models.users.create({
      user_id: uuidv4(),
      email,
      last_name,
      first_name,
      gender,
      avatar_url,
      phone_number,
      // google_id,
      role_id,
      type,
      password,
      // file_cv,
    });

    // tạo luôn profile
    // tutor
    if (type == "0") {
      let tutorProfile = await models.tutor_profile.create({
        tutor_profile_id: uuidv4(),
        description,
        // stripe_account_id,
        status: "1",
        // is_stripe_verified: "1",
        balance: 0,
        has_charge_first_time: false,
        user_id: user.dataValues.user_id,
      });

      user.tutor_profile = tutorProfile;
    } else if (type == "1") {
      let studentProfile = await models.student_profile.create({
        student_profile_id: uuidv4(),
        student_id: user.dataValues.user_id,
      });

      user.student_profile = studentProfile;
    }
    return succesCode(res, user);
  } catch (err) {
    console.log(err);
    return errorCode(res, err);
  }
};

const getToken = (user) => {
  // genarate token
  const token = jwt.sign(
    {
      user_id: user.user_id,
      email: user.email,
      first_name: user.firstName,
      last_name: user.lastName,
    },
    "doangiasu",
    {
      expiresIn: "30 days",
    }
  );
  return token;
};

module.exports = { login, register };
