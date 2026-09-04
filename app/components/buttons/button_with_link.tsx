import Link from "next/link"

interface ButtonProps {
  text: string,
  route: string
}

const ButtonWithLink = ({ text, route }: ButtonProps) => {
  return (
    <Link
      href={route}
      className="inline-flex items-center justify-center px-6 py-3 text-base md:text-lg text-white bg-green-600 dark:bg-green-700 rounded-lg shadow-sm hover:bg-green-700 dark:hover:bg-green-800 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 transition-all"
    >
      {text}
    </Link>
  )
}

export default ButtonWithLink
