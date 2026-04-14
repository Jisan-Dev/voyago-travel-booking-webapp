"use client";

import { AuthForm } from "@/components/auth-form";
import { authClient } from "@/lib/auth-client";
import { redirect, useSearchParams } from "next/navigation";
import { SubmitEvent } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const { data: session } = authClient.useSession();
  const searchParams = useSearchParams();
  const redirectUserPath = searchParams.get("redirect") || "/";
  const redirectUser = decodeURIComponent(redirectUserPath);

  if (session && session?.user) redirect("/");

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      throw new Error("NEXT_PUBLIC_BASE_URL is not defined in environment variables");
    }

    const data = new FormData(e.target);
    const formData = {
      email: data.get("email") as string,
      password: data.get("password") as string,
      callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}${redirectUser}`, // it will redirect & also reload the page (optional, but reloading is good to fetch the session again after login is successful to avoid stale session or ensure session is properly set)
    };

    await authClient.signIn.email(formData, {
      onSuccess: (ctx) => {
        console.log("Success: ", ctx);
      },
      onError: (err) => {
        console.log("Error: ", err);
        toast.error(err.error?.message || "Something went wrong");
      },
    });
  };

  const handleDemoLogin = async () => {
    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      throw new Error("NEXT_PUBLIC_BASE_URL is not defined in environment variables");
    }

    await authClient.signIn.email(
      {
        email: process.env.NEXT_PUBLIC_DEMO_EMAIL!,
        password: process.env.NEXT_PUBLIC_DEMO_PASSWORD!,
        callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}${redirectUser}`,
      },
      {
        onSuccess: (ctx) => console.log("Demo login success:", ctx),
        onError: (err) => {
          console.log("Demo login error:", err);
          toast.error(err.error?.message || "Something went wrong");
        },
      },
    );
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="max-w-sm w-full">
        <AuthForm mode="login" handleSubmit={handleSubmit} onDemoLogin={handleDemoLogin} />
      </div>
    </div>
  );
}
