import models from "../../../../../db/models/index";

const Update = async (req, res) => {
  const { uuid } = req.query;
  const { name } = req.body;

  if (req.method == "PUT") {
    try {
      const category = await models.postCategories.findOne({
        where: {
          uuid,
        },
      });

      const match = async () => {
        await category.update({
          name,
        });
        await category.save();
        res.status(200).json({
          msg: "category updated",
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

export default Update;
