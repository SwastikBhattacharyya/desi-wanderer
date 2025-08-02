import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex h-dvh w-dvw flex-col items-center-safe justify-center-safe gap-y-1">
      <Loader2 className="size-10 animate-spin" />
      <h3 className="text-2xl">Just a Moment</h3>
    </main>
  );
}
