import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown, MapPin, Phone, Mail, Facebook, Youtube, Twitter, Linkedin } from "lucide-react";
import logo from "@/assets/logo.png";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const aboutItems = [
  { name: "About Us", href: "/about" },
  { name: "Leadership", href: "/leadership" },
];

const academicItems = [
  { name: "Events", href: "/events" },
  { name: "Results", href: "/results" },
  { name: "Gallery", href: "/gallery" },
];

const navItems = [
  { name: "Home", href: "/" },
  { name: "Notices", href: "/notices" },
  { name: "Child Care", href: "/childcare" },
  { name: "Contact", href: "/contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full bg-background">
      {/* Top Bar */}
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex h-10 items-center justify-between text-xs">
            <div className="flex items-center gap-4 text-muted-foreground">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
            <div className="hidden lg:flex items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" />
                <span>Maitighar, Kathmandu Nepal</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5" />
                <span>01-5344636, 01-5321365</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5" />
                <a href="mailto:ktm@sxc.edu.np" className="hover:text-primary transition-colors">ktm@sxc.edu.np</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <img src={logo} alt="Champion English School Logo" className="h-12 w-12 object-contain group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">Champion English School</span>
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden md:block">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/" className={`px-4 py-2 text-sm font-medium transition-colors hover:text-primary relative ${location.pathname === "/" ? "text-primary" : "text-foreground"}`}>
                    Home
                    {location.pathname === "/" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>}
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">About Us</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-3 p-4 bg-background">
                      {aboutItems.map((item) => (
                        <li key={item.name}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={item.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">{item.name}</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">Academic</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-3 p-4 bg-background">
                      {academicItems.map((item) => (
                        <li key={item.name}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={item.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">{item.name}</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {navItems.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <Link to={item.href} className={`px-4 py-2 text-sm font-medium transition-colors hover:text-primary relative ${location.pathname === item.href ? "text-primary" : "text-foreground"}`}>
                      {item.name}
                      {location.pathname === item.href && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <div className="hidden md:flex items-center gap-2">
              <Button asChild variant="outline" size="sm">
                <Link to="/admin">
                  <span className="mr-2">🔒</span>
                  Login
                </Link>
              </Button>
            </div>

            {/* Mobile Navigation */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  <Link to="/" onClick={() => setIsOpen(false)} className="text-base font-medium hover:text-primary transition-colors">
                    Home
                  </Link>
                  <div className="space-y-2">
                    <div className="text-base font-medium text-muted-foreground">About Us</div>
                    {aboutItems.map((item) => (
                      <Link key={item.name} to={item.href} onClick={() => setIsOpen(false)} className="block pl-4 text-sm hover:text-primary transition-colors">
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <div className="text-base font-medium text-muted-foreground">Academic</div>
                    {academicItems.map((item) => (
                      <Link key={item.name} to={item.href} onClick={() => setIsOpen(false)} className="block pl-4 text-sm hover:text-primary transition-colors">
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  {navItems.map((item) => (
                    <Link key={item.name} to={item.href} onClick={() => setIsOpen(false)} className="text-base font-medium hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                  ))}
                  <Button asChild variant="outline" className="self-start mt-4">
                    <Link to="/admin" onClick={() => setIsOpen(false)}>
                      <span className="mr-2">🔒</span>
                      Login
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}