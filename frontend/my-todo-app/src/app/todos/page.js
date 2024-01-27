import TodoList from "./Todolist";
import Link from "next/link";

export default function Tickets() {
  return (
    <main>
      <nav>
        <div>
          <h2>Todo List</h2>
          <p>
            <small>Currently open tickets.</small>
          </p>
        </div>
      </nav>
      <TodoList />
      <div className="flex justify-center items-center h-screen">
        <Link href="/todos/create" passHref>
          <button className="btn-primary">Create New Todo</button>
        </Link>
      </div>
    </main>
  );
}
