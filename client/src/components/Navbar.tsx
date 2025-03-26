
import { useAuth } from "@/context/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ProfileButton } from "@/components/ui/ProfileButton";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { 
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { 
  LayoutDashboard, 
  Receipt, 
  PieChart, 
  Target, 
  GraduationCap,
  Menu,
  X
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function Navbar() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Transactions", path: "/transactions", icon: Receipt },
    { name: "Analytics", path: "/analytics", icon: PieChart },
    { name: "Goals", path: "/goals", icon: Target },
    { name: "Learn More", path: "/learn-more", icon: GraduationCap },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="fixed top-0 inset-x-0 h-16 z-50 glass glass-dark border-b backdrop-blur-xl flex items-center">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-primary/30 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <span className="font-bold text-xs text-white">IF</span>
              </div>
            </div>
          </div>
          <Link to="/" className="font-bold text-xl tracking-tight hover:text-primary transition-colors">
            InsightFinance
          </Link>
        </div>
        
        <NavigationMenu className="hidden md:flex mx-auto">
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.path}>
                <Link to={item.path}>
                  <NavigationMenuLink 
                    className={cn(
                      navigationMenuTriggerStyle(),
                      isActive(item.path) ? "bg-primary/10 text-primary" : "",
                      "gap-2"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isAuthenticated ? (
            <ProfileButton />
          ) : (
            <AuthModal>
              <Button variant="default" size="sm" className="hidden md:flex">Sign In</Button>
            </AuthModal>
          )}
          
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 sm:w-80 border-l glass glass-dark">
              <div className="flex flex-col h-full">
                <div className="py-6">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="relative w-8 h-8">
                      <div className="absolute inset-0 bg-primary/30 rounded-full animate-pulse"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <span className="font-bold text-xs text-white">IF</span>
                        </div>
                      </div>
                    </div>
                    <span className="font-bold text-xl tracking-tight">InsightFinance</span>
                  </div>
                  <nav className="flex flex-col space-y-1">
                    {navItems.map((item) => (
                      <Button
                        key={item.path}
                        variant={isActive(item.path) ? "default" : "ghost"}
                        className="justify-start gap-2"
                        asChild
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Link to={item.path}>
                          <item.icon className="h-4 w-4" />
                          {item.name}
                        </Link>
                      </Button>
                    ))}
                  </nav>
                </div>
                <div className="mt-auto border-t py-4">
                  {!isAuthenticated && (
                    <AuthModal>
                      <Button variant="default" className="w-full">Sign In</Button>
                    </AuthModal>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
