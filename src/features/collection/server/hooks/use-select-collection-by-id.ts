import { AppURL } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export const useSelectCollectionById = (collectionId: string) => {
  const query = useQuery({
    queryKey: ["collection", collectionId],
    queryFn: async () => {
      const response = await fetch(`${AppURL}/api/collection/${collectionId}`);
      if (!response.ok) {
        const errorMessage = response.statusText;
        throw new Error(errorMessage);
      }
      const { data } = await response.json();
      console.log(data);

      return data;
    },
  });

  return query;
};
