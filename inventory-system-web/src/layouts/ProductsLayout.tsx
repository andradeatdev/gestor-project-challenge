import { DollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AddProductDialog from "@/components/AddProductDialog";
import GenericSidebar from "@/components/GenericSidebar";
import { useGetProductsQuery } from "@/store/api/productsApi";

export default function ProductsLayout() {
    const { data: products, isLoading, isError } = useGetProductsQuery();

    const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isError) {
            navigate("/error");
        }
    }, [isError, navigate]);

    if (isLoading) return <div className="flex flex-1 items-center justify-center">Loading...</div>;
    if (isError) return <div>Error</div>;

    if (!products) return <div className="flex flex-1 items-center justify-center">No products found</div>;

    const sidebarItems = products.map((p) => ({
        id: p.id as number,
        code: p.code,
        name: p.name,
        secondaryInfo: p.value.toFixed(2),
        secondaryLabel: "R$",
    }));

    const totalValue = products.reduce((acc, p) => acc + p.value, 0).toFixed(2);

    const handleAddNewProduct = () => {
        setIsAddProductDialogOpen(true);
    };

    return (
        <div className="flex flex-1 h-[calc(100vh-3.6rem)] w-full bg-muted/40">
            <GenericSidebar
                basePath="/products"
                icon={<DollarSign className="h-5 w-5" />}
                items={sidebarItems}
                onAdd={handleAddNewProduct}
                title="Inventário"
                totalLabel="Valor Total"
                totalValue={`R$ ${totalValue}`}
            />
            <div className="flex flex-1 overflow-hidden">
                <Outlet />
            </div>
            <AddProductDialog onOpenChange={setIsAddProductDialogOpen} open={isAddProductDialogOpen} />
        </div>
    );
}
