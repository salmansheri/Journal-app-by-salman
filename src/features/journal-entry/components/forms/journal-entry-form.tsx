"use client";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { Loader2, PlusIcon } from "lucide-react";
import { useState } from "react";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MOODS } from "@/lib/constant";
import { useInsertEntry } from "../../server/hooks/use-insert-entry";
import { useSelectCollection } from "@/features/collection/server/hooks/use-select-collection";
import { SelectCollections } from "@/drizzle/schema";
import CreateCollectionModal from "@/features/collection/components/modals/create-collection-modal";
import { isCollectionModalOpen } from "@/features/collection/server/store";
import { useAtom } from "jotai";
import Loader from "@/components/loader";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(3, { message: "title must be atleast 3 Character" }),
  mood: z.string().min(3, { message: "mood must be atleast 3 Character" }),
  collectionId: z.string().optional(),
});

export default function JournalEntryForm() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useAtom(isCollectionModalOpen);
  const [content, setContent] = useState<string>("");
  const { mutate: insertEntry, isPending: isInsertEntryLoading } =
    useInsertEntry();

  const { data: collectionsData, isLoading } = useSelectCollection();

  console.log(collectionsData);

  const form = useForm({
    defaultValues: {
      title: "",
      mood: "",
      collectionId: "",
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      insertEntry(
        {
          title: value.title,
          mood: value.mood,
          content: content,
          collectionId: value.collectionId,
        },
        {
          onSuccess: () => {
            router.refresh();
            router.push("/dashboard");
          },
        },
      );
      console.log({ value, content });
    },
  });

  if (isLoading) {
    return (
      <Loader size={25} className="h-[80vh] flex items-center justify-center" />
    );
  }
  return (
    <div className="py-10">
      <CreateCollectionModal />
      <h1 className="text-5xl font-bold text-center mb-2 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">{`What's on your mind?`}</h1>
      <div className="mt-5 bg-slate-900/10 backdrop-blur-xl backdrop-saturate-150 p-6 rounded-xl border border-slate-200/10 shadow-xl space-y-6 ">
        <form
          className="space-y-6 w-full"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div>
            <form.Field name="title">
              {(field) => {
                return (
                  <div className="">
                    <Label>Title</Label>
                    <Input
                      name={field.name}
                      id={field.name}
                      type="text"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors.map((error) => (
                      <p
                        className="text-red-500 mt-2 text-sm font-bold"
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
            <form.Field name="mood">
              {(field) => {
                return (
                  <div>
                    <Label>Mood</Label>
                    <Select
                      onValueChange={field.handleChange}
                      defaultValue={field.state.value}
                      value={field.state.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Mood" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(MOODS).map((mood) => (
                          <SelectItem key={mood.id} value={mood.id}>
                            <div className="flex items-center gap-5">
                              {mood.emoji}
                              {mood.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {field.state.meta.errors.map((error) => (
                      <p
                        className="text-red-500 text-sm font-bold"
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
            <div>
              <Label>Content</Label>
              <ReactQuill value={content} onChange={setContent} />
            </div>
          </div>
          <div>
            <form.Field name="collectionId">
              {(field) => {
                return (
                  <div>
                    <Label>Collection</Label>
                    <Select
                      onValueChange={(e) => field.handleChange(e)}
                      defaultValue={field.state.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select collections" />
                      </SelectTrigger>
                      <SelectContent>
                        {collectionsData?.map(
                          (collection: SelectCollections) => (
                            <SelectItem
                              value={collection.id}
                              key={collection.id}
                            >
                              {collection.name}
                            </SelectItem>
                          ),
                        )}
                        <Button
                          disabled={isOpen}
                          variant="ghost"
                          onClick={() => setIsOpen(true)}
                        >
                          <PlusIcon className="size-4 mr-2" />
                          Add Collection
                        </Button>
                      </SelectContent>
                    </Select>

                    {field.state.meta.errors.map((error) => (
                      <p
                        className="text-red-500 text-sm font-bold"
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
                    {isSubmitting || isInsertEntryLoading ? (
                      <>
                        <Loader2 className="mr-2 animate-spin size-4" />
                        Loading...
                      </>
                    ) : (
                      <>Create</>
                    )}
                  </Button>
                </div>
              )}
            </form.Subscribe>
          </div>
        </form>
      </div>
    </div>
  );
}
