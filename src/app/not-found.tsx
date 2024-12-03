"use client";

import { FileQuestion } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <div className="flex justify-center">
            <FileQuestion className="h-24 w-24 text-muted-foreground animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-200">
            Page Not Found
          </h1>
          <p className="text-lg text-slate-200">
            {`Sorry, we couldn't find the page you're looking for. The page might have been
            moved, deleted, or never existed.`}
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Return Home
          </Link>

          <p className="text-sm text-muted-foreground">
            Error 404 - Page Not Found
          </p>
        </div>
      </div>
    </div>
  );
}
