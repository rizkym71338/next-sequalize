import models from "../../../../../db/models/index";

const Create = async (req, res) => {
  const { name } = req.body;

  try {
    const PostCategories = await models.postCategories.create({
      name,
    });
    res.status(200).json({
      msg: "Post Categories created",
      categories: PostCategories,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export default Create;
