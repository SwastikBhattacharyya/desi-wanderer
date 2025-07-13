"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { IconBrandGoogleFilled } from "@tabler/icons-react";

export function AuthFooter() {
  return (
    <Button
      className="flex items-center-safe justify-center-safe gap-x-1"
      variant="secondary"
      outline
      onClick={async () => {
        await authClient.signIn.social({
          provider: "google",
        });
      }}
    >
      <div>Google</div>
      <IconBrandGoogleFilled className="size-4" />
    </Button>
  );
}
