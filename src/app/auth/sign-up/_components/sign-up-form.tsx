"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import * as motion from "motion/react-client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signUp } from "../actions";
import { User, userSchema } from "../types";

export default function SignUpForm() {
  const form = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(formData: User) {
    const response = await signUp(formData);
    if (response?.error) {
      toast.error(response.error);
      return;
    }
    toast.success(
      "Signed up successfully. Please check your email to verify your account.",
    );
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.7 }}
            >
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className="placeholder:text-gray-300/60"
                    type="text"
                    placeholder="Ravi Gupta"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </motion.div>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.8 }}
            >
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="placeholder:text-gray-300/60"
                    type="email"
                    placeholder="ravigupta@provider.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </motion.div>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.9 }}
            >
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </motion.div>
          )}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 1.0 }}
        >
          {!form.formState.isSubmitting ? (
            <Button
              className="w-full cursor-pointer bg-green-700 transition-colors hover:bg-green-800"
              type="submit"
            >
              Sign Up
            </Button>
          ) : (
            <Button disabled className="w-full cursor-not-allowed">
              <Loader2 className="animate-spin" />
              Please wait...
            </Button>
          )}
        </motion.div>
      </form>
    </Form>
  );
}
