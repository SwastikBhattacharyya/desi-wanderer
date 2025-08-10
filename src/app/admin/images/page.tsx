import { NewImage } from "@/features/image/components/sheets/new-image";
import { ImagesTable } from "@/features/image/components/tables/images-table";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Images() {
  const data = await auth.api.getSession({
    headers: await headers(),
  });
  if (!data?.session) {
    const params = new URLSearchParams({ toastId: "pageRequiresSession" });
    redirect(`/auth/sign-in?${params.toString()}`);
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center-safe justify-between gap-x-4">
        <h1 className="text-4xl">Images</h1>
        <div className="flex items-center-safe gap-x-2">
          <NewImage />
        </div>
      </div>
      <ImagesTable userId={data.user.id} />
    </div>
  );
}
