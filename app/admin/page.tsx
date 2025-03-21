"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function AdminPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (session?.user?.role === "admin") {
      axios.get("/api/users").then((res) => setUsers(res.data));
    }
  }, [session]);

  if (session?.user?.role !== "admin") {
    return <div className="text-center mt-10">Доступ запрещен</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Админ-панель</h1>
      <ul>
        {users.map((u: { id: string; email: string; role: string }) => (
          <li key={u.id}>
            {u.email} - {u.role}
          </li>
        ))}
      </ul>
    </div>
  );
}
