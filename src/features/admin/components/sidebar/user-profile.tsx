import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "better-auth";
import initials from "initials";

export function UserProfile({ user }: { user: User }) {
  return (
    <div className="flex items-center-safe justify-center-safe gap-x-2">
      <Avatar>
        <AvatarImage
          src={user?.image as string}
          referrerPolicy="no-referrer"
        ></AvatarImage>
        <AvatarFallback>{initials(user?.name as string)}</AvatarFallback>
      </Avatar>
      <p className="text-center">{user?.name}</p>
    </div>
  );
}
