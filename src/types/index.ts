export type Task = {
  id: string;
  title: string;
  description?: string;
  complete: boolean;
  dueDate?: string;
  category?: Category;
};

export type Category = {
  id: string;
  name: string;
};
