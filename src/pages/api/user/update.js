import models from "../../../../db/models/index";

const Update = async (req, res) => {
  const { uuid } = req.query;
  const { username, password, roleId } = req.body;

  if (req.method == "PUT") {
    try {
      let role = {};
      if (roleId) {
        role = await models.roles.findOne({
          where: {
            uuid: roleId,
          },
        });
      }

      const user = await models.users.findOne({
        where: {
          uuid,
        },
      });

      const match = async () => {
        await user.update({
          username: username ?? user.username,
          password: password ?? user.password,
          roleId: role.id ?? user.roleId,
        });
        await user.save();
        res.status(200).json({
          msg: "user updated",
        });
      };

      const notMatch = async () => {
        res.status(404).json({
          msg: `user with uuid ${uuid} not found`,
        });
      };

      user ? match() : notMatch();
    } catch (err) {
      res.status(500).json({
        msg: err.message,
      });
    }
  } else {
    res.status(400).json({
      msg: "bad request - wrong method",
    });
  }
};

export default Update;
