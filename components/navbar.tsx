"use client";

import { authClient } from "@/lib/auth-client";
import { Menu } from "lucide-react";
import * as motion from "motion/react-client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logout from "./auth/logout";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Navbar = ({ isLandingPage = true, showSideMenu = true }) => {
  const { data: session } = authClient.useSession();
  const pathname = usePathname();

  const user = session?.user;

  const initials = user?.name
    ?.split(" ")
    .filter(Boolean)
    .map((name: string) => name[0].toUpperCase())
    .join("");

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className={`w-full flex items-center justify-between py-4 ${isLandingPage ? "text-gray-100" : "text-gray-800"}`}
    >
      <Link href="/" className="flex items-center sm:gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-10 h-10"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF6A28" />
              <stop offset="60%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#FF6A28" />
            </linearGradient>
          </defs>
          <path fill="url(#logoGrad)" d="M3 10.5L21 3l-7.5 18L10.5 14 3 10.5z" />
        </svg>
        <span className="text-2xl font-semibold tracking-tight">
          <span className="bg-clip-text text-transparent bg-linear-to-r from-[#FF6A28] via-amber-500 to-[#FF6A28]">
            Voyago
          </span>
        </span>
      </Link>

      <div className="flex items-center gap-6">
        {showSideMenu && (
          <>
            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center gap-6 font-medium text-sm">
              <li>
                <Link
                  href="/"
                  className={`${pathname === "/" ? "bg-primary/20 text-primary rounded-md px-2 py-1" : ""}`}
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className={`${pathname === "/about" ? "bg-primary/20 text-primary rounded-md px-2 py-1" : ""}`}
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/hotels"
                  className={`${pathname === "/hotels" ? "bg-primary/20 text-primary rounded-md px-2 py-1" : ""}`}
                >
                  Hotels
                </Link>
              </li>

              <li>
                <Link
                  href="/bookings"
                  className={`${pathname === "/bookings" ? "bg-primary/20 text-primary rounded-md px-2 py-1" : ""}`}
                >
                  Bookings
                </Link>
              </li>

              <li>
                {user ? (
                  <div className="flex items-center gap-1">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.image || ""} alt={user?.name || "User profile"} />
                      <AvatarFallback className="bg-primary text-white text-sm! font-medium">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="mx-1"> {user?.name} </span>
                    <span> | </span>
                    <Logout />
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <Link href="/login">
                      <Button variant="link" size="lg" className="text-base">
                        SignIn
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button variant="default" size="lg" className="px-6">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </li>

              {/* <li>
                <ModeToggle />
              </li> */}
            </ul>

            {/* Mobile Menu */}
            <div className="md:hidden flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="w-6! h-6! text-primary" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md shadow-lg p-3"
                >
                  <DropdownMenuItem asChild>
                    <Link
                      href="/"
                      className={`w-full cursor-pointer ${pathname === "/" ? "bg-primary/20 text-primary rounded-md" : ""}`}
                    >
                      Home
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/about"
                      className={`w-full cursor-pointer ${pathname === "/about" ? "bg-primary/20 text-primary rounded-md" : ""}`}
                    >
                      About Us
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/bookings"
                      className={`w-full cursor-pointer ${pathname === "/bookings" ? "bg-primary/20 text-primary rounded-md" : ""}`}
                    >
                      Bookings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-800" />
                  {user ? (
                    <>
                      <div className="px-0.5 py-1.5 text-sm flex items-center gap-1">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={user?.image || ""}
                            referrerPolicy="no-referrer"
                            alt={user?.name || "User profile"}
                          />
                          <AvatarFallback className="bg-primary text-black text-xs! font-medium">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <p className="font-medium text-zinc-900 dark:text-zinc-100">{user?.name}</p>
                      </div>
                      <DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-800" />
                      <div className="p-1 w-full [&>button]:w-full [&>button]:justify-start">
                        <Logout />
                      </div>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/login" className="w-full cursor-pointer">
                          SignIn
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/register" className="w-full cursor-pointer">
                          Sign Up
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
