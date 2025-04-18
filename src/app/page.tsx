import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { db } from "@/db";
import { post } from "@/db/schema";
import { auth } from "@/lib/auth";
import { desc, eq } from "drizzle-orm";
import * as motion from "motion/react-client";
import { unstable_cache } from "next/cache";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "./actions";

export default async function Home() {
  const getCachedPosts = unstable_cache(
    async () => {
      return await db
        .select()
        .from(post)
        .where(eq(post.published, true))
        .orderBy(desc(post.createdAt));
    },
    ["home-posts"],
    {
      tags: ["posts"],
    },
  );

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user.name;
  const posts = await getCachedPosts();

  return (
    <div className="flex min-h-screen flex-col bg-linear-to-br from-slate-700 to-slate-400 text-white">
      <section className="relative flex h-[75vh] w-full items-center justify-center border border-black">
        <div className="absolute z-10 h-full w-full bg-black opacity-65" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute h-full w-full"
        >
          <Image
            src="/home-hero.jpg"
            alt="Taj Mahal"
            className="object-cover"
            fill
          />
        </motion.div>
        <div className="z-10 space-y-3 p-4 text-center text-white">
          {user && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl"
            >
              Welcome back <b>{user}</b> to
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl font-bold"
          >
            Desi Wanderer
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl"
          >
            Your Stop for all the latest news on Indian tourism and travel
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center gap-x-4"
          >
            {!user ? (
              <Link href="/auth/sign-in">
                <Button className="cursor-pointer bg-white text-slate-700 hover:bg-white/80">
                  Sign In
                </Button>
              </Link>
            ) : (
              <form action={signOut}>
                <Button
                  type="submit"
                  className="cursor-pointer bg-white text-slate-700 hover:bg-white/80"
                >
                  Sign Out
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
      <section className="flex flex-col gap-y-6 bg-[f8f8f8] px-8 py-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="h-full justify-self-center text-center text-3xl font-bold">
            Latest Posts
          </h1>
        </motion.div>
        <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((post, index) => (
            <motion.div
              className="flex h-full w-full items-stretch justify-center"
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + 0.1 * index }}
            >
              <Card className="border-2 border-white/10 bg-transparent text-white shadow-2xl">
                <CardContent className="flex h-full flex-col items-center gap-y-4">
                  <Image
                    className="w-full rounded-md object-cover"
                    src={post.masterImage || "/image-upload.png"}
                    alt={post.title}
                    width={300}
                    height={300}
                  />
                  <h2 className="text-center text-xl font-bold">
                    {post.title}
                  </h2>
                  <div className="h-full">
                    <p className="flex h-full items-center justify-center text-center">
                      {post.description}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Link href={`/blog/${post.slug}`}>
                    <Button className="cursor-pointer">Read More</Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
