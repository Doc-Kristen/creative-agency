"use server";

import { connectToDb } from "./utils";
import { Post, User } from "./models";
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "./auth";
import bcrypt from "bcrypt";
import { StateAdminForm } from "@/types/utils.type";
import { PAGE_ROUTES } from "./helpers/const";

export const addPost = async (state: StateAdminForm, formData: FormData) => {
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
    revalidatePath(PAGE_ROUTES.blog);
    return state;
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const deletePost = async (formData: FormData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Post.findByIdAndDelete(id);
    revalidatePath(PAGE_ROUTES.blog);
    revalidatePath(PAGE_ROUTES.admin);
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const addUser = async (prevState: unknown, formData: FormData) => {
  const { username, email, password, img } = Object.fromEntries(formData);

  try {
    connectToDb();
    const newUser = new User({
      username,
      email,
      password,
      img,
    });

    await newUser.save();
    console.log("saved to db");
    revalidatePath(PAGE_ROUTES.admin);
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const deleteUser = async (formData: FormData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Post.deleteMany({ userId: id });
    await User.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath(PAGE_ROUTES.admin);
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

export const register = async (
  _previousState:
    | {
        error: string;
        success?: undefined;
      }
    | {
        success: boolean;
        error?: undefined;
      }
    | undefined,
  formData: FormData
) => {
  const { username, password, email, img, passwordRepeat } =
    Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return { error: "Password does not match" };
  }

  try {
    connectToDb();
    const user = await User.findOne({ email: email });

    if (user) {
      return { error: "User already exists" };
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password as string, salt);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
      img,
    });
    await newUser.save();
    console.log("User saved");
    return { success: true };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const login = async (_: any, formData: FormData) => {
  const { password, email } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { email, password });
  } catch (error: any) {
    if (error.type === "CredentialsSignin") {
      return { error: "Invalid username or password" };
    }
    throw error;
  }
};
