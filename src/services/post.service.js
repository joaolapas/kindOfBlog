import Post from "../models/Post.js";

const serviceCreate = (body) => Post.create(body);

const serviceFindAll = (limit, offset) =>
  Post.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

const countPosts = () => Post.countDocuments();

const serviceTopPost = () => Post.findOne().sort({ _id: -1 }).populate("user");

const serviceFindById = (id) => Post.findById(id).populate("user");

const serviceSearchByTitle = (title) =>
  Post.find({
    title: { $regex: `${title || ""}`, $options: "i" },
  })
    .sort({ _id: -1 })
    .populate("user");

const serviceByUser = (id) =>
  Post.find({ user: id }).sort({ _id: -1 }).populate("user");

const serviceUpdate = (id, title, text, banner) =>
  Post.findOneAndUpdate(
    { _id: id },
    { title, text, banner },
    { rawResult: true }
  );

const serviceDeletePost = (id) => Post.findByIdAndRemove({ _id: id });

const serviceLikePost = (postId, userId) =>
  Post.findOneAndUpdate(
    { _id: postId, "likes.userId": { $nin: [userId] } },
    { $push: { likes: { userId, createdAt: new Date() } } }
  );

const serviceRemoveLike = (postId, userId) =>
  Post.findOneAndUpdate({ _id: postId }, { $pull: { likes: { userId } } });

const serviceAddComment = (postId, userId, comment) => {
  const commentId = Math.floor(Math.random() * Date.now).toString(36);
  return Post.findOneAndUpdate(
    { _id: postId },
    {
      $push: {
        comments: { commentId, userId, comment, createdAt: new Date() },
      },
    }
  );
};

const serviceRemoveComment = (postId, userId, commentId) => Post.findOneAndUpdate({ _id: postId }, { $pull: { comments: {commentId, userId}}});
export {
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
};
