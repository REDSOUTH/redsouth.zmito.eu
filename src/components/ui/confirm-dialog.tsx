import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText,
  cancelText,
  isDestructive = true,
}: ConfirmDialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            {isDestructive && (
              <div className="bg-red-500/10 p-2 rounded-full">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
            )}
            <DialogTitle>{title}</DialogTitle>
          </div>
          <DialogDescription className="pt-3">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 gap-2 sm:gap-0">
          <Button variant="ghost" onClick={onClose}>
            {cancelText || t("common.cancel", "Cancel")}
          </Button>
          <Button
            variant={isDestructive ? "destructive" : "default"}
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={
              isDestructive
                ? "bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-600 border border-red-500/20"
                : ""
            }
          >
            {confirmText || t("common.confirm", "Confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
