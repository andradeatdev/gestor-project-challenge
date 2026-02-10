import { Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RawMaterialUsageCardProps {
    formDataCode: string;
}

export default function RawMaterialUsageCard({
    formDataCode,
}: RawMaterialUsageCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Layers className="h-4 w-4" /> Uso
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">
                    Código do material:{" "}
                    <span className="font-mono text-foreground">
                        {formDataCode}
                    </span>
                </p>
            </CardContent>
        </Card>
    );
}
