"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";

export default function MobileNav() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = useCallback(() => {
    if (!isOpen) {
      setIsOpen(true);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [isOpen]);

  const handleNavigate = useCallback(
    (href: string) => {
      if (!href) {
        return;
      }

      router.push(`/${href}`);
      handleClose();
    },
    [router, handleClose],
  );

  return (
    <div className={"lg:hidden "}>
      <Sheet open={isOpen} onOpenChange={handleClose}>
        <Button variant={"ghost"} onClick={handleOpen}>
          <MenuIcon />
        </Button>
        <SheetContent className={"text-black"}>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className={"flex flex-col w-full gap-3"}>
            <Button onClick={() => handleNavigate("sign-in")}>Sign in</Button>
            <Button onClick={() => handleNavigate("sign-up")}>Sign Up</Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
