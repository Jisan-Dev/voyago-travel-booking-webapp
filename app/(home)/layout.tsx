import Navbar from "@/components/navbar";
import "../globals.css";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />

      <div>{children}</div>
    </>
  );
}
