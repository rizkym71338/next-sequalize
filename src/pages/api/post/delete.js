import models from "../../../../db/models/index";

const Delete = async (req, res) => {
  const { uuid } = req.query;

  if (req.method == "DELETE") {
    try {
      const post = await models.posts.findOne({
        where: {
          uuid,
        },
      });

      const match = async () => {
        await post.destroy();
        res.status(200).json({
          msg: "post deleted",
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
