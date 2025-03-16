import * as motion from "motion/react-client";
import Image from "next/image";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email: string }>;
}) {
  const { email } = await searchParams;
  return (
    <div className="flex min-h-screen min-w-screen flex-col items-center justify-center gap-1 text-2xl">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          className="object-cover object-right"
          src="/auth-hero.jpg"
          alt="A serene landscape featuring dark mountains silhouetted against a vibrant red sunset, mirrored in a calm lake below."
          fill={true}
          draggable={false}
          sizes="100vw"
        />
      </motion.div>
      <motion.div className="z-10 bg-black/60 p-16 text-white backdrop-blur-md shadow-2xl rounded-2xl">
        <div>
          A verification email has been sent to{" "}
          <span className="font-bold">{email}</span>.
        </div>
        <div>
          Verify your email address to continue. You can close this page.
        </div>
      </motion.div>
    </div>
  );
}
