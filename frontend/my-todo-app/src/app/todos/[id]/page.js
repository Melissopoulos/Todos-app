import { notFound } from "next/navigation";

export const dynamicParams = true;

export async function generateStaticParams() {
  const res = await fetch("http://localhost:3001/todos");

  const todos = await res.json();

  return todos.map((todo) => ({
    id: todo.id,
  }));
}

async function getTodo(id) {
  const res = await fetch(`http://localhost:3001/tickets/${id}`, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export default async function TodoDetails({ params }) {
  // const id = params.id
  const ticket = await getTodo(params.id);

  return (
    <main>
      <nav>
        <h2>Todo Details</h2>
      </nav>
      <div className="card">
        <h3>{todo.title}</h3>
        <small>Created by {todo.user_email}</small>
        <p>{todo.body}</p>
        <div className={`pill ${todo.priority}`}>{todo.priority} priority</div>
      </div>
    </main>
  );
}
