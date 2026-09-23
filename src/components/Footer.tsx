import { Link } from "react-router-dom";
import { Facebook, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="border-t bg-footer text-footer-foreground">
      <div className="container px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3"><img src={logo} alt="Champion English School logo" className="h-12 w-12 object-contain" /><div><p className="font-heading text-lg font-bold">Champion English School</p><p className="text-xs text-footer-foreground/60">Dharan, Nepal</p></div></div>
            <p className="mt-4 max-w-xs text-sm leading-6 text-footer-foreground/65">Unleashing the Champion within everyone through education, character and community.</p>
            <a href="https://www.facebook.com/76champ" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm hover:text-accent"><Facebook className="h-4 w-4" /> Facebook</a>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">School</h3>
            <div className="mt-4 flex flex-col gap-2 text-sm text-footer-foreground/70"><Link to="/about">About Us</Link><Link to="/leadership">Leadership</Link><Link to="/childcare">Child Care</Link><Link to="/contact">Contact</Link></div>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Academic</h3>
            <div className="mt-4 flex flex-col gap-2 text-sm text-footer-foreground/70"><Link to="/events">Events</Link><Link to="/notices">Notices</Link><Link to="/results">Results</Link><Link to="/gallery">Gallery</Link></div>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Contact</h3>
            <div className="mt-4 space-y-3 text-sm text-footer-foreground/70">
              <p className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> Bargachhi, Dharan, Nepal</p>
              <a href="tel:025530302" className="flex gap-2 hover:text-footer-foreground"><Phone className="h-4 w-4 shrink-0 text-accent" /> 025-530302, 9814350277</a>
              <a href="mailto:championschool38@gmail.com" className="flex gap-2 break-all hover:text-footer-foreground"><Mail className="h-4 w-4 shrink-0 text-accent" /> championschool38@gmail.com</a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-footer-foreground/15 pt-5 text-xs text-footer-foreground/50">© {new Date().getFullYear()} Champion English School. All rights reserved.</div>
      </div>
    </footer>
  );
}
