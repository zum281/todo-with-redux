import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import { add, toggle } from "../redux/tasksSlice";
import type { AppDispatch, RootState } from "../redux/store";
import type { Task } from "../types";
import { Link } from "wouter";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector<RootState>((store) => store.tasks.tasks) as Task[];

  const submit = (formData: FormData) => {
    const title = formData.get("task-title")! as string;
    const description = formData.get("task-description") as string | undefined;

    const id = tasks[tasks.length - 1]?.id || 0;

    const newTask = { id, title, description, complete: false };

    dispatch(add(newTask));
  };

  const toggleComplete = (id: number) => dispatch(toggle(id));
  return (
    <main>
      <form
        action={submit}
        style={{
          display: "grid",
          justifyItems: "start",
          gap: ".5rem",
          fontSize: "1rem",
        }}
      >
        <label htmlFor="task-title">Task title *</label>
        <input type="text" id="task-title" name="task-title" required />
        <label htmlFor="task-description">Task description </label>
        <input type="text" id="task-description" name="task-description" />
        <input type="submit" value="Add task" />
      </form>

      <hr />

      <p>all your tasks:</p>
      <ul>
        {tasks.map((task) => (
          <li key={task.title}>
            {task.title} - {task.description}
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
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
