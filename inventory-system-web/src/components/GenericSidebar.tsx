import { ChevronRight, Plus, Search } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface SidebarItem {
    id: number;
    code: string;
    name: string;
    secondaryInfo: string | number;
    secondaryLabel?: string;
}

interface GenericSidebarProps {
    title: string;
    items: SidebarItem[];
    basePath: string;
    totalLabel: string;
    totalValue: string | number;
    icon: React.ReactNode;
    onAdd?: () => void;
}

export default function GenericSidebar({ title, items, basePath, totalLabel, totalValue, icon, onAdd }: GenericSidebarProps) {
    const { id } = useParams();

    return (
        <aside className="flex w-72 flex-col border-r bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="p-4 pb-2 flex items-center gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-8" placeholder={`Buscar ${title.toLowerCase()}...`} />
                </div>
                <Button className="h-9 w-9 cursor-pointer" onClick={onAdd} size="icon" variant="outline">
                    <Plus className="h-4 w-4" />
                </Button>
            </div>

            <ScrollArea className="flex-1 px-3 py-2">
                <div className="flex flex-col gap-1">
                    <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">
                        {title} ({items.length})
                    </div>

                    {items.map((item) => {
                        const isActive = id === item.id.toString();
                        return (
                            <Link key={item.id} to={`${basePath}/${item.id}`}>
                                <div
                                    className={`group flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent hover:text-accent-foreground border ${
                                        isActive ? "bg-accent text-accent-foreground font-medium shadow-sm" : "text-muted-foreground bg-transparent"
                                    }`}
                                >
                                    <div className="flex flex-col gap-0.5">
                                        <span className={isActive ? "text-foreground" : "group-hover:text-foreground"}>{item.name}</span>
                                        <span className="text-xs font-semibold text-muted-foreground opacity-70 font-mono">{item.code}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-semibold">
                                            {item.secondaryLabel} {item.secondaryInfo}
                                        </span>
                                        {isActive && <ChevronRight className="h-3 w-3 text-muted-foreground" />}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </ScrollArea>

            <Separator />

            <div className="p-4 bg-muted/40">
                <div className="flex items-center gap-4 rounded-xl border bg-card p-3 shadow-sm">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border bg-background text-primary">{icon}</div>
                    <div className="grid gap-0.5">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{totalLabel}</p>
                        <p className="text-lg font-bold leading-none tracking-tight">{totalValue}</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
