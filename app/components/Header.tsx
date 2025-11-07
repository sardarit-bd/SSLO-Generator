"use client";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--brandBg)] border-b border-[var(--brandLine)]">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <Image src="/logo-2-scaled.png" alt="SOLVED" width={120} height={40} priority />
        </div>
        <nav className="flex items-center gap-6 text-[var(--brandInk)] font-medium">
          <Link href="/">Home</Link>
          <Link href="/solutions">Solutions</Link>
          <Link href="/about">About us</Link>
          <Link href="/resources">Resources</Link>
        </nav>
        <Link
          href="/contact"
          className="btn btn-primary text-sm px-5 py-2 rounded-md shadow-md"
        >
          Get Started
        </Link>
      </div>
    </header>
  );
}
