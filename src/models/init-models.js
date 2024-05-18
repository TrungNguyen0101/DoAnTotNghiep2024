const DataTypes = require("sequelize").DataTypes;
const _booked_session = require("./booked_session");
const _category = require("./category");
const _course = require("./course");
const _course_program = require("./course_program");
const _course_program_phase = require("./course_program_phase");
const _payment_transaction = require("./payment_transaction");
const _role = require("./role");
// const _schedule = require("./schedule");
const _school = require("./school");
const _student_education = require("./student_education");
const _student_profile = require("./student_profile");
// const _token = require("./token");
// const _tutor_available_date = require("./tutor_available_date");
// const _tutor_certification = require("./tutor_certification");
const _tutor_education = require("./tutor_education");
const _tutor_experience = require("./tutor_experience");
const _tutor_profile = require("./tutor_profile");
// const _tutoring_contract = require("./tutoring_contract");
// const _tutoring_feedback = require("./tutoring_feedback");
// const _user_verification_request = require("./user_verification_request");
const _turtor_category = require("./turtor_category");
const _users = require("./users");
const _comment = require("./comment");
// const _rate = require("./rate");
function initModels(sequelize) {
  const booked_session = _booked_session(sequelize, DataTypes);
  const category = _category(sequelize, DataTypes);
  const course = _course(sequelize, DataTypes);
  const course_program = _course_program(sequelize, DataTypes);
  const course_program_phase = _course_program_phase(sequelize, DataTypes);
  const payment_transaction = _payment_transaction(sequelize, DataTypes);
  const role = _role(sequelize, DataTypes);
  // const schedule = _schedule(sequelize, DataTypes);
  const school = _school(sequelize, DataTypes);
  const student_education = _student_education(sequelize, DataTypes);
  const student_profile = _student_profile(sequelize, DataTypes);
  // const token = _token(sequelize, DataTypes);
  // const tutor_available_date = _tutor_available_date(sequelize, DataTypes);
  // const tutor_certification = _tutor_certification(sequelize, DataTypes);
  const tutor_education = _tutor_education(sequelize, DataTypes);
  const tutor_experience = _tutor_experience(sequelize, DataTypes);
  const tutor_profile = _tutor_profile(sequelize, DataTypes);
  // const tutoring_contract = _tutoring_contract(sequelize, DataTypes);
  // const tutoring_feedback = _tutoring_feedback(sequelize, DataTypes);
  // const user_verification_request = _user_verification_request(
  //   sequelize,
  //   DataTypes
  // );
  const turtor_category = _turtor_category(sequelize, DataTypes);
  const users = _users(sequelize, DataTypes);
  const comments = _comment(sequelize, DataTypes);
  // const rate = _rate(sequelize, DataTypes);
  // tutoring_contract.belongsTo(booked_session, {
  //   as: "booked_session",
  //   foreignKey: "booked_session_id",
  // });
  // booked_session.hasMany(tutoring_contract, {
  //   as: "tutoring_contracts",
  //   foreignKey: "booked_session_id",
  // });
  course.belongsTo(category, { as: "category", foreignKey: "category_id" });
  category.hasMany(course, { as: "courses", foreignKey: "category_id" });
  booked_session.belongsTo(course, { as: "course", foreignKey: "course_id" });
  course.hasMany(booked_session, {
    as: "booked_sessions",
    foreignKey: "course_id",
  });
  course_program.belongsTo(course, { as: "course", foreignKey: "course_id" });
  course.hasMany(course_program, {
    as: "course_programs",
    foreignKey: "course_id",
  });
  // tutoring_feedback.belongsTo(course, { as: "course", foreignKey: "course_id"});
  // course.hasMany(tutoring_feedback, {
  //   as: "tutoring_feedbacks",
  //   foreignKey: "course_id",
  // });
  course_program_phase.belongsTo(course_program, {
    as: "course_program",
    foreignKey: "course_program_id",
  });
  course_program.hasMany(course_program_phase, {
    as: "course_program_phases",
    foreignKey: "course_program_id",
  });
  users.belongsTo(role, { as: "role", foreignKey: "role_id" });
  role.hasMany(users, { as: "users", foreignKey: "role_id" });

  student_education.hasMany(school, { as: "schools", foreignKey: "school_id" });
  school.belongsTo(student_education, {
    as: "student_education",
    foreignKey: "school_id",
  });

  tutor_education.hasMany(school, { as: "schools", foreignKey: "school_id" });
  school.belongsTo(tutor_education, {
    as: "tutor_education",
    foreignKey: "school_id",
  });

  student_education.belongsTo(student_profile, {
    as: "student_profile",
    foreignKey: "student_profile_id",
  });
  student_profile.hasMany(student_education, {
    as: "student_educations",
    foreignKey: "student_profile_id",
  });
  // schedule.hasMany(tutor_available_date, {
  //   as: "tutor_available_date",
  //   foreignKey: "tutor_available_date_id",
  // });

  // tutor_available_date.belongsTo(schedule, {
  //   as: "schedule",
  //   foreignKey: "tutor_available_date_id",
  // });
  // tutor_available_date.belongsTo(users, { as: "user", foreignKey: "tutor_id" });

  course.belongsTo(tutor_profile, {
    as: "tutor_profile",
    foreignKey: "tutor_profile_id",
  });
  tutor_profile.hasMany(course, {
    as: "courses",
    foreignKey: "tutor_profile_id",
  });
  // tutor_certification.belongsTo(tutor_profile, {
  //   as: "tutor_profile",
  //   foreignKey: "tutor_profile_id",
  // });
  // tutor_profile.hasMany(tutor_certification, {
  //   as: "tutor_certifications",
  //   foreignKey: "tutor_profile_id",
  // });
  tutor_education.belongsTo(tutor_profile, {
    as: "tutor_profile",
    foreignKey: "tutor_profile_id",
  });
  tutor_profile.hasMany(tutor_education, {
    as: "tutor_educations",
    foreignKey: "tutor_profile_id",
  });
  tutor_experience.belongsTo(tutor_profile, {
    as: "tutor_profile",
    foreignKey: "tutor_profile_id",
  });
  tutor_profile.hasMany(tutor_experience, {
    as: "tutor_experiences",
    foreignKey: "tutor_profile_id",
  });
  booked_session.belongsTo(users, { as: "student", foreignKey: "student_id" });
  users.hasMany(booked_session, {
    as: "booked_sessions",
    foreignKey: "student_id",
  });
  booked_session.belongsTo(users, { as: "tutor", foreignKey: "tutor_id" });
  users.hasMany(booked_session, {
    as: "tutor_booked_sessions",
    foreignKey: "tutor_id",
  });
  payment_transaction.belongsTo(users, { as: "tutor", foreignKey: "tutor_id" });
  users.hasMany(payment_transaction, {
    as: "payment_transactions",
    foreignKey: "tutor_id",
  });
  payment_transaction.belongsTo(users, {
    as: "student",
    foreignKey: "student_id",
  });
  users.hasMany(payment_transaction, {
    as: "student_payment_transactions",
    foreignKey: "student_id",
  });
  // schedule.belongsTo(users, { as: "student", foreignKey: "student_id" });
  // users.hasMany(schedule, { as: "schedules", foreignKey: "student_id" });
  // token.belongsTo(users, { as: "user", foreignKey: "user_id" });
  // users.hasMany(token, { as: "tokens", foreignKey: "user_id" });
  tutor_profile.belongsTo(users, { as: "user", foreignKey: "user_id" });
  users.hasMany(tutor_profile, { as: "tutor_profiles", foreignKey: "user_id" });
  // tutoring_contract.belongsTo(users, { as: "tutor", foreignKey: "tutor_id" });
  // users.hasMany(tutoring_contract, {
  //   as: "tutoring_contracts",
  //   foreignKey: "tutor_id",
  // });

  // users.hasMany(tutor_available_date, {
  //   as: "tutor_available_dates",
  //   foreignKey: "tutor_id",
  // });

  // booked_session.hasMany(schedule, {
  //   as: "schedules",
  //   foreignKey: "booked_session_id",
  // });
  // schedule.hasMany(booked_session, {
  //   as: "booked_session",
  //   foreignKey: "booked_session_id",
  // });

  // tutoring_feedback.belongsTo(schedule, {
  //   as: "schedule",
  //   foreignKey: "schedule_id",
  // });
  // schedule.hasMany(tutoring_feedback, {
  //   as: "tutoring_feedbacks",
  //   foreignKey: "tutoring_feedback_id",
  // });

  users.hasMany(student_profile, {
    as: "student_profiles",
    foreignKey: "student_id",
  });
  student_profile.belongsTo(users, { as: "user", foreignKey: "student_id" });

  users.hasMany(comments, { foreignKey: "user_id" });
  comments.belongsTo(users, { foreignKey: "user_id" });

  users.hasMany(comments, { foreignKey: "author_id" });
  comments.belongsTo(users, { foreignKey: "user_id" });

  category.hasMany(turtor_category, { foreignKey: "category_id" });

  tutor_profile.hasMany(turtor_category, { foreignKey: "tutor_p_id" });
  return {
    booked_session,
    category,
    course,
    course_program,
    course_program_phase,
    payment_transaction,
    role,
    // schedule,
    school,
    student_education,
    student_profile,
    // token,
    // tutor_available_date,
    // tutor_certification,
    tutor_education,
    tutor_experience,
    tutor_profile,
    // tutoring_contract,
    // tutoring_feedback,
    // user_verification_request,
    users,
    comments,
    turtor_category,
    // rate,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
