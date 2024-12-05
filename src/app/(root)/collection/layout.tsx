import { StepBackIcon } from "lucide-react";
import Link from "next/link";

export default function JournalEntryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Link
        href="/dashboard"
        className="inline-flex border-slate-300/10 border items-center justify-center p-3 rounded-xl bg-slate-800 hover:bg-slate-800/90"
      >
        <StepBackIcon className="size-4 mr-2" />
        Back to Dashboard
      </Link>
      {children}
    </div>
  );
}
