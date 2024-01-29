"use client";

import Link from "next/link";
import { useAuth } from "../../AuthContext";

export default function Navbar() {
  const { isLoggedIn } = useAuth();

  return (
    <nav>
      {isLoggedIn ? (
        <>
          <h1>Helpdesk</h1>
          <Link href="/">Dashboard</Link>
          <Link href="/todos">Todos</Link>
          <Link href="/todos/create">Create </Link>
          <Link href="/login">Logout </Link>
        </>
      ) : (
        <>
          <Link href="/login">Login</Link>
          <Link href="/register">Sign Up</Link>
        </>
      )}
    </nav>
  );
}
