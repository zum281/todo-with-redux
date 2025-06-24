import type { FC } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import type { Category, Task } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

export const TaskForm: FC<TaskFormProps> = ({
  action,
  sumbitLabel = "Add task",
  task,
}) => {
  const categories =
    (useSelector<RootState>(
      (store) => store.categories.categories,
    ) as Category[]) || [];

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
      <div>
        <Label htmlFor="task-category" className="mb-2">
          Category
        </Label>
        <Select name="task-category">
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
