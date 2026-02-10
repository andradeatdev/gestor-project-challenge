import { TriangleAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function ErrorPage() {
    return (
        <div className="flex flex-1 items-center justify-center min-h-screen bg-muted/40 p-4">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        <TriangleAlert className="h-16 w-16 text-destructive" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-destructive">Ocorreu um erro!</CardTitle>
                    <CardDescription className="text-md text-muted-foreground">Parece que algo inesperado aconteceu.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300">
                        Por favor, tente novamente mais tarde. Se o problema persistir, entre em contato com o administrador do sistema.
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Código de erro: 500 (Interno)</p>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Link to="/">
                        <Button className="w-full">Voltar para o início</Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
