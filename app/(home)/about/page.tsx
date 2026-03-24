import { Metadata } from "next";
import AboutContent from "./about-content";

export const metadata: Metadata = {
  title: "About Us | Voyago",
  description:
    "Discover Voyago - your trusted platform for seamless hotel booking. Learn about our mission, technology, and the team behind your perfect stay.",
};

export default function AboutPage() {
  return <AboutContent />;
}