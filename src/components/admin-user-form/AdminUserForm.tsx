"use client";

import React from "react";
import { useFormState } from "react-dom";
import { addUser } from "@/lib/action";
import Image from "next/image";
import styles from "./admin-user-form.module.scss";
import { StateAdminForm } from "@/types/utils.type";

const AdminUserForm: React.FC = () => {
  const userFormRef = React.useRef<HTMLFormElement>(null);
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleUser = async (state: StateAdminForm, formData: FormData) => {
    const addPostAction = await addUser(state, formData);
    if (!addPostAction?.error) {
      setPreviewImage(null);
      userFormRef.current?.reset();
    }
    return addPostAction;
  };

  const [state, formAction] = useFormState<StateAdminForm, FormData>(
    handleUser,
    {
      error: null,
    }
  );
  return (
    <form action={formAction} className={styles.container}>
      <h1>Add new user</h1>
      {previewImage && (
        <div className={styles.avatarImageWrapper}>
          <Image
            src={previewImage || "/img/no-avatar.png"}
            alt=""
            width={50}
            height={50}
          />
        </div>
      )}
      <div className={styles.uploadImage}>
        <label htmlFor="avatarInput">Choose an image to upload:</label>
        <input
          type="file"
          name="img"
          id="avatarInput"
          accept="image/*"
          onChange={handleImageChange}
          placeholder="Выберите изображение"
        />
      </div>
      <input type="text" name="username" placeholder="username" />
      <input type="text" name="email" placeholder="email" />
      <input type="password" name="password" placeholder="password" />
      <select name="isAdmin">
        <option value="false">Is Admin?</option>
        <option value="false">No</option>
        <option value="true">Yes</option>
      </select>
      <button className={styles.button}>Add</button>
      {state?.error}
    </form>
  );
};

export default AdminUserForm;
