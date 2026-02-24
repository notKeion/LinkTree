import Link from 'next/link';
import Image from 'next/image';
import { FaTwitter, FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/90 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-3 text-sm text-slate-400">
        {/* Logo and Name */}
        <div className="flex items-center text-indigo-400 hover:text-indigo-300 mb-1 md:mb-0 transition-colors">
          <Image
            src={'/assets/logo.webp'}
            alt="logo"
            height={40}
            width={40}
          />
          <span className="font-extrabold text-2xl ml-2 tracking-tight text-slate-50">LinkTri</span>
        </div>

        {/* Copyright for mobile */}
        <div className="w-full text-center order-3 md:order-2 md:w-auto mt-1 md:mt-0 md:flex-1 md:text-center">
          © {new Date().getFullYear()} LinkTri Clone. All rights reserved.
        </div>

        {/* Social Media Icons */}
        <div className="flex items-center gap-4 order-2 md:order-3 mb-1 md:mb-0">
          {/* <Link href="https://twitter.com/jeffjiang9" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-300 transition-colors">
            <FaTwitter size="1.5em" />
          </Link>
          <Link href="https://www.facebook.com/jeff.jiang.9" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-300 transition-colors">
            <FaFacebookF size="1.5em" />
          </Link> */}
          <Link href="https://github.com/notKeion" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-200 transition-colors">
            <FaGithub size="1.5em" />
          </Link>
          <Link href="https://www.linkedin.com/in/keionv" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-300 transition-colors">
            <FaLinkedinIn size="1.5em" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
