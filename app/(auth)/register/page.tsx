import RegistrationForm from "@/components/auth/registration-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const RegistrationPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session?.user) return redirect("/");
  return (
    <section className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 max-sm:pt-16">
      <div className="max-w-112.5 w-full mx-auto">
        <RegistrationForm />
        {/* <SocialLogins /> */}
      </div>
    </section>
  );
};

export default RegistrationPage;
