import type { FC } from "react";

export const TaskForm: FC<TaskFormProps> = ({
  action,
  sumbitLabel = "Add task",
}) => {
  return (
    <form
      action={action}
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
      <label htmlFor="task-duedate">Due date</label>
      <input
        type="date"
        id="task-duedate"
        name="task-duedate"
        min={new Date().toISOString().split("T")[0]}
      />
      <input type="submit" value={sumbitLabel} />
    </form>
  );
};

interface TaskFormProps {
  action: (data: FormData) => void;
  sumbitLabel?: string;
}
