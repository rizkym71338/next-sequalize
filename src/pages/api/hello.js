// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import models from "../../../db/models/index";

const hello = async (req, res) => {
  const { username, password } = req.body;

  try {
    const Users = await models.users.create({
      username,
      password,
    });
    res.status(200).json({
      msg: "User created",
      user: Users,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export default hello;
