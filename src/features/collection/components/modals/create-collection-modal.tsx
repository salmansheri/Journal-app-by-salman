"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { isCollectionModalOpen } from "../../server/store";
import { useAtom } from "jotai";
import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useInsertCollection } from "../../server/hooks/use-insert-collection";

const formSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(3),
});
export default function CreateCollectionModal() {
  const { mutate: insertCollection, isPending: isInsertCollectionPending } =
    useInsertCollection();
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      insertCollection(
        // @ts-expect-error "something"
        { name: value.name, description: value.description },
        {
          onSuccess: () => {
            setIsOpen(false);
          },
        },
      );
    },
  });
  const [isOpen, setIsOpen] = useAtom(isCollectionModalOpen);

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <DialogContent className="text-slate-950">
        <DialogHeader>
          <DialogTitle>Create Collection</DialogTitle>
        </DialogHeader>
        <div>
          <form
            className="space-y-6 w-full"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <div>
              <form.Field name="name">
                {(field) => {
                  return (
                    <div>
                      <Label>Name</Label>
                      <Input
                        name="name"
                        type="text"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {field.state.meta.errors.map((error) => (
                        <p
                          className="text-red-500 font-bold"
                          key={error as string}
                        >
                          {error}
                        </p>
                      ))}
                    </div>
                  );
                }}
              </form.Field>
            </div>
            <div>
              <form.Field name="description">
                {(field) => {
                  return (
                    <div className="">
                      <Label>Description</Label>
                      <Textarea
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {field.state.meta.errors.map((error) => (
                        <p
                          className="text-red-500 font-bold"
                          key={error as string}
                        >
                          {error}
                        </p>
                      ))}
                    </div>
                  );
                }}
              </form.Field>
            </div>
            <div>
              <form.Subscribe
                selector={(formState) => [
                  formState.canSubmit,
                  formState.isSubmitting,
                ]}
              >
                {([canSubmit, isSubmitting]) => (
                  <div className="">
                    <Button type="submit" disabled={!canSubmit}>
                      {isSubmitting || isInsertCollectionPending ? (
                        <>
                          <Loader2 className="animate-spin mr-2 size-4" />
                          Loading...
                        </>
                      ) : (
                        <>Submit</>
                      )}
                    </Button>
                  </div>
                )}
              </form.Subscribe>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
