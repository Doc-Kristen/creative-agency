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
import slugify from "slugify";

const uploadImage = async (formData: FormData) => {
  try {
    const imageFile = formData.get("img") as File;

    if (!imageFile.size) {
      return null;
    }

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
    const { description, userId, title } = Object.fromEntries(formData);
    const imgURL = await uploadImage(formData);

    const formattedSlug = slugify(String(title), { lower: true });

    const isDuplicateSlug = await Post.findOne({ slug: formattedSlug });

    if (isDuplicateSlug) {
      return { error: "The title must be unique" };
    }
    const newPost = new Post({
      title,
      description,
      slug: formattedSlug,
      userId,
    });
    if (imgURL) {
      newPost.img = String(imgURL);
    }

    await newPost.save();
    revalidatePath(PAGE_ROUTES.blog);
    revalidatePath(PAGE_ROUTES.profile);
    return state;
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const deletePost = async (state: StateAdminForm, formData: FormData) => {
  const { id, img } = Object.fromEntries(formData);

  try {
    connectToDb();
    if (typeof img === "string") {
      await deleteImageInStorage(img);
    }

    await Post.findByIdAndDelete(id);

    revalidatePath(PAGE_ROUTES.blog);
    revalidatePath(PAGE_ROUTES.admin);
    return state;
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const addUser = async (state: StateAdminForm, formData: FormData) => {
  try {
    const { username, email, password } = Object.fromEntries(formData);
    const imgURL = await uploadImage(formData);

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password as string, salt);

    connectToDb();
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    if (imgURL) {
      newUser.img = imgURL as string;
    }

    await newUser.save();
    console.log("saved to db");
    revalidatePath(PAGE_ROUTES.admin);
    return state;
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const deleteUser = async (state: StateAdminForm, formData: FormData) => {
  const { id, img } = Object.fromEntries(formData);

  try {
    connectToDb();

    if (typeof img === "string") {
      await deleteImageInStorage(img);
    }

    await Post.deleteMany({ userId: id });
    await User.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath(PAGE_ROUTES.admin);

    return state;
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

export const register = async (state: StateAdminForm, formData: FormData) => {
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
    state.success = true;
    return state;
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
