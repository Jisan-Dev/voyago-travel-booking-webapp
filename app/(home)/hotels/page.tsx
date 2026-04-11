import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import PageContent from "./_components/page-content";

export async function generateMetadata() {
  return {
    title: "Hotels - Voyago",
    description:
      "Discover and book hotels worldwide with Voyago. Find the best deals, read reviews, and enjoy a seamless booking experience.",
  };
}

export default async function HotelsPage({
  searchParams,
}: {
  searchParams: Promise<{ destination: string; checkin: string; checkout: string }>;
}) {
  const { destination, checkin, checkout } = await searchParams;
  console.log({ destination, checkin, checkout });
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    redirect(
      `/login?redirect=${encodeURIComponent(`/hotels?destination=${destination}&checkin=${checkin}&checkout=${checkout}`)}`,
    );
  }
  return <PageContent />;
}
