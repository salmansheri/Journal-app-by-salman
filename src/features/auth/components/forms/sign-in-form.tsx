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
import { EyeOffIcon, EyeIcon } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email().min(3),
  password: z.string().min(3),
});

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const passwordType = showPassword === true ? "text" : "password";
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      await client.signIn.email(
        {
          email: value.email,
          password: value.password,
        },
        {
          onSuccess: () => {
            toast.success("Successfully sign in");
            router.push("/dashboard");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        },
      );
    },
  });

  return (
    <Card className="md:w-[40%]">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
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
            <form.Field name="email">
              {(field) => {
                return (
                  <div className="">
                    <Label>Email</Label>
                    <Input
                      placeholder="Enter your Email..."
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
                  <div className="flex flex-col relative gap-2">
                    <Label>Password</Label>
                    <Input
                      type={passwordType}
                      placeholder="Enter your Password..."
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
                    <div className=" absolute top-7 right-2">
                      {showPassword ? (
                        <EyeOffIcon onClick={() => setShowPassword(false)} />
                      ) : (
                        <EyeIcon onClick={() => setShowPassword(true)} />
                      )}
                    </div>
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
                        <Loader2 className="animate-spin " />
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
