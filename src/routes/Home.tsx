import { useDispatch, useSelector } from "react-redux";
import { remove, toggle } from "../redux/tasksSlice";
import type { AppDispatch, RootState } from "../redux/store";
import type { Task } from "../types";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
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

  const toggleComplete = (id: string) => dispatch(toggle(id));

  const deleteTask = (id: string) => dispatch(remove(id));

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Manage your categories</h1>

      {(!tasks || tasks.length === 0) && (
        <div className="space-y-2">
          <p className="font-medium">
            There are no tasks to display at this time.
          </p>
          <Button asChild>
            <Link href="/add/task">Add a new task</Link>
          </Button>
        </div>
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
                          <Badge variant="secondary" className="-ml-1">
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
    </>
  );
}

export default App;
