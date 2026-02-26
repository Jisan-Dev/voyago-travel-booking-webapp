import Navbar from "@/components/navbar";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar isLandingPage={true} showSideMenu={true} />
      <main>{children}</main>
    </>
  );
}
