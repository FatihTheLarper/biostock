import type { Metadata } from "next";
import { ABOUT_LINKS } from "@/lib/constants"
import NavBar from "../components/navbar/navbar"
import ButtonWithLink from "../components/buttons/button_with_link"

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how BioStock transforms household ingredients into zero-waste, nutritious meals with AI-powered recipe generation.",
};


const About = () => {

  const navItems = ABOUT_LINKS

  return (
    <div className="w-full p-4 font-sans min-h-screen">

      <NavBar items={navItems}></NavBar>

      <main className="flex flex-col items-center justify-center w-full p-5 md:p-14 my-8 rounded-2xl bg-gradient-to-br from-green-600 via-green-700 to-green-800 dark:from-green-800 dark:via-green-900 dark:to-green-950 text-white shadow-xl">

        <div className="flex flex-col items-center text-center max-w-4xl gap-6">

          <h1 className="text-xl md:text-3xl lg:text-4xl font-semibold leading-snug">
            At BioStock, we believe that great cooking starts long before the heat is turned on—it starts with what you already have.
          </h1>

          <div className="w-16 h-1 bg-green-300/70 rounded-full my-1" />

          <p className="text-base md:text-xl lg:text-2xl font-light leading-relaxed opacity-90">
            Founded on the principle that sustainability and convenience should go hand in hand, our mission is to transform household ingredients into zero-waste, nutritious meals.
          </p>

          <p className="text-sm md:text-lg lg:text-xl font-light leading-relaxed opacity-80 max-w-3xl">
            In a world where food waste is a critical challenge, BioStock offers a smart solution. Our advanced recipe generation technology analyzes your available pantry items to create instant, personalized meal ideas. We aren't just an app; we are a movement toward mindful consumption, helping home cooks reduce waste, save money, and discover the endless potential hidden in their kitchens.
          </p>

          <p className="text-base md:text-xl font-semibold mt-2 pt-4 border-t border-green-300/30">
            Join us in redefining meal prep - one ingredient at a time.
          </p>

          <ButtonWithLink text="Ready to start?" route="/mealprep"></ButtonWithLink>

        </div>

      </main>

    </div>
  )
}

export default About
