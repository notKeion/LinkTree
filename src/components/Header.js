import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "@/components/buttons/LogoutButton";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Image from 'next/image';
import HamburgerMenu from "@/components/HamburgerMenu"; // Import the HamburgerMenu component

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center gap-3">
        {/* Logo */}
        <Link href="/" className="flex items-center text-indigo-400 hover:text-indigo-300 transition-colors">
          <Image
            src={'/assets/logo.webp'}
            alt="logo"
            height={40}
            width={40}
          />
          <span className="font-extrabold text-2xl ml-2 tracking-tight">LinkTri</span>
        </Link>

        {/* Desktop Navigation Links - Centered */}
        {/* <nav className="hidden sm:flex justify-center gap-8 text-slate-300 text-sm flex-grow font-medium">
          <Link href="/about" className="relative group">
            <span className="group-hover:text-indigo-300 transition-colors">About</span>
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 group-hover:w-full bg-indigo-400 transition-all duration-200" />
          </Link>
          <Link href="/pricing" className="relative group">
            <span className="group-hover:text-indigo-300 transition-colors">Pricing</span>
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 group-hover:w-full bg-indigo-400 transition-all duration-200" />
          </Link>
          <Link href="/contact" className="relative group">
            <span className="group-hover:text-indigo-300 transition-colors">Contact</span>
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 group-hover:w-full bg-indigo-400 transition-all duration-200" />
          </Link>
        </nav> */}

        {/* Session/Login Buttons for Desktop */}
        <div className="hidden sm:flex items-center gap-4 text-sm text-slate-200">
          {!!session ? (
            <>
              <Link
                className="flex items-center gap-2 border border-indigo-500/60 p-2 px-4 rounded-full text-sm font-semibold text-slate-50 bg-indigo-600 hover:bg-indigo-500 hover:border-indigo-400 shadow-md shadow-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/50 transition-colors transition-transform duration-150 ease-out hover:-translate-y-0.5"
                href="/account"
              >
                Account
              </Link>
              <LogoutButton />
            </>
          ) : (
            <Link
              className="flex items-center gap-2 border border-indigo-500/60 p-2 px-4 rounded-full text-sm font-semibold text-slate-50 bg-indigo-600 hover:bg-indigo-500 hover:border-indigo-400 shadow-md shadow-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/50 transition-colors transition-transform duration-150 ease-out hover:-translate-y-0.5"
              href="/login"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Hamburger Menu for Mobile */}
        <HamburgerMenu session={session} />

        {/* Mobile Navigation Links (Hidden when Hamburger Menu is used) */}
        {/* <nav className="w-full sm:hidden flex justify-center gap-10 font-bold text-slate-500 text-sm mt-4">
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/pricing" className="hover:underline">Pricing</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </nav> */}
      </div>
    </header>
  );
}
