import Navbar from "@/components/navbar";

export const metadata = {
  title: "Voyago | Authentications",
  description: "Voyago is a hotel booking app.Find your stay. Book with confidence.",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar isLandingPage={false} showSideMenu={false} />
      <main>{children}</main>
    </>
  );
}
