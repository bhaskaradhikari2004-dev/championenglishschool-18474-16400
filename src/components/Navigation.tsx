import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Facebook, LockKeyhole, Mail, MapPin, Menu, Phone } from "lucide-react";
import logo from "@/assets/logo.png";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";

const aboutItems = [{ name: "About Us", href: "/about" }, { name: "Leadership", href: "/leadership" }];
const academicItems = [{ name: "Events", href: "/events" }, { name: "Notices", href: "/notices" }, { name: "Results", href: "/results" }, { name: "Gallery", href: "/gallery" }];
const directItems = [{ name: "Child Care", href: "/childcare" }, { name: "Contact", href: "/contact" }];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const linkClass = (path: string) => `relative px-3 py-2 text-sm font-semibold transition-colors hover:text-primary ${location.pathname === path ? "text-primary" : "text-foreground/80"}`;

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="hidden border-b bg-primary text-primary-foreground md:block">
        <div className="container flex h-9 items-center justify-between px-4 text-xs">
          <a href="https://www.facebook.com/76champ" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent"><Facebook className="h-3.5 w-3.5" /> Follow our school</a>
          <div className="flex items-center gap-5 text-primary-foreground/80">
            <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Bargachhi, Dharan, Nepal</span>
            <a href="tel:025530302" className="flex items-center gap-1.5 hover:text-accent"><Phone className="h-3.5 w-3.5" /> 025-530302, 9814350277</a>
            <a href="mailto:championschool38@gmail.com" className="flex items-center gap-1.5 hover:text-accent"><Mail className="h-3.5 w-3.5" /> championschool38@gmail.com</a>
          </div>
        </div>
      </div>

      <nav className="border-b bg-background/95 backdrop-blur-md" aria-label="Main navigation">
        <div className="container flex h-[74px] items-center justify-between px-4">
          <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="Champion English School home">
            <img src={logo} alt="Champion English School logo" className="h-12 w-12 shrink-0 object-contain" />
            <div className="min-w-0 leading-tight">
              <span className="block truncate font-heading text-base font-bold text-primary sm:text-lg">Champion English School</span>
              <span className="hidden text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:block">Dharan, Nepal</span>
            </div>
          </Link>

          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem><Link to="/" className={linkClass("/")}>Home</Link></NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-sm font-semibold text-foreground/80">About</NavigationMenuTrigger>
                <NavigationMenuContent><ul className="grid w-52 gap-1 bg-popover p-2">{aboutItems.map(item => <li key={item.name}><NavigationMenuLink asChild><Link to={item.href} className="block rounded-sm px-3 py-2.5 text-sm hover:bg-muted">{item.name}</Link></NavigationMenuLink></li>)}</ul></NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-sm font-semibold text-foreground/80">Academic</NavigationMenuTrigger>
                <NavigationMenuContent><ul className="grid w-52 gap-1 bg-popover p-2">{academicItems.map(item => <li key={item.name}><NavigationMenuLink asChild><Link to={item.href} className="block rounded-sm px-3 py-2.5 text-sm hover:bg-muted">{item.name}</Link></NavigationMenuLink></li>)}</ul></NavigationMenuContent>
              </NavigationMenuItem>
              {directItems.map(item => <NavigationMenuItem key={item.name}><Link to={item.href} className={linkClass(item.href)}>{item.name}</Link></NavigationMenuItem>)}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden items-center gap-3 lg:flex">
            <Button asChild size="sm" variant="outline"><Link to="/admin"><LockKeyhole className="mr-2 h-3.5 w-3.5" />Admin</Link></Button>
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden"><Button variant="ghost" size="icon" aria-label="Open navigation"><Menu className="h-6 w-6" /></Button></SheetTrigger>
            <SheetContent side="right" className="w-[88vw] max-w-sm">
              <div className="mt-8 flex flex-col gap-1">
                <p className="mb-5 font-heading text-xl font-bold text-primary">Champion English School</p>
                <Link to="/" onClick={() => setIsOpen(false)} className="border-b py-3 font-semibold">Home</Link>
                <p className="pt-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">About</p>
                {aboutItems.map(item => <Link key={item.name} to={item.href} onClick={() => setIsOpen(false)} className="py-2 pl-2 text-sm">{item.name}</Link>)}
                <p className="pt-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Academic</p>
                {academicItems.map(item => <Link key={item.name} to={item.href} onClick={() => setIsOpen(false)} className="py-2 pl-2 text-sm">{item.name}</Link>)}
                {directItems.map(item => <Link key={item.name} to={item.href} onClick={() => setIsOpen(false)} className="border-t py-3 font-semibold">{item.name}</Link>)}
                <Button asChild variant="outline" className="mt-5 justify-start"><Link to="/admin" onClick={() => setIsOpen(false)}><LockKeyhole className="mr-2 h-4 w-4" />Admin login</Link></Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
