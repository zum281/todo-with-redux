import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import type { Category, Task } from "../../types";
import { Link, useLocation } from "wouter";
import { update } from "../../redux/tasksSlice";
import { TaskForm } from "../../components/task-form/TaskForm";

function EditTask(params: { id: string }) {
  const [, navigate] = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const task = useSelector<RootState>((store) =>
    store.tasks.tasks.find((task) => task.id === params.id),
  ) as Task | null;

  const categories = useSelector<RootState>(
    (store) => store.categories.categories,
  ) as Category[];

  const submit = (formData: FormData) => {
    if (!task) return;
    const title = formData.get("task-title")! as string;
    const description = formData.get("task-description") as string | undefined;
    const categoryId = formData.get("task-category") as string;

    const category = categories.find((cat) => cat.id === categoryId);

    dispatch(update({ ...task, title, description, category }));
    navigate("/");
  };

  return (
    <>
      {!task && (
        <>
          <p>No task found with id {params.id}</p>
          <Link href="/">Return to home</Link>
        </>
      )}
      {!!task && (
        <>
          <h1 className="text-2xl font-bold">Update task {task.title}</h1>
          <TaskForm action={submit} sumbitLabel="Update task" task={task} />
        </>
      )}
    </>
  );
}

export default EditTask;
