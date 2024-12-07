import EditJournalEntryForm from "@/features/journal-entry/components/forms/edit-journal-form";

interface JournalEditPageProps {
  params: Promise<{ journalId: string }>;
}
export default async function JournalEditPage({
  params,
}: JournalEditPageProps) {
  const { journalId } = await params;
  return (
    <div>
      <EditJournalEntryForm journalId={journalId} />
    </div>
  );
}
