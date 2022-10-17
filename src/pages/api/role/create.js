import models from "../../../../db/models/index";

const Create = async (req, res) => {
  const { rolename } = req.body;

  try {
    const Roles = await models.roles.create({
      rolename,
    });
    res.status(200).json({
      msg: "Role created",
      role: Roles,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export default Create;
