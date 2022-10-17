import models from "../../../../db/models/index";

const Create = async (req, res) => {
  const { username, password, roleId } = req.body;

  try {
    const Users = await models.users.create({
      username,
      password,
      roleId,
    });
    res.status(200).json({
      msg: "Role created",
      users: Users,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export default Create;
