import Link from "next/link"

interface ButtonProps {
  text: string,
  route: string
}

const ButtonWithLink = ({ text, route }: ButtonProps) => {
  return (
    <Link href={route} className="p-2 md:p-3 xl:p-4 bg-green-500 dark:bg-green-600 text-lg xl:text-xl rounded-xl shadow-lg hover:bg-green-600 dark:hover:bg-green-700 hover:cursor-pointer hover:shadow-3xl">{text}</Link >
  )
}

export default ButtonWithLink
