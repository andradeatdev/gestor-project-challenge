import { ChevronLeft, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ResourceEditorHeaderProps {
    isProduct: boolean;
    isMaterial: boolean;
    formDataName: string;
    handleSave: () => void;
    onBackClick: () => void;
}

export default function ResourceEditorHeader({
    isProduct,
    isMaterial,
    formDataName,
    handleSave,
    onBackClick,
}: ResourceEditorHeaderProps) {
    return (
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/50 backdrop-blur px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-0">
            <div className="flex items-center gap-4">
                <Button
                    className="h-7 w-7 cursor-pointer"
                    onClick={onBackClick}
                    size="icon"
                    variant="outline"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    {formDataName}
                </h1>
                <Badge className="ml-auto sm:ml-0" variant="outline">
                    {isProduct && "Produto final"}
                    {isMaterial && "Matérias-primas"}
                </Badge>
            </div>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button
                    className="gap-1 cursor-pointer"
                    onClick={handleSave}
                    size="sm"
                >
                    <Save className="h-3.5 w-3.5" />
                    Salvar
                </Button>
            </div>
        </header>
    );
}
