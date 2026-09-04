import type { Metadata } from "next";
import Link from "next/link";
import { SignIn } from "@clerk/nextjs";
import AuthGate from "../../components/authgate/authgate";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function SignInPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 pb-12 pt-8 md:pb-16 md:pt-12">
      <AuthGate>
        <Link href="/home" className="mb-6 md:mb-0 text-green-600 dark:text-green-400 underline hover:opacity-80">
          &larr; Back to Home
        </Link>
        <SignIn />
      </AuthGate>
    </div>
  );
}