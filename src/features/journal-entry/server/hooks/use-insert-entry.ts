import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppURL } from "@/lib/utils";
import { toast } from "sonner";

type ResponseType = {
  title: string;
  mood: string;
  collectionId: string;
  content: string;
};

type RequestType = {
  title: string;
  mood: string;
  collectionId: string;
  content: string;
};

export const useInsertEntry = () => {
  const queryClient = useQueryClient();
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      const response = await fetch(`${AppURL}/api/entry`, {
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
      queryClient.invalidateQueries({
        queryKey: ["entry", data.collectionId],
      });
      console.log(`Entry mutation data: ${data.collectionId}`);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
};
