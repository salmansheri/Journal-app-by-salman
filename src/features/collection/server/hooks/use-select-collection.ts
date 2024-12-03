import { AppURL } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export const useSelectCollection = () => {
  const query = useQuery({
    queryKey: ["collection"],
    queryFn: async () => {
      const response = await fetch(`${AppURL}/api/collection`);
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
