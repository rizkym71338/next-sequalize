import models from "../../../../db/models/index";

const Update = async (req, res) => {
  const { uuid } = req.query;
  const { title, body, categories } = req.body;

  if (req.method == "PUT") {
    try {
      const post = await models.posts.findOne({
        where: {
          uuid,
        },
        include: [
          {
            model: models.postCategories,
            as: "categories",
          },
        ],
      });

      const match = async () => {
        await post.update({
          title: title ?? post.title,
          body: body ?? post.body,
        });

        if (categories) {
          post.categories.map(async (category) => {
            await post.removeCategories(category.id);
            await post.save();
          });
          categories.map(async (uuid) => {
            const category = await models.postCategories.findOne({
              where: {
                uuid,
              },
            });
            await post.addCategories(category.id);
            await post.save();
          });
        }

        res.status(200).json({
          msg: "post updated",
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

export default Update;
