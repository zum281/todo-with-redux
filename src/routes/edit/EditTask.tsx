import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import type { Task } from "../../types";
import { Link, useLocation } from "wouter";
import { update } from "../../redux/tasksSlice";
import { TaskForm } from "../../components/task-form/TaskForm";

function EditTask(params: { id: string }) {
  const [, navigate] = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const task = useSelector<RootState>((store) =>
    store.tasks.tasks.find((task) => task.id === params.id),
  ) as Task | null;

  const submit = (formData: FormData) => {
    if (!task) return;
    const title = formData.get("task-title")! as string;
    const description = formData.get("task-description") as string | undefined;

    dispatch(update({ ...task, title, description }));
    navigate("/");
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
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
    </main>
  );
}

export default EditTask;
