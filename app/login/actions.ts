"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export async function login(formData: FormData) {
  const password = formData.get("password");
  const VALID_PASSWORD = process.env.ADMIN_PASSWORD;

  if (!VALID_PASSWORD) {
    return { error: "Login ist nicht konfiguriert." };
  }

  if (password === VALID_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });
    redirect("/dashboard");
  } else {
    return { error: "Invalid password" };
  }
}
