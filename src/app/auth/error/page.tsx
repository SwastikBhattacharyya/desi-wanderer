import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const titleMap = {
  banned: "User Banned",
} as const;

type ErrorKey = keyof typeof titleMap;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const error = typeof params.error === "string" ? params.error : undefined;
  const errorDescription =
    typeof params.error_description === "string"
      ? params.error_description
      : undefined;

  const isKnownError = error && error in titleMap;
  const title = isKnownError ? titleMap[error as ErrorKey] : "Unknown Error";
  const description = isKnownError
    ? errorDescription ||
      "An unexpected error occurred. Please try again later or contact support if the issue persists."
    : "An unexpected error occurred. Please try again later or contact support if the issue persists.";

  return (
    <div className="flex h-dvh w-dvw items-center-safe justify-center-safe">
      <Card className="w-[90dvw] max-w-[500px] p-8">
        <CardHeader className="flex items-center-safe justify-center-safe">
          <CardTitle className="text-center text-4xl">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-lg">{description}</CardContent>
        <CardFooter className="flex flex-col items-center-safe justify-center-safe gap-y-4">
          <p className="text-center">Error Code: {error || "N/A"}</p>
          <Button asChild size="lg">
            <Link href="/">Return to Application</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
