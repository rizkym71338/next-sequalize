import models from "../../../../../db/models/index";

const Category = async (req, res) => {
  if (req.method == "GET") {
    try {
      const category = await models.postCategories.findAll({
        attributes: ["uuid", "name"],
      });

      res.status(200).json({
        msg: "category founded",
        categories: category,
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

export default Category;
