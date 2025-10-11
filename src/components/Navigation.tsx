import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import logo from "@/assets/logo.png";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "Notices", href: "/notices" },
  { name: "Gallery", href: "/gallery" },
  { name: "Results", href: "/results" },
  { name: "Leadership", href: "/leadership" },
  { name: "Child Care", href: "/childcare" },
  { name: "Contact", href: "/contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-gradient-to-r from-background via-blue-50/30 to-orange-50/30 dark:from-background dark:via-blue-950/20 dark:to-orange-950/20 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50 w-full border-b-2 border-gradient-to-r from-blue-500/20 via-orange-500/20 to-blue-500/20 shadow-lg">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl animate-pulse animation-delay-400"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
              <img src={logo} alt="Champion English School Logo" className="h-10 w-10 sm:h-12 sm:w-12 object-contain relative z-10 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="font-bold text-base sm:text-xl bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-orange-700 transition-all duration-300 hidden xs:inline">Champion English School</span>
            <span className="font-bold text-sm bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-orange-700 transition-all duration-300 inline xs:hidden">CES</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover-scale relative group ${
                  location.pathname === item.href
                    ? "text-primary bg-gradient-to-r from-blue-500/10 to-orange-500/10 shadow-md"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                {location.pathname !== item.href && (
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-orange-500/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                )}
              </Link>
            ))}
            <Button asChild variant="outline" size="sm" className="ml-4 bg-gradient-to-r from-blue-500 to-orange-500 text-white border-0 hover:shadow-lg hover-scale">
              <Link to="/admin">Admin</Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="active:scale-95 transition-transform">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-2 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-3 rounded-lg text-base font-medium transition-all active:scale-95 ${
                      location.pathname === item.href
                        ? "text-primary bg-gradient-to-r from-blue-500/10 to-orange-500/10 shadow-md"
                        : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button asChild variant="outline" size="default" className="self-start mt-4 bg-gradient-to-r from-blue-500 to-orange-500 text-white border-0 active:scale-95">
                  <Link to="/admin" onClick={() => setIsOpen(false)}>
                    Admin Panel
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}