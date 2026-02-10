import { LogOut, Package2, Settings, User } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const navItems = [
        {
            label: "Produtos",
            to: "/products",
        },
        {
            label: "Materiais",
            to: "/raw-materials",
        },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="flex h-14 items-center px-4 md:px-8">
                <div className="mr-4 hidden md:flex">
                    <Link className="mr-6 flex items-center space-x-2" to="/">
                        <Package2 className="h-6 w-6" />
                        <span className="hidden font-bold sm:inline-block">Gestor</span>
                    </Link>
                    <nav className="flex items-center gap-6 text-sm font-medium">
                        {navItems.map((item) => (
                            <NavItem key={item.to} to={item.to}>
                                {item.label}
                            </NavItem>
                        ))}
                    </nav>
                </div>

                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="relative h-8 w-8 rounded-full cursor-pointer" variant="ghost">
                                <Avatar className="h-8 w-8 border border-border">
                                    <AvatarImage alt="@usuario" src="/avatars/01.png" />
                                    <AvatarFallback>AD</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">Admin</p>
                                    <p className="text-xs leading-none text-muted-foreground">admin@gestor.com</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer">
                                <User className="mr-2 h-4 w-4" />
                                <span>Perfil</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Configurações</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Sair</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
    return (
        <NavLink className={({ isActive }) => cn("transition-colors hover:text-foreground/80", isActive ? "text-foreground font-semibold" : "text-foreground/60")} to={to}>
            {children}
        </NavLink>
    );
}
