"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";

const SocialLogins = ({ mode = "login" }: { mode: "login" | "register" }) => {
  const handleSocialSignin = async (provider: string) => {
    const res = await authClient.signIn.social({ provider });
    console.log("Response after social login: ", res);
  };

  return (
    <>
      <div className="text-center text-xs text-gray-500">
        or {mode === "login" ? "Login" : "Sign up"} with
      </div>
      {/* <div className="flex gap-4">
        <button className=" w-full mt-4 py-2 border-gray-600/30 border rounded-md flex items-center gap-2 justify-center">
          <Image src="/fb.png" alt="facebook" width={40} height={40} />
          <span>Facebook</span>
        </button>
        <button
          onClick={() => handleSocialSignin("google")}
          className=" w-full mt-4 py-2 border-gray-600/30 border rounded-md flex items-center gap-2 justify-center"
        >
          <Image src="/google.png" alt="google" width={40} height={40} />
          <span>Google</span>
        </button>
      </div> */}
      <Button onClick={() => handleSocialSignin("apple")} variant="outline" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
            fill="currentColor"
          />
        </svg>
        Continue with Google
      </Button>
    </>
  );
};

export default SocialLogins;
