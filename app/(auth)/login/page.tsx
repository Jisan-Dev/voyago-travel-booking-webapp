"use client";

import { AuthForm } from "@/components/auth-form";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { SubmitEvent } from "react";

export default function LoginPage() {
  const { data: session } = authClient.useSession();

  if (session?.user) redirect("/");

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      throw new Error("NEXT_PUBLIC_BASE_URL is not defined in environment variables");
    }

    const data = new FormData(e.target);
    const formData = {
      email: data.get("email") as string,
      password: data.get("password") as string,
      callbackURL: process.env.NEXT_PUBLIC_BASE_URL, // it will redirect & also reload the page (optional, but reloading is good to fetch the session again after login is successful to avoid stale session or ensure session is properly set)
    };

    await authClient.signIn.email(formData, {
      onSuccess: (ctx) => {
        console.log("Success: ", ctx);
      },
      onError: (err) => {
        console.log("Error: ", err);
      },
    });
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="max-w-md w-full p-8 border border-primary/20 rounded-lg shadow-md shadow-primary/30">
        <AuthForm mode="login" handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}
