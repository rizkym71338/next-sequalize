import models from "../../../../db/models/index";

const Post = async (req, res) => {
  try {
    const Posts = await models.posts.findAll({
      include: [
        {
          model: models.postCategories,
          as: "categories",
        },
      ],
    });
    res.status(200).json({
      msg: "Post founded",
      Posts,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export default Post;
