import Link from "next/link";
import { SignIn } from "@clerk/nextjs";
import AuthGate from "../../components/authgate/authgate";

export default function SignInPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6">
      <AuthGate>
        <Link href="/home" className="text-green-600 dark:text-green-400 underline hover:opacity-80">
          &larr; Back to Home
        </Link>
        <SignIn />
      </AuthGate>
    </div>
  );
}