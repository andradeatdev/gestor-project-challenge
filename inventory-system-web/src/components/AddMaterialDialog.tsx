import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAlertDialog } from "@/contexts/dialog/useAlertDialog";
import { useAddMaterialMutation } from "@/store/api/materialsApi";

interface AddMaterialPageDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function AddMaterialPageDialog({ open, onOpenChange }: AddMaterialPageDialogProps) {
    const { showAlertDialog } = useAlertDialog();
    const [addMaterial, { isLoading }] = useAddMaterialMutation();

    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [stockQuantity, setQuantity] = useState<number>(0);

    const handleAddMaterial = async () => {
        if (!name || !code || stockQuantity <= 0) {
            showAlertDialog({ title: "Erro de validação", description: "Por favor, preencha todos os campos e insira uma quantidade válida." });
            return;
        }

        try {
            await addMaterial({ name, code, stockQuantity }).unwrap();
            showAlertDialog({ title: "Sucesso!", description: `Matéria-prima "${name}" adicionada com sucesso!` });
            setName("");
            setCode("");
            setQuantity(0);
            onOpenChange(false);
        } catch (error) {
            console.error(error);
            showAlertDialog({ title: "Erro", description: "Falha ao adicionar matéria-prima." });
        }
    };

    return (
        <Dialog onOpenChange={onOpenChange} open={open}>
            <DialogContent className="sm:max-w-106.25 **:data-[slot='dialog-close']:cursor-pointer">
                <DialogHeader>
                    <DialogTitle>Adicionar nova matéria-prima</DialogTitle>
                    <DialogDescription>Preencha os detalhes da nova matéria-prima.</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                    <div>
                        <Label className="text-right mb-2" htmlFor="name">
                            Nome
                        </Label>
                        <Input id="name" onChange={(e) => setName(e.target.value)} value={name} />
                    </div>
                    <div>
                        <Label className="text-right mb-2" htmlFor="code">
                            Código
                        </Label>
                        <Input id="code" onChange={(e) => setCode(e.target.value)} value={code} />
                    </div>
                    <div>
                        <Label className="text-right mb-2" htmlFor="quantity">
                            Quantidade em estoque
                        </Label>
                        <Input
                            className="[-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            id="quantity"
                            min="0"
                            onChange={(e) => setQuantity(parseFloat(e.target.value))}
                            type="number"
                            value={stockQuantity}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button className="cursor-pointer" variant="outline">
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button className="cursor-pointer" disabled={isLoading} onClick={handleAddMaterial}>
                        {isLoading ? (
                            "Adicionando..."
                        ) : (
                            <>
                                <Plus className="mr-2 h-4 w-4" /> Adicionar
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
