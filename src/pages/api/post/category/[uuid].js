import models from "../../../../../db/models/index";

const Read = async (req, res) => {
  const { uuid } = req.query;

  if (req.method == "GET") {
    try {
      const category = await models.postCategories.findOne({
        where: {
          uuid,
        },
        attributes: ["uuid", "name"],
      });

      const match = async () => {
        res.status(200).json({
          msg: "category founded",
          category,
        });
      };

      const notMatch = async () => {
        res.status(404).json({
          msg: `category with uuid ${uuid} not found`,
        });
      };

      category ? match() : notMatch();
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
