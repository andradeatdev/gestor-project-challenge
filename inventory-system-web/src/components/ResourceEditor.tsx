import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ProductRecipe from "@/components/ProductRecipe";
import RawMaterialUsageCard from "@/components/RawMaterialUsageCard";
import ResourceEditorBasicInfo from "@/components/ResourceEditorBasicInfo";
import ResourceEditorHeader from "@/components/ResourceEditorHeader";
import ResourceStatsCard from "@/components/ResourceStatsCard";
import { useAlertDialog } from "@/contexts/dialog/useAlertDialog";
import { useGetMaterialsQuery, useUpdateMaterialMutation } from "@/store/api/materialsApi";
import {
    useAddRawMaterialToProductMutation,
    useGetMaxUnitsByProductQuery,
    useGetProductsQuery,
    useRemoveRawMaterialFromProductMutation,
    useUpdateProductMutation,
    useUpdateRawMaterialQuantityMutation,
} from "@/store/api/productsApi";
import type { ProductRawMaterialAssociation, RawMaterial, Product } from "@/store/types";

interface ResourceEditorProps {
    mode: "product" | "material";
}

export interface ResourceFormState {
    name: string;
    id?: number;
    code: string;
    value?: number;
    rawMaterials?: ProductRawMaterialAssociation[];
    quantity?: number;
    stockQuantity?: number;
}

