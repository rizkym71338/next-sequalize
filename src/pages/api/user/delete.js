import models from "../../../../db/models/index";

const Delete = async (req, res) => {
  const { uuid } = req.query;

  if (req.method == "DELETE") {
    try {
      const user = await models.users.findOne({
        where: {
          uuid,
        },
      });

      const match = async () => {
        await user.destroy();
        res.status(200).json({
          msg: "user deleted",
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
