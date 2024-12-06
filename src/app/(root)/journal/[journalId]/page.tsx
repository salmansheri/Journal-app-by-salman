import JournalIdClient from "@/features/journal-entry/components/journal-id-client";

interface JournalIdPageProps {
  params: {
    journalId: string;
  };
}

export default async function JournalIdPage({ params }: JournalIdPageProps) {
  const { journalId } = await params;
  return (
    <div>
      <JournalIdClient journalId={journalId} />
    </div>
  );
}
