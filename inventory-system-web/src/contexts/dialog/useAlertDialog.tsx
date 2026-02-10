import { createContext, useContext } from "react";
import type { AlertDialogContextType } from "@/contexts/dialog/AlertDialogContext";

export const AlertDialogContext = createContext<
    AlertDialogContextType | undefined
>(undefined);

export const useAlertDialog = () => {
    const context = useContext(AlertDialogContext);
    if (context === undefined) {
        throw new Error(
            "useAlertDialog must be used within an AlertDialogProvider",
        );
    }
    return context;
};
