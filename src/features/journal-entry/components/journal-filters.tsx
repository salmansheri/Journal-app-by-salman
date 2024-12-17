"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { SelectEntry } from "@/drizzle/schema";
import { MOODS } from "@/lib/constant";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useCallback, useEffect, useState } from "react";
import { format, isSameDay } from "date-fns";

import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { CalendarIcon, PlusIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import EntryCard from "./entry-card";
import Link from "next/link";
import Pagination from "@/components/pagination";

interface JounalFiltersProps {
  entries: SelectEntry[];
}

export default function JournalFilters({ entries }: JounalFiltersProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [date, setDate] = useState<Date>();
  const [filteredEntries, setFilteredEntries] = useState<SelectEntry[] | null>(
    null,
  );
  const [selectMood, setSelectedMood] = useState<string>("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleClearFilters = useCallback(() => {
    setSearchQuery("");
    setDate(undefined);
    setSelectedMood("");
  }, [setSearchQuery, setSelectedMood, setDate]);

  useEffect(() => {
    let filtered = entries;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();

      filtered = filtered.filter(
        (entry) =>
          entry?.title?.toLowerCase().includes(query) ||
          entry?.content?.toLowerCase().includes(query),
      );
    }

    // Applied Mood filter
    if (selectMood) {
      filtered = filtered.filter((entry) => entry.mood === selectMood);
    }

    // Applied date filter
    if (date) {
      filtered = filtered.filter((entry) =>
        isSameDay(new Date(entry.createdAt), date),
      );
    }

    setFilteredEntries(filtered);
  }, [entries, searchQuery, selectMood, date]);

  const totalItems = filteredEntries?.length;

  let totalPages;

  if (totalItems) {
    totalPages = Math.ceil(totalItems / 10);
  }

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
    },
    [setCurrentPage],
  );
  return (
    <div>
      <div>
        <div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-wrap w-full items-center gap-6"
          >
            <Input
              placeholder="Search Entries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
            <Select value={selectMood} onValueChange={setSelectedMood}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by mood" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(MOODS).map((mood) => (
                  <SelectItem value={mood.id} key={mood.id}>
                    <span className="flex items-center gap-2">
                      {mood.emoji}
                      {mood.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "justify-start text-left font-normal",
                      !date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="size-4" />
                    {date ? format(date, "PPP") : <span>Pick a Date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    showOutsideDays={false}
                  />
                </PopoverContent>
              </Popover>
            </div>
            {(searchQuery || selectMood || date) && (
              <Button
                onClick={handleClearFilters}
                variant="ghost"
                className="text-red-500"
              >
                Clear Filters
              </Button>
            )}
          </form>
        </div>
        <div className="py-5">
          <div className="flex items-center justify-between">
            <h1>
              Showing {filteredEntries?.length} of {entries.length}
            </h1>
            <Link
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "lg",
                }),
              )}
              href="/journal/write"
            >
              <PlusIcon className="size-4" />
              Add Entry
            </Link>
          </div>
          <div>
            {filteredEntries?.length === 0 ? (
              <div className="text-center p-8">
                <p className="text-gray-500">No Entries Found</p>
              </div>
            ) : (
              <div className="py-5 flex flex-col gap-6">
                {filteredEntries
                  ?.slice(currentPage * 10 - 10, currentPage * 10)
                  .map((entry: SelectEntry) => (
                    <EntryCard key={entry.id} id={entry.id} entry={entry} />
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Pagination
        totalPages={totalPages!}
        currentPage={currentPage}
        onPageChangeAction={handlePageChange}
      />
    </div>
  );
}
