import models from "../../../../../db/models/index";

const Create = async (req, res) => {
  const { name } = req.body;

  if (req.method == "POST") {
    try {
      const category = await models.postCategories.findOne({
        where: {
          name,
        },
      });

      const createCategory = async () => {
        await models.postCategories.create({
          name,
        });
        res.status(200).json({
          msg: "category created",
        });
      };

      const categoryExists = async () => {
        res.status(404).json({
          msg: "category already exists",
        });
      };

      category ? categoryExists() : createCategory();
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
