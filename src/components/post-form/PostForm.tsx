"use client";

import { useFormState } from "react-dom";
import styles from "./post-form.module.scss";
import { addPost } from "@/lib/action";
import { StateAdminForm } from "@/types/utils.type";

interface AdminPostFormProps {
  userId: string;
}

const AdminPostForm: React.FC<AdminPostFormProps> = ({ userId }) => {
  const [state, formAction] = useFormState<StateAdminForm, FormData>(addPost, {
    error: null,
  });

  return (
    <form action={formAction} className={styles.container}>
      <h1>Add New Post</h1>
      <input type="hidden" name="userId" value={userId} />
      <input type="text" name="title" placeholder="title" />
      <input type="text" name="slug" placeholder="slug" />
      <input type="text" name="img" placeholder="img" />
      <textarea name="description" placeholder="description" rows={10} />
      <button>Add</button>
      {state?.error}
    </form>
  );
};

export default AdminPostForm;
