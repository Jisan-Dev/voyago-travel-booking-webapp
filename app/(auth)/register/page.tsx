import RegistrationForm from "@/components/auth/registration-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const RegistrationPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session?.user) return redirect("/");
  return (
    <section className="min-h-screen grid place-items-center">
      <div className="max-w-112.5 w-full mx-auto p-6 border border-primary/20 rounded-lg shadow-md shadow-primary/30">
        <RegistrationForm />
        {/* <SocialLogins /> */}
      </div>
    </section>
  );
};

export default RegistrationPage;
