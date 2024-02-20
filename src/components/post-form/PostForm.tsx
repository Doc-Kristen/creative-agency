"use client";

import React from "react";
import { useFormState } from "react-dom";
import Image from "next/image";
import { addPost } from "@/lib/action";
import { StateAdminForm } from "@/types/utils.type";
import styles from "./post-form.module.scss";
import ButtonForm from "./button-form/ButtonForm";

interface AdminPostFormProps {
  userId: string;
}

const AdminPostForm: React.FC<AdminPostFormProps> = ({ userId }) => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const handlePost = async (state: StateAdminForm, formData: FormData) => {
    const addPostAction = await addPost(state, formData);
    if (!addPostAction.error) {
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

  const [previewImage, setPreviewImage] = React.useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  return (
    <form ref={formRef} action={formAction} className={styles.container}>
      <h1>Add New Post</h1>
      <input type="hidden" name="userId" value={userId} />
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
        />
      </div>
      <input type="text" name="title" placeholder="title" />
      <input type="text" name="slug" placeholder="slug" />
      <textarea name="description" placeholder="description" rows={10} />
      <ButtonForm />
      {state?.error}
    </form>
  );
};

export default AdminPostForm;
