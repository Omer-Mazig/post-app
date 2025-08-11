import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";

type ConfirmDeleteDialogProps = {
  trigger: React.ReactNode;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => Promise<void>;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const ConfirmDeleteDialogPost = ({
  trigger,
  title = "Delete this post?",
  description = "This action cannot be undone. This will permanently delete your post.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  open,
  onOpenChange,
}: ConfirmDeleteDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [openInternal, setOpenInternal] = useState(false);

  const isControlled =
    typeof open === "boolean" && typeof onOpenChange === "function";
  const isOpen = isControlled ? (open as boolean) : openInternal;
  const setOpen = (next: boolean) => {
    if (isLoading) return;
    if (isControlled) {
      (onOpenChange as (o: boolean) => void)(next);
    } else {
      setOpenInternal(next);
    }
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    await onConfirm();
    setIsLoading(false);
  };

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={setOpen}
    >
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            onClick={(e) => {
              e.preventDefault();
              handleConfirm();
            }}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              confirmText
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
