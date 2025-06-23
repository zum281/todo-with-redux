import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import { add, remove, toggle } from "../redux/tasksSlice";
import type { AppDispatch, RootState } from "../redux/store";
import type { Task } from "../types";
import { Link } from "wouter";
import { TaskForm } from "../components/task-form/TaskForm";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector<RootState>((store) => store.tasks.tasks) as Task[];

  const submit = (formData: FormData) => {
    const title = formData.get("task-title")! as string;
    const description = formData.get("task-description") as string | undefined;
    const dueDate = formData.get("task-duedate") as string | undefined;

    const id = tasks[tasks.length - 1]?.id || 0;

    const newTask = {
      id,
      title,
      description,
      complete: false,
      dueDate,
    };

    dispatch(add(newTask));
  };

  const toggleComplete = (id: number) => dispatch(toggle(id));

  const deleteTask = (id: number) => dispatch(remove(id));

  return (
    <main>
      <TaskForm action={submit} />

      <hr />

      <p>all your tasks:</p>
      <ul>
        {tasks.map((task) => (
          <li key={task.title}>
            <p>{task.title}</p>
            {!!task.description && <p>{task.description}</p>}
            {!!task.dueDate && <p>Due date: {task.dueDate}</p>}
            <div>
              <label htmlFor={`toggle-complete-${task.title}`}>
                {task.complete ? "Mark incomplete" : "Complete task"}
              </label>
              <input
                type="checkbox"
                name={`toggle-complete-${task.title}`}
                id={`toggle-complete-${task.title}`}
                onChange={() => toggleComplete(task.id)}
              />
            </div>
            <Link href={`/edit/${task.id}`}>Edit task</Link>
            <button onClick={() => deleteTask(task.id)}>Delete task</button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
