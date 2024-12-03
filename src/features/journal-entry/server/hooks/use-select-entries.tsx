import { AppURL } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export const useSelectEntry = () => {
  const query = useQuery({
    queryKey: ["entry"],
    queryFn: async () => {
      const response = await fetch(`${AppURL}/api/entry`);
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
