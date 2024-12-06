import { SelectCollections } from "@/drizzle/schema";
import { AppURL } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

type ApiResponse = {
  data: SelectCollections;
};

export const useSelectCollectionById = (collectionId: string) => {
  const query = useQuery<SelectCollections, Error>({
    queryKey: ["collection", collectionId],
    queryFn: async () => {
      const response = await fetch(`${AppURL}/api/collection/${collectionId}`);
      if (!response.ok) {
        const errorMessage = response.statusText;
        throw new Error(errorMessage);
      }
      const jsonResponse: ApiResponse = await response.json();
      console.log(jsonResponse.data);

      return jsonResponse.data;
    },
  });

  return query;
};
