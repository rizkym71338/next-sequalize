import models from "../../../../db/models/index";

const User = async (req, res) => {
  if (req.method == "GET") {
    try {
      const user = await models.users.findAll({
        attributes: ["uuid", "username", "password"],
        include: [
          {
            model: models.roles,
            as: "roles",
            attributes: ["uuid", "rolename"],
          },
        ],
      });

      res.status(200).json({
        msg: "user founded",
        users: user,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  } else {
    res.status(400).json({
      msg: "bad request - wrong method",
    });
  }
};

export default User;
