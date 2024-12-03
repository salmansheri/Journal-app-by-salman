import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppURL } from "@/lib/utils";
import { toast } from "sonner";

export const useInsertCollection = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch(`${AppURL}/api/collection`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });

      if (!response.ok) {
        const errorMessage = response.statusText;
        throw new Error(errorMessage || "An unknown error occured");
      }

      const result = await response.json();

      return result;
    },
    onSuccess: (data) => {
      toast.success("Entry added Successfully");
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
