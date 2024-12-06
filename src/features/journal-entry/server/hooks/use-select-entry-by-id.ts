import { SelectEntry } from "@/drizzle/schema";
import { AppURL } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

interface ApiResponse {
  data: SelectEntry;
}

export const useSelectEntryById = (journalId: string) => {
  const query = useQuery<SelectEntry, Error>({
    queryKey: ["entry", journalId],
    queryFn: async () => {
      const response = await fetch(`${AppURL}/api/entry/journal/${journalId}`);
      if (!response.ok) {
        const errorMessage = response.statusText;
        throw new Error(errorMessage);
      }

      const jsonResponse: ApiResponse = await response.json();

      return jsonResponse.data;
    },
  });

  return query;
};
