"use client";

import { useSelectEntry } from "@/features/journal-entry/server/hooks/use-select-entries";
import { useSelectCollection } from "../server/hooks/use-select-collection";
import Loader from "@/components/loader";
import CollectionPreview from "./collection-preview";
import CreateCollectionModal from "./modals/create-collection-modal";
import { SelectCollections } from "@/drizzle/schema";

export default function Collection() {
  const { data: collections, isLoading: isCollectionsLoading } =
    useSelectCollection();
  const { data: entriesData, isLoading: isEntriesLoading } = useSelectEntry();

  if (isCollectionsLoading || isEntriesLoading) {
    return <Loader size={25} />;
  }
  return (
    <section>
      <CreateCollectionModal />
      <h1 className="gradient-title text-3xl font-bold">Collections</h1>
      <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-3 my-4">
        <CollectionPreview isCreateNew={true} />
        {collections?.map((collection: SelectCollections) => (
          <CollectionPreview
            key={collection?.id}
            id={collection?.id}
            name={collection?.name}
            entries={entriesData}
            createdAt={collection.createdAt}
          />
        ))}
      </div>
    </section>
  );
}
