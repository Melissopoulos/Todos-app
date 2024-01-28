import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <h1>Helpdesk</h1>
      <Link href="/">Dashboard</Link>
      <Link href="/todos">Todos</Link>
      <Link href="/todos/create">Create </Link>
      <Link href="/register">Register </Link>
      <Link href="/login">Login </Link>
    </nav>
  );
}
