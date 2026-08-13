import NavBar from "../components/navbar/navbar";
import Card from "../components/card/card";
import FloatingInput from "../components/floatinginput/floatinginput";
import logo from "../../public/images/logo.png";

export default function MealPrep() {

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "mailto:support@example.com" }
  ];

  return (
    <div className="w-full p-4 font-sans">

      <NavBar items={navItems}></NavBar>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
        <Card title="Title 1" image={logo} description="This is example card desc"></Card>
        <Card title="Title 1" image={logo} description="This is example card desc"></Card>
        <Card title="Title 1" image={logo} description="This is example card desc"></Card>
        <Card title="Title 1" image={logo} description="This is example card desc"></Card>
        <Card title="Title 1" image={logo} description="This is example card desc"></Card>
        <Card title="Title 1" image={logo} description="This is example card desc"></Card>

        <FloatingInput></FloatingInput>
      </div>

    </div>
  );
}

