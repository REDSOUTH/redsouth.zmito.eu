import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Settings, LogOut, Copy } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export function UserDropdown() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const pbUrl = import.meta.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:8090';

  if (!user) return null;

  const handleLogout = () => {
    logout();
    toast.success(t('auth.logout_success', 'Has cerrado sesión correctamente.'));
    navigate("/auth/signin");
  };

  const handleCopyUsername = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(user.username);
    toast.success(t('auth.username_copied', 'Usuario copiado al portapapeles.'));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-md hover:bg-transparent">
          <Avatar className="h-10 w-10 border border-border">
            <AvatarImage src={user.avatar ? `${pbUrl}/api/files/_pb_users_auth_/${user.id}/${user.avatar}` : ''} alt={user.username} />
            <AvatarFallback className="bg-muted text-muted-foreground">
              {user.username.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-border">
              <AvatarImage src={user.avatar ? `${pbUrl}/api/files/_pb_users_auth_/${user.id}/${user.avatar}` : ''} alt={user.username} />
              <AvatarFallback className="bg-muted text-muted-foreground">
                {user.username.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name || user.username}</p>
              <div className="flex items-center gap-1.5">
                <p className="text-xs leading-none text-muted-foreground">
                  {user.username}
                </p>
                <button onClick={handleCopyUsername} className="text-muted-foreground hover:text-foreground transition-colors" title="Copiar usuario">
                  <Copy className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link to="/account" className="w-full">
            <Settings />
            {t('auth.account_settings')}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <LogOut />
          {t('auth.logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