export default function ResourceEditor({ mode }: ResourceEditorProps) {
    const { id } = useParams();
    const navigate = useNavigate();

    const { showAlertDialog } = useAlertDialog();

    const { data: products, isLoading: isProductsLoading, isError: isProductsError } = useGetProductsQuery();
    const [updateProduct] = useUpdateProductMutation();
    const [addRawMaterialToProduct] = useAddRawMaterialToProductMutation();
    const [removeRawMaterialFromProduct] = useRemoveRawMaterialFromProductMutation();
    const [updateRawMaterialQuantity] = useUpdateRawMaterialQuantityMutation();

    const { data: rawMaterials, isLoading: isRawMaterialsLoading, isError: isRawMaterialsError } = useGetMaterialsQuery();
    const [updateRawMaterial] = useUpdateMaterialMutation();

    const [formData, setFormData] = useState<ResourceFormState | null>(null);

    const isProduct = mode === "product";
    const isMaterial = mode === "material";

    const {
        data: maxUnitsData,
        isLoading: isLoadingMaxUnits,
        isError: isErrorMaxUnits,
    } = useGetMaxUnitsByProductQuery(formData?.id as number, {
        skip: !isProduct || !formData?.id,
    });

    const itemFromStore = useSelector(() => {
        if (isProduct) {
            if (isProductsLoading) return null;
            if (isProductsError) return null;
            if (!products) return null;

            const product = products.find((p) => p.id === Number(id));

            return product;
        }

        if (isMaterial) {
            if (isRawMaterialsLoading) return null;
            if (isRawMaterialsError) return null;
            if (!rawMaterials) return null;

            const material = rawMaterials.find((m) => m.id === Number(id));

            return material;
        }

        return null;
    });

    useEffect(() => {
        if (itemFromStore) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFormData(JSON.parse(JSON.stringify(itemFromStore)));
        }
    }, [itemFromStore]);

    if (!formData) {
        return <div className="flex flex-1 items-center justify-center text-muted-foreground">Item não encontrado.</div>;
    }

    const handleChange = (field: keyof ResourceFormState, value: unknown) => {
        setFormData((prev) => (prev ? { ...prev, [field]: value } : null));
    };

    const handleSave = () => {
        if (!formData) return;

        if (isProduct) {
            updateProduct(formData as Product);
        }

        if (isMaterial) {
            updateRawMaterial(formData as RawMaterial);
        }

        showAlertDialog({ title: "Sucesso!", description: "Salvo com sucesso!" });
    };

    const handleBackClick = () => {
        if (isProduct) navigate("/products");
        if (isMaterial) navigate("/raw-materials");
    };

    const handleAddMaterial = async (materialId: number, quantity: number) => {
        if (!formData || !formData.id) {
            showAlertDialog({ title: "Erro", description: "Produto não encontrado." });
            return;
        }

        try {
            await addRawMaterialToProduct({ productId: formData.id, materialId, quantity }).unwrap();
            showAlertDialog({ title: "Sucesso!", description: "Matéria-prima adicionada ao produto com sucesso!" });
        } catch (error) {
            console.error(error);
            showAlertDialog({ title: "Erro", description: "Falha ao adicionar matéria-prima ao produto." });
        }
    };

    const handleRemoveMaterial = async (rawMaterialId: number) => {
        if (!formData || !formData.id) {
            showAlertDialog({ title: "Erro", description: "Produto não encontrado." });
            return;
        }

        try {
            await removeRawMaterialFromProduct({ productId: formData.id, materialId: rawMaterialId }).unwrap();
            showAlertDialog({ title: "Sucesso!", description: "Matéria-prima removida do produto com sucesso!" });

            setFormData((prev) => {
                if (!prev || !prev.rawMaterials) return prev;
                return {
                    ...prev,
                    rawMaterials: prev.rawMaterials.filter((assoc) => assoc.rawMaterial.id !== rawMaterialId),
                };
            });
        } catch (error) {
            console.error(error);
            showAlertDialog({ title: "Erro", description: "Falha ao remover matéria-prima do produto." });
        }
    };

    const handleUpdateMaterialQuantity = async (rawMaterialId: number, quantity: number) => {
        if (!formData || !formData.id) {
            showAlertDialog({ title: "Erro", description: "Produto não encontrado." });
            return;
        }

        try {
            await updateRawMaterialQuantity({ productId: formData.id, rawMaterialId: rawMaterialId, quantity }).unwrap();
            showAlertDialog({ title: "Sucesso!", description: "Quantidade de matéria-prima atualizada com sucesso!" });

            setFormData((prev) => {
                if (!prev || !prev.rawMaterials) return prev;
                return {
                    ...prev,
                    rawMaterials: prev.rawMaterials.map((assoc) => (assoc.rawMaterial.id === rawMaterialId ? { ...assoc, quantity: quantity } : assoc)),
                };
            });
        } catch (error) {
            console.error(error);
            showAlertDialog({ title: "Erro", description: "Falha ao atualizar quantidade de matéria-prima." });
        }
    };

    return (
        <div className="bg-muted/40 px-6 flex-1 overflow-scroll h-full">
            <div className="flex flex-col sm:gap-4 sm:py-4">
                <ResourceEditorHeader formDataName={formData.name} handleSave={handleSave} isMaterial={isMaterial} isProduct={isProduct} onBackClick={handleBackClick} />

                <main className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                        <ResourceEditorBasicInfo
                            formDataCode={formData.code}
                            formDataName={formData.name}
                            formDataQuantity={formData.stockQuantity}
                            formDataValue={formData.value}
                            handleChange={handleChange}
                            isProduct={isProduct}
                        />

                        {isProduct && (
                            <ProductRecipe
                                allRawMaterials={rawMaterials || []}
                                existingRawMaterialsIds={formData.rawMaterials?.map((m) => m.rawMaterial.id).filter((id): id is number => id !== undefined) || []}
                                onAddMaterial={handleAddMaterial}
                                onRemoveMaterial={handleRemoveMaterial}
                                onUpdateMaterialQuantity={handleUpdateMaterialQuantity}
                                rawMaterials={formData.rawMaterials}
                            />
                        )}
                    </div>

                    <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                        <ResourceStatsCard
                            formDataQuantity={formData.stockQuantity}
                            isErrorMaxUnits={isErrorMaxUnits}
                            isLoadingMaxUnits={isLoadingMaxUnits}
                            isProduct={isProduct}
                            maxUnits={maxUnitsData?.maxUnits}
                        />

                        {!isProduct && <RawMaterialUsageCard formDataCode={formData.code} />}
                    </div>
                </main>
            </div>
        </div>
    );
}
