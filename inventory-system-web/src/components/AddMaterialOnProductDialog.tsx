import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet, FieldTitle } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAlertDialog } from "@/contexts/dialog/useAlertDialog";
import type { RawMaterial } from "@/store/types";

interface AddMaterialDialogProps {
    allRawMaterials: RawMaterial[];
    onAddMaterialConfirm: (materialId: number, quantity: number) => void;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    existingRawMaterialsIds: number[];
}

export default function AddMaterialDialog({ allRawMaterials, onAddMaterialConfirm, open, onOpenChange, existingRawMaterialsIds }: AddMaterialDialogProps) {
    const [selectedMaterialId, setSelectedMaterialCode] = useState<number | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const { showAlertDialog } = useAlertDialog();

    const handleAddClick = () => {
        if (selectedMaterialId && quantity > 0) {
            onAddMaterialConfirm(selectedMaterialId, quantity);
            setSelectedMaterialCode(null);
            setQuantity(1);
            onOpenChange(false);
            return;
        }

        showAlertDialog({
            title: "Erro de validação",
            description: "Por favor, selecione uma matéria-prima e insira uma quantidade válida.",
        });
    };

    console.log("raw materials", allRawMaterials, "existingRawMaterialsIds", existingRawMaterialsIds);

    return (
        <Dialog onOpenChange={onOpenChange} open={open}>
            <DialogContent className="sm:max-w-175">
                <DialogHeader>
                    <DialogTitle>Adicionar matéria-prima</DialogTitle>
                    <DialogDescription>Selecione uma matéria-prima da lista para adicionar à receita do produto.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <FieldGroup>
                        <FieldSet>
                            <FieldLegend>Matérias-primas disponíveis</FieldLegend>
                            <RadioGroup
                                onValueChange={(value) => setSelectedMaterialCode(Number(value))}
                                value={selectedMaterialId !== null ? String(selectedMaterialId) : undefined}
                            >
                                {allRawMaterials.map((material) => {
                                    const isDisabled = existingRawMaterialsIds.includes(material.id!);
                                    return (
                                        !isDisabled && (
                                            <FieldLabel
                                                className="group-data-disabled:opacity-50 group-data-disabled:cursor-not-allowed cursor-pointer"
                                                data-disabled={isDisabled}
                                                htmlFor={`material-${material.code}`}
                                                key={material.code}
                                            >
                                                <Field orientation="horizontal">
                                                    <FieldContent>
                                                        <FieldTitle>
                                                            {material.name} ({material.code})
                                                        </FieldTitle>
                                                        <FieldDescription>Estoque: {material.stockQuantity} UND</FieldDescription>
                                                    </FieldContent>
                                                    <RadioGroupItem disabled={isDisabled} id={`material-${material.code}`} value={String(material.id!)} />
                                                </Field>
                                            </FieldLabel>
                                        )
                                    );
                                })}
                            </RadioGroup>
                        </FieldSet>
                    </FieldGroup>

                    {selectedMaterialId && (
                        <div className="flex ml-auto items-center gap-4">
                            <Label className="text-right" htmlFor="quantity">
                                Quantidade necessária
                            </Label>
                            <Input
                                className="w-28 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                id="quantity"
                                min="1"
                                onChange={(e) => setQuantity(parseFloat(e.target.value))}
                                placeholder="Ex. 1"
                                type="number"
                                value={quantity}
                            />
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button className="cursor-pointer" variant="outline">
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button className="cursor-pointer" onClick={handleAddClick}>
                        <Plus className="mr-2 h-4 w-4" /> Adicionar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
