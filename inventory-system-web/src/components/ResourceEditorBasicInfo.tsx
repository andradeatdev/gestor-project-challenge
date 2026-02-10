import type { ResourceFormState } from "@/components/ResourceEditor";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ResourceEditorBasicInfoProps {
    isProduct: boolean;
    formDataName: string;
    formDataCode: string;
    formDataValue?: number;
    formDataQuantity?: number;
    handleChange: (field: keyof ResourceFormState, value: unknown) => void;
}

export default function ResourceEditorBasicInfo({
    isProduct,
    formDataName,
    formDataCode,
    formDataValue: formDataPrice,
    formDataQuantity,
    handleChange,
}: ResourceEditorBasicInfoProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Informações básicas</CardTitle>
                <CardDescription>Dados de identificação e valores.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6">
                    <div className="grid gap-3">
                        <Label htmlFor="name">Nome</Label>
                        <Input id="name" onChange={(e) => handleChange("name", e.target.value)} value={formDataName} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="grid gap-3">
                            <Label htmlFor="code">Código (SKU)</Label>
                            <Input disabled id="code" value={formDataCode} />
                        </div>

                        {isProduct ? (
                            <div className="grid gap-3">
                                <Label htmlFor="price">Preço (R$)</Label>
                                <Input id="price" onChange={(e) => handleChange("value", parseFloat(e.target.value))} type="number" value={formDataPrice} />
                            </div>
                        ) : (
                            <div className="grid gap-3">
                                <Label htmlFor="quantity">Quantidade em estoque</Label>
                                <div className="relative">
                                    <Input
                                        className="[-moz-appearance:textfield]"
                                        id="quantity"
                                        onChange={(e) => handleChange("stockQuantity", parseFloat(e.target.value))}
                                        type="number"
                                        value={formDataQuantity}
                                    />
                                    <span className="absolute right-3 top-2.5 text-xs text-muted-foreground font-bold">UND</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
