export interface IPostBase {
  id: string;
  title: string;
  img?: string;
  slug: string;
}

export interface IPost extends IPostBase {
  description: string;
  userId: string;
  createdAt: string;
}
