import userService from "../services/user.service.js";

const create = async (req, res) => {
  try {
    const { name, username, email, password, avatar, bg } = req.body;

    if (!name || !username || !email || !password || !avatar || !bg) {
      res.status(400).send({ message: "Submit all required fields" });
    }

    const user = await userService.create(req.body);
    if (!user) {
      return res.status(400).send({ message: "User creation failed" });
    }
    res.status(201).send({
      message: "User created successfully",
      user: {
        id: user._id,
        name,
        username,
        email,
        avatar,
        bg,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const findAll = async (req, res) => {
  try {
    const users = await userService.findAll();

    if (users.length === 0) {
      return res.status(404).send({ message: "No users found" });
    }

    res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const findById = async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const update = async (req, res) => {
  try {
    const { name, username, email, password, avatar, bg } = req.body;
    const id = req.id;
    //const user = await userService.findById(id);

    await userService.update(id, name, username, email, password, avatar, bg);

    res.send({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export default { create, findAll, findById, update };
