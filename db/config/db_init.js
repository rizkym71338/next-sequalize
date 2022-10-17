const { sequelize } = require("../models/index");

const DatabaseInitialize = async () => {
  await sequelize.sync({
    force: true,
  });
  console.log("Cleaning Database .....");
};

DatabaseInitialize();
