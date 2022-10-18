import models from "../../../../../db/models/index";

const Category = async (req, res) => {
  try {
    const Categories = await models.postCategories.findAll({
      attributes: ["uuid", "name"],
      include: [
        {
          model: models.posts,
          as: "posts",
          attributes: ["uuid", "title", "body"],
        },
      ],
    });
    res.status(200).json({
      msg: "Categories founded",
      categories: Categories,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export default Category;
