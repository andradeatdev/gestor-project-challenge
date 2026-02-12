export type Product = {
    id?: number;
    name: string;
    code: string;
    value: number;
    rawMaterials: ProductRawMaterialAssociation[];
};

export type RawMaterial = {
    id?: number;
    name: string;
    code: string;
    stockQuantity: number;
};

export type ProductRawMaterialAssociation = {
    id: number;
    rawMaterial: RawMaterial;
    quantity: number;
};

export type ProductionPlan = {
    productName: string;
    quantity: number;
    totalValue: number;
};
