import { Link } from "react-router-dom";
import { MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-100 border-t border-slate-800">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="space-y-2 col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="Champion English School Logo" className="h-7 w-7 object-contain" />
              <span className="font-bold text-sm">Champion English School</span>
            </div>
            <p className="text-xs text-slate-400 leading-snug">
              Unleashing the Champion within everyone.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-xs uppercase tracking-wider">Quick Links</h3>
            <div className="flex flex-col space-y-1">
              <Link to="/about" className="text-xs text-slate-400 hover:text-white transition-colors">
                About Us
              </Link>
              <Link to="/events" className="text-xs text-slate-400 hover:text-white transition-colors">
                Events
              </Link>
              <Link to="/notices" className="text-xs text-slate-400 hover:text-white transition-colors">
                Notices
              </Link>
              <Link to="/results" className="text-xs text-slate-400 hover:text-white transition-colors">
                Results
              </Link>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-xs uppercase tracking-wider">More</h3>
            <div className="flex flex-col space-y-1">
              <Link to="/gallery" className="text-xs text-slate-400 hover:text-white transition-colors">
                Gallery
              </Link>
              <Link to="/leadership" className="text-xs text-slate-400 hover:text-white transition-colors">
                Leadership
              </Link>
              <Link to="/childcare" className="text-xs text-slate-400 hover:text-white transition-colors">
                Child Care
              </Link>
              <Link to="/contact" className="text-xs text-slate-400 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-xs uppercase tracking-wider">Contact</h3>
            <div className="space-y-1.5">
              <div className="flex items-start space-x-1.5">
                <MapPin className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-xs text-slate-400 leading-tight">
                  Sayapatri Margha, Dharan-15
                </p>
              </div>
              <div className="flex items-center space-x-1.5">
                <Phone className="h-3 w-3 text-primary flex-shrink-0" />
                <p className="text-xs text-slate-400">+977-9814350277</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-4 pt-4 text-center">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Champion English School. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}