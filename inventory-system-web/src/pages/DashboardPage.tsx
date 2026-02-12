import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetMaterialsQuery } from "@/store/api/materialsApi";
import { useGetProductionPlanQuery, useGetProductsQuery } from "@/store/api/productsApi";
import { AlertCircle, Package } from "lucide-react"; // Opcional: Ícones para dar um visual melhor

export default function DashboardPage() {
  const { data: products, isLoading: isLoadingProducts } = useGetProductsQuery();
  const { data: materials, isLoading: isLoadingMaterials } = useGetMaterialsQuery();
  const { data: productionPlan, isLoading: isLoadingPlan } = useGetProductionPlanQuery();

  const totalProducts = products?.length ?? 0;
  const totalMaterials = materials?.length ?? 0;

  const totalValue = products?.reduce((acc, product) => acc + product.value, 0) ?? 0;

  const isLoading = isLoadingProducts || isLoadingMaterials || isLoadingPlan;

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  if (isLoading) {
    return <div className="flex flex-1 items-center justify-center h-full">Carregando dados...</div>;
  }

  return (
    <div className="flex flex-1 flex-col gap-6 max-w-7xl mx-auto p-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produtos cadastrados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Materiais em estoque</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMaterials}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor base (Catálogo)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalValue)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-l-4 border-l-blue-500 shadow-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-blue-500" />
            <CardTitle>Sugestão de produção</CardTitle>
          </div>
          <CardDescription>
            Cálculo automático do que é possível produzir com o estoque atual de materiais.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!productionPlan || productionPlan.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground gap-2">
              <AlertCircle className="h-8 w-8 opacity-50" />
              <p>Estoque insuficiente para produzir novos itens no momento.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%]">Produto</TableHead>
                  <TableHead className="text-center">Qtd. sugerida</TableHead>
                  <TableHead className="text-right">Receita estimada</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productionPlan.map((item, index) => (
                  <TableRow key={index} className="hover:bg-muted/50">
                    <TableCell className="font-medium text-base">
                      {item.productName}
                    </TableCell>
                    <TableCell className="text-center font-bold text-lg">
                      {item.quantity} <span className="text-xs font-normal text-muted-foreground">unid.</span>
                    </TableCell>
                    <TableCell className="text-right font-medium text-green-600">
                      {formatCurrency(item.totalValue)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}