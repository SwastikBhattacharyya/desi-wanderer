import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as motion from "motion/react-client";
import Image from "next/image";
import SignUpForm from "./_components/sign-up-form";

export default function SignUpPage() {
  return (
    <div className="relative flex min-h-screen min-w-screen items-center justify-center xl:justify-end bg-red-300">
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
      <motion.div
        className="w-[90%] md:w-[450px] xl:mr-[10%]"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border-0 bg-black/60 text-white shadow-2xl backdrop-blur-3xl  md:px-8 md:py-16">
          <CardHeader className="items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.5 }}
            >
              <CardTitle className="text-3xl">Sign Up</CardTitle>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.6 }}
            >
              <CardDescription className="text-gray-400">
                Join us for the latest news on Indian travel & tourism
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent>
            <SignUpForm />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
