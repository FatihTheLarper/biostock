interface ButtonProps {
  text: string,
}

const Button = ({ text }: ButtonProps) => {
  return (
    <button className="p-2 md:p-3 xl:p-4 bg-green-500 dark:bg-green-600 text-lg lg:text-xl rounded-xl shadow-lg hover:bg-green-600 dark:hover:bg-green-700 hover:cursor-pointer hover:shadow-3xl transition-all">{text}</button>
  )
}

export default Button
