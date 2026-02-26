import Navbar from "@/components/navbar";
import "../globals.css";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar isLandingPage={true} showSideMenu={true} />
      <main>{children}</main>
    </>
  );
}
