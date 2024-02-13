"use server";

import { connectToDb } from "./utils";
import { Post } from "./models";
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "./auth";

export const addPost = async (formData) => {
  const { description, slug, userId, img, title } =
    Object.fromEntries(formData);
  try {
    connectToDb();
    const newPost = new Post({
      description,
      slug,
      userId,
      img,
      title,
    });
    await newPost.save();
    revalidatePath("/blog");
  } catch (error) {
    console.log(error);
    throw new Error("Post not added");
  }
};

export const deletePost = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Post.findByIdAndDelete(id);
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const handleGithubLogin = async () => {
  "use server";
  await signIn("github");
};

export const handleLogout = async () => {
  "use server";
  await signOut();
};
