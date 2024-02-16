import { Post, User } from "./models";
import { connectToDb } from "./utils";

export const getPosts = async () => {
  try {
    connectToDb();
    const posts = await Post.find();
    return posts;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get posts");
  }
};

export const getPostsByUserId = async (userId: string) => {
  try {
    connectToDb();
    const posts = await Post.find({ userId });
    return posts;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get posts");
  }
};

export const getPost = async (slug: string) => {
  try {
    connectToDb();
    const post = await Post.findOne({ slug });
    return post;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get post");
  }
};

export const getUser = async (userId: string) => {
  try {
    connectToDb();
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get user");
  }
};

export const getUsers = async () => {
  try {
    connectToDb();
    const users = await User.find();
    return users;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get users");
  }
};
