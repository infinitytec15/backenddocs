import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Bell,
  Home,
  Search,
  Settings,
  User,
  Upload,
  Plus,
  HelpCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../supabase/auth";

interface TopNavigationProps {
  onSearch?: (query: string) => void;
  notifications?: Array<{ id: string; title: string; isRead: boolean }>;
}

const TopNavigation = ({
  onSearch = () => {},
  notifications = [
    { id: "1", title: "Novo documento adicionado", isRead: false },
    { id: "2", title: "Contrato pendente de assinatura", isRead: false },
    { id: "3", title: "Seu plano vence em 5 dias", isRead: true },
    { id: "4", title: "Você ganhou 100 pontos de gamificação", isRead: true },
  ],
}: TopNavigationProps) => {
  const { user, signOut } = useAuth();
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  if (!user) return null;

  return (
    <div className="w-full h-16 border-b border-gray-200 bg-white/90 backdrop-blur-md flex items-center justify-between px-6 fixed top-0 z-50 shadow-sm">
      <div className="flex items-center gap-4 flex-1">
        <Link
          to="/"
          className="text-gray-900 hover:text-gray-700 transition-colors"
        >
          <Home className="h-5 w-5" />
        </Link>
        <div className="relative w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar em todo sistema..."
            className="pl-9 h-10 rounded-full bg-gray-100 border-0 text-sm focus:ring-2 focus:ring-gray-200 focus-visible:ring-gray-200 focus-visible:ring-offset-0"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full h-9 w-9 bg-blue-50 hover:bg-blue-100 transition-colors text-blue-600"
              >
                <Upload className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="rounded-lg bg-gray-900 text-white text-xs px-3 py-1.5">
              <p>Upload Rápido</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full h-9 w-9 bg-green-50 hover:bg-green-100 transition-colors text-green-600"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="rounded-lg bg-gray-900 text-white text-xs px-3 py-1.5">
              <p>Novo Contrato</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full h-9 w-9 bg-purple-50 hover:bg-purple-100 transition-colors text-purple-600"
              >
                <HelpCircle className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="rounded-lg bg-gray-900 text-white text-xs px-3 py-1.5">
              <p>Ajuda Rápida</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative rounded-full h-9 w-9 bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <Bell className="h-4 w-4 text-gray-700" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-medium border border-white">
                        {unreadCount}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="rounded-xl overflow-hidden p-2 border border-gray-200 shadow-lg w-72"
                >
                  <DropdownMenuLabel className="text-sm font-medium text-gray-900 px-2 flex justify-between items-center">
                    <span>Notificações</span>
                    <Button
                      variant="ghost"
                      className="h-6 text-xs text-blue-600 hover:text-blue-700 p-0"
                    >
                      Marcar todas como lidas
                    </Button>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="my-1 bg-gray-100" />
                  {notifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className={`rounded-lg text-sm py-2 px-3 my-1 ${notification.isRead ? "text-gray-500" : "text-gray-900 font-medium bg-blue-50"} hover:bg-gray-100`}
                    >
                      <div className="flex flex-col">
                        <span>{notification.title}</span>
                        <span className="text-xs text-gray-400 mt-1">
                          Agora mesmo
                        </span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator className="my-1 bg-gray-100" />
                  <DropdownMenuItem className="rounded-lg text-sm py-2 text-center text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium">
                    Ver todas as notificações
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent className="rounded-lg bg-gray-900 text-white text-xs px-3 py-1.5">
              <p>Notificações</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 hover:cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors rounded-full pl-2 pr-3 py-1">
              <Avatar className="h-8 w-8 border-2 border-white">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                  alt={user.email || ""}
                />
                <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium text-gray-900">
                  {user.user_metadata?.full_name?.split(" ")[0] || "Usuário"}
                </span>
                <span className="text-xs text-gray-500">Plano Pro</span>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="rounded-xl border-none shadow-lg"
          >
            <DropdownMenuLabel className="text-xs text-gray-500">
              {user.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              Meu Perfil
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              Configurações
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
              onSelect={() => signOut()}
            >
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopNavigation;
