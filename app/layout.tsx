import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import { Show, SignInButton, SignUpButton } from "@clerk/nextjs";
import Footer from "./components/footer/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BioStock",
  description: "Recipe Generator",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: "#FFFFFF",
              colorPrimaryForeground: "#1F1F1F",
              colorBackground: "#1F1F1F",
              colorForeground: "#FFFFFF",
              colorInput: "#1F1F1F",
              colorInputForeground: "#FFFFFF",
              colorNeutral: "#FFFFFF",
              colorRing: "rgba(0, 0, 0, 0.15)",


              colorDanger: "#EF4444",
              colorSuccess: "#22C543",
              colorWarning: "#F36B16",
              colorShimmer: "#FFFFFF",
              colorModalBackdrop: "#000000",
              borderRadius: "0.375rem",
            },
          }}
        >
          <Show when="signed-out">
            <header className="flex justify-center items-center pt-8 p-4 gap-4 h-16">
              <SignInButton>
                <button className="bg-gray-600 dark:bg-gray-700 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer hover:bg-gray-800 transition-all">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="bg-green-600 dark:bg-green-700 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer hover:bg-green-700 dark:hover:bg-green-900">
                  Sign Up
                </button>
              </SignUpButton>
            </header>
          </Show>
          <script async src="https://t.contentsquare.net/uxa/196919b216fcb.js"></script>
          {children}
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  );
}
