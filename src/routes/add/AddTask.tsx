import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import type { Category } from "../../types";
import { useLocation } from "wouter";
import { add } from "../../redux/tasksSlice";
import { TaskForm } from "../../components/task-form/TaskForm";

function AddTask() {
  const [, navigate] = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const categories = useSelector<RootState>(
    (store) => store.categories.categories,
  ) as Category[];

  const submit = (formData: FormData) => {
    const title = formData.get("task-title")! as string;
    const description = formData.get("task-description") as string | undefined;
    const dueDate = formData.get("task-duedate") as string | undefined;
    const categoryId = formData.get("task-category") as string;

    const category = categories.find((cat) => cat.id === categoryId);

    const newTask = {
      id: crypto.randomUUID(),
      title,
      description,
      complete: false,
      dueDate,
      category,
    };

    dispatch(add(newTask));
    navigate("/");
  };
  return (
    <>
      <h1 className="text-2xl font-bold">Add a new task</h1>
      <TaskForm action={submit} />
    </>
  );
}

export default AddTask;
