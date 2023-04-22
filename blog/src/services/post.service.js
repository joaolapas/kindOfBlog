import Post from "../models/Post";

const serviceCreate = (body) => Post.create(body);

const serviceFindAll = () => Post.find();

const serviceFindById = () => {};

const serviceUpdate = () => {};

export { serviceCreate, serviceFindAll, serviceFindById, serviceUpdate };
