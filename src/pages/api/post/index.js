import models from "../../../../db/models/index";

const Post = async (req, res) => {
  if (req.method == "GET") {
    try {
      const post = await models.posts.findAll({
        attributes: ["uuid", "title", "body"],
        include: [
          {
            model: models.postCategories,
            as: "categories",
            attributes: ["uuid", "name"],
          },
        ],
      });
      res.status(200).json({
        msg: "post founded",
        posts: post,
      });
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

export default Post;
