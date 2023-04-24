import Post from "../models/Post.js";
import {
  serviceCreate,
  serviceFindAll,
  countPosts,
  serviceTopPost,
  serviceFindById,
} from "../services/post.service.js";

const create = async (req, res) => {
  try {
    const { title, text, banner } = req.body;

    if (!title || !text || !banner) {
      res.status(400).send("Submit all fields!");
    }

    await serviceCreate({
      title,
      text,
      banner,
      user: req.userId,
    });

    res.status(201).send("created");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAll = async (req, res) => {
  try {
    let { limit, offset } = req.query;

    limit = Number(limit);
    offset = Number(offset);

    if (!limit) {
      limit = 10;
    }
    if (!offset) {
      offset = 0;
    }

    const posts = await serviceFindAll(limit, offset);
    const total = await countPosts();
    const currentUrl = req.baseUrl;

    const next = offset + limit;
    const nextUrl =
      next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl =
      previous != null
        ? `${currentUrl}?limit=${limit}&offset=${previous}`
        : null;

    if (posts.length === 0) {
      res.status(400).send({ message: "No posts found" });
    }
    res.send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      total,
      results: posts.map((post) => ({
        id: post._id,
        title: post.title,
        text: post.text,
        banner: post.banner,
        likes: post.likes,
        comments: post.comments,
        name: post.user.name,
        username: post.user.username,
        userAvatar: post.user.avatar,
      })),
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

const topPost = async (req, res) => {
  try {
    const post = await serviceTopPost();

    if (!post) {
      res.status(400).send({ message: "Post not found" });
    }

    res.send({
      post: {
        id: post._id,
        title: post.title,
        text: post.text,
        banner: post.banner,
        likes: post.likes,
        comments: post.comments,
        name: post.user.name,
        username: post.user.username,
        userAvatar: post.user.avatar,
      },
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await serviceFindById(id);
    console.log(id);
    res.send({
      post: {
        id: post._id,
        title: post.title,
        text: post.text,
        banner: post.banner,
        likes: post.likes,
        comments: post.comments,
        name: post.user.name,
        username: post.user.username,
        userAvatar: post.user.avatar,
      },
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

const update = (req, res) => {};

export { create, findAll, topPost, findById, update };
