"use client";
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
import { isDeleteCollectionModalOpen } from "../../server/store";

import { useAtom } from "jotai";
import { useCallback } from "react";
import { Trash } from "lucide-react";

interface DeleteCollectionModalProps {
  onDelete: () => void;
}

export default function DeleteCollectionModal({
  onDelete,
}: DeleteCollectionModalProps) {
  const [isOpen, setIsOpen] = useAtom(isDeleteCollectionModalOpen);
  const handleModalClose = useCallback(() => {
    if (isOpen === false) {
      return;
    }

    setIsOpen(false);
  }, [isOpen, setIsOpen]);
  return (
    <AlertDialog open={isOpen} onOpenChange={handleModalClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-black font-bold">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-900">
            This action cannot be undone. This will permanently delete this
            collection and remove this data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border border-black text-black">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>
            <Trash />
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
