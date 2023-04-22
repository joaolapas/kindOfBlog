import { serviceCreate, serviceGetAll } from "../services/post.service.js";

const create = async (req, res) => {
  try {
    const {title, text, banner} = req.body;

    if(!title || !text || !banner) {
        res.status(400).send("Submit all fields!");
    }

    await serviceCreate({title, text, banner, id: 'fake-id'});

    res.status(201).send("created");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAll = async (req, res) => {
  const posts = [];
  try {
    res.send(posts);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findById = (req, res) => {};

const update = (req, res) => {};

export { create, findAll, findById, update };
