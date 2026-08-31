import Link from "next/link";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6">
      <Link href="/home" className="text-green-600 dark:text-green-400 underline hover:opacity-80">
        &larr; Back to Home
      </Link>
      <SignIn />
    </div>
  );
}
