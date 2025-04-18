"use client";
import { authClient } from "@/lib/auth-client";
import { FaGoogle } from "react-icons/fa";

export default function Social() {
  return (
    <div
      onClick={async () => {
        await authClient.signIn.social({
          provider: "google",
        });
      }}
      className="flex cursor-pointer items-center gap-x-2 rounded-lg border border-white p-4 transition-all duration-300 hover:bg-white hover:text-black"
    >
      <FaGoogle />
      Continue with Google
    </div>
  );
}
