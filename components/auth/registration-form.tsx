"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { SubmitEvent } from "react";
import { toast } from "sonner";
import { AuthForm } from "../auth-form";

const RegistrationForm = () => {
  const router = useRouter();

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.target);
    const formData = {
      name: data.get("fname") + " " + data.get("lname"),
      email: data.get("email") as string,
      password: data.get("password") as string,
      // callbackURL: "/dashboard", // A URL to redirect to after the user verifies their email (optional)
    };
    const res = await authClient.signUp.email(formData, {
      onSuccess: () => {
        router.replace("/");
      },
      onError: (err) => {
        console.log("Error: ", err);
        toast.error(err.error?.message || "Something went wrong");
      },
    });
    console.log("Response: ", res);
  }

  const handleDemoLogin = async () => {
    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      throw new Error("NEXT_PUBLIC_BASE_URL is not defined in environment variables");
    }

    await authClient.signIn.email(
      {
        email: process.env.NEXT_PUBLIC_DEMO_EMAIL!,
        password: process.env.NEXT_PUBLIC_DEMO_PASSWORD!,
        callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
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
    <>
      <AuthForm handleSubmit={handleSubmit} mode="register" onDemoLogin={handleDemoLogin} />
    </>
  );
};

export default RegistrationForm;
