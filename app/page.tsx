import { redirect } from "next/navigation";
import { getSession, verifySession } from "@/lib/auth";

export default async function Home() {
  const session = await getSession();

  if (session && await verifySession(session)) {
    redirect("/notes");
  } else {
    redirect("/login");
  }
}
