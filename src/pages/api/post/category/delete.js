import models from "../../../../../db/models/index";

const Delete = async (req, res) => {
  const { uuid } = req.query;

  if (req.method == "DELETE") {
    try {
      const categories = await models.postCategories.findOne({
        where: { uuid },
        attributes: ["id"],
      });

      const match = async () => {
        await models.postCategpries.destroy({
          where: {
            id: categories.id,
          },
        });
        res.status(200).json({
          msg: "Post Categories deleted",
        });
      };

      const notMatch = async () => {
        res.status(404).json({
          msg: `category with uuid ${uuid} not found`,
        });
      };

      categories ? match() : notMatch();
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

export default Delete;
