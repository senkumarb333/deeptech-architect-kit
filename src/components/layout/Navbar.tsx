import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

const navItems = [
  { label: "Home", path: "/" },
  {
    label: "Products",
    path: "/products",
    children: [
      { label: "SILIR1000 – Smart Mushroom", path: "/products/silir1000" },
      { label: "SILIR2000 – Smart Poultry", path: "/products/silir2000" },
      { label: "SILIR3000 – PostHarvest", path: "/products/silir3000" },
      { label: "SILIR4000 – Smart Irrigation", path: "/products/silir4000" },
      { label: "SILIR5000 – Polyhouse", path: "/products/silir5000" },
      { label: "KitHub – IoT Cloud", path: "/products/kithub" },
    ],
  },
  {
    label: "Solutions",
    path: "/solutions",
    children: [
      { label: "Mushroom Farm Automation", path: "/solutions/mushroom-automation" },
      { label: "Poultry Farm Automation", path: "/solutions/poultry-automation" },
      { label: "PostHarvest Automation", path: "/solutions/postharvest-automation" },
      { label: "Smart Irrigation", path: "/solutions/smart-irrigation" },
      { label: "Polyhouse Automation", path: "/solutions/polyhouse-automation" },
      { label: "Technology Consulting", path: "/solutions/technology-consulting" },
    ],
  },
  { label: "Technology", path: "/technology" },
  { label: "Industries", path: "/industries" },
  { label: "Resources", path: "/resources" },
  { label: "Company", path: "/company" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between lg:h-20">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-hero">
            <span className="text-lg font-bold text-primary-foreground">iY</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold font-heading leading-tight text-foreground">iYarKai</span>
            <span className="text-[10px] font-medium leading-tight text-muted-foreground">Tech Lab</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to={item.path}
                className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground ${
                  location.pathname === item.path || location.pathname.startsWith(item.path + "/")
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
                {item.children && <ChevronDown className="h-3 w-3" />}
              </Link>
              {item.children && openDropdown === item.label && (
                <div className="absolute left-0 top-full z-50 min-w-[240px] rounded-lg border border-border bg-card p-2 shadow-elevated">
                  {item.children.map((child) => (
                    <Link
                      key={child.path}
                      to={child.path}
                      className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="hero" size="default" asChild>
            <Link to="/request-demo">Request Demo</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="rounded-md p-2 text-foreground lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="border-t border-border bg-card p-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  {item.label}
                </Link>
                {item.children?.map((child) => (
                  <Link
                    key={child.path}
                    to={child.path}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-md px-6 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
          <div className="mt-4">
            <Button variant="hero" size="lg" className="w-full" asChild>
              <Link to="/request-demo" onClick={() => setMobileOpen(false)}>Request Demo</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
