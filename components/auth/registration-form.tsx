"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { SubmitEvent } from "react";
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
      },
    });
    console.log("Response: ", res);
  }

  return (
    <>
      <AuthForm handleSubmit={handleSubmit} mode="register" />
    </>
  );
};

export default RegistrationForm;
