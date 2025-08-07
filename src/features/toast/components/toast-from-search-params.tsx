"use client";

import { revalidateUsers } from "@/features/auth/server/actions/revalidate-users";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const toasts = {
  authAlreadySignedIn: () => {
    toast.info("You are already signed in");
  },
  emailVerified: () => {
    toast.success(
      "Your email has been verified succesfully. You can now sign in",
    );
  },
  googleSignInSuccessful: () => {
    revalidateUsers();
    toast.success("Signed in successfully");
  },
  googleSignInError: () => {
    toast.error(
      "An unexpected error occured while signing in, please try again",
    );
  },
  pageRequiresSession: () => {
    toast.error("You must be signed in to access this page");
  },
  pageRequiresPermission: () => {
    toast.error("You do not have the permissions to access this page");
  },
  editorQueryError: () => {
    toast.error("Invalid post edit request");
  },
  postRequiresPermission: () => {
    toast.error("You do not have the permissions to edit this post");
  },
};

export function ToastFromSearchParams() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const toastId = searchParams.get("toastId");

  useEffect(() => {
    if (toastId === null) return;
    if (toastId in toasts) toasts[toastId as keyof typeof toasts]();

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("toastId");

    const newUrl =
      newParams.toString().length > 0
        ? `${pathname}?${newParams.toString()}`
        : pathname;

    window.history.replaceState(null, "", newUrl);
  }, [pathname, searchParams, toastId]);

  return <></>;
}
