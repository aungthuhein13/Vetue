// components/Navbar.tsx
import Link from 'next/link';
import CartLink from './CartLink';

export default function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Vêtue
        </Link>
        <div className="flex items-center gap-6 text-sm text-gray-700">
          <Link href="/shop" className="hover:text-black">Shop</Link>
          <Link href="/about" className="hover:text-black">About</Link>
          <Link href="/contact" className="hover:text-black">Contact</Link>
          <CartLink />
        </div>
      </nav>
    </header>
  );
}
