"use client";

import { ClerkLoaded } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <ClerkLoaded>{children}</ClerkLoaded>;
}