import Post from "../models/Post.js";
import {
  serviceCreate,
  serviceFindAll,
  countPosts,
  serviceTopPost,
  serviceFindById,
  serviceSearchByTitle,
  serviceByUser,
  serviceUpdate,
  serviceDeletePost,
  serviceLikePost,
  serviceRemoveLike,
  serviceAddComment,
  serviceRemoveComment,
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

    if (!post) {
      res.status(400).send({ message: "That post does not exist!" });
    } else {
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
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const searchByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    const posts = await serviceSearchByTitle(title);

    if (posts.length === 0) {
      res.status(400).send({ message: "No posts found" });
    }
    res.send({
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
    res.status(500).send(err.message);
  }
};

const byUser = async (req, res) => {
  try {
    const id = req.userId;
    const posts = await serviceByUser(id);

    res.send({
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
    res.status(500).send(err.message);
  }
};

const update = async (req, res) => {
  try {
    const { title, text, banner } = req.body;
    const { id } = req.params;

    if (!title && !text && !banner) {
      res.status(400).send({
        message: "Submit at least one of the fields to update the post",
      });
    }

    const posts = await serviceFindById(id);

    if (posts.user.id != req.userId) {
      res.status(404).send({ message: "You don't have permission for that" });
    }
    await serviceUpdate(id, title, text, banner);

    res.send("Post updated successfully");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await serviceFindById(id);

    if (post.user.id != req.userId) {
      res.status(404).send({ message: "You don't have permission for that" });
    }
    await serviceDeletePost(id);

    res.send("Post deleted successfully!");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { userId } = req.userId;

    const like = await serviceLikePost(postId, userId);

    if (!like) {
      await serviceRemoveLike(postId, userId);
      return res.status(200).send({ message: "Like removed" });
    }

    res.status(200).send({ message: "Liked!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.userId;
    const { comment } = req.body.comment;

    if (!comment) {
      res.status(400).send({ message: "Please write a comment" });
    }

    await serviceAddComment(postId, userId, comment);

    res.send("Comment created successfully!");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const removeComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const userId = req.userId;

    const deletedComment = await serviceRemoveComment(
      postId,
      userId,
      commentId
    );

    const commentFinder = deletedCommentcomments.find(
      (comment) => comment.commentId === commentId
    );
    if (!commentFinder) {
      return res
        .status(404)
        .send({ message: "Comment not found" });
    }
    if (commentFinder.userId !== userId) {
      return res
        .status(400)
        .send({ message: "You don't have permission to delete that comment" });
    }
    res.send("Comment removed!");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export {
  create,
  findAll,
  topPost,
  findById,
  searchByTitle,
  byUser,
  update,
  deletePost,
  likePost,
  addComment,
  removeComment,
};
