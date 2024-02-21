"use server";

import { connectToDb } from "./utils";
import { Post, User } from "./models";
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "./auth";
import bcrypt from "bcrypt";
import { StateAdminForm } from "@/types/utils.type";
import { PAGE_ROUTES } from "./helpers/const";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { firebaseConfig, storage } from "./firebase";

const uploadImage = async (formData: FormData) => {
  try {
    const imageFile = formData.get("img") as File;
    const storageRef = ref(storage, "images/" + imageFile.name);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    return new Promise((resolve, reject) => {
      // Listen for state changes, errors, and completion of the upload
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // You can add handling for upload states if needed
        },
        (error) => {
          // Error handling
          console.error("Error uploading image:", error);
          reject(error);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              resolve(downloadURL);
            })
            .catch((urlError) => {
              console.error("Error getting download URL:", urlError);
              reject(urlError);
            });
        }
      );
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

const deleteImageInStorage = async (imageUrl: string | undefined) => {
  const isValidUrl = imageUrl?.startsWith(
    `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}`
  );

  if (isValidUrl) {
    const desertRef = ref(storage, imageUrl);

    try {
      await deleteObject(desertRef);
    } catch (error) {
      console.log(error);
      return { error: "The image has not been deleted" };
    }
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
  const { id, img } = Object.fromEntries(formData);

  try {
    connectToDb();
    if (img) {
      await deleteImageInStorage(img as string);
    }
    await Post.findByIdAndDelete(id);

    revalidatePath(PAGE_ROUTES.blog);
    revalidatePath(PAGE_ROUTES.admin);
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const addUser = async (prevState: unknown, formData: FormData) => {
  try {
    const { username, email, password } = Object.fromEntries(formData);
    const imgURL = (await uploadImage(formData)) || null;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password as string, salt);

    connectToDb();
    const newUser = new User({
      username,
      email,
      password: hashPassword,
      img: imgURL,
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
  const { id, img } = Object.fromEntries(formData);

  try {
    connectToDb();

    if (img) {
      await deleteImageInStorage(img as string);
    }

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
