"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function Logout() {
  const router = useRouter();
  return (
    <Button
      variant={"ghost"}
      className="text-primary hover:text-primary"
      onClick={async () => {
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.refresh();
              setTimeout(() => {
                router.replace("/login");
              }, 500);
            },
          },
        });
      }}
    >
      Sign Out
    </Button>
  );
}
