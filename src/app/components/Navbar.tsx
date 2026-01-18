"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { Home, User, FolderKanban, Mail } from "lucide-react";

const links = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: User },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Contact", href: "/contact", icon: Mail },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-black/10 border-b border-gray-200/20 dark:border-gray-800/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex h-16 items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 w-1/4">
            <Link href="/" aria-label="Go to Home">
              <Image
                src="/favicon.png"
                alt="SM Logo"
                width={40}
                height={40}
                className="rounded-full cursor-pointer hover:scale-110 transition-transform"
              />
            </Link>
          </div>

          {/* Center Menu */}
          <div className="hidden md:flex flex-1 justify-center items-center gap-10">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 transition-all group ${
                    isActive
                      ? "text-indigo-500 font-semibold"
                      : "text-gray-700 dark:text-gray-300 hover:text-indigo-500"
                  }`}
                >
                  <Icon
                    size={18}
                    className="group-hover:scale-110 transition"
                  />
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Theme Toggle */}
          <div className="hidden md:flex w-1/4 justify-end">
            <ThemeToggle />
          </div>

          {/* Mobile Button */}
          <div className="md:hidden ml-auto">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white/95 dark:bg-black/10 backdrop-blur-xl px-6 py-6 space-y-6">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 text-lg text-gray-700 dark:text-gray-200 hover:text-indigo-500"
              >
                <Icon size={20} />
                {link.name}
              </Link>
            );
          })}
          <ThemeToggle />
        </div>
      )}
    </nav>
  );
}
