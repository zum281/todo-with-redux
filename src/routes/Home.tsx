import { useDispatch, useSelector } from "react-redux";
import { add, remove, toggle } from "../redux/tasksSlice";
import type { AppDispatch, RootState } from "../redux/store";
import type { Category, Task } from "../types";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector<RootState>((store) => store.tasks.tasks) as Task[];
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
  };

  const toggleComplete = (id: string) => dispatch(toggle(id));

  const deleteTask = (id: string) => dispatch(remove(id));

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Add a new task</h1>
      <TaskForm action={submit} />

      <Separator />
      {(!tasks || tasks.length === 0) && (
        <p className="mt-6 text-center font-medium">
          Add a task to see it in this section!
        </p>
      )}
      {!!tasks && tasks.length > 0 && (
        <section className="py-6 space-y-4">
          <h2 className="font-bold text-xl">All your tasks:</h2>
          <ul className="grid grid-cols-2 gap-4">
            {tasks.map((task) => (
              <li key={task.title}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>{task.title}</CardTitle>
                    {(!!task.dueDate || !!task.category) && (
                      <CardDescription className="flex flex-wrap gap-1">
                        {!!task.dueDate && (
                          <span className="text-xs">
                            Due {new Date(task.dueDate).toDateString()}
                          </span>
                        )}
                        {!!task.category && (
                          <Badge variant="secondary" className="-ml-2">
                            {task.category?.name}
                          </Badge>
                        )}
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
                  <CardContent className="grow h-16">
                    {!!task.description && (
                      <ScrollArea className="h-full">
                        {task.description}
                      </ScrollArea>
                    )}
                  </CardContent>
                  <CardFooter className="grid grid-cols-2 gap-4">
                    <Button onClick={() => toggleComplete(task.id)} size="sm">
                      {task.complete ? "Mark incomplete" : "Complete task"}
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/edit/task/${task.id}`}>Edit task</Link>
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
