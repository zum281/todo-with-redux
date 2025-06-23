import { useDispatch, useSelector } from "react-redux";
import { add, remove, toggle } from "../redux/tasksSlice";
import type { AppDispatch, RootState } from "../redux/store";
import type { Task } from "../types";
import { Link } from "wouter";
import { TaskForm } from "../components/task-form/TaskForm";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector<RootState>((store) => store.tasks.tasks) as Task[];

  const submit = (formData: FormData) => {
    const title = formData.get("task-title")! as string;
    const description = formData.get("task-description") as string | undefined;
    const dueDate = formData.get("task-duedate") as string | undefined;

    const newTask = {
      id: crypto.randomUUID(),
      title,
      description,
      complete: false,
      dueDate,
    };

    dispatch(add(newTask));
  };

  const toggleComplete = (id: string) => dispatch(toggle(id));

  const deleteTask = (id: string) => dispatch(remove(id));

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">Add a new task</h1>
      <TaskForm action={submit} />

      <Separator />
      {(!tasks || tasks.length === 0) && (
        <p>Add a task to see it in this section!</p>
      )}
      {!!tasks && tasks.length > 0 && (
        <section className="py-6">
          <h2 className="font-bold text-xl">All your tasks:</h2>
          <ul>
            {tasks.map((task) => (
              <li key={task.title}>
                <Card>
                  <CardHeader>
                    <CardTitle>{task.title}</CardTitle>
                    {!!task.dueDate && (
                      <CardDescription>
                        Due date: {task.dueDate}
                      </CardDescription>
                    )}
                    <CardAction>
                      <Button
                        onClick={() => deleteTask(task.id)}
                        variant="destructive"
                        size="sm"
                      >
                        Delete task
                      </Button>
                    </CardAction>
                  </CardHeader>
                  {!!task.description && (
                    <CardContent>{task.description}</CardContent>
                  )}
                  <CardFooter className="grid grid-cols-2 gap-4">
                    <Button onClick={() => toggleComplete(task.id)}>
                      {task.complete ? "Mark incomplete" : "Complete task"}
                    </Button>
                    <Button asChild variant="outline">
                      <Link href={`/edit/${task.id}`}>Edit task</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

export default App;
