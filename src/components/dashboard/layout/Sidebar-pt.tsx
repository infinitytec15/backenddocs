import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  LayoutDashboard,
  FileText,
  FileSignature,
  Settings,
  HelpCircle,
  Shield,
  Users,
  Award,
  CreditCard,
  Link as LinkIcon,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../../../supabase/auth";
import { useEffect, useState } from "react";
import { supabase } from "../../../../supabase/supabase";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
  isActive?: boolean;
}

interface SidebarProps {
  items?: NavItem[];
  activeItem?: string;
  onItemClick?: (label: string) => void;
}

const defaultNavItems: NavItem[] = [
  {
    icon: <LayoutDashboard size={20} />,
    label: "Dashboard",
    isActive: true,
    href: "/dashboard",
  },
  {
    icon: <FileText size={20} />,
    label: "Meus Documentos",
    href: "/dashboard/documents",
  },
  {
    icon: <FileSignature size={20} />,
    label: "Meus Contratos",
    href: "/dashboard/contracts",
  },
  {
    icon: <Shield size={20} />,
    label: "Cofre Digital",
    href: "/dashboard/vault",
  },
  {
    icon: <Award size={20} />,
    label: "Gamificação",
    href: "/dashboard/gamification",
  },
  {
    icon: <CreditCard size={20} />,
    label: "Meu Plano",
    href: "/dashboard/plan",
  },
];

const defaultBottomItems: NavItem[] = [
  {
    icon: <HelpCircle size={20} />,
    label: "Suporte",
    href: "/dashboard/support",
  },
  {
    icon: <Settings size={20} />,
    label: "Configurações",
    href: "/dashboard/settings",
  },
  { icon: <LogOut size={20} />, label: "Sair" },
];

const Sidebar = ({
  items = defaultNavItems,
  activeItem = "Dashboard",
  onItemClick = () => {},
}: SidebarProps) => {
  const { user, signOut } = useAuth();
  const [isAffiliate, setIsAffiliate] = useState(false);
  const [navItems, setNavItems] = useState(items);

  useEffect(() => {
    if (!user) return;

    const checkAffiliateStatus = async () => {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("is_affiliate")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        if (data?.is_affiliate) {
          setIsAffiliate(true);
          // Add affiliate item to nav items if user is an affiliate
          setNavItems([
            ...items.slice(0, 6), // First 6 items
            {
              icon: <LinkIcon size={20} />,
              label: "Programa de Afiliados",
              href: "#afiliados",
            },
            ...items.slice(6), // Remaining items
          ]);
        }
      } catch (error) {
        console.error("Error checking affiliate status:", error);
      }
    };

    checkAffiliateStatus();
  }, [user, items]);

  const handleItemSelection = (label: string, href?: string) => {
    if (label === "Sair") {
      signOut();
      return;
    }

    if (href) {
      window.location.href = href;
      return;
    }

    onItemClick(label);
  };

  return (
    <div className="w-[280px] h-full bg-white/90 backdrop-blur-md border-r border-gray-200 flex flex-col shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-900">
          DocSafe Brasil
        </h2>
        <p className="text-sm text-gray-500">
          Gerencie seus documentos e contratos
        </p>
      </div>

      <ScrollArea className="flex-1 px-4">
        <div className="space-y-1.5">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant={"ghost"}
              className={`w-full justify-start gap-3 h-10 rounded-xl text-sm font-medium ${item.label === activeItem ? "bg-blue-50 text-blue-600 hover:bg-blue-100" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => handleItemSelection(item.label, item.href)}
            >
              <span
                className={`${item.label === activeItem ? "text-blue-600" : "text-gray-500"}`}
              >
                {item.icon}
              </span>
              {item.label}
            </Button>
          ))}
        </div>

        <Separator className="my-4 bg-gray-100" />

        <div className="space-y-3">
          <h3 className="text-xs font-medium px-4 py-1 text-gray-500 uppercase tracking-wider">
            Filtros Rápidos
          </h3>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-9 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            Documentos Recentes
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-9 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            <span className="h-2 w-2 rounded-full bg-red-500"></span>
            Contratos Pendentes
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-9 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
            Vencimentos Próximos
          </Button>
        </div>
      </ScrollArea>

      <div className="p-4 mt-auto border-t border-gray-200">
        {defaultBottomItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className="w-full justify-start gap-3 h-10 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 mb-1.5"
            onClick={() => handleItemSelection(item.label, item.href)}
          >
            <span
              className={`${item.label === "Sair" ? "text-red-500" : "text-gray-500"}`}
            >
              {item.icon}
            </span>
            <span className={item.label === "Sair" ? "text-red-500" : ""}>
              {item.label}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
