import { Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import type { ProductRawMaterialAssociation } from "@/store/types";

interface MaterialRowProps {
    material: ProductRawMaterialAssociation;
    onUpdate: (id: number, quantity: number) => void;
    onRemove: (material: ProductRawMaterialAssociation) => void;
}

export default function MaterialRow({ material, onUpdate, onRemove }: MaterialRowProps) {
    const [quantity, setQuantity] = useState(material.quantity);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setQuantity(material.quantity);
    }, [material.quantity]);

    const hasChanged = quantity !== material.quantity;

    return (
        <TableRow>
            <TableCell className="font-medium">{material.rawMaterial.name}</TableCell>
            <TableCell>
                <div className="flex items-center gap-2">
                    <Input className="w-24 text-center" onChange={(e) => setQuantity(Number(e.target.value))} type="number" value={quantity} />
                    {hasChanged && (
                        <Button
                            className="h-8 px-2 animate-in fade-in zoom-in duration-200"
                            onClick={() => material.rawMaterial.id && onUpdate(material.rawMaterial.id, quantity)}
                            size="sm"
                            variant="default"
                        >
                            <Save className="h-3.5 w-3.5 mr-1" /> Salvar
                        </Button>
                    )}
                </div>
            </TableCell>
            <TableCell>{material.rawMaterial.stockQuantity}</TableCell>
            <TableCell className="text-right">
                <Button className="hover:text-destructive cursor-pointer" onClick={() => onRemove(material)} size="icon" variant="ghost">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </TableCell>
        </TableRow>
    );
}
