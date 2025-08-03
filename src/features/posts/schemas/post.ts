export type PostType = {
  id: string;
  title: string;
  description: string;
  author: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  actions?: unknown;
};
