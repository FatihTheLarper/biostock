import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-auto w-full bg-green-700 dark:bg-green-900 text-white text-sm">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-green-50">&copy; {new Date().getFullYear()} BioStock. All rights reserved.</p>
        <nav className="flex gap-6">
          <Link href="/home" className="text-green-50 hover:text-green-300 transition-colors">Home</Link>
          <Link href="/about" className="text-green-50 hover:text-green-300 transition-colors">About</Link>
          <Link href="/mealprep" className="text-green-50 hover:text-green-300 transition-colors">MealPrep</Link>
          <a href="mailto:support@example.com" className="text-green-50 hover:text-green-300 transition-colors">Contact</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
