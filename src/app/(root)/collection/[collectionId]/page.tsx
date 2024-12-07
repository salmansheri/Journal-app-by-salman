import CollectionIdPageClient from "@/features/collection/components/collection-id-client";

interface CollectionIdPageProps {
  params: Promise<{ collectionId: string }>;
}
export default async function CollectionIdPage({
  params,
}: CollectionIdPageProps) {
  const { collectionId } = await params;

  return (
    <div>
      <CollectionIdPageClient collectionId={collectionId} />
    </div>
  );
}
