"use client";

import { authClient } from "@/lib/auth-client";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function Logout() {
  const router = useRouter();
  return (
    <Button
      variant={"ghost"}
      className="text-primary hover:text-primary max-sm:px-0"
      onClick={async () => {
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.refresh();
              setTimeout(() => {
                router.replace("/login");
              }, 250);
            },
          },
        });
      }}
    >
      <LogOutIcon />
      Sign Out
    </Button>
  );
}
