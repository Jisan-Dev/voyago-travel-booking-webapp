import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const ProfileInfo = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  const initials = user?.name
    ?.split(" ")
    .filter(Boolean)
    .map((name: string) => name[0].toUpperCase())
    .join("");

  return (
    <div className="flex flex-col items-center py-10 text-center">
      <Avatar className="h-28 w-28 lg:mb-6 mb-4 ring-2 ring-primary/20 ring-offset-2">
        <AvatarImage
          src={user?.image || ""}
          referrerPolicy="no-referrer"
          alt={user?.name || "User profile"}
        />
        <AvatarFallback className="bg-orange-600 text-white text-4xl">{initials}</AvatarFallback>
      </Avatar>

      <div className="space-y-1">
        <h3 className="text-3xl font-semibold tracking-tight">{user?.name}</h3>
        <p className="text-muted-foreground lg:text-lg">{user?.email}</p>
      </div>

      <div className="w-full max-w-md border-b py-6 lg:py-6"></div>
    </div>
  );
};

export default ProfileInfo;
