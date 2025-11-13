import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { getDictionary } from '@/lib/i18n/dictionaries';

export async function Header() {
  const dict = await getDictionary('pt');
  
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-card/80 backdrop-blur-sm sticky top-0 z-50 border-b">
      <div className="container mx-auto flex items-center justify-between">
        <Logo />
        <nav className="hidden lg:flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#how-it-works"
          >
            {dict.header.how_it_works}
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#featured-projects"
          >
            {dict.header.projects}
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/dashboard"
          >
            Dashboard
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/auth/login">{dict.header.login}</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/register">{dict.header.register}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
