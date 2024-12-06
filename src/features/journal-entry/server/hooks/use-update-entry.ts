import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppURL } from "@/lib/utils";
import { toast } from "sonner";

type RequestType = {
  title: string;
  content: string;
};
type ResponseType = {
  title: string;
  content: string;
};

export const useUpdateEntry = (journalId: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      const response = await fetch(`${AppURL}/api/entry/journal/${journalId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: data.title, content: data.content }),
      });

      if (!response.ok) {
        const errorMessage = response.statusText;
        throw new Error(errorMessage || "An unknown error occured");
      }

      const jsonResponse = await response.json();

      return jsonResponse.data;
    },
    onSuccess: (data) => {
      toast.success("Entry updated Successfully");
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
