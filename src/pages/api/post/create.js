import models from "../../../../db/models/index";

const Create = async (req, res) => {
  const { title, body, categories } = req.body;

  if (req.method == "POST") {
    try {
      const post = await models.posts.findOne({
        where: {
          title,
        },
      });

      const createPost = async () => {
        const post = await models.posts.create({
          title,
          body,
        });
        categories &&
          categories.map(async (uuid) => {
            const category = await models.postCategories.findOne({
              where: {
                uuid,
              },
            });
            await post.setCategories(category.id);
            await post.save();
          });
        res.status(200).json({
          msg: "Post created",
        });
      };

      const postExists = async () => {
        res.status(400).json({
          msg: "post already exists",
        });
      };

      post ? postExists() : createPost();
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

export default Create;
