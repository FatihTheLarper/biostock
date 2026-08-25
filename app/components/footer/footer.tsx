import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-auto w-full bg-green-700 dark:bg-green-900 text-white text-sm">
      <div className="max-w-6xl mx-auto p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="opacity-80">&copy; {new Date().getFullYear()} BioStock. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/home" className="hover:text-green-300 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-green-300 transition-colors">About</Link>
          <Link href="/mealprep" className="hover:text-green-300 transition-colors">MealPrep</Link>
          <a href="mailto:support@example.com" className="hover:text-green-300 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
