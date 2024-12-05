import { Card, CardContent } from "@/components/ui/card";
import { SelectEntry } from "@/drizzle/schema";
import { format } from "date-fns";
import Link from "next/link";

interface EntryCardProps {
  id: string;
  entry: SelectEntry;
}
export default function EntryCard({ id, entry }: EntryCardProps) {
  return (
    <Link href={`/journal/${entry.id}`}>
      <Card>
        <CardContent className="p-6">
          <div>
            <div>
              <div>
                <h3 className="font-semibold text-lg">{entry.title}</h3>
              </div>
              <div
                className="text-violet-200 line-clamp-2"
                dangerouslySetInnerHTML={{ __html: entry.content }}
              />
            </div>
            <time>{format(new Date(entry.createdAt), "MMM d, yyyy")}</time>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
