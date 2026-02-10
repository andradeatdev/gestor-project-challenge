import { Plus } from "lucide-react";
import { useState } from "react";
import AddMaterialDialog from "@/components/AddMaterialOnProductDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAlertDialog } from "@/contexts/dialog/useAlertDialog";
import type { ProductRawMaterialAssociation, RawMaterial } from "@/store/types";
import MaterialRow from "./MaterialRow";

interface ProductRecipeProps {
    rawMaterials?: ProductRawMaterialAssociation[];
    onAddMaterial: (materialId: number, quantity: number) => void;
    onRemoveMaterial: (id: number) => void;
    onUpdateMaterialQuantity: (rawMaterialId: number, quantity: number) => void;
    allRawMaterials: RawMaterial[];
    existingRawMaterialsIds: number[];
}

export default function ProductRecipe({ rawMaterials, onAddMaterial, onRemoveMaterial, onUpdateMaterialQuantity, allRawMaterials, existingRawMaterialsIds }: ProductRecipeProps) {
    const [isAddMaterialDialogOpen, setIsAddMaterialDialogOpen] = useState(false);
    const { showAlertDialog } = useAlertDialog();

    const handleRemoveClick = (material: ProductRawMaterialAssociation) => {
        showAlertDialog({
            title: "Tem certeza?",
            description: `Esta ação não pode ser desfeita. Isso removerá a matéria-prima ${material.rawMaterial.name} da receita do produto.`,
            onConfirm: () => {
                if (!material.rawMaterial.id) {
                    showAlertDialog({ title: "Erro", description: "Matéria-prima inválida." });
                    return;
                }
                onRemoveMaterial(material.rawMaterial.id);
            },
        });
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div className="space-y-1">
                    <CardTitle>Receita / Composição</CardTitle>
                    <CardDescription>Materiais necessários para 1 unidade.</CardDescription>
                </div>
                <Dialog onOpenChange={setIsAddMaterialDialogOpen} open={isAddMaterialDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="gap-1 cursor-pointer" size="sm" variant="secondary">
                            <Plus className="h-3.5 w-3.5" /> Adicionar
                        </Button>
                    </DialogTrigger>
                    <AddMaterialDialog
                        allRawMaterials={allRawMaterials}
                        existingRawMaterialsIds={existingRawMaterialsIds}
                        onAddMaterialConfirm={onAddMaterial}
                        onOpenChange={setIsAddMaterialDialogOpen}
                        open={isAddMaterialDialogOpen}
                    />
                </Dialog>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Matéria-prima</TableHead>
                            <TableHead className="w-[200px]">Qtd. necessária</TableHead>
                            <TableHead>Qtd. em estoque</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rawMaterials?.map((material) => (
                            <MaterialRow key={material.rawMaterial.code} material={material} onRemove={handleRemoveClick} onUpdate={onUpdateMaterialQuantity} />
                        ))}
                        {(!rawMaterials || rawMaterials.length === 0) && (
                            <TableRow>
                                <TableCell className="text-center text-muted-foreground" colSpan={4}>
                                    Nenhuma composição definida.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
