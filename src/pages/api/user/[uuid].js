import models from "../../../../db/models/index";

const Read = async (req, res) => {
  const { uuid } = req.query;

  if (req.method == "GET") {
    try {
      const user = await models.users.findOne({
        where: {
          uuid,
        },
        attributes: ["uuid", "username", "password"],
        include: [
          {
            model: models.roles,
            as: "roles",
            attributes: ["uuid", "rolename"],
          },
        ],
      });

      const match = async () => {
        res.status(200).json({
          msg: "user founded",
          user,
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

export default Read;
