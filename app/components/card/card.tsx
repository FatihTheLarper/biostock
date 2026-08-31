import Image, { StaticImageData } from 'next/image';

interface CardItems {
  title: string;
  image: string | StaticImageData;
  description?: string;
  onDelete?: () => void;
}

const Card = ({ title, image, description, onDelete }: CardItems) => {
  return (
    <div className="w-full max-w-sm mx-auto bg-green-600 dark:bg-green-700 rounded-2xl shadow-md overflow-hidden text-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div id="title" className="px-5 py-4 text-center">
        <h2 className="text-xl font-medium tracking-tight">{title}</h2>
      </div>

      <div id="image" className="relative w-full h-48">
        <Image
          src={image}
          alt={title}
          loading='lazy'
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {description && (
        <div id="description" className="text-lg px-4 py-3 text-center">
          <p className="opacity-90 leading-relaxed line-clamp-3">{description}</p>
        </div>
      )}

      {onDelete && (
        <div className="py-3 px-4 flex justify-center">
          <button onClick={onDelete} className='px-4 py-2 text-base font-medium bg-red-500/90 dark:bg-red-600/90 rounded-lg hover:bg-red-600 dark:hover:bg-red-700 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300 transition-all cursor-pointer'>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Card;
