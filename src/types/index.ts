export type Task = {
  id: string;
  title: string;
  description?: string;
  complete: boolean;
  dueDate?: string;
};

export type Category = {
  id: string;
  name: string;
};
