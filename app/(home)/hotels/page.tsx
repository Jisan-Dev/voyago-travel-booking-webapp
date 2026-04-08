import PageContent from "./_components/page-content";

export async function generateMetadata() {
  return {
    title: "Hotels - Voyago",
    description:
      "Discover and book hotels worldwide with Voyago. Find the best deals, read reviews, and enjoy a seamless booking experience.",
  };
}

export default function HotelsPage() {
  return <PageContent />;
}
