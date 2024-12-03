"use client";

import { useMemo, useCallback } from "react";
import { isCollectionModalOpen } from "../server/store";
import { useAtom } from "jotai";
interface CollectionPreviewProps {
  isCreateNew?: boolean;
  id?: string;
  name?: string;
  entries?: Array<Record<string, null>>;
}

export default function CollectionPreview({
  isCreateNew = false,
  id,
  name,
  entries = [],
}: CollectionPreviewProps) {
  const [isOpen, setIsOpen] = useAtom(isCollectionModalOpen);

  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => entry.collectionId === id);
  }, [entries, id]);
  const handleCreateNew = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  if (isCreateNew) {
    return (
      <div className="cursor-pointer" onClick={handleCreateNew}>
        dkkdkdkkdk
      </div>
    );
  }

  return (
    <div>
      <div>{name}</div>
      {filteredEntries?.length === 0 ? (
        <div>No entry</div>
      ) : (
        <>
          {filteredEntries.map((entry) => (
            <div key={entry.id}>{entry.title}</div>
          ))}
        </>
      )}
    </div>
  );
}
