'use client'

import { HOME_LINKS } from "../../lib/constants"
import Image from "next/image";
import { ReactTyped } from "react-typed";
import NavBar from "../components/navbar/navbar";
import ButtonWithLink from "../components/buttons/button_with_link";
import hero_image from "../../public/images/hero-image.png";

export default function Home() {

  const navItems = HOME_LINKS

  return (
    <div className="w-full px-4 py-4 font-sans min-h-screen">

      <NavBar items={navItems}></NavBar>

      <main id="hero-section" className="flex flex-col md:flex-row items-center justify-center w-full p-6 md:p-12 my-8 gap-8 md:gap-16 rounded-2xl bg-gradient-to-br from-green-700 via-green-800 to-green-900 dark:from-green-800 dark:via-green-900 dark:to-green-950 text-white shadow-xl">

        <Image className="w-56 md:w-80 rounded-2xl shadow-lg mb-2" src={hero_image} alt="hero image" style={{ height: 'auto' }} loading="eager"></Image>

        <div id="tagline" className="flex flex-col justify-center items-center text-xl md:text-2xl lg:text-3xl max-w-2xl">

          <h1 className="w-full text-center mb-4 font-light">Welcome to BioStock, where your ingredients become</h1>
          <ReactTyped
            className="text-2xl md:text-3xl lg:text-4xl mb-8 text-center font-semibold bg-clip-text text-transparent bg-linear-to-r from-red-300 via-green-300 to-blue-300 dark:from-red-500 dark:via-green-400 dark:to-blue-500"
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

          <div id="buttons" className="flex flex-col items-center md:flex-row gap-4 md:gap-6">
            <ButtonWithLink text="Start Now ->" route="/mealprep"></ButtonWithLink>
            <ButtonWithLink text="Learn More" route="/about"></ButtonWithLink>
          </div>

        </div>


      </main>

    </div>
  );
}   
