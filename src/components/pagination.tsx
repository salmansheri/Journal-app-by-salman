"use client";
import { useCallback } from "react";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handlePrevClick = useCallback(() => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }, [currentPage, onPageChange]);

  const handleNextClick = useCallback(() => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }, [currentPage, onPageChange, totalPages]);

  const handlePageClick = useCallback(
    (page: number) => {
      onPageChange(page);
    },
    [onPageChange],
  );

  return (
    <div className=" my-3 flex gap-6 items-center border border-slate-200/10 p-6 rounded-full">
      <Button onClick={handlePrevClick}>
        <ArrowLeft />
      </Button>

      {Array.from({ length: totalPages }, (_, index) => (
        <Button key={index + 1} onClick={() => handlePageClick(index + 1)}>
          {index + 1}
        </Button>
      ))}

      <Button onClick={handleNextClick}>
        <ArrowRight />
      </Button>
    </div>
  );
}
