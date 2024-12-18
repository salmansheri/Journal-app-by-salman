"use client";
import { useSelectEntryByCollectionId } from "@/features/journal-entry/server/hooks/use-select-entry-collectionId";
import { useSelectCollectionById } from "../server/hooks/use-select-collection-by-id";
import Loader from "@/components/loader";
import DeleteCollectionModal from "./modals/delete-collection-modal";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { isDeleteCollectionModalOpen } from "../server/store";
import { useAtom } from "jotai";
import { useCallback, useEffect } from "react";
import { useDeleteCollection } from "../server/hooks/use-delete-collection-id";
import JournalFilters from "@/features/journal-entry/components/journal-filters";

interface CollectionIdPageClientProps {
  collectionId: string;
}
export default function CollectionIdPageClient({
  collectionId,
}: CollectionIdPageClientProps) {
  const { mutate: deleteCollection, isPending: isDeleteCollectionPending } =
    useDeleteCollection();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useAtom(
    isDeleteCollectionModalOpen,
  );
  const {
    data: collection,
    isLoading: isCollectionLoading,
    refetch: refetchCollection,
    isRefetching: isCollectionRefetching,
  } = useSelectCollectionById(collectionId);
  const {
    data: entries,
    isLoading: isEntriesLoading,
    refetch: refetchEntries,
    isRefetching: isEntriesRefetching,
  } = useSelectEntryByCollectionId(collectionId);

  useEffect(() => {
    refetchCollection();
    refetchEntries();
  }, [refetchCollection, refetchEntries]);

  const handleAlert = useCallback(() => {
    if (isDeleteModalOpen) {
      return;
    }

    setIsDeleteModalOpen(true);
  }, [isDeleteModalOpen, setIsDeleteModalOpen]);

  const handleDelete = () => {
    deleteCollection(collectionId, {
      onSuccess: () => {
        window.location.href = "/dashboard";
      },
    });
  };

  if (
    isCollectionLoading ||
    isEntriesLoading ||
    isEntriesRefetching ||
    isCollectionRefetching
  ) {
    return (
      <>
        <Loader
          className="flex h-[70dvh] items-center justify-center"
          size={25}
        />
      </>
    );
  }

  return (
    <div>
      {collection && <DeleteCollectionModal onDeleteAction={handleDelete} />}
      <div className="flex items-center justify-between w-full my-5">
        <h1 className="gradient-title text-4xl font-bold">
          {collection?.name?.toUpperCase()}
        </h1>
        <Button
          variant="ghost"
          className="text-red-500 hover:text-black hover:bg-red-500"
          onClick={handleAlert}
        >
          {isDeleteCollectionPending ? (
            <>
              <Loader size={10} />
            </>
          ) : (
            <>
              <Trash className="size-4" />
              Delete
            </>
          )}
        </Button>
      </div>
      {/* Render entries  */}
      <JournalFilters entries={entries} />
    </div>
  );
}
