import PostCard from "@/components/post-card/PostCard";
import styles from "./blog.module.scss";

const posts = [
  {
    id: "post1",
    title: "10 Principles of Good Design",
    body: "Good design is innovative, useful, aesthetic, understandable, unobtrusive, honest, long-lasting, thorough down to the last detail, environmentally friendly, and as little design as possible.",
    slug: "principles-of-good-design",
    createdAt: "2022-05-20",
    img: "/img/contact.png",
  },
  {
    id: "post2",
    title: "The Role of Typography in Design",
    body: "Typography plays a crucial role in design, as it helps convey the intended message, establish hierarchy, and create visual interest. Choosing the right typeface is essential for effective communication through design.",
    slug: "role-of-typography-in-design",
    createdAt: "2022-06-15",
    img: "/img/contact.png",
  },
  {
    id: "post3",
    title: "Color Theory in Design",
    body: "Understanding color theory is fundamental for designers, as it allows them to create harmonious and visually appealing compositions. Different colors evoke specific emotions and can influence user perception and behavior.",
    slug: "color-theory-in-design",
    createdAt: "2022-07-10",
    img: "/img/contact.png",
  },
  {
    id: "post4",
    title: "Creating Engaging User Experiences",
    body: "Designing for positive user experiences involves considering usability, accessibility, interaction design, and human psychology. By focusing on users' needs and expectations, designers can craft engaging and intuitive experiences.",
    slug: "engaging-user-experiences",
    createdAt: "2022-08-05",
    img: "/img/contact.png",
  },
];

const BlogPage: React.FC = () => {
  return (
    <ul className={styles.container}>
      {posts.map((post) => (
        <li className={styles.post} key={post.id}>
          <PostCard {...post} />
        </li>
      ))}
    </ul>
  );
};

export default BlogPage;
