import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppURL } from "@/lib/utils";
import { toast } from "sonner";

export const useDeleteEntry = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (journalId: string) => {
      const response = await fetch(`${AppURL}/api/entry/journal/${journalId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorMessage = response.statusText;
        throw new Error(errorMessage || "An unknown error occured");
      }

      const result = await response.json();

      return result.data;
    },
    onSuccess: (data) => {
      toast.success("Entry delete Successfully");
      queryClient.invalidateQueries({ queryKey: ["entry"] });
      console.log(`Entry mutation data: ${data}`);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  return mutation;
};
