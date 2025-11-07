"use client";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[var(--brandFooter)] text-white mt-20">
      <div className="container mx-auto grid md:grid-cols-4 gap-8 px-6 py-16">
        <div>
          <Image src="/footerLogo.png" alt="SOLVED" width={120} height={40} />
          <p className="mt-3 text-sm text-gray-300">
            We don’t just solve problems. We build pathways to possibility.
          </p>
        </div>

        <div>
          <h3 className="text-[var(--brandBlueLight)] font-semibold mb-3">
            Our Products
          </h3>
          <ul className="space-y-2 text-sm">
            <li>GoalForward Series</li>
            <li>RLA Toolbox</li>
          </ul>
        </div>

        <div>
          <h3 className="text-[var(--brandBlueLight)] font-semibold mb-3">
            About
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Education That Empowers</li>
          </ul>
        </div>

        <div>
          <h3 className="text-[var(--brandBlueLight)] font-semibold mb-3">
            Contact Us
          </h3>
          <ul className="space-y-2 text-sm">
            <li>17425 Bridge Hill Court, Tampa, FL 33647</li>
            <li>(813) 723 - 9628</li>
            <li>solved@solvedllc.onmicrosoft.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-sm text-gray-400">
        © S.O.L.V.E.D LLC – All rights reserved. Designed by CoreConcepts
      </div>
    </footer>
  );
}
