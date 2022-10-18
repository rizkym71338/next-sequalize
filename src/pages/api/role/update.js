import models from "../../../../db/models/index";

const Update = async (req, res) => {
  const { uuid } = req.query;
  const { rolename } = req.body;

  if (req.method == "PUT") {
    try {
      const role = await models.roles.findOne({
        where: {
          uuid,
        },
      });

      const match = async () => {
        await role.update({
          rolename,
        });
        await role.save();
        res.status(200).json({
          msg: "role updated",
        });
      };

      const notMatch = async () => {
        res.status(404).json({
          msg: `role with uuid ${uuid} not found`,
        });
      };

      role ? match() : notMatch();
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
