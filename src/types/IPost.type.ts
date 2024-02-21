export interface IPostBase {
  id: string;
  title: string;
  img?: string;
}

export interface IPost extends IPostBase {
  description: string;
  userId: string;
  slug: string;
  createdAt: string;
}
