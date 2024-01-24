import Link from "next/link";

async function getTodos() {
  const res = await fetch("http://localhost:3001/todos", {
    next: {
      revalidate: 0, // use 0 to opt out of using cache
    },
  });

  return res.json();
}

export default async function TodoList() {
  const todos = await getTodos();
  console.log(todos);

  return (
    <>
      {todos &&
        todos.map((todo) => (
          <div key={todo.id} className="card my-5">
            <Link href={`/todos/${todo.id}`}>
              <h3>{todo.title}</h3>
              <p>{todo.body.slice(0, 200)}...</p>
              <div className={`pill ${todo.priority}`}>
                {todo.priority} priority
              </div>
            </Link>
          </div>
        ))}
      {todos.length === 0 && (
        <p className="text-center">There are no open todos, yay!</p>
      )}
    </>
  );
}
