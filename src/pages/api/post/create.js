import models from "../../../../db/models/index";

const Create = async (req, res) => {
  const { title, body, categories } = req.body;

  try {
    const Posts = await models.posts.create({
      title,
      body,
    });

    categories.map(async (uuid) => {
      const category = await models.postCategories.findOne({
        where: {
          uuid,
        },
      });
      Posts.setCategories(category.id);
      await Posts.save();
    });

    res.status(200).json({
      msg: "Post created",
      posts: Posts,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export default Create;
