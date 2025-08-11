import React from "react";
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

type ConfirmDeleteDialogProps = {
  trigger: React.ReactNode;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
};

export const ConfirmDeleteDialogPost = ({
  trigger,
  title = "Delete this post?",
  description = "This action cannot be undone. This will permanently delete your post.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
}: ConfirmDeleteDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
