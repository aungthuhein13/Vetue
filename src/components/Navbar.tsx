// components/Navbar.tsx
// This component defines the main navigation bar for the application
// It includes links to the home page, shop, about, and contact pages   

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo / Brand */}
        <Link href="/" className="text-xl font-bold tracking-tight">
          Vêtue
        </Link>

        {/* Menu */}
        <div className="flex gap-6 text-sm font-medium text-gray-700">
          <Link href="/shop" className="hover:text-black">
            Shop
          </Link>
          <Link href="/about" className="hover:text-black">
            About
          </Link>
          <Link href="/contact" className="hover:text-black">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
