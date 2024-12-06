"use client";
import Loader from "@/components/loader";
import { useSelectEntryById } from "../server/hooks/use-select-entry-by-id";
import NotFound from "@/app/not-found";
import { format } from "date-fns";
import { EditIcon, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isDeleteEntryModalOpen } from "@/features/collection/server/store";
import { useAtom } from "jotai";
import DeleteEntryModal from "./modals/delete-entry-modal";
import { useDeleteEntry } from "../server/hooks/use-delete.entry";
import { useRouter } from "next/navigation";

interface JournalIdClientProps {
  journalId: string;
}
export default function JournalIdClient({ journalId }: JournalIdClientProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useAtom(isDeleteEntryModalOpen);
  const { data, isLoading } = useSelectEntryById(journalId);

  const { mutate, isPending } = useDeleteEntry();

  if (isLoading) {
    return (
      <Loader
        size={25}
        className="flex h-[70dvh] items-center justify-center"
      />
    );
  }

  const handleAlert = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };
  if (!data) {
    return <NotFound />;
  }

  const handleDelete = () => {
    mutate(data.id, {
      onSuccess: () => {
        window.location.href = "/dashboard";
      },
    });
  };

  return (
    <div className="py-5">
      <DeleteEntryModal onDelete={handleDelete} />
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="gradient-title text-4xl font-bold">{data.title}</h1>
            <p className="py-2 text-violet-300">
              {format(new Date(data.createdAt), "PPP")}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button className="text-blue-500" variant="ghost">
              <EditIcon />
              Edit
            </Button>
            {isPending ? (
              <div>
                <Loader size={12} />
              </div>
            ) : (
              <Button
                onClick={handleAlert}
                variant="ghost"
                className="text-red-500"
              >
                <Trash />
                Delete
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
