import { Package } from "lucide-react";
import { useState } from "react";
// import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import AddMaterialPageDialog from "@/components/AddMaterialDialog";
import GenericSidebar from "@/components/GenericSidebar";
import { useGetMaterialsQuery } from "@/store/api/materialsApi";

export default function MaterialsLayout() {
    const { data: materials, isLoading, isError } = useGetMaterialsQuery();

    const [isAddMaterialPageDialogOpen, setIsAddMaterialPageDialogOpen] = useState(false);

    const navigate = useNavigate();
    if (isLoading) return <div className="flex flex-1 items-center justify-center">Loading...</div>;
    if (isError) {
        navigate("/error");
        return <div>Error</div>;
    }
    if (!materials) return <div className="flex flex-1 items-center justify-center">No materials found</div>;

    const sidebarItems = materials.map((m) => ({
        id: m.id as number,
        code: m.code,
        name: m.name,
        secondaryInfo: m.stockQuantity,
        secondaryLabel: "qtd.",
    }));

    const handleAddNewMaterial = () => {
        setIsAddMaterialPageDialogOpen(true);
    };

    return (
        <div className="flex flex-1 h-[calc(100vh-3.5rem)] w-full bg-muted/40">
            <GenericSidebar
                basePath="/raw-materials"
                icon={<Package className="h-5 w-5" />}
                items={sidebarItems}
                onAdd={handleAddNewMaterial}
                title="Matéria-Prima"
                totalLabel="Itens Cadastrados"
                totalValue={`${materials.length} itens`}
            />
            <div className="flex flex-1 overflow-hidden">
                <Outlet />
            </div>
            <AddMaterialPageDialog onOpenChange={setIsAddMaterialPageDialogOpen} open={isAddMaterialPageDialogOpen} />
        </div>
    );
}
