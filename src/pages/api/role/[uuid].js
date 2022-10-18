import models from "../../../../db/models/index";

const Read = async (req, res) => {
  const { uuid } = req.query;

  if (req.method == "GET") {
    try {
      const role = await models.roles.findOne({
        where: {
          uuid,
        },
        attributes: ["uuid", "rolename"],
      });

      const match = async () => {
        res.status(200).json({
          msg: "role founded",
          role,
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

export default Read;
