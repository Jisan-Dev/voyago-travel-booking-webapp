import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import SearchProvider from "@/providers/SearchProvider";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "../app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Voyago | Hotel Booking App",
  description:
    "Voyago is a modern, full-stack web application designed for browsing, booking, and managing hotel reservations. Find your stay. Book with confidence.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SearchProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar isLandingPage={true} showSideMenu={true} />
            {children}
            <Toaster theme="system" />
          </ThemeProvider>
        </SearchProvider>
      </body>
    </html>
  );
}
