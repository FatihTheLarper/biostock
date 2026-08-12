import NavBar from "../components/navbar/navbar";

export default function MealPrep() {

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "mailto:support@example.com" }
  ];

  return (
    <div className="w-full p-4 font-sans">
      <NavBar items={navItems}></NavBar>
    </div>
  );
}

