"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import SocialLogins from "./auth/social-logins";
import { Spinner } from "./ui/spinner";

interface LoginFormProps extends React.ComponentProps<"div"> {
  handleSubmit?: (event: React.SubmitEvent<HTMLFormElement>) => Promise<void>;
  onDemoLogin?: () => Promise<void>;
  mode: "login" | "register";
}

export function AuthForm({
  className,
  handleSubmit,
  onDemoLogin,
  mode = "login",
  ...props
}: LoginFormProps) {
  const { isPending } = authClient.useSession();
  console.log(isPending);
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
                <Button type="submit" disabled={isPending}>
                  {" "}
                  {isPending && <Spinner />}{" "}
                  {mode === "login"
                    ? !isPending
                      ? "Login"
                      : "Logging in..."
                    : !isPending
                      ? "Register"
                      : "Registering..."}
                </Button>
                {/* <Button variant="outline" type="button">
                  Login with Google
                </Button> */}
                <SocialLogins mode={mode} />
                {onDemoLogin && (
                  <>
                    <div className="relative my-2">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">or</span>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="secondary"
                      className="w-full"
                      onClick={onDemoLogin}
                      disabled={isPending}
                    >
                      🚀 Try Demo Account
                    </Button>
                  </>
                )}
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
