import models from "../../../../db/models/index";

const Create = async (req, res) => {
  const { username, password, roleId } = req.body;

  if (req.method == "POST") {
    try {
      const role = await models.roles.findOne({
        where: {
          uuid: roleId,
        },
        attributes: ["id"],
      });

      const user = await models.users.findOne({
        where: {
          username,
        },
      });

      const userExists = async () => {
        res.status(400).json({
          msg: "user already exists",
        });
      };

      const createUser = async () => {
        await models.users.create({
          username,
          password,
          roleId: role.id,
        });
        res.status(200).json({
          msg: "user created",
        });
      };

      user ? userExists() : createUser();
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

export default Create;
