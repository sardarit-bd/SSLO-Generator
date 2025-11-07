"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // lightweight icons

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="sticky top-0 z-50 bg-[var(--brandBg)] border-b border-[var(--brandLine)] backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link href="https://solved-llc.com" className="flex items-center gap-2">
            <Image
              src="/logo-2-scaled.png"
              alt="SOLVED"
              width={220}
              height={80}
              priority
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center text-lg gap-8 text-[var(--brandInk)] font-bold">
          <Link href="https://solved-llc.com" className="hover:text-[var(--brandColor)] transition">
            Home
          </Link>
          <Link href="https://solved-llc.com/solutions" className="hover:text-[var(--brandColor)] transition">
            Solutions
          </Link>
          <Link href="https://solved-llc.com/about" className="hover:text-[var(--brandColor)] transition">
            About us
          </Link>
          <Link href="https://solved-llc.com/resources" className="hover:text-[var(--brandColor)] transition">
            Resources
          </Link>
        </nav>

        {/* CTA button (desktop) */}
        <div className="hidden text-lg md:block">
          <Link
            href="https://solved-llc.com/#contact"
            className="bg-[var(--brandBlue)] text-white px-5 py-2 rounded-md shadow hover:opacity-90 transition"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-[var(--brandInk)] focus:outline-none"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--brandBg)] border-t border-[var(--brandLine)] shadow-lg">
          <nav className="flex flex-col text-[var(--brandInk)] font-medium px-6 py-4 space-y-3">
            <Link href="/" onClick={toggleMenu} className="hover:text-[var(--brandColor)]">
              Home
            </Link>
            <Link
              href="/solutions"
              onClick={toggleMenu}
              className="hover:text-[var(--brandBlue)]"
            >
              Solutions
            </Link>
            <Link
              href="/about"
              onClick={toggleMenu}
              className="hover:text-[var(--brandBlue)]"
            >
              About us
            </Link>
            <Link
              href="/resources"
              onClick={toggleMenu}
              className="hover:text-[var(--brandBlue)]"
            >
              Resources
            </Link>
            <Link
              href="/contact"
              onClick={toggleMenu}
              className="bg-[var(--brandBlue)] text-white text-center py-2 rounded-md hover:opacity-90"
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
