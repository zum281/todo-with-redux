import { useSelector } from "react-redux";
import "../App.css";
import type { RootState } from "../redux/store";
import type { Task } from "../types";
import { Link } from "wouter";

function Edit(params: { id: string }) {
  const task = useSelector<RootState>((store) =>
    store.tasks.tasks.find((task) => task.id === Number(params.id)),
  ) as Task | null;

  return (
    <main>
      {!task && (
        <>
          <p>No task found with id {params.id}</p>
          <Link href="/">Return to home</Link>
        </>
      )}
      {!!task && <>editing task {task.id}</>}
    </main>
  );
}

export default Edit;
