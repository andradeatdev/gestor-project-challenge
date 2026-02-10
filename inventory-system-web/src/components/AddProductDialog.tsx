import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAlertDialog } from "@/contexts/dialog/useAlertDialog";
import { useAddProductMutation } from "@/store/api/productsApi";

interface AddProductDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function AddProductDialog({ open, onOpenChange }: AddProductDialogProps) {
    const { showAlertDialog } = useAlertDialog();
    const [addProduct, { isLoading }] = useAddProductMutation();

    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [value, setPrice] = useState<number>(0);

    const handleAddProduct = async () => {
        if (!name || !code || value <= 0) {
            showAlertDialog({
                title: "Erro de validação",
                description: "Por favor, preencha todos os campos e insira um preço válido.",
            });
            return;
        }

        try {
            await addProduct({ name, code, value, rawMaterials: [] }).unwrap();
            showAlertDialog({ title: "Sucesso!", description: `Produto "${name}" adicionado com sucesso!` });

            setName("");
            setCode("");
            setPrice(0);
            onOpenChange(false);
        } catch (error) {
            console.error(error);
            showAlertDialog({ title: "Erro", description: "Falha ao adicionar produto." });
        }
    };

    return (
        <Dialog onOpenChange={onOpenChange} open={open}>
            <DialogContent className="sm:max-w-106.25 **:data-[slot='dialog-close']:cursor-pointer">
                <DialogHeader>
                    <DialogTitle>Adicionar novo produto</DialogTitle>
                    <DialogDescription>Preencha os detalhes do novo produto.</DialogDescription>
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
                            Código (SKU)
                        </Label>
                        <Input id="code" onChange={(e) => setCode(e.target.value)} value={code} />
                    </div>
                    <div>
                        <Label className="text-right mb-2" htmlFor="price">
                            Preço (R$)
                        </Label>
                        <Input
                            className="[-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            id="price"
                            min="0"
                            onChange={(e) => setPrice(parseFloat(e.target.value))}
                            step="0.10"
                            type="number"
                            value={value}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <Button disabled={isLoading} onClick={handleAddProduct}>
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
