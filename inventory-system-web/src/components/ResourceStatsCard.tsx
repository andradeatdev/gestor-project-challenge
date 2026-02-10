import { BarChart3, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ResourceStatsCardProps {
    isProduct: boolean;
    formDataQuantity?: number;
    maxUnits?: number;
    isLoadingMaxUnits: boolean;
    isErrorMaxUnits: boolean;
}

export default function ResourceStatsCard({ isProduct, formDataQuantity, maxUnits, isLoadingMaxUnits, isErrorMaxUnits }: ResourceStatsCardProps) {
    return (
        <Card className="pt-0">
            <CardHeader className="bg-muted/50 border-b py-5">
                <CardTitle className="text-base flex items-center gap-2">
                    {isProduct ? <BarChart3 className="h-4 w-4" /> : <Package className="h-4 w-4" />}
                    {isProduct ? "Status de produção" : "Nível de estoque"}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold tracking-tight">{isProduct ? (isLoadingMaxUnits ? "..." : isErrorMaxUnits ? "Erro" : maxUnits) : formDataQuantity}</span>
                    <span className="text-sm text-muted-foreground font-medium">unidades</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{isProduct ? "Produção calculada com base nos materiais disponíveis." : "Disponível fisicamente no armazém."}</p>
            </CardContent>
        </Card>
    );
}
