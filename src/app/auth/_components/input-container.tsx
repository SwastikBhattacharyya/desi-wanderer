import { ReactNode } from "react";

export function InputContainer({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-y-0.5">{children}</div>;
}
