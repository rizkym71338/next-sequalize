import models from "../../../../db/models/index";

const User = async (req, res) => {
  try {
    const Users = await models.users.findAll({
      include: [
        {
          model: models.roles,
          as: "roles",
        },
      ],
    });
    res.status(200).json({
      msg: "User founded",
      users: Users,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export default User;
