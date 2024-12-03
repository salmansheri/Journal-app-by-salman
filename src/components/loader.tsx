"use client";
import { PacmanLoader } from "react-spinners";
export default function Loader({
  size = 25,
  className,
}: {
  size: number;

  className?: string;
}) {
  return (
    <div className={className}>
      <PacmanLoader color="#581c87" size={size} />
    </div>
  );
}
