'use client'

import Image from "next/image";
import { ReactTyped } from "react-typed";
import NavBar from "../components/navbar/navbar";
import ButtonWithLink from "../components/buttons/button_with_link";
import hero_image from "../../public/images/hero-image.png";

export default function Home() {

  const navItems = [
    { name: "MealPrep", href: "/mealprep" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "mailto:support@example.com" }
  ]

  return (
    <div className="w-full p-4 font-sans">

      <NavBar items={navItems}></NavBar>

      <main id="hero-section" className="flex flex-col md:flex-row items-center justify-center w-full p-4 md:py-10 my-10 sm:space-x-10 lg:space-x-20 xl:space-x-40 2xl:space-x-60 rounded-xl bg-green-700 dark:bg-green-900 text-white">

        <Image className="w-50 md:w-80 lg:w-100 xl:w-120 rounded-xl shadow-lg mb-4" src={hero_image} alt="hero image" style={{ height: 'auto' }} loading="eager"></Image>

        <div id="tagline" className="flex flex-col justify-center items-center text-xl md:text-2xl lg:text-3xl">

          <h1 className="w-full text-center mb-4 md:mb-5">Welcome to BioStock, where your ingredients become</h1>
          <ReactTyped
            className="text-2xl md:text-3xl lg:text-4xl mb-10 text-center bg-clip-text text-transparent bg-linear-to-r from-red-300 via-green-300 to-blue-300 dark:from-red-500 dark:via-green-400 dark:to-blue-500"
            strings={[
              "endless possibilities",
              "zero-waste meals",
              "instant inspiration",
              "your next great meal",
              "flavorful solutions"
            ]}
            typeSpeed={60}
            backSpeed={35}
            backDelay={2000}
            loop
          >
          </ReactTyped>

          <p className="w-full max-w-2xl text-center text-base md:text-lg lg:text-xl text-gray-100 dark:text-gray-200 mb-10 px-4">
            Stop wondering what to cook. Simply input what you have in your pantry, and let our AI generate delicious, sustainable recipes tailored to your taste in seconds.
          </p>

          <div id="buttons" className="flex flex-col items-center text-md xl:text-lg md:flex-row space-y-4 space-x-0 md:space-y-0 md:space-x-10">
            <ButtonWithLink text="Start Now ->" route="/mealprep"></ButtonWithLink>
            <ButtonWithLink text="Learn More" route="/about"></ButtonWithLink>
          </div>

        </div>


      </main>

    </div>
  );
}   
