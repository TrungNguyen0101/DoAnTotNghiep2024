const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("giasu", "root", "root", {
  port: 3306,
  host: "localhost",
  password: "root",
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
    // const tablesToDrop = ["tutor_available_date", "schedule"]; // Thêm tên bảng mà bạn muốn xóa vào đây

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
