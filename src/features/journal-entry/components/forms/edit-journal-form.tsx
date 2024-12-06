"use client";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
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
import { useSelectEntryById } from "../../server/hooks/use-select-entry-by-id";
import NotFound from "@/app/not-found";
import { useSelectCollectionById } from "@/features/collection/server/hooks/use-select-collection-by-id";

const formSchema = z.object({
  title: z.string().min(3, { message: "title must be atleast 3 Character" }),
});

interface EditJournalEntryFormProps {
  journalId: string;
}
export default function EditJournalEntryForm({
  journalId,
}: EditJournalEntryFormProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useAtom(isCollectionModalOpen);
  const { data: initialData, isLoading: isInitialDataLoading } =
    useSelectEntryById(journalId);
  const [content, setContent] = useState<string>("");
  const [mood, setMood] = useState(initialData?.mood);

  const form = useForm({
    defaultValues: {
      title: initialData?.title,
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log({ value, content });
    },
  });

  useEffect(() => {
    setContent(initialData?.content as string);
  }, [initialData]);

  if (isInitialDataLoading) {
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
            <div>
              <Label>Content</Label>
              <ReactQuill
                defaultValue={content}
                value={content}
                onChange={(e) => setContent(e)}
              />
            </div>
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
                    {isSubmitting ? (
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
