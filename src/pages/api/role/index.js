import models from "../../../../db/models/index";

const Role = async (req, res) => {
  if (req.method == "GET") {
    try {
      const roles = await models.roles.findAll({
        attributes: ["uuid", "rolename"],
      });
      res.status(200).json({
        msg: "role founded",
        roles,
      });
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

export default Role;
