"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ban } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { banUserSchema, BanUserType } from "../../schemas/ban-user";
import { banUser } from "../../server/actions/ban-user";

export function BanUser({ id, disabled }: { id: string; disabled?: boolean }) {
  const [open, setOpen] = useState(false);
  const form = useForm<BanUserType>({
    resolver: zodResolver(banUserSchema),
    defaultValues: {
      reason: "",
    },
  });

  async function onSubmit(data: BanUserType) {
    const action = banUser(id, data.reason);
    toast.promise(
      async () => {
        const result = await action;
        if (result.success) return result.message;
        else throw new Error(result.message);
      },
      {
        loading: "Banning user...",
        success: (message) => message,
        error: (error: Error) => error.message,
      },
    );
    const result = await action;
    if (result.success) setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={disabled}
          className="cursor-pointer hover:bg-transparent hover:text-destructive focus-visible:bg-transparent focus-visible:text-destructive"
          variant="ghost"
          size="icon"
        >
          <Ban />
        </Button>
      </DialogTrigger>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogContent className="flex max-h-[min(600px,80vh)] flex-col gap-0 p-0 sm:max-w-md">
            <DialogHeader className="contents space-y-0 text-left">
              <DialogTitle className="border-b px-6 py-4">Ban User</DialogTitle>
            </DialogHeader>
            <ScrollArea className="flex max-h-full flex-col gap-y-4 overflow-hidden px-4 pt-4 pb-2">
              <DialogDescription className="mb-2">
                Are you sure you want to ban this user?
              </DialogDescription>
              <div className="m-1 flex flex-col gap-y-2">
                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={form.formState.isSubmitting}
                          placeholder="Reason"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </ScrollArea>
            <DialogFooter className="flex-row justify-end px-6 pb-4">
              <DialogClose asChild>
                <Button className="w-20 cursor-pointer" type="button">
                  Close
                </Button>
              </DialogClose>
              <Button
                className="w-20 cursor-pointer"
                variant="destructive"
                type="submit"
                disabled={form.formState.isSubmitting}
                onClick={form.handleSubmit(onSubmit)}
              >
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
}
