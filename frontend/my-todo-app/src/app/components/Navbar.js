"use client";

import Link from "next/link";
import { useAuth } from "../../AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const router = useRouter();

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:3001/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.status === 200) {
        setIsLoggedIn(false);
        router.refresh();
        router.push("/");
      } else {
        // Handle any errors
        console.error("Failed to log out:", data.message);
      }
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <nav>
      {isLoggedIn ? (
        <>
          <h1>Helpdesk</h1>
          <Link href="/">Dashboard</Link>
          <Link href="/todos">Todos</Link>
          <Link href="/todos/create">Create </Link>
          <Link href="/" onClick={logout}>
            Logout
          </Link>
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
