import models from "../../../../db/models/index";

const Create = async (req, res) => {
  const { rolename } = req.body;

  if (req.method == "POST") {
    try {
      await models.roles.create({
        rolename,
      });
      res.status(200).json({
        msg: "role created",
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

export default Create;
