"use client";

import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import Image from "next/image";
import { addPost } from "@/lib/action";
import { StateAdminForm } from "@/types/utils.type";
import styles from "./post-form.module.scss";
import ButtonForm from "../button-form/ButtonForm";
import useFormPending from "@/hooks/useFormPending";

interface AdminPostFormProps {
  userId: string;
}
console.log();

const AdminPostForm: React.FC<AdminPostFormProps> = ({ userId }) => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const { isPending, setIsPending } = useFormPending();

  const [previewImage, setPreviewImage] = React.useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handlePost = async (state: StateAdminForm, formData: FormData) => {
    const addPostAction = await addPost(state, formData);
    if (!addPostAction.error) {
      setPreviewImage(null);
      formRef.current?.reset();
    }
    return addPostAction;
  };

  const [state, formAction] = useFormState<StateAdminForm, FormData>(
    handlePost,
    {
      error: null,
    }
  );

  return (
    <form ref={formRef} action={formAction} className={styles.container}>
      <h1>Add New Post</h1>
      <input type="hidden" name="userId" value={userId} disabled={isPending} />
      {previewImage && (
        <div className={styles.previewImage}>
          <Image
            src={previewImage}
            alt="Preview"
            width={100}
            height={100}
            className={styles.img}
          />
        </div>
      )}
      <div className={styles.uploadImage}>
        <label htmlFor="imgInput">Choose an image to upload:</label>
        <input
          type="file"
          name="img"
          id="imgInput"
          accept="image/*"
          onChange={handleImageChange}
          placeholder="Выберите изображение"
          disabled={isPending}
        />
      </div>
      <input
        disabled={isPending}
        type="text"
        name="title"
        placeholder="title"
      />
      <textarea
        disabled={isPending}
        name="description"
        placeholder="description"
        rows={10}
      />
      <ButtonForm setIsPending={setIsPending}>Add</ButtonForm>
      {state?.error}
    </form>
  );
};

export default AdminPostForm;
