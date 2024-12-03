"use client";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { client } from "@/features/auth/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(3),
  email: z.string().email().min(3),
  password: z.string().min(3),
});

export default function SignUpForm() {
  const router = useRouter();
  const signUp = async ({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) => {
    const authClient = await client.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onSuccess: (ctx) => {
          toast.success("successfully signin");
          router.push("/");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  };

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      signUp({
        email: value.email,
        name: value.name,
        password: value.password,
      });
    },
  });

  return (
    <Card className="md:w-[40%]">
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
      </CardHeader>
      <CardContent>
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
            <form.Field name="email">
              {(field) => {
                return (
                  <div className="">
                    <Label>Email</Label>
                    <Input
                      name="email"
                      type="email"
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
            <form.Field name="password">
              {(field) => {
                return (
                  <div>
                    <Label>Password</Label>
                    <Input
                      name="password"
                      type="passwordj"
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
                    {isSubmitting ? (
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
      </CardContent>
    </Card>
  );
}
