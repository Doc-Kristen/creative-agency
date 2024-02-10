import PostForm from "@/components/post-form/PostForm";

export const metadata = {
  title: "Admin",
  description: "Admin description",
};

const AdminPage: React.FC = () => {
  return (
    <div>
      <PostForm />
    </div>
  );
};

export default AdminPage;
