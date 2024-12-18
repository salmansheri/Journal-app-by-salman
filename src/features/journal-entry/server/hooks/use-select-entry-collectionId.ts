import { AppURL } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export const useSelectEntryByCollectionId = (collectionId: string) => {
  const query = useQuery({
    queryKey: ["entry", collectionId],
    queryFn: async () => {
      const response = await fetch(`${AppURL}/api/entry/${collectionId}`, {
        cache: "no-store",
      });
      if (!response.ok) {
        const errorMessage = response.statusText;
        throw new Error(errorMessage);
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
