import { type ReactNode, useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertDialogContext } from "@/contexts/dialog/useAlertDialog";

interface AlertDialogOptions {
    title: string | ReactNode;
    description: string | ReactNode;
    onConfirm?: () => void;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
    hideCancelButton?: boolean;
}

export interface AlertDialogContextType {
    showAlertDialog: (options: AlertDialogOptions) => void;
}

export const AlertDialogProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState<string | ReactNode>("");
    const [description, setDescription] = useState<string | ReactNode>("");
    const [onConfirmCallback, setOnConfirmCallback] = useState<(() => void) | undefined>(undefined);
    const [onCancelCallback, setOnCancelCallback] = useState<(() => void) | undefined>(undefined);
    const [confirmButtonText, setConfirmButtonText] = useState<string>("OK");
    const [cancelButtonText, setCancelButtonText] = useState<string>("Cancel");
    const [hideCancelButton, setHideCancelButton] = useState<boolean>(false);

    const showAlertDialog = (options: AlertDialogOptions) => {
        setTitle(options.title);
        setDescription(options.description);
        setOnConfirmCallback(() => options.onConfirm);
        setOnCancelCallback(() => options.onCancel);
        setConfirmButtonText(options.confirmText || "OK");
        setCancelButtonText(options.cancelText || "Cancel");
        setHideCancelButton(options.hideCancelButton || false);
        setIsOpen(true);
    };

    const value = { showAlertDialog };

    const handleClose = (confirmed: boolean) => {
        setIsOpen(false);
        if (confirmed && onConfirmCallback) {
            onConfirmCallback();
        } else if (!confirmed && onCancelCallback) {
            onCancelCallback();
        }

        setTitle("");
        setDescription("");
        setOnConfirmCallback(undefined);
        setOnCancelCallback(undefined);
        setConfirmButtonText("OK");
        setCancelButtonText("Cancel");
        setHideCancelButton(false);
    };

    return (
        <AlertDialogContext.Provider value={value}>
            {children}
            <AlertDialog onOpenChange={setIsOpen} open={isOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{title}</AlertDialogTitle>
                        <AlertDialogDescription>{description}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        {!hideCancelButton && (
                            <AlertDialogCancel className="cursor-pointer" onClick={() => handleClose(false)}>
                                {cancelButtonText}
                            </AlertDialogCancel>
                        )}
                        <AlertDialogAction className="cursor-pointer" onClick={() => handleClose(true)}>
                            {confirmButtonText}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AlertDialogContext.Provider>
    );
};
