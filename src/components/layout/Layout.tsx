import { Header } from "@/components/layout/Header";
import { GlobalBanners } from "@/components/layout/GlobalBanners";
import { Outlet, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Moon, Sun, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import "flag-icons/css/flag-icons.min.css";

export function Layout() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-red-500/30 selection:text-red-200">
      <Header />
      <GlobalBanners />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="py-8 border-t border-border/40 text-sm text-muted-foreground">
        <div className="container flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-3">
            <img src="/banner.svg" alt="REDSOUTH Studio" className="h-12 w-auto" />
            <div className="text-center md:text-left">
              © {new Date().getFullYear()} REDSOUTH Studio. {t('footer.rights')}
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs text-muted-foreground/80 mt-3">
              <Link to="/legal/terms" className="hover:text-foreground transition-colors">{t('footer.legal.terms')}</Link>
              <Link to="/legal/privacy" className="hover:text-foreground transition-colors">{t('footer.legal.privacy')}</Link>
              <Link to="/legal/cookies" className="hover:text-foreground transition-colors">{t('footer.legal.cookies')}</Link>
              <Link to="/legal/trademarks" className="hover:text-foreground transition-colors">{t('footer.legal.trademarks')}</Link>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Theme Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer">
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem 
                  onClick={() => setTheme("light")}
                  className={`cursor-pointer ${theme === 'light' ? 'bg-accent/50' : ''}`}
                >
                  <Sun className="h-4 w-4" /> Light
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setTheme("dark")}
                  className={`cursor-pointer ${theme === 'dark' ? 'bg-accent/50' : ''}`}
                >
                  <Moon className="h-4 w-4" /> Dark
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setTheme("system")}
                  className={`cursor-pointer ${theme === 'system' ? 'bg-accent/50' : ''}`}
                >
                  <Laptop className="h-4 w-4" /> System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 gap-2 px-3 cursor-pointer">
                  <Globe className="h-4 w-4" />
                  <span>{i18n.language.startsWith('es') ? 'Español' : 'English'}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[120px]">
                <DropdownMenuItem 
                  onClick={() => changeLanguage('en')}
                  className={`cursor-pointer ${i18n.language.startsWith('en') ? 'bg-accent/50' : ''}`}
                >
                  <span className="fi fi-us text-base rounded-[2px] overflow-hidden"></span> English
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => changeLanguage('es')}
                  className={`cursor-pointer ${i18n.language.startsWith('es') ? 'bg-accent/50' : ''}`}
                >
                  <span className="fi fi-es text-base rounded-[2px] overflow-hidden"></span> Español
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </footer>
    </div>
  );
}
