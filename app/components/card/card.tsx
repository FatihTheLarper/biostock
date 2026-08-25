import Image, { StaticImageData } from 'next/image';

interface CardItems {
  title: string;
  image: string | StaticImageData;
  description: string;
  onDelete?: () => void;
}

const Card = ({ title, image, description, onDelete }: CardItems) => {
  return (
    <div className="w-full max-w-sm max-h-120 mx-auto bg-green-500 dark:bg-green-600 rounded-xl shadow-lg overflow-hidden text-white hover:text-shadow-black hover:bg-green-600 dark:hover:bg-green-700 hover:-translate-y-1.5 transition-all">
      <div id="title" className="text-xl px-6 py-4 text-center">
        <h2 className="text-xl font-bold">{title}</h2>
      </div>

      <div id="image" className="relative w-full h-48">
        <Image
          src={image}
          alt={title}
          loading='eager'
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div id="description" className="text-lg px-6 py-4 text-center">
        <p className="opacity-90 line-clamp-3">{description}</p>
      </div>

      {onDelete && (
        <div className="relative py-4 text-center">
          <button onClick={onDelete} className='p-2 bg-red-400 rounded-xl dark:bg-red-600 hover:bg-red-500 dark:hover:bg-red-700 hover:rounded-2xl transition-all cursor-pointer'>Delete Item</button>
        </div>
      )}
    </div>
  );
};

export default Card;
