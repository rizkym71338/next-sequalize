import models from "../../../../db/models/index";

const Delete = async (req, res) => {
  const { uuid } = req.query;

  if (req.method == "DELETE") {
    try {
      const role = await models.roles.findOne({
        where: {
          uuid,
        },
      });

      const match = async () => {
        await role.destroy();
        res.status(200).json({
          msg: "role deleted",
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
        message: err.message,
      });
    }
  } else {
    res.status(400).json({
      msg: "bad request - wrong method",
    });
  }
};

export default Delete;
