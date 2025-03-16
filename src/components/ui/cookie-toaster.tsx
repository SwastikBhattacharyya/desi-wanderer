"use client";

import { deleteCookie, getCookie, hasCookie } from "cookies-next/client";
import { useEffect } from "react";
import { toast } from "sonner";

export type Toast = {
  level: "info" | "success" | "error";
  message: string;
};

export default function CookieToaster() {
  useEffect(() => {
    if (hasCookie("toast")) {
      const toastCookie = getCookie("toast") as string;
      const toastObj: Toast = JSON.parse(toastCookie);
      switch (toastObj.level) {
        case "info":
          toast.info(toastObj.message);
          break;
        case "success":
          toast.success(toastObj.message);
          break;
        case "error":
          toast.error(toastObj.message);
          break;
      }
      deleteCookie("toast");
    }
  }, []);

  return <></>;
}
