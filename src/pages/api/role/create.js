import models from "../../../../db/models/index";

const Create = async (req, res) => {
  const { rolename } = req.body;

  if (req.method == "POST") {
    try {
      const role = await models.roles.findOne({
        where: {
          rolename,
        },
      });

      const createRole = async () => {
        await models.roles.create({
          rolename,
        });
        res.status(200).json({
          msg: "role created",
        });
      };

      const roleExists = async () => {
        res.status(400).json({
          msg: "role already exists",
        });
      };

      role ? roleExists() : createRole();
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
