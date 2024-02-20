"use server";

import { connectToDb } from "./utils";
import { Post, User } from "./models";
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "./auth";
import bcrypt from "bcrypt";
import { StateAdminForm } from "@/types/utils.type";
import { PAGE_ROUTES } from "./helpers/const";
import { put } from "@vercel/blob";

export const uploadImage = async (formData: FormData) => {
  const imageFile = formData.get("img") as File;
  console.log("imageFile", imageFile);
  if (imageFile && imageFile.size) {
    const blob = await put(imageFile.name, imageFile, {
      access: "public",
    });
    return blob.url;
  }
};

export const addPost = async (state: StateAdminForm, formData: FormData) => {
  try {
    connectToDb();
    const imgURL = (await uploadImage(formData)) || null;

    const { description, slug, userId, title } = Object.fromEntries(formData);
    console.log(description, slug, userId, title);

    const newPost = new Post({
      description,
      slug,
      userId,
      img: imgURL,
      title,
    });

    await newPost.save();
    revalidatePath(PAGE_ROUTES.blog);
    revalidatePath(PAGE_ROUTES.profile);
    return state;
  } catch (error) {
    console.log(error);
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

export const handleGoogleLogin = async () => {
  "use server";
  await signIn("google");
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
