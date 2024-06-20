const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(
//   "bdxb74rjmjvq09yffdnt",
//   "u0lnxnaaijmtcr7r",
//   "tD0ldvVvWsWC1kD0ZhTr",
//   {
//     port: 3306,
//     host: "bdxb74rjmjvq09yffdnt-mysql.services.clever-cloud.com",
//     password: "tD0ldvVvWsWC1kD0ZhTr",
//     dialect:
//       "mysql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
//     define: {
//       timestamps: true,
//       createdAt: "created_at",
//       updatedAt: "updated_at",
//     },
//   }
// );
const sequelize = new Sequelize("doan", "root", "root", {
  port: 3306,
  host: "127.0.0.1",
  password: "",
  dialect:
    "mysql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
  define: {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
});

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Kết nối thành công");

    // Drop dư thừa bảng nếu tồn tại
    // const tablesToDrop = [
    //   "rate",
    //   "token",
    //   "tutor_available_date",
    //   "tutor_certification",
    //   "tutoring_contract",
    //   "tutoring_feedback",
    //   "user_verification_request",
    //   "sequelizemeta",
    // ]; // Thêm tên bảng mà bạn muốn xóa vào đây
    // const tablesToDrop = ["tutor_experience"]; // Thêm tên bảng mà bạn muốn xóa vào đây

    // for (const table of tablesToDrop) {
    //   try {
    //     await sequelize.getQueryInterface().dropTable(table);
    //     console.log(`Table ${table} dropped`);
    //   } catch (err) {
    //     console.error(`Unable to drop table ${table}:`, err);
    //   }
    // }

    // Sync all models that are not already in the database
    // await sequelize.sync({ alter: true });
    console.log("Database synchronized");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
}

initializeDatabase();

module.exports = sequelize;
