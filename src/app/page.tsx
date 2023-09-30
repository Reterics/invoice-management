'use client';
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div> {session?.data?.user?.name}</div>
      <button onClick={() => signOut()}>Logout</button>
    </main>
  )
}
