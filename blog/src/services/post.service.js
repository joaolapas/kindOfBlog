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

export {
  serviceCreate,
  serviceFindAll,
  countPosts,
  serviceTopPost,
  serviceFindById,
  serviceSearchByTitle,
  serviceByUser,
  serviceUpdate,
};
