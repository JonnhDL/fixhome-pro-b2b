import Link from "next/link"
import { Logo } from "./logo"
import { getDictionary } from "@/lib/i18n/dictionaries";

export async function Footer() {
  const dict = await getDictionary('pt');

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground max-w-xs">
              {dict.footer.description}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase">{dict.footer.links}</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                    {dict.footer.home}
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
                    {dict.footer.dashboard}
                  </Link>
                </li>
                <li>
                  <Link href="#featured-projects" className="text-sm text-muted-foreground hover:text-foreground">
                    {dict.header.projects}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase">{dict.footer.legal}</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    {dict.footer.privacy_policy}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    {dict.footer.terms_of_service}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} FixHome Pro. {dict.footer.rights_reserved}</p>
        </div>
      </div>
    </footer>
  )
}
