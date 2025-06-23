import type { FC } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import type { Task } from "@/types";

export const TaskForm: FC<TaskFormProps> = ({
  action,
  sumbitLabel = "Add task",
  task,
}) => {
  return (
    <form action={action} className="space-y-4 py-6">
      <div>
        <Label htmlFor="task-title" className="mb-2">
          Task title *
        </Label>
        <Input
          type="text"
          id="task-title"
          name="task-title"
          required
          {...(!!task && { defaultValue: task.title })}
        />
      </div>
      <div>
        <Label htmlFor="task-description" className="mb-2">
          Task description{" "}
        </Label>
        <Textarea
          id="task-description"
          name="task-description"
          rows={12}
          {...(!!task && { defaultValue: task.description })}
        />
      </div>
      <div>
        <Label htmlFor="task-duedate" className="mb-2">
          Due date
        </Label>
        <Input
          type="date"
          id="task-duedate"
          name="task-duedate"
          min={new Date().toISOString().split("T")[0]}
          {...(!!task && { defaultValue: task.dueDate })}
        />
      </div>
      <Button type="submit" className="w-fit">
        {sumbitLabel}
      </Button>
    </form>
  );
};

interface TaskFormProps {
  action: (data: FormData) => void;
  sumbitLabel?: string;
  task?: Task;
}
