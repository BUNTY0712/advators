import { redirect } from "next/navigation"

export default function Page() {
  // check login
  const isLoggedIn = false // 🔥 replace with real auth later

  if (isLoggedIn) {
    redirect("/dashboard")
  } else {
    redirect("/login")
  }
}