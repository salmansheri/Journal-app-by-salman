import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppURL } from "@/lib/utils";
import { toast } from "sonner";

export const useDeleteCollection = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (collectionId: string) => {
      const response = await fetch(`${AppURL}/api/collection/${collectionId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorMessage = response.statusText;
        throw new Error(errorMessage || "An unknown error occured");
      }

      const result = await response.json();

      return result;
    },
    onSuccess: (data) => {
      toast.success("collection delete Successfully");
      queryClient.invalidateQueries({ queryKey: ["collection"] });
      console.log(`Entry mutation data: ${data}`);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  return mutation;
};
