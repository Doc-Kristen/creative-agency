"use client";

import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import { addUser } from "@/lib/action";
import Image from "next/image";
import ButtonForm from "../button-form/ButtonForm";
import { StateAdminForm } from "@/types/utils.type";
import styles from "./admin-user-form.module.scss";
import useFormPending from "@/hooks/useFormPending";

const AdminUserForm: React.FC = () => {
  const userFormRef = React.useRef<HTMLFormElement>(null);

  const [previewImage, setPreviewImage] = React.useState<string | null>(null);
  const { isPending, setIsPending } = useFormPending();

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
    <form ref={userFormRef} action={formAction} className={styles.container}>
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
          disabled={isPending}
        />
      </div>
      <input
        type="text"
        name="username"
        placeholder="username"
        disabled={isPending}
      />
      <input
        type="text"
        name="email"
        placeholder="email"
        disabled={isPending}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        disabled={isPending}
      />
      <select name="isAdmin" disabled={isPending}>
        <option value="false">Is Admin?</option>
        <option value="false">No</option>
        <option value="true">Yes</option>
      </select>
      <ButtonForm setIsPending={setIsPending}>Delete</ButtonForm>
      {state?.error}
    </form>
  );
};

export default AdminUserForm;
