"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";
import { auth, googleProvider } from "@/firebase/client";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { SignIn, SignUp } from "@/lib/actions/auth.action";

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(8),
  });
};

function AuthForm({ type }: { type: FormType }) {
  const router = useRouter();
  const formSchema = authFormSchema(type);
  
  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      const userCredentials = await signInWithPopup(auth, googleProvider);
      const idToken = await userCredentials.user.getIdToken();
      
      if (!idToken) {
        toast.error("Failed to sign in with Google");
        return;
      }
      
      // Always check if user exists in Firestore and create if not (for both sign-in and sign-up)
      // This prevents the auth redirect loop issue
      const result = await SignUp({
        uid: userCredentials.user.uid,
        name: userCredentials.user.displayName || "Google User",
        email: userCredentials.user.email!,
        password: "", // Not needed for Google auth
      });
      
      // Don't stop if user already exists - that's fine, we'll just sign them in
      // Only stop for other errors
      if (!result?.success && !result?.message.includes("already exists")) {
        toast.error(result?.message || "Failed to create account");
        return;
      }
      
      // For both sign in and sign up, set the session cookie
      const signInResult = await SignIn({
        email: userCredentials.user.email!,
        idToken,
      });
      
      if (!signInResult?.success) {
        toast.error(signInResult?.message || "Failed to complete sign in");
        return;
      }
      
      toast.success(`${type === "sign-in" ? "Signed in" : "Signed up"} with Google successfully!`);
      router.push("/");
    } catch (error: any) {
      console.error("Google auth error:", error);
      toast.error(error.message || "Failed to authenticate with Google");
    }
  };

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        const { name, email, password } = values;
        const userCradentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const result = await SignUp({
          uid: userCradentials.user.uid,
          name: name!,
          email,
          password,
        });

        if (!result?.success) {
          toast.error(result?.message);
          return;
        }

        console.log("SIGN UP", values);
        toast.success("Account created successfully. Please sign in!");
        router.push("/sign-in");
      } else {
        const { email, password } = values;
        const userCradentials = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const idToken = await userCradentials.user.getIdToken();

        if (!idToken) {
          toast.error("Failed to sign in");
          return;
        }

        await SignIn({
          email,
          idToken,
        });

        toast.success("Signed in successfully!");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an error: ${error}`);
    }
  }

  const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" width={38} height={32} />
          <h2 className="text-primary-100">PrepWise</h2>
        </div>

        <h3>Practice job interviews with AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
                type="text"
              />
            )}
            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your Email"
              type="email"
            />
            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Your Password"
              type="password"
            />
            <Button className="btn" type="submit">
              {isSignIn ? "Sign In" : "Create an account"}
            </Button>
            
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <Button 
              type="button" 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
              onClick={handleGoogleSignIn}
            >
              <Image src="/google.svg" alt="Google logo" width={20} height={20} />
              {isSignIn ? "Sign in with Google" : "Sign up with Google"}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? "No account yet?" : "Have an account already? "}
          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary ml-1"
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AuthForm;
