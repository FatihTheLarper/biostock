import NavBar from "../components/navbar/navbar"
import ButtonWithLink from "../components/buttons/button_with_link"

const About = () => {

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Mealprep", href: "/mealprep" },
    { name: "Contact", href: "mailto:support@example.com" }
  ]

  return (
    <div className="w-full p-4 font-sans">

      <NavBar items={navItems}></NavBar>

      <main className="flex flex-col items-center justify-center w-full p-6 md:p-10 my-10 rounded-xl bg-green-700 dark:bg-green-900 text-white shadow-xl">

        <div className="flex flex-col items-center text-center max-w-4xl gap-6">

          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
            At BioStock, we believe that great cooking starts long before the heat is turned on—it starts with what you already have.
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl font-light leading-relaxed opacity-90">
            Founded on the principle that sustainability and convenience should go hand in hand, our mission is to transform household ingredients into zero-waste, nutritious meals.
          </p>

          <p className="text-base md:text-lg lg:text-xl font-light leading-relaxed opacity-80 max-w-3xl">
            In a world where food waste is a critical challenge, BioStock offers a smart solution. Our advanced recipe generation technology analyzes your available pantry items to create instant, personalized meal ideas. We aren't just an app; we are a movement toward mindful consumption, helping home cooks reduce waste, save money, and discover the endless potential hidden in their kitchens.
          </p>

          <p className="text-lg md:text-xl font-semibold mt-4">
            Join us in redefining meal prep - one ingredient at a time.
          </p>

          <ButtonWithLink text="Ready to start?" route="/mealprep"></ButtonWithLink>

        </div>

      </main>

    </div>
  )
}

export default About
