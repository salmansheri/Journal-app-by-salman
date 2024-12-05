"use client";

import { useMemo, useCallback } from "react";
import { isCollectionModalOpen } from "../server/store";
import { useAtom } from "jotai";
import { cn, timeAgo } from "@/lib/utils";
import { ArrowRightIcon, FolderIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
interface CollectionPreviewProps {
  isCreateNew?: boolean;
  id?: string;
  name?: string;
  entries?: Array<Record<string, null>>;
  createdAt?: Date;
}

export default function CollectionPreview({
  isCreateNew = false,
  id,
  name,
  entries = [],
  createdAt = new Date(),
}: CollectionPreviewProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useAtom(isCollectionModalOpen);
  const time = timeAgo(createdAt);

  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => entry.collectionId === id);
  }, [entries, id]);
  const handleCreateNew = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const totalEntries = filteredEntries.length;

  if (isCreateNew) {
    return (
      <div
        className={cn(
          "p-6 shadow-xl cursor-pointer rounded-xl",
          isOpen
            ? "bg-violet-950/10  border border-violet-200/10 backdrop-blur-lg backdrop-saturate-150"
            : "bg-slate-950/10 backdrop-blur-log backdrop-saturate-150 border border-slate-200/10",
        )}
        onClick={handleCreateNew}
      >
        <span className="text-xl inline-flex items-center justify-center gap-2">
          <PlusIcon className="size-10" />
          Create Collections
        </span>
      </div>
    );
  }

  return (
    <div
      onClick={() => router.push(`/collection/${id}`)}
      className="bg-violet-950/40 backdrop-blur-xl backdrop-saturate-150 p-3 border border-violet-200/10 rounded-xl"
    >
      <div className=" flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FolderIcon />
          <h1 className="text-xl font-semibold">{name}</h1>
        </div>
      </div>
      <p className="text-sm text-violet-300">
        {totalEntries} {totalEntries === 1 ? "Entry" : "Entries"}
      </p>
      <p>{time}</p>
      {filteredEntries?.length === 0 ? (
        <p className="mt-3">No Collections Found</p>
      ) : (
        <>
          <div className="mt-3">
            {filteredEntries.map((entry) => (
              <span
                key={entry.id}
                className="inline-flex items-center justify-between group  w-full cursor-pointer"
              >
                {entry.title}
                <ArrowRightIcon className="group-hover:translate-x-1 transition-all duration-500 ease-in-out" />
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
