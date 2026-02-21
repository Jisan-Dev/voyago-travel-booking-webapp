"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import SocialLogins from "./auth/social-logins";

interface LoginFormProps extends React.ComponentProps<"div"> {
  handleSubmit?: (event: React.SubmitEvent<HTMLFormElement>) => Promise<void>;
  mode: "login" | "register";
}

export function AuthForm({ className, handleSubmit, mode = "login", ...props }: LoginFormProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="outline-primary/20">
        <CardHeader>
          {mode === "login" ? (
            <>
              <CardTitle className="font-bold text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email & password below to login to your account
              </CardDescription>
            </>
          ) : (
            <>
              <CardTitle className="font-bold text-2xl">Sign Up</CardTitle>
              <CardDescription>Enter your information below to create your account</CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              {mode === "register" && (
                <>
                  <Field>
                    <FieldLabel htmlFor="fname">First Name</FieldLabel>
                    <Input id="fname" name="fname" type="text" placeholder="John" required />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="lname">Last Name</FieldLabel>
                    <Input id="lname" name="lname" type="text" placeholder="Doe" required />
                  </Field>
                </>
              )}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" name="email" type="email" placeholder="m@example.com" required />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" name="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit">{mode === "login" ? "Login" : "Register"}</Button>
                {/* <Button variant="outline" type="button">
                  Login with Google
                </Button> */}
                <SocialLogins mode={mode} />
                <FieldDescription className="text-center">
                  {mode === "login" ? (
                    <>
                      Don&apos;t have an account?{" "}
                      <Link
                        href="/register"
                        className="underline underline-offset-4 hover:underline"
                      >
                        Register
                      </Link>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <Link href="/login" className="underline underline-offset-4 hover:underline">
                        Sign in
                      </Link>
                    </>
                  )}
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
