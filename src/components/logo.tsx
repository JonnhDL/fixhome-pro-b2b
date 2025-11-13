import Link from 'next/link';
import { Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className, inSidebar = false }: { className?: string; inSidebar?: boolean }) {
  return (
    <Link href="/" className={cn(
      "flex items-center gap-2 text-xl font-semibold font-headline",
      inSidebar ? 'text-primary-foreground' : 'text-primary',
      className
    )}>
      <Building2 className={cn("h-6 w-6", inSidebar ? 'text-primary' : 'text-accent')} />
      <span>FixHome Pro</span>
    </Link>
  );
}
