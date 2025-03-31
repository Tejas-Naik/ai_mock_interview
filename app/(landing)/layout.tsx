import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="landing-layout min-h-screen flex flex-col">
      <header className="py-4 px-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="PrepWise Logo" width={38} height={32} />
          <h2 className="text-xl font-bold text-primary-100">PrepWise</h2>
        </Link>
        <div className="flex items-center gap-4">
          <Link 
            href="/sign-in" 
            className="text-sm font-medium hover:text-primary-200 transition-colors"
          >
            Log In
          </Link>
          <Link 
            href="/sign-up" 
            className="px-4 py-2 bg-primary-100 text-white rounded-md text-sm font-medium hover:bg-primary-200 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="py-6 px-6 md:px-12 border-t border-light-600">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Image src="/logo.svg" alt="PrepWise Logo" width={24} height={20} />
              <p className="text-sm text-light-400">© {new Date().getFullYear()} PrepWise. All rights reserved.</p>
            </div>
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-light-400 hover:text-primary-100">Terms</Link>
              <Link href="#" className="text-sm text-light-400 hover:text-primary-100">Privacy</Link>
              <Link href="#" className="text-sm text-light-400 hover:text-primary-100">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingLayout;
