import LoginForm from "./LoginForm";
import { getDictionary } from "@/get-dictionary";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Login | FLOXANT Operations Center",
    description: "Geschützter Login für das interne FLOXANT Operations Center.",
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  };
}

export default async function LoginPage() {
  const dict = await getDictionary("de");
  return <LoginForm dict={dict} />;
}
