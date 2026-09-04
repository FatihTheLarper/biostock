import Image, { StaticImageData } from 'next/image';

interface CardItems {
  title: string;
  image: string | StaticImageData;
  description?: string;
  onDelete?: () => void;
  priority?: boolean;
}

const Card = ({ title, image, description, onDelete, priority }: CardItems) => {
  return (
    <div className="w-full max-w-sm mx-auto bg-white dark:bg-green-800 rounded-xl md:rounded-2xl shadow-md overflow-hidden ring-1 ring-green-600/20 dark:ring-green-400/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div id="title" className="px-4 py-3 md:px-5 md:py-4 text-center">
        <h2 className="text-base md:text-xl font-medium tracking-tight text-green-700 dark:text-green-200">{title}</h2>
      </div>

      <div id="image" className="relative w-full h-40 md:h-48">
        <Image
          src={image}
          alt={title}
          fill
          priority={priority}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {description && (
        <div id="description" className="text-sm md:text-lg px-4 py-3 text-center">
          <p className="leading-relaxed line-clamp-3 text-gray-600 dark:text-green-100">{description}</p>
        </div>
      )}

      {onDelete && (
        <div className={`py-3 px-4 ${description && description?.length < 150 ? 'pt-10' : ''} flex justify-center`}>
          <button onClick={onDelete} aria-label={`Delete ${title}`} className='px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base font-medium text-white bg-red-600 dark:bg-red-700 rounded-lg hover:bg-red-700 dark:hover:bg-red-800 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300 transition-all cursor-pointer'>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Card;
