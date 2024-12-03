"use client";
import Link from "next/link";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { client } from "@/features/auth/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2, LogOutIcon, User2Icon, UserIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "./loader";

export default function Header() {
  const [isMounted, setIsMounted] = useState(false);
  const { data: session, isPending } = client.useSession();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const signOut = async () => {
    return await client.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  return (
    <header className="py-6 px-4 lg:px-8">
      <nav className="max-w-6xl mx-auto border border-slate-100/10 px-5 py-3 rounded-full bg-slate-950/10 background-blur-xl backdrop-saturate-150  flex justify-between items-center">
        <Link id="logo" className="text-3xl font-bold" href="/">
          WriteIt
        </Link>
        {isPending ? (
          <>
            <Loader size={10} />
          </>
        ) : (
          <div className="flex items-center gap-4">
            {session?.user?.email ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarFallback className="text-black font-bold text-2xl">
                      {session?.user?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <UserIcon className="size-4 mr-1" />
                    {session?.user?.name}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <User2Icon className="size-4 mr-1" />

                    {session?.user?.email}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogOutIcon className="size-4 mr-1" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex gap-6">
                <Button onClick={() => router.push("/sign-in")}>Sign in</Button>
                <Button onClick={() => router.push("/sign-up")}>Sign Up</Button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
