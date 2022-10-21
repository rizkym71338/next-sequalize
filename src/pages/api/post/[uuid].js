import models from "../../../../db/models/index";

const Read = async (req, res) => {
  const { uuid } = req.query;

  if (req.method == "GET") {
    try {
      const post = await models.posts.findOne({
        where: {
          uuid,
        },
        attributes: ["uuid", "title", "body"],
        include: [
          {
            model: models.postCategories,
            as: "categories",
            attributes: ["uuid", "name"],
            through: {
              attributes: [],
            },
          },
        ],
      });

      const match = async () => {
        res.status(200).json({
          msg: "post founded",
          post,
        });
      };

      const notMatch = async () => {
        res.status(404).json({
          msg: `post with uuid ${uuid} not found`,
        });
      };

      post ? match() : notMatch();
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
