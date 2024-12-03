"use client";

import { useSelectEntry } from "@/features/journal-entry/server/hooks/use-select-entries";
import { useSelectCollection } from "../server/hooks/use-select-collection";
import Loader from "@/components/loader";
import { useMemo } from "react";
import CollectionPreview from "./collection-preview";
import { isCollectionModalOpen } from "../server/store";
import { useAtom } from "jotai";
import CreateCollectionModal from "./modals/create-collection-modal";

export default function Collection() {
  const [isOpen, setIsOpen] = useAtom(isCollectionModalOpen);

  const { data: collections, isLoading: isCollectionsLoading } =
    useSelectCollection();
  const { data: entriesData, isLoading: isEntriesLoading } = useSelectEntry();

  const entriesByCollection = useMemo(() => {
    const entries = entriesData?.reduce((acc, entry) => {
      const collectionId = entry.collectionId;
      if (!acc[collectionId]) {
        acc[collectionId] = [];
      }

      acc[collectionId].push(entry);
      return acc;
    });

    return entries;
  }, [entriesData]);

  console.log({ entriesByCollection: entriesByCollection });

  if (isCollectionsLoading || isEntriesLoading) {
    return <Loader size={25} />;
  }
  return (
    <section>
      <CreateCollectionModal />
      <h1 className="gradient-title text-3xl font-bold">Collections</h1>
      <div>
        <CollectionPreview
          isCreateNew={true}
          onCreateNew={() => setIsOpen(true)}
        />
      </div>
      {collections?.map((collection) => (
        <CollectionPreview
          key={collection?.id}
          id={collection?.id}
          name={collection?.name}
          entries={entriesData}
        />
      ))}
    </section>
  );
}
