import { isAuthenticated } from "@/lib/actions/auth.action";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

async function RootLayout({ children }: { children: ReactNode }) {
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) redirect("/sign-in");
  return (
    <div className="root-layout">
      <nav className="py-4 px-6 md:px-12 flex justify-between items-center border-b border-light-600">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" width={38} height={32} />
          <h2 className="text-xl font-bold text-primary-100">PrepWise</h2>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm font-medium hover:text-primary-200 transition-colors">Dashboard</Link>
          <Link href="/interview" className="text-sm font-medium hover:text-primary-200 transition-colors">Interviews</Link>
          <Button asChild variant="outline" size="sm">
            <Link href="/api/auth/signout">Sign Out</Link>
          </Button>
        </div>
      </nav>
      <main className="px-6 py-8 md:px-12">
        {children}
      </main>
    </div>
  );
}

export default RootLayout;
