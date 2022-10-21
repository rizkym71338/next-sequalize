import models from "../../../../../db/models/index";

const Delete = async (req, res) => {
  const { uuid } = req.query;

  if (req.method == "DELETE") {
    try {
      const category = await models.postCategories.findOne({
        where: { uuid },
        include: [
          {
            model: models.posts,
            as: "posts",
          },
        ],
      });

      const match = async () => {
        await category.posts.remove();
        await category.destroy();
        res.status(200).json({
          msg: "category deleted",
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

export default Delete;
