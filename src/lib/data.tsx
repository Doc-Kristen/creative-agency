// TEMPORARY DATA
const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
];

const posts = [
  { id: 1, title: "Post 1", body: "......", userId: 1 },
  { id: 2, title: "Post 2", body: "......", userId: 1 },
  { id: 3, title: "Post 3", body: "......", userId: 2 },
  { id: 4, title: "Post 4", body: "......", userId: 2 },
];

export const getPosts = async () => {
  return posts;
};

export const getPost = async (postId: string) => {
  const res = posts.find((post) => post.id === parseInt(postId));
  console.log(postId);
  return res;
};

export const getUser = async (userId: string) => {
  return users.find((item) => item.id === parseInt(userId));
};
